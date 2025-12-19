import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import QueryProvider from './providers/query.provider';
import AuthProvider from './providers/auth.provider';
import PublicLayout from './layout/public-layout';
import PrivateLayout from './layout/private-layout';
import LoginPage from './pages/auth/login';
import DashboardPage from './pages/dashboard/index';
import BlogsPage from './pages/dashboard/blogs';
import NewsPage from './pages/dashboard/news';
import PackagesPage from './pages/dashboard/packages';
import LeadsPage from './pages/dashboard/leads';
import NotFoundPage from './pages/not-found';
import { Toaster } from './components/ui/sonner';
import { ROUTES } from './utils/constants';

function App() {
	return (
		<QueryProvider>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						{/* Redirect root to login */}
						<Route path='/' element={<Navigate to={ROUTES.LOGIN} replace />} />

						{/* Public routes */}
						<Route element={<PublicLayout />}>
							<Route path={ROUTES.LOGIN} element={<LoginPage />} />
						</Route>

						{/* Protected routes */}
						<Route element={<PrivateLayout />}>
							<Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
							<Route path={ROUTES.DASHBOARD_BLOGS} element={<BlogsPage />} />
							<Route path={ROUTES.DASHBOARD_NEWS} element={<NewsPage />} />
							<Route path={ROUTES.DASHBOARD_PACKAGES} element={<PackagesPage />} />
							<Route path={ROUTES.DASHBOARD_LEADS} element={<LeadsPage />} />
						</Route>

						{/* 404 */}
						<Route path='*' element={<NotFoundPage />} />
					</Routes>

					<Toaster richColors />
				</AuthProvider>
			</BrowserRouter>
		</QueryProvider>
	);
}

export default App;
