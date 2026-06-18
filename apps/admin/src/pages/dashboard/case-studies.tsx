import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Plus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@workspace/ui/components/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ROUTES } from '@/utils/constants';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import {
	useCaseStudies,
	useDeleteCaseStudy,
	useUpdateCaseStudyStatus,
	useReorderCaseStudies,
} from '@/hooks/use-case-studies';
import { CaseStudyGridCard } from '@/components/case-studies/case-study-grid-card';
import { CaseStudyDeleteDialog } from '@/components/case-studies/case-study-delete-dialog';
import type { CaseStudyCategory, CaseStudyStatus } from '@/types/case-study.types';

export default function CaseStudiesPage() {
	const navigate = useNavigate();

	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const [category, setCategory] = useState<CaseStudyCategory | 'all'>('all');
	const [status, setStatus] = useState<CaseStudyStatus | 'all'>('all');

	const [deleteId, setDeleteId] = useState<string | null>(null);

	const { debounced: updateDebouncedSearch } = useDebouncedCallback((val: string) => {
		setDebouncedSearch(val);
	}, 350);

	const handleSearchChange = (val: string) => {
		setSearch(val);
		updateDebouncedSearch(val);
	};

	const { data, isLoading, isFetching, refetch } = useCaseStudies({
		search: debouncedSearch || undefined,
		category: category === 'all' ? undefined : category,
		status: status === 'all' ? undefined : status,
		limit: 100,
		sortBy: 'display_order',
		sortOrder: 'asc'
	});

	const caseStudies = useMemo(() => data?.data ?? [], [data]);
	const meta = data?.meta;

	const deleteMutation = useDeleteCaseStudy();
	const statusMutation = useUpdateCaseStudyStatus();
	const reorderMutation = useReorderCaseStudies();

	const isReorderDisabled = category === 'all';

	const handleStatusChange = async (id: string, newStatus: CaseStudyStatus) => {
		try {
			await statusMutation.mutateAsync({ id, status: newStatus });
			toast.success('Status updated');
		} catch (error) {
			toast.error('Failed to update status');
		}
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		try {
			await deleteMutation.mutateAsync(deleteId);
			toast.success('Case study deleted');
			setDeleteId(null);
		} catch (error) {
			toast.error('Failed to delete case study');
		}
	};

	const handleMoveUp = (id: string) => {
		const index = caseStudies.findIndex(c => c.id === id);
		if (index <= 0) return;

		const current = caseStudies[index];
		const above = caseStudies[index - 1];

		const items = [
			{ id: current.id, displayOrder: above.display_order },
			{ id: above.id, displayOrder: current.display_order }
		];

		toast.promise(reorderMutation.mutateAsync(items), {
			loading: 'Reordering...',
			success: 'Reordered successfully',
			error: 'Failed to reorder'
		});
	};

	const handleMoveDown = (id: string) => {
		const index = caseStudies.findIndex(c => c.id === id);
		if (index === -1 || index === caseStudies.length - 1) return;

		const current = caseStudies[index];
		const below = caseStudies[index + 1];

		const items = [
			{ id: current.id, displayOrder: below.display_order },
			{ id: below.id, displayOrder: current.display_order }
		];

		toast.promise(reorderMutation.mutateAsync(items), {
			loading: 'Reordering...',
			success: 'Reordered successfully',
			error: 'Failed to reorder'
		});
	};

	const handleResetFilters = () => {
		handleSearchChange('');
		setCategory('all');
		setStatus('all');
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
					<p className="text-muted-foreground">Manage success stories shown across service pages.</p>
				</div>
				<Button onClick={() => navigate(ROUTES.DASHBOARD_CASE_STUDY_CREATE)}>
					<Plus className="mr-2 h-4 w-4" />
					New case study
				</Button>
			</div>

			<Card className='p-4'>
				<CardHeader className='space-y-3'>
					<div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
						<div>
							<CardTitle>Case study library</CardTitle>
							<p className='text-sm text-muted-foreground'>Cards shown across service pages.</p>
						</div>
						<div className='text-sm text-muted-foreground'>
							{isLoading ?
								'Loading…'
							:	`${meta?.total ?? caseStudies.length} result${(meta?.total ?? caseStudies.length) === 1 ? '' : 's'}`}
						</div>
					</div>

					<div className='grid gap-3 lg:grid-cols-4'>
						<div className='lg:col-span-2'>
							<label className='text-sm font-medium'>Search</label>
							<Input
								placeholder='Search titles or descriptions…'
								value={search}
								onChange={(e) => handleSearchChange(e.target.value)}
								className='mt-2'
							/>
						</div>

						<div>
							<label className='text-sm font-medium'>Category</label>
							<Select
								value={category}
								onValueChange={(val) => setCategory(val as CaseStudyCategory | 'all')}>
								<SelectTrigger className='mt-2 w-full'>
									<SelectValue placeholder='All categories' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>All</SelectItem>
									<SelectItem value='pay-per-call'>Pay Per Call</SelectItem>
									<SelectItem value='pay-per-lead'>Pay Per Lead</SelectItem>
									<SelectItem value='digital-marketing'>Digital Marketing</SelectItem>
									<SelectItem value='app-dev'>App Dev</SelectItem>
									<SelectItem value='cms'>CMS</SelectItem>
									<SelectItem value='web-dev'>Web Dev</SelectItem>
									<SelectItem value='hire-call-center'>Hire Call Center</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label className='text-sm font-medium'>Status</label>
							<Select
								value={status}
								onValueChange={(val) => setStatus(val as CaseStudyStatus | 'all')}>
								<SelectTrigger className='mt-2 w-full'>
									<SelectValue placeholder='All statuses' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='all'>All</SelectItem>
									<SelectItem value='published'>Published</SelectItem>
									<SelectItem value='draft'>Draft</SelectItem>
									<SelectItem value='archived'>Archived</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className='flex flex-wrap items-center gap-2 text-sm'>
						<Button variant='outline' onClick={() => void refetch()} disabled={isFetching}>
							<RotateCcw className='mr-2 h-4 w-4' />
							Refresh
						</Button>
						<Button variant='ghost' onClick={handleResetFilters}>
							Clear filters
						</Button>
					</div>
				</CardHeader>

				<CardContent>
					{isLoading ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{Array.from({ length: 8 }).map((_, i) => (
								<Card key={i} className="flex flex-col h-full overflow-hidden">
									<Skeleton className="aspect-video w-full rounded-none" />
									<div className="p-4 space-y-3">
										<Skeleton className="h-6 w-3/4" />
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-4 w-2/3" />
									</div>
								</Card>
							))}
						</div>
					) : caseStudies.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg border-dashed">
							<div className="rounded-full bg-muted p-3 mb-4">
								<Plus className="h-6 w-6 text-muted-foreground" />
							</div>
							<h3 className="text-lg font-medium">No case studies found</h3>
							<p className="text-sm text-muted-foreground mt-1 mb-4">
								Try adjusting your filters or create a new one.
							</p>
							<div className="flex gap-2">
								<Button variant="outline" onClick={handleResetFilters}>
									Reset filters
								</Button>
								<Button onClick={() => navigate(ROUTES.DASHBOARD_CASE_STUDY_CREATE)}>
									Create one
								</Button>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{caseStudies.map((study, idx) => (
								<CaseStudyGridCard
									key={study.id}
									caseStudy={study}
									canMoveUp={idx > 0}
									canMoveDown={idx < caseStudies.length - 1}
									isReorderDisabled={isReorderDisabled}
									orderNumber={isReorderDisabled ? undefined : idx + 1}
									onEdit={(id) => navigate(ROUTES.DASHBOARD_CASE_STUDY_EDIT(id))}
									onDelete={(id) => setDeleteId(id)}
									onStatusChange={handleStatusChange}
									onMoveUp={handleMoveUp}
									onMoveDown={handleMoveDown}
								/>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			<CaseStudyDeleteDialog
				open={!!deleteId}
				onOpenChange={(open) => !open && setDeleteId(null)}
				onConfirm={handleDelete}
				isDeleting={deleteMutation.isPending}
			/>
		</div>
	);
}
