import { Router } from 'express';
import { leadsController } from './leads.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validateData } from '../../middlewares/validation.middleware';
import { leadCreateSchema, leadStatusUpdateSchema } from '../../db/validator/lead.validator';

export const publicLeadsRouter: Router = Router();
export const adminLeadsRouter: Router = Router();

// Public routes
publicLeadsRouter.post('/', validateData(leadCreateSchema), leadsController.create);

// Admin routes
adminLeadsRouter.get('/', authenticate, authorize('admin'), leadsController.listAdmin);
adminLeadsRouter.get('/:id', authenticate, authorize('admin'), leadsController.getById);
adminLeadsRouter.patch(
	'/:id/status',
	authenticate,
	authorize('admin'),
	validateData(leadStatusUpdateSchema),
	leadsController.updateStatus
);

