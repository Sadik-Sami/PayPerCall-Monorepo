import axios from 'axios';
import type { LeadCreateInput } from '@/lib/validators/leads';

type ApiResponse<T> = {
	success: boolean;
	statusCode: number;
	message?: string;
	data?: T;
};

export async function submitLead(input: LeadCreateInput) {
	console.log('input', input);
	const res = await axios.post<ApiResponse<unknown>>('/api/leads', input, {
		headers: { 'Content-Type': 'application/json' },
	});
	return res.data;
}


