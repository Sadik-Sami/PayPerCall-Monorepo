import app from '@/app';
import { config } from '@/config/env';
import { startSessionCleanup } from './utils/sessionCleanup.util';

const server = app.listen(config.port, () => {
	console.log(`[${new Date().toISOString()}] Server running on http://localhost:${config.port}`);
	console.log(`Environment: ${config.nodeEnv}`);
	startSessionCleanup();
});

// Graceful shutdown
process.on('SIGTERM', () => {
	console.log('SIGTERM received, shutting down gracefully');
	server.close(() => {
		console.log('Server closed');
		process.exit(0);
	});
});

process.on('SIGINT', () => {
	console.log('SIGINT received, shutting down gracefully');
	server.close(() => {
		console.log('Server closed');
		process.exit(0);
	});
});
