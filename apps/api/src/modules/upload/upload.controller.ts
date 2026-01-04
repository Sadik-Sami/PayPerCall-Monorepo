import { Request, Response, NextFunction } from 'express';
import { uploadService } from './upload.service';
import { AppError } from '@/middlewares/errorHandler';

export const uploadController = {
	async uploadImage(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.file) {
				throw new AppError('No image file provided', 400);
			}

			const folder = req.body.folder || 'paypercall';

			const result = await uploadService.uploadImage(req.file.buffer, {
				folder,
			});

			res.status(201).json({
				success: true,
				statusCode: 201,
				message: 'Image uploaded successfully',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	},

	async uploadMultipleImages(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
				throw new AppError('No image files provided', 400);
			}

			const folder = req.body.folder || 'paypercall';

			const files = req.files.map((file) => ({
				buffer: file.buffer,
				originalname: file.originalname,
			}));

			const results = await uploadService.uploadMultipleImages(files, folder);

			res.status(201).json({
				success: true,
				statusCode: 201,
				message: 'Images uploaded successfully',
				data: results,
				count: results.length,
			});
		} catch (error) {
			next(error);
		}
	},

	async deleteImage(req: Request, res: Response, next: NextFunction) {
		try {
			const { publicId } = req.body;

			if (!publicId) {
				throw new AppError('Public ID is required', 400);
			}

			await uploadService.deleteImage(publicId);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Image deleted successfully',
			});
		} catch (error) {
			next(error);
		}
	},
};

