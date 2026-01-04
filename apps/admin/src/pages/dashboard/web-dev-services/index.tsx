import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { webDevServicesApi } from '@/services/web-dev-services.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Code } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { toast } from 'sonner';
import { useState } from 'react';

export default function WebDevServicesPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const { data: services, isLoading } = useQuery({
		queryKey: ['web-dev-services'],
		queryFn: () => webDevServicesApi.getAllServices(true),
	});

	const deleteMutation = useMutation({
		mutationFn: (id: string) => webDevServicesApi.deleteService(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-services'] });
			toast.success('Service deleted successfully');
			setDeletingId(null);
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to delete service');
			setDeletingId(null);
		},
	});

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this service? This will also delete all sub-services.')) {
			return;
		}
		setDeletingId(id);
		deleteMutation.mutate(id);
	};

	if (isLoading) {
		return (
			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Web Development Services</h1>
					<p className='text-muted-foreground'>Manage web development services and sub-services.</p>
				</div>
				<div className='rounded-lg border bg-card p-8 text-center'>
					<p className='text-muted-foreground'>Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Web Development Services</h1>
					<p className='text-muted-foreground'>Manage web development services and sub-services.</p>
				</div>
				<Button onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SERVICES_CREATE)}>
					<Plus className='mr-2 h-4 w-4' />
					Create Service
				</Button>
			</div>

			{services && services.length > 0 ? (
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{services.map((service) => (
						<Card key={service.id}>
							<CardHeader>
								<div className='flex items-start justify-between'>
									<div className='flex items-center gap-2'>
										<Code className='h-5 w-5 text-muted-foreground' />
										<CardTitle className='text-lg'>{service.title}</CardTitle>
									</div>
									<div className='flex gap-2'>
										<Button
											variant='ghost'
											size='sm'
											onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SERVICES_EDIT.replace(':id', service.id))}>
											<Edit className='h-4 w-4' />
										</Button>
										<Button
											variant='ghost'
											size='sm'
											onClick={() => handleDelete(service.id)}
											disabled={deletingId === service.id}>
											<Trash2 className='h-4 w-4 text-destructive' />
										</Button>
									</div>
								</div>
								<CardDescription>Slug: {service.slug}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-2'>
									<p className='text-sm text-muted-foreground line-clamp-2'>{service.description || 'No description'}</p>
									<div className='flex items-center justify-between text-sm'>
										<span className={service.isActive ? 'text-green-600' : 'text-gray-500'}>
											{service.isActive ? 'Active' : 'Inactive'}
										</span>
										<Link
											to={ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES.replace(':id', service.id)}
											className='text-primary hover:underline'>
											Manage Sub-Services →
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
						<Code className='mb-4 h-12 w-12 text-muted-foreground' />
						<h3 className='mb-2 text-lg font-semibold'>No services yet</h3>
						<p className='mb-4 text-sm text-muted-foreground'>Get started by creating your first web development service.</p>
						<Button onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SERVICES_CREATE)}>
							<Plus className='mr-2 h-4 w-4' />
							Create Service
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

