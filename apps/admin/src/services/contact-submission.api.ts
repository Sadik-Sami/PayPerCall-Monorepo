import { axiosInstance } from './axios';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types/api.types';
import type {
	ContactSubmission,
	ContactSubmissionsListMeta,
	ContactSubmissionsListParams,
	ContactSubmissionStatus,
} from '@/types/contact-submission.types';

type ContactSubmissionsListResponse = ApiResponse<ContactSubmission[]> & {
	meta: ContactSubmissionsListMeta;
};

function buildParams(params: ContactSubmissionsListParams) {
	const entries: Record<string, string | string[] | number> = {};
	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === null || value === '') return;
		entries[key] = value as string | string[] | number;
	});
	return entries;
}

export const contactSubmissionApi = {
	listContactSubmissions: async (
		params: ContactSubmissionsListParams,
	): Promise<{ data: ContactSubmission[]; meta: ContactSubmissionsListMeta }> => {
		const { data } = await axiosInstance.get<ContactSubmissionsListResponse>(
			API_CONFIG.ENDPOINTS.ADMIN.CONTACT_SUBMISSIONS,
			{ params: buildParams(params) },
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to load contact submissions');
		}

		return { data: data.data, meta: data.meta };
	},

	getContactSubmissionById: async (id: string): Promise<ContactSubmission> => {
		const { data } = await axiosInstance.get<ApiResponse<ContactSubmission>>(
			API_CONFIG.ENDPOINTS.ADMIN.CONTACT_SUBMISSION_BY_ID(id),
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to load contact submission');
		}

		return data.data;
	},

	updateContactSubmissionStatus: async (
		id: string,
		status: ContactSubmissionStatus,
	): Promise<ContactSubmission> => {
		const { data } = await axiosInstance.patch<ApiResponse<ContactSubmission>>(
			API_CONFIG.ENDPOINTS.ADMIN.CONTACT_SUBMISSION_STATUS(id),
			{ status },
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to update contact submission status');
		}

		return data.data;
	},
};
