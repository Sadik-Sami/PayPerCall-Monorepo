export const CONTACT_SUBMISSION_STATUS = {
	PENDING: 'pending',
	CONTACTED: 'contacted',
	SCHEDULED: 'scheduled',
	COMPLETED: 'completed',
	DECLINED: 'declined',
} as const;

export type ContactSubmissionStatus =
	(typeof CONTACT_SUBMISSION_STATUS)[keyof typeof CONTACT_SUBMISSION_STATUS];

export interface ContactSubmission {
	id: string;
	full_name: string;
	work_email: string;
	company: string;
	phone?: string | null;
	preferred_contact_method: string;

	service_category: string;
	service_detail: string;
	business_website?: string | null;
	company_size: string;
	monthly_budget?: string | null;
	target_regions: string;

	desired_date: string;
	preferred_meeting_window: string;
	timezone: string;
	additional_context?: string | null;
	consent: boolean;

	status: ContactSubmissionStatus;
	ip_address?: string | null;
	user_agent?: string | null;
	created_at?: string;
	updated_at?: string;
}

export interface ContactSubmissionsListMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface ContactSubmissionsListParams {
	serviceCategory?: string | string[];
	status?: ContactSubmissionStatus | ContactSubmissionStatus[];
	search?: string;
	sortBy?: 'created_at' | 'updated_at' | 'desired_date' | 'status';
	sortOrder?: 'asc' | 'desc';
	page?: number;
	limit?: number;
}
