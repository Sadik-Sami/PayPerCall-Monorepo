import { cn } from '@workspace/ui/lib/utils';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { Label } from '@workspace/ui/components/label';
import { Button } from '@workspace/ui/components/button';
import type { FreeConsultationSectionProps } from './types';

const SHORT_FIELDS = [
	{ id: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
	{ id: 'email', label: 'Work email', type: 'email', autoComplete: 'email' },
];

const DETAILED_FIELDS = [
	...SHORT_FIELDS,
	{ id: 'company', label: 'Company', type: 'text', autoComplete: 'organization' },
	{ id: 'projectType', label: 'Project focus', type: 'text', autoComplete: 'off' },
];

export function FreeConsultationSection({ title, bullets, formVariant = 'detailed', className }: FreeConsultationSectionProps) {
	const fields = formVariant === 'short' ? SHORT_FIELDS : DETAILED_FIELDS;

	return (
		<section className={cn('grid gap-8 rounded-3xl border bg-background/90 p-8 md:grid-cols-2', className)}>
			<div className='space-y-4'>
				<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Free consultation</p>
				<h2 className='text-2xl font-semibold text-foreground'>{title}</h2>
				<p className='text-sm text-muted-foreground'>No invoices, no retainers—just a focused conversation on goals and constraints.</p>
				<ul className='space-y-3 text-sm text-muted-foreground'>
					{bullets.map((bullet) => (
						<li key={bullet} className='flex items-start gap-3'>
							<span className='mt-1 size-2 rounded-full bg-primary' aria-hidden />
							<span>{bullet}</span>
						</li>
					))}
				</ul>
			</div>
			<form
				className='space-y-4 rounded-2xl border border-dashed border-muted-foreground/40 p-6 shadow-xs'
				method='post'
				action='/contact'>
				<input type='hidden' name='source' value='web-dev-services' />
				<div className='grid gap-4'>
					{fields.map((field) => (
						<div key={field.id} className='space-y-1'>
							<Label htmlFor={field.id}>{field.label}</Label>
							<Input id={field.id} name={field.id} type={field.type} required className='bg-background' autoComplete={field.autoComplete} />
						</div>
					))}
					{formVariant === 'detailed' ? (
						<div className='space-y-1'>
							<Label htmlFor='projectSummary'>Project context</Label>
							<Textarea
								id='projectSummary'
								name='projectSummary'
								rows={4}
								placeholder='Timeline, systems involved, internal stakeholders...'
								required
								className='bg-background'
							/>
						</div>
					) : null}
					<div className='space-y-1'>
						<Label htmlFor='budgetRange'>Budget guidance</Label>
						<select
							id='budgetRange'
							name='budgetRange'
							required
							className='border-input text-sm text-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-background px-3 py-2 outline-none focus-visible:ring-[3px]'>
							<option value=''>Select a range</option>
							<option value='20-40k'>$20k – $40k</option>
							<option value='40-80k'>$40k – $80k</option>
							<option value='80-150k'>$80k – $150k</option>
							<option value='150k-plus'>$150k +</option>
						</select>
					</div>
				</div>
				<Button type='submit' className='w-full'>
					Book My Strategy Session
				</Button>
				<p className='text-xs text-muted-foreground'>
					This consultation is free of cost. We respond within one business day with scheduling options—no marketing lists or automated
					sequences.
				</p>
			</form>
		</section>
	);
}

