import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';
import type { Request, Response } from 'express';

type CreateOpts = Partial<{
	windowMs: number;
	limit: number;
	standardHeaders: 'draft-6' | 'draft-7' | 'draft-8';
	legacyHeaders: boolean;
	keyGenerator?: (req: Request) => string;
	skip?: (req: Request) => boolean;
	handler?: (req: Request, res: Response) => void;
	message?: unknown;
	statusCode?: number;
}>;

export function createRateLimiter(customOpts: CreateOpts = {}): RateLimitRequestHandler {
	const defaults: CreateOpts = {
		windowMs: 15 * 60 * 1000,
		limit: 100,
		standardHeaders: 'draft-8',
		legacyHeaders: false,
		handler: (req: Request, res: Response) => {
			res.status(429).json({
				success: false,
				statusCode: 429,
				message: 'Too many requests, please try again later.',
			});
		},
	};

	const opts = { ...defaults, ...customOpts } as any;
  
	return rateLimit(opts);
}
