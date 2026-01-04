import { Router } from 'express';
import { webDevServicesController } from './web-dev-services.controller';
import { authenticate, authorize } from '@/middlewares/auth.middleware';
import { validateData } from '@/middlewares/validation.middleware';
import {
	webDevTestimonialInsertSchema,
	webDevTestimonialUpdateSchema,
} from '@/db/validator/web-dev-services.validator';

export const webDevTestimonialsRouter: Router = Router();

// Public routes
webDevTestimonialsRouter.get('/testimonials', webDevServicesController.getAllTestimonials);

// Admin routes
webDevTestimonialsRouter.post(
	'/testimonials',
	authenticate,
	authorize('admin'),
	validateData(webDevTestimonialInsertSchema),
	webDevServicesController.createTestimonial
);
webDevTestimonialsRouter.patch(
	'/testimonials/:id',
	authenticate,
	authorize('admin'),
	validateData(webDevTestimonialUpdateSchema),
	webDevServicesController.updateTestimonial
);
webDevTestimonialsRouter.delete(
	'/testimonials/:id',
	authenticate,
	authorize('admin'),
	webDevServicesController.deleteTestimonial
);
webDevTestimonialsRouter.patch(
	'/testimonials/order',
	authenticate,
	authorize('admin'),
	webDevServicesController.updateTestimonialsOrder
);

