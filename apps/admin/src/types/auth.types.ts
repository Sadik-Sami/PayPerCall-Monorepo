import type { User } from './user.types';

export interface LoginRequest {
	email: string;
	password: string;
}

export interface SignupRequest {
	name: string;
	email: string;
	password: string;
	phone?: string;
}

export interface LoginResponse {
	user: User;
	accessToken: string;
	sessionId: string;
}

export interface RefreshResponse {
	user: User;
	accessToken: string;
}

export interface AuthContextValue {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (credentials: LoginRequest) => Promise<void>;
	signup: (data: SignupRequest) => Promise<void>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
}
