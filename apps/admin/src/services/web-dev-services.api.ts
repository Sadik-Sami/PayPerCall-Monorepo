import { axiosInstance } from './axios';
import { API_CONFIG } from '@/config/api.config';
import type {
	WebDevService,
	WebDevSubService,
	WebDevPackage,
	WebDevCaseStudy,
	WebDevTestimonial,
	CreateWebDevServiceInput,
	UpdateWebDevServiceInput,
	CreateWebDevSubServiceInput,
	UpdateWebDevSubServiceInput,
	CreateWebDevPackageInput,
	UpdateWebDevPackageInput,
	CreateWebDevCaseStudyInput,
	UpdateWebDevCaseStudyInput,
	CreateWebDevTestimonialInput,
	UpdateWebDevTestimonialInput,
	OrderItem,
	ApiResponse,
} from '@/types/web-dev-services.types';

export const webDevServicesApi = {
	// ==================== Services ====================
	async getAllServices(includeInactive = false): Promise<WebDevService[]> {
		const response = await axiosInstance.get<ApiResponse<WebDevService[]>>(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.LIST, {
			params: { includeInactive },
		});
		return response.data.data;
	},

	async getServiceBySlug(slug: string): Promise<WebDevService> {
		const response = await axiosInstance.get<ApiResponse<WebDevService>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.BY_SLUG(slug)
		);
		return response.data.data;
	},

	async getServiceById(id: string): Promise<WebDevService> {
		const response = await axiosInstance.get<ApiResponse<WebDevService>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.BY_ID(id)
		);
		return response.data.data;
	},

	async createService(data: CreateWebDevServiceInput): Promise<WebDevService> {
		const response = await axiosInstance.post<ApiResponse<WebDevService>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.CREATE,
			data
		);
		return response.data.data;
	},

	async updateService(id: string, data: UpdateWebDevServiceInput): Promise<WebDevService> {
		const response = await axiosInstance.patch<ApiResponse<WebDevService>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.UPDATE(id),
			data
		);
		return response.data.data;
	},

	async deleteService(id: string): Promise<void> {
		await axiosInstance.delete(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.DELETE(id));
	},

	async revalidateService(id: string): Promise<void> {
		await axiosInstance.post(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.REVALIDATE(id));
	},

	// ==================== Sub Services ====================
	async getAllSubServices(serviceSlug: string, includeInactive = false): Promise<WebDevSubService[]> {
		const response = await axiosInstance.get<ApiResponse<WebDevSubService[]>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.SUB_SERVICES(serviceSlug),
			{
				params: { includeInactive },
			}
		);
		return response.data.data;
	},

	async getSubServiceBySlug(serviceSlug: string, slug: string): Promise<WebDevSubService> {
		const response = await axiosInstance.get<ApiResponse<WebDevSubService>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.SUB_SERVICE_BY_SLUG(serviceSlug, slug)
		);
		return response.data.data;
	},

	async getSubServiceById(id: string): Promise<WebDevSubService> {
		const response = await axiosInstance.get<ApiResponse<WebDevSubService>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.SUB_SERVICE_BY_ID(id)
		);
		return response.data.data;
	},

	async createSubService(serviceSlug: string, data: Omit<CreateWebDevSubServiceInput, 'serviceId'>): Promise<WebDevSubService> {
		const response = await axiosInstance.post<ApiResponse<WebDevSubService>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.SUB_SERVICE_CREATE(serviceSlug),
			data
		);
		return response.data.data;
	},

	async updateSubService(id: string, data: UpdateWebDevSubServiceInput): Promise<WebDevSubService> {
		const response = await axiosInstance.patch<ApiResponse<WebDevSubService>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.SUB_SERVICE_UPDATE(id),
			data
		);
		return response.data.data;
	},

	async deleteSubService(id: string): Promise<void> {
		await axiosInstance.delete(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.SUB_SERVICE_DELETE(id));
	},

	async revalidateSubService(id: string): Promise<void> {
		await axiosInstance.post(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.SUB_SERVICE_REVALIDATE(id));
	},

	async updateSubServicesOrder(items: OrderItem[]): Promise<void> {
		await axiosInstance.patch(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.SUB_SERVICES_ORDER, { items });
	},

	// ==================== Packages ====================
	async getAllPackages(subServiceId?: string, includeInactive = false): Promise<WebDevPackage[]> {
		const response = await axiosInstance.get<ApiResponse<WebDevPackage[]>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.PACKAGES,
			{
				params: { subServiceId, includeInactive },
			}
		);
		return response.data.data;
	},

	async createPackage(data: CreateWebDevPackageInput): Promise<WebDevPackage> {
		const response = await axiosInstance.post<ApiResponse<WebDevPackage>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.PACKAGES,
			data
		);
		return response.data.data;
	},

	async updatePackage(id: string, data: UpdateWebDevPackageInput): Promise<WebDevPackage> {
		const response = await axiosInstance.patch<ApiResponse<WebDevPackage>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.PACKAGE_UPDATE(id),
			data
		);
		return response.data.data;
	},

	async deletePackage(id: string): Promise<void> {
		await axiosInstance.delete(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.PACKAGE_DELETE(id));
	},

	async updatePackagesOrder(items: OrderItem[]): Promise<void> {
		await axiosInstance.patch(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.PACKAGES_ORDER, { items });
	},

	// ==================== Case Studies ====================
	async getAllCaseStudies(subServiceId?: string, includeInactive = false): Promise<WebDevCaseStudy[]> {
		const response = await axiosInstance.get<ApiResponse<WebDevCaseStudy[]>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.CASE_STUDIES,
			{
				params: { subServiceId, includeInactive },
			}
		);
		return response.data.data;
	},

	async createCaseStudy(data: CreateWebDevCaseStudyInput): Promise<WebDevCaseStudy> {
		const response = await axiosInstance.post<ApiResponse<WebDevCaseStudy>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.CASE_STUDIES,
			data
		);
		return response.data.data;
	},

	async updateCaseStudy(id: string, data: UpdateWebDevCaseStudyInput): Promise<WebDevCaseStudy> {
		const response = await axiosInstance.patch<ApiResponse<WebDevCaseStudy>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.CASE_STUDY_UPDATE(id),
			data
		);
		return response.data.data;
	},

	async deleteCaseStudy(id: string): Promise<void> {
		await axiosInstance.delete(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.CASE_STUDY_DELETE(id));
	},

	async updateCaseStudiesOrder(items: OrderItem[]): Promise<void> {
		await axiosInstance.patch(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.CASE_STUDIES_ORDER, { items });
	},

	// ==================== Testimonials ====================
	async getAllTestimonials(subServiceId?: string, includeInactive = false): Promise<WebDevTestimonial[]> {
		const response = await axiosInstance.get<ApiResponse<WebDevTestimonial[]>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.TESTIMONIALS,
			{
				params: { subServiceId, includeInactive },
			}
		);
		return response.data.data;
	},

	async createTestimonial(data: CreateWebDevTestimonialInput): Promise<WebDevTestimonial> {
		const response = await axiosInstance.post<ApiResponse<WebDevTestimonial>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.TESTIMONIALS,
			data
		);
		return response.data.data;
	},

	async updateTestimonial(id: string, data: UpdateWebDevTestimonialInput): Promise<WebDevTestimonial> {
		const response = await axiosInstance.patch<ApiResponse<WebDevTestimonial>>(
			API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.TESTIMONIAL_UPDATE(id),
			data
		);
		return response.data.data;
	},

	async deleteTestimonial(id: string): Promise<void> {
		await axiosInstance.delete(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.TESTIMONIAL_DELETE(id));
	},

	async updateTestimonialsOrder(items: OrderItem[]): Promise<void> {
		await axiosInstance.patch(API_CONFIG.ENDPOINTS.WEB_DEV_SERVICES.TESTIMONIALS_ORDER, { items });
	},
};

// Re-export types for convenience
export type { WebDevService, WebDevSubService, WebDevPackage, WebDevCaseStudy, WebDevTestimonial };
