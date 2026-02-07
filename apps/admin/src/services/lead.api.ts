import { axiosInstance } from './axios';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types/api.types';
import type { Lead, LeadsListMeta, LeadsListParams, LeadStatus } from '@/types/lead.types';

type LeadsListResponse = ApiResponse<Lead[]> & { meta: LeadsListMeta };

function buildParams(params: LeadsListParams) {
	const entries: Record<string, string | string[] | number> = {};
	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === null || value === '') return;
		entries[key] = value as string | string[] | number;
	});
	return entries;
}

export const leadApi = {
	listLeads: async (params: LeadsListParams): Promise<{ data: Lead[]; meta: LeadsListMeta }> => {
		const { data } = await axiosInstance.get<LeadsListResponse>(API_CONFIG.ENDPOINTS.ADMIN.LEADS, {
			params: buildParams(params),
		});

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to load leads');
		}

		return { data: data.data, meta: data.meta };
	},

	getLeadById: async (leadId: string): Promise<Lead> => {
		const { data } = await axiosInstance.get<ApiResponse<Lead>>(API_CONFIG.ENDPOINTS.ADMIN.LEAD_BY_ID(leadId));

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to load lead');
		}

		return data.data;
	},

	updateLeadStatus: async (leadId: string, status: LeadStatus): Promise<Lead> => {
		const { data } = await axiosInstance.patch<ApiResponse<Lead>>(API_CONFIG.ENDPOINTS.ADMIN.LEAD_STATUS(leadId), {
			status,
		});

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to update lead status');
		}

		return data.data;
	},
};

