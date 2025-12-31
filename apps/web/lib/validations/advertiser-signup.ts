import * as z from 'zod';

export const advertiserSignupSchema = z.object({
	// Step 1: Contact Information
	fullName: z.string().min(2, 'Full name is required'),
	companyName: z.string().min(2, 'Company name is required'),
	companyWebsite: z.string().url('Please enter a valid URL'),
	email: z.string().email('Please enter a valid email address'),
	phone: z.string().min(10, 'Please enter a valid phone number'),
	imType: z.string().min(1, 'Please select an IM type'),
	imScreenName: z.string().min(1, 'Screen name is required'),

	// Step 2: Campaigns
	campaigns: z.array(z.string()).min(1, 'Please select at least one campaign'),
	otherCampaigns: z.string().optional(),

	// Step 3: Lead Generation
	leadGenMethods: z.array(z.string()).min(1, 'Please select at least one method'),
	otherLeadGen: z.string().optional(),
	leadsPerWeek: z.string().min(1, 'Please specify your lead volume'),
	additionalInfo: z.string().optional(),

	// Step 4: Location
	country: z.string().min(1, 'Country is required'),
	city: z.string().min(1, 'City is required'),
	address: z.string().min(5, 'Address is required'),
	zipCode: z.string().min(5, 'Zip/Postal code is required'),
});

export type AdvertiserSignupValues = z.infer<typeof advertiserSignupSchema>;
