import type { ROLE } from '@/utils/constants';

export type UserRole = (typeof ROLE)[keyof typeof ROLE];

export interface UserImage {
	url: string;
	publicId: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	image: UserImage | null;
	role: UserRole;
	isVerified: boolean;
	phone: string | null;
	address_street: string | null;
	address_city: string | null;
	address_state: string | null;
	address_postal_code: string | null;
	bio: string | null;
	designation: string | null;
	created_at: string;
	updated_at: string;
}
export interface UpdateProfileRequest {
	name?: string;
	email?: string;
	phone?: string | null;
	image?: UserImage | null;
	address_street?: string | null;
	address_city?: string | null;
	address_state?: string | null;
	address_postal_code?: string | null;
	bio?: string | null;
	designation?: string | null;
}

export interface ChangePasswordRequest {
	currentPassword: string;
	newPassword: string;
}
