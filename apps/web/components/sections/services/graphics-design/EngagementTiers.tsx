'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

export interface EngagementTier {
	name: string;
	positioning: string;
	inclusions: string[];
	bestFor: string;
	accent: Accent;
	cta: { label: string; href: string };
	featured?: boolean;
}

export interface EngagementTiersProps {
	eyebrow: string;
	headline: string;
	description?: string;
	tiers: EngagementTier[];
	className?: string;
}

const RIBBON: Record<Accent, string> = {
	mint: 'bg-pastel-mint-strong',
	sky: 'bg-pastel-sky-strong',
	lilac: 'bg-pastel-lilac-strong',
	peach: 'bg-pastel-peach-strong',
	blush: 'bg-pastel-blush-strong',
	lime: 'bg-pastel-lime-strong',
};

const RING: Record<Accent, string> = {
	mint: 'border-pastel-mint-border hover:border-pastel-mint-strong',
	sky: 'border-pastel-sky-border hover:border-pastel-sky-strong',
	lilac: 'border-pastel-lilac-border hover:border-pastel-lilac-strong',
	peach: 'border-pastel-peach-border hover:border-pastel-peach-strong',
	blush: 'border-pastel-blush-border hover:border-pastel-blush-strong',
	lime: 'border-pastel-lime-border hover:border-pastel-lime-strong',
};

const CHIP: Record<Accent, string> = {
	mint: 'bg-pastel-mint border-pastel-mint-border text-pastel-mint-ink',
	sky: 'bg-pastel-sky border-pastel-sky-border text-pastel-sky-ink',
	lilac: 'bg-pastel-lilac border-pastel-lilac-border text-pastel-lilac-ink',
	peach: 'bg-pastel-peach border-pastel-peach-border text-pastel-peach-ink',
	blush: 'bg-pastel-blush border-pastel-blush-border text-pastel-blush-ink',
	lime: 'bg-pastel-lime border-pastel-lime-border text-pastel-lime-ink',
};

const LILAC_CTA =
	'bg-pastel-lilac text-pastel-lilac-ink border border-pastel-lilac-border hover:bg-pastel-lilac-strong/40 hover:text-pastel-lilac-ink';

export function EngagementTiers({ eyebrow, headline, description, tiers, className }: EngagementTiersProps) {
	return (
		<section className={cn('relative w-full overflow-hidden', className)}>
			<div className='section-container'>
				<div className='mx-auto mb-12 max-w-3xl text-center sm:mb-14'>
					<p className='text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>{eyebrow}</p>
					<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						{headline}
					</h2>
					{description && (
						<p className='mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
							{description}
						</p>
					)}
				</div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='mx-auto grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6'
				>
					{tiers.map((tier) => (
						<motion.article
							key={tier.name}
							variants={itemVariants}
							className={cn(
								'group relative flex flex-col overflow-hidden rounded-3xl border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-9',
								RING[tier.accent],
							)}
						>
							<span className={cn('absolute inset-x-0 top-0 h-1.5', RIBBON[tier.accent])} />

							{tier.featured && (
								<span
									className={cn(
										'mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]',
										CHIP[tier.accent],
									)}
								>
									<Sparkles className='size-3.5' />
									Most picked
								</span>
							)}

							<h3 className='font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
								{tier.name}
							</h3>
							<p className='mt-2 text-base leading-relaxed text-muted-foreground'>{tier.positioning}</p>

							<ul className='mt-6 flex flex-col gap-3'>
								{tier.inclusions.map((line) => (
									<li key={line} className='flex items-start gap-3'>
										<span className={cn('mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border', CHIP[tier.accent])}>
											<Check className='size-3.5' strokeWidth={2.5} />
										</span>
										<span className='text-sm font-medium text-foreground sm:text-[15px]'>{line}</span>
									</li>
								))}
							</ul>

							<p className='mt-7 border-t border-border/50 pt-5 text-sm italic text-muted-foreground'>
								<span className='font-semibold not-italic text-foreground'>Best for:</span> {tier.bestFor}
							</p>

							<div className='mt-6'>
								<Button
									asChild
									size='lg'
									className={cn('w-full rounded-xl', tier.accent === 'lilac' && LILAC_CTA)}
								>
									<Link href={tier.cta.href}>
										{tier.cta.label}
										<ArrowRight className='size-4' />
									</Link>
								</Button>
							</div>
						</motion.article>
					))}
				</motion.div>
			</div>
		</section>
	);
}
