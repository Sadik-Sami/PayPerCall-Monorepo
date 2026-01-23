import app from './app';
import { config } from './config/env';
import { startSessionCleanup } from './utils/sessionCleanup.util';

app.listen(config.port, () => {
	console.log(`[${new Date().toISOString()}] Server running on http://localhost:${config.port}`);
	startSessionCleanup();
});
