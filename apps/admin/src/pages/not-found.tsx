import { FileQuestion, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function NotFoundPage() {
	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-background p-6'>
			<div className='flex flex-col items-center gap-4 text-center'>
				<div className='rounded-full bg-muted p-4'>
					<FileQuestion className='h-12 w-12 text-muted-foreground' />
				</div>
				<div className='space-y-2'>
					<h1 className='text-6xl font-bold text-foreground'>404</h1>
					<p className='text-xl text-muted-foreground'>Page not found</p>
					<p className='max-w-md text-sm text-muted-foreground'>
						The page you're looking for doesn't exist or has been moved.
					</p>
				</div>
			</div>
			<Button asChild>
				<Link to='/' className='gap-2'>
					<Home className='h-4 w-4' />
					Back to Home
				</Link>
			</Button>
		</div>
	);
}
