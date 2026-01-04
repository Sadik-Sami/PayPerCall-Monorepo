export const TOKEN_KEY = 'access_token';
export const SESSION_KEY = 'session_id';

export const ROUTES = {
	LOGIN: '/login',
	SIGNUP: '/signup',
	DASHBOARD: '/dashboard',
	PROFILE: '/dashboard/profile',
	DASHBOARD_BLOGS: '/dashboard/blogs',
	DASHBOARD_NEWS: '/dashboard/news',
	DASHBOARD_PACKAGES: '/dashboard/packages',
	DASHBOARD_LEADS: '/dashboard/leads',
	// Web Dev Services
	DASHBOARD_WEB_DEV_SERVICES: '/dashboard/web-dev-services',
	DASHBOARD_WEB_DEV_SERVICES_CREATE: '/dashboard/web-dev-services/create',
	DASHBOARD_WEB_DEV_SERVICES_EDIT: '/dashboard/web-dev-services/:id/edit',
	// Sub-services
	DASHBOARD_WEB_DEV_SUB_SERVICES: '/dashboard/web-dev-services/:id/sub-services',
	DASHBOARD_WEB_DEV_SUB_SERVICES_CREATE: '/dashboard/web-dev-services/:id/sub-services/create',
	DASHBOARD_WEB_DEV_SUB_SERVICES_EDIT: '/dashboard/web-dev-services/:id/sub-services/:subId/edit',
	// Sub-service content
	DASHBOARD_WEB_DEV_SUB_SERVICE_PACKAGES: '/dashboard/web-dev-services/:id/sub-services/:subId/packages',
	DASHBOARD_WEB_DEV_SUB_SERVICE_CASE_STUDIES: '/dashboard/web-dev-services/:id/sub-services/:subId/case-studies',
	DASHBOARD_WEB_DEV_SUB_SERVICE_TESTIMONIALS: '/dashboard/web-dev-services/:id/sub-services/:subId/testimonials',
	DASHBOARD_WEB_DEV_SUB_SERVICE_FAQS: '/dashboard/web-dev-services/:id/sub-services/:subId/faqs',
} as const;

export const ROLE = {
	ADMIN: 'admin',
	USER: 'user',
} as const;
