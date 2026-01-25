import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

/**
 * Enable Draft Mode for previewing draft blog posts
 * Called by admin: /api/draft/enable?secret=xxx&redirect=/blogs/my-slug
 */
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const secret = searchParams.get('secret');
	const redirectPath = searchParams.get('redirect');
	console.log('Secret:', secret);
	console.log('Redirect Path:', redirectPath);

	// Validate secret
	const expectedSecret = process.env.DRAFT_MODE_SECRET;
	if (!expectedSecret) {
		return new Response('Draft mode not configured', { status: 500 });
	}

	if (!secret || secret !== expectedSecret) {
		return new Response('Invalid token', { status: 401 });
	}

	// Validate redirect path (must be relative to prevent open redirects)
	if (!redirectPath || !redirectPath.startsWith('/')) {
		return new Response('Invalid redirect path', { status: 400 });
	}

	// Prevent redirects to API routes or other sensitive paths
	if (redirectPath.startsWith('/api/') || redirectPath.startsWith('/admin/')) {
		return new Response('Invalid redirect path', { status: 400 });
	}

	// Enable Draft Mode
	const draft = await draftMode();
	draft.enable();

	// Redirect to the requested path
	redirect(redirectPath);
}

