import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { userApi } from '@/services/user.api';
import {
	updateProfileSchema,
	changePasswordSchema,
	type UpdateProfileFormData,
	type ChangePasswordFormData,
} from '@/schemas/user.schema';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
	Loader2,
	User,
	Mail,
	Phone,
	MapPin,
	Building,
	Map,
	Hash,
	Lock,
	CheckCircle,
	XCircle,
	Calendar,
	Shield,
} from 'lucide-react';
import { ModeToggle } from '@/components/common/mode-toggle';

export default function ProfilePage() {
	const { user, refreshUser, logout } = useAuth();
	const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

	const profileForm = useForm<UpdateProfileFormData>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			name: user?.name || '',
			email: user?.email || '',
			phone: user?.phone || '',
			address_street: user?.address_street || '',
			address_city: user?.address_city || '',
			address_state: user?.address_state || '',
			address_postal_code: user?.address_postal_code || '',
		},
	});

	const passwordForm = useForm<ChangePasswordFormData>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	const updateProfileMutation = useMutation({
		mutationFn: userApi.updateProfile,
		onSuccess: async () => {
			toast.success('Profile updated successfully');
			await refreshUser();
		},
		onError: (error: Error) => {
			toast.error(error.message || 'Failed to update profile');
		},
	});

	const changePasswordMutation = useMutation({
		mutationFn: userApi.changePassword,
		onSuccess: async () => {
			toast.success('Password changed successfully. Please login again.');
			passwordForm.reset();
			await logout();
		},
		onError: (error: Error) => {
			toast.error(error.message || 'Failed to change password');
		},
	});

	const onProfileSubmit = (data: UpdateProfileFormData) => {
		updateProfileMutation.mutate({
			name: data.name,
			email: data.email,
			phone: data.phone || null,
			address_street: data.address_street || null,
			address_city: data.address_city || null,
			address_state: data.address_state || null,
			address_postal_code: data.address_postal_code || null,
		});
	};

	const onPasswordSubmit = (data: ChangePasswordFormData) => {
		changePasswordMutation.mutate({
			currentPassword: data.currentPassword,
			newPassword: data.newPassword,
		});
	};

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<div className='space-y-8'>
			{/* Header */}
			<div className='flex items-start justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Profile</h1>
					<p className='text-muted-foreground'>Manage your account settings and preferences</p>
				</div>
				<ModeToggle />
			</div>

			<div className='grid gap-8 lg:grid-cols-3'>
				{/* Profile Overview Card */}
				<Card className='lg:col-span-1'>
					<CardHeader className='text-center'>
						<div className='mx-auto mb-4'>
							<Avatar className='h-24 w-24'>
								<AvatarImage src={user?.image?.url} alt={user?.name} />
								<AvatarFallback className='bg-primary text-primary-foreground text-2xl'>
									{user?.name ? getInitials(user.name) : 'AD'}
								</AvatarFallback>
							</Avatar>
						</div>
						<CardTitle>{user?.name}</CardTitle>
						<CardDescription>{user?.email}</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex items-center justify-center gap-2'>
							<Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
								<Shield className='mr-1 h-3 w-3' />
								{user?.role}
							</Badge>
							<Badge variant={user?.isVerified ? 'default' : 'outline'}>
								{user?.isVerified ?
									<>
										<CheckCircle className='mr-1 h-3 w-3' />
										Verified
									</>
								:	<>
										<XCircle className='mr-1 h-3 w-3' />
										Unverified
									</>
								}
							</Badge>
						</div>

						<Separator />

						<div className='space-y-3 text-sm'>
							{user?.phone && (
								<div className='flex items-center gap-2 text-muted-foreground'>
									<Phone className='h-4 w-4' />
									<span>{user.phone}</span>
								</div>
							)}
							{user?.address_city && user?.address_state && (
								<div className='flex items-center gap-2 text-muted-foreground'>
									<MapPin className='h-4 w-4' />
									<span>
										{user.address_city}, {user.address_state}
									</span>
								</div>
							)}
							{user?.created_at && (
								<div className='flex items-center gap-2 text-muted-foreground'>
									<Calendar className='h-4 w-4' />
									<span>Joined {formatDate(user.created_at)}</span>
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Settings Card */}
				<Card className='lg:col-span-2'>
					<CardHeader>
						<div className='flex gap-4 border-b'>
							<button
								className={`pb-2 text-sm font-medium transition-colors ${
									activeTab === 'profile' ?
										'border-b-2 border-primary text-foreground'
									:	'text-muted-foreground hover:text-foreground'
								}`}
								onClick={() => setActiveTab('profile')}>
								Edit Profile
							</button>
							<button
								className={`pb-2 text-sm font-medium transition-colors ${
									activeTab === 'password' ?
										'border-b-2 border-primary text-foreground'
									:	'text-muted-foreground hover:text-foreground'
								}`}
								onClick={() => setActiveTab('password')}>
								Change Password
							</button>
						</div>
					</CardHeader>
					<CardContent>
						{activeTab === 'profile' ?
							<Form {...profileForm}>
								<form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className='space-y-6'>
									<div className='grid gap-4 md:grid-cols-2'>
										<FormField
											control={profileForm.control}
											name='name'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Full Name</FormLabel>
													<FormControl>
														<div className='relative'>
															<User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
															<Input className='pl-10' {...field} />
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={profileForm.control}
											name='email'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<div className='relative'>
															<Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
															<Input type='email' className='pl-10' {...field} />
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={profileForm.control}
											name='phone'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Phone</FormLabel>
													<FormControl>
														<div className='relative'>
															<Phone className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
															<Input className='pl-10' {...field} value={field.value || ''} />
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={profileForm.control}
											name='address_street'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Street Address</FormLabel>
													<FormControl>
														<div className='relative'>
															<MapPin className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
															<Input className='pl-10' {...field} value={field.value || ''} />
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={profileForm.control}
											name='address_city'
											render={({ field }) => (
												<FormItem>
													<FormLabel>City</FormLabel>
													<FormControl>
														<div className='relative'>
															<Building className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
															<Input className='pl-10' {...field} value={field.value || ''} />
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={profileForm.control}
											name='address_state'
											render={({ field }) => (
												<FormItem>
													<FormLabel>State</FormLabel>
													<FormControl>
														<div className='relative'>
															<Map className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
															<Input className='pl-10' {...field} value={field.value || ''} />
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={profileForm.control}
											name='address_postal_code'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Postal Code</FormLabel>
													<FormControl>
														<div className='relative'>
															<Hash className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
															<Input className='pl-10' {...field} value={field.value || ''} />
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<Button type='submit' disabled={updateProfileMutation.isPending}>
										{updateProfileMutation.isPending ?
											<>
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
												Saving...
											</>
										:	'Save Changes'}
									</Button>
								</form>
							</Form>
						:	<Form {...passwordForm}>
								<form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className='space-y-6'>
									<FormField
										control={passwordForm.control}
										name='currentPassword'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Current Password</FormLabel>
												<FormControl>
													<div className='relative'>
														<Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
														<Input type='password' className='pl-10' {...field} />
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={passwordForm.control}
										name='newPassword'
										render={({ field }) => (
											<FormItem>
												<FormLabel>New Password</FormLabel>
												<FormControl>
													<div className='relative'>
														<Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
														<Input type='password' className='pl-10' {...field} />
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={passwordForm.control}
										name='confirmPassword'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Confirm New Password</FormLabel>
												<FormControl>
													<div className='relative'>
														<Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
														<Input type='password' className='pl-10' {...field} />
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className='rounded-lg bg-muted p-4 text-sm text-muted-foreground'>
										<p className='font-medium text-foreground'>Password Requirements:</p>
										<ul className='mt-2 list-inside list-disc space-y-1'>
											<li>At least 8 characters long</li>
											<li>One uppercase letter</li>
											<li>One lowercase letter</li>
											<li>One number</li>
											<li>One special character</li>
										</ul>
									</div>

									<Button type='submit' variant='destructive' disabled={changePasswordMutation.isPending}>
										{changePasswordMutation.isPending ?
											<>
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
												Changing...
											</>
										:	'Change Password'}
									</Button>
								</form>
							</Form>
						}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
