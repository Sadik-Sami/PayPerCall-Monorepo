export const LEAD_STATUS = {
	PENDING: 'pending',
	PROCESSING: 'processing',
	REPLIED: 'replied',
	WON: 'won',
	LOST: 'lost',
} as const;

export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS];

export interface Lead {
	id: string;
	name: string;
	email: string;
	company?: string | null;
	project_type?: string | null;
	project_summary?: string | null;
	category: string;
	source_page: string;
	status: LeadStatus;
	ip_address?: string | null;
	user_agent?: string | null;
	created_at?: string;
	updated_at?: string;
}

export interface LeadsListMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface LeadsListParams {
	category?: string | string[];
	status?: LeadStatus | LeadStatus[];
	search?: string;
	sortBy?: 'created_at' | 'updated_at' | 'status';
	sortOrder?: 'asc' | 'desc';
	page?: number;
	limit?: number;
}

