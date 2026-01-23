import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { config } from '../config/env';
import {
	TooManyRequestsError,
	ValidationError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
	ConflictError,
} from '../utils/error.util';

export class AppError extends Error {
	statusCode: number;
	details?: any;

	constructor(message: string, statusCode = 500, details?: any) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
		Error.captureStackTrace(this, this.constructor);
	}
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
	console.error('[Error]', {
		name: err?.name,
		message: err?.message,
		statusCode: err?.statusCode || 500,
		timestamp: new Date().toISOString(),
		path: req.path,
		method: req.method,
	});

	// Zod validation error
	if (err instanceof z.ZodError) {
		const fieldErrors: Record<string, string[]> = {};
		err.issues.forEach((issue) => {
			const path = issue.path.join('.');
			if (!fieldErrors[path]) {
				fieldErrors[path] = [];
			}
			fieldErrors[path].push(issue.message);
		});
		res.status(400).json({
			success: false,
			statusCode: 400,
			message: 'Validation failed',
			errors: fieldErrors,
		});
		return;
	}

	if (err instanceof ValidationError) {
		res.status(400).json({
			success: false,
			statusCode: 400,
			message: err.message,
			errors: err.details,
		});
		return;
	}

	if (err instanceof UnauthorizedError) {
		res.status(401).json({
			success: false,
			statusCode: 401,
			message: err.message,
		});
		return;
	}

	if (err instanceof ForbiddenError) {
		res.status(403).json({
			success: false,
			statusCode: 403,
			message: err.message,
		});
		return;
	}

	if (err instanceof NotFoundError) {
		res.status(404).json({
			success: false,
			statusCode: 404,
			message: err.message,
		});
		return;
	}

	if (err instanceof ConflictError) {
		res.status(409).json({
			success: false,
			statusCode: 409,
			message: err.message,
		});
		return;
	}

	if (err instanceof TooManyRequestsError) {
		res.status(429).json({
			success: false,
			statusCode: 429,
			message: err.message,
		});
		return;
	}

	// Drizzle/postgres unique violation
	const pgCode = err?.cause?.code ?? err?.code;
	if (pgCode === '23505') {
		res.status(409).json({
			success: false,
			statusCode: 409,
			message: 'Conflict: resource already exists',
		});
		return;
	}

	// AppError - controlled errors
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			success: false,
			statusCode: err.statusCode,
			message: err.message,
			...(err.details ? { errors: err.details } : {}),
		});
		return;
	}

	// Unhandled errors
	const isDev = config.nodeEnv === 'development';
	res.status(500).json({
		success: false,
		statusCode: 500,
		message: 'Internal server error',
		// Only expose error details in development
		...(isDev ? { error: err?.message, stack: err?.stack } : {}),
	});
	return;
}
