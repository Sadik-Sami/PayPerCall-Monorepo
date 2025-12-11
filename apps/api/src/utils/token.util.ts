import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { JwtPayload } from '../types/auth';
import { jwtPayloadSchema } from './validation.util';

export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15m';
export const REFRESH_TOKEN_DAYS = Number(process.env.REFRESH_TOKEN_DAYS ?? '30');

export function signAccessToken(payload: object) {
	if (!process.env.JWT_ACCESS_SECRET) throw new Error('Missing JWT_ACCESS_SECRET');
	return jwt.sign(
		payload,
		process.env.JWT_ACCESS_SECRET as Secret,
		{ expiresIn: ACCESS_TOKEN_EXPIRES_IN } as SignOptions
	);
}

export function verifyAccessToken(token: string): JwtPayload {
	if (!process.env.JWT_ACCESS_SECRET) throw new Error('Missing JWT_ACCESS_SECRET');

	const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
	const result = jwtPayloadSchema.safeParse(decoded);

	if (!result.success) {
		console.error('[JWT Validation Error]', result.error.issues);
		throw new Error('Invalid token payload structure');
	}

	return result.data;
}

export function generateRefreshToken() {
	return crypto.randomBytes(64).toString('hex');
}

export function refreshExpiresAt(): Date {
	return new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);
}

export function refreshCookieOptions() {
	const isProd = process.env.NODE_ENV === 'production';
	return {
		httpOnly: true,
		secure: isProd,
		sameSite: 'strict' as const,
		path: '/api/auth',
		maxAge: REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000,
	};
}
