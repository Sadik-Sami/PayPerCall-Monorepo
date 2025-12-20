import { z } from 'zod';
import { ROLE } from '@/utils/constants';

export const userImageSchema = z.object({
	url: z.url(),
	publicId: z.string().min(1),
});

export const userSchema = z.object({
	id: z.uuid(),
	name: z.string(),
	email: z.string().email(),
	image: userImageSchema.nullable(),
	role: z.enum([ROLE.ADMIN, ROLE.USER]),
	isVerified: z.boolean(),
	phone: z.string().nullable(),
	address_street: z.string().nullable(),
	address_city: z.string().nullable(),
	address_state: z.string().nullable(),
	address_postal_code: z.string().nullable(),
	created_at: z.string(),
	updated_at: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;

export const updateProfileSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
	email: z.string().email('Please enter a valid email'),
	phone: z.string().optional().nullable(),
	address_street: z.string().optional().nullable(),
	address_city: z.string().optional().nullable(),
	address_state: z.string().optional().nullable(),
	address_postal_code: z.string().optional().nullable(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, 'Current password is required'),
		newPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
			.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
			.regex(/[0-9]/, 'Password must contain at least one number')
			.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
		confirmPassword: z.string().min(1, 'Please confirm your new password'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
