import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Disable Draft Mode
 * Redirects to home page after disabling
 */
export async function GET() {
	const draft = await draftMode();
	draft.disable();
	redirect('/');
}

