import { z } from 'zod';
import { ROLE } from '@/utils/constants';

export const userImageSchema = z.object({
	url: z.string().url(),
	publicId: z.string().min(1),
});

export const userSchema = z.object({
	id: z.string().uuid(),
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
