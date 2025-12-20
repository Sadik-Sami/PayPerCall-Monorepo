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
} as const;

export const ROLE = {
	ADMIN: 'admin',
	USER: 'user',
} as const;
