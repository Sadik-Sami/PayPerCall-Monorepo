import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '@/services/blog.api';
import type { BlogBlock } from '@/types/blog.types';
import type { BlogCreateInput, BlogUpdateInput } from '@/schemas/blog.schema';

export function useBlogs() {
	return useQuery({
		queryKey: ['blogs'],
		queryFn: blogApi.listBlogs,
	});
}

export function useBlog(blogId: string) {
	return useQuery({
		queryKey: ['blog', blogId],
		queryFn: () => blogApi.getBlogById(blogId),
		enabled: !!blogId,
	});
}

export function useBlogBlocks(blogId: string) {
	return useQuery({
		queryKey: ['blogBlocks', blogId],
		queryFn: () => blogApi.getBlocks(blogId),
		enabled: !!blogId,
	});
}

export function useCreateBlog() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: BlogCreateInput) => blogApi.createBlog(payload),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['blogs'] });
		},
	});
}

export function useUpdateBlog(blogId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: BlogUpdateInput) => blogApi.updateBlog(blogId, payload),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['blogs'] });
			void queryClient.invalidateQueries({ queryKey: ['blog', blogId] });
		},
	});
}

export function useDeleteBlog() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (blogId: string) => blogApi.deleteBlog(blogId),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['blogs'] });
		},
	});
}

export function useCreateBlock(blogId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: Pick<BlogBlock, 'type' | 'content'>) => blogApi.createBlock(blogId, payload),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['blogBlocks', blogId] });
		},
	});
}

export function useUpdateBlock(blogId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ blockId, content }: { blockId: string; content: BlogBlock['content'] }) =>
			blogApi.updateBlock(blockId, { content }),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['blogBlocks', blogId] });
		},
	});
}

export function useDeleteBlock(blogId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (blockId: string) => blogApi.deleteBlock(blockId),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['blogBlocks', blogId] });
		},
	});
}

export function useReorderBlocks(blogId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (orderedBlockIds: string[]) => blogApi.reorderBlocks(blogId, orderedBlockIds),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['blogBlocks', blogId] });
		},
	});
}