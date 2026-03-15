'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Calculator, Eye, Search, Sparkles, TrendingDown, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { cardVariants, containerVariants, itemVariants } from '@/lib/animations';

type EvolutionItem = {
	title: string;
	description: string;
	icon: LucideIcon;
};

const REACTIVE_ITEMS: EvolutionItem[] = [
	{
		title: 'Algorithm-led reactions',
		description: 'SEO priorities shift after every update instead of following a stable operating framework.',
		icon: TrendingDown,
	},
	{
		title: 'Vanity reporting',
		description: 'Impressions and traffic totals rise in visibility while qualified intent remains unclear.',
		icon: Eye,
	},
	{
		title: 'Low-value traffic patterns',
		description: 'Content attracts broad interest but does not consistently connect with buyers close to action.',
		icon: Users,
	},
];

const STRATEGIC_ITEMS: EvolutionItem[] = [
	{
		title: 'Technical search discipline',
		description: 'Crawl health, site structure, and performance issues are fixed in the order that unlocks growth.',
		icon: Search,
	},
	{
		title: 'Intent-led content mapping',
		description: 'Topic clusters are built around commercial relevance, buyer-stage needs, and conversion pathways.',
		icon: Calculator,
	},
	{
		title: 'Compounding authority assets',
		description: 'Pages, links, and internal architecture reinforce one another so visibility becomes more durable over time.',
		icon: Sparkles,
	},
];

const PANEL_STYLES = {
	reactive: {
		shell: 'border-border/70 bg-card/95',
		eyebrow: 'text-muted-foreground',
		accent: 'bg-muted',
		iconWrap: 'border-border bg-background',
		iconText: 'text-muted-foreground',
	},
	strategic: {
		shell: 'border-pastel-mint-border bg-linear-to-br from-pastel-mint/30 via-background to-pastel-sky/20',
		eyebrow: 'text-pastel-mint-ink',
		accent: 'bg-linear-to-r from-pastel-mint-strong/80 to-pastel-sky-strong/80',
		iconWrap: 'border-pastel-mint-border bg-white/80 dark:bg-background/70',
		iconText: 'text-pastel-mint-ink',
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

export function SeoSearchEvolutionSection({ className }: { className?: string }) {
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
						Search Evolution
					</motion.p>
					<motion.h2
						variants={itemVariants}
						className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						Move SEO from reactive cleanup to durable market visibility
					</motion.h2>
					<motion.p
						variants={itemVariants}
						className='mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg'>
						Strong search performance comes from technical clarity, intent-led content structure, and systems that
						continue compounding after the first lift.
					</motion.p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-60px' }}
					className='mt-12 grid grid-cols-1 gap-6 xl:grid-cols-2'>
					<EvolutionPanel
						title='Reactive SEO operations'
						eyebrow='Low stability'
						description='This model keeps teams busy responding to symptoms, but it rarely creates a clear path to sustainable organic growth.'
						items={REACTIVE_ITEMS}
						tone='reactive'
						resultLabel='Typical outcome'
						resultTitle='Unsteady rankings, unclear pipeline impact'
						resultDescription='Work expands, priorities keep shifting, and it becomes harder to explain how organic search is improving commercial outcomes.'
					/>

					<EvolutionPanel
						title='Strategic search infrastructure'
						eyebrow='High durability'
						description='This model aligns technical fixes, content planning, and site architecture around qualified search demand and long-term authority.'
						items={STRATEGIC_ITEMS}
						tone='strategic'
						resultLabel='Typical outcome'
						resultTitle='More resilient visibility and better intent quality'
						resultDescription='Organic growth becomes easier to defend because rankings, traffic quality, and conversion pathways improve together.'
					/>
				</motion.div>

				<motion.div
					variants={cardVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-30px' }}
					className='relative mt-12 overflow-hidden rounded-4xl border border-pastel-mint-border bg-linear-to-br from-card via-background to-pastel-mint/20 p-6 shadow-sm md:p-8'>
					<div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-pastel-mint-strong/60 to-transparent' />
					<div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
						<div className='max-w-2xl'>
							<p className='text-xs font-semibold uppercase tracking-[0.18em] text-pastel-mint-ink'>
								Strategic next step
							</p>
							<h3 className='mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
								Build SEO around structure, not algorithm anxiety
							</h3>
							<p className='mt-3 text-sm leading-relaxed text-muted-foreground md:text-base'>
								Prioritize the technical blockers, content systems, and search intent coverage that create durable
								organic momentum.
							</p>
						</div>

						<div className='flex flex-col gap-3 sm:flex-row'>
							<Button asChild size='lg' className='group gap-2'>
								<Link href='#consultation'>
									Plan My SEO Strategy
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
