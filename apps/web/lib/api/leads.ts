import axios from 'axios';
import type { LeadCreateInput } from '@/lib/validations/leads';

type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function submitLead(input: LeadCreateInput) {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured');
  }
  try {
    const res = await axios.post<ApiResponse<unknown>>(`${API_BASE_URL}/api/leads`, input, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }
}
