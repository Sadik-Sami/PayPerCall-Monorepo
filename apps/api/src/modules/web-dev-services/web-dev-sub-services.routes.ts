import { Router } from 'express';
import { webDevServicesController } from './web-dev-services.controller';
import { authenticate, authorize } from '@/middlewares/auth.middleware';
import { validateData } from '@/middlewares/validation.middleware';
import {
	webDevSubServiceInsertSchema,
	webDevSubServiceUpdateSchema,
} from '@/db/validator/web-dev-services.validator';

export const webDevSubServicesRouter: Router = Router({ mergeParams: true });

// Public routes - these will be mounted at /api/web-dev-services/:serviceSlug/sub-services
webDevSubServicesRouter.get('/', webDevServicesController.getAllSubServices);
webDevSubServicesRouter.get('/:slug', webDevServicesController.getSubServiceBySlug);

// Admin routes
webDevSubServicesRouter.post(
	'/',
	authenticate,
	authorize('admin'),
	// Don't validate serviceId here - it will be set by the controller from the serviceSlug param
	validateData(webDevSubServiceInsertSchema.omit({ serviceId: true })),
	webDevServicesController.createSubService
);
webDevSubServicesRouter.patch(
	'/:id',
	authenticate,
	authorize('admin'),
	validateData(webDevSubServiceUpdateSchema),
	webDevServicesController.updateSubService
);
webDevSubServicesRouter.delete('/:id', authenticate, authorize('admin'), webDevServicesController.deleteSubService);
webDevSubServicesRouter.post('/:id/revalidate', authenticate, authorize('admin'), webDevServicesController.revalidateSubService);

// Direct routes for admin panel
export const webDevSubServicesAdminRouter: Router = Router();
webDevSubServicesAdminRouter.patch('/sub-services/order', authenticate, authorize('admin'), webDevServicesController.updateSubServicesOrder);

// Direct route for getting sub-service by ID (needed for admin panel)
export const webDevSubServicesDirectRouter: Router = Router();
webDevSubServicesDirectRouter.get('/sub-services/:id', webDevServicesController.getSubServiceById);

