import { Router } from 'express';
import { webDevServicesController } from './web-dev-services.controller';
import { authenticate, authorize } from '@/middlewares/auth.middleware';
import { validateData } from '@/middlewares/validation.middleware';
import {
	webDevServiceInsertSchema,
	webDevServiceUpdateSchema,
} from '@/db/validator/web-dev-services.validator';

export const webDevServicesRouter: Router = Router();

// Public routes
webDevServicesRouter.get('/', webDevServicesController.getAllServices);
webDevServicesRouter.get('/by-id/:id', webDevServicesController.getServiceById);
webDevServicesRouter.get('/:slug', webDevServicesController.getServiceBySlug);

// Admin routes
webDevServicesRouter.post(
	'/',
	authenticate,
	authorize('admin'),
	validateData(webDevServiceInsertSchema),
	webDevServicesController.createService
);
webDevServicesRouter.patch(
	'/:id',
	authenticate,
	authorize('admin'),
	validateData(webDevServiceUpdateSchema),
	webDevServicesController.updateService
);
webDevServicesRouter.delete('/:id', authenticate, authorize('admin'), webDevServicesController.deleteService);
webDevServicesRouter.post('/:id/revalidate', authenticate, authorize('admin'), webDevServicesController.revalidateService);

