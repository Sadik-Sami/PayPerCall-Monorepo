import { axiosInstance } from './axios';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types/api.types';
import type { Blog, BlogBlock } from '@/types/blog.types';
import type { BlogCreateInput, BlogUpdateInput } from '@/schemas/blog.schema';

export const blogApi = {
	listBlogs: async (): Promise<Blog[]> => {
		const { data } = await axiosInstance.get<ApiResponse<Blog[]>>(API_CONFIG.ENDPOINTS.ADMIN.BLOGS);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to load blogs');
		}

		return data.data;
	},

	getBlogById: async (blogId: string): Promise<Blog> => {
		const { data } = await axiosInstance.get<ApiResponse<Blog>>(API_CONFIG.ENDPOINTS.ADMIN.BLOG_BY_ID(blogId));

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to load blog');
		}

		return data.data;
	},

	createBlog: async (payload: BlogCreateInput): Promise<Blog> => {
		const { data } = await axiosInstance.post<ApiResponse<Blog>>(API_CONFIG.ENDPOINTS.ADMIN.BLOGS, payload);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to create blog');
		}

		return data.data;
	},

	updateBlog: async (blogId: string, payload: BlogUpdateInput): Promise<Blog> => {
		const { data } = await axiosInstance.put<ApiResponse<Blog>>(
			API_CONFIG.ENDPOINTS.ADMIN.BLOG_BY_ID(blogId),
			payload
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to update blog');
		}

		return data.data;
	},

	deleteBlog: async (blogId: string): Promise<void> => {
		const { data } = await axiosInstance.delete<ApiResponse<null>>(API_CONFIG.ENDPOINTS.ADMIN.BLOG_BY_ID(blogId));

		if (!data.success) {
			throw new Error(data.message || 'Failed to delete blog');
		}
	},

	getBlocks: async (blogId: string): Promise<BlogBlock[]> => {
		const { data } = await axiosInstance.get<ApiResponse<BlogBlock[]>>(API_CONFIG.ENDPOINTS.ADMIN.BLOG_BLOCKS(blogId));

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to load blocks');
		}

		return data.data;
	},

	createBlock: async (blogId: string, payload: Pick<BlogBlock, 'type' | 'content'>): Promise<BlogBlock> => {
		const { data } = await axiosInstance.post<ApiResponse<BlogBlock>>(
			API_CONFIG.ENDPOINTS.ADMIN.BLOG_BLOCKS(blogId),
			payload
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to create block');
		}

		return data.data;
	},

	updateBlock: async (blockId: string, payload: Pick<BlogBlock, 'content'>): Promise<BlogBlock> => {
		const { data } = await axiosInstance.put<ApiResponse<BlogBlock>>(
			API_CONFIG.ENDPOINTS.ADMIN.BLOCK_BY_ID(blockId),
			payload
		);

		if (!data.success || !data.data) {
			throw new Error(data.message || 'Failed to update block');
		}

		return data.data;
	},

	deleteBlock: async (blockId: string): Promise<void> => {
		const { data } = await axiosInstance.delete<ApiResponse<null>>(API_CONFIG.ENDPOINTS.ADMIN.BLOCK_BY_ID(blockId));

		if (!data.success) {
			throw new Error(data.message || 'Failed to delete block');
		}
	},

	reorderBlocks: async (blogId: string, orderedBlockIds: string[]): Promise<void> => {
		const { data } = await axiosInstance.post<ApiResponse<null>>(API_CONFIG.ENDPOINTS.ADMIN.BLOCKS_REORDER, {
			blogId,
			orderedBlockIds,
		});

		if (!data.success) {
			throw new Error(data.message || 'Failed to reorder blocks');
		}
	},
};
