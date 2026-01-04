import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { webDevServicesApi } from '@/services/web-dev-services.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Plus, Trash2, Star } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { toast } from 'sonner';
import { useState } from 'react';
import { SortableList } from '@/components/editors/sortable-list';
import { ImageUpload } from '@/components/editors/image-upload';
import type { WebDevTestimonial, ImageData, CreateWebDevTestimonialInput, UpdateWebDevTestimonialInput } from '@/types/web-dev-services.types';

interface TestimonialFormData {
	id?: string;
	name: string;
	role: string;
	company: string;
	content: string;
	image: ImageData | null;
	rating: number;
	isActive: boolean;
	order: number;
}

const defaultTestimonial: TestimonialFormData = {
	name: '',
	role: '',
	company: '',
	content: '',
	image: null,
	rating: 5,
	isActive: true,
	order: 0,
};

export default function TestimonialsPage() {
	const { id, subId } = useParams<{ id: string; subId: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [editingTestimonial, setEditingTestimonial] = useState<TestimonialFormData | null>(null);

	const { data: subService, isLoading: subServiceLoading } = useQuery({
		queryKey: ['web-dev-sub-service', subId],
		queryFn: () => webDevServicesApi.getSubServiceById(subId!),
		enabled: !!subId,
	});

	const { data: testimonials, isLoading: testimonialsLoading } = useQuery({
		queryKey: ['web-dev-testimonials', subId],
		queryFn: () => webDevServicesApi.getAllTestimonials(subId, true),
		enabled: !!subId,
	});

	const createMutation = useMutation({
		mutationFn: (data: CreateWebDevTestimonialInput) => webDevServicesApi.createTestimonial(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-testimonials', subId] });
			toast.success('Testimonial created successfully');
			setEditingTestimonial(null);
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to create testimonial');
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateWebDevTestimonialInput }) =>
			webDevServicesApi.updateTestimonial(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-testimonials', subId] });
			toast.success('Testimonial updated successfully');
			setEditingTestimonial(null);
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to update testimonial');
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (testimonialId: string) => webDevServicesApi.deleteTestimonial(testimonialId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-testimonials', subId] });
			toast.success('Testimonial deleted successfully');
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to delete testimonial');
		},
	});

	const orderMutation = useMutation({
		mutationFn: (items: Array<{ id: string; order: number }>) => webDevServicesApi.updateTestimonialsOrder(items),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-testimonials', subId] });
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to update order');
		},
	});

	const handleSave = () => {
		if (!editingTestimonial) return;

		const data = {
			name: editingTestimonial.name,
			role: editingTestimonial.role || undefined,
			company: editingTestimonial.company || undefined,
			content: editingTestimonial.content,
			image: editingTestimonial.image || undefined,
			rating: editingTestimonial.rating.toString(),
			isActive: editingTestimonial.isActive,
			order: editingTestimonial.order,
		};

		if (editingTestimonial.id) {
			updateMutation.mutate({ id: editingTestimonial.id, data });
		} else {
			createMutation.mutate({ ...data, subServiceId: subId! });
		}
	};

	const handleDelete = (testimonialId: string) => {
		if (!confirm('Are you sure you want to delete this testimonial?')) return;
		deleteMutation.mutate(testimonialId);
	};

	const handleReorder = (reorderedTestimonials: WebDevTestimonial[]) => {
		const orderUpdates = reorderedTestimonials.map((t, index) => ({
			id: t.id,
			order: index,
		}));
		orderMutation.mutate(orderUpdates);
	};

	const isLoading = subServiceLoading || testimonialsLoading;
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
						<h1 className='text-3xl font-bold tracking-tight'>Testimonials</h1>
						<p className='text-muted-foreground'>
							Manage testimonials for {subService?.title || 'this sub-service'}.
						</p>
					</div>
				</div>
				<Button onClick={() => setEditingTestimonial({ ...defaultTestimonial, order: testimonials?.length || 0 })}>
					<Plus className='mr-2 h-4 w-4' />
					Add Testimonial
				</Button>
			</div>

			{/* Edit/Create Form */}
			{editingTestimonial && (
				<Card>
					<CardHeader>
						<CardTitle>{editingTestimonial.id ? 'Edit Testimonial' : 'New Testimonial'}</CardTitle>
						<CardDescription>
							{editingTestimonial.id ? 'Update testimonial details.' : 'Create a new testimonial.'}
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-3 gap-4'>
							<div className='space-y-2'>
								<Label>Name *</Label>
								<Input
									value={editingTestimonial.name}
									onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
									placeholder='John Smith'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Role</Label>
								<Input
									value={editingTestimonial.role}
									onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
									placeholder='CEO'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Company</Label>
								<Input
									value={editingTestimonial.company}
									onChange={(e) =>
										setEditingTestimonial({ ...editingTestimonial, company: e.target.value })
									}
									placeholder='Acme Inc.'
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label>Testimonial Content *</Label>
							<textarea
								value={editingTestimonial.content}
								onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
								className='flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
								placeholder='What did they say about your service?'
							/>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<ImageUpload
								value={editingTestimonial.image}
								onChange={(value) => setEditingTestimonial({ ...editingTestimonial, image: value })}
								folder='paypercall/testimonials'
								label='Author Photo'
							/>
							<div className='space-y-2'>
								<Label>Rating (0-5)</Label>
								<div className='flex items-center gap-2'>
									{[1, 2, 3, 4, 5].map((star) => (
										<button
											key={star}
											type='button'
											onClick={() => setEditingTestimonial({ ...editingTestimonial, rating: star })}
											className={`p-1 ${star <= editingTestimonial.rating ? 'text-yellow-500' : 'text-muted-foreground'}`}>
											<Star className='h-6 w-6' fill={star <= editingTestimonial.rating ? 'currentColor' : 'none'} />
										</button>
									))}
									<span className='ml-2 text-sm text-muted-foreground'>{editingTestimonial.rating}/5</span>
								</div>
							</div>
						</div>
						<div className='flex items-center gap-4'>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={editingTestimonial.isActive}
									onChange={(e) =>
										setEditingTestimonial({ ...editingTestimonial, isActive: e.target.checked })
									}
									className='rounded border-input'
								/>
								<span className='text-sm'>Active</span>
							</label>
						</div>
						<div className='flex justify-end gap-2'>
							<Button variant='outline' onClick={() => setEditingTestimonial(null)}>
								Cancel
							</Button>
							<Button onClick={handleSave} disabled={isSaving || !editingTestimonial.name || !editingTestimonial.content}>
								{isSaving ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
								{editingTestimonial.id ? 'Update' : 'Create'}
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Testimonials List */}
			{testimonials && testimonials.length > 0 ? (
				<SortableList
					items={testimonials}
					onReorder={handleReorder}
					renderItem={(t) => (
						<Card className={!t.isActive ? 'opacity-60' : ''}>
							<CardContent className='p-4'>
								<div className='flex items-start gap-4'>
									{t.image ? (
										<img
											src={t.image.url}
											alt={t.name}
											className='w-12 h-12 object-cover rounded-full'
										/>
									) : (
										<div className='w-12 h-12 bg-muted rounded-full flex items-center justify-center text-lg font-medium'>
											{t.name.charAt(0)}
										</div>
									)}
									<div className='flex-1'>
										<div className='flex items-start justify-between'>
											<div>
												<h3 className='font-semibold'>{t.name}</h3>
												<p className='text-sm text-muted-foreground'>
													{[t.role, t.company].filter(Boolean).join(' at ') || 'No role/company'}
												</p>
												{t.rating && (
													<div className='flex items-center gap-0.5 mt-1'>
														{[1, 2, 3, 4, 5].map((star) => (
															<Star
																key={star}
																className={`h-3 w-3 ${star <= Number(t.rating) ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`}
															/>
														))}
													</div>
												)}
											</div>
											<div className='flex gap-2'>
												<Button
													variant='ghost'
													size='sm'
													onClick={() =>
														setEditingTestimonial({
															id: t.id,
															name: t.name,
															role: t.role || '',
															company: t.company || '',
															content: t.content,
															image: t.image || null,
															rating: Number(t.rating) || 5,
															isActive: t.isActive,
															order: t.order,
														})
													}>
													Edit
												</Button>
												<Button variant='ghost' size='sm' onClick={() => handleDelete(t.id)}>
													<Trash2 className='h-4 w-4 text-destructive' />
												</Button>
											</div>
										</div>
										<p className='text-sm mt-2 line-clamp-2'>{t.content}</p>
										{!t.isActive && (
											<span className='text-xs text-muted-foreground'>(Inactive)</span>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				/>
			) : (
				!editingTestimonial && (
					<Card>
						<CardContent className='py-12 text-center'>
							<p className='text-muted-foreground mb-4'>No testimonials yet.</p>
							<Button onClick={() => setEditingTestimonial({ ...defaultTestimonial, order: 0 })}>
								<Plus className='mr-2 h-4 w-4' />
								Add First Testimonial
							</Button>
						</CardContent>
					</Card>
				)
			)}
		</div>
	);
}

