import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/utils/constants';
import Loading from '@/components/common/loading';

export default function PublicLayout() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return <Loading fullScreen message='Loading...' />;
	}

	if (isAuthenticated) {
		return <Navigate to={ROUTES.DASHBOARD} replace />;
	}

	return <Outlet />;
}
