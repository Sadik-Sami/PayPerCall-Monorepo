'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, FileSearch, Radar, Search, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';
import { springContainer, springItem } from '@/lib/animations';

const PILLARS = ['Technical foundation', 'Topical authority', 'Intent-to-conversion mapping'];

const HERO_METRICS = [
	{ value: '94%', label: 'crawl readiness', tone: 'sky' },
	{ value: '18', label: 'priority clusters', tone: 'lilac' },
	{ value: '+31%', label: 'lead-path lift', tone: 'mint' },
] as const;

const SEO_SYSTEM_STEPS: Array<{
	title: string;
	description: string;
	icon: LucideIcon;
	tone: 'sky' | 'lilac' | 'mint';
}> = [
	{
		title: 'Resolve crawl blockers',
		description: 'Fix indexation friction and site structure before scaling content.',
		icon: FileSearch,
		tone: 'sky',
	},
	{
		title: 'Build topical depth',
		description: 'Expand authority with keyword clusters mapped to buyer journeys.',
		icon: Radar,
		tone: 'lilac',
	},
	{
		title: 'Convert demand faster',
		description: 'Align page messaging and internal paths with high-intent search traffic.',
		icon: TrendingUp,
		tone: 'mint',
	},
];

const TONE_STYLES = {
	sky: {
		card: 'border-pastel-sky-border bg-pastel-sky/45',
		icon: 'border-pastel-sky-border bg-pastel-sky/65 text-pastel-sky-ink',
		label: 'text-pastel-sky-ink',
	},
	lilac: {
		card: 'border-pastel-lilac-border bg-pastel-lilac/45',
		icon: 'border-pastel-lilac-border bg-pastel-lilac/65 text-pastel-lilac-ink',
		label: 'text-pastel-lilac-ink',
	},
	mint: {
		card: 'border-pastel-mint-border bg-pastel-mint/45',
		icon: 'border-pastel-mint-border bg-pastel-mint/65 text-pastel-mint-ink',
		label: 'text-pastel-mint-ink',
	},
} as const;

export function SeoAuthorityHero({ className }: { className?: string }) {
	const reduceMotion = useReducedMotion();
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : springContainer;
	const itemAnimation = reduceMotion ? { hidden: {}, visible: {} } : springItem;

	return (
		<section className={cn('relative overflow-hidden py-14 md:py-18 lg:py-24', className)}>
			<div className='absolute inset-0 -z-10 bg-linear-to-br from-pastel-mint/35 via-background via-55% to-pastel-sky/20' />
			<div className='absolute -left-20 top-8 -z-10 size-72 rounded-full bg-pastel-mint/55 blur-3xl' />
			<div className='absolute right-0 top-18 -z-10 size-80 rounded-full bg-pastel-lilac/40 blur-3xl' />
			<div className='absolute left-1/2 top-1/3 -z-10 h-64 w-64 -translate-x-1/2 rounded-full border border-pastel-sky-border/40 bg-pastel-sky/15 blur-2xl' />

			<motion.div
				variants={containerAnimation}
				initial='hidden'
				animate='visible'
				className='section-container grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12'>
				<div className='max-w-2xl'>
					<motion.div
						variants={itemAnimation}
						className='inline-flex items-center gap-2 rounded-full border border-pastel-sky-border bg-pastel-sky/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-pastel-sky-ink'>
						<Radar className='size-3.5' aria-hidden />
						Authority Optimization
					</motion.div>

					<motion.h1
						variants={itemAnimation}
						className='mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl'>
						Stop Renting Traffic. Build Organic Authority That Lasts
					</motion.h1>

					<motion.p
						variants={itemAnimation}
						className='mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg'>
						Reference-inspired SEO architecture that aligns crawling, content depth, and buyer intent so rankings
						convert into qualified pipeline.
					</motion.p>

					<motion.div variants={itemAnimation} className='mt-7 flex flex-wrap gap-2.5'>
						{PILLARS.map((item) => (
							<span
								key={item}
								className='inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/75 px-3 py-1.5 text-sm text-foreground'>
								<span className='size-1.5 rounded-full bg-primary' />
								{item}
							</span>
						))}
					</motion.div>

					<motion.div variants={itemAnimation} className='mt-8 flex flex-wrap gap-3 md:gap-4'>
						<Button asChild size='lg' className='group gap-2'>
							<Link href='#consultation'>
								Claim SEO Consultation
								<ArrowRight data-icon='inline-end' className='transition-transform group-hover:translate-x-1' />
							</Link>
						</Button>
						<Button asChild size='lg' variant='outline'>
							<Link href='#consultation'>Get SEO Audit Plan</Link>
						</Button>
					</motion.div>

					<motion.div variants={itemAnimation} className='mt-8 grid gap-3 sm:grid-cols-3'>
						{HERO_METRICS.map((metric) => {
							const tone = TONE_STYLES[metric.tone];

							return (
								<div key={metric.label} className={cn('rounded-2xl border p-4 shadow-sm', tone.card)}>
									<div className='text-2xl font-bold tracking-tight text-foreground'>{metric.value}</div>
									<div className={cn('mt-1 text-[11px] font-semibold uppercase tracking-[0.18em]', tone.label)}>
										{metric.label}
									</div>
								</div>
							);
						})}
					</motion.div>
				</div>

				<motion.aside variants={itemAnimation}>
					<Card className='overflow-hidden rounded-[28px] border-pastel-lilac-border bg-pastel-lilac/40 py-0 shadow-sm'>
						<CardHeader className='gap-4 border-b border-border/50 px-5 py-5 sm:px-6'>
							<div className='flex flex-wrap items-center justify-between gap-3'>
								<div>
									<div className='inline-flex items-center gap-2 rounded-full border border-pastel-lilac-border bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-pastel-lilac-ink'>
										<Sparkles className='size-3.5' aria-hidden />
										SEO Operating System
									</div>
									<CardTitle className='mt-3 text-xl tracking-tight sm:text-2xl'>
										From technical cleanup to conversion-ready authority
									</CardTitle>
								</div>
								<div className='rounded-2xl border border-pastel-mint-border bg-pastel-mint/55 px-4 py-3 text-right'>
									<div className='text-[11px] font-semibold uppercase tracking-[0.16em] text-pastel-mint-ink'>
										Execution Window
									</div>
									<div className='mt-1 text-2xl font-bold tracking-tight text-foreground'>6-8 weeks</div>
								</div>
							</div>
							<CardDescription className='max-w-xl text-sm leading-relaxed'>
								Prioritize the fixes, content clusters, and page improvements most likely to expand qualified
								search demand first.
							</CardDescription>
						</CardHeader>
						<CardContent className='px-5 py-5 sm:px-6 sm:py-6'>
							<div className='rounded-3xl border border-border/60 bg-background/85 p-4 sm:p-5'>
								<div className='flex items-center justify-between gap-3'>
									<div className='inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-pastel-sky-ink'>
										<Search className='size-3.5' aria-hidden />
										Search Growth Sequence
									</div>
									<div className='text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
										Highest-impact first
									</div>
								</div>
								<div className='mt-5 grid gap-3'>
									{SEO_SYSTEM_STEPS.map((step, index) => {
										const tone = TONE_STYLES[step.tone];
										const Icon = step.icon;

										return (
											<div key={step.title} className='relative'>
												{index < SEO_SYSTEM_STEPS.length - 1 ? (
													<div className='absolute left-5 top-12 h-[calc(100%-0.5rem)] w-px bg-border/70' aria-hidden />
												) : null}
												<div className='grid grid-cols-[auto_1fr] gap-3'>
													<div
														className={cn(
															'glass-icon flex size-10 items-center justify-center rounded-2xl border',
															tone.icon,
														)}>
														<Icon className='size-4.5' aria-hidden />
													</div>
													<div className={cn('rounded-2xl border p-4 shadow-sm', tone.card)}>
														<div className='text-sm font-semibold text-foreground'>{step.title}</div>
														<p className='mt-1 text-sm leading-relaxed text-muted-foreground'>{step.description}</p>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>

							<div className='mt-4 grid gap-3 sm:grid-cols-2'>
								<div className='rounded-2xl border border-pastel-sky-border bg-pastel-sky/50 p-4'>
									<div className='inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-pastel-sky-ink'>
										<Search className='size-3.5' aria-hidden />
										Search Coverage
									</div>
									<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
										Technical fixes and content clusters prioritized by growth impact, not vanity volume.
									</p>
								</div>
								<div className='rounded-2xl border border-pastel-mint-border bg-pastel-mint/50 p-4'>
									<div className='inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-pastel-mint-ink'>
										<ShieldCheck className='size-3.5' aria-hidden />
										Authority Signals
									</div>
									<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
										SERP trust compounds when editorial quality, internal linking, and on-page clarity move
										together.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.aside>
			</motion.div>
		</section>
	);
}
