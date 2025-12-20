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
	},
	TIMEOUT: 30000,
} as const;
