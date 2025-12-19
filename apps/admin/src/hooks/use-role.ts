import { useQuery } from '@tanstack/react-query';
import { authApi } from '../services/auth.api';
import type { UserRole } from '../types/user.types';
import { useAuth } from './use-auth';

export function useRole() {
	const { isAuthenticated } = useAuth();

	const {
		data: role,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['userRole'],
		queryFn: authApi.getRole,
		enabled: isAuthenticated,
		staleTime: 5 * 60 * 1000, // Cache for 5 minutes
		retry: 1,
	});

	const hasRole = (requiredRole: UserRole): boolean => {
		return role === requiredRole;
	};

	const isAdmin = (): boolean => {
		return role === 'admin';
	};

	const isUser = (): boolean => {
		return role === 'user';
	};

	return {
		role: role || null,
		isLoading,
		error,
		hasRole,
		isAdmin,
		isUser,
	};
}
