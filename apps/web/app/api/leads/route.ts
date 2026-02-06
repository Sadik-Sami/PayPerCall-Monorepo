import { NextResponse } from 'next/server';
import { leadCreateSchema } from '@/lib/validators/leads';

const API_BASE_URL = process.env.API_BASE_URL || 'https://paypercall-monorepo.onrender.com';

export async function POST(req: Request) {
	try {
		const json = await req.json();
		const parsed = leadCreateSchema.safeParse(json);

		if (!parsed.success) {
			return NextResponse.json(
				{
					success: false,
					statusCode: 400,
					message: 'Invalid payload',
					errors: parsed.error.flatten(),
				},
				{ status: 400 }
			);
		}

		const upstream = await fetch(`${API_BASE_URL}/api/leads`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(parsed.data),
		});

		const text = await upstream.text();
		let data: unknown = null;
		try {
			data = text ? JSON.parse(text) : null;
		} catch {
			data = text;
		}

		return NextResponse.json(data, { status: upstream.status });
	} catch (err) {
		console.error('Failed to proxy lead create:', err);
		return NextResponse.json(
			{ success: false, statusCode: 500, message: 'Failed to submit lead' },
			{ status: 500 }
		);
	}
}


