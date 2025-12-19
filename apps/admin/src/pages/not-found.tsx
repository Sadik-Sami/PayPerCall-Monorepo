import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function NotFoundPage() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center space-y-4'>
			<h1 className='text-6xl font-bold'>404</h1>
			<p className='text-xl text-muted-foreground'>Page not found</p>
			<Button asChild>
				<Link to='/'>Go back home</Link>
			</Button>
		</div>
	);
}
