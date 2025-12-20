import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/use-auth';
import { useRole } from '@/hooks/use-role';
import { ROUTES } from '@/utils/constants';
import Loading from '@/components/common/loading';
import InsufficientPermissions from '@/components/common/insufficient-permissions';
import AppSidebar from '@/components/dashboard/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

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
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className='flex h-14 shrink-0 items-center gap-2 border-b px-4'>
					<SidebarTrigger className='-ml-1' />
					<Separator orientation='vertical' className='mr-2 h-4' />
					<span className='text-sm font-medium text-muted-foreground'>Admin Dashboard</span>
				</header>
				<main className='flex-1 overflow-auto'>
					<div className='container mx-auto p-4 md:p-6'>
						<Outlet />
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
