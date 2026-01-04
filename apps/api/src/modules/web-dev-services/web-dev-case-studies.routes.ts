import { Router } from 'express';
import { webDevServicesController } from './web-dev-services.controller';
import { authenticate, authorize } from '@/middlewares/auth.middleware';
import { validateData } from '@/middlewares/validation.middleware';
import {
	webDevCaseStudyInsertSchema,
	webDevCaseStudyUpdateSchema,
} from '@/db/validator/web-dev-services.validator';

export const webDevCaseStudiesRouter: Router = Router();

// Public routes
webDevCaseStudiesRouter.get('/case-studies', webDevServicesController.getAllCaseStudies);

// Admin routes
webDevCaseStudiesRouter.post(
	'/case-studies',
	authenticate,
	authorize('admin'),
	validateData(webDevCaseStudyInsertSchema),
	webDevServicesController.createCaseStudy
);
webDevCaseStudiesRouter.patch(
	'/case-studies/:id',
	authenticate,
	authorize('admin'),
	validateData(webDevCaseStudyUpdateSchema),
	webDevServicesController.updateCaseStudy
);
webDevCaseStudiesRouter.delete(
	'/case-studies/:id',
	authenticate,
	authorize('admin'),
	webDevServicesController.deleteCaseStudy
);
webDevCaseStudiesRouter.patch(
	'/case-studies/order',
	authenticate,
	authorize('admin'),
	webDevServicesController.updateCaseStudiesOrder
);

