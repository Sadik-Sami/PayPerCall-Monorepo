'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Radar, Search, ShieldCheck } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { springContainer, springItem } from '@/lib/animations';

const PILLARS = ['Technical foundation', 'Topical authority', 'Intent-to-conversion mapping'];

export function SeoAuthorityHero({ className }: { className?: string }) {
	const reduceMotion = useReducedMotion();
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : springContainer;
	const itemAnimation = reduceMotion ? { hidden: {}, visible: {} } : springItem;

	return (
		<section className={cn('relative overflow-hidden py-16 lg:py-24', className)}>
			<div className='absolute inset-0 -z-10 bg-linear-to-b from-pastel-mint/35 via-background to-pastel-sky/20' />
			<div className='absolute left-1/2 top-10 -z-10 size-[28rem] -translate-x-1/2 rounded-full border border-pastel-sky-border/50 bg-pastel-sky/30 blur-2xl' />
			<div className='absolute left-1/2 top-24 -z-10 size-80 -translate-x-1/2 rounded-full border border-pastel-lilac-border/50 bg-pastel-lilac/30 blur-xl' />

			<motion.div variants={containerAnimation} initial='hidden' animate='visible' className='section-container'>
				<div className='mx-auto max-w-5xl text-center'>
					<motion.div
						variants={itemAnimation}
						className='inline-flex items-center gap-2 rounded-full border border-pastel-sky-border bg-pastel-sky/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-pastel-sky-ink'>
						<Radar className='size-3.5' aria-hidden />
						Authority Optimization
					</motion.div>

					<motion.h1
						variants={itemAnimation}
						className='mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
						Stop Renting Traffic. Build Organic Authority That Lasts
					</motion.h1>

					<motion.p variants={itemAnimation} className='mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
						Reference-inspired SEO architecture that aligns crawling, content depth, and buyer intent so rankings convert into qualified pipeline.
					</motion.p>

					<motion.div variants={itemAnimation} className='mt-7 flex flex-wrap justify-center gap-2.5'>
						{PILLARS.map((item) => (
							<span
								key={item}
								className='inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/75 px-3 py-1.5 text-sm text-foreground'>
								<span className='size-1.5 rounded-full bg-primary' />
								{item}
							</span>
						))}
					</motion.div>

					<motion.div variants={itemAnimation} className='mt-8 flex flex-wrap justify-center gap-3'>
						<Button asChild size='lg' className='group gap-2'>
							<Link href='#consultation'>
								Claim SEO Consultation
								<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Link>
						</Button>
						<Button asChild size='lg' variant='outline'>
							<Link href='#consultation'>Get SEO Audit Plan</Link>
						</Button>
					</motion.div>
				</div>

				<motion.div variants={itemAnimation} className='mx-auto mt-10 max-w-5xl'>
					<div className='relative overflow-hidden rounded-3xl border border-pastel-mint-border bg-pastel-mint/45 p-6 shadow-sm'>
						<div className='mx-auto flex size-64 items-center justify-center rounded-full border border-pastel-sky-border bg-background/70 sm:size-72'>
							<div className='relative flex size-44 items-center justify-center rounded-full border border-pastel-lilac-border bg-pastel-lilac/35 sm:size-52'>
								<div className='size-24 rounded-full border border-primary/25 bg-primary/8 sm:size-28' />
								<div className='absolute -left-6 top-6 size-10 rounded-xl border border-pastel-mint-border bg-pastel-mint/70' />
								<div className='absolute -right-8 top-16 size-12 rounded-full border border-pastel-sky-border bg-pastel-sky/70' />
								<div className='absolute -bottom-7 left-10 size-10 rounded-lg border border-pastel-lilac-border bg-pastel-lilac/80' />
							</div>
						</div>
						<div className='mt-4 grid gap-3 sm:grid-cols-2'>
							<div className='rounded-xl border border-pastel-sky-border bg-pastel-sky/50 p-3 text-left'>
								<div className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-pastel-sky-ink'>
									<Search className='size-3.5' aria-hidden />
									Search Coverage
								</div>
								<p className='mt-1 text-sm text-muted-foreground'>Technical fixes and content clusters prioritized by growth impact.</p>
							</div>
							<div className='rounded-xl border border-pastel-mint-border bg-pastel-mint/50 p-3 text-left'>
								<div className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-pastel-mint-ink'>
									<ShieldCheck className='size-3.5' aria-hidden />
									Authority Signals
								</div>
								<p className='mt-1 text-sm text-muted-foreground'>SERP trust accelerates when technical and editorial quality are unified.</p>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
