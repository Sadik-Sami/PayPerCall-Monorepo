import dotenv from 'dotenv';

dotenv.config();

// Parse CORS origins - supports comma-separated string or single origin
const parseCorsOrigin = (origin: string | undefined): string | string[] => {
	if (!origin) return 'http://localhost:3000';
	// If comma-separated, split and trim
	if (origin.includes(',')) {
		return origin.split(',').map((o) => o.trim()).filter(Boolean);
	}
	return origin;
};

export const config = {
	port: Number.parseInt(process.env.PORT || '3001', 10),
	nodeEnv: process.env.NODE_ENV || 'development',
	database: {
		url: process.env.DATABASE_URL,
	},
	cors: {
		origin: parseCorsOrigin(process.env.CORS_ORIGIN),
	},
	jwt: {
		accessSecret: process.env.JWT_ACCESS_SECRET,
		accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
		refreshTokenDays: Number(process.env.REFRESH_TOKEN_DAYS || '30'),
	},
	cloudinary: {
		cloudName: process.env.CLOUDINARY_CLOUD_NAME,
		apiKey: process.env.CLOUDINARY_API_KEY,
		apiSecret: process.env.CLOUDINARY_API_SECRET,
	},
};

// Validate required env vars
if (!config.database.url) {
	throw new Error('DATABASE_URL environment variable is required');
}

if (!config.jwt.accessSecret) {
	throw new Error('JWT_ACCESS_SECRET environment variable is required');
}
