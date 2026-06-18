import { z } from 'zod';

export const caseStudyCategorySchema = z.enum([
	'pay-per-call',
	'pay-per-lead',
	'digital-marketing',
	'app-dev',
	'cms',
	'web-dev',
	'hire-call-center',
]);

export const caseStudyStatusSchema = z.enum(['draft', 'published', 'archived']);

export const caseStudyAccentSchema = z.enum([
	'pastel-peach',
	'pastel-lilac',
	'pastel-lime',
	'pastel-mint',
	'pastel-sky',
	'pastel-blush',
]);

const optionalUrl = z.union([z.string().url(), z.literal('')]).optional();

export const caseStudyCreateSchema = z.object({
	title: z.string().trim().min(2).max(200),
	slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(220).optional(),
	description: z.string().trim().min(10),
	imageUrl: optionalUrl,
	imageAlt: z.union([z.string().trim().max(255), z.literal('')]).optional(),
	accentColor: caseStudyAccentSchema.optional(),
	link: optionalUrl,
	category: caseStudyCategorySchema,
	status: caseStudyStatusSchema.optional(), // default 'draft' on the server
	displayOrder: z.coerce.number().int().min(0).optional(),
});

export const caseStudyUpdateSchema = caseStudyCreateSchema.partial();

export const caseStudyStatusUpdateSchema = z.object({ status: caseStudyStatusSchema });

export const caseStudyReorderSchema = z.object({
	items: z.array(z.object({ id: z.string().uuid(), displayOrder: z.number().int().min(0) })).min(1),
});

export const caseStudyListQuerySchema = z.object({
	category: z.union([caseStudyCategorySchema, z.array(caseStudyCategorySchema)]).optional(),
	status: z.union([caseStudyStatusSchema, z.array(caseStudyStatusSchema)]).optional(),
	search: z.string().optional(),
	sortBy: z.enum(['created_at', 'updated_at', 'display_order', 'status', 'title']).optional(),
	sortOrder: z.enum(['asc', 'desc']).optional(),
	page: z.coerce.number().int().min(1).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
});

export const caseStudyPublicListQuerySchema = z.object({
	category: caseStudyCategorySchema,
	limit: z.coerce.number().int().min(1).max(50).optional(),
});

export type CaseStudyCreateInput = z.infer<typeof caseStudyCreateSchema>;
export type CaseStudyUpdateInput = z.infer<typeof caseStudyUpdateSchema>;
export type CaseStudyStatusUpdateInput = z.infer<typeof caseStudyStatusUpdateSchema>;
export type CaseStudyReorderInput = z.infer<typeof caseStudyReorderSchema>;
export type CaseStudyListQueryInput = z.infer<typeof caseStudyListQuerySchema>;
export type CaseStudyPublicListQueryInput = z.infer<typeof caseStudyPublicListQuerySchema>;
