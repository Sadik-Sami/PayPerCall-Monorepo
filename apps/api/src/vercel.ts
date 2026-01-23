import app from './app';

/**
 * Vercel Serverless entrypoint.
 *
 * Vercel's Node runtime can invoke an Express app directly because it's a
 * (req, res) handler function.
 *
 * Important: do NOT call `app.listen()` in serverless environments.
 */
app.get('/api', (req, res) => {
  res.json({
    message: 'API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});
export default app;


