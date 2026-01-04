import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import QueryProvider from '@/providers/query.provider';
import AuthProvider from '@/providers/auth.provider';
import PublicLayout from '@/layout/public-layout';
import PrivateLayout from '@/layout/private-layout';
import LoginPage from '@/pages/auth/login';
import DashboardPage from '@/pages/dashboard/index';
import BlogsPage from '@/pages/dashboard/blogs';
import NewsPage from '@/pages/dashboard/news';
import PackagesPage from '@/pages/dashboard/packages';
import LeadsPage from '@/pages/dashboard/leads';
import WebDevServicesPage from '@/pages/dashboard/web-dev-services';
import CreateWebDevServicePage from '@/pages/dashboard/web-dev-services/create';
import EditWebDevServicePage from '@/pages/dashboard/web-dev-services/edit';
import SubServicesListPage from '@/pages/dashboard/web-dev-services/sub-services';
import CreateSubServicePage from '@/pages/dashboard/web-dev-services/sub-services/create';
import EditSubServicePage from '@/pages/dashboard/web-dev-services/sub-services/edit';
import SubServicePackagesPage from '@/pages/dashboard/web-dev-services/sub-services/packages';
import SubServiceCaseStudiesPage from '@/pages/dashboard/web-dev-services/sub-services/case-studies';
import SubServiceTestimonialsPage from '@/pages/dashboard/web-dev-services/sub-services/testimonials';
import SubServiceFAQsPage from '@/pages/dashboard/web-dev-services/sub-services/faqs';
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
									{/* Web Dev Services */}
									<Route path={ROUTES.DASHBOARD_WEB_DEV_SERVICES} element={<WebDevServicesPage />} />
									<Route path={ROUTES.DASHBOARD_WEB_DEV_SERVICES_CREATE} element={<CreateWebDevServicePage />} />
									<Route path={ROUTES.DASHBOARD_WEB_DEV_SERVICES_EDIT} element={<EditWebDevServicePage />} />
									{/* Sub-services */}
									<Route path={ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES} element={<SubServicesListPage />} />
									<Route path={ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES_CREATE} element={<CreateSubServicePage />} />
									<Route path={ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES_EDIT} element={<EditSubServicePage />} />
									{/* Sub-service content */}
									<Route path={ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICE_PACKAGES} element={<SubServicePackagesPage />} />
									<Route path={ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICE_CASE_STUDIES} element={<SubServiceCaseStudiesPage />} />
									<Route path={ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICE_TESTIMONIALS} element={<SubServiceTestimonialsPage />} />
									<Route path={ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICE_FAQS} element={<SubServiceFAQsPage />} />
									{/* Other dashboard routes */}
									<Route path={ROUTES.DASHBOARD_BLOGS} element={<BlogsPage />} />
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
