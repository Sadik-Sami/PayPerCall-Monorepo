'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Database, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { springContainer, springItem } from '@/lib/animations';

const FEATURES = [
	{
		title: 'Precision Logic',
		description: 'Behavior-triggered messaging timed to user intent and lifecycle stage.',
		icon: Zap,
	},
	{
		title: 'Retention Control',
		description: 'Segmentation and sequencing tuned to repeat purchase and churn prevention.',
		icon: ShieldCheck,
	},
	{
		title: 'Scalable Automation',
		description: 'Workflow architecture that expands cleanly as lists and offers grow.',
		icon: Database,
	},
];

export function EmailRetentionHero({ className }: { className?: string }) {
	const reduceMotion = useReducedMotion();
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : springContainer;
	const itemAnimation = reduceMotion ? { hidden: {}, visible: {} } : springItem;

	return (
		<section className={cn('relative overflow-hidden py-14 md:py-18 lg:py-24', className)}>
			<div className='absolute inset-0 -z-10 bg-linear-to-b from-pastel-peach/60 via-background to-background' />
			<div className='absolute -left-20 top-10 -z-10 size-80 rounded-full bg-pastel-peach/65 blur-3xl' />
			<div className='absolute -right-20 bottom-0 -z-10 size-80 rounded-full bg-pastel-mint/55 blur-3xl' />

			<motion.div variants={containerAnimation} initial='hidden' animate='visible' className='section-container'>
				<div className='rounded-3xl border border-pastel-peach-border bg-background/55 p-6 shadow-sm backdrop-blur-sm md:p-8 lg:p-10'>
					<motion.div
						variants={itemAnimation}
						className='mx-auto inline-flex items-center gap-2 rounded-full border border-pastel-peach-border bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-pastel-peach-ink'>
						<span className='size-2 rounded-full bg-pastel-peach-strong' />
						The Gold Standard in Retention
					</motion.div>

					<motion.h1
						variants={itemAnimation}
						className='mx-auto mt-6 max-w-4xl text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl'>
						Turn One-Time Leads into{' '}
						<span className='bg-linear-to-r from-pastel-peach-strong to-primary bg-clip-text text-transparent'>
							Perpetual Assets
						</span>
					</motion.h1>

					<motion.p
						variants={itemAnimation}
						className='mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-muted-foreground md:text-lg'>
						Engineered retention infrastructure that maximizes customer lifetime value through precision lifecycle
						automation.
					</motion.p>

					<motion.div variants={itemAnimation} className='mt-8 flex flex-wrap justify-center gap-3 md:gap-4'>
						<Button asChild size='lg' className='group gap-2'>
							<Link href='#consultation'>
								Build My Infrastructure
								<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Link>
						</Button>
						<Button asChild size='lg' variant='outline'>
							<Link href='#consultation'>View Methodology</Link>
						</Button>
					</motion.div>

					<div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{FEATURES.map((feature) => (
							<motion.article
								key={feature.title}
								variants={itemAnimation}
								className='rounded-2xl border border-pastel-peach-border bg-background/65 p-5 backdrop-blur-sm'>
								<div className='inline-flex size-9 items-center justify-center rounded-xl border border-pastel-peach-border bg-pastel-peach/70 text-pastel-peach-ink'>
									<feature.icon className='size-4' aria-hidden />
								</div>
								<h2 className='mt-4 text-base font-semibold text-foreground'>{feature.title}</h2>
								<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{feature.description}</p>
							</motion.article>
						))}
					</div>
				</div>
			</motion.div>
		</section>
	);
}
