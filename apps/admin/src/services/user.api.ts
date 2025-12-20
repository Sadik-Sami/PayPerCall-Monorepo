import { axiosInstance } from './axios';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types/api.types';
import type { User, UpdateProfileRequest, ChangePasswordRequest } from '@/types/user.types';

export const userApi = {
	updateProfile: async (profileData: UpdateProfileRequest): Promise<User> => {
		const { data } = await axiosInstance.put<ApiResponse<User>>(API_CONFIG.ENDPOINTS.USER.UPDATE_ME, profileData);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to update profile');
		}

		return data.data;
	},

	changePassword: async (passwordData: ChangePasswordRequest): Promise<void> => {
		const { data } = await axiosInstance.post<ApiResponse<null>>(
			API_CONFIG.ENDPOINTS.USER.CHANGE_PASSWORD,
			passwordData
		);

		if (!data.success) {
			throw new Error(data.message || 'Failed to change password');
		}
	},
};
