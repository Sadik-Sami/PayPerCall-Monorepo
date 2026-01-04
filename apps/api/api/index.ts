import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app.js';

// Vercel serverless function wrapper for Express app
// Express app can be used directly as a request handler
export default function handler(req: VercelRequest, res: VercelResponse) {
	return app(req as any, res as any);
}

