'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, BarChart3, Megaphone, Search, ShieldCheck, Sparkles, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants, cardVariants } from '@/lib/animations';

const ICON_MAP: Record<string, LucideIcon> = {
	Search,
	BarChart3,
	Megaphone,
	Users,
	ShieldCheck,
	Sparkles,
};

export type DigitalMarketingPillar = {
	id: string;
	title: string;
	description: string;
	ctaLabel: string;
	icon: LucideIcon | string;
	theme: 'mint' | 'sky' | 'lilac' | 'peach';
};

export type DigitalMarketingProofItem = {
	title: string;
	description: string;
	icon: LucideIcon | string;
};

export type DigitalMarketingPillarsSectionProps = {
	className?: string;
	badgeLabel?: string;
	title?: string;
	description?: string;
	pillars: DigitalMarketingPillar[];
	whyItWorksTitle?: string;
	whyItWorksDescription?: string;
	whyItWorksCta?: { label: string; href: string };
	proofItems: DigitalMarketingProofItem[];
};

const THEME_STYLES: Record<
	DigitalMarketingPillar['theme'],
	{ bg: string; border: string; iconWrap: string; icon: string; accent: string }
> = {
	mint: {
		bg: 'bg-pastel-mint',
		border: 'border-pastel-mint-border',
		iconWrap: 'bg-white/70 dark:bg-black/10',
		icon: 'text-pastel-mint-ink',
		accent: 'text-pastel-mint-ink',
	},
	sky: {
		bg: 'bg-pastel-sky',
		border: 'border-pastel-sky-border',
		iconWrap: 'bg-white/70 dark:bg-black/10',
		icon: 'text-pastel-sky-ink',
		accent: 'text-pastel-sky-ink',
	},
	lilac: {
		bg: 'bg-pastel-lilac',
		border: 'border-pastel-lilac-border',
		iconWrap: 'bg-white/70 dark:bg-black/10',
		icon: 'text-pastel-lilac-ink',
		accent: 'text-pastel-lilac-ink',
	},
	peach: {
		bg: 'bg-pastel-peach',
		border: 'border-pastel-peach-border',
		iconWrap: 'bg-white/70 dark:bg-black/10',
		icon: 'text-pastel-peach-ink',
		accent: 'text-pastel-peach-ink',
	},
};

function resolveIcon(icon: LucideIcon | string): LucideIcon {
	if (typeof icon === 'string') return ICON_MAP[icon] ?? Sparkles;
	return icon;
}

export function DigitalMarketingPillarsSection({
	className,
	badgeLabel = 'Growth Pillars',
	title = 'Our Core Digital Growth Pillars',
	description = 'Strategic execution layers your acquisition, conversion, and retention systems into one predictable growth engine.',
	pillars,
	whyItWorksTitle = 'Why it works',
	whyItWorksDescription = 'Each pillar compounds the others. Search intent improves paid media efficiency, paid learnings improve retention messaging, and social amplification expands your qualified reach.',
	whyItWorksCta,
	proofItems,
}: DigitalMarketingPillarsSectionProps) {
	return (
		<section id='pillar-framework' className={cn('w-full', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='mb-14 text-center'>
					<motion.span
						variants={itemVariants}
						className='inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary'>
						{badgeLabel}
					</motion.span>
					<motion.h2
						variants={itemVariants}
						className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						{title}
					</motion.h2>
					<motion.p
						variants={itemVariants}
						className='mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg'>
						{description}
					</motion.p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-60px' }}
					className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
					{pillars.map((pillar) => {
						const Icon = resolveIcon(pillar.icon);
						const styles = THEME_STYLES[pillar.theme];

						return (
							<motion.article
								key={pillar.id}
								id={pillar.id}
								variants={cardVariants}
								className={cn(
									'rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
									styles.bg,
									styles.border,
								)}>
								<div
									className={cn(
										'mb-6 inline-flex size-12 items-center justify-center rounded-2xl border border-white/40',
										styles.iconWrap,
									)}>
									<Icon className={cn('size-6', styles.icon)} aria-hidden />
								</div>
								<h3 className='text-2xl font-bold tracking-tight text-foreground'>{pillar.title}</h3>
								<p className='mt-3 text-sm leading-relaxed text-foreground/80 dark:text-foreground/75'>
									{pillar.description}
								</p>
								<div
									className={cn(
										'mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider',
										styles.accent,
									)}>
									<span className='h-px w-7 bg-current/50' />
									{pillar.ctaLabel}
								</div>
							</motion.article>
						);
					})}
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-40px' }}
					className='mt-10'>
					<motion.div
						variants={cardVariants}
						className='relative overflow-hidden rounded-4xl border border-pastel-sky-border bg-linear-to-br from-card via-background to-pastel-sky/20 px-6 py-8 md:px-8 md:py-10'>
						<div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-pastel-sky-strong/60 to-transparent' />
						<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.1),transparent_45%)]' />
						<div className='relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
							<div className='max-w-2xl'>
								<p className='text-xs font-semibold uppercase tracking-[0.18em] text-pastel-sky-ink'>
									Why this model works
								</p>
								<h3 className='mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
									{whyItWorksTitle}
								</h3>
								<p className='mt-3 text-sm leading-relaxed text-muted-foreground md:text-base'>
									{whyItWorksDescription}
								</p>
							</div>
							{whyItWorksCta ?
								<Link
									href={whyItWorksCta.href}
									className='inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'>
									{whyItWorksCta.label}
									<ArrowRight className='size-4' aria-hidden />
								</Link>
							:	null}
						</div>
					</motion.div>

					<motion.div variants={containerVariants} className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-3'>
						{proofItems.map((item) => {
							const Icon = resolveIcon(item.icon);
							return (
								<motion.div
									key={item.title}
									variants={itemVariants}
									className='rounded-2xl border border-border bg-card/80 p-5 shadow-sm'>
									<div className='flex items-start gap-3'>
										<span className='inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary'>
											<Icon className='size-4.5' aria-hidden />
										</span>
										<div>
											<p className='font-semibold text-foreground'>{item.title}</p>
											<p className='mt-1 text-sm text-muted-foreground'>{item.description}</p>
										</div>
									</div>
								</motion.div>
							);
						})}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
