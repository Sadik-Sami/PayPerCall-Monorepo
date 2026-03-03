'use client';
import { motion } from 'framer-motion';
import {
	ArrowRight,
	Check,
	Eye,
	Flame,
	MessageSquare,
	TrendingUp,
	Zap,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { Label } from '@workspace/ui/components/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@workspace/ui/components/select';
import { Controller, useForm } from 'react-hook-form';
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

import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
	Check,
	Eye,
	Flame,
	MessageSquare,
	TrendingUp,
	Zap,
};

function resolveIcon(icon: LucideIcon | string | undefined): LucideIcon | undefined {
	if (!icon) return undefined;
	if (typeof icon === 'string') return ICON_MAP[icon];
	return icon;
}

const SHORT_FIELDS = [
	{ id: 'name', label: 'Full name', type: 'text' as const, autoComplete: 'name' },
	{ id: 'email', label: 'Work email', type: 'email' as const, autoComplete: 'email' },
] as const;

const COMPANY_FIELD = {
	id: 'company',
	label: 'Company',
	type: 'text' as const,
	autoComplete: 'organization',
} as const;

export function ConsultationCTA({
	title,
	subtitle,
	bullets,
	features,
	badge,
	tagline,
	formVariant = 'detailed',
	category,
	sourcePage,
	formTitle,
	submitLabel,
	urgencyBadge,
	verticalsOptions,
	textareaLabel,
	textareaPlaceholder,
	className,
}: FreeConsultationSectionProps) {
	const pathname = usePathname();
	const resolvedSourcePage = sourcePage ?? pathname ?? '/';
	const showVerticalsSelect = (verticalsOptions?.length ?? 0) > 0;
	const showCompany = formVariant !== 'short';
	const showSummary = formVariant === 'detailed';
	const showProjectTypeInput = showCompany && !showVerticalsSelect;
	const fields = showCompany ? [...SHORT_FIELDS, COMPANY_FIELD] : SHORT_FIELDS;

	const resolvedBadge = badge ?? { label: 'Free consultation', icon: 'MessageSquare' as const };
	const BadgeIcon = resolveIcon(resolvedBadge.icon);
	const resolvedFormTitle = formTitle ?? 'Tell us about your needs';
	const resolvedSubmitLabel = submitLabel ?? 'Book Your Free Call';
	const resolvedTagline =
		tagline ?? 'No invoices, no retainers—just a focused conversation on goals and constraints.';
	const resolvedTextareaLabel = textareaLabel ?? (showSummary ? 'Project context' : 'Additional context');
	const resolvedTextareaPlaceholder =
		textareaPlaceholder ?? 'Timeline, systems involved, internal stakeholders…';

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
		control,
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
		<section className={cn('relative', className)}>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-120px' }}
				className='grid gap-6 lg:grid-cols-2'>
				{/* Left panel */}
				<motion.div
					variants={itemVariants}
					className='relative overflow-hidden rounded-3xl border border-pastel-mint-border bg-pastel-mint p-7 shadow-sm md:p-9 dark:border-muted dark:bg-card/80'>
					<div className='relative flex h-full flex-col'>
						<div className='inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary dark:border-primary/30 dark:bg-primary/20'>
							{BadgeIcon ? <BadgeIcon className='h-4 w-4' aria-hidden /> : null}
							{resolvedBadge.label}
						</div>

						<h2 className='mt-5 font-heading text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl'>
							{title}
						</h2>

						{subtitle ? (
							<p className='mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base'>
								{subtitle}
							</p>
						) : null}

						{features && features.length > 0 ? (
							<ul className='mt-7 grid gap-4'>
								{features.map((feature) => {
									const FeatureIcon = resolveIcon(feature.icon);
									return (
									<li key={feature.title} className='flex items-start gap-3'>
										<div className='mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/20 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/20 dark:text-primary-foreground'>
											{FeatureIcon ? <FeatureIcon className='h-4 w-4' aria-hidden /> : null}
										</div>
										<div>
											<div className='text-sm font-semibold text-foreground'>{feature.title}</div>
											<div className='mt-1 text-sm leading-relaxed text-muted-foreground'>{feature.description}</div>
										</div>
									</li>
									);
								})}
							</ul>
						) : bullets && bullets.length > 0 ? (
							<ul className='mt-7 grid gap-3'>
								{bullets.map((bullet) => (
									<li key={bullet} className='flex items-start gap-3'>
										<span className='mt-2 h-2 w-2 shrink-0 rounded-full bg-pastel-mint-strong opacity-80' />
										<span className='text-sm leading-relaxed text-muted-foreground sm:text-base'>{bullet}</span>
									</li>
								))}
							</ul>
						) : null}

						<p className='mt-auto pt-8 text-sm italic text-muted-foreground'>{resolvedTagline}</p>
					</div>
				</motion.div>

				{/* Right panel */}
				<motion.div
					variants={itemVariants}
					className='relative overflow-hidden rounded-3xl border border-pastel-sky-border bg-pastel-sky p-7 shadow-sm md:p-9 dark:border-muted dark:bg-card/80'>
					<form className='relative space-y-4' onSubmit={handleSubmit(onSubmit)}>
						<div>
							<div className='text-xl font-semibold tracking-tight text-foreground'>{resolvedFormTitle}</div>
							<p className='mt-1 text-sm text-muted-foreground'>
								We’ll respond within 24 hours on business days.
							</p>
						</div>

						<div className='grid gap-4'>
							{fields.map((field) => (
								<div key={field.id} className='space-y-2'>
									<Label htmlFor={field.id} className='text-sm font-medium'>
										{field.label}
									</Label>
									<Input
										id={field.id}
										type={field.type}
										autoComplete={field.autoComplete}
										placeholder={field.id === 'name' ? 'e.g. Sarah Connor' : field.id === 'email' ? 'sarah@company.com' : 'e.g. Cyberdyne Systems'}
										className='bg-white/70 backdrop-blur-sm'
										{...register(field.id)}
										required={field.id === 'name' || field.id === 'email'}
									/>
									{errors[field.id] ? (
										<p className='text-sm text-destructive'>{errors[field.id]?.message as string}</p>
									) : null}
								</div>
							))}

							{showVerticalsSelect ? (
								<div className='space-y-2'>
									<Label className='text-sm font-medium'>Targeted Verticals</Label>
									<Controller
										name='projectType'
										control={control}
										render={({ field }) => (
											<Select value={field.value ?? ''} onValueChange={field.onChange}>
												<SelectTrigger className='w-full bg-white/70 backdrop-blur-sm'>
													<SelectValue placeholder='Select your industry vertical…' />
												</SelectTrigger>
												<SelectContent>
													{verticalsOptions?.map((option) => (
														<SelectItem key={option.value} value={option.value}>
															{option.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									/>
								</div>
							) : showProjectTypeInput ? (
								<div className='space-y-2'>
									<Label htmlFor='projectType' className='text-sm font-medium'>
										Project focus
									</Label>
									<Input
										id='projectType'
										type='text'
										autoComplete='off'
										placeholder='e.g. Lead gen, redesign, migration, optimization…'
										className='bg-white/70 backdrop-blur-sm'
										{...register('projectType')}
									/>
								</div>
							) : null}

							{showSummary ? (
								<div className='space-y-2'>
									<Label htmlFor='projectSummary' className='text-sm font-medium'>
										{resolvedTextareaLabel}
									</Label>
									<Textarea
										id='projectSummary'
										rows={4}
										placeholder={resolvedTextareaPlaceholder}
										className='resize-none bg-white/70 backdrop-blur-sm'
										{...register('projectSummary')}
										required
									/>
									{errors.projectSummary ? (
										<p className='text-sm text-destructive'>{errors.projectSummary.message as string}</p>
									) : null}
								</div>
							) : null}
						</div>

						<Button type='submit' size='lg' className='group w-full gap-2' disabled={isSubmitting}>
							{resolvedSubmitLabel}
							<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
						</Button>

						{urgencyBadge && !submitSuccess ? (
							<div className='flex justify-center'>
								<div className='inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground dark:bg-muted/40 dark:text-foreground/90'>
									{(() => {
										const UrgencyIcon = resolveIcon(urgencyBadge.icon);
										return UrgencyIcon ? <UrgencyIcon className='h-3.5 w-3.5' aria-hidden /> : null;
									})()}
									{urgencyBadge.text}
								</div>
							</div>
						) : null}

						{submitSuccess ? (
							<p className='text-center text-sm text-foreground' role='status' aria-live='polite'>
								Thanks — we received your request. We’ll respond within 24 hours on business days.
							</p>
						) : null}
						{submitError ? (
							<p className='text-center text-sm text-destructive' role='alert' aria-live='polite'>
								{submitError}
							</p>
						) : null}
					</form>
				</motion.div>
			</motion.div>
		</section>
	);
}
