'use client';

import { motion } from 'framer-motion';
import { Activity, ArrowRight, LineChart, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants, cardVariants } from '@/lib/animations';

export type SuccessBlueprintKpi = {
	label: string;
	value: string;
};

export type SuccessBlueprintMiniMetric = {
	label: string;
	value: string;
	description: string;
	bars?: number[];
};

export type IntegratedSuccessBlueprintsData = {
	badgeLabel: string;
	title: string;
	description: string;
	topCta: { label: string; href: string };
	featured: {
		eyebrow: string;
		title: string;
		description: string;
		kpis: SuccessBlueprintKpi[];
		ctaLabel: string;
		ctaHref: string;
	};
	audit: {
		title: string;
		description: string;
		ctaLabel: string;
		ctaHref: string;
	};
	retention: {
		eyebrow: string;
		title: string;
		description: string;
		progressLabel: string;
		progressValue: number;
	};
	roadmap: {
		eyebrow: string;
		title: string;
		description: string;
		scoreLabel: string;
		scoreValue: string;
		complexityLabel: string;
		complexityValue: string;
		ctaLabel: string;
		ctaHref: string;
	};
	miniMetrics: [SuccessBlueprintMiniMetric, SuccessBlueprintMiniMetric];
	spotlight: {
		title: string;
		description: string;
		ctaLabel: string;
		ctaHref: string;
	};
	footerLink: { label: string; href: string };
};

type IntegratedSuccessBlueprintsSectionProps = {
	className?: string;
	data: IntegratedSuccessBlueprintsData;
};

export function IntegratedSuccessBlueprintsSection({ className, data }: IntegratedSuccessBlueprintsSectionProps) {
	return (
		<section id='integrated-success-blueprints' className={cn('w-full', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-70px' }}
					className='mx-auto mb-12 max-w-3xl text-center'>
					<motion.span
						variants={itemVariants}
						className='inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary'>
						{data.badgeLabel}
					</motion.span>
					<motion.h2
						variants={itemVariants}
						className='mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl'>
						{data.title}
					</motion.h2>
					<motion.p variants={itemVariants} className='mt-5 text-lg leading-relaxed text-muted-foreground'>
						{data.description}
					</motion.p>
					<motion.div variants={itemVariants} className='mt-7'>
						<Link
							href={data.topCta.href}
							className='inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5'>
							{data.topCta.label}
							<ArrowRight className='size-4' aria-hidden />
						</Link>
					</motion.div>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-50px' }}
					className='grid grid-cols-1 gap-5 lg:grid-cols-12'>
					<motion.article
						variants={cardVariants}
						className='lg:col-span-8 rounded-3xl border border-pastel-sky-border bg-pastel-sky p-7 shadow-sm md:p-8'>
						<div className='inline-flex rounded-full border border-pastel-sky-border bg-background/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-pastel-sky-ink'>
							{data.featured.eyebrow}
						</div>
						<h3 className='mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl'>
							{data.featured.title}
						</h3>
						<p className='mt-4 max-w-2xl text-base leading-relaxed text-foreground/80 dark:text-foreground/75'>
							{data.featured.description}
						</p>
						<div className='mt-8 flex flex-wrap items-end justify-between gap-6'>
							<div className='flex flex-wrap gap-5'>
								{data.featured.kpis.map((kpi, index) => (
									<div key={kpi.label} className={cn('min-w-24', index > 0 && 'border-l border-border/70 pl-5')}>
										<p className='text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground'>{kpi.label}</p>
										<p className='mt-1 text-2xl font-black tracking-tight text-foreground'>{kpi.value}</p>
									</div>
								))}
							</div>
							<Link
								href={data.featured.ctaHref}
								className='inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted'>
								{data.featured.ctaLabel}
								<ArrowRight className='size-4' aria-hidden />
							</Link>
						</div>
					</motion.article>

					<motion.article
						variants={cardVariants}
						className='lg:col-span-4 rounded-3xl border border-pastel-lilac-border bg-pastel-lilac p-7 shadow-sm md:p-8'>
						<div className='mb-6 inline-flex size-11 items-center justify-center rounded-2xl border border-white/40 bg-white/70 dark:bg-black/10'>
							<LineChart className='size-5 text-pastel-lilac-ink' aria-hidden />
						</div>
						<h3 className='text-2xl font-bold tracking-tight text-foreground'>{data.audit.title}</h3>
						<p className='mt-3 text-sm leading-relaxed text-foreground/80 dark:text-foreground/75'>
							{data.audit.description}
						</p>
						<Link
							href={data.audit.ctaHref}
							className='mt-8 inline-flex w-full items-center justify-between rounded-2xl border border-border/70 bg-card/80 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card'>
							<span>{data.audit.ctaLabel}</span>
							<ArrowRight className='size-4' aria-hidden />
						</Link>
					</motion.article>

					<motion.article
						variants={cardVariants}
						className='lg:col-span-4 rounded-3xl border border-pastel-mint-border bg-pastel-mint p-7 shadow-sm md:p-8'>
						<div className='inline-flex items-center rounded-full border border-pastel-mint-border bg-background/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-pastel-mint-ink'>
							{data.retention.eyebrow}
						</div>
						<h3 className='mt-4 text-3xl font-bold tracking-tight text-foreground'>{data.retention.title}</h3>
						<p className='mt-3 text-sm leading-relaxed text-foreground/80 dark:text-foreground/75'>
							{data.retention.description}
						</p>
						<div className='mt-7'>
							<div className='h-2 w-full overflow-hidden rounded-full bg-border/70'>
								<div
									className='h-full rounded-full bg-pastel-mint-strong'
									style={{ width: `${data.retention.progressValue}%` }}
								/>
							</div>
							<p className='mt-2 text-xs font-bold uppercase tracking-wide text-pastel-mint-ink'>
								{data.retention.progressLabel}
							</p>
						</div>
					</motion.article>

					<motion.article
						variants={cardVariants}
						className='lg:col-span-8 rounded-3xl border border-pastel-peach-border bg-pastel-peach p-7 shadow-sm md:p-8'>
						<div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
							<div className='max-w-2xl'>
								<div className='inline-flex items-center rounded-full border border-pastel-peach-border bg-background/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-pastel-peach-ink'>
									{data.roadmap.eyebrow}
								</div>
								<h3 className='mt-4 text-3xl font-bold tracking-tight text-foreground'>{data.roadmap.title}</h3>
								<p className='mt-3 text-base leading-relaxed text-foreground/80 dark:text-foreground/75'>
									{data.roadmap.description}
								</p>
							</div>
							<div className='w-full rounded-2xl border border-border/70 bg-card/70 p-5 md:max-w-64'>
								<div className='flex items-center justify-between'>
									<span className='text-sm text-muted-foreground'>{data.roadmap.scoreLabel}</span>
									<span className='text-base font-bold text-foreground'>{data.roadmap.scoreValue}</span>
								</div>
								<div className='mt-2 flex items-center justify-between'>
									<span className='text-sm text-muted-foreground'>{data.roadmap.complexityLabel}</span>
									<span className='text-base font-bold text-foreground'>{data.roadmap.complexityValue}</span>
								</div>
								<Link
									href={data.roadmap.ctaHref}
									className='mt-4 inline-flex w-full items-center justify-center rounded-xl bg-foreground px-4 py-2 text-sm font-bold text-background transition-opacity hover:opacity-90'>
									{data.roadmap.ctaLabel}
								</Link>
							</div>
						</div>
					</motion.article>

					{data.miniMetrics.map((metric, index) => (
						<motion.article
							key={metric.label}
							variants={cardVariants}
							className={cn(
								'rounded-3xl border border-border bg-card p-6 shadow-sm',
								index === 0 ? 'lg:col-span-3' : 'lg:col-span-3',
							)}>
							<p className='text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground'>{metric.label}</p>
							<p className='mt-2 text-4xl font-black tracking-tight text-foreground'>{metric.value}</p>
							<p className='mt-2 text-xs leading-relaxed text-muted-foreground'>{metric.description}</p>
							{index === 0 ?
								<div className='mt-5 flex h-10 items-end gap-1'>
									{(metric.bars ?? [45, 56, 68, 78, 88]).map((height, barIndex) => (
										<span
											key={`${metric.label}-${height}-${barIndex}`}
											className='w-full rounded-t-sm bg-primary/70'
											style={{ height: `${height}%`, opacity: 0.35 + barIndex * 0.12 }}
										/>
									))}
								</div>
							:	null}
						</motion.article>
					))}

					<motion.article
						variants={cardVariants}
						className='relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900 p-7 text-white shadow-sm lg:col-span-6 md:p-8'>
						<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.25),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.22),transparent_45%)]' />
						<div className='relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between'>
							<div className='max-w-xl'>
								<div className='inline-flex size-11 items-center justify-center rounded-2xl border border-white/25 bg-white/10'>
									<Zap className='size-5 text-white' aria-hidden />
								</div>
								<h3 className='mt-4 text-3xl font-bold tracking-tight'>{data.spotlight.title}</h3>
								<p className='mt-3 text-sm leading-relaxed text-slate-200'>{data.spotlight.description}</p>
							</div>
							<Link
								href={data.spotlight.ctaHref}
								className='inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5'>
								{data.spotlight.ctaLabel}
								<ArrowRight className='size-4' aria-hidden />
							</Link>
						</div>
					</motion.article>
				</motion.div>

				<motion.div
					variants={itemVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-40px' }}
					className='mt-10 flex justify-center'>
					<Link
						href={data.footerLink.href}
						className='inline-flex items-center gap-2 text-base font-bold text-primary transition-colors hover:text-primary/85'>
						{data.footerLink.label}
						<ArrowRight className='size-4' aria-hidden />
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
