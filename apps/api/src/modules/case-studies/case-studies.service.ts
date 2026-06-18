import { db } from '../../db';
import { caseStudiesTable, type CaseStudy, type NewCaseStudy } from '../../db/schema';
import { AppError } from '../../utils/error.util';
import { and, asc, desc, eq, ilike, or, sql } from 'drizzle-orm';
import type {
	CaseStudyCreateInput,
	CaseStudyUpdateInput,
	CaseStudyReorderInput,
	CaseStudyListQueryInput,
	CaseStudyPublicListQueryInput,
} from '../../validators/case-study.validator';
import { slugify } from '../../utils/slug.util';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const caseStudyServices = {
	async create(data: CaseStudyCreateInput, createdBy: string | null): Promise<CaseStudy> {
		const title = (data.title ?? '').trim();
		if (!title) throw new AppError('Title is required', 400);

		let requestedSlug = typeof data.slug === 'string' ? data.slug.trim() : '';
		if (requestedSlug.length > 0 && !slugRegex.test(requestedSlug)) {
			throw new AppError('Slug must be lowercase, hyphen-separated', 400);
		}

		if (requestedSlug.length > 0) {
			const existing = await db
				.select({ id: caseStudiesTable.id })
				.from(caseStudiesTable)
				.where(eq(caseStudiesTable.slug, requestedSlug))
				.limit(1);
			if (existing[0]) throw new AppError('Slug already exists', 409);
		}

		const base = requestedSlug.length > 0 ? requestedSlug : slugify(title);
		let slug = base;
		for (let i = 2; i < 1000; i += 1) {
			const exists = await db
				.select({ id: caseStudiesTable.id })
				.from(caseStudiesTable)
				.where(eq(caseStudiesTable.slug, slug))
				.limit(1);
			if (!exists[0]) break;
			slug = `${base}-${i}`;
		}

		if (!slugRegex.test(slug)) throw new AppError('Failed to generate a valid slug', 500);

		const insert: NewCaseStudy = {
			title,
			slug,
			description: data.description,
			category: data.category,
			image_url: data.imageUrl ? data.imageUrl : null,
			image_alt: data.imageAlt ? data.imageAlt : null,
			accent_color: data.accentColor ?? null,
			link: data.link ? data.link : null,
			status: data.status ?? 'draft',
			display_order: data.displayOrder ?? 0,
			published_at: data.status === 'published' ? new Date() : null,
			created_by: createdBy,
		};

		const [created] = await db.insert(caseStudiesTable).values(insert).returning();
		if (!created) throw new AppError('Failed to create case study', 500);
		return created;
	},

	async getByIdOrThrow(id: string): Promise<CaseStudy> {
		const rows = await db.select().from(caseStudiesTable).where(eq(caseStudiesTable.id, id)).limit(1);
		if (!rows[0]) throw new AppError('Case study not found', 404);
		return rows[0];
	},

	async update(id: string, data: CaseStudyUpdateInput): Promise<CaseStudy> {
		const existing = await this.getByIdOrThrow(id);

		const updates: Partial<NewCaseStudy> & { published_at?: Date | null } = {
			updated_at: new Date(),
		};

		if (data.title !== undefined) updates.title = data.title;
		if (data.slug !== undefined) updates.slug = data.slug;
		if (data.description !== undefined) updates.description = data.description;
		if (data.imageUrl !== undefined) updates.image_url = data.imageUrl === '' ? null : data.imageUrl;
		if (data.imageAlt !== undefined) updates.image_alt = data.imageAlt === '' ? null : data.imageAlt;
		if (data.accentColor !== undefined) updates.accent_color = data.accentColor;
		if (data.link !== undefined) updates.link = data.link === '' ? null : data.link;
		if (data.category !== undefined) updates.category = data.category;
		if (data.displayOrder !== undefined) updates.display_order = data.displayOrder;

		if (data.status !== undefined) {
			updates.status = data.status;
			if (data.status === 'published' && !existing.published_at) {
				updates.published_at = new Date();
			}
		}

		const [updated] = await db.update(caseStudiesTable).set(updates).where(eq(caseStudiesTable.id, id)).returning();
		if (!updated) throw new AppError('Failed to update case study', 500);
		return updated;
	},

	async updateStatus(id: string, status: CaseStudyUpdateInput['status']): Promise<CaseStudy> {
		if (!status) throw new AppError('Status is required', 400);
		return this.update(id, { status });
	},

	async reorder(data: CaseStudyReorderInput): Promise<void> {
		if (!data.items || data.items.length === 0) return;

		await db.transaction(async (tx) => {
			for (const item of data.items) {
				await tx
					.update(caseStudiesTable)
					.set({ display_order: item.displayOrder, updated_at: new Date() })
					.where(eq(caseStudiesTable.id, item.id));
			}
		});
	},

	async remove(id: string): Promise<void> {
		const deleted = await db.delete(caseStudiesTable).where(eq(caseStudiesTable.id, id)).returning();
		if (!deleted[0]) throw new AppError('Case study not found', 404);
	},

	async listAdmin(query: CaseStudyListQueryInput) {
		const page = query.page ?? 1;
		const limit = query.limit ?? 10;
		const offset = (page - 1) * limit;

		const conditions = [];

		if (query.category) {
			if (Array.isArray(query.category)) {
				// handled via simple or
				const catConditions = query.category.map((c) => eq(caseStudiesTable.category, c));
				conditions.push(or(...catConditions));
			} else {
				conditions.push(eq(caseStudiesTable.category, query.category));
			}
		}

		if (query.status) {
			if (Array.isArray(query.status)) {
				const statConditions = query.status.map((s) => eq(caseStudiesTable.status, s));
				conditions.push(or(...statConditions));
			} else {
				conditions.push(eq(caseStudiesTable.status, query.status));
			}
		}

		if (query.search) {
			const searchTerm = `%${query.search}%`;
			conditions.push(
				or(
					ilike(caseStudiesTable.title, searchTerm),
					ilike(caseStudiesTable.description, searchTerm),
					ilike(caseStudiesTable.slug, searchTerm)
				)
			);
		}

		const where = conditions.length > 0 ? and(...conditions) : undefined;

		let orderBy = desc(caseStudiesTable.updated_at);
		if (query.sortBy) {
			const col = {
				created_at: caseStudiesTable.created_at,
				updated_at: caseStudiesTable.updated_at,
				display_order: caseStudiesTable.display_order,
				status: caseStudiesTable.status,
				title: caseStudiesTable.title,
			}[query.sortBy];

			if (col) {
				orderBy = query.sortOrder === 'asc' ? asc(col) : desc(col);
			}
		}

		const [countRes] = await db
			.select({ count: sql<number>`cast(count(*) as integer)` })
			.from(caseStudiesTable)
			.where(where);

		const total = countRes?.count ?? 0;

		const data = await db.select().from(caseStudiesTable).where(where).orderBy(orderBy).limit(limit).offset(offset);

		return {
			data,
			meta: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		};
	},

	async listPublic(query: CaseStudyPublicListQueryInput): Promise<CaseStudy[]> {
		const limit = query.limit ?? 12;

		return db
			.select()
			.from(caseStudiesTable)
			.where(and(eq(caseStudiesTable.category, query.category), eq(caseStudiesTable.status, 'published')))
			.orderBy(asc(caseStudiesTable.display_order), desc(caseStudiesTable.created_at))
			.limit(limit);
	},
};
