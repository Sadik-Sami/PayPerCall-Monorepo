import express, { type Express } from 'express';
import cors from 'cors';
import { config } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { healthRouter } from './modules/health/health.routes';
import { authRouter } from './modules/auth/auth.routes';
import { userRouter } from './modules/users/user.routes';
import { adminBlogsRouter, publicBlogsRouter } from './modules/blogs/blogs.routes';
import { adminBlocksRouter } from './modules/blocks/blocks.routes';
import { adminLeadsRouter, publicLeadsRouter } from './modules/leads/leads.routes';
import { uploadsRouter } from './modules/uploads/uploads.routes';
import cookieParser from 'cookie-parser';
import { loggingMiddleware } from './middlewares/logging.middleware';
import { globalRateLimiter } from './middlewares/rateLimiting.middleware';

export const app: Express = express();
app.set('trust proxy', 1);

const allowedOrigins = [
	config.cors.origin_admin,
	config.cors.origin_web,
	config.cors.origin_localhost_admin,
	config.cors.origin_localhost_web,
].filter((v): v is string => typeof v === 'string' && v.length > 0);

const corsOptions: cors.CorsOptions = {
	origin: (origin, callback) => {
		// Non-browser requests (Render health checks, curl, server-to-server) often have no Origin.
		if (!origin) return callback(null, true);

		// For browsers: allow only explicit origins. If not allowed, DO NOT throw (that becomes a 500).
		// Returning `false` simply omits CORS headers; the browser will block the response.
		return callback(null, allowedOrigins.includes(origin));
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'X-Preview-Secret'],
	optionsSuccessStatus: 204,
};

// Middlewares
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(globalRateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(loggingMiddleware);

app.get('/', (req, res) => {
	res.status(200).send('OK');
});

// Health Check
app.use('/api/health', healthRouter);

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/blogs', publicBlogsRouter);
app.use('/api/admin/blogs', adminBlogsRouter);
app.use('/api/admin/blocks', adminBlocksRouter);
app.use('/api/leads', publicLeadsRouter);
app.use('/api/admin/leads', adminLeadsRouter);
app.use('/api/admin/uploads', uploadsRouter);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

export default app;