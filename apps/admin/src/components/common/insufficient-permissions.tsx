import { ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/utils/constants';

interface InsufficientPermissionsProps {
	message?: string;
	showBackButton?: boolean;
}

export default function InsufficientPermissions({
	message = "You don't have permission to access this page",
	showBackButton = true,
}: InsufficientPermissionsProps) {
	const navigate = useNavigate();

	return (
		<div className='flex h-screen w-full flex-col items-center justify-center gap-6 bg-background p-6'>
			<div className='flex flex-col items-center gap-4 text-center'>
				<div className='rounded-full bg-destructive/10 p-4'>
					<ShieldX className='h-8 w-8 text-destructive' />
				</div>
				<div className='space-y-2'>
					<h1 className='text-2xl font-semibold tracking-tight'>Insufficient Permissions</h1>
					<p className='max-w-md text-sm text-muted-foreground'>{message}</p>
					<p className='text-xs text-muted-foreground'>Contact an administrator if you believe this is an error.</p>
				</div>
			</div>
			{showBackButton && (
				<Button onClick={() => navigate(ROUTES.DASHBOARD)} variant='outline'>
					Go to Dashboard
				</Button>
			)}
		</div>
	);
}
