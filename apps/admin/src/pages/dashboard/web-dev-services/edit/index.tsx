import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { webDevServicesApi } from '@/services/web-dev-services.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { ImageUpload } from '@/components/editors/image-upload';
import { FeaturesEditor } from '@/components/editors/features-editor';
import { ProcessStepsEditor } from '@/components/editors/process-steps-editor';
import type { Feature, ProcessStep, ImageData, UpdateWebDevServiceInput } from '@/types/web-dev-services.types';

export default function EditWebDevServicePage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [formData, setFormData] = useState<{
		slug: string;
		title: string;
		description: string;
		metaTitle: string;
		metaDescription: string;
		heroTitle: string;
		heroSubtitle: string;
		heroImage: ImageData | null;
		features: Feature[];
		processSteps: ProcessStep[];
		isActive: boolean;
		order: number;
	}>({
		slug: '',
		title: '',
		description: '',
		metaTitle: '',
		metaDescription: '',
		heroTitle: '',
		heroSubtitle: '',
		heroImage: null,
		features: [],
		processSteps: [],
		isActive: true,
		order: 0,
	});

	const { data: service, isLoading } = useQuery({
		queryKey: ['web-dev-service', id],
		queryFn: () => webDevServicesApi.getServiceById(id!),
		enabled: !!id,
	});

	useEffect(() => {
		if (service) {
			setFormData({
				slug: service.slug,
				title: service.title,
				description: service.description || '',
				metaTitle: service.metaTitle || '',
				metaDescription: service.metaDescription || '',
				heroTitle: service.heroTitle || '',
				heroSubtitle: service.heroSubtitle || '',
				heroImage: service.heroImage || null,
				features: service.features || [],
				processSteps: service.processSteps || [],
				isActive: service.isActive,
				order: service.order,
			});
		}
	}, [service]);

	const updateMutation = useMutation({
		mutationFn: (data: UpdateWebDevServiceInput) => webDevServicesApi.updateService(id!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-services'] });
			queryClient.invalidateQueries({ queryKey: ['web-dev-service', id] });
			toast.success('Service updated successfully');
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to update service');
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateMutation.mutate({
			...formData,
			description: formData.description || undefined,
			metaTitle: formData.metaTitle || undefined,
			metaDescription: formData.metaDescription || undefined,
			heroTitle: formData.heroTitle || undefined,
			heroSubtitle: formData.heroSubtitle || undefined,
			heroImage: formData.heroImage || undefined,
			features: formData.features.length > 0 ? formData.features : undefined,
			processSteps: formData.processSteps.length > 0 ? formData.processSteps : undefined,
		});
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
			</div>
		);
	}

	if (!service) {
		return (
			<div className='space-y-6'>
				<div className='flex items-center gap-4'>
					<Button variant='ghost' size='sm' onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SERVICES)}>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back
					</Button>
				</div>
				<Card>
					<CardContent className='py-12 text-center'>
						<p className='text-muted-foreground'>Service not found</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center gap-4'>
				<Button variant='ghost' size='sm' onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SERVICES)}>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Back
				</Button>
				<div className='flex-1'>
					<h1 className='text-3xl font-bold tracking-tight'>Edit Service</h1>
					<p className='text-muted-foreground'>Update the web development service details.</p>
				</div>
				<Button
					variant='outline'
					onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES.replace(':id', id!))}>
					Manage Sub-Services
				</Button>
			</div>

			<form onSubmit={handleSubmit} className='space-y-6'>
				{/* Basic Information */}
				<Card>
					<CardHeader>
						<CardTitle>Basic Information</CardTitle>
						<CardDescription>Core service details and identification.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='slug'>Slug *</Label>
								<Input
									id='slug'
									value={formData.slug}
									onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
									placeholder='web-dev'
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='title'>Title *</Label>
								<Input
									id='title'
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
									placeholder='Web Development'
									required
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='description'>Description</Label>
							<textarea
								id='description'
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								className='flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
								placeholder='Service description...'
							/>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='order'>Display Order</Label>
								<Input
									id='order'
									type='number'
									value={formData.order}
									onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='isActive'>Status</Label>
								<select
									id='isActive'
									value={formData.isActive ? 'true' : 'false'}
									onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
									className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'>
									<option value='true'>Active</option>
									<option value='false'>Inactive</option>
								</select>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* SEO Settings */}
				<Card>
					<CardHeader>
						<CardTitle>SEO Settings</CardTitle>
						<CardDescription>Search engine optimization metadata.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='metaTitle'>Meta Title</Label>
							<Input
								id='metaTitle'
								value={formData.metaTitle}
								onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
								placeholder='SEO title for search results'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='metaDescription'>Meta Description</Label>
							<textarea
								id='metaDescription'
								value={formData.metaDescription}
								onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
								className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
								placeholder='SEO description for search results'
							/>
						</div>
					</CardContent>
				</Card>

				{/* Hero Section */}
				<Card>
					<CardHeader>
						<CardTitle>Hero Section</CardTitle>
						<CardDescription>Main banner content for the service page.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='heroTitle'>Hero Title</Label>
								<Input
									id='heroTitle'
									value={formData.heroTitle}
									onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
									placeholder='Main headline'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='heroSubtitle'>Hero Subtitle</Label>
								<Input
									id='heroSubtitle'
									value={formData.heroSubtitle}
									onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
									placeholder='Supporting text'
								/>
							</div>
						</div>
						<ImageUpload
							value={formData.heroImage}
							onChange={(value) => setFormData({ ...formData, heroImage: value })}
							folder='paypercall/services'
							label='Hero Image'
						/>
					</CardContent>
				</Card>

				{/* Features */}
				<Card>
					<CardHeader>
						<CardTitle>Features</CardTitle>
						<CardDescription>Key features and benefits of this service.</CardDescription>
					</CardHeader>
					<CardContent>
						<FeaturesEditor
							value={formData.features}
							onChange={(value) => setFormData({ ...formData, features: value })}
						/>
					</CardContent>
				</Card>

				{/* Process Steps */}
				<Card>
					<CardHeader>
						<CardTitle>Process Steps</CardTitle>
						<CardDescription>The steps involved in delivering this service.</CardDescription>
					</CardHeader>
					<CardContent>
						<ProcessStepsEditor
							value={formData.processSteps}
							onChange={(value) => setFormData({ ...formData, processSteps: value })}
						/>
					</CardContent>
				</Card>

				{/* Submit */}
				<div className='flex justify-end gap-2'>
					<Button type='button' variant='outline' onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SERVICES)}>
						Cancel
					</Button>
					<Button type='submit' disabled={updateMutation.isPending}>
						{updateMutation.isPending ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Saving...
							</>
						) : (
							'Save Changes'
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}

