import { Router } from 'express';
import { contactSubmissionsController } from './contact-submissions.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validateData } from '../../middlewares/validation.middleware';
import {
	contactSubmissionCreateSchema,
	contactSubmissionStatusUpdateSchema,
} from '../../validators/contact-submission.validator';

export const publicContactSubmissionsRouter: Router = Router();
export const adminContactSubmissionsRouter: Router = Router();

// Public routes
publicContactSubmissionsRouter.post(
	'/',
	validateData(contactSubmissionCreateSchema),
	contactSubmissionsController.create,
);

// Admin routes
adminContactSubmissionsRouter.get(
	'/',
	authenticate,
	authorize('admin'),
	contactSubmissionsController.listAdmin,
);
adminContactSubmissionsRouter.get(
	'/:id',
	authenticate,
	authorize('admin'),
	contactSubmissionsController.getById,
);
adminContactSubmissionsRouter.patch(
	'/:id/status',
	authenticate,
	authorize('admin'),
	validateData(contactSubmissionStatusUpdateSchema),
	contactSubmissionsController.updateStatus,
);
