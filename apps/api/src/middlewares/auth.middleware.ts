import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { verifyAccessToken } from '@/utils/token.util';
import { db } from '@/db';
import { sessionsTable } from '@/db/schema/session.schema';
import { usersTable } from '@/db/schema/users.schema';
import { eq } from 'drizzle-orm';
import { AppError } from './errorHandler';
import { UnauthorizedError, ForbiddenError } from '@/utils/error.util';

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const authHeader = req.get('authorization');
		if (authHeader?.startsWith('Bearer ')) {
			const [scheme, token] = authHeader.split(' ');

			if (scheme?.toLowerCase() !== 'bearer' || !token) {
				throw new UnauthorizedError('Invalid authorization header');
			}

			try {
				const payload = verifyAccessToken(token);
				if (!payload.id) throw new UnauthorizedError('Invalid token payload');

				req.user = { id: payload.id, role: payload.role };
				return next();
			} catch (err) {
				// token invalid or expired — fallback to cookies
			}
		}

		// Fallback: session cookies
		const sessionId = req.cookies?.sessionId;
		const refresh = req.cookies?.refresh_token;
		if (sessionId && refresh) {
			const rows = await db.select().from(sessionsTable).where(eq(sessionsTable.id, sessionId)).limit(1);
			const session = rows[0];
			if (!session) throw new UnauthorizedError('Invalid session');

			// Checking expiry
			if (new Date(session.expires_at) < new Date()) {
				throw new UnauthorizedError('Session expired');
			}

			// Comparing with hashed token
			const hashed = session.refresh_token ?? '';
			const ok = await bcrypt.compare(refresh, hashed);
			if (!ok) {
				// revoke session
				await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
				throw new UnauthorizedError('Invalid authentication');
			}

			// Get the user
			const userRows = await db.select().from(usersTable).where(eq(usersTable.id, session.user_id)).limit(1);
			const user = userRows[0];
			if (!user) throw new AppError('User not found', 404);

			req.user = { id: user.id, role: user.role };
			return next();
		}

		// No credentials provided
		throw new UnauthorizedError();
	} catch (err) {
		next(err);
	}
}

export const authorize = (...allowedRoles: string[]) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		if (!req.user) {
			return next(new UnauthorizedError());
		}
		if (!allowedRoles.includes(req.user.role)) {
			return next(new ForbiddenError('You do not have permission to access this resource'));
		}
		next();
	};
};
