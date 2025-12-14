import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { usersTable, User, NewUser } from '@/db/schema/users.schema';
import { eq } from 'drizzle-orm';
import { AppError } from '@/middlewares/errorHandler';
import { sessionsTable } from '@/db/schema';

export const userServices = {
	async getByEmail(email: string): Promise<User | undefined> {
		const rows = await db.select().from(usersTable).where(eq(usersTable.email, email));
		return rows[0];
	},
	async getById(id: string): Promise<User | undefined> {
		const rows = await db.select().from(usersTable).where(eq(usersTable.id, id));
		return rows[0];
	},
	async create(data: NewUser): Promise<User> {
		const inserted = await db.insert(usersTable).values(data).returning();
		const user = inserted[0];
		if (!user) throw new AppError('Failed to create user', 500);
		return user;
	},
	async updateProfile(id: string, data: Partial<NewUser>): Promise<User | undefined> {
		const [updated] = await db
			.update(usersTable)
			.set({ ...data, updated_at: new Date() })
			.where(eq(usersTable.id, id))
			.returning();
		return updated;
	},
	async changePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
		await db.transaction(async (tx) => {
			const rows = await tx.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
			const user = rows[0];
			if (!user) throw new AppError('User not found', 404);

			// Verify current password
			const isValid = await bcrypt.compare(currentPassword, user.password);
			if (!isValid) throw new AppError('Current password is incorrect', 400);

			// Hash new password
			const hashedNewPassword = await bcrypt.hash(newPassword, 10);

			// Update password
			await tx
				.update(usersTable)
				.set({
					password: hashedNewPassword,
					updated_at: new Date(),
				})
				.where(eq(usersTable.id, id));

			// Revoking all sessions
			const deletedSessions = await tx.delete(sessionsTable).where(eq(sessionsTable.user_id, id)).returning();

			// Log for security audit
			console.log(`[Security] Password changed for user ${id}. Revoked ${deletedSessions.length} sessions.`);
		});
	},
	async listAll(): Promise<User[]> {
		return db.select().from(usersTable);
	},
};
