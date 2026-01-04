import { axiosInstance } from './axios';
import type { UploadResult, ApiResponse } from '@/types/web-dev-services.types';

export const uploadApi = {
	async uploadImage(file: File, folder?: string): Promise<UploadResult> {
		const formData = new FormData();
		formData.append('image', file);
		if (folder) {
			formData.append('folder', folder);
		}

		const response = await axiosInstance.post<ApiResponse<UploadResult>>('/api/upload/image', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data.data;
	},

	async uploadMultipleImages(files: File[], folder?: string): Promise<UploadResult[]> {
		const formData = new FormData();
		files.forEach((file) => {
			formData.append('images', file);
		});
		if (folder) {
			formData.append('folder', folder);
		}

		const response = await axiosInstance.post<ApiResponse<UploadResult[]>>('/api/upload/images', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data.data;
	},

	async deleteImage(publicId: string): Promise<void> {
		await axiosInstance.delete('/api/upload/image', {
			data: { publicId },
		});
	},
};

