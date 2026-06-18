import { Badge } from '@/components/ui/badge';
import type { LeadStatus } from '@/types/lead.types';

export function StatusBadge({ status }: { status: LeadStatus }) {
	switch (status) {
		case 'won':
			return <Badge variant='default'>Won</Badge>;
		case 'lost':
			return <Badge variant='destructive'>Lost</Badge>;
		case 'replied':
			return <Badge variant='outline'>Replied</Badge>;
		case 'processing':
			return <Badge variant='secondary'>Processing</Badge>;
		default:
			return <Badge variant='secondary'>Pending</Badge>;
	}
}
