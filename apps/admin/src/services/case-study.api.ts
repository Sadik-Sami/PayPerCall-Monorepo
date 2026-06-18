import { axiosInstance } from './axios';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types/api.types';
import type {
	CaseStudy,
	CaseStudiesListMeta,
	CaseStudiesListParams,
	CaseStudyCreatePayload,
	CaseStudyUpdatePayload,
	CaseStudyStatus,
	CaseStudyReorderItem,
} from '@/types/case-study.types';

type CaseStudiesListResponse = ApiResponse<CaseStudy[]> & {
	meta: CaseStudiesListMeta;
};

function buildParams(params: CaseStudiesListParams) {
	const entries: Record<string, string | string[] | number> = {};
	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === null || value === '') return;
		entries[key] = value as string | string[] | number;
	});
	return entries;
}

export const caseStudyApi = {
	listCaseStudies: async (
		params: CaseStudiesListParams
	): Promise<{ data: CaseStudy[]; meta: CaseStudiesListMeta }> => {
		const { data } = await axiosInstance.get<CaseStudiesListResponse>(
			API_CONFIG.ENDPOINTS.ADMIN.CASE_STUDIES,
			{ params: buildParams(params) }
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to load case studies');
		}

		return { data: data.data, meta: data.meta };
	},

	getCaseStudyById: async (id: string): Promise<CaseStudy> => {
		const { data } = await axiosInstance.get<ApiResponse<CaseStudy>>(
			API_CONFIG.ENDPOINTS.ADMIN.CASE_STUDY_BY_ID(id)
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to load case study');
		}

		return data.data;
	},

	createCaseStudy: async (payload: CaseStudyCreatePayload): Promise<CaseStudy> => {
		const { data } = await axiosInstance.post<ApiResponse<CaseStudy>>(
			API_CONFIG.ENDPOINTS.ADMIN.CASE_STUDIES,
			payload
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to create case study');
		}

		return data.data;
	},

	updateCaseStudy: async (id: string, payload: CaseStudyUpdatePayload): Promise<CaseStudy> => {
		const { data } = await axiosInstance.patch<ApiResponse<CaseStudy>>(
			API_CONFIG.ENDPOINTS.ADMIN.CASE_STUDY_BY_ID(id),
			payload
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to update case study');
		}

		return data.data;
	},

	updateCaseStudyStatus: async (id: string, status: CaseStudyStatus): Promise<CaseStudy> => {
		const { data } = await axiosInstance.patch<ApiResponse<CaseStudy>>(
			API_CONFIG.ENDPOINTS.ADMIN.CASE_STUDY_STATUS(id),
			{ status }
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to update case study status');
		}

		return data.data;
	},

	reorderCaseStudies: async (items: CaseStudyReorderItem[]): Promise<void> => {
		const { data } = await axiosInstance.post<ApiResponse<null>>(
			API_CONFIG.ENDPOINTS.ADMIN.CASE_STUDIES_REORDER,
			{ items }
		);

		if (!data.success) {
			throw new Error(data.message || 'Failed to reorder case studies');
		}
	},

	deleteCaseStudy: async (id: string): Promise<void> => {
		const { data } = await axiosInstance.delete<ApiResponse<null>>(
			API_CONFIG.ENDPOINTS.ADMIN.CASE_STUDY_BY_ID(id)
		);

		if (!data.success) {
			throw new Error(data.message || 'Failed to delete case study');
		}
	},
};
