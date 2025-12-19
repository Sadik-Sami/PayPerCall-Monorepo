import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/use-auth';
import { useRole } from '@/hooks/use-role';
import { ROUTES } from '@/utils/constants';
import Loading from '@/components/common/loading';
import InsufficientPermissions from '@/components/common/insufficient-permissions';

export default function PrivateLayout() {
	const { isAuthenticated, isLoading: authLoading } = useAuth();
	const { isAdmin, isLoading: roleLoading } = useRole();

	if (authLoading) {
		return <Loading fullScreen message='Checking authentication...' />;
	}

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	if (roleLoading) {
		return <Loading fullScreen message='Verifying permissions...' />;
	}

	if (!isAdmin()) {
		return <InsufficientPermissions />;
	}

	return (
		<div className='min-h-screen bg-background'>
			<main className='container mx-auto p-6'>
				<Outlet />
			</main>
		</div>
	);
}
