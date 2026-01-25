import { Router } from 'express';
import { blogsController } from './blogs.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { validateData } from '../../middlewares/validation.middleware';
import { blogCreateSchema, blogUpdateSchema } from '../../db/validator/blog.validator';
import { blockCreateSchema } from '../../db/validator/blogBlock.validator';

export const publicBlogsRouter: Router = Router();
export const adminBlogsRouter: Router = Router();

// Public routes
publicBlogsRouter.get('/', blogsController.listPublished);
publicBlogsRouter.get('/preview/:slug', blogsController.getPreviewBySlug);
publicBlogsRouter.get('/:slug', blogsController.getPublishedBySlug);

// Admin routes
adminBlogsRouter.get('/', authenticate, authorize('admin'), blogsController.listAdmin);
adminBlogsRouter.get('/:id', authenticate, authorize('admin'), blogsController.getByIdAdmin);
adminBlogsRouter.get('/:id/blocks', authenticate, authorize('admin'), blogsController.listBlocksAdmin);
adminBlogsRouter.post('/', authenticate, authorize('admin'), validateData(blogCreateSchema), blogsController.create);
adminBlogsRouter.put('/:id', authenticate, authorize('admin'), validateData(blogUpdateSchema), blogsController.update);
adminBlogsRouter.delete('/:id', authenticate, authorize('admin'), blogsController.remove);
adminBlogsRouter.post(
	'/:id/blocks',
	authenticate,
	authorize('admin'),
	validateData(blockCreateSchema),
	blogsController.createBlock
);

