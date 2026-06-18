import { useMemo, useState } from 'react';
import { Eye } from 'lucide-react';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { useContactSubmissions, useUpdateContactSubmissionStatus } from '@/hooks/use-contact-submissions';
import type { ContactSubmissionStatus } from '@/types/contact-submission.types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { navigationData } from '@workspace/ui/data/navigation';
import { ContactSubmissionDetailSheet } from '@/components/contact-submissions/contact-submission-detail-sheet';
import { ContactStatusBadge } from '@/components/contact-submissions/contact-status-badge';

type StatusFilter = 'all' | ContactSubmissionStatus;
type SortBy = 'created_at' | 'updated_at' | 'desired_date' | 'status';
type SortOrder = 'asc' | 'desc';
type PageItem = number | 'ellipsis';

const STATUS_OPTIONS: Array<{ value: StatusFilter; label: string }> = [
	{ value: 'all', label: 'All' },
	{ value: 'pending', label: 'Pending' },
	{ value: 'contacted', label: 'Contacted' },
	{ value: 'scheduled', label: 'Scheduled' },
	{ value: 'completed', label: 'Completed' },
	{ value: 'declined', label: 'Declined' },
];

function getCategoryFromHref(href: string): string | undefined {
	const parts = href.split('/').filter(Boolean);
	const idx = parts.indexOf('services');
	return idx >= 0 ? parts[idx + 1] : undefined;
}

function buildPageItems(current: number, total: number): PageItem[] {
	if (total <= 1) return [1];
	const items: PageItem[] = [];
	const add = (value: PageItem) => items.push(value);

	add(1);
	const start = Math.max(2, current - 1);
	const end = Math.min(total - 1, current + 1);

	if (start > 2) add('ellipsis');
	for (let i = start; i <= end; i += 1) add(i);
	if (end < total - 1) add('ellipsis');
	if (total > 1) add(total);

	return items;
}

function formatDate(value?: string | null) {
	if (!value) return '—';
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return '—';
	return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ContactSubmissionsPage() {
	const [searchInput, setSearchInput] = useState('');
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState<StatusFilter>('all');
	const [category, setCategory] = useState('all');
	const [sortBy, setSortBy] = useState<SortBy>('created_at');
	const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

	const { debounced } = useDebouncedCallback((value: string) => {
		setSearch(value.trim());
		setPage(1);
	}, 350);

	const params = useMemo(
		() => ({
			search: search || undefined,
			status: status === 'all' ? undefined : status,
			serviceCategory: category === 'all' ? undefined : category,
			sortBy,
			sortOrder,
			page,
			limit,
		}),
		[search, status, category, sortBy, sortOrder, page, limit],
	);

	const { data, isLoading, isError, error, refetch, isFetching } = useContactSubmissions(params);
	const updateStatus = useUpdateContactSubmissionStatus();

	const submissions = data?.data ?? [];
	const meta = data?.meta;
	const totalLabel =
		meta ?
			`${meta.total} result${meta.total === 1 ? '' : 's'}`
		:	`${submissions.length} result${submissions.length === 1 ? '' : 's'}`;
	const totalPages = meta?.totalPages ?? 1;
	const currentPage = meta?.page ?? page;
	const pageItems = buildPageItems(currentPage, totalPages);

	const serviceCategoryOptions = useMemo(() => {
		const services = navigationData.find((item) => item.id === 'services');
		const columns = services?.columns ?? [];
		const unique = new Map<string, string>();

		columns.forEach((column) => {
			const href = column.links?.[0]?.href ?? '';
			const value = getCategoryFromHref(href);
			if (value && !unique.has(value)) {
				unique.set(value, column.title);
			}
		});

		return Array.from(unique.entries()).map(([value, label]) => ({ value, label }));
	}, []);

	const onClearFilters = () => {
		setSearchInput('');
		setSearch('');
		setStatus('all');
		setCategory('all');
		setSortBy('created_at');
		setSortOrder('desc');
		setPage(1);
	};

	return (
		<div className='space-y-6'>
			<div className='flex flex-col gap-2'>
				<h1 className='text-3xl font-bold tracking-tight'>Contact Submissions</h1>
				<p className='text-muted-foreground'>Triage consultation requests from the marketing site.</p>
			</div>

			<Card className='p-4'>
				<CardHeader className='space-y-3'>
					<div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
						<div>
							<CardTitle>Submission list</CardTitle>
							<CardDescription>
								Multi-step contact form responses including preferred meeting time.
							</CardDescription>
						</div>
						<div className='text-sm text-muted-foreground'>{isLoading ? 'Loading…' : totalLabel}</div>
					</div>

					<div className='grid gap-3 lg:grid-cols-5'>
						<div className='lg:col-span-2'>
							<label className='text-sm font-medium'>Search</label>
							<Input
								value={searchInput}
								onChange={(e) => {
									setSearchInput(e.target.value);
									debounced(e.target.value);
								}}
								placeholder='Search name, email, company, context…'
								className='mt-2'
							/>
						</div>

						<div>
							<label className='text-sm font-medium'>Category</label>
							<Select
								value={category}
								onValueChange={(value) => {
									setCategory(value);
									setPage(1);
								}}>
								<SelectTrigger className='mt-2 w-full'>
									<SelectValue placeholder='All categories' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>All</SelectItem>
									{serviceCategoryOptions.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className='text-sm font-medium'>Status</label>
							<Select
								value={status}
								onValueChange={(value) => {
									setStatus(value as StatusFilter);
									setPage(1);
								}}>
								<SelectTrigger className='mt-2 w-full'>
									<SelectValue placeholder='All statuses' />
								</SelectTrigger>
								<SelectContent>
									{STATUS_OPTIONS.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className='grid grid-cols-2 gap-2'>
							<div>
								<label className='text-sm font-medium'>Sort by</label>
								<Select
									value={sortBy}
									onValueChange={(value) => {
										setSortBy(value as SortBy);
										setPage(1);
									}}>
									<SelectTrigger className='mt-2 w-full'>
										<SelectValue placeholder='Created' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='created_at'>Created</SelectItem>
										<SelectItem value='updated_at'>Updated</SelectItem>
										<SelectItem value='desired_date'>Desired date</SelectItem>
										<SelectItem value='status'>Status</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<label className='text-sm font-medium'>Order</label>
								<Select
									value={sortOrder}
									onValueChange={(value) => {
										setSortOrder(value as SortOrder);
										setPage(1);
									}}>
									<SelectTrigger className='mt-2 w-full'>
										<SelectValue placeholder='Desc' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='desc'>Desc</SelectItem>
										<SelectItem value='asc'>Asc</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					<div className='flex flex-wrap items-center gap-2 text-sm'>
						<Button variant='outline' onClick={() => void refetch()} disabled={isFetching}>
							Refresh
						</Button>
						<Button variant='ghost' onClick={onClearFilters}>
							Clear filters
						</Button>
					</div>
				</CardHeader>

				<CardContent>
					{isError && (
						<div className='rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm'>
							<div className='font-medium'>Failed to load contact submissions</div>
							<div className='text-muted-foreground'>{(error as Error)?.message || 'Unknown error'}</div>
						</div>
					)}

					{isLoading ?
						<div className='space-y-3'>
							{Array.from({ length: 6 }).map((_, idx) => (
								<div key={idx} className='grid grid-cols-6 gap-3'>
									<Skeleton className='h-6' />
									<Skeleton className='h-6' />
									<Skeleton className='h-6' />
									<Skeleton className='h-6' />
									<Skeleton className='h-6' />
									<Skeleton className='h-6' />
								</div>
							))}
						</div>
					: submissions.length === 0 ?
						<div className='rounded-lg border bg-card p-8 text-center'>
							<p className='text-muted-foreground'>No contact submissions match your filters.</p>
							<div className='mt-4'>
								<Button variant='outline' onClick={onClearFilters}>
									Reset filters
								</Button>
							</div>
						</div>
					:	<Table>
							<TableHeader>
								<TableRow className='text-xs text-muted-foreground'>
									<TableHead>Status</TableHead>
									<TableHead>Lead</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Desired date</TableHead>
									<TableHead>Created</TableHead>
									<TableHead>Update</TableHead>
									<TableHead className='text-right'>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{submissions.map((submission) => (
									<TableRow key={submission.id}>
										<TableCell>
											<ContactStatusBadge status={submission.status} />
										</TableCell>
										<TableCell>
											<div className='font-medium'>{submission.full_name}</div>
											<div className='text-sm text-muted-foreground'>{submission.work_email}</div>
											<div className='text-xs text-muted-foreground'>{submission.company}</div>
										</TableCell>
										<TableCell className='text-sm text-muted-foreground'>
											{submission.service_category}
										</TableCell>
										<TableCell className='text-sm text-muted-foreground'>
											{formatDate(submission.desired_date)}
										</TableCell>
										<TableCell className='text-sm text-muted-foreground'>
											{formatDate(submission.created_at)}
										</TableCell>
										<TableCell>
											<Select
												value={submission.status}
												onValueChange={(value) =>
													updateStatus.mutate({
														id: submission.id,
														status: value as ContactSubmissionStatus,
													})
												}
												disabled={updateStatus.isPending}>
												<SelectTrigger className='w-full'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{STATUS_OPTIONS.filter((option) => option.value !== 'all').map((option) => (
														<SelectItem key={option.value} value={option.value}>
															{option.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</TableCell>
										<TableCell className='text-right'>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => setSelectedSubmissionId(submission.id)}
												aria-label={`View details for ${submission.full_name}`}>
												<Eye className='size-4' />
												<span className='hidden sm:inline'>View</span>
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					}

					<div className='mt-4 flex flex-wrap items-center justify-between gap-3 text-sm'>
						<div className='text-muted-foreground'>
							{meta ? `Page ${meta.page} of ${meta.totalPages}` : `Page ${page}`}
						</div>
						<div className='flex items-center gap-2'>
							<label className='text-sm text-muted-foreground'>Rows</label>
							<Select
								value={String(limit)}
								onValueChange={(value) => {
									setLimit(Number(value));
									setPage(1);
								}}>
								<SelectTrigger className='w-22'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='10'>10</SelectItem>
									<SelectItem value='20'>20</SelectItem>
									<SelectItem value='50'>50</SelectItem>
								</SelectContent>
							</Select>
							<Pagination className='w-auto justify-end'>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
											href='#'
											onClick={(event) => {
												event.preventDefault();
												setPage((prev) => Math.max(prev - 1, 1));
											}}
											aria-disabled={currentPage <= 1}
										/>
									</PaginationItem>
									{pageItems.map((item, idx) => (
										<PaginationItem key={`${item}-${idx}`}>
											{item === 'ellipsis' ?
												<PaginationEllipsis />
											:	<PaginationLink
													href='#'
													isActive={item === currentPage}
													onClick={(event) => {
														event.preventDefault();
														setPage(item);
													}}>
													{item}
												</PaginationLink>
											}
										</PaginationItem>
									))}
									<PaginationItem>
										<PaginationNext
											href='#'
											onClick={(event) => {
												event.preventDefault();
												setPage((prev) => Math.min(prev + 1, totalPages));
											}}
											aria-disabled={currentPage >= totalPages}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</div>
				</CardContent>
			</Card>

			<ContactSubmissionDetailSheet
				submissionId={selectedSubmissionId}
				onOpenChange={(open) => {
					if (!open) setSelectedSubmissionId(null);
				}}
			/>
		</div>
	);
}
