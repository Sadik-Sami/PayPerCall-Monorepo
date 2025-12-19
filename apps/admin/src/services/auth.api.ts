import { axiosInstance } from './axios';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types/api.types';
import type { LoginRequest, LoginResponse, RefreshResponse } from '@/types/auth.types';
import type { User, UserRole } from '@/types/user.types';

export const authApi = {
	/**
	 * Login user
	 * Returns user data and accessToken
	 * Sets refresh_token and sessionId cookies automatically
	 */
	login: async (credentials: LoginRequest): Promise<LoginResponse> => {
		const { data } = await axiosInstance.post<ApiResponse<User>>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);

		if (!data.success || !data.data || !data.accessToken) {
			throw new Error(data.message || 'Login failed');
		}

		return {
			user: data.data,
			accessToken: data.accessToken,
			sessionId: data.sessionId || '',
		};
	},

	/**
	 * Refresh access token
	 * Uses refresh_token cookie automatically
	 */
	refresh: async (): Promise<RefreshResponse> => {
		const { data } = await axiosInstance.post<ApiResponse<User>>(API_CONFIG.ENDPOINTS.AUTH.REFRESH);

		if (!data.success || !data.data || !data.accessToken) {
			throw new Error(data.message || 'Token refresh failed');
		}

		return {
			user: data.data,
			accessToken: data.accessToken,
		};
	},

	/**
	 * Logout user
	 * Clears session and cookies
	 */
	logout: async (): Promise<void> => {
		await axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
	},

	/**
	 * Get current user details
	 * Requires valid access token
	 */
	me: async (): Promise<User> => {
		const { data } = await axiosInstance.get<ApiResponse<User>>(API_CONFIG.ENDPOINTS.USER.ME);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to fetch user');
		}

		return data.data;
	},

	/**
	 * Get current user's role
	 * Requires valid access token
	 */
	getRole: async (): Promise<UserRole> => {
		const { data } = await axiosInstance.get<ApiResponse<{ role: UserRole }>>(API_CONFIG.ENDPOINTS.USER.ROLE);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to fetch user role');
		}

		return data.data.role;
	},
};
