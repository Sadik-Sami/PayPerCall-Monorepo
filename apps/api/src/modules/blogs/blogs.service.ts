import { db } from '@/db';
import { blogsTable, blogBlocksTable, type Blog, type NewBlog } from '@/db/schema';
import { AppError } from '@/middlewares/errorHandler';
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import type { BlogCreateInput, BlogUpdateInput } from '@/db/validator/blog.validator';
import type { BlockCreateInput } from '@/db/validator/blogBlock.validator';
import { validateBlockContentType } from '@/utils/blogBlocks.util';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slugifyTitle(input: string): string {
	const base = input
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-+/g, '-');
	return base.length > 0 ? base : 'blog';
}

export const blogServices = {
	async listAdmin(): Promise<Blog[]> {
		return db.select().from(blogsTable).orderBy(desc(blogsTable.updated_at));
	},

	async getByIdOrThrow(id: string): Promise<Blog> {
		const blog = await this.getById(id);
		if (!blog) throw new AppError('Blog not found', 404);
		return blog;
	},

	async listBlocks(blogId: string) {
		await this.getByIdOrThrow(blogId);
		return db
			.select()
			.from(blogBlocksTable)
			.where(eq(blogBlocksTable.blog_id, blogId))
			.orderBy(asc(blogBlocksTable.order));
	},

	async create(data: BlogCreateInput): Promise<Blog> {
		// Drafts can be created with minimal fields; we generate a valid unique slug server-side.
		const title = (data.title ?? '').trim();
		if (!title) throw new AppError('Title is required', 400);

		let requestedSlug = typeof data.slug === 'string' ? data.slug.trim() : '';
		if (requestedSlug.length > 0 && !slugRegex.test(requestedSlug)) {
			throw new AppError('Slug must be lowercase, hyphen-separated', 400);
		}

		if (requestedSlug.length > 0) {
			const existing = await db.select({ id: blogsTable.id }).from(blogsTable).where(eq(blogsTable.slug, requestedSlug)).limit(1);
			if (existing[0]) throw new AppError('Slug already exists', 409);
		}

		const base = requestedSlug.length > 0 ? requestedSlug : slugifyTitle(title);
		let slug = base;
		for (let i = 2; i < 1000; i += 1) {
			const exists = await db.select({ id: blogsTable.id }).from(blogsTable).where(eq(blogsTable.slug, slug)).limit(1);
			if (!exists[0]) break;
			slug = `${base}-${i}`;
		}

		if (!slugRegex.test(slug)) throw new AppError('Failed to generate a valid slug', 500);

		const insert: NewBlog = {
			...data,
			title,
			slug,
			// Cover image is required for publishing, not for draft creation.
			cover_image_url: data.cover_image_url ?? null,
			status: data.status ?? 'draft',
		};

		const [created] = await db.insert(blogsTable).values(insert).returning();
		if (!created) throw new AppError('Failed to create blog', 500);
		return created;
	},

	async update(id: string, data: BlogUpdateInput): Promise<Blog> {
		const existing = await this.getById(id);
		if (!existing) throw new AppError('Blog not found', 404);

		const merged = { ...existing, ...data };

		if (data.status === 'published') {
			await this.ensurePublishable(id, merged);
		}

		const updates: Partial<NewBlog> & { published_at?: Date | null } = {
			...data,
			updated_at: new Date(),
		};

		if (data.status === 'published' && !existing.published_at) {
			updates.published_at = new Date();
		}

		const [updated] = await db.update(blogsTable).set(updates).where(eq(blogsTable.id, id)).returning();
		if (!updated) throw new AppError('Failed to update blog', 500);
		return updated;
	},

	async remove(id: string): Promise<void> {
		const deleted = await db.delete(blogsTable).where(eq(blogsTable.id, id)).returning();
		if (!deleted[0]) throw new AppError('Blog not found', 404);
	},

	async listPublished(): Promise<Blog[]> {
		return db
			.select()
			.from(blogsTable)
			.where(eq(blogsTable.status, 'published'))
			.orderBy(desc(blogsTable.published_at));
	},

	async getPublishedBySlug(slug: string): Promise<{ blog: Blog; blocks: any[] }> {
		const rows = await db
			.select()
			.from(blogsTable)
			.where(and(eq(blogsTable.slug, slug), eq(blogsTable.status, 'published')))
			.limit(1);
		const blog = rows[0];
		if (!blog) throw new AppError('Blog not found', 404);

		const blocks = await this.listBlocks(blog.id);

		return { blog, blocks };
	},

	async getById(id: string): Promise<Blog | undefined> {
		const rows = await db.select().from(blogsTable).where(eq(blogsTable.id, id)).limit(1);
		return rows[0];
	},

	async createBlock(blogId: string, input: BlockCreateInput) {
		const blog = await this.getById(blogId);
		if (!blog) throw new AppError('Blog not found', 404);

		const typeCheck = validateBlockContentType({ blockType: input.type, contentType: input.content.type });
		if (!typeCheck.ok) {
			throw new AppError(
				`Block content.type must be "${typeCheck.expected}" for block type "${input.type}"`,
				400
			);
		}

		const result = await db
			.select({ maxOrder: sql<number>`max(${blogBlocksTable.order})` })
			.from(blogBlocksTable)
			.where(eq(blogBlocksTable.blog_id, blogId));

		const maxOrder = result[0]?.maxOrder;
		const nextOrder = (maxOrder ?? -1) + 1;

		const [created] = await db
			.insert(blogBlocksTable)
			.values({
				blog_id: blogId,
				type: input.type,
				content: input.content,
				order: nextOrder,
			})
			.returning();

		if (!created) throw new AppError('Failed to create blog block', 500);
		return created;
	},

	async ensurePublishable(blogId: string, blog: Blog): Promise<void> {
		if (!blog.title || !blog.slug || !blog.cover_image_url) {
			throw new AppError('Blog must have title, slug, and cover image before publishing', 400);
		}

		const result = await db
			.select({ count: sql<number>`count(*)` })
			.from(blogBlocksTable)
			.where(eq(blogBlocksTable.blog_id, blogId));

		const count = result[0]?.count;
		if (!count || Number(count) < 1) {
			throw new AppError('Blog must contain at least one block before publishing', 400);
		}
	},
};

