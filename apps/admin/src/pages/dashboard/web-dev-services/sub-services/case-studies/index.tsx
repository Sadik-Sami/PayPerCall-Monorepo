import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { webDevServicesApi } from '@/services/web-dev-services.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Plus, Trash2, X } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { toast } from 'sonner';
import { useState } from 'react';
import { SortableList } from '@/components/editors/sortable-list';
import { ImageUpload } from '@/components/editors/image-upload';
import { RichTextEditor } from '@/components/editors/rich-text-editor';
import type { WebDevCaseStudy, ImageData, CreateWebDevCaseStudyInput, UpdateWebDevCaseStudyInput } from '@/types/web-dev-services.types';

interface CaseStudyFormData {
	id?: string;
	title: string;
	description: string;
	clientName: string;
	results: Array<{ metric: string; value: string }>;
	image: ImageData | null;
	isActive: boolean;
	order: number;
}

const defaultCaseStudy: CaseStudyFormData = {
	title: '',
	description: '',
	clientName: '',
	results: [],
	image: null,
	isActive: true,
	order: 0,
};

export default function CaseStudiesPage() {
	const { id, subId } = useParams<{ id: string; subId: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudyFormData | null>(null);

	const { data: subService, isLoading: subServiceLoading } = useQuery({
		queryKey: ['web-dev-sub-service', subId],
		queryFn: () => webDevServicesApi.getSubServiceById(subId!),
		enabled: !!subId,
	});

	const { data: caseStudies, isLoading: caseStudiesLoading } = useQuery({
		queryKey: ['web-dev-case-studies', subId],
		queryFn: () => webDevServicesApi.getAllCaseStudies(subId, true),
		enabled: !!subId,
	});

	const createMutation = useMutation({
		mutationFn: (data: CreateWebDevCaseStudyInput) => webDevServicesApi.createCaseStudy(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-case-studies', subId] });
			toast.success('Case study created successfully');
			setEditingCaseStudy(null);
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to create case study');
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateWebDevCaseStudyInput }) =>
			webDevServicesApi.updateCaseStudy(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-case-studies', subId] });
			toast.success('Case study updated successfully');
			setEditingCaseStudy(null);
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to update case study');
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (caseStudyId: string) => webDevServicesApi.deleteCaseStudy(caseStudyId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-case-studies', subId] });
			toast.success('Case study deleted successfully');
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to delete case study');
		},
	});

	const orderMutation = useMutation({
		mutationFn: (items: Array<{ id: string; order: number }>) => webDevServicesApi.updateCaseStudiesOrder(items),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-case-studies', subId] });
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to update order');
		},
	});

	const handleSave = () => {
		if (!editingCaseStudy) return;

		const data = {
			title: editingCaseStudy.title,
			description: editingCaseStudy.description || undefined,
			clientName: editingCaseStudy.clientName || undefined,
			results: editingCaseStudy.results.length > 0 ? editingCaseStudy.results : undefined,
			image: editingCaseStudy.image || undefined,
			isActive: editingCaseStudy.isActive,
			order: editingCaseStudy.order,
		};

		if (editingCaseStudy.id) {
			updateMutation.mutate({ id: editingCaseStudy.id, data });
		} else {
			createMutation.mutate({ ...data, subServiceId: subId! });
		}
	};

	const handleDelete = (caseStudyId: string) => {
		if (!confirm('Are you sure you want to delete this case study?')) return;
		deleteMutation.mutate(caseStudyId);
	};

	const handleReorder = (reorderedCaseStudies: WebDevCaseStudy[]) => {
		const orderUpdates = reorderedCaseStudies.map((cs, index) => ({
			id: cs.id,
			order: index,
		}));
		orderMutation.mutate(orderUpdates);
	};

	const addResult = () => {
		if (!editingCaseStudy) return;
		setEditingCaseStudy({
			...editingCaseStudy,
			results: [...editingCaseStudy.results, { metric: '', value: '' }],
		});
	};

	const updateResult = (index: number, field: 'metric' | 'value', value: string) => {
		if (!editingCaseStudy) return;
		const newResults = [...editingCaseStudy.results];
		newResults[index] = { ...newResults[index], [field]: value };
		setEditingCaseStudy({ ...editingCaseStudy, results: newResults });
	};

	const removeResult = (index: number) => {
		if (!editingCaseStudy) return;
		setEditingCaseStudy({
			...editingCaseStudy,
			results: editingCaseStudy.results.filter((_, i) => i !== index),
		});
	};

	const isLoading = subServiceLoading || caseStudiesLoading;
	const isSaving = createMutation.isPending || updateMutation.isPending;

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() =>
							navigate(
								ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES_EDIT.replace(':id', id!).replace(':subId', subId!)
							)
						}>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back
					</Button>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>Case Studies</h1>
						<p className='text-muted-foreground'>
							Manage case studies for {subService?.title || 'this sub-service'}.
						</p>
					</div>
				</div>
				<Button onClick={() => setEditingCaseStudy({ ...defaultCaseStudy, order: caseStudies?.length || 0 })}>
					<Plus className='mr-2 h-4 w-4' />
					Add Case Study
				</Button>
			</div>

			{/* Edit/Create Form */}
			{editingCaseStudy && (
				<Card>
					<CardHeader>
						<CardTitle>{editingCaseStudy.id ? 'Edit Case Study' : 'New Case Study'}</CardTitle>
						<CardDescription>
							{editingCaseStudy.id ? 'Update case study details.' : 'Create a new case study.'}
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label>Title *</Label>
								<Input
									value={editingCaseStudy.title}
									onChange={(e) => setEditingCaseStudy({ ...editingCaseStudy, title: e.target.value })}
									placeholder='Project name or title'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Client Name</Label>
								<Input
									value={editingCaseStudy.clientName}
									onChange={(e) =>
										setEditingCaseStudy({ ...editingCaseStudy, clientName: e.target.value })
									}
									placeholder='Company or client name'
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label>Description</Label>
							<RichTextEditor
								content={editingCaseStudy.description}
								onChange={(value) => setEditingCaseStudy({ ...editingCaseStudy, description: value })}
								placeholder='Describe the case study...'
							/>
						</div>
						<ImageUpload
							value={editingCaseStudy.image}
							onChange={(value) => setEditingCaseStudy({ ...editingCaseStudy, image: value })}
							folder='paypercall/case-studies'
							label='Case Study Image'
						/>
						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<Label>Results / Metrics</Label>
								<Button type='button' variant='outline' size='sm' onClick={addResult}>
									<Plus className='h-4 w-4 mr-1' />
									Add Result
								</Button>
							</div>
							{editingCaseStudy.results.length > 0 ? (
								<div className='space-y-2'>
									{editingCaseStudy.results.map((result, index) => (
										<div key={index} className='flex gap-2 items-center'>
											<Input
												value={result.metric}
												onChange={(e) => updateResult(index, 'metric', e.target.value)}
												placeholder='Metric (e.g., Conversion Rate)'
												className='flex-1'
											/>
											<Input
												value={result.value}
												onChange={(e) => updateResult(index, 'value', e.target.value)}
												placeholder='Value (e.g., +150%)'
												className='w-32'
											/>
											<Button
												type='button'
												variant='ghost'
												size='icon'
												onClick={() => removeResult(index)}>
												<X className='h-4 w-4' />
											</Button>
										</div>
									))}
								</div>
							) : (
								<p className='text-sm text-muted-foreground'>
									No results added. Add metrics to showcase project outcomes.
								</p>
							)}
						</div>
						<div className='flex items-center gap-4'>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={editingCaseStudy.isActive}
									onChange={(e) =>
										setEditingCaseStudy({ ...editingCaseStudy, isActive: e.target.checked })
									}
									className='rounded border-input'
								/>
								<span className='text-sm'>Active</span>
							</label>
						</div>
						<div className='flex justify-end gap-2'>
							<Button variant='outline' onClick={() => setEditingCaseStudy(null)}>
								Cancel
							</Button>
							<Button onClick={handleSave} disabled={isSaving || !editingCaseStudy.title}>
								{isSaving ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
								{editingCaseStudy.id ? 'Update' : 'Create'}
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Case Studies List */}
			{caseStudies && caseStudies.length > 0 ? (
				<SortableList
					items={caseStudies}
					onReorder={handleReorder}
					renderItem={(cs) => (
						<Card className={!cs.isActive ? 'opacity-60' : ''}>
							<CardContent className='p-4'>
								<div className='flex items-start gap-4'>
									{cs.image && (
										<img
											src={cs.image.url}
											alt={cs.image.alt || cs.title}
											className='w-24 h-24 object-cover rounded-lg'
										/>
									)}
									<div className='flex-1'>
										<div className='flex items-start justify-between'>
											<div>
												<h3 className='font-semibold'>{cs.title}</h3>
												{cs.clientName && (
													<p className='text-sm text-muted-foreground'>{cs.clientName}</p>
												)}
												{!cs.isActive && (
													<span className='text-xs text-muted-foreground'>(Inactive)</span>
												)}
											</div>
											<div className='flex gap-2'>
												<Button
													variant='ghost'
													size='sm'
													onClick={() =>
														setEditingCaseStudy({
															id: cs.id,
															title: cs.title,
															description: cs.description || '',
															clientName: cs.clientName || '',
															results: cs.results || [],
															image: cs.image || null,
															isActive: cs.isActive,
															order: cs.order,
														})
													}>
													Edit
												</Button>
												<Button variant='ghost' size='sm' onClick={() => handleDelete(cs.id)}>
													<Trash2 className='h-4 w-4 text-destructive' />
												</Button>
											</div>
										</div>
										{cs.results && cs.results.length > 0 && (
											<div className='flex flex-wrap gap-2 mt-2'>
												{cs.results.slice(0, 3).map((result, i) => (
													<span
														key={i}
														className='text-xs px-2 py-1 bg-muted rounded-md'>
														{result.metric}: <strong>{result.value}</strong>
													</span>
												))}
											</div>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				/>
			) : (
				!editingCaseStudy && (
					<Card>
						<CardContent className='py-12 text-center'>
							<p className='text-muted-foreground mb-4'>No case studies yet.</p>
							<Button onClick={() => setEditingCaseStudy({ ...defaultCaseStudy, order: 0 })}>
								<Plus className='mr-2 h-4 w-4' />
								Add First Case Study
							</Button>
						</CardContent>
					</Card>
				)
			)}
		</div>
	);
}

