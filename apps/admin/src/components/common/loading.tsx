import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
	fullScreen?: boolean;
	message?: string;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

const sizeClasses = {
	sm: 'h-4 w-4',
	md: 'h-8 w-8',
	lg: 'h-12 w-12',
};

export default function Loading({ fullScreen = false, message, size = 'md', className }: LoadingProps) {
	const spinner = (
		<div className={cn('flex flex-col items-center justify-center gap-3', className)}>
			<Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
			{message && <p className='text-sm text-muted-foreground'>{message}</p>}
		</div>
	);

	if (fullScreen) {
		return <div className='flex h-screen w-full items-center justify-center bg-background'>{spinner}</div>;
	}

	return spinner;
}
