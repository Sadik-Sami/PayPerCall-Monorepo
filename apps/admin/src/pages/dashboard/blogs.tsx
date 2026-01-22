import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { ROUTES } from '@/utils/constants';
import type { Blog, BlogStatus } from '@/types/blog.types';
import { useBlogs, useDeleteBlog } from '@/hooks/use-blogs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, RefreshCw, Trash2, Pencil } from 'lucide-react';

type StatusFilter = 'all' | BlogStatus;

function formatDate(value?: string | null) {
	if (!value) return '—';
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return '—';
	return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function StatusBadge({ status }: { status: BlogStatus }) {
	if (status === 'published') {
		return <Badge variant='default'>Published</Badge>;
	}
	if (status === 'unlisted') {
		return <Badge variant='outline'>Unlisted</Badge>;
	}
	return <Badge variant='secondary'>Draft</Badge>;
}

export default function BlogsPage() {
	const navigate = useNavigate();
	const { data, isLoading, isError, error, refetch, isFetching } = useBlogs();
	const deleteBlog = useDeleteBlog();

	const [query, setQuery] = useState('');
	const [status, setStatus] = useState<StatusFilter>('all');
	const [featured, setFeatured] = useState<'all' | 'featured'>('all');

	const blogs = useMemo(() => data ?? [], [data]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return [...blogs]
			.filter((b) => {
				if (status !== 'all' && b.status !== status) return false;
				if (featured === 'featured' && !b.is_featured) return false;
				if (!q) return true;
				return (b.title || '').toLowerCase().includes(q) || (b.slug || '').toLowerCase().includes(q);
			})
			.sort((a: Blog, b: Blog) => {
				const aTime = a.updated_at ? new Date(a.updated_at).getTime() : 0;
				const bTime = b.updated_at ? new Date(b.updated_at).getTime() : 0;
				return bTime - aTime;
			});
	}, [blogs, query, status, featured]);

	const onDelete = (blog: Blog) => {
		const ok = window.confirm(`Delete blog "${blog.title}"? This cannot be undone.`);
		if (!ok) return;

		deleteBlog.mutate(blog.id, {
			onSuccess: () => toast.success('Blog deleted'),
			onError: (err: Error) => toast.error(err.message || 'Failed to delete blog'),
		});
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Blogs</h1>
					<p className='text-muted-foreground'>Create, edit, and manage blog posts.</p>
				</div>
				<div className='flex items-center gap-2'>
					<Button variant='outline' onClick={() => void refetch()} disabled={isFetching}>
						{isFetching ?
							<Loader2 className='h-4 w-4 animate-spin' />
						:	<RefreshCw className='h-4 w-4' />}
						Refresh
					</Button>
					<Button asChild>
						<Link to={ROUTES.DASHBOARD_BLOG_CREATE}>
							<Plus className='h-4 w-4' />
							New blog
						</Link>
					</Button>
				</div>
			</div>

			<Card>
				<CardHeader className='space-y-2'>
					<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
						<div>
							<CardTitle>Blog list</CardTitle>
							<CardDescription>Drafts and published posts are visible to admins.</CardDescription>
						</div>
						<div className='text-sm text-muted-foreground'>
							{isLoading ? 'Loading…' : `${filtered.length} result${filtered.length === 1 ? '' : 's'}`}
						</div>
					</div>

					<div className='grid gap-3 md:grid-cols-3'>
						<div className='md:col-span-1'>
							<label className='text-sm font-medium'>Search</label>
							<Input
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder='Search by title or slug…'
								className='mt-2'
							/>
						</div>

						<div>
							<label className='text-sm font-medium'>Status</label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value as StatusFilter)}
								className='mt-2 h-9 w-full rounded-md border bg-background px-3 text-sm'>
								<option value='all'>All</option>
								<option value='draft'>Draft</option>
								<option value='published'>Published</option>
								<option value='unlisted'>Unlisted</option>
							</select>
						</div>

						<div>
							<label className='text-sm font-medium'>Featured</label>
							<select
								value={featured}
								onChange={(e) => setFeatured(e.target.value as 'all' | 'featured')}
								className='mt-2 h-9 w-full rounded-md border bg-background px-3 text-sm'>
								<option value='all'>All</option>
								<option value='featured'>Featured only</option>
							</select>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					{isError && (
						<div className='rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm'>
							<div className='font-medium'>Failed to load blogs</div>
							<div className='text-muted-foreground'>{(error as Error)?.message || 'Unknown error'}</div>
						</div>
					)}

					{isLoading ?
						<div className='flex items-center gap-2 text-sm text-muted-foreground'>
							<Loader2 className='h-4 w-4 animate-spin' />
							Loading blogs…
						</div>
					:	filtered.length === 0 ?
						<div className='rounded-lg border bg-card p-8 text-center'>
							<p className='text-muted-foreground'>No blogs match your filters.</p>
							<div className='mt-4'>
								<Button onClick={() => navigate(ROUTES.DASHBOARD_BLOG_CREATE)}>
									<Plus className='h-4 w-4' />
									Create your first blog
								</Button>
							</div>
						</div>
					:	<div className='overflow-x-auto'>
							<table className='w-full border-separate border-spacing-0'>
								<thead>
									<tr className='text-left text-xs text-muted-foreground'>
										<th className='border-b px-3 py-2 font-medium'>Status</th>
										<th className='border-b px-3 py-2 font-medium'>Title</th>
										<th className='border-b px-3 py-2 font-medium'>Slug</th>
										<th className='border-b px-3 py-2 font-medium'>Updated</th>
										<th className='border-b px-3 py-2 text-right font-medium'>Actions</th>
									</tr>
								</thead>
								<tbody>
									{filtered.map((b) => (
										<tr key={b.id} className='hover:bg-accent/40'>
											<td className='border-b px-3 py-3 align-middle'>
												<div className='flex items-center gap-2'>
													<StatusBadge status={b.status} />
													{b.is_featured && <Badge variant='outline'>Featured</Badge>}
												</div>
											</td>
											<td className='border-b px-3 py-3 align-middle'>
												<div className='font-medium'>{b.title}</div>
											</td>
											<td className='border-b px-3 py-3 align-middle'>
												<span className='font-mono text-sm text-muted-foreground'>{b.slug || '—'}</span>
											</td>
											<td className='border-b px-3 py-3 align-middle text-sm text-muted-foreground'>
												{formatDate(b.updated_at)}
											</td>
											<td className='border-b px-3 py-3 align-middle'>
												<div className='flex items-center justify-end gap-2'>
													<Button asChild size='sm' variant='outline'>
														<Link to={ROUTES.DASHBOARD_BLOG_EDIT(b.id)}>
															<Pencil className='h-4 w-4' />
															Edit
														</Link>
													</Button>
													<Button
														size='sm'
														variant='destructive'
														onClick={() => onDelete(b)}
														disabled={deleteBlog.isPending}>
														<Trash2 className='h-4 w-4' />
														Delete
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>}
				</CardContent>
			</Card>
		</div>
	);
}
