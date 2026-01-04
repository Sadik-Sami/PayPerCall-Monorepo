const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface WebDevService {
	id: string;
	slug: string;
	title: string;
	description?: string | null;
	metaTitle?: string | null;
	metaDescription?: string | null;
	heroTitle?: string | null;
	heroSubtitle?: string | null;
	heroImage?: {
		url: string;
		publicId: string;
		alt?: string;
	} | null;
	features?: Array<{
		title: string;
		description: string;
		icon?: string;
	}> | null;
	processSteps?: Array<{
		step: number;
		title: string;
		description: string;
		icon?: string;
	}> | null;
	isActive: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
}

export interface WebDevSubService {
	id: string;
	serviceId: string;
	slug: string;
	title: string;
	description?: string | null;
	metaTitle?: string | null;
	metaDescription?: string | null;
	ogImage?: {
		url: string;
		publicId: string;
		alt?: string;
	} | null;
	heroContent?: {
		title: string;
		subtitle: string;
		description?: string;
		image?: {
			url: string;
			publicId: string;
			alt?: string;
		};
		ctaText?: string;
		ctaLink?: string;
	} | null;
	features?: Array<{
		title: string;
		description: string;
		icon?: string;
	}> | null;
	processSteps?: Array<{
		step: number;
		title: string;
		description: string;
		icon?: string;
	}> | null;
	packages?: Array<{
		id: string;
		name: string;
		description?: string;
		price: number;
		currency: string;
		features: string[];
		isPopular: boolean;
	}> | null;
	caseStudies?: Array<{
		id: string;
		title: string;
		description?: string;
		clientName?: string;
		results: Array<{
			metric: string;
			value: string;
			description?: string;
		}>;
		image?: {
			url: string;
			publicId: string;
			alt?: string;
		};
	}> | null;
	testimonials?: Array<{
		id: string;
		name: string;
		role?: string;
		company?: string;
		content: string;
		image?: {
			url: string;
			publicId: string;
			alt?: string;
		};
		rating?: number;
	}> | null;
	faqs?: Array<{
		id: string;
		question: string;
		answer: string;
	}> | null;
	isActive: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
}

interface ApiResponse<T> {
	success: boolean;
	statusCode: number;
	message: string;
	data: T;
	count?: number;
}

async function fetchFromAPI<T>(url: string): Promise<T> {
	try {
		const response = await fetch(`${API_BASE_URL}${url}`, {
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error(`API error: ${response.statusText}`);
		}

		const data: ApiResponse<T> = await response.json();
		return data.data;
	} catch (error) {
		console.error('API fetch error:', error);
		throw error;
	}
}

export async function getAllWebDevServices(): Promise<WebDevService[]> {
	return fetchFromAPI<WebDevService[]>('/api/web-dev-services');
}

export async function getWebDevServiceBySlug(slug: string): Promise<WebDevService | null> {
	try {
		return await fetchFromAPI<WebDevService>(`/api/web-dev-services/${slug}`);
	} catch {
		return null;
	}
}

export async function getWebDevSubServicesByServiceSlug(serviceSlug: string): Promise<WebDevSubService[]> {
	try {
		return await fetchFromAPI<WebDevSubService[]>(`/api/web-dev-services/${serviceSlug}/sub-services`);
	} catch {
		return [];
	}
}

export async function getWebDevSubServiceBySlug(serviceSlug: string, slug: string): Promise<WebDevSubService | null> {
	try {
		return await fetchFromAPI<WebDevSubService>(`/api/web-dev-services/${serviceSlug}/sub-services/${slug}`);
	} catch {
		return null;
	}
}
