import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/utils/constants';

export default function PublicLayout() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<div className='text-lg'>Loading...</div>
			</div>
		);
	}

	if (isAuthenticated) {
		return <Navigate to={ROUTES.DASHBOARD} replace />;
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-muted/40'>
			<Outlet />
		</div>
	);
}
