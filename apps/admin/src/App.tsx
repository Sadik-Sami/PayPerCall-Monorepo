import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import QueryProvider from '@/providers/query.provider';
import AuthProvider from '@/providers/auth.provider';
import PublicLayout from '@/layout/public-layout';
import PrivateLayout from '@/layout/private-layout';
import LoginPage from '@/pages/auth/login';
import DashboardPage from '@/pages/dashboard/index';
import BlogsPage from '@/pages/dashboard/blogs';
import BlogCreatePage from '@/pages/dashboard/blog-create';
import BlogEditPage from '@/pages/dashboard/blog-edit';
import NewsPage from '@/pages/dashboard/news';
import PackagesPage from '@/pages/dashboard/packages';
import LeadsPage from '@/pages/dashboard/leads';
import NotFoundPage from '@/pages/not-found';
import { Toaster } from '@/components/ui/sonner';
import { ROUTES } from '@/utils/constants';
import { TooltipProvider } from '@/components/ui/tooltip';
import SignupPage from './pages/auth/signup';
import ProfilePage from './pages/dashboard/profile';
import { ThemeProvider } from './providers/theme.provider';

function App() {
	return (
		<QueryProvider>
			<TooltipProvider>
				<Toaster richColors />
				<BrowserRouter>
					<AuthProvider>
						<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
							<Routes>
								{/* Redirect root to login */}
								<Route path='/' element={<Navigate to={ROUTES.LOGIN} replace />} />

								{/* Public routes */}
								<Route element={<PublicLayout />}>
									<Route path={ROUTES.LOGIN} element={<LoginPage />} />
									<Route path={ROUTES.SIGNUP} element={<SignupPage />} />
								</Route>

								{/* Protected routes */}
								<Route element={<PrivateLayout />}>
								<Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
								<Route path={ROUTES.PROFILE} element={<ProfilePage />} />
								<Route path={ROUTES.DASHBOARD_BLOGS} element={<BlogsPage />} />
								<Route path={ROUTES.DASHBOARD_BLOG_CREATE} element={<BlogCreatePage />} />
								<Route path={ROUTES.DASHBOARD_BLOG_EDIT_PATTERN} element={<BlogEditPage />} />
								<Route path={ROUTES.DASHBOARD_NEWS} element={<NewsPage />} />
								<Route path={ROUTES.DASHBOARD_PACKAGES} element={<PackagesPage />} />
								<Route path={ROUTES.DASHBOARD_LEADS} element={<LeadsPage />} />
								</Route>

								{/* 404 */}
								<Route path='*' element={<NotFoundPage />} />
							</Routes>
						</ThemeProvider>
					</AuthProvider>
				</BrowserRouter>
			</TooltipProvider>
		</QueryProvider>
	);
}

export default App;
