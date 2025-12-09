import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { userServices } from '@/modules/users/user.service';
import { publicUserSelectSchema } from '@/db/validator/user.validator';
import { NewUser } from '@/db/schema/users.schema';
import { LoginRequest } from '@/db/validator/auth.validator';
import { authService } from './auth.service';
import { refreshCookieOptions } from '@/utils/token.util';
import { ConflictError, UnauthorizedError } from '@/utils/error.util';

export const authController = {
	async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const payload: NewUser = req.body;
			const existing = await userServices.getByEmail(payload.email);
			if (existing) throw new ConflictError('Email already in use');

			const hashed = await bcrypt.hash(payload.password, 10);

			const toInsert: NewUser = {
				name: payload.name,
				email: payload.email,
				password: hashed,
				image: payload.image ?? null,
				role: payload.role ?? 'user',
				phone: payload.phone ?? null,
				isVerified: payload.isVerified ?? false,
				address_street: payload.address_street ?? null,
				address_city: payload.address_city ?? null,
				address_state: payload.address_state ?? null,
				address_postal_code: payload.address_postal_code ?? null,
			};

			const user = await userServices.create(toInsert);
			const publicUser = publicUserSelectSchema.parse(user);

			res.status(201).json({
				success: true,
				statusCode: 201,
				message: 'User registered successfully',
				data: publicUser,
			});
		} catch (error) {
			next(error);
		}
	},
	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const data: LoginRequest = req.body;

			const userAgent = req.get('user-agent') || null;
			const ip = (req.headers['x-forwarded-for'] as string) || req.ip || req.socket.remoteAddress || null;

			const { user, session, accessToken, refreshToken } = await authService.login(data, userAgent, ip);

			const cookieOpts = refreshCookieOptions();
			res.cookie('refresh_token', refreshToken, cookieOpts);
			res.cookie('sessionId', session.id, { ...cookieOpts, httpOnly: true });

			const publicUser = publicUserSelectSchema.parse(user);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Logged in successfully',
				data: publicUser,
				accessToken,
				sessionId: session.id,
			});
		} catch (error) {
			next(error);
		}
	},
	async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const refresh = req.cookies?.refresh_token;
			const sessionId = req.cookies?.sessionId;
			if (!refresh || !sessionId) throw new UnauthorizedError('No refresh token provided');

			const { accessToken, refreshToken, user } = await authService.refresh(sessionId, refresh);

			const cookieOpts = refreshCookieOptions();
			res.cookie('refresh_token', refreshToken, cookieOpts);
			res.cookie('sessionId', sessionId, { ...cookieOpts, httpOnly: true });

			const publicUser = publicUserSelectSchema.parse(user);
			res.json({
				success: true,
				statusCode: 200,
				message: 'Token refreshed',
				data: publicUser,
				accessToken,
			});
		} catch (error) {
			next(error);
		}
	},
	async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const sessionId = req.cookies?.sessionId;
			if (!sessionId) res.status(400).json({ success: false, message: 'No session' });

			await authService.logout(sessionId);

			res.clearCookie('refresh_token', { path: '/api/auth' });
			res.clearCookie('sessionId', { path: '/api/auth' });

			res.json({
				success: true,
				statusCode: 200,
				message: 'Logged out successfully',
			});
		} catch (error) {
			next(error);
		}
	},
};
