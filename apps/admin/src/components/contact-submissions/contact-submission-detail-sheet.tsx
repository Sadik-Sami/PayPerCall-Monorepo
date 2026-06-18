import { useState } from 'react';
import { Calendar, ChevronDown, ChevronRight, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import {
	useContactSubmission,
	useUpdateContactSubmissionStatus,
} from '@/hooks/use-contact-submissions';
import type { ContactSubmission, ContactSubmissionStatus } from '@/types/contact-submission.types';
import { ContactStatusBadge } from './contact-status-badge';

const STATUS_OPTIONS: Array<{ value: ContactSubmissionStatus; label: string }> = [
	{ value: 'pending', label: 'Pending' },
	{ value: 'contacted', label: 'Contacted' },
	{ value: 'scheduled', label: 'Scheduled' },
	{ value: 'completed', label: 'Completed' },
	{ value: 'declined', label: 'Declined' },
];

function formatDateTime(value?: string | null) {
	if (!value) return '—';
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return '—';
	return d.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className='space-y-1'>
			<div className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>{label}</div>
			<div className='text-sm text-foreground break-words'>{children}</div>
		</div>
	);
}

function SectionTitle({ children }: { children: React.ReactNode }) {
	return <h3 className='text-sm font-semibold text-foreground'>{children}</h3>;
}

function LoadingState() {
	return (
		<div className='flex-1 space-y-6 overflow-y-auto px-4 pb-6'>
			{Array.from({ length: 4 }).map((_, idx) => (
				<div key={idx} className='space-y-2'>
					<Skeleton className='h-4 w-24' />
					<Skeleton className='h-5 w-full' />
					<Skeleton className='h-5 w-2/3' />
				</div>
			))}
		</div>
	);
}

function ErrorState({ message }: { message: string }) {
	return (
		<div className='mx-4 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm'>
			<div className='font-medium'>Failed to load contact submission</div>
			<div className='text-muted-foreground'>{message || 'Unknown error'}</div>
		</div>
	);
}

function isHttpUrl(value: string) {
	return /^https?:\/\//i.test(value);
}

function SubmissionBody({ submission }: { submission: ContactSubmission }) {
	const [techOpen, setTechOpen] = useState(false);
	const updateStatus = useUpdateContactSubmissionStatus();

	return (
		<div className='flex-1 space-y-5 overflow-y-auto px-4 pb-6'>
			<section className='space-y-3'>
				<SectionTitle>Contact</SectionTitle>
				<Field label='Name'>{submission.full_name}</Field>
				<Field label='Email'>
					<a
						href={`mailto:${submission.work_email}`}
						className='inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline'>
						<Mail className='size-3.5' />
						{submission.work_email}
					</a>
				</Field>
				<Field label='Company'>{submission.company}</Field>
				<Field label='Phone'>{submission.phone || '—'}</Field>
				<Field label='Preferred contact method'>{submission.preferred_contact_method}</Field>
			</section>

			<Separator />

			<section className='space-y-3'>
				<SectionTitle>Project</SectionTitle>
				<Field label='Service category'>{submission.service_category}</Field>
				<Field label='Service detail'>{submission.service_detail}</Field>
				<Field label='Business website'>
					{submission.business_website ?
						isHttpUrl(submission.business_website) ?
							<a
								href={submission.business_website}
								target='_blank'
								rel='noopener noreferrer'
								className='text-primary underline-offset-4 hover:underline break-all'>
								{submission.business_website}
							</a>
						:	<code className='rounded bg-muted px-1.5 py-0.5 font-mono text-xs'>
								{submission.business_website}
							</code>
					:	'—'}
				</Field>
				<Field label='Company size'>{submission.company_size}</Field>
				<Field label='Monthly budget'>{submission.monthly_budget || '—'}</Field>
				<Field label='Target regions'>{submission.target_regions}</Field>
			</section>

			<Separator />

			<section className='space-y-3'>
				<SectionTitle>Meeting</SectionTitle>
				<Field label='Desired date'>
					<span className='inline-flex items-center gap-1.5'>
						<Calendar className='size-3.5 text-muted-foreground' />
						{formatDateTime(submission.desired_date)}
					</span>
				</Field>
				<Field label='Preferred window'>{submission.preferred_meeting_window}</Field>
				<Field label='Timezone'>{submission.timezone}</Field>
				<Field label='Additional context'>
					{submission.additional_context ?
						<div className='whitespace-pre-wrap rounded-md border bg-muted/30 p-3 text-sm'>
							{submission.additional_context}
						</div>
					:	'—'}
				</Field>
			</section>

			<Separator />

			<section className='space-y-3'>
				<SectionTitle>Status</SectionTitle>
				<div className='flex items-center gap-2'>
					<span className='text-xs text-muted-foreground'>Current:</span>
					<ContactStatusBadge status={submission.status} />
				</div>
				<div className='space-y-1'>
					<div className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
						Change status
					</div>
					<Select
						value={submission.status}
						onValueChange={(value) =>
							updateStatus.mutate({ id: submission.id, status: value as ContactSubmissionStatus })
						}
						disabled={updateStatus.isPending}>
						<SelectTrigger className='w-full'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{STATUS_OPTIONS.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</section>

			<Separator />

			<section className='space-y-3'>
				<SectionTitle>Timestamps</SectionTitle>
				<Field label='Created'>{formatDateTime(submission.created_at)}</Field>
				<Field label='Updated'>{formatDateTime(submission.updated_at)}</Field>
				<Field label='Consent'>
					{submission.consent ?
						<Badge variant='outline' className='border-primary/40 text-primary'>
							Yes
						</Badge>
					:	<Badge variant='destructive'>No</Badge>}
				</Field>
			</section>

			<Separator />

			<section className='space-y-2'>
				<button
					type='button'
					onClick={() => setTechOpen((open) => !open)}
					className='flex w-full items-center gap-1.5 text-left text-sm font-semibold text-foreground hover:text-primary'>
					{techOpen ?
						<ChevronDown className='size-4' />
					:	<ChevronRight className='size-4' />}
					Technical details
				</button>
				{techOpen && (
					<div className='space-y-3 pt-2'>
						<Field label='IP address'>
							<code className='rounded bg-muted px-1.5 py-0.5 font-mono text-xs'>
								{submission.ip_address || '—'}
							</code>
						</Field>
						<Field label='User agent'>
							<code className='block break-all rounded bg-muted px-2 py-1 font-mono text-xs leading-relaxed'>
								{submission.user_agent || '—'}
							</code>
						</Field>
					</div>
				)}
			</section>
		</div>
	);
}

export function ContactSubmissionDetailSheet({
	submissionId,
	onOpenChange,
}: {
	submissionId: string | null;
	onOpenChange: (open: boolean) => void;
}) {
	const open = submissionId !== null;
	const { data: submission, isLoading, isError, error } = useContactSubmission(submissionId ?? '');

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side='right'
				className='w-full sm:!max-w-md md:!max-w-lg p-0 gap-0'>
				<SheetHeader className='border-b'>
					<SheetTitle>{submission?.full_name ?? 'Contact submission'}</SheetTitle>
					<SheetDescription>
						{submission?.work_email ?? 'Loading submission details…'}
					</SheetDescription>
					{submission && (
						<div className='pt-1'>
							<ContactStatusBadge status={submission.status} />
						</div>
					)}
				</SheetHeader>

				{isLoading && <LoadingState />}
				{isError && <ErrorState message={(error as Error)?.message} />}
				{!isLoading && !isError && submission && <SubmissionBody submission={submission} />}
			</SheetContent>
		</Sheet>
	);
}
