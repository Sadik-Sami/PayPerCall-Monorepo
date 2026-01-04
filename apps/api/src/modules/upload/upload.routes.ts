import { Router } from 'express';
import multer from 'multer';
import { uploadController } from './upload.controller';
import { authenticate, authorize } from '@/middlewares/auth.middleware';

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
	storage,
	limits: {
		fileSize: 10 * 1024 * 1024, // 10MB max file size
	},
	fileFilter: (req, file, cb) => {
		// Accept only image files
		if (file.mimetype.startsWith('image/')) {
			cb(null, true);
		} else {
			cb(new Error('Only image files are allowed'));
		}
	},
});

export const uploadRouter: Router = Router();

// All upload routes require authentication and admin role
uploadRouter.post(
	'/image',
	authenticate,
	authorize('admin'),
	upload.single('image'),
	uploadController.uploadImage
);

uploadRouter.post(
	'/images',
	authenticate,
	authorize('admin'),
	upload.array('images', 10), // Max 10 images at once
	uploadController.uploadMultipleImages
);

uploadRouter.delete(
	'/image',
	authenticate,
	authorize('admin'),
	uploadController.deleteImage
);

