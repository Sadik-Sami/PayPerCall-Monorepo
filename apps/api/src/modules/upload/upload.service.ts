import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { config } from '@/config/env';
import { AppError } from '@/middlewares/errorHandler';

// Configure Cloudinary
cloudinary.config({
	cloud_name: config.cloudinary.cloudName,
	api_key: config.cloudinary.apiKey,
	api_secret: config.cloudinary.apiSecret,
});

export interface UploadResult {
	url: string;
	publicId: string;
	width?: number;
	height?: number;
	format?: string;
}

export const uploadService = {
	/**
	 * Upload an image to Cloudinary from a buffer
	 */
	async uploadImage(
		buffer: Buffer,
		options: {
			folder?: string;
			publicId?: string;
			transformation?: object;
		} = {}
	): Promise<UploadResult> {
		// Validate Cloudinary configuration
		if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
			throw new AppError('Cloudinary configuration is missing', 500);
		}

		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder: options.folder || 'paypercall',
					public_id: options.publicId,
					resource_type: 'image',
					transformation: options.transformation,
				},
				(error, result) => {
					if (error) {
						console.error('[Cloudinary Upload Error]', error);
						reject(new AppError('Failed to upload image', 500));
					} else if (result) {
						resolve({
							url: result.secure_url,
							publicId: result.public_id,
							width: result.width,
							height: result.height,
							format: result.format,
						});
					} else {
						reject(new AppError('Upload failed with no result', 500));
					}
				}
			);

			uploadStream.end(buffer);
		});
	},

	/**
	 * Delete an image from Cloudinary
	 */
	async deleteImage(publicId: string): Promise<void> {
		if (!config.cloudinary.cloudName || !config.cloudinary.apiKey || !config.cloudinary.apiSecret) {
			throw new AppError('Cloudinary configuration is missing', 500);
		}

		try {
			await cloudinary.uploader.destroy(publicId);
		} catch (error) {
			console.error('[Cloudinary Delete Error]', error);
			throw new AppError('Failed to delete image', 500);
		}
	},

	/**
	 * Upload multiple images
	 */
	async uploadMultipleImages(
		files: Array<{ buffer: Buffer; originalname: string }>,
		folder?: string
	): Promise<UploadResult[]> {
		const uploadPromises = files.map((file) =>
			this.uploadImage(file.buffer, { folder })
		);
		return Promise.all(uploadPromises);
	},
};

