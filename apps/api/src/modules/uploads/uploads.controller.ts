import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { config } from '../../config/env';

export const uploadsController = {
	// POST /api/admin/uploads/cloudinary-signature
	async getCloudinarySignature(req: Request, res: Response, next: NextFunction) {
		try {
			const timestamp = Math.floor(Date.now() / 1000);
			const folder = config.cloudinary.folder;

			const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
			const signature = crypto
				.createHash('sha1')
				.update(paramsToSign + config.cloudinary.apiSecret)
				.digest('hex');

			const uploadUrl = `https://api.cloudinary.com/v1_1/${config.cloudinary.cloudName}/image/upload`;

			res.json({
				success: true,
				statusCode: 200,
				message: 'Cloudinary signature generated',
				data: {
					cloudName: config.cloudinary.cloudName,
					apiKey: config.cloudinary.apiKey,
					timestamp,
					signature,
					folder,
					uploadUrl,
				},
			});
		} catch (error) {
			next(error);
		}
	},
};

