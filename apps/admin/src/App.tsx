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
import CaseStudiesPage from '@/pages/dashboard/case-studies';
import CaseStudyCreatePage from '@/pages/dashboard/case-study-create';
import CaseStudyEditPage from '@/pages/dashboard/case-study-edit';

import LeadsPage from '@/pages/dashboard/leads';
import ContactSubmissionsPage from '@/pages/dashboard/contact-submissions';
import NotFoundPage from '@/pages/not-found';
import { Toaster } from '@workspace/ui/components/sonner';
import { ROUTES } from '@/utils/constants';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import SignupPage from './pages/auth/signup';
import ProfilePage from './pages/dashboard/profile';
import { ThemeProvider } from './providers/theme.provider';

function App() {
	return (
		<QueryProvider>
			<TooltipProvider>
				<Toaster richColors position='top-right' />
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
									<Route path={ROUTES.DASHBOARD_CASE_STUDIES} element={<CaseStudiesPage />} />
									<Route path={ROUTES.DASHBOARD_CASE_STUDY_CREATE} element={<CaseStudyCreatePage />} />
									<Route path={ROUTES.DASHBOARD_CASE_STUDY_EDIT_PATTERN} element={<CaseStudyEditPage />} />

									<Route path={ROUTES.DASHBOARD_LEADS} element={<LeadsPage />} />
									<Route
										path={ROUTES.DASHBOARD_CONTACT_SUBMISSIONS}
										element={<ContactSubmissionsPage />}
									/>
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
