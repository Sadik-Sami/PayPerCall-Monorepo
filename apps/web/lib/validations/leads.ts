import { z } from 'zod';

export const leadStatusSchema = z.enum(['pending', 'processing', 'replied', 'won', 'lost']);

export const leadCreateSchema = z.object({
	name: z.string().min(1, 'Full name is required'),
	email: z.string().email('Please enter a valid email'),
	company: z.string().optional(),
	projectType: z.string().optional(),
	projectSummary: z.string().optional(),
	category: z.string().min(1, 'Category is required'),
	sourcePage: z.string().min(1, 'Source page is required'),
});

export const leadFormSchema = leadCreateSchema.omit({
	category: true,
	sourcePage: true,
});

export type LeadCreateInput = z.infer<typeof leadCreateSchema>;
export type LeadFormInput = z.infer<typeof leadFormSchema>;

export function requireProjectSummary(val: { projectSummary?: string }, formVariant: 'short' | 'detailed') {
	if (formVariant === 'detailed' && (!val.projectSummary || val.projectSummary.trim().length === 0)) {
		return { ok: false as const, message: 'Project context is required' };
	}
	return { ok: true as const };
}


