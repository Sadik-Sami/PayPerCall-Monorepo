import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import { blogsTable } from '../schema/blogs.schema';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogStatusSchema = z.enum(['draft', 'published', 'unlisted']);

export const blogCreateSchema = createInsertSchema(blogsTable, {
	title: (schema) => schema.min(1, 'Title is required'),
	slug: (schema) => schema.regex(slugRegex, 'Slug must be lowercase, hyphen-separated').optional(),
	excerpt: (schema) => schema.optional(),
	cover_image_url: (schema) => schema.url('Cover image URL must be valid').nullable().optional(),
	seo_title: (schema) => schema.max(60, 'SEO title must be 60 characters or less').optional(),
	seo_description: (schema) => schema.max(160, 'SEO description must be 160 characters or less').optional(),
	is_featured: (schema) => schema.optional(),
	status: () => blogStatusSchema.optional(),
	author_id: (schema) => schema.optional(),
}).omit({ id: true, created_at: true, updated_at: true, published_at: true });

export const blogUpdateSchema = createUpdateSchema(blogsTable, {
	title: (schema) => schema.min(1, 'Title is required'),
	slug: (schema) => schema.regex(slugRegex, 'Slug must be lowercase, hyphen-separated'),
	excerpt: (schema) => schema.optional(),
	cover_image_url: (schema) => schema.url('Cover image URL must be valid').nullable().optional(),
	seo_title: (schema) => schema.max(60, 'SEO title must be 60 characters or less').optional(),
	seo_description: (schema) => schema.max(160, 'SEO description must be 160 characters or less').optional(),
	status: () => blogStatusSchema.optional(),
}).omit({ id: true, created_at: true, updated_at: true });

export const blogPublishSchema = z.object({
	status: z.literal('published'),
});

export type BlogCreateInput = z.infer<typeof blogCreateSchema>;
export type BlogUpdateInput = z.infer<typeof blogUpdateSchema>;

