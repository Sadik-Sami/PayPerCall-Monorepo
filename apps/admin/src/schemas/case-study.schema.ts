import { z } from 'zod';

export const caseStudyClientSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	slug: z.string().optional(),
	description: z.string().min(1, 'Description is required'),
	category: z.enum(
		['pay-per-call', 'pay-per-lead', 'digital-marketing', 'app-dev', 'cms', 'web-dev', 'hire-call-center'],
		{ error: 'Category is required' },
	),
	imageUrl: z.url().optional().or(z.literal('')),
	imageAlt: z.string().optional(),
	accentColor: z
		.enum(['pastel-peach', 'pastel-lilac', 'pastel-lime', 'pastel-mint', 'pastel-sky', 'pastel-blush'])
		.optional()
		.nullable(),
	displayOrder: z.coerce.number().default(0),
	status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export type CaseStudyFormValues = z.infer<typeof caseStudyClientSchema>;
