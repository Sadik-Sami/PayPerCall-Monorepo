'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, FlaskConical, Rocket, Search, Settings2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants, cardVariants } from '@/lib/animations';

const ICON_MAP: Record<string, LucideIcon> = {
	Search,
	Settings2,
	FlaskConical,
	Rocket,
	Sparkles,
};

export type GrowthMatrixStep = {
	step: string;
	title: string;
	description: string;
	tagline: string;
	icon: LucideIcon | string;
	theme: 'sky' | 'lilac' | 'peach' | 'mint';
};

export type DigitalMarketingGrowthMatrixSectionProps = {
	className?: string;
	badgeLabel?: string;
	title?: string;
	description?: string;
	steps: GrowthMatrixStep[];
	ctaTitle?: string;
	ctaDescription?: string;
	primaryCta?: { label: string; href: string };
	secondaryCta?: { label: string; href: string };
};

const THEME_STYLES: Record<GrowthMatrixStep['theme'], { bg: string; border: string; icon: string; badge: string }> = {
	sky: {
		bg: 'bg-pastel-sky',
		border: 'border-pastel-sky-border',
		icon: 'text-pastel-sky-ink',
		badge: 'text-pastel-sky-ink/40',
	},
	lilac: {
		bg: 'bg-pastel-lilac',
		border: 'border-pastel-lilac-border',
		icon: 'text-pastel-lilac-ink',
		badge: 'text-pastel-lilac-ink/40',
	},
	peach: {
		bg: 'bg-pastel-peach',
		border: 'border-pastel-peach-border',
		icon: 'text-pastel-peach-ink',
		badge: 'text-pastel-peach-ink/40',
	},
	mint: {
		bg: 'bg-pastel-mint',
		border: 'border-pastel-mint-border',
		icon: 'text-pastel-mint-ink',
		badge: 'text-pastel-mint-ink/40',
	},
};

function resolveIcon(icon: LucideIcon | string): LucideIcon {
	if (typeof icon === 'string') return ICON_MAP[icon] ?? Sparkles;
	return icon;
}

export function DigitalMarketingGrowthMatrixSection({
	className,
	badgeLabel = 'Strategic Execution',
	title = 'The 4-Step Digital Growth Sprint',
	description = 'A structured roadmap that compounds insights across SEO, paid media, lifecycle, and conversion systems.',
	steps,
	ctaTitle = 'Ready to accelerate your pipeline?',
	ctaDescription = 'Deploy this sprint framework to move from campaign guesswork to measurable, repeatable revenue growth.',
	primaryCta,
	secondaryCta,
}: DigitalMarketingGrowthMatrixSectionProps) {
	return (
		<section id='growth-sprint' className={cn('w-full', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-70px' }}
					className='mx-auto mb-14 max-w-3xl text-center'>
					<motion.span
						variants={itemVariants}
						className='inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary'>
						{badgeLabel}
					</motion.span>
					<motion.h2
						variants={itemVariants}
						className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl'>
						{title}
					</motion.h2>
					<motion.p variants={itemVariants} className='mt-5 text-base leading-relaxed text-muted-foreground md:text-lg'>
						{description}
					</motion.p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-50px' }}
					className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{steps.map((step, index) => {
						const Icon = resolveIcon(step.icon);
						const styles = THEME_STYLES[step.theme];

						return (
							<motion.article
								key={step.step}
								variants={cardVariants}
								className={cn(
									'relative rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
									styles.bg,
									styles.border,
								)}>
								<div className='mb-8 flex items-start justify-between'>
									<div className='inline-flex size-11 items-center justify-center rounded-2xl border border-white/40 bg-white/70 dark:bg-black/10'>
										<Icon className={cn('size-5', styles.icon)} aria-hidden />
									</div>
									<span className={cn('text-5xl font-black tracking-tight', styles.badge)}>{step.step}</span>
								</div>
								<h3 className='text-2xl font-bold tracking-tight text-foreground'>{step.title}</h3>
								<p className='mt-3 text-sm leading-relaxed text-foreground/80 dark:text-foreground/75'>
									{step.description}
								</p>
								<p className='mt-5 text-xs font-bold uppercase tracking-wider text-primary'>{step.tagline}</p>
								<span className='absolute bottom-3 right-4 text-sm font-medium text-foreground/50'>{index + 1}/4</span>
							</motion.article>
						);
					})}
				</motion.div>

				<div className='relative mt-12 hidden h-px bg-border md:block'>
					<div className='absolute inset-0 grid grid-cols-4'>
						{steps.map((step, index) => (
							<div key={step.step} className='relative'>
								<span className='absolute -top-3 left-1/2 inline-flex size-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm'>
									{index + 1}
								</span>
								<span className='absolute top-6 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
									{step.title.split(' ')[0]}
								</span>
							</div>
						))}
					</div>
				</div>

				<motion.div
					variants={cardVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-30px' }}
					className='relative mt-20 overflow-hidden rounded-4xl border border-slate-800/60 bg-slate-900 px-7 py-12 text-center md:px-12 md:py-16'>
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.22),transparent_45%)]' />
					<div className='relative z-10 mx-auto max-w-3xl'>
						<h3 className='text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl'>{ctaTitle}</h3>
						<p className='mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg'>
							{ctaDescription}
						</p>
						{primaryCta || secondaryCta ?
							<div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
								{primaryCta ?
									<Link
										href={primaryCta.href}
										className='inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5'>
										{primaryCta.label}
										<ArrowRight className='size-4' aria-hidden />
									</Link>
								:	null}
								{secondaryCta ?
									<Link
										href={secondaryCta.href}
										className='inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/15'>
										{secondaryCta.label}
									</Link>
								:	null}
							</div>
						:	null}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
