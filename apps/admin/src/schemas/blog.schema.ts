import { z } from 'zod';

export const BLOG_LIMITS = {
	TITLE_MAX: 255,
	SLUG_MAX: 255,
	EXCERPT_MAX: 500,
	URL_MAX: 2048,
	SEO_TITLE_MAX: 60,
	SEO_DESCRIPTION_MAX: 160,
} as const;

export const BLOG_SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const emptyStringToUndefined = (value: unknown) => {
	if (typeof value !== 'string') return value;
	const trimmed = value.trim();
	return trimmed.length === 0 ? undefined : trimmed;
};

export const blogTitleSchema = z
	.string()
	.min(1, 'Title is required')
	.max(BLOG_LIMITS.TITLE_MAX, `Title must be at most ${BLOG_LIMITS.TITLE_MAX} characters`);

export const blogSlugSchema = z
	.string()
	.min(1, 'Slug is required')
	.max(BLOG_LIMITS.SLUG_MAX, `Slug must be at most ${BLOG_LIMITS.SLUG_MAX} characters`)
	.regex(BLOG_SLUG_REGEX, 'Slug must be lowercase and contain only letters, numbers, and hyphens');

export const blogExcerptSchema = z
	.string()
	.max(BLOG_LIMITS.EXCERPT_MAX, `Excerpt must be at most ${BLOG_LIMITS.EXCERPT_MAX} characters`);

export const blogSeoTitleSchema = z
	.string()
	.max(BLOG_LIMITS.SEO_TITLE_MAX, `SEO title must be at most ${BLOG_LIMITS.SEO_TITLE_MAX} characters`);

export const blogSeoDescriptionSchema = z
	.string()
	.max(
		BLOG_LIMITS.SEO_DESCRIPTION_MAX,
		`SEO description must be at most ${BLOG_LIMITS.SEO_DESCRIPTION_MAX} characters`
	);

export const blogCoverImageUrlSchema = z
	.string()
	.max(BLOG_LIMITS.URL_MAX, `Cover image URL must be at most ${BLOG_LIMITS.URL_MAX} characters`)
	.url('Cover image URL must be a valid URL');

export const tiptapNodeSchema = z
	.object({
		type: z.string().min(1, 'Block content must include a node type'),
	})
	.passthrough();

export const blogCreateSchema = z.object({
	title: blogTitleSchema,
	slug: z.preprocess(emptyStringToUndefined, blogSlugSchema.optional()),
	excerpt: z.preprocess(emptyStringToUndefined, blogExcerptSchema.optional()).nullable().optional(),
	cover_image_url: z.preprocess(emptyStringToUndefined, blogCoverImageUrlSchema.optional()).nullable().optional(),
	seo_title: z.preprocess(emptyStringToUndefined, blogSeoTitleSchema.optional()).nullable().optional(),
	seo_description: z.preprocess(emptyStringToUndefined, blogSeoDescriptionSchema.optional()).nullable().optional(),
	is_featured: z.boolean().optional(),
	status: z.enum(['draft', 'published', 'unlisted']).optional(),
});

export const blogUpdateSchema = blogCreateSchema.partial();

export const blogBlockCreateSchema = z.object({
	type: z.enum([
		'paragraph',
		'heading',
		'image',
		'gallery',
		'quote',
		'code',
		'bullet_list',
		'ordered_list',
		'divider',
	]),
	content: tiptapNodeSchema,
});

export const blogBlockUpdateSchema = blogBlockCreateSchema.partial().extend({
	content: tiptapNodeSchema.optional(),
});

export const blogBlocksReorderSchema = z.object({
	blogId: z.string().uuid(),
	orderedBlockIds: z
		.array(z.string().uuid())
		.min(1, 'At least one block id is required')
		.superRefine((ids, ctx) => {
			const set = new Set(ids);
			if (set.size !== ids.length) {
				ctx.addIssue({
					code: 'custom',
					message: 'orderedBlockIds must not contain duplicates',
				});
			}
		}),
});

export type BlogCreateInput = z.infer<typeof blogCreateSchema>;
export type BlogUpdateInput = z.infer<typeof blogUpdateSchema>;
export type BlogBlockCreateInput = z.infer<typeof blogBlockCreateSchema>;
export type BlogBlockUpdateInput = z.infer<typeof blogBlockUpdateSchema>;
export type BlogBlocksReorderInput = z.infer<typeof blogBlocksReorderSchema>;

export interface PublishReadiness {
	canPublish: boolean;
	blockingReasons: string[];
	warnings: string[];
}

/**
 * Mirrors the API-side publish rules from `blog-plan.md`:
 * - title present
 * - slug present + valid
 * - cover_image_url present
 * - at least 1 block exists
 */
export function getPublishReadiness(params: {
	title?: unknown;
	slug?: unknown;
	excerpt?: unknown;
	cover_image_url?: unknown;
	blockCount: number;
}): PublishReadiness {
	const blockingReasons: string[] = [];
	const warnings: string[] = [];

	const title = typeof params.title === 'string' ? params.title.trim() : '';
	if (!blogTitleSchema.safeParse(title).success) {
		blockingReasons.push('Title is required.');
	}

	const slug = typeof params.slug === 'string' ? params.slug.trim() : '';
	if (!blogSlugSchema.safeParse(slug).success) {
		blockingReasons.push('Slug must be present and match the required format (lowercase, hyphens).');
	}

	const cover = typeof params.cover_image_url === 'string' ? params.cover_image_url.trim() : '';
	if (!blogCoverImageUrlSchema.safeParse(cover).success) {
		blockingReasons.push('Cover image URL is required.');
	}

	if (params.blockCount < 1) {
		blockingReasons.push('At least one content block is required.');
	}

	const excerpt = typeof params.excerpt === 'string' ? params.excerpt.trim() : '';
	if (excerpt.length === 0) {
		warnings.push('Excerpt is recommended for SEO quality.');
	} else if (!blogExcerptSchema.safeParse(excerpt).success) {
		blockingReasons.push(`Excerpt must be at most ${BLOG_LIMITS.EXCERPT_MAX} characters.`);
	}

	return {
		canPublish: blockingReasons.length === 0,
		blockingReasons,
		warnings,
	};
}
