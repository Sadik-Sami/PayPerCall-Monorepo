'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight, CheckCircle2, Clock3, EyeOff, Gauge, Target, Zap } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { cardVariants, containerVariants, itemVariants } from '@/lib/animations';

type ComparisonRow = {
	focus: string;
	focusHint: string;
	manual: {
		title: string;
		description: string;
		icon: typeof ArrowDownRight;
	};
	automated: {
		title: string;
		description: string;
		icon: typeof CheckCircle2;
		tone: 'lilac' | 'sky' | 'mint';
	};
};

const ROWS: ComparisonRow[] = [
	{
		focus: 'Efficiency',
		focusHint: 'Capital allocation strategy',
		manual: {
			title: 'Budget Bleed',
			description: 'Unoptimized spend across low-intent keywords and overlapping campaign clusters.',
			icon: ArrowDownRight,
		},
		automated: {
			title: 'Zero-Waste Spend',
			description: 'Dynamic budget shifting toward profitable segments based on real-time signal quality.',
			icon: CheckCircle2,
			tone: 'lilac',
		},
	},
	{
		focus: 'Intelligence',
		focusHint: 'Data clarity and attribution',
		manual: {
			title: 'Tracking Blindness',
			description: 'Fragmented measurement leaves critical conversion touchpoints unattributed or delayed.',
			icon: EyeOff,
		},
		automated: {
			title: 'Cookieless Attribution',
			description: 'First-party modeling captures full-funnel influence and improves optimization confidence.',
			icon: Target,
			tone: 'sky',
		},
	},
	{
		focus: 'Workflow',
		focusHint: 'Operational velocity',
		manual: {
			title: 'Reactive Adjustments',
			description: 'Manual bid changes lag behind market movement and miss high-intent windows.',
			icon: Clock3,
		},
		automated: {
			title: 'Predictive Scaling',
			description: 'AI-assisted bidding anticipates demand shifts before cost spikes and conversion decay.',
			icon: Zap,
			tone: 'mint',
		},
	},
];

const AUTOMATED_TONES: Record<
	ComparisonRow['automated']['tone'],
	{ cellBg: string; iconWrap: string; iconColor: string; titleColor: string }
> = {
	lilac: {
		cellBg: 'bg-pastel-lilac/35',
		iconWrap: 'bg-pastel-lilac border-pastel-lilac-border',
		iconColor: 'text-pastel-lilac-ink',
		titleColor: 'text-pastel-lilac-ink',
	},
	sky: {
		cellBg: 'bg-pastel-sky/35',
		iconWrap: 'bg-pastel-sky border-pastel-sky-border',
		iconColor: 'text-pastel-sky-ink',
		titleColor: 'text-pastel-sky-ink',
	},
	mint: {
		cellBg: 'bg-pastel-mint/35',
		iconWrap: 'bg-pastel-mint border-pastel-mint-border',
		iconColor: 'text-pastel-mint-ink',
		titleColor: 'text-pastel-mint-ink',
	},
};

export function PpcSpendEvolutionSection({ className }: { className?: string }) {
	return (
		<section className={cn('w-full py-14 md:py-18', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='mx-auto max-w-4xl text-center'>
					<motion.span
						variants={itemVariants}
						className='inline-flex rounded-full border border-pastel-lilac-border bg-pastel-lilac/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-pastel-lilac-ink'>
						Performance Comparison
					</motion.span>
					<motion.h2
						variants={itemVariants}
						className='mt-5 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl'>
						PPC Spend{' '}
						<span className='bg-linear-to-r from-pastel-lilac-strong via-pastel-sky-strong to-pastel-mint-strong bg-clip-text text-transparent'>
							Evolution
						</span>
					</motion.h2>
					<motion.p
						variants={itemVariants}
						className='mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg'>
						Analyze the shift from manual performance friction to automated efficiency. Stop spend leakage and scale
						with precision.
					</motion.p>
				</motion.div>

				<motion.section
					variants={cardVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-60px' }}
					className='mt-12 overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm'>
					<div className='hidden grid-cols-[0.27fr_0.365fr_0.365fr] border-b border-border/70 md:grid'>
						<div className='px-8 py-7'>
							<p className='text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground'>Metric Focus</p>
						</div>
						<div className='border-l border-border/60 px-8 py-7'>
							<div className='inline-flex items-center gap-2'>
								<span className='size-2 rounded-full bg-destructive/75' />
								<p className='text-2xl font-bold tracking-tight text-foreground'>Manual Grind</p>
							</div>
							<p className='mt-1 text-sm text-muted-foreground'>Legacy Logic (Inefficient)</p>
						</div>
						<div className='border-l border-border/60 bg-pastel-lilac/30 px-8 py-7'>
							<div className='inline-flex items-center gap-2'>
								<span className='size-2 rounded-full bg-pastel-lilac-strong' />
								<p className='text-2xl font-bold tracking-tight text-pastel-lilac-ink'>Automated Scale</p>
							</div>
							<p className='mt-1 text-sm text-muted-foreground'>Modern Logic (Optimized)</p>
						</div>
					</div>

					<div className='divide-y divide-border/60'>
						{ROWS.map((row) => {
							const tone = AUTOMATED_TONES[row.automated.tone];
							return (
								<div key={row.focus} className='grid grid-cols-1 md:grid-cols-[0.27fr_0.365fr_0.365fr]'>
									<div className='px-6 py-6 md:px-8 md:py-8'>
										<p className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl'>
											{row.focus}
										</p>
										<p className='mt-1 text-sm text-muted-foreground'>{row.focusHint}</p>
									</div>
									<div className='border-t border-border/60 px-6 py-6 md:border-l md:border-t-0 md:px-8 md:py-8'>
										<div className='flex items-start gap-3'>
											<div className='mt-0.5 inline-flex size-9 items-center justify-center rounded-lg border border-destructive/25 bg-destructive/10'>
												<row.manual.icon className='size-4 text-destructive' aria-hidden />
											</div>
											<div>
												<p className='text-xl font-semibold tracking-tight text-foreground'>{row.manual.title}</p>
												<p className='mt-2 text-base leading-relaxed text-muted-foreground md:text-lg'>
													{row.manual.description}
												</p>
											</div>
										</div>
									</div>
									<div
										className={cn(
											'border-t border-border/60 px-6 py-6 md:border-l md:border-t-0 md:px-8 md:py-8',
											tone.cellBg,
										)}>
										<div className='flex items-start gap-3'>
											<div
												className={cn(
													'mt-0.5 inline-flex size-9 items-center justify-center rounded-lg border',
													tone.iconWrap,
												)}>
												<row.automated.icon className={cn('size-4', tone.iconColor)} aria-hidden />
											</div>
											<div>
												<p className={cn('text-xl font-semibold tracking-tight', tone.titleColor)}>
													{row.automated.title}
												</p>
												<p className='mt-2 text-base leading-relaxed text-foreground/75 dark:text-foreground/70 md:text-lg'>
													{row.automated.description}
												</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</motion.section>

				<motion.div
					variants={cardVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-30px' }}
					className='mx-auto mt-10 max-w-3xl rounded-2xl border border-pastel-lilac-border bg-card p-6 shadow-sm'>
					<div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
						<p className='text-base text-muted-foreground md:text-lg'>
							Ready to transition from <span className='font-semibold text-foreground'>Grind</span> to{' '}
							<span className='font-semibold text-pastel-lilac-ink'>Scale</span>?
						</p>
						<div className='flex flex-col gap-3 sm:flex-row'>
							<Button asChild size='lg' className='group gap-2'>
								<Link href='#consultation'>
									Build My PPC Infrastructure
									<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' aria-hidden />
								</Link>
							</Button>
							<Button asChild size='lg' variant='outline'>
								<Link href='/services/digital-marketing#case-studies'>
									<Gauge className='size-4' aria-hidden />
									View Case Studies
								</Link>
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
