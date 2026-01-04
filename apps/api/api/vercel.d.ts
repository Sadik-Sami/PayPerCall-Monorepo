// Type declarations for Vercel serverless functions
declare module '@vercel/node' {
	import type { IncomingMessage, ServerResponse } from 'http';

	export interface VercelRequest extends IncomingMessage {
		query: { [key: string]: string | string[] | undefined };
		body?: any;
		cookies?: { [key: string]: string };
	}

	export interface VercelResponse extends ServerResponse {
		status(code: number): VercelResponse;
		json(body: any): VercelResponse;
		send(body: any): VercelResponse;
		end(body?: any): VercelResponse;
	}
}

