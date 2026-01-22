export const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
	WEB_BASE_URL: import.meta.env.VITE_WEB_BASE_URL || 'http://localhost:3000',
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
		},
		UPLOADS: {
			CLOUDINARY_SIGNATURE: '/api/admin/uploads/cloudinary-signature',
		},
		WEB: {
			// These routes are implemented in apps/web as part of Draft Mode preview (Part 3).
			DRAFT_ENABLE: '/api/draft/enable',
			DRAFT_DISABLE: '/api/draft/disable',
			BLOG_PREVIEW_PATH: (slug: string) => `/blog/${slug}`,
		},
	},
	TIMEOUT: 30000,
} as const;
