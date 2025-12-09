import { db } from '@/db';
import { sessionsTable } from '@/db/schema/session.schema';
import { eq, lt } from 'drizzle-orm';

export const sessionService = {
	async cleanupExpiredSessions(): Promise<number> {
		const now = new Date();
		const result = await db.delete(sessionsTable).where(lt(sessionsTable.expires_at, now)).returning();
		return result.length;
	},

	async getSessionStats(): Promise<{ total: number; expired: number; active: number }> {
		const now = new Date();
		const allSessions = await db.select().from(sessionsTable);
		const expiredSessions = allSessions.filter((s) => new Date(s.expires_at) < now);
		const activeSessions = allSessions.filter((s) => new Date(s.expires_at) >= now);

		return {
			total: allSessions.length,
			expired: expiredSessions.length,
			active: activeSessions.length,
		};
	},

	async revokeUserSessions(userId: string): Promise<number> {
		const result = await db.delete(sessionsTable).where(eq(sessionsTable.user_id, userId)).returning();
		return result.length;
	},
};
