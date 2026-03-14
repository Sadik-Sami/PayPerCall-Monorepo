'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Database, Globe, HeartPulse, Radar, Target, TrendingDown, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { cardVariants, containerVariants, itemVariants } from '@/lib/animations';

type VanityItem = {
	title: string;
	description: string;
	variant: 'full' | 'half';
	icon?: LucideIcon;
};

const VANITY_ITEMS: VanityItem[] = [
	{
		title: 'Random Posting Schedule',
		description: 'Post-and-pray execution with no narrative arc or buyer-stage alignment.',
		variant: 'full',
	},
	{
		title: 'Empty Likes',
		description: 'Engagement signals without meaningful business impact.',
		icon: HeartPulse,
		variant: 'half',
	},
	{
		title: 'Broad Reach',
		description: 'Visible to everyone, relevant to too few high-intent buyers.',
		icon: Globe,
		variant: 'half',
	},
];

type StrategicItem = {
	title: string;
	description: string;
	variant: 'full' | 'half';
	tone: 'lilac' | 'sky' | 'mint';
	icon?: LucideIcon;
};

const STRATEGIC_ITEMS: StrategicItem[] = [
	{
		title: 'Intent-Based Content Clusters',
		description: 'Narratives engineered to move prospects from awareness to booking-ready signals.',
		variant: 'full',
		tone: 'sky',
	},
	{
		title: 'First-Party Data',
		description: 'Identify high-value decision-makers engaging with strategic content touchpoints.',
		icon: Database,
		variant: 'half',
		tone: 'lilac',
	},
	{
		title: 'Omnipresence',
		description: 'Stay top-of-mind across LinkedIn, X, and Instagram with consistent strategic signal.',
		icon: Radar,
		variant: 'half',
		tone: 'mint',
	},
];

const STRATEGIC_TONES: Record<
	StrategicItem['tone'],
	{ card: string; border: string; iconWrap: string; iconColor: string; textColor: string }
> = {
	sky: {
		card: 'bg-pastel-sky/55',
		border: 'border-pastel-sky-border',
		iconWrap: 'bg-pastel-sky border-pastel-sky-border',
		iconColor: 'text-pastel-sky-ink',
		textColor: 'text-pastel-sky-ink',
	},
	lilac: {
		card: 'bg-pastel-lilac/55',
		border: 'border-pastel-lilac-border',
		iconWrap: 'bg-pastel-lilac border-pastel-lilac-border',
		iconColor: 'text-pastel-lilac-ink',
		textColor: 'text-pastel-lilac-ink',
	},
	mint: {
		card: 'bg-pastel-mint/55',
		border: 'border-pastel-mint-border',
		iconWrap: 'bg-pastel-mint border-pastel-mint-border',
		iconColor: 'text-pastel-mint-ink',
		textColor: 'text-pastel-mint-ink',
	},
};

export function SocialSignalEvolutionSection({ className }: { className?: string }) {
	return (
		<section className={cn('w-full py-14 md:py-18', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='mx-auto max-w-4xl text-center'>
					<motion.h2
						variants={itemVariants}
						className='font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl'>
						Social Media{' '}
						<span className='bg-linear-to-r from-pastel-sky-strong via-primary to-pastel-lilac-strong bg-clip-text text-transparent'>
							Signal Evolution
						</span>
					</motion.h2>
					<motion.p
						variants={itemVariants}
						className='mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg'>
						Transform digital noise into attributable revenue through strategic omnipresence and intent-led content
						systems.
					</motion.p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-60px' }}
					className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-2'>
					<div className='flex h-full flex-col gap-5'>
						<motion.div variants={itemVariants} className='flex items-center gap-3'>
							<div className='inline-flex size-10 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10'>
								<TrendingDown className='size-5 text-destructive' aria-hidden />
							</div>
							<h3 className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
								Vanity Posting <span className='ml-1 text-lg font-medium text-destructive'>(Low ROI)</span>
							</h3>
						</motion.div>
						<div className='grid h-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2'>
							{VANITY_ITEMS.map((item) => (
								<motion.article
									key={item.title}
									variants={cardVariants}
									className={cn(
										'rounded-2xl border border-border bg-card p-5 shadow-sm',
										item.variant === 'full' && 'sm:col-span-2',
									)}>
									{item.icon ?
										<div className='inline-flex size-10 items-center justify-center rounded-xl border border-border bg-muted/60'>
											<item.icon className='size-5 text-muted-foreground' aria-hidden />
										</div>
									:	null}
									<h4
										className={cn(
											'text-2xl font-bold tracking-tight text-foreground sm:text-3xl',
											item.icon ? 'mt-4' : '',
										)}>
										{item.title}
									</h4>
									<p className='mt-2 text-base leading-relaxed text-muted-foreground'>{item.description}</p>
								</motion.article>
							))}
							<motion.article
								variants={cardVariants}
								className='flex h-full min-h-52 flex-col justify-center rounded-2xl border border-pastel-blush-border bg-pastel-blush/30 p-6 text-center shadow-sm sm:col-span-2'>
								<p className='text-xs font-bold uppercase tracking-[0.18em] text-destructive'>The Result</p>
								<h4 className='mt-3 text-3xl font-bold tracking-tight text-destructive sm:text-4xl md:text-5xl'>
									Unattributed Spend
								</h4>
								<p className='mt-2 text-base leading-relaxed text-destructive/85'>
									CAC rises, pipeline clarity drops, and social investment becomes difficult to justify in revenue
									reviews.
								</p>
							</motion.article>
						</div>
					</div>

					<div className='space-y-5'>
						<motion.div variants={itemVariants} className='flex items-center gap-3'>
							<div className='inline-flex size-10 items-center justify-center rounded-xl border border-pastel-mint-border bg-pastel-mint/60'>
								<TrendingUp className='size-5 text-pastel-mint-ink' aria-hidden />
							</div>
							<h3 className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
								Strategic Omnipresence{' '}
								<span className='ml-1 text-lg font-medium text-pastel-mint-ink'>(High Intent)</span>
							</h3>
						</motion.div>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							{STRATEGIC_ITEMS.map((item) => {
								const tone = STRATEGIC_TONES[item.tone];
								return (
									<motion.article
										key={item.title}
										variants={cardVariants}
										className={cn(
											'rounded-2xl border p-5 shadow-sm',
											tone.card,
											tone.border,
											item.variant === 'full' && 'sm:col-span-2',
										)}>
										{item.icon ?
											<div
												className={cn(
													'inline-flex size-10 items-center justify-center rounded-xl border',
													tone.iconWrap,
												)}>
												<item.icon className={cn('size-5', tone.iconColor)} aria-hidden />
											</div>
										:	<div className='h-1.5 w-16 rounded-full bg-primary/55' aria-hidden />}
										<h4
											className={cn(
												'text-2xl font-bold tracking-tight text-foreground sm:text-3xl',
												item.icon ? 'mt-4' : 'mt-5',
											)}>
											{item.title}
										</h4>
										<p className='mt-2 text-base leading-relaxed text-foreground/80 dark:text-foreground/75'>
											{item.description}
										</p>
									</motion.article>
								);
							})}
							<motion.article
								variants={cardVariants}
								className='rounded-2xl border border-pastel-mint-border bg-pastel-mint/85 p-6 text-center shadow-sm sm:col-span-2'>
								<p className='text-xs font-bold uppercase tracking-[0.18em] text-pastel-mint-ink'>The Result</p>
								<h4 className='mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
									Attributable Revenue
								</h4>
								<p className='mt-2 text-base leading-relaxed text-foreground/80'>
									Predictable pipeline growth powered by strategic signal capture.
								</p>
							</motion.article>
						</div>
					</div>
				</motion.div>

				<motion.div
					variants={cardVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-30px' }}
					className='mx-auto mt-12 max-w-3xl rounded-3xl border border-border bg-card p-7 shadow-sm'>
					<div className='flex flex-col items-center justify-between gap-5 sm:flex-row'>
						<div>
							<p className='text-lg text-muted-foreground'>Ready to evolve your signals?</p>
							<p className='text-3xl font-bold tracking-tight text-foreground'>Bridge Signal to Revenue</p>
						</div>
						<div className='flex flex-col gap-3 sm:flex-row'>
							<Button asChild size='lg' className='group gap-2'>
								<Link href='#consultation'>
									Bridge Signal to Revenue
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
