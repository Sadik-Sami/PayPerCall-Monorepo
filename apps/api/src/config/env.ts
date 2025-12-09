import dotenv from 'dotenv';

dotenv.config();

export const config = {
	port: Number.parseInt(process.env.PORT || '3001', 10),
	nodeEnv: process.env.NODE_ENV || 'development',
	database: {
		url: process.env.DATABASE_URL,
	},
	cors: {
		origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
	},
	jwt: {
		accessSecret: process.env.JWT_ACCESS_SECRET,
		accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
		refreshTokenDays: Number(process.env.REFRESH_TOKEN_DAYS || '30'),
	},
};

// Validate required env vars
if (!config.database.url) {
	throw new Error('DATABASE_URL environment variable is required');
}

if (!config.jwt.accessSecret) {
	throw new Error('JWT_ACCESS_SECRET environment variable is required');
}
