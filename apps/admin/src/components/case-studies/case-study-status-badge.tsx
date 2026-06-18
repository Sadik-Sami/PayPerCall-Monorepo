import { Badge } from '@/components/ui/badge';
import type { CaseStudyStatus } from '@/types/case-study.types';

interface CaseStudyStatusBadgeProps {
	status: CaseStudyStatus;
	className?: string;
}

export function CaseStudyStatusBadge({ status, className }: CaseStudyStatusBadgeProps) {
	const variants: Record<CaseStudyStatus, { variant: 'default' | 'secondary' | 'outline' | 'destructive'; label: string }> = {
		published: { variant: 'default', label: 'Published' },
		draft: { variant: 'secondary', label: 'Draft' },
		archived: { variant: 'outline', label: 'Archived' },
	};

	const config = variants[status];

	return (
		<Badge variant={config.variant} className={className}>
			{config.label}
		</Badge>
	);
}
