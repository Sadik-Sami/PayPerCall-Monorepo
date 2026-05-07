import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { config } from '../config/env';
import {
	AppError,
	TooManyRequestsError,
	ValidationError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
	ConflictError,
} from '../utils/error.util';

// Express error middleware requires `err: unknown` but we need property access
interface ErrorWithMeta {
	name?: string;
	message?: string;
	statusCode?: number;
	details?: Record<string, string[]>;
	cause?: { code?: string };
	code?: string;
	stack?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Express ErrorRequestHandler signature requires any
export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction): void {
	const error = err as ErrorWithMeta;
	console.error('[Error]', {
		name: error.name,
		message: error.message,
		statusCode: error.statusCode || 500,
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
	const pgCode = error.cause?.code ?? error.code;
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
		...(isDev ? { error: error.message, stack: error.stack } : {}),
	});
	return;
}
