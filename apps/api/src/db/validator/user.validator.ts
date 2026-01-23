import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { usersTable } from '../schema/users.schema';
import { z } from 'zod';
import { roleSchema } from '../../utils/validation.util';

export const userImageSchema = z.object({
	url: z.url('Please provide a valid image URL'),
	publicId: z.string().min(1, 'Public ID is required'),
});

export const userInsertSchema = createInsertSchema(usersTable, {
	name: (schema) => schema.min(1, 'Name is required'),
	email: (schema) => schema.email('Please enter a valid email'),
	password: (schema) =>
		schema
			.min(8, 'Password must be at least 8 characters')
			.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
			.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
			.regex(/[0-9]/, 'Password must contain at least one number')
			.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
	phone: (schema) => schema.optional(),
	role: (schema) => schema.optional(),
	image: () => userImageSchema.optional(),
	isVerified: (schema) => schema.optional(),
	address_street: (schema) => schema.optional(),
	address_city: (schema) => schema.optional(),
	address_state: (schema) => schema.optional(),
	address_postal_code: (schema) => schema.optional(),
})
	.omit({ id: true, created_at: true })
	.refine((val) => !!val.email && !!val.password && !!val.name, {
		message: 'name, email and password are required',
	});

export const userSelectSchema = createSelectSchema(usersTable);
export const publicUserSelectSchema = userSelectSchema.omit({ password: true });

export const userUpdateSchema = createUpdateSchema(usersTable, {
	name: (schema) => schema.min(1, 'Name is required'),
	email: (schema) => schema.email('Please enter a valid email'),
}).omit({
	role: true,
	password: true,
});

export const changePasswordSchema = z.object({
	currentPassword: z.string().min(8, 'Current password is required'),
	newPassword: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export const changeRoleSchema = z.object({
	role: roleSchema,
});

export type ChangeRoleRequest = z.infer<typeof changeRoleSchema>;
