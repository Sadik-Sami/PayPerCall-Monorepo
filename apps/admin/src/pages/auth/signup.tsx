import SignupForm from '@/components/auth/signup-form';
import { Link } from 'react-router';
import { ROUTES } from '@/utils/constants';
import { Shield } from 'lucide-react';

export default function SignupPage() {
	return (
		<div className='flex min-h-screen w-full'>
			{/* Left side - branding */}
			<div className='hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex'>
				<div className='flex items-center gap-3'>
					<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10'>
						<Shield className='h-6 w-6 text-primary-foreground' />
					</div>
					<span className='text-xl font-semibold text-primary-foreground'>Admin Panel</span>
				</div>
				<div className='space-y-4'>
					<h1 className='text-4xl font-bold leading-tight text-primary-foreground'>
						Start managing
						<br />
						your platform today.
					</h1>
					<p className='max-w-md text-primary-foreground/80'>
						Create your admin account to gain access to powerful tools for managing users, content, and system
						configurations.
					</p>
				</div>
				<p className='text-sm text-primary-foreground/60'>© 2024 Admin Panel. All rights reserved.</p>
			</div>

			{/* Right side - signup form */}
			<div className='flex w-full flex-col items-center justify-center bg-background p-8 lg:w-1/2'>
				<div className='mx-auto w-full max-w-sm space-y-6'>
					{/* Mobile logo */}
					<div className='flex items-center gap-3 lg:hidden'>
						<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary'>
							<Shield className='h-6 w-6 text-primary-foreground' />
						</div>
						<span className='text-xl font-semibold text-foreground'>Admin Panel</span>
					</div>

					<div className='space-y-2'>
						<h2 className='text-2xl font-bold tracking-tight text-foreground'>Create your account</h2>
						<p className='text-sm text-muted-foreground'>Fill in the details below to get started</p>
					</div>

					<SignupForm />

					<p className='text-center text-sm text-muted-foreground'>
						Already have an account?{' '}
						<Link to={ROUTES.LOGIN} className='font-medium text-primary hover:underline'>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
