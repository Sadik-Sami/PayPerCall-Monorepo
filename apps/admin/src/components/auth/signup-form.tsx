import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormData } from '@/schemas/auth.schema';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Mail, Lock, User, Phone } from 'lucide-react';

export default function SignupForm() {
	const { signup, isLoading } = useAuth();

	const form = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			phone: '',
		},
	});

	const onSubmit = async (data: SignupFormData) => {
		await signup({
			name: data.name,
			email: data.email,
			password: data.password,
			phone: data.phone,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<div className='relative'>
									<User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
									<Input type='text' placeholder='John Doe' className='pl-10' {...field} disabled={isLoading} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<div className='relative'>
									<Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
									<Input
										type='email'
										placeholder='john@example.com'
										className='pl-10'
										{...field}
										disabled={isLoading}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone (Optional)</FormLabel>
							<FormControl>
								<div className='relative'>
									<Phone className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
									<Input type='tel' placeholder='+1 234 567 890' className='pl-10' {...field} disabled={isLoading} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className='relative'>
									<Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
									<Input type='password' placeholder='••••••••' className='pl-10' {...field} disabled={isLoading} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full' disabled={isLoading}>
					{isLoading ?
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Creating account...
						</>
					:	'Create account'}
				</Button>
			</form>
		</Form>
	);
}
