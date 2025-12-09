import { Router } from 'express';
import { userController } from './user.controller';
import { authenticate, authorize } from '@/middlewares/auth.middleware';
import { validateData } from '@/middlewares/validation.middleware';
import { changePasswordSchema, userUpdateSchema } from '@/db/validator/user.validator';

export const userRouter: Router = Router();

userRouter.get('/me', authenticate, userController.me);
userRouter.put('/me', authenticate, validateData(userUpdateSchema), userController.updateMe);
userRouter.post('/change-password', authenticate, validateData(changePasswordSchema), userController.changePassword);

userRouter.get('/', authenticate, authorize('admin'), userController.listAll);
