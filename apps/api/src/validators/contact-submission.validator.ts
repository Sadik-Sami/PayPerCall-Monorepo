import { z } from 'zod';

export const contactStatusSchema = z.enum([
	'pending',
	'contacted',
	'scheduled',
	'completed',
	'declined',
]);

const optionalString = z.string().trim().optional().or(z.literal(''));

const optionalUrl = z
	.string()
	.trim()
	.optional()
	.or(z.literal(''))
	.refine((value) => !value || /^https?:\/\/.+/i.test(value), {
		message: 'Use a valid URL that starts with http:// or https://',
	});

const optionalPhone = z
	.string()
	.trim()
	.optional()
	.or(z.literal(''))
	.refine((value) => !value || value.length >= 7, {
		message: 'Please enter a valid phone number',
	});

export const contactSubmissionCreateSchema = z.object({
	fullName: z.string().trim().min(2, 'Full name is required'),
	workEmail: z.email('Please enter a valid work email'),
	company: z.string().trim().min(2, 'Company name is required'),
	phone: optionalPhone,
	preferredContactMethod: z.string().trim().min(1, 'Preferred contact method is required'),

	serviceCategory: z.string().trim().min(1, 'Service category is required'),
	serviceDetail: z.string().trim().min(1, 'Service detail is required'),
	businessWebsite: optionalUrl,
	companySize: z.string().trim().min(1, 'Company size is required'),
	monthlyBudget: optionalString,
	targetRegions: z.string().trim().min(2, 'Target geography is required'),

	desiredDate: z.coerce.date(),
	preferredMeetingWindow: z.string().trim().min(1, 'Preferred meeting window is required'),
	timezone: z.string().trim().min(2, 'Timezone is required'),
	additionalContext: optionalString,
	consent: z.literal(true, { error: 'Consent is required' }),
});

export const contactSubmissionStatusUpdateSchema = z.object({
	status: contactStatusSchema,
});

export const contactSubmissionListQuerySchema = z.object({
	status: z.union([contactStatusSchema, z.array(contactStatusSchema)]).optional(),
	serviceCategory: z.union([z.string(), z.array(z.string())]).optional(),
	search: z.string().optional(),
	sortBy: z.enum(['created_at', 'updated_at', 'desired_date', 'status']).optional(),
	sortOrder: z.enum(['asc', 'desc']).optional(),
	page: z.coerce.number().int().min(1).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type ContactSubmissionCreateInput = z.infer<typeof contactSubmissionCreateSchema>;
export type ContactSubmissionStatusUpdateInput = z.infer<typeof contactSubmissionStatusUpdateSchema>;
export type ContactSubmissionListQueryInput = z.infer<typeof contactSubmissionListQuerySchema>;
