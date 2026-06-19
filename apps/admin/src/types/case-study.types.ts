export type CaseStudyCategory =
	| 'pay-per-call'
	| 'pay-per-lead'
	| 'digital-marketing'
	| 'app-dev'
	| 'cms'
	| 'web-dev'
	| 'hire-call-center';

export type CaseStudyStatus = 'draft' | 'published' | 'archived';

export type CaseStudyAccent =
	| 'pastel-peach'
	| 'pastel-lilac'
	| 'pastel-lime'
	| 'pastel-mint'
	| 'pastel-sky'
	| 'pastel-blush';

export interface CaseStudy {
	id: string;
	title: string;
	slug: string;
	description: string;
	image_url: string | null;
	image_alt: string | null;
	accent_color: CaseStudyAccent | null;
	category: CaseStudyCategory;
	status: CaseStudyStatus;
	display_order: number;
	published_at: string | null;
	created_by: string | null;
	created_at: string;
	updated_at: string;
}

export interface CaseStudiesListMeta {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface CaseStudiesListParams {
	category?: CaseStudyCategory | CaseStudyCategory[];
	status?: CaseStudyStatus | CaseStudyStatus[];
	search?: string;
	sortBy?: 'created_at' | 'updated_at' | 'display_order' | 'status' | 'title';
	sortOrder?: 'asc' | 'desc';
	page?: number;
	limit?: number;
}

export interface CaseStudyCreatePayload {
	title: string;
	slug?: string;
	description: string;
	imageUrl?: string;
	imageAlt?: string;
	accentColor?: CaseStudyAccent;
	category: CaseStudyCategory;
	status?: CaseStudyStatus;
	displayOrder?: number;
}

export type CaseStudyUpdatePayload = Partial<CaseStudyCreatePayload>;

export interface CaseStudyReorderItem {
	id: string;
	displayOrder: number;
}
