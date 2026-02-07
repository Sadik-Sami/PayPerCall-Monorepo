export const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_API_BASE_URL,
	WEB_BASE_URL: import.meta.env.VITE_WEB_BASE_URL || 'http://localhost:3000',
	DRAFT_MODE_SECRET: import.meta.env.VITE_DRAFT_MODE_SECRET,
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
		ADMIN: {
			BLOGS: '/api/admin/blogs',
			BLOG_BY_ID: (id: string) => `/api/admin/blogs/${id}`,
			BLOG_BLOCKS: (blogId: string) => `/api/admin/blogs/${blogId}/blocks`,
			BLOCK_BY_ID: (blockId: string) => `/api/admin/blocks/${blockId}`,
			BLOCKS_REORDER: '/api/admin/blocks/reorder',
			LEADS: '/api/admin/leads',
			LEAD_BY_ID: (id: string) => `/api/admin/leads/${id}`,
			LEAD_STATUS: (id: string) => `/api/admin/leads/${id}/status`,
		},
		UPLOADS: {
			CLOUDINARY_SIGNATURE: '/api/admin/uploads/cloudinary-signature',
		},
		WEB: {
			DRAFT_ENABLE: '/api/draft/enable',
			DRAFT_DISABLE: '/api/draft/disable',
			BLOG_PREVIEW_PATH: (slug: string) => `/blogs/${slug}`,
		},
	},
	TIMEOUT: 30000,
} as const;
