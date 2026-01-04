import express, { type Express } from 'express';
import cors from 'cors';
import { config } from '@/config/env';
import { errorHandler } from '@/middlewares/errorHandler';
import { notFoundHandler } from '@/middlewares/notFound.middleware';
import { healthRouter } from './modules/health/health.routes';
import { authRouter } from './modules/auth/auth.routes';
import { userRouter } from './modules/users/user.routes';
import { webDevServicesRouter } from './modules/web-dev-services/web-dev-services.routes';
import {
	webDevSubServicesRouter,
	webDevSubServicesDirectRouter,
	webDevSubServicesAdminRouter,
} from './modules/web-dev-services/web-dev-sub-services.routes';
import { webDevPackagesRouter } from './modules/web-dev-services/web-dev-packages.routes';
import { webDevCaseStudiesRouter } from './modules/web-dev-services/web-dev-case-studies.routes';
import { webDevTestimonialsRouter } from './modules/web-dev-services/web-dev-testimonials.routes';
import { uploadRouter } from './modules/upload/upload.routes';
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
// Auth routes
app.use('/api/auth', authRouter);
// Users routes
app.use('/api/users', userRouter);
// Upload routes
app.use('/api/upload', uploadRouter);
// Packages routes
app.use('/api/web-dev-services', webDevPackagesRouter);
// Case studies routes
app.use('/api/web-dev-services', webDevCaseStudiesRouter);
// Testimonials routes
app.use('/api/web-dev-services', webDevTestimonialsRouter);
app.use('/api/web-dev-services', webDevSubServicesDirectRouter);
app.use('/api/web-dev-services', webDevSubServicesAdminRouter);
// Sub-services routes
app.use('/api/web-dev-services/:serviceSlug/sub-services', webDevSubServicesRouter);
app.use('/api/web-dev-services', webDevServicesRouter);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
