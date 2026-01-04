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
import { useState } from 'react';
import { ImageUpload } from '@/components/editors/image-upload';
import { FeaturesEditor } from '@/components/editors/features-editor';
import { ProcessStepsEditor } from '@/components/editors/process-steps-editor';
import { RichTextEditor } from '@/components/editors/rich-text-editor';
import type { Feature, ProcessStep, ImageData, HeroContent } from '@/types/web-dev-services.types';

export default function CreateSubServicePage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data: service, isLoading: serviceLoading } = useQuery({
		queryKey: ['web-dev-service', id],
		queryFn: () => webDevServicesApi.getServiceById(id!),
		enabled: !!id,
	});

	const [formData, setFormData] = useState<{
		slug: string;
		title: string;
		description: string;
		metaTitle: string;
		metaDescription: string;
		ogImage: ImageData | null;
		heroContent: HeroContent | null;
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
		ogImage: null,
		heroContent: null,
		features: [],
		processSteps: [],
		isActive: true,
		order: 0,
	});

	const createMutation = useMutation({
		mutationFn: (data: any) => webDevServicesApi.createSubService(service!.slug, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-sub-services'] });
			toast.success('Sub-service created successfully');
			navigate(ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES.replace(':id', id!));
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to create sub-service');
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createMutation.mutate({
			slug: formData.slug,
			title: formData.title,
			description: formData.description || undefined,
			metaTitle: formData.metaTitle || undefined,
			metaDescription: formData.metaDescription || undefined,
			ogImage: formData.ogImage || undefined,
			heroContent: formData.heroContent || undefined,
			features: formData.features.length > 0 ? formData.features : undefined,
			processSteps: formData.processSteps.length > 0 ? formData.processSteps : undefined,
			isActive: formData.isActive,
			order: formData.order,
		});
	};

	const updateHeroContent = (field: keyof HeroContent, value: any) => {
		setFormData((prev) => ({
			...prev,
			heroContent: {
				title: prev.heroContent?.title || '',
				subtitle: prev.heroContent?.subtitle || '',
				...prev.heroContent,
				[field]: value,
			},
		}));
	};

	if (serviceLoading) {
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
				<Button
					variant='ghost'
					size='sm'
					onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES.replace(':id', id!))}>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Back
				</Button>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Create Sub-Service</h1>
					<p className='text-muted-foreground'>Add a new sub-service to {service.title}.</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className='space-y-6'>
				{/* Basic Information */}
				<Card>
					<CardHeader>
						<CardTitle>Basic Information</CardTitle>
						<CardDescription>Core sub-service details.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='slug'>Slug *</Label>
								<Input
									id='slug'
									value={formData.slug}
									onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
									placeholder='full-stack'
									required
								/>
								<p className='text-xs text-muted-foreground'>
									URL: /{service.slug}/{formData.slug || '[slug]'}
								</p>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='title'>Title *</Label>
								<Input
									id='title'
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
									placeholder='Full Stack Development'
									required
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='description'>Description</Label>
							<RichTextEditor
								content={formData.description}
								onChange={(value) => setFormData({ ...formData, description: value })}
								placeholder='Describe this sub-service...'
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
									className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'>
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
								className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
								placeholder='SEO description for search results'
							/>
						</div>
						<ImageUpload
							value={formData.ogImage}
							onChange={(value) => setFormData({ ...formData, ogImage: value })}
							folder='paypercall/sub-services/og'
							label='Open Graph Image'
						/>
					</CardContent>
				</Card>

				{/* Hero Section */}
				<Card>
					<CardHeader>
						<CardTitle>Hero Section</CardTitle>
						<CardDescription>Main banner content for the sub-service page.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label>Hero Title</Label>
								<Input
									value={formData.heroContent?.title || ''}
									onChange={(e) => updateHeroContent('title', e.target.value)}
									placeholder='Main headline'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Hero Subtitle</Label>
								<Input
									value={formData.heroContent?.subtitle || ''}
									onChange={(e) => updateHeroContent('subtitle', e.target.value)}
									placeholder='Supporting text'
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label>Hero Description</Label>
							<textarea
								value={formData.heroContent?.description || ''}
								onChange={(e) => updateHeroContent('description', e.target.value)}
								className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
								placeholder='Extended hero description'
							/>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label>CTA Button Text</Label>
								<Input
									value={formData.heroContent?.ctaText || ''}
									onChange={(e) => updateHeroContent('ctaText', e.target.value)}
									placeholder='Get Started'
								/>
							</div>
							<div className='space-y-2'>
								<Label>CTA Button Link</Label>
								<Input
									value={formData.heroContent?.ctaLink || ''}
									onChange={(e) => updateHeroContent('ctaLink', e.target.value)}
									placeholder='/contact'
								/>
							</div>
						</div>
						<ImageUpload
							value={formData.heroContent?.image || null}
							onChange={(value) => updateHeroContent('image', value)}
							folder='paypercall/sub-services/hero'
							label='Hero Image'
						/>
					</CardContent>
				</Card>

				{/* Features */}
				<Card>
					<CardHeader>
						<CardTitle>Features</CardTitle>
						<CardDescription>Key features and benefits.</CardDescription>
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
						<CardDescription>The steps involved in this sub-service.</CardDescription>
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
					<Button
						type='button'
						variant='outline'
						onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES.replace(':id', id!))}>
						Cancel
					</Button>
					<Button type='submit' disabled={createMutation.isPending}>
						{createMutation.isPending ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Creating...
							</>
						) : (
							'Create Sub-Service'
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}

