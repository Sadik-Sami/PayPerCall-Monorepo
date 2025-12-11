import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { User, usersTable } from '@/db/schema/users.schema';
import { NewSession, Session, sessionsTable } from '@/db/schema/session.schema';
import { eq } from 'drizzle-orm';
import { signAccessToken, generateRefreshToken, refreshExpiresAt } from '@/utils/token.util';
import { LoginRequest } from '@/db/validator/auth.validator';
import { AppError } from '@/middlewares/errorHandler';
import { UnauthorizedError } from '@/utils/error.util';

export const authService = {
	async login(
		data: LoginRequest,
		userAgent?: string | null,
		ip?: string | null
	): Promise<{ user: User; accessToken: string; refreshToken: string; session: Session }> {
		const rows = await db.select().from(usersTable).where(eq(usersTable.email, data.email)).limit(1);
		const user = rows[0];
		if (!user) throw new UnauthorizedError('Invalid email or password');

		const ok = await bcrypt.compare(data.password, user.password);
		if (!ok) throw new UnauthorizedError('Invalid email or password');

		const accessToken = signAccessToken({ id: user.id, role: user.role });

		const refreshTokenPlain = generateRefreshToken();
		const hashedRefreshToken = await bcrypt.hash(refreshTokenPlain, 10);
		const expiresAt = refreshExpiresAt();

		const sessionData: NewSession = {
			user_id: user.id,
			refresh_token: hashedRefreshToken,
			user_agent: userAgent,
			ip: ip,
			expires_at: expiresAt,
		};

		const inserted = await db.insert(sessionsTable).values(sessionData).returning();
		const session = inserted[0];
		if (!session) throw new AppError('Failed to create session', 500);

		return { user, accessToken, refreshToken: refreshTokenPlain, session };
	},

	async refresh(
		sessionId: string,
		refreshTokenPlain: string
	): Promise<{ accessToken: string; refreshToken: string; session: Session; user: User }> {
		return await db.transaction(async (tx) => {
			// fetching session inside tx
			const rows = await tx.select().from(sessionsTable).where(eq(sessionsTable.id, sessionId)).limit(1);
			const session = rows[0];
			if (!session) throw new UnauthorizedError('Invalid session');

			// verifying refresh token
			const valid = await bcrypt.compare(refreshTokenPlain, session.refresh_token ?? '');
			if (!valid) {
				await tx.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
				throw new UnauthorizedError('Invalid refresh token');
			}

			// checking expiry
			if (new Date(session.expires_at) < new Date()) {
				await tx.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
				throw new UnauthorizedError('Refresh token expired');
			}

			// rotating refresh token
			const newPlain = generateRefreshToken();
			const newHashed = await bcrypt.hash(newPlain, 10);
			const newExpires = refreshExpiresAt();

			const updated = await tx
				.update(sessionsTable)
				.set({ refresh_token: newHashed, expires_at: newExpires, updated_at: new Date() })
				.where(eq(sessionsTable.id, sessionId))
				.returning();
			const newSession = updated[0];
			if (!newSession) throw new AppError('Failed to update session', 500);

			// fetch user
			const userRows = await tx.select().from(usersTable).where(eq(usersTable.id, session.user_id)).limit(1);
			const user = userRows[0];
			if (!user) throw new AppError('User not found', 404);

			const newAccess = signAccessToken({ id: user.id, role: user.role });

			return {
				accessToken: newAccess,
				refreshToken: newPlain,
				session: newSession,
				user,
			};
		});
	},
	async logout(sessionId: string) {
		await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
	},
};
