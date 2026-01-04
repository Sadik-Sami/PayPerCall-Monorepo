export const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
	ENDPOINTS: {
		AUTH: {
			LOGIN: '/api/auth/login',
			SIGNUP: '/api/auth/signup',
			REFRESH: '/api/auth/refresh',
			LOGOUT: '/api/auth/logout',
		},
		USER: {
			ME: '/api/users/me',
			UPDATE_ME: '/api/users/me',
			ROLE: '/api/users/role',
			CHANGE_PASSWORD: '/api/users/change-password',
		},
		WEB_DEV_SERVICES: {
			// Services
			LIST: '/api/web-dev-services',
			BY_SLUG: (slug: string) => `/api/web-dev-services/${slug}`,
			BY_ID: (id: string) => `/api/web-dev-services/by-id/${id}`,
			CREATE: '/api/web-dev-services',
			UPDATE: (id: string) => `/api/web-dev-services/${id}`,
			DELETE: (id: string) => `/api/web-dev-services/${id}`,
			REVALIDATE: (id: string) => `/api/web-dev-services/${id}/revalidate`,
			// Sub-services
			SUB_SERVICES: (serviceSlug: string) => `/api/web-dev-services/${serviceSlug}/sub-services`,
			SUB_SERVICE_BY_SLUG: (serviceSlug: string, slug: string) =>
				`/api/web-dev-services/${serviceSlug}/sub-services/${slug}`,
			SUB_SERVICE_BY_ID: (id: string) => `/api/web-dev-services/sub-services/${id}`,
			SUB_SERVICE_CREATE: (serviceSlug: string) => `/api/web-dev-services/${serviceSlug}/sub-services`,
			SUB_SERVICE_UPDATE: (id: string) => `/api/web-dev-services/sub-services/${id}`,
			SUB_SERVICE_DELETE: (id: string) => `/api/web-dev-services/sub-services/${id}`,
			SUB_SERVICE_REVALIDATE: (id: string) => `/api/web-dev-services/sub-services/${id}/revalidate`,
			SUB_SERVICES_ORDER: '/api/web-dev-services/sub-services/order',
			// Packages
			PACKAGES: '/api/web-dev-services/packages',
			PACKAGE_UPDATE: (id: string) => `/api/web-dev-services/packages/${id}`,
			PACKAGE_DELETE: (id: string) => `/api/web-dev-services/packages/${id}`,
			PACKAGES_ORDER: '/api/web-dev-services/packages/order',
			// Case Studies
			CASE_STUDIES: '/api/web-dev-services/case-studies',
			CASE_STUDY_UPDATE: (id: string) => `/api/web-dev-services/case-studies/${id}`,
			CASE_STUDY_DELETE: (id: string) => `/api/web-dev-services/case-studies/${id}`,
			CASE_STUDIES_ORDER: '/api/web-dev-services/case-studies/order',
			// Testimonials
			TESTIMONIALS: '/api/web-dev-services/testimonials',
			TESTIMONIAL_UPDATE: (id: string) => `/api/web-dev-services/testimonials/${id}`,
			TESTIMONIAL_DELETE: (id: string) => `/api/web-dev-services/testimonials/${id}`,
			TESTIMONIALS_ORDER: '/api/web-dev-services/testimonials/order',
		},
		UPLOAD: {
			IMAGE: '/api/upload/image',
			IMAGES: '/api/upload/images',
			DELETE: '/api/upload/image',
		},
	},
	TIMEOUT: 30000,
} as const;
