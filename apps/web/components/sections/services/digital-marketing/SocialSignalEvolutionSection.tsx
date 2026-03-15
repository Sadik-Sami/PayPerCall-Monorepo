'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Database, Globe, HeartPulse, Radar, TrendingDown, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { cardVariants, containerVariants, itemVariants } from '@/lib/animations';

type EvolutionItem = {
	title: string;
	description: string;
	icon: LucideIcon;
};

const VANITY_ITEMS: EvolutionItem[] = [
	{
		title: 'Random posting cadence',
		description: 'Content goes live without a strategic role, buyer-stage context, or a defined conversion path.',
		icon: TrendingDown,
	},
	{
		title: 'Shallow engagement',
		description: 'Likes and passive reach create activity on the dashboard but do not strengthen revenue visibility.',
		icon: HeartPulse,
	},
	{
		title: 'Broad but unfocused reach',
		description: 'Messages travel widely, but too little of that attention comes from high-intent buyers.',
		icon: Globe,
	},
];

const STRATEGIC_ITEMS: EvolutionItem[] = [
	{
		title: 'Intent-shaped content systems',
		description: 'Themes, offers, and formats are planned around awareness, consideration, and response behavior.',
		icon: Radar,
	},
	{
		title: 'First-party signal capture',
		description: 'High-value audience actions are tracked so content decisions improve with every campaign cycle.',
		icon: Database,
	},
	{
		title: 'Consistent market presence',
		description: 'A repeatable publishing system keeps your brand credible and visible across the channels that matter.',
		icon: TrendingUp,
	},
];

const PANEL_STYLES = {
	vanity: {
		shell: 'border-border/70 bg-card/95',
		eyebrow: 'text-muted-foreground',
		accent: 'bg-muted',
		iconWrap: 'border-border bg-background',
		iconText: 'text-muted-foreground',
	},
	strategic: {
		shell: 'border-pastel-sky-border bg-linear-to-br from-pastel-sky/30 via-background to-pastel-mint/25',
		eyebrow: 'text-pastel-sky-ink',
		accent: 'bg-linear-to-r from-pastel-sky-strong/80 to-pastel-mint-strong/80',
		iconWrap: 'border-pastel-sky-border bg-white/80 dark:bg-background/70',
		iconText: 'text-pastel-sky-ink',
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

export function SocialSignalEvolutionSection({ className }: { className?: string }) {
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
						Social Signal Evolution
					</motion.p>
					<motion.h2
						variants={itemVariants}
						className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						Turn social activity into a system buyers actually respond to
					</motion.h2>
					<motion.p
						variants={itemVariants}
						className='mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg'>
						The gap is not posting frequency. It is whether your social presence creates useful market signal,
						captures intent, and supports measurable demand generation.
					</motion.p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-60px' }}
					className='mt-12 grid grid-cols-1 gap-6 xl:grid-cols-2'>
					<EvolutionPanel
						title='Vanity-led social activity'
						eyebrow='Low clarity'
						description='This model creates motion, but it rarely gives operators a reliable explanation for what social is contributing to pipeline.'
						items={VANITY_ITEMS}
						tone='vanity'
						resultLabel='Typical outcome'
						resultTitle='Higher effort, weaker attribution'
						resultDescription='Teams stay busy, reporting stays noisy, and social is treated like an awareness cost instead of a demand asset.'
					/>

					<EvolutionPanel
						title='Strategic social signal'
						eyebrow='High intent'
						description='This model turns channel presence into an operating system for narrative consistency, audience learning, and downstream conversion.'
						items={STRATEGIC_ITEMS}
						tone='strategic'
						resultLabel='Typical outcome'
						resultTitle='Clearer contribution to pipeline'
						resultDescription='Content performance becomes easier to learn from, easier to optimize, and easier to defend in revenue reviews.'
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
								Build a social engine that creates signal, not just surface activity
							</h3>
							<p className='mt-3 text-sm leading-relaxed text-muted-foreground md:text-base'>
								Map channel roles, tighten the content system, and connect engagement patterns to the actions that
								actually move demand forward.
							</p>
						</div>

						<div className='flex flex-col gap-3 sm:flex-row'>
							<Button asChild size='lg' className='group gap-2'>
								<Link href='#consultation'>
									Plan My Social Strategy
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
