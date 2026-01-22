import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Loading from '@/components/common/loading';
import { API_CONFIG } from '@/config/api.config';
import {
	blogUpdateSchema,
	type BlogUpdateInput,
	getPublishReadiness,
} from '@/schemas/blog.schema';
import {
	useBlog,
	useBlogBlocks,
	useCreateBlock,
	useDeleteBlock,
	useReorderBlocks,
	useUpdateBlog,
	useUpdateBlock,
} from '@/hooks/use-blogs';
import BlockList from '@/components/blog/block-list';
import BlockEditorPanel from '@/components/blog/block-editor-panel';
import { coerceNodeForBlockType, getDefaultBlockContent, sanitizeTiptapNode } from '@/components/blog/block-utils';
import type { BlogBlock, BlogBlockType } from '@/types/blog.types';
import { uploadsApi, uploadToCloudinary } from '@/services/uploads.api';

export default function BlogEditPage() {
	const { id } = useParams();
	const blogId = id ?? '';
	const { data: blog, isLoading: blogLoading } = useBlog(blogId);
	const { data: blocksData, isLoading: blocksLoading } = useBlogBlocks(blogId);
	const updateBlog = useUpdateBlog(blogId);
	const createBlock = useCreateBlock(blogId);
	const updateBlock = useUpdateBlock(blogId);
	const deleteBlock = useDeleteBlock(blogId);
	const reorderBlocks = useReorderBlocks(blogId);

	const [blocks, setBlocks] = useState<BlogBlock[]>([]);
	const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
	const [isCoverUploading, setIsCoverUploading] = useState(false);
	const [isBlockUploading, setIsBlockUploading] = useState(false);

	const form = useForm<BlogUpdateInput>({
		resolver: zodResolver(blogUpdateSchema) as Resolver<BlogUpdateInput>,
		defaultValues: {
			title: '',
			slug: '',
			excerpt: '',
			seo_title: '',
			seo_description: '',
			cover_image_url: '',
			is_featured: false,
		},
	});

	useEffect(() => {
		if (!blog) return;
		form.reset({
			title: blog.title ?? '',
			slug: blog.slug ?? '',
			excerpt: blog.excerpt ?? '',
			seo_title: blog.seo_title ?? '',
			seo_description: blog.seo_description ?? '',
			cover_image_url: blog.cover_image_url ?? '',
			is_featured: blog.is_featured ?? false,
		});
	}, [blog, form]);

	useEffect(() => {
		if (!blocksData) return;
		const ordered = [...blocksData].sort((a, b) => a.order - b.order);
		setBlocks(ordered);
		if (!activeBlockId && ordered.length > 0) {
			setActiveBlockId(ordered[0].id);
		}
	}, [activeBlockId, blocksData]);

	const activeBlock = useMemo(
		() => blocks.find((block) => block.id === activeBlockId) ?? null,
		[blocks, activeBlockId]
	);

	const formValues = form.watch();
	const publishReadiness = useMemo(
		() =>
			getPublishReadiness({
				title: formValues.title,
				slug: formValues.slug,
				excerpt: formValues.excerpt,
				cover_image_url: formValues.cover_image_url,
				blockCount: blocks.length,
			}),
		[formValues, blocks.length]
	);

	const handleUploadImage = async (file: File) => {
		try {
			setIsBlockUploading(true);
			const signature = await uploadsApi.getCloudinarySignature();
			const upload = await uploadToCloudinary({
				cloudName: signature.cloudName,
				apiKey: signature.apiKey,
				timestamp: signature.timestamp,
				signature: signature.signature,
				folder: signature.folder,
				file,
			});
			return upload.secure_url;
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to upload image';
			toast.error(message);
			throw error;
		} finally {
			setIsBlockUploading(false);
		}
	};

	const handleCoverUpload = async (file: File) => {
		try {
			setIsCoverUploading(true);
			const signature = await uploadsApi.getCloudinarySignature();
			const upload = await uploadToCloudinary({
				cloudName: signature.cloudName,
				apiKey: signature.apiKey,
				timestamp: signature.timestamp,
				signature: signature.signature,
				folder: signature.folder,
				file,
			});
			await updateBlog.mutateAsync({ cover_image_url: upload.secure_url });
			toast.success('Cover image updated');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to upload cover image';
			toast.error(message);
		} finally {
			setIsCoverUploading(false);
		}
	};

	const onSubmit = async (values: BlogUpdateInput) => {
		try {
			await updateBlog.mutateAsync(values);
			toast.success('Blog updated');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to update blog';
			toast.error(message);
		}
	};

	const handleCreateBlock = async (type: BlogBlockType) => {
		try {
			const block = await createBlock.mutateAsync({ type, content: getDefaultBlockContent(type) });
			setActiveBlockId(block.id);
			toast.success('Block added');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to create block';
			toast.error(message);
		}
	};

	const handleDeleteBlock = async (blockId: string) => {
		const ok = window.confirm('Delete this block?');
		if (!ok) return;
		try {
			await deleteBlock.mutateAsync(blockId);
			setBlocks((prev) => prev.filter((block) => block.id !== blockId));
			if (activeBlockId === blockId) {
				const next = blocks.find((block) => block.id !== blockId);
				setActiveBlockId(next?.id ?? null);
			}
			toast.success('Block deleted');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to delete block';
			toast.error(message);
		}
	};

	const handleReorder = (orderedIds: string[]) => {
		const previous = blocks;
		const next = orderedIds
			.map((id) => previous.find((block) => block.id === id))
			.filter(Boolean) as BlogBlock[];
		setBlocks(next);
		reorderBlocks.mutate(orderedIds, {
			onError: () => {
				setBlocks(previous);
				toast.error('Failed to reorder blocks');
			},
		});
	};

	const handleSaveBlock = async (content: BlogBlock['content']) => {
		if (!activeBlock) return;
		const coerced = coerceNodeForBlockType(activeBlock.type, sanitizeTiptapNode(content));
		await updateBlock.mutateAsync({ blockId: activeBlock.id, content: coerced });
	};

	const handlePublish = async () => {
		if (!blog) return;
		try {
			await updateBlog.mutateAsync({ status: 'published' });
			toast.success('Blog published');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to publish blog';
			toast.error(message);
		}
	};

	const handleUnpublish = async () => {
		if (!blog) return;
		try {
			await updateBlog.mutateAsync({ status: 'draft' });
			toast.success('Blog unpublished');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to unpublish blog';
			toast.error(message);
		}
	};

	const handlePreview = () => {
		if (!blog?.slug) {
			toast.error('Add a slug to preview this blog.');
			return;
		}
		const previewPath = API_CONFIG.ENDPOINTS.WEB.BLOG_PREVIEW_PATH(blog.slug);
		const previewUrl = `${API_CONFIG.WEB_BASE_URL}${API_CONFIG.ENDPOINTS.WEB.DRAFT_ENABLE}?redirect=${encodeURIComponent(
			previewPath
		)}`;
		window.open(previewUrl, '_blank', 'noopener');
	};

	if (!blogId) {
		return <div className='text-sm text-muted-foreground'>Invalid blog id.</div>;
	}

	if (blogLoading || blocksLoading) {
		return <Loading message='Loading blog…' />;
	}

	if (!blog) {
		return <div className='text-sm text-muted-foreground'>Blog not found.</div>;
	}

	return (
		<div className='space-y-6'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Edit Blog</h1>
					<p className='text-muted-foreground'>Manage metadata and content blocks.</p>
				</div>
				<div className='flex flex-wrap items-center gap-2'>
					<Button variant='outline' onClick={handlePreview}>
						Preview
					</Button>
					{blog.status === 'published' ? (
						<Button variant='secondary' onClick={handleUnpublish}>
							Unpublish
						</Button>
					) : (
						<Button onClick={handlePublish} disabled={!publishReadiness.canPublish}>
							Publish
						</Button>
					)}
					<Badge variant={blog.status === 'published' ? 'default' : 'outline'}>{blog.status}</Badge>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Metadata</CardTitle>
					<CardDescription>Keep titles and SEO fields accurate before publishing.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
							<div className='grid gap-4 md:grid-cols-2'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input placeholder='Title' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='slug'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Slug</FormLabel>
											<FormControl>
												<Input placeholder='slug' {...field} value={field.value || ''} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='excerpt'
									render={({ field }) => (
										<FormItem className='md:col-span-2'>
											<FormLabel>Excerpt</FormLabel>
											<FormControl>
												<Input placeholder='Short summary for listings' {...field} value={field.value || ''} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='seo_title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>SEO title</FormLabel>
											<FormControl>
												<Input placeholder='SEO title' {...field} value={field.value || ''} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='seo_description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>SEO description</FormLabel>
											<FormControl>
												<Input placeholder='SEO description' {...field} value={field.value || ''} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='cover_image_url'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cover image</FormLabel>
										<FormControl>
											<Input placeholder='https://...' {...field} value={field.value || ''} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex flex-wrap items-center gap-3'>
								<Button type='submit' disabled={updateBlog.isPending}>
									{updateBlog.isPending ? 'Saving…' : 'Save metadata'}
								</Button>
								<Button
									type='button'
									variant='outline'
									disabled={isCoverUploading}
									onClick={() => {
										const input = document.createElement('input');
										input.type = 'file';
										input.accept = 'image/*';
										input.onchange = () => {
											const file = input.files?.[0];
											if (file) void handleCoverUpload(file);
										};
										input.click();
									}}>
									{isCoverUploading ? 'Uploading…' : 'Upload cover'}
								</Button>
								{isCoverUploading && <span className='text-xs text-muted-foreground'>Uploading cover…</span>}
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Publish readiness</CardTitle>
					<CardDescription>Resolve blocking items before publishing.</CardDescription>
				</CardHeader>
				<CardContent className='space-y-2 text-sm'>
					{publishReadiness.blockingReasons.length === 0 ? (
						<div className='text-sm text-muted-foreground'>All required fields are complete.</div>
					) : (
						<ul className='list-disc space-y-1 pl-4 text-destructive'>
							{publishReadiness.blockingReasons.map((reason) => (
								<li key={reason}>{reason}</li>
							))}
						</ul>
					)}
					{publishReadiness.warnings.length > 0 && (
						<ul className='list-disc space-y-1 pl-4 text-muted-foreground'>
							{publishReadiness.warnings.map((warning) => (
								<li key={warning}>{warning}</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>

			<div className='grid gap-6 lg:grid-cols-[320px_1fr]'>
				<Card>
					<CardHeader>
						<CardTitle>Blocks</CardTitle>
						<CardDescription>Order blocks to match the story flow.</CardDescription>
					</CardHeader>
					<CardContent>
						<BlockList
							blocks={blocks}
							activeBlockId={activeBlockId}
							onSelect={setActiveBlockId}
							onReorder={handleReorder}
							onCreate={handleCreateBlock}
							onDelete={handleDeleteBlock}
							isReordering={reorderBlocks.isPending}
							isCreating={createBlock.isPending}
						/>
					</CardContent>
				</Card>

				{activeBlock ? (
					<BlockEditorPanel
						key={activeBlock.id}
						block={activeBlock}
						onSave={handleSaveBlock}
						onUploadImage={handleUploadImage}
					/>
				) : (
					<Card>
						<CardHeader>
							<CardTitle>Select a block</CardTitle>
							<CardDescription>Select a block to edit its content.</CardDescription>
						</CardHeader>
						<CardContent className='text-sm text-muted-foreground'>
							Add a block from the list to start editing.
						</CardContent>
					</Card>
				)}
			</div>

			{isBlockUploading && <div className='text-xs text-muted-foreground'>Uploading image…</div>}
		</div>
	);
}
