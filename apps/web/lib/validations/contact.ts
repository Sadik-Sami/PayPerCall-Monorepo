import { z } from 'zod';

const optionalUrl = z
	.string()
	.trim()
	.optional()
	.refine((value) => !value || /^https?:\/\/.+/i.test(value), {
		message: 'Use a valid URL that starts with http:// or https://',
	});

const optionalPhone = z
	.string()
	.trim()
	.optional()
	.refine((value) => !value || value.length >= 7, {
		message: 'Please enter a valid phone number',
	});

export const contactStepOneSchema = z.object({
	fullName: z.string().trim().min(2, 'Please enter your full name'),
	workEmail: z.email('Please enter a valid work email'),
	company: z.string().trim().min(2, 'Please enter your company name'),
	phone: optionalPhone,
	preferredContactMethod: z.string().trim().min(1, 'Select your preferred contact method'),
});

export const contactStepTwoSchema = z.object({
	serviceCategory: z.string().trim().min(1, 'Please select a service category'),
	serviceDetail: z.string().trim().min(1, 'Please choose the service detail that fits best'),
	businessWebsite: optionalUrl,
	companySize: z.string().trim().min(1, 'Select your company size'),
	monthlyBudget: z.string().trim().optional(),
	targetRegions: z.string().trim().min(2, 'Please specify target geography'),
});

export const contactStepThreeSchema = z.object({
	desiredDate: z.date(),
	preferredMeetingWindow: z.string().trim().min(1, 'Select your preferred meeting window'),
	timezone: z.string().trim().min(2, 'Please provide your timezone'),
	additionalContext: z.string().trim().optional(),
	consent: z.boolean().refine((value) => value, {
		message: 'You need to accept this before submitting',
	}),
});

export const contactFormSchema = contactStepOneSchema
	.merge(contactStepTwoSchema)
	.merge(contactStepThreeSchema);

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const CONTACT_STEP_FIELDS: Array<Array<keyof ContactFormValues>> = [
	['fullName', 'workEmail', 'company', 'phone', 'preferredContactMethod'],
	['serviceCategory', 'serviceDetail', 'businessWebsite', 'companySize', 'monthlyBudget', 'targetRegions'],
	[
		'desiredDate',
		'preferredMeetingWindow',
		'timezone',
		'additionalContext',
		'consent',
	],
];
