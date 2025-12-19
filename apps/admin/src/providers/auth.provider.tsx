import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authApi } from '@/services/auth.api';
import { tokenUtil } from '@/utils/token.util';
import { AuthContext } from '@/contexts/auth.context';
import type { LoginRequest } from '@/types/auth.types';
import type { User } from '@/types/user.types';
import { ROUTES } from '@/utils/constants';
import { toast } from 'sonner';
import Loading from '@/components/common/loading';

interface AuthProviderProps {
	children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isInitialized, setIsInitialized] = useState(false);
	const navigate = useNavigate();

	const loginMutation = useMutation({
		mutationFn: authApi.login,
		onSuccess: (data) => {
			tokenUtil.set(data.accessToken);
			setUser(data.user);
			toast.success('Logged in successfully');
			navigate(ROUTES.DASHBOARD, { replace: true });
		},
		onError: (error: Error) => {
			toast.error(error.message || 'Login failed');
		},
	});

	const logoutMutation = useMutation({
		mutationFn: authApi.logout,
		onSuccess: () => {
			tokenUtil.remove();
			setUser(null);
			toast.success('Logged out successfully');
			navigate(ROUTES.LOGIN, { replace: true });
		},
		onError: () => {
			tokenUtil.remove();
			setUser(null);
			navigate(ROUTES.LOGIN, { replace: true });
		},
	});

	const refreshUser = useCallback(async () => {
		try {
			const userData = await authApi.me();
			setUser(userData);
		} catch (error) {
			console.error('[v0] Auth: Failed to refresh user:', error);
			tokenUtil.remove();
			setUser(null);
		}
	}, []);

	useEffect(() => {
		const initAuth = async () => {
			const token = tokenUtil.get();

			if (token) {
				try {
					const userData = await authApi.me();
					setUser(userData);
				} catch (error) {
					console.error('[v0] Auth: Token validation failed:', error);
					tokenUtil.remove();
					setUser(null);
				}
			}

			setIsLoading(false);
			setIsInitialized(true);
		};

		initAuth();
	}, []);

	useEffect(() => {
		const handleLogout = () => {
			tokenUtil.remove();
			setUser(null);
			navigate(ROUTES.LOGIN, { replace: true });
		};

		window.addEventListener('auth:logout', handleLogout);
		return () => window.removeEventListener('auth:logout', handleLogout);
	}, [navigate]);

	const login = async (credentials: LoginRequest) => {
		await loginMutation.mutateAsync(credentials);
	};

	const logout = async () => {
		await logoutMutation.mutateAsync();
	};

	if (!isInitialized) {
		return <Loading fullScreen message='Initializing...' />;
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,
				login,
				logout,
				refreshUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
