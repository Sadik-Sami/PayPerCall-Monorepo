import { Router } from 'express';
import { caseStudiesController } from './case-studies.controller';
import { validateData } from '../../middlewares/validation.middleware';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import {
	caseStudyCreateSchema,
	caseStudyUpdateSchema,
	caseStudyStatusUpdateSchema,
	caseStudyReorderSchema,
} from '../../validators/case-study.validator';

export const publicCaseStudiesRouter: Router = Router();

publicCaseStudiesRouter.get('/', caseStudiesController.listPublic);

export const adminCaseStudiesRouter: Router = Router();

adminCaseStudiesRouter.use(authenticate, authorize('admin'));

adminCaseStudiesRouter.get('/', caseStudiesController.listAdmin);
adminCaseStudiesRouter.post('/reorder', validateData(caseStudyReorderSchema), caseStudiesController.reorder);
adminCaseStudiesRouter.post('/', validateData(caseStudyCreateSchema), caseStudiesController.create);
adminCaseStudiesRouter.get('/:id', caseStudiesController.getById);
adminCaseStudiesRouter.patch('/:id', validateData(caseStudyUpdateSchema), caseStudiesController.update);
adminCaseStudiesRouter.patch(
	'/:id/status',
	validateData(caseStudyStatusUpdateSchema),
	caseStudiesController.updateStatus,
);
adminCaseStudiesRouter.delete('/:id', caseStudiesController.remove);
