import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { webDevServicesApi } from '@/services/web-dev-services.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { toast } from 'sonner';
import { useState } from 'react';

export default function CreateWebDevServicePage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState({
		slug: '',
		title: '',
		description: '',
		metaTitle: '',
		metaDescription: '',
		heroTitle: '',
		heroSubtitle: '',
		isActive: true,
		order: 0,
	});

	const createMutation = useMutation({
		mutationFn: (data: any) => webDevServicesApi.createService(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-services'] });
			toast.success('Service created successfully');
			navigate(ROUTES.DASHBOARD_WEB_DEV_SERVICES);
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to create service');
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createMutation.mutate(formData);
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center gap-4'>
				<Button variant='ghost' size='sm' onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SERVICES)}>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Back
				</Button>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Create Web Development Service</h1>
					<p className='text-muted-foreground'>Add a new web development service category.</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Service Details</CardTitle>
					<CardDescription>Enter the basic information for the service.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className='space-y-4'>
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
						<div className='space-y-2'>
							<Label htmlFor='description'>Description</Label>
							<textarea
								id='description'
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
								placeholder='Service description...'
							/>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='order'>Order</Label>
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
						<div className='flex justify-end gap-2'>
							<Button type='button' variant='outline' onClick={() => navigate(ROUTES.DASHBOARD_WEB_DEV_SERVICES)}>
								Cancel
							</Button>
							<Button type='submit' disabled={createMutation.isPending}>
								{createMutation.isPending ? 'Creating...' : 'Create Service'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
