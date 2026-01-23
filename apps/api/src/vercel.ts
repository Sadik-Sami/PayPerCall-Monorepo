import app from './app';

/**
 * Vercel Serverless entrypoint.
 *
 * Vercel's Node runtime can invoke an Express app directly because it's a
 * (req, res) handler function.
 *
 * Important: do NOT call `app.listen()` in serverless environments.
 */
export default app;


