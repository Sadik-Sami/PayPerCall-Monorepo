import express, { type Express } from 'express';
import cors from 'cors';
import { config } from '@/config/env';
import { errorHandler } from '@/middlewares/errorHandler';
import { notFoundHandler } from '@/middlewares/notFound.middleware';
import { healthRouter } from './modules/health/health.routes';
import { authRouter } from './modules/auth/auth.routes';
import { userRouter } from './modules/users/user.routes';
import cookieParser from 'cookie-parser';
import { loggingMiddleware } from './middlewares/logging.middleware';
import { globalRateLimiter } from './middlewares/rateLimiting.middleware';

export const app: Express = express();

app.set('trust proxy', 1);

// Middlewares
app.use(globalRateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(loggingMiddleware);
app.use(
	cors({
		origin: config.cors.origin,
		credentials: true,
	})
);

// Health Check
app.use('/api/health', healthRouter);

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

export default app;