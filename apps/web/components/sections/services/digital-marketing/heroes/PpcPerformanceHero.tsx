'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Gauge, Target, TrendingUp } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { springContainer, springItem } from '@/lib/animations';

const METRICS = [
	{ label: 'Bid Efficiency', value: '85%' },
	{ label: 'Median CAC Shift', value: '-24%' },
	{ label: 'ROAS Stability', value: '3.6x' },
];

export function PpcPerformanceHero({ className }: { className?: string }) {
	const reduceMotion = useReducedMotion();
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : springContainer;
	const itemAnimation = reduceMotion ? { hidden: {}, visible: {} } : springItem;

	return (
		<section className={cn('relative overflow-hidden py-14 md:py-18 lg:py-24', className)}>
			<div className='absolute inset-0 -z-10 bg-linear-to-br from-pastel-sky/35 via-background to-pastel-lilac/25' />
			<div className='absolute -left-16 top-0 -z-10 size-72 rounded-full bg-pastel-sky/70 blur-3xl' />
			<div className='absolute -right-16 bottom-0 -z-10 size-72 rounded-full bg-pastel-lilac/65 blur-3xl' />

			<motion.div
				variants={containerAnimation}
				initial='hidden'
				animate='visible'
				className='section-container grid items-center gap-8 lg:grid-cols-[1.04fr_0.96fr]'>
				<div className='space-y-6'>
					<motion.div
						variants={itemAnimation}
						className='inline-flex items-center gap-2 rounded-full border border-pastel-sky-border bg-pastel-sky/55 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-pastel-sky-ink'>
						<Gauge className='size-3.5' aria-hidden />
						PPC Performance Engine
					</motion.div>

					<motion.h1
						variants={itemAnimation}
						className='font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl'>
						Precision Paid Media for Predictable Pipeline Growth
					</motion.h1>

					<motion.p
						variants={itemAnimation}
						className='max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg'>
						Reference-driven campaign systems that combine bid control, audience quality, and conversion intent to
						improve CAC and scale confidently.
					</motion.p>

					<motion.div variants={itemAnimation} className='flex flex-wrap gap-3 md:gap-4'>
						<Button asChild size='lg' className='group gap-2'>
							<Link href='#consultation'>
								Analyze My PPC Program
								<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Link>
						</Button>
						<Button asChild size='lg' variant='outline'>
							<Link href='#consultation'>Request PPC Consultation</Link>
						</Button>
					</motion.div>

					<div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
						{METRICS.map((metric) => (
							<motion.div
								key={metric.label}
								variants={itemAnimation}
								className='rounded-2xl border border-pastel-sky-border bg-background/70 p-4'>
								<div className='text-xl font-bold text-foreground'>{metric.value}</div>
								<div className='mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
									{metric.label}
								</div>
							</motion.div>
						))}
					</div>
				</div>

				<motion.aside
					variants={itemAnimation}
					className='rounded-3xl border border-pastel-lilac-border bg-pastel-lilac/45 p-4 shadow-sm'>
					<div className='rounded-2xl border border-border/50 bg-background/85 p-5'>
						<div className='mb-4 flex items-center justify-between'>
							<div className='text-xs font-semibold uppercase tracking-[0.14em] text-pastel-sky-ink'>
								Optimizing Bids
							</div>
							<div className='text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
								Real-Time Feed
							</div>
						</div>
						<div className='relative mx-auto flex size-52 items-center justify-center rounded-full border border-border/60 bg-background/90'>
							<svg className='absolute inset-0 size-full -rotate-90' viewBox='0 0 100 100' aria-hidden>
								<circle cx='50' cy='50' r='44' fill='none' className='stroke-border' strokeWidth='8' />
								<motion.circle
									cx='50'
									cy='50'
									r='44'
									fill='none'
									className='stroke-primary'
									strokeWidth='8'
									strokeLinecap='round'
									strokeDasharray='276'
									initial={{ strokeDashoffset: 276 }}
									animate={{ strokeDashoffset: 42 }}
									transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
								/>
							</svg>
							<div className='text-center'>
								<div className='text-4xl font-bold tracking-tight text-foreground'>85%</div>
								<div className='mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
									Efficiency
								</div>
							</div>
						</div>
					</div>
					<div className='mt-4 grid gap-3 sm:grid-cols-2'>
						<div className='rounded-xl border border-pastel-sky-border bg-pastel-sky/50 p-3'>
							<div className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-pastel-sky-ink'>
								<Target className='size-3.5' aria-hidden />
								Target CPA
							</div>
							<p className='mt-2 text-lg font-semibold text-foreground'>$14.20 benchmark</p>
						</div>
						<div className='rounded-xl border border-pastel-mint-border bg-pastel-mint/50 p-3'>
							<div className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-pastel-mint-ink'>
								<TrendingUp className='size-3.5' aria-hidden />
								Winning Bid
							</div>
							<p className='mt-2 text-lg font-semibold text-foreground'>$2.45 active range</p>
						</div>
					</div>
				</motion.aside>
			</motion.div>
		</section>
	);
}
