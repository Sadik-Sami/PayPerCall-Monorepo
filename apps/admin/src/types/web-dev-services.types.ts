// Image type used across all entities
export interface ImageData {
	url: string;
	publicId: string;
	alt?: string;
}

// Feature type for services and sub-services
export interface Feature {
	title: string;
	description: string;
	icon?: string;
}

// Process step type
export interface ProcessStep {
	step: number;
	title: string;
	description: string;
	icon?: string;
}

// Hero content for sub-services
export interface HeroContent {
	title: string;
	subtitle: string;
	description?: string;
	image?: ImageData;
	ctaText?: string;
	ctaLink?: string;
}

// Package item (JSONB in sub-service or standalone)
export interface PackageItem {
	id: string;
	name: string;
	description?: string;
	price: number;
	currency: string;
	features: string[];
	isPopular: boolean;
}

// Case study item
export interface CaseStudyItem {
	id: string;
	title: string;
	description?: string;
	clientName?: string;
	results: Array<{
		metric: string;
		value: string;
		description?: string;
	}>;
	image?: ImageData;
}

// Testimonial item
export interface TestimonialItem {
	id: string;
	name: string;
	role?: string;
	company?: string;
	content: string;
	image?: ImageData;
	rating?: number;
}

// FAQ item
export interface FAQItem {
	id: string;
	question: string;
	answer: string;
}

// Web Dev Service (main category)
export interface WebDevService {
	id: string;
	slug: string;
	title: string;
	description?: string | null;
	metaTitle?: string | null;
	metaDescription?: string | null;
	heroTitle?: string | null;
	heroSubtitle?: string | null;
	heroImage?: ImageData | null;
	features?: Feature[] | null;
	processSteps?: ProcessStep[] | null;
	isActive: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
}

// Web Dev Sub Service
export interface WebDevSubService {
	id: string;
	serviceId: string;
	slug: string;
	title: string;
	description?: string | null;
	metaTitle?: string | null;
	metaDescription?: string | null;
	ogImage?: ImageData | null;
	heroContent?: HeroContent | null;
	features?: Feature[] | null;
	processSteps?: ProcessStep[] | null;
	packages?: PackageItem[] | null;
	caseStudies?: CaseStudyItem[] | null;
	testimonials?: TestimonialItem[] | null;
	faqs?: FAQItem[] | null;
	isActive: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
}

// Standalone Package (in separate table)
export interface WebDevPackage {
	id: string;
	subServiceId: string;
	name: string;
	description?: string | null;
	price: string; // numeric comes as string from DB
	currency: string;
	features?: string[] | null;
	isPopular: boolean;
	isActive: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
}

// Standalone Case Study
export interface WebDevCaseStudy {
	id: string;
	subServiceId: string;
	title: string;
	description?: string | null;
	clientName?: string | null;
	results?: Array<{
		metric: string;
		value: string;
		description?: string;
	}> | null;
	image?: ImageData | null;
	isActive: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
}

// Standalone Testimonial
export interface WebDevTestimonial {
	id: string;
	subServiceId: string;
	name: string;
	role?: string | null;
	company?: string | null;
	content: string;
	image?: ImageData | null;
	rating?: string | null; // numeric comes as string from DB
	isActive: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
}

// Form input types (for create/update)
export type CreateWebDevServiceInput = Omit<WebDevService, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateWebDevServiceInput = Partial<CreateWebDevServiceInput>;

export type CreateWebDevSubServiceInput = Omit<WebDevSubService, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateWebDevSubServiceInput = Partial<Omit<CreateWebDevSubServiceInput, 'serviceId'>>;

export type CreateWebDevPackageInput = Omit<WebDevPackage, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateWebDevPackageInput = Partial<Omit<CreateWebDevPackageInput, 'subServiceId'>>;

export type CreateWebDevCaseStudyInput = Omit<WebDevCaseStudy, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateWebDevCaseStudyInput = Partial<Omit<CreateWebDevCaseStudyInput, 'subServiceId'>>;

export type CreateWebDevTestimonialInput = Omit<WebDevTestimonial, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateWebDevTestimonialInput = Partial<Omit<CreateWebDevTestimonialInput, 'subServiceId'>>;

// Order update item
export interface OrderItem {
	id: string;
	order: number;
}

// Upload result
export interface UploadResult {
	url: string;
	publicId: string;
	width?: number;
	height?: number;
	format?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
	success: boolean;
	statusCode: number;
	message: string;
	data: T;
	count?: number;
}

