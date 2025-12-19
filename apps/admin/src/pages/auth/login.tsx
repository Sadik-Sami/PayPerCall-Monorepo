import LoginForm from '@/components/auth/login-form';

export default function LoginPage() {
	return (
		<div className='w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-sm'>
			<div className='space-y-2 text-center'>
				<h1 className='text-3xl font-bold'>Admin Panel</h1>
				<p className='text-muted-foreground'>Sign in to your account</p>
			</div>

			<LoginForm />
		</div>
	);
}
