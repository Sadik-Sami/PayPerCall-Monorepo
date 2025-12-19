import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/config/api.config';
import { tokenUtil } from '@/utils/token.util';
import type { ApiError } from '@/types/api.types';

// Create axios instance
export const axiosInstance = axios.create({
	baseURL: API_CONFIG.BASE_URL,
	timeout: API_CONFIG.TIMEOUT,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

// Request interceptor
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = tokenUtil.get();
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<ApiError>) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

		if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
			originalRequest._retry = true;

			if (isRefreshing) {
				return new Promise((resolve) => {
					refreshQueue.push((token: string) => {
						if (originalRequest.headers) {
							originalRequest.headers.Authorization = `Bearer ${token}`;
						}
						resolve(axiosInstance(originalRequest));
					});
				});
			}

			isRefreshing = true;

			try {
				const { data } = await axios.post(
					`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
					{},
					{ withCredentials: true }
				);

				const newAccessToken = data.accessToken;

				// Store new token
				tokenUtil.set(newAccessToken);

				// Retry all queued requests with new token
				refreshQueue.forEach((callback) => callback(newAccessToken));
				refreshQueue = [];

				// Retry original request
				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				}

				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// Refresh failed - clear token and redirect to login
				tokenUtil.remove();
				refreshQueue = [];

				// Dispatch custom event for auth provider to handle
				window.dispatchEvent(new CustomEvent('auth:logout'));

				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);
