import { z } from 'zod';

/**
 * UUID validation schema
 * Used to validate user IDs, session IDs, and other UUID fields
 * Prevents SQL injection and type confusion attacks
 */
export const uuidSchema = z.uuid({
	message: 'Invalid UUID format',
});

/**
 * Role validation schema
 * Ensures role values match our database enum
 */
enum Role {
	ADMIN = 'admin',
	USER = 'user',
}
export const roleSchema = z.enum(Role, {
	error: () => ({ message: 'Invalid role' }),
});

/**
 * JWT payload validation schema
 * Validates the structure of decoded JWT tokens at runtime
 */
export const jwtPayloadSchema = z.object({
	id: uuidSchema,
	role: roleSchema,
	iat: z.number().optional(),
	exp: z.number().optional(),
});

/**
 * Validates a UUID string
 * @param value - The string to validate
 * @returns true if valid UUID, false otherwise
 */
export function isValidUUID(value: unknown): value is string {
	return uuidSchema.safeParse(value).success;
}
