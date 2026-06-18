import axios from 'axios';
import type { ContactFormValues } from '@/lib/validations/contact';

type ApiResponse<T> = {
	success: boolean;
	statusCode: number;
	message?: string;
	data?: T;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function submitContactSubmission(input: ContactFormValues) {
	if (!API_BASE_URL) {
		throw new Error('API_BASE_URL is not configured');
	}

	const res = await axios.post<ApiResponse<unknown>>(
		`${API_BASE_URL}/api/contact-submissions`,
		input,
		{ headers: { 'Content-Type': 'application/json' } },
	);
	return res.data;
}
