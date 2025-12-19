import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
	const { user, logout } = useAuth();

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold'>Dashboard</h1>
					<p className='text-muted-foreground'>Welcome back, {user?.name}!</p>
				</div>
				<Button variant='outline' onClick={logout}>
					Logout
				</Button>
			</div>

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<div className='rounded-lg border bg-card p-6'>
					<h3 className='text-sm font-medium text-muted-foreground'>User Details</h3>
					<div className='mt-2 space-y-1 text-sm'>
						<p>
							<span className='font-medium'>Name:</span> {user?.name}
						</p>
						<p>
							<span className='font-medium'>Email:</span> {user?.email}
						</p>
						<p>
							<span className='font-medium'>Contact:</span> {user?.phone}
						</p>
						<p>
							<span className='font-medium'>Address:</span>{' '}
							{user?.address_street && user?.address_city && user?.address_state && user?.address_postal_code ?
								`${user.address_street}, ${user.address_city}, ${user.address_state}, ${user.address_postal_code}`
							:	'N/A'}
						</p>
						<p>
							<span className='font-medium'>Verified:</span> {user?.isVerified ? 'Yes' : 'No'}
						</p>
						<p>
							<span className='font-medium'>Role:</span> <span className='capitalize'>{user?.role}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
