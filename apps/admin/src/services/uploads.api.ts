import { axiosInstance } from './axios';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types/api.types';
import type { CloudinarySignature } from '@/types/blog.types';

export const uploadsApi = {
	getCloudinarySignature: async (): Promise<CloudinarySignature> => {
		const { data } = await axiosInstance.post<ApiResponse<CloudinarySignature>>(
			API_CONFIG.ENDPOINTS.UPLOADS.CLOUDINARY_SIGNATURE
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to get upload signature');
		}

		return data.data;
	},
};

export async function uploadToCloudinary(params: {
	cloudName: string;
	apiKey: string;
	timestamp: number;
	signature: string;
	file: File;
	folder?: string;
}) {
	const formData = new FormData();
	formData.append('file', params.file);
	formData.append('api_key', params.apiKey);
	formData.append('timestamp', String(params.timestamp));
	formData.append('signature', params.signature);
	if (params.folder) {
		formData.append('folder', params.folder);
	}

	const response = await fetch(`https://api.cloudinary.com/v1_1/${params.cloudName}/image/upload`, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Failed to upload image');
	}

	return response.json() as Promise<{ secure_url: string }>;
}
