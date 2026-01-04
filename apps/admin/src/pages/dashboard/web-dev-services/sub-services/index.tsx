import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router';
import { webDevServicesApi } from '@/services/web-dev-services.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, ArrowLeft, Loader2, Package, FileText, MessageSquare, HelpCircle } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { toast } from 'sonner';
import { useState } from 'react';

export default function SubServicesListPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const { data: service, isLoading: serviceLoading } = useQuery({
		queryKey: ['web-dev-service', id],
		queryFn: () => webDevServicesApi.getServiceById(id!),
		enabled: !!id,
	});

	const { data: subServices, isLoading: subServicesLoading } = useQuery({
		queryKey: ['web-dev-sub-services', service?.slug],
		queryFn: () => webDevServicesApi.getAllSubServices(service!.slug, true),
		enabled: !!service?.slug,
	});

	const deleteMutation = useMutation({
		mutationFn: (subServiceId: string) => webDevServicesApi.deleteSubService(subServiceId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-sub-services'] });
			toast.success('Sub-service deleted successfully');
			setDeletingId(null);
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to delete sub-service');
			setDeletingId(null);
		},
	});

	const handleDelete = async (subServiceId: string) => {
		if (!confirm('Are you sure you want to delete this sub-service? This will also delete all related packages, case studies, testimonials, and FAQs.')) {
			return;
		}
		setDeletingId(subServiceId);
		deleteMutation.mutate(subServiceId);
	};

	const isLoading = serviceLoading || subServicesLoading;

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
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<Button variant='ghost' size='sm' onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SERVICES)}>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back
					</Button>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>{service.title} - Sub-Services</h1>
						<p className='text-muted-foreground'>Manage sub-services for this category.</p>
					</div>
				</div>
				<Button
					onClick={() =>
						navigate(ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES_CREATE.replace(':id', id!))
					}>
					<Plus className='mr-2 h-4 w-4' />
					Create Sub-Service
				</Button>
			</div>

			{subServices && subServices.length > 0 ? (
				<div className='grid gap-4'>
					{subServices.map((subService) => (
						<Card key={subService.id}>
							<CardHeader className='pb-3'>
								<div className='flex items-start justify-between'>
									<div>
										<CardTitle className='text-lg'>{subService.title}</CardTitle>
										<CardDescription>/{service.slug}/{subService.slug}</CardDescription>
									</div>
									<div className='flex gap-2'>
										<Button
											variant='ghost'
											size='sm'
											onClick={() =>
												navigate(
													ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES_EDIT
														.replace(':id', id!)
														.replace(':subId', subService.id)
												)
											}>
											<Edit className='h-4 w-4' />
										</Button>
										<Button
											variant='ghost'
											size='sm'
											onClick={() => handleDelete(subService.id)}
											disabled={deletingId === subService.id}>
											<Trash2 className='h-4 w-4 text-destructive' />
										</Button>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className='space-y-3'>
									<p className='text-sm text-muted-foreground line-clamp-2'>
										{subService.description || 'No description'}
									</p>
									<div className='flex items-center gap-4 text-sm'>
										<span className={subService.isActive ? 'text-green-600' : 'text-gray-500'}>
											{subService.isActive ? 'Active' : 'Inactive'}
										</span>
										<span className='text-muted-foreground'>Order: {subService.order}</span>
									</div>
									<div className='flex flex-wrap gap-2 pt-2 border-t'>
										<Link
											to={`/dashboard/web-dev-services/${id}/sub-services/${subService.id}/packages`}
											className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md bg-muted/50 hover:bg-muted'>
											<Package className='h-3 w-3' />
											Packages ({subService.packages?.length || 0})
										</Link>
										<Link
											to={`/dashboard/web-dev-services/${id}/sub-services/${subService.id}/case-studies`}
											className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md bg-muted/50 hover:bg-muted'>
											<FileText className='h-3 w-3' />
											Case Studies ({subService.caseStudies?.length || 0})
										</Link>
										<Link
											to={`/dashboard/web-dev-services/${id}/sub-services/${subService.id}/testimonials`}
											className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md bg-muted/50 hover:bg-muted'>
											<MessageSquare className='h-3 w-3' />
											Testimonials ({subService.testimonials?.length || 0})
										</Link>
										<Link
											to={`/dashboard/web-dev-services/${id}/sub-services/${subService.id}/faqs`}
											className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md bg-muted/50 hover:bg-muted'>
											<HelpCircle className='h-3 w-3' />
											FAQs ({subService.faqs?.length || 0})
										</Link>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<Card>
					<CardContent className='flex flex-col items-center justify-center py-12'>
						<h3 className='mb-2 text-lg font-semibold'>No sub-services yet</h3>
						<p className='mb-4 text-sm text-muted-foreground'>
							Get started by creating your first sub-service for {service.title}.
						</p>
						<Button
							onClick={() =>
								navigate(ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES_CREATE.replace(':id', id!))
							}>
							<Plus className='mr-2 h-4 w-4' />
							Create Sub-Service
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

