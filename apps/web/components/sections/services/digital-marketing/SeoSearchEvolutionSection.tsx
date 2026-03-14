'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
	ArrowRight,
	Calculator,
	Eye,
	Sparkles,
	Target,
	TrendingDown,
	Users,
} from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { cardVariants, containerVariants, itemVariants } from '@/lib/animations';

const STRUGGLE_ITEMS = [
	{
		title: 'Algorithmic Volatility',
		description: 'Living at the mercy of core update shifts that wipe out rankings overnight.',
		icon: TrendingDown,
	},
	{
		title: 'Vanity Metrics',
		description: 'Celebrating impressions and clicks that never translate into qualified pipeline.',
		icon: Eye,
	},
	{
		title: 'Low-Intent Traffic',
		description: 'Attracting window shoppers who consume content but are not ready to buy.',
		icon: Users,
	},
];

const SOLUTION_ITEMS = [
	{
		title: 'Mathematical Dominance',
		description: 'Engineered SEO systems built on data patterns that outlast manual algorithm reactions.',
		icon: Calculator,
		tone: 'mint',
	},
	{
		title: 'High-Intent Capture',
		description: 'Targeting commercial queries and buyer-stage keywords used by decision-makers.',
		icon: Target,
		tone: 'sky',
	},
	{
		title: 'Evergreen Equity',
		description: 'Building durable digital assets that compound visibility and revenue over time.',
		icon: Sparkles,
		tone: 'lilac',
	},
] as const;

const SOLUTION_TONE: Record<
	(typeof SOLUTION_ITEMS)[number]['tone'],
	{ card: string; border: string; iconWrap: string; iconText: string }
> = {
	mint: {
		card: 'bg-pastel-mint/55',
		border: 'border-pastel-mint-border',
		iconWrap: 'bg-pastel-mint border-pastel-mint-border',
		iconText: 'text-pastel-mint-ink',
	},
	sky: {
		card: 'bg-pastel-sky/55',
		border: 'border-pastel-sky-border',
		iconWrap: 'bg-pastel-sky border-pastel-sky-border',
		iconText: 'text-pastel-sky-ink',
	},
	lilac: {
		card: 'bg-pastel-lilac/55',
		border: 'border-pastel-lilac-border',
		iconWrap: 'bg-pastel-lilac border-pastel-lilac-border',
		iconText: 'text-pastel-lilac-ink',
	},
};

export function SeoSearchEvolutionSection({ className }: { className?: string }) {
	return (
		<section className={cn('w-full py-14 md:py-18', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='mx-auto max-w-4xl text-center'>
					<motion.p
						variants={itemVariants}
						className='text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground'>
						The Evolution of Search
					</motion.p>
					<motion.h2
						variants={itemVariants}
						className='mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl'>
						Stop Chasing Algorithms.
						<br />
						<span className='bg-linear-to-r from-pastel-mint-strong via-pastel-sky-strong to-pastel-lilac-strong bg-clip-text text-transparent'>
							Start Dominating Markets.
						</span>
					</motion.h2>
					<motion.p variants={itemVariants} className='mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground'>
						Move from reactive SEO to a defensible, revenue-qualified search infrastructure built for sustained
						growth.
					</motion.p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-50px' }}
					className='mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2'>
					<div className='space-y-5'>
						<motion.h3
							variants={itemVariants}
							className='px-1 text-xl font-bold uppercase tracking-[0.08em] text-muted-foreground'>
							The Struggle
						</motion.h3>
						{STRUGGLE_ITEMS.map((item) => (
							<motion.article
								key={item.title}
								variants={cardVariants}
								className='rounded-3xl border border-border bg-card p-7 shadow-sm'>
								<div className='inline-flex size-10 items-center justify-center rounded-xl border border-border bg-muted/60'>
									<item.icon className='size-5 text-muted-foreground' aria-hidden />
								</div>
								<h4 className='mt-5 text-4xl font-bold tracking-tight text-foreground'>{item.title}</h4>
								<p className='mt-3 text-lg leading-relaxed text-muted-foreground'>{item.description}</p>
							</motion.article>
						))}
					</div>

					<div className='space-y-5'>
						<motion.h3
							variants={itemVariants}
							className='px-1 text-xl font-bold uppercase tracking-[0.08em] text-pastel-mint-ink'>
							CoreCloser Solution
						</motion.h3>
						{SOLUTION_ITEMS.map((item) => {
							const tone = SOLUTION_TONE[item.tone];
							return (
								<motion.article
									key={item.title}
									variants={cardVariants}
									className={cn('rounded-3xl border p-7 shadow-sm', tone.card, tone.border)}>
									<div className={cn('inline-flex size-10 items-center justify-center rounded-xl border', tone.iconWrap)}>
										<item.icon className={cn('size-5', tone.iconText)} aria-hidden />
									</div>
									<h4 className='mt-5 text-4xl font-bold tracking-tight text-foreground'>{item.title}</h4>
									<p className='mt-3 text-lg leading-relaxed text-foreground/80 dark:text-foreground/75'>
										{item.description}
									</p>
								</motion.article>
							);
						})}
					</div>
				</motion.div>

				<motion.div
					variants={cardVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-30px' }}
					className='relative mt-12 overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900 p-7 md:p-10'>
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.15),transparent_45%)]' />
					<div className='relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
						<div className='max-w-xl'>
							<h4 className='text-3xl font-bold tracking-tight text-white'>The Difference Is Strategic Infrastructure</h4>
							<p className='mt-2 text-base leading-relaxed text-slate-200'>
								Traffic spikes come and go. Search infrastructure compounds authority, intent quality, and
								revenue stability.
							</p>
						</div>
						<div className='flex flex-col gap-3 sm:flex-row'>
							<Button asChild size='lg' className='group gap-2'>
								<Link href='#consultation'>
									Build My SEO Infrastructure
									<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' aria-hidden />
								</Link>
							</Button>
							<Button
								asChild
								size='lg'
								variant='outline'
								className='border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white'>
								<Link href='/services/digital-marketing#case-studies'>View Case Studies</Link>
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
