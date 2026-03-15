'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowRight, Clock3, EyeOff, Gauge, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { cardVariants, containerVariants, itemVariants } from '@/lib/animations';

type EvolutionItem = {
	title: string;
	description: string;
	icon: LucideIcon;
};

const MANUAL_ITEMS: EvolutionItem[] = [
	{
		title: 'Budget bleed',
		description: 'Spend drifts into low-intent queries, weak audiences, and campaign overlap that hides waste.',
		icon: ArrowDownRight,
	},
	{
		title: 'Attribution blind spots',
		description: 'Fragmented tracking makes it hard to separate high-quality opportunities from noisy conversions.',
		icon: EyeOff,
	},
	{
		title: 'Reactive bid changes',
		description: 'Manual optimization lags behind live market shifts, causing missed windows and unstable efficiency.',
		icon: Clock3,
	},
];

const STRATEGIC_ITEMS: EvolutionItem[] = [
	{
		title: 'Signal-led budget control',
		description: 'Capital allocation follows intent quality and margin logic, not default platform automation.',
		icon: Target,
	},
	{
		title: 'Clean performance visibility',
		description: 'First-party data and reliable conversion mapping improve confidence in optimization decisions.',
		icon: Gauge,
	},
	{
		title: 'Predictive scaling rhythm',
		description: 'Testing and bidding systems identify profitable pockets earlier and scale with tighter guardrails.',
		icon: Zap,
	},
];

const PANEL_STYLES = {
	manual: {
		shell: 'border-border/70 bg-card/95',
		eyebrow: 'text-muted-foreground',
		accent: 'bg-muted',
		iconWrap: 'border-border bg-background',
		iconText: 'text-muted-foreground',
	},
	strategic: {
		shell: 'border-pastel-lilac-border bg-linear-to-br from-pastel-lilac/30 via-background to-pastel-sky/20',
		eyebrow: 'text-pastel-lilac-ink',
		accent: 'bg-linear-to-r from-pastel-lilac-strong/80 to-pastel-sky-strong/80',
		iconWrap: 'border-pastel-lilac-border bg-white/80 dark:bg-background/70',
		iconText: 'text-pastel-lilac-ink',
	},
} as const;

function EvolutionPanel({
	title,
	eyebrow,
	description,
	items,
	tone,
	resultLabel,
	resultTitle,
	resultDescription,
}: {
	title: string;
	eyebrow: string;
	description: string;
	items: EvolutionItem[];
	tone: keyof typeof PANEL_STYLES;
	resultLabel: string;
	resultTitle: string;
	resultDescription: string;
}) {
	const styles = PANEL_STYLES[tone];

	return (
		<motion.article
			variants={cardVariants}
			className={cn('rounded-4xl border p-5 shadow-sm md:p-7', styles.shell)}>
			<div className='flex flex-col gap-4'>
				<div>
					<p className={cn('text-xs font-semibold uppercase tracking-[0.18em]', styles.eyebrow)}>{eyebrow}</p>
					<h3 className='mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl'>{title}</h3>
					<p className='mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base'>{description}</p>
				</div>

				<div className={cn('h-1 w-20 rounded-full', styles.accent)} aria-hidden />

				<div className='grid gap-3'>
					{items.map((item) => (
						<div
							key={item.title}
							className='rounded-2xl border border-border/70 bg-background/80 p-4 backdrop-blur-sm dark:bg-card/80'>
							<div className='flex items-start gap-3'>
								<div
									className={cn(
										'inline-flex size-10 shrink-0 items-center justify-center rounded-xl border',
										styles.iconWrap,
									)}>
									<item.icon className={cn('size-4.5', styles.iconText)} aria-hidden />
								</div>
								<div>
									<h4 className='text-base font-semibold tracking-tight text-foreground md:text-lg'>{item.title}</h4>
									<p className='mt-1.5 text-sm leading-relaxed text-muted-foreground'>{item.description}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className='rounded-2xl border border-border/70 bg-background/90 p-5 dark:bg-card/85'>
					<p className='text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'>{resultLabel}</p>
					<h4 className='mt-2 text-xl font-bold tracking-tight text-foreground md:text-2xl'>{resultTitle}</h4>
					<p className='mt-2 text-sm leading-relaxed text-muted-foreground md:text-base'>{resultDescription}</p>
				</div>
			</div>
		</motion.article>
	);
}

export function PpcSpendEvolutionSection({ className }: { className?: string }) {
	return (
		<section className={cn('w-full py-14 md:py-18', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='mx-auto max-w-3xl text-center'>
					<motion.p
						variants={itemVariants}
						className='text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
						PPC Spend Evolution
					</motion.p>
					<motion.h2
						variants={itemVariants}
						className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						Shift paid media from manual friction to controlled scale
					</motion.h2>
					<motion.p
						variants={itemVariants}
						className='mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg'>
						High-performance PPC depends on tighter spend controls, cleaner attribution, and a repeatable
						experiment loop that protects margin while improving volume.
					</motion.p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-60px' }}
					className='mt-12 grid grid-cols-1 gap-6 xl:grid-cols-2'>
					<EvolutionPanel
						title='Manual PPC operations'
						eyebrow='Low efficiency'
						description='This model creates constant optimization activity, but budget discipline and decision confidence remain fragile.'
						items={MANUAL_ITEMS}
						tone='manual'
						resultLabel='Typical outcome'
						resultTitle='Higher spend variance and weaker CAC control'
						resultDescription='Performance swings are harder to stabilize, and it becomes difficult to defend where paid media is creating true commercial value.'
					/>

					<EvolutionPanel
						title='Strategic PPC system'
						eyebrow='High control'
						description='This model aligns targeting, bidding, and creative testing around measurable intent and profitable growth thresholds.'
						items={STRATEGIC_ITEMS}
						tone='strategic'
						resultLabel='Typical outcome'
						resultTitle='More predictable efficiency and scalable demand'
						resultDescription='Spend decisions stay grounded in signal quality, helping teams scale the segments that improve pipeline economics.'
					/>
				</motion.div>

				<motion.div
					variants={cardVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-30px' }}
					className='relative mt-12 overflow-hidden rounded-4xl border border-pastel-lilac-border bg-linear-to-br from-card via-background to-pastel-lilac/20 p-6 shadow-sm md:p-8'>
					<div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-pastel-lilac-strong/60 to-transparent' />
					<div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
						<div className='max-w-2xl'>
							<p className='text-xs font-semibold uppercase tracking-[0.18em] text-pastel-lilac-ink'>
								Strategic next step
							</p>
							<h3 className='mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
								Build PPC around signal quality, not manual firefighting
							</h3>
							<p className='mt-3 text-sm leading-relaxed text-muted-foreground md:text-base'>
								Tighten conversion tracking, prioritize high-value segments, and scale with guardrails that protect
								margins as demand grows.
							</p>
						</div>

						<div className='flex flex-col gap-3 sm:flex-row'>
							<Button asChild size='lg' className='group gap-2'>
								<Link href='#consultation'>
									Plan My PPC Strategy
									<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' aria-hidden />
								</Link>
							</Button>
							<Button asChild size='lg' variant='outline'>
								<Link href='/services/digital-marketing#case-studies'>View Case Studies</Link>
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
