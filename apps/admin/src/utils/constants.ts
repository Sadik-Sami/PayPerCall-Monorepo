export const TOKEN_KEY = 'access_token';
export const SESSION_KEY = 'session_id';

export const ROUTES = {
	LOGIN: '/login',
	SIGNUP: '/signup',
	DASHBOARD: '/dashboard',
	PROFILE: '/dashboard/profile',
	DASHBOARD_BLOGS: '/dashboard/blogs',
	DASHBOARD_BLOG_CREATE: '/dashboard/blogs/new',
	DASHBOARD_BLOG_EDIT_PATTERN: '/dashboard/blogs/:id/edit',
	DASHBOARD_BLOG_EDIT: (id: string) => `/dashboard/blogs/${id}/edit`,
	DASHBOARD_LEADS: '/dashboard/leads',
	DASHBOARD_CONTACT_SUBMISSIONS: '/dashboard/contact-submissions',
	DASHBOARD_CASE_STUDIES: '/dashboard/case-studies',
	DASHBOARD_CASE_STUDY_CREATE: '/dashboard/case-studies/new',
	DASHBOARD_CASE_STUDY_EDIT_PATTERN: '/dashboard/case-studies/:id/edit',
	DASHBOARD_CASE_STUDY_EDIT: (id: string) => `/dashboard/case-studies/${id}/edit`,
} as const;

export const ROLE = {
	ADMIN: 'admin',
	USER: 'user',
} as const;
