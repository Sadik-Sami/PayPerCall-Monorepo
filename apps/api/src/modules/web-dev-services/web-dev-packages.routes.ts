import { Router } from 'express';
import { webDevServicesController } from './web-dev-services.controller';
import { authenticate, authorize } from '@/middlewares/auth.middleware';
import { validateData } from '@/middlewares/validation.middleware';
import {
	webDevPackageInsertSchema,
	webDevPackageUpdateSchema,
} from '@/db/validator/web-dev-services.validator';

export const webDevPackagesRouter: Router = Router();

// Public routes
webDevPackagesRouter.get('/packages', webDevServicesController.getAllPackages);

// Admin routes
webDevPackagesRouter.post(
	'/packages',
	authenticate,
	authorize('admin'),
	validateData(webDevPackageInsertSchema),
	webDevServicesController.createPackage
);
webDevPackagesRouter.patch(
	'/packages/:id',
	authenticate,
	authorize('admin'),
	validateData(webDevPackageUpdateSchema),
	webDevServicesController.updatePackage
);
webDevPackagesRouter.delete('/packages/:id', authenticate, authorize('admin'), webDevServicesController.deletePackage);
webDevPackagesRouter.patch('/packages/order', authenticate, authorize('admin'), webDevServicesController.updatePackagesOrder);

