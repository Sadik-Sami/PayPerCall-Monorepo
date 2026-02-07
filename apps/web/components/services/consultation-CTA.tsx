'use client';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { Label } from '@workspace/ui/components/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FreeConsultationSectionProps } from '@/types/services';
import {
	leadCreateSchema,
	leadFormSchema,
	requireProjectSummary,
	type LeadCreateInput,
	type LeadFormInput,
} from '@/lib/validations/leads';
import { submitLead } from '@/lib/api/leads';

const SHORT_FIELDS = [
	{ id: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
	{ id: 'email', label: 'Work email', type: 'email', autoComplete: 'email' },
] as const;

const DETAILED_FIELDS = [
	...SHORT_FIELDS,
	{ id: 'company', label: 'Company', type: 'text', autoComplete: 'organization' },
	{ id: 'projectType', label: 'Project focus', type: 'text', autoComplete: 'off' },
] as const;

export function ConsultationCTA({
	title,
	subtitle,
	bullets,
	formVariant = 'detailed',
	category,
	sourcePage,
	className,
}: FreeConsultationSectionProps) {
	const pathname = usePathname();
	const resolvedSourcePage = sourcePage ?? pathname ?? '/';
	const fields = formVariant === 'short' ? SHORT_FIELDS : DETAILED_FIELDS;

	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const defaultValues = useMemo(
		() =>
			({
				name: '',
				email: '',
				company: '',
				projectType: '',
				projectSummary: '',
			}) satisfies LeadFormInput,
		[]
	);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<LeadFormInput>({
		resolver: zodResolver(leadFormSchema),
		defaultValues,
	});

	async function onSubmit(values: LeadFormInput) {
		setSubmitError(null);
		setSubmitSuccess(false);

		// Enforce variant-specific requirements
		const summaryCheck = requireProjectSummary(values, formVariant);
		if (!summaryCheck.ok) {
			setSubmitError(summaryCheck.message);
			return;
		}

		try {
			const payload: LeadCreateInput = {
				...values,
				category,
				sourcePage: resolvedSourcePage,
			};

			const parsed = leadCreateSchema.safeParse(payload);
			if (!parsed.success) {
				setSubmitError('Please double-check the form fields and try again.');
				return;
			}

			await submitLead(parsed.data);
			setSubmitSuccess(true);
			reset(defaultValues);
		} catch (err) {
			console.error('Lead submit failed:', err);
			setSubmitError('Something went wrong. Please try again in a moment.');
		}
	}

	return (
		<section
			className={cn(
				'relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-card via-card to-primary/5',
				className
			)}>
			{/* Background decoration */}
			<div className='absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl' />
			<div className='absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl' />

			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='relative grid gap-8 p-8 md:grid-cols-2 lg:p-12'>
				{/* Left column - Content */}
				<motion.div variants={itemVariants} className='space-y-6'>
					<div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary'>
						<MessageSquare className='h-4 w-4' />
						Free consultation
					</div>

					<h2 className='text-foreground'>{title}</h2>

					{subtitle && <p className='text-muted-foreground'>{subtitle}</p>}

					<ul className='space-y-4'>
						{bullets.map((bullet) => (
							<li key={bullet} className='flex items-start gap-3'>
								<span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-primary' />
								<span className='text-muted-foreground'>{bullet}</span>
							</li>
						))}
					</ul>

					<p className='text-sm text-muted-foreground'>
						No invoices, no retainers—just a focused conversation on goals and constraints.
					</p>
				</motion.div>

				{/* Right column - Form */}
				<motion.div variants={itemVariants}>
					<form
						className='rounded-2xl border border-dashed border-border bg-card/50 p-6 backdrop-blur-sm'
						onSubmit={handleSubmit(onSubmit)}>
						<div className='space-y-4'>
							{fields.map((field) => (
								<div key={field.id} className='space-y-2'>
									<Label htmlFor={field.id} className='text-sm font-medium'>
										{field.label}
									</Label>
									<Input
										id={field.id}
										type={field.type}
										autoComplete={field.autoComplete}
										className='bg-background'
										{...register(field.id)}
										required={field.id === 'name' || field.id === 'email'}
									/>
									{errors[field.id] && (
										<p className='text-sm text-destructive'>{errors[field.id]?.message as string}</p>
									)}
								</div>
							))}

							{formVariant === 'detailed' && (
								<div className='space-y-2'>
									<Label htmlFor='projectSummary' className='text-sm font-medium'>
										Project context
									</Label>
									<Textarea
										id='projectSummary'
										rows={4}
										placeholder='Timeline, systems involved, internal stakeholders...'
										className='resize-none bg-background'
										{...register('projectSummary')}
										required
									/>
									{errors.projectSummary && (
										<p className='text-sm text-destructive'>{errors.projectSummary.message as string}</p>
									)}
								</div>
							)}

							<Button type='submit' size='lg' className='group w-full gap-2' disabled={isSubmitting}>
								Book Your Free Call
								<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Button>

							{submitSuccess && (
								<p className='text-center text-sm text-foreground' role='status' aria-live='polite'>
									Thanks — we received your request. We’ll respond within 24 hours on business days.
								</p>
							)}
							{submitError && (
								<p className='text-center text-sm text-destructive' role='alert' aria-live='polite'>
									{submitError}
								</p>
							)}

							{!submitSuccess && (
								<p className='text-center text-xs text-muted-foreground'>We respond within 24 hours on business days.</p>
							)}
						</div>
					</form>
				</motion.div>
			</motion.div>
		</section>
	);
}
