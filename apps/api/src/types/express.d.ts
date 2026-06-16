import 'express';
import type { JwtPayload } from './auth';

declare global {
	namespace Express {
		interface Request {
			user?: Pick<JwtPayload, 'id' | 'role'> | null;
		}
	}
}

// Makes this file a module so the `declare global` augmentation is applied.
export {};
