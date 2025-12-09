import { Router } from 'express';
import { authController } from './auth.controller';
import { validateData } from '@/middlewares/validation.middleware';
import { userInsertSchema } from '@/db/validator/user.validator';
import { loginSchema } from '@/db/validator/auth.validator';
import { loginRateLimiter, signupRateLimiter } from '@/middlewares/rateLimiting.middleware';

export const authRouter: Router = Router();

authRouter.post('/signup', signupRateLimiter, validateData(userInsertSchema), authController.signup);
authRouter.post('/login', loginRateLimiter, validateData(loginSchema), authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);
