import { Router } from 'express';
import { blocksController } from './blocks.controller';
import { authenticate, authorize } from '@/middlewares/auth.middleware';
import { validateData } from '@/middlewares/validation.middleware';
import { blockReorderSchema, blockUpdateSchema } from '@/db/validator/blogBlock.validator';

export const adminBlocksRouter: Router = Router();

adminBlocksRouter.put('/:id', authenticate, authorize('admin'), validateData(blockUpdateSchema), blocksController.update);
adminBlocksRouter.delete('/:id', authenticate, authorize('admin'), blocksController.remove);
adminBlocksRouter.post('/reorder', authenticate, authorize('admin'), validateData(blockReorderSchema), blocksController.reorder);

