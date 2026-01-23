import type { User } from '../db/schema/users.schema';

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string;
				role: string;
			} | null;
		}
	}
}
