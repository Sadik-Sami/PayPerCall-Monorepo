import { useState } from 'react';
import { ChevronDown, ChevronRight, Mail } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { useLead, useUpdateLeadStatus } from '@/hooks/use-leads';
import type { Lead, LeadStatus } from '@/types/lead.types';
import { StatusBadge } from './status-badge';

const STATUS_OPTIONS: Array<{ value: LeadStatus; label: string }> = [
	{ value: 'pending', label: 'Pending' },
	{ value: 'processing', label: 'Processing' },
	{ value: 'replied', label: 'Replied' },
	{ value: 'won', label: 'Won' },
	{ value: 'lost', label: 'Lost' },
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
			<div className='font-medium'>Failed to load lead</div>
			<div className='text-muted-foreground'>{message || 'Unknown error'}</div>
		</div>
	);
}

function LeadBody({ lead }: { lead: Lead }) {
	const [techOpen, setTechOpen] = useState(false);
	const updateStatus = useUpdateLeadStatus();

	return (
		<div className='flex-1 space-y-5 overflow-y-auto px-4 pb-6'>
			<section className='space-y-3'>
				<SectionTitle>Contact</SectionTitle>
				<Field label='Name'>{lead.name}</Field>
				<Field label='Email'>
					<a
						href={`mailto:${lead.email}`}
						className='inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline'>
						<Mail className='size-3.5' />
						{lead.email}
					</a>
				</Field>
				<Field label='Company'>{lead.company || '—'}</Field>
			</section>

			<Separator />

			<section className='space-y-3'>
				<SectionTitle>Project</SectionTitle>
				<Field label='Type'>{lead.project_type || '—'}</Field>
				<Field label='Category'>{lead.category}</Field>
				<Field label='Source page'>
					<code className='rounded bg-muted px-1.5 py-0.5 font-mono text-xs'>{lead.source_page}</code>
				</Field>
				<Field label='Summary'>
					{lead.project_summary ?
						<div className='whitespace-pre-wrap rounded-md border bg-muted/30 p-3 text-sm'>{lead.project_summary}</div>
					:	'—'}
				</Field>
			</section>

			<Separator />

			<section className='space-y-3'>
				<SectionTitle>Status</SectionTitle>
				<div className='flex items-center gap-2'>
					<span className='text-xs text-muted-foreground'>Current:</span>
					<StatusBadge status={lead.status} />
				</div>
				<div className='space-y-1'>
					<div className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>Change status</div>
					<Select
						value={lead.status}
						onValueChange={(value) => updateStatus.mutate({ leadId: lead.id, status: value as LeadStatus })}
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
				<Field label='Created'>{formatDateTime(lead.created_at)}</Field>
				<Field label='Updated'>{formatDateTime(lead.updated_at)}</Field>
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
							<code className='rounded bg-muted px-1.5 py-0.5 font-mono text-xs'>{lead.ip_address || '—'}</code>
						</Field>
						<Field label='User agent'>
							<code className='block break-all rounded bg-muted px-2 py-1 font-mono text-xs leading-relaxed'>
								{lead.user_agent || '—'}
							</code>
						</Field>
					</div>
				)}
			</section>
		</div>
	);
}

export function LeadDetailSheet({
	leadId,
	onOpenChange,
}: {
	leadId: string | null;
	onOpenChange: (open: boolean) => void;
}) {
	const open = leadId !== null;
	const { data: lead, isLoading, isError, error } = useLead(leadId ?? '');

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side='right'
				className='w-full sm:!max-w-md md:!max-w-lg p-0 gap-0'>
				<SheetHeader className='border-b'>
					<SheetTitle>{lead?.name ?? 'Lead details'}</SheetTitle>
					<SheetDescription>{lead?.email ?? 'Loading lead information…'}</SheetDescription>
					{lead && (
						<div className='pt-1'>
							<StatusBadge status={lead.status} />
						</div>
					)}
				</SheetHeader>

				{isLoading && <LoadingState />}
				{isError && <ErrorState message={(error as Error)?.message} />}
				{!isLoading && !isError && lead && <LeadBody lead={lead} />}
			</SheetContent>
		</Sheet>
	);
}
