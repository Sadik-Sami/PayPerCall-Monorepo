import { RequestHandler } from 'express';
import { createRateLimiter } from '@/utils/rateLimiter.util';


export const globalRateLimiter: RequestHandler = createRateLimiter({
	windowMs: 60 * 1000, // 1 minute
	limit: 200, // 200 requests per minute per IP
});

/**
 * Signup limiter.
 */
export const signupRateLimiter: RequestHandler = createRateLimiter({
	windowMs: 60 * 60 * 1000, // 1 hour
	limit: 5, // 5 signups per hour per IP
	handler: (req, res) => {
		res.status(429).json({
			success: false,
			statusCode: 429,
			message: 'Too many signup attempts from this IP, please try again later.',
		});
	},
});

export const loginRateLimiter: RequestHandler = createRateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 10, // 10 login attempts per 15 minutes per IP
	handler: (req, res) => {
		res.status(429).json({
			success: false,
			statusCode: 429,
			message: 'Too many login attempts, please try again later.',
		});
	},
});
