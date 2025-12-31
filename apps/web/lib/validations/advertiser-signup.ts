import * as z from 'zod';
import { phoneSchema } from '@workspace/ui/components/phone-input';

// Account Information Tab Schema
export const accountInformationSchema = z.object({
	name: z.string().min(2, 'Name is required'),
	companyName: z.string().min(2, 'Company name is required'),
	companyWebsite: z.string().url('Please enter a valid URL'),
	email: z.string().email('Please enter a valid email address'),
	imType: z.string().min(1, 'Please select an IM type'),
	screenName: z.string().min(1, 'Screen name is required'),
	country: z.string().min(1, 'Country is required'),
	city: z.string().min(1, 'City is required'),
	address: z.string().min(5, 'Address is required'),
	zipCode: z.string().min(1, 'Zip/Postal code is required'),
	phone: phoneSchema,
});

// Promotional Preferences Tab Schema
export const promotionalPreferencesSchema = z.object({
	marketNiche: z.array(z.string()).min(1, 'Please select at least one market niche'),
	topVertical: z.array(z.string()).min(1, 'Please select at least one top vertical'),
	productName: z.string().min(1, 'Product name is required'),
	trafficTypes: z.array(z.string()).min(1, 'Please select at least one traffic type'),
	otherMarketingCompanies: z.string().optional(),
	budget: z.string().min(1, 'Please select a budget range'),
	additionalInfo: z.string().optional(),
	termsAccepted: z.boolean().refine((val) => val === true, {
		message: 'You must accept the Terms of Agreement and Privacy Policy',
	}),
});

// Combined Schema
export const advertiserSignupSchema = accountInformationSchema.and(promotionalPreferencesSchema);

export type AccountInformationValues = z.infer<typeof accountInformationSchema>;
export type PromotionalPreferencesValues = z.infer<typeof promotionalPreferencesSchema>;
export type AdvertiserSignupValues = z.infer<typeof advertiserSignupSchema>;

