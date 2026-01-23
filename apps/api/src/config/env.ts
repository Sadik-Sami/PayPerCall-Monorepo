import dotenv from 'dotenv';

dotenv.config();

export const config = {
	port: Number.parseInt(process.env.PORT || '3001', 10),
	nodeEnv: process.env.NODE_ENV || 'development',
	database: {
		url: process.env.DATABASE_URL,
	},
	cors: {
		origin_admin: process.env.CORS_ORIGIN_ADMIN,
		origin_web: process.env.CORS_ORIGIN_WEB,
		origin_localhost_admin: process.env.CORS_ORIGIN_LOCALHOST_ADMIN,
		origin_localhost_web: process.env.CORS_ORIGIN_LOCALHOST_WEB,
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
		folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'blog',
	},
};

// Validate required env vars
if (!config.database.url) {
	throw new Error('DATABASE_URL environment variable is required');
}

if (!config.jwt.accessSecret) {
	throw new Error('JWT_ACCESS_SECRET environment variable is required');
}

if (!config.cloudinary.cloudName) {
	throw new Error('CLOUDINARY_CLOUD_NAME environment variable is required');
}

if (!config.cloudinary.apiKey) {
	throw new Error('CLOUDINARY_API_KEY environment variable is required');
}

if (!config.cloudinary.apiSecret) {
	throw new Error('CLOUDINARY_API_SECRET environment variable is required');
}
