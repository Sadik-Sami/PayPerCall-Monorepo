'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Megaphone, Radio, TrendingUp } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { springContainer, springItem } from '@/lib/animations';

const SIGNAL_ITEMS = [
	{ label: 'Signal Strength', value: '+142%' },
	{ label: 'Qualified Engagement', value: '+2.1x' },
	{ label: 'Narrative Consistency', value: '94%' },
];

export function SocialSignalHero({ className }: { className?: string }) {
	const reduceMotion = useReducedMotion();
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : springContainer;
	const itemAnimation = reduceMotion ? { hidden: {}, visible: {} } : springItem;

	return (
		<section className={cn('relative overflow-hidden py-14 md:py-18 lg:py-24', className)}>
			<div className='absolute inset-0 -z-10 bg-linear-to-b from-pastel-sky/35 via-background to-pastel-lilac/20' />
			<div className='absolute left-1/2 top-1/2 -z-10 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pastel-sky-border/60 bg-pastel-sky/20' />
			<div className='absolute left-1/2 top-1/2 -z-10 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pastel-lilac-border/45 bg-pastel-lilac/20' />

			<motion.div variants={containerAnimation} initial='hidden' animate='visible' className='section-container'>
				<div className='mx-auto max-w-5xl text-center'>
					<motion.div
						variants={itemAnimation}
						className='inline-flex items-center gap-2 rounded-full border border-pastel-sky-border bg-pastel-sky/55 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-pastel-sky-ink'>
						<Radio className='size-3.5' aria-hidden />
						Brand Signal Architecture
					</motion.div>

					<motion.h1
						variants={itemAnimation}
						className='mx-auto mt-6 max-w-4xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl'>
						Dominate the Narrative and Convert Social Attention Into Demand
					</motion.h1>

					<motion.p
						variants={itemAnimation}
						className='mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg'>
						Social growth systems inspired by your reference direction: consistent messaging, platform-native content,
						and measurable conversion pathways.
					</motion.p>

					<motion.div variants={itemAnimation} className='mt-8 flex flex-wrap justify-center gap-3 md:gap-4'>
						<Button asChild size='lg' className='group gap-2'>
							<Link href='#consultation'>
								Launch Authority Signal
								<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Link>
						</Button>
						<Button asChild size='lg' variant='outline'>
							<Link href='#consultation'>Get Social Consultation</Link>
						</Button>
					</motion.div>
				</div>

				<motion.div
					variants={itemAnimation}
					className='mx-auto mt-10 max-w-5xl rounded-3xl border border-pastel-sky-border bg-pastel-sky/40 p-4 shadow-sm'>
					<div className='overflow-hidden rounded-2xl border border-border/50 bg-background/85 p-4'>
						<div className='mb-4 flex items-center justify-between border-b border-border/60 pb-3'>
							<div className='text-xs font-semibold uppercase tracking-[0.14em] text-pastel-sky-ink'>
								Signal Dashboard
							</div>
							<div className='text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
								Live Narrative Feed
							</div>
						</div>
						<div className='grid gap-3 md:grid-cols-[minmax(9rem,1fr)_minmax(0,2.25fr)] md:gap-4 lg:grid-cols-[minmax(11rem,1fr)_minmax(0,2.2fr)]'>
							<div className='hidden space-y-2 md:block'>
								<div className='h-3 rounded bg-pastel-sky/55' />
								<div className='h-3 w-4/5 rounded bg-muted' />
								<div className='h-3 w-5/6 rounded bg-muted' />
							</div>
							<div>
								<div className='relative h-40 rounded-xl border border-border/60 bg-background/80 p-4 sm:h-44'>
									<div className='absolute right-4 top-4 rounded-xl border border-pastel-mint-border bg-pastel-mint/75 px-3 py-2 text-left'>
										<div className='text-[10px] font-semibold uppercase tracking-wide text-pastel-mint-ink'>
											Signal Strength
										</div>
										<div className='text-lg font-bold text-foreground'>+142% Authority</div>
									</div>
									<div className='mt-14 flex h-24 items-end gap-2'>
										<div className='h-10 w-full rounded-t bg-pastel-sky/65' />
										<div className='h-14 w-full rounded-t bg-pastel-sky/75' />
										<div className='h-20 w-full rounded-t bg-primary/75' />
										<div className='h-12 w-full rounded-t bg-pastel-sky/70' />
										<div className='h-16 w-full rounded-t bg-primary/85' />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='mt-4 grid gap-3 sm:grid-cols-3 md:gap-4'>
						{SIGNAL_ITEMS.map((item, index) => (
							<div
								key={item.label}
								className={cn(
									'rounded-xl border p-3 text-left',
									index === 0 ? 'border-pastel-lilac-border bg-pastel-lilac/55'
									: index === 1 ? 'border-pastel-mint-border bg-pastel-mint/55'
									: 'border-pastel-peach-border bg-pastel-peach/55',
								)}>
								<div className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
									{index === 0 ?
										<TrendingUp className='size-3.5' aria-hidden />
									: index === 1 ?
										<Megaphone className='size-3.5' aria-hidden />
									:	<Radio className='size-3.5' aria-hidden />}
									{item.label}
								</div>
								<p className='mt-2 text-lg font-semibold text-foreground'>{item.value}</p>
							</div>
						))}
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
