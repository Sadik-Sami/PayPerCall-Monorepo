import { Router } from 'express';
import { uploadsController } from './uploads.controller';
import { authenticate, authorize } from '@/middlewares/auth.middleware';

export const uploadsRouter: Router = Router();

uploadsRouter.post('/cloudinary-signature', authenticate, authorize('admin'), uploadsController.getCloudinarySignature);

