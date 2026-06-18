import { Badge } from '@/components/ui/badge';
import type { ContactSubmissionStatus } from '@/types/contact-submission.types';

export function ContactStatusBadge({ status }: { status: ContactSubmissionStatus }) {
	switch (status) {
		case 'completed':
			return <Badge variant='default'>Completed</Badge>;
		case 'declined':
			return <Badge variant='destructive'>Declined</Badge>;
		case 'scheduled':
			return (
				<Badge variant='outline' className='border-primary/40 text-primary'>
					Scheduled
				</Badge>
			);
		case 'contacted':
			return <Badge variant='outline'>Contacted</Badge>;
		default:
			return <Badge variant='secondary'>Pending</Badge>;
	}
}
