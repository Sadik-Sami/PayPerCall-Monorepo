import { Request, Response, NextFunction } from 'express';
import { userServices } from './user.service';
import { changePasswordSchema, publicUserSelectSchema } from '@/db/validator/user.validator';
import { AppError } from '@/middlewares/errorHandler';
import { ForbiddenError } from "@/utils/error.util"

export const userController = {
	// GET /api/users/me
	async me(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user?.id;
			if (!userId) throw new AppError('Unauthorized', 401);

			const user = await userServices.getById(userId);
			if (!user) throw new AppError('User not found', 404);

			const publicUser = publicUserSelectSchema.parse(user);
			res.json({ success: true, statusCode: 200, message: 'User retrieved', data: publicUser });
		} catch (error) {
			next(error);
		}
	},

	// PUT /api/users/me
	async updateMe(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user?.id;
			if (!userId) throw new AppError('Unauthorized', 401);

			const data = req.body;
			const updated = await userServices.updateProfile(userId, data);
			if (!updated) throw new AppError('Failed to update profile', 500);

			const publicUser = publicUserSelectSchema.parse(updated);
			res.json({ success: true, statusCode: 200, message: 'Profile updated', data: publicUser });
		} catch (error) {
			next(error);
		}
	},

	// POST /api/users/change-password
	async changePassword(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user?.id;
			if (!userId) throw new AppError('Unauthorized', 401);

			const data = changePasswordSchema.parse(req.body);
			await userServices.changePassword(userId, data.currentPassword, data.newPassword);

			res.json({ success: true, statusCode: 200, message: 'Password changed successfully' });
		} catch (error) {
			next(error);
		}
	},

	// GET /api/users (admin only)
	async listAll(req: Request, res: Response, next: NextFunction) {
		try {
			if (req.user?.role !== 'admin') {
				throw new ForbiddenError('Only admins can list all users');
			}

			const users = await userServices.listAll();
			const publicUsers = users.map((user) => publicUserSelectSchema.parse(user));

			res.json({
				success: true,
				statusCode: 200,
				message: 'Users retrieved',
				data: publicUsers,
				count: publicUsers.length,
			});
		} catch (error) {
			next(error);
		}
	},
};
