import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { webDevServicesApi } from '@/services/web-dev-services.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Plus, Trash2, Star, X } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { toast } from 'sonner';
import { useState } from 'react';
import { SortableList } from '@/components/editors/sortable-list';
import type { WebDevPackage, CreateWebDevPackageInput, UpdateWebDevPackageInput } from '@/types/web-dev-services.types';

interface PackageFormData {
	id?: string;
	name: string;
	description: string;
	price: string;
	currency: string;
	features: string[];
	isPopular: boolean;
	isActive: boolean;
	order: number;
}

const defaultPackage: PackageFormData = {
	name: '',
	description: '',
	price: '0',
	currency: 'USD',
	features: [],
	isPopular: false,
	isActive: true,
	order: 0,
};

export default function PackagesPage() {
	const { id, subId } = useParams<{ id: string; subId: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [editingPackage, setEditingPackage] = useState<PackageFormData | null>(null);
	const [newFeature, setNewFeature] = useState('');

	const { data: subService, isLoading: subServiceLoading } = useQuery({
		queryKey: ['web-dev-sub-service', subId],
		queryFn: () => webDevServicesApi.getSubServiceById(subId!),
		enabled: !!subId,
	});

	const { data: packages, isLoading: packagesLoading } = useQuery({
		queryKey: ['web-dev-packages', subId],
		queryFn: () => webDevServicesApi.getAllPackages(subId, true),
		enabled: !!subId,
	});

	const createMutation = useMutation({
		mutationFn: (data: CreateWebDevPackageInput) => webDevServicesApi.createPackage(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-packages', subId] });
			toast.success('Package created successfully');
			setEditingPackage(null);
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to create package');
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateWebDevPackageInput }) =>
			webDevServicesApi.updatePackage(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-packages', subId] });
			toast.success('Package updated successfully');
			setEditingPackage(null);
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to update package');
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (packageId: string) => webDevServicesApi.deletePackage(packageId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-packages', subId] });
			toast.success('Package deleted successfully');
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to delete package');
		},
	});

	const orderMutation = useMutation({
		mutationFn: (items: Array<{ id: string; order: number }>) => webDevServicesApi.updatePackagesOrder(items),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-packages', subId] });
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to update order');
		},
	});

	const handleSave = () => {
		if (!editingPackage) return;

		const data = {
			name: editingPackage.name,
			description: editingPackage.description || undefined,
			price: editingPackage.price,
			currency: editingPackage.currency,
			features: editingPackage.features,
			isPopular: editingPackage.isPopular,
			isActive: editingPackage.isActive,
			order: editingPackage.order,
		};

		if (editingPackage.id) {
			updateMutation.mutate({ id: editingPackage.id, data });
		} else {
			createMutation.mutate({ ...data, subServiceId: subId! });
		}
	};

	const handleDelete = (packageId: string) => {
		if (!confirm('Are you sure you want to delete this package?')) return;
		deleteMutation.mutate(packageId);
	};

	const handleReorder = (reorderedPackages: WebDevPackage[]) => {
		const orderUpdates = reorderedPackages.map((pkg, index) => ({
			id: pkg.id,
			order: index,
		}));
		orderMutation.mutate(orderUpdates);
	};

	const addFeature = () => {
		if (!newFeature.trim() || !editingPackage) return;
		setEditingPackage({
			...editingPackage,
			features: [...editingPackage.features, newFeature.trim()],
		});
		setNewFeature('');
	};

	const removeFeature = (index: number) => {
		if (!editingPackage) return;
		setEditingPackage({
			...editingPackage,
			features: editingPackage.features.filter((_, i) => i !== index),
		});
	};

	const isLoading = subServiceLoading || packagesLoading;
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
						<h1 className='text-3xl font-bold tracking-tight'>Packages</h1>
						<p className='text-muted-foreground'>
							Manage pricing packages for {subService?.title || 'this sub-service'}.
						</p>
					</div>
				</div>
				<Button onClick={() => setEditingPackage({ ...defaultPackage, order: packages?.length || 0 })}>
					<Plus className='mr-2 h-4 w-4' />
					Add Package
				</Button>
			</div>

			{/* Edit/Create Form */}
			{editingPackage && (
				<Card>
					<CardHeader>
						<CardTitle>{editingPackage.id ? 'Edit Package' : 'New Package'}</CardTitle>
						<CardDescription>
							{editingPackage.id ? 'Update package details.' : 'Create a new pricing package.'}
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label>Name *</Label>
								<Input
									value={editingPackage.name}
									onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
									placeholder='Basic, Professional, Enterprise...'
								/>
							</div>
							<div className='space-y-2'>
								<Label>Price *</Label>
								<div className='flex gap-2'>
									<Input
										type='number'
										value={editingPackage.price}
										onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
										placeholder='999'
									/>
									<select
										value={editingPackage.currency}
										onChange={(e) => setEditingPackage({ ...editingPackage, currency: e.target.value })}
										className='flex h-9 w-24 rounded-md border border-input bg-transparent px-3 py-1 text-sm'>
										<option value='USD'>USD</option>
										<option value='EUR'>EUR</option>
										<option value='GBP'>GBP</option>
									</select>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<Label>Description</Label>
							<textarea
								value={editingPackage.description}
								onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
								className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
								placeholder='Package description...'
							/>
						</div>
						<div className='space-y-2'>
							<Label>Features</Label>
							<div className='flex gap-2'>
								<Input
									value={newFeature}
									onChange={(e) => setNewFeature(e.target.value)}
									placeholder='Add a feature...'
									onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
								/>
								<Button type='button' variant='outline' onClick={addFeature}>
									Add
								</Button>
							</div>
							{editingPackage.features.length > 0 && (
								<div className='flex flex-wrap gap-2 mt-2'>
									{editingPackage.features.map((feature, index) => (
										<span
											key={index}
											className='inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm'>
											{feature}
											<button
												type='button'
												onClick={() => removeFeature(index)}
												className='text-muted-foreground hover:text-foreground'>
												<X className='h-3 w-3' />
											</button>
										</span>
									))}
								</div>
							)}
						</div>
						<div className='flex items-center gap-4'>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={editingPackage.isPopular}
									onChange={(e) =>
										setEditingPackage({ ...editingPackage, isPopular: e.target.checked })
									}
									className='rounded border-input'
								/>
								<span className='text-sm'>Mark as Popular</span>
							</label>
							<label className='flex items-center gap-2'>
								<input
									type='checkbox'
									checked={editingPackage.isActive}
									onChange={(e) => setEditingPackage({ ...editingPackage, isActive: e.target.checked })}
									className='rounded border-input'
								/>
								<span className='text-sm'>Active</span>
							</label>
						</div>
						<div className='flex justify-end gap-2'>
							<Button variant='outline' onClick={() => setEditingPackage(null)}>
								Cancel
							</Button>
							<Button onClick={handleSave} disabled={isSaving || !editingPackage.name}>
								{isSaving ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
								{editingPackage.id ? 'Update' : 'Create'}
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Packages List */}
			{packages && packages.length > 0 ? (
				<SortableList
					items={packages}
					onReorder={handleReorder}
					renderItem={(pkg) => (
						<Card className={!pkg.isActive ? 'opacity-60' : ''}>
							<CardContent className='p-4'>
								<div className='flex items-start justify-between'>
									<div className='space-y-1'>
										<div className='flex items-center gap-2'>
											<h3 className='font-semibold'>{pkg.name}</h3>
											{pkg.isPopular && (
												<span className='inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs'>
													<Star className='h-3 w-3' />
													Popular
												</span>
											)}
											{!pkg.isActive && (
												<span className='text-xs text-muted-foreground'>(Inactive)</span>
											)}
										</div>
										<p className='text-2xl font-bold'>
											{pkg.currency} {pkg.price}
										</p>
										{pkg.description && (
											<p className='text-sm text-muted-foreground'>{pkg.description}</p>
										)}
										{pkg.features && pkg.features.length > 0 && (
											<ul className='text-sm text-muted-foreground mt-2 space-y-1'>
												{pkg.features.slice(0, 3).map((feature, i) => (
													<li key={i}>• {feature}</li>
												))}
												{pkg.features.length > 3 && (
													<li className='text-xs'>+ {pkg.features.length - 3} more</li>
												)}
											</ul>
										)}
									</div>
									<div className='flex gap-2'>
										<Button
											variant='ghost'
											size='sm'
											onClick={() =>
												setEditingPackage({
													id: pkg.id,
													name: pkg.name,
													description: pkg.description || '',
													price: pkg.price,
													currency: pkg.currency,
													features: pkg.features || [],
													isPopular: pkg.isPopular,
													isActive: pkg.isActive,
													order: pkg.order,
												})
											}>
											Edit
										</Button>
										<Button variant='ghost' size='sm' onClick={() => handleDelete(pkg.id)}>
											<Trash2 className='h-4 w-4 text-destructive' />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				/>
			) : (
				!editingPackage && (
					<Card>
						<CardContent className='py-12 text-center'>
							<p className='text-muted-foreground mb-4'>No packages yet.</p>
							<Button onClick={() => setEditingPackage({ ...defaultPackage, order: 0 })}>
								<Plus className='mr-2 h-4 w-4' />
								Add First Package
							</Button>
						</CardContent>
					</Card>
				)
			)}
		</div>
	);
}

