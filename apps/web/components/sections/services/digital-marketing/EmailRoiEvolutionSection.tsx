'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Activity, AlertTriangle, ArrowRight, Database, ShieldCheck, TrendingUp, X, Zap } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { cardVariants, containerVariants, itemVariants } from '@/lib/animations';

type LeakStage = {
	label: string;
	lossLabel: string;
	progressWidth: string;
	severity: 'critical' | 'elevated' | 'high';
};

const LEAK_STAGES: LeakStage[] = [
	{ label: 'Ad Traffic', lossLabel: '-40% Drop-off', progressWidth: '58%', severity: 'critical' },
	{ label: 'Email Opt-in', lossLabel: 'Inconsistent Flow', progressWidth: '39%', severity: 'elevated' },
	{ label: 'First Purchase', lossLabel: 'High Abandonment', progressWidth: '20%', severity: 'high' },
];

const LEAK_SEVERITY_STYLES: Record<LeakStage['severity'], { dot: string; text: string }> = {
	critical: { dot: 'bg-destructive', text: 'text-destructive' },
	elevated: { dot: 'bg-pastel-peach-strong', text: 'text-pastel-peach-ink' },
	high: { dot: 'bg-pastel-blush-strong', text: 'text-pastel-blush-ink' },
};

const LEAK_BULLETS = [
	'Disconnected ESP + CRM profiles create blind spots in lifecycle targeting.',
	'Retention decisions rely on partial signals instead of complete behavior context.',
];

const RETENTION_BULLETS = [
	'Automated retention loops trigger from real behavior, not static lists.',
	'Unified segmentation and orchestration scale predictable LTV lift over time.',
];

export function EmailRoiEvolutionSection({ className }: { className?: string }) {
	return (
		<section className={cn('w-full py-14 md:py-18', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='mx-auto max-w-3xl text-center'>
					<motion.h2
						variants={itemVariants}
						className='font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						The Evolution of Email ROI
					</motion.h2>
					<motion.p variants={itemVariants} className='mt-4 text-base leading-relaxed text-muted-foreground md:text-lg'>
						Stop losing revenue to fragmented systems. Upgrade from a leaky funnel to a retention infrastructure
						designed for compounding LTV.
					</motion.p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-60px' }}
					className='mt-12 grid grid-cols-1 gap-5 md:gap-7 lg:grid-cols-2'>
					<motion.article
						variants={cardVariants}
						className='relative overflow-hidden rounded-3xl border border-border bg-muted/35 p-6 md:p-8'>
						<div className='relative z-10'>
							<span className='inline-flex rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-destructive'>
								The Status Quo
							</span>
							<h3 className='mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl'>
								The Funnel Leak
							</h3>
							<p className='mt-2 text-base text-muted-foreground'>Fragmented tools and disconnected data streams.</p>
						</div>

						<div className='relative z-10 mt-7 space-y-5'>
							<div className='inline-flex items-center gap-2 rounded-full border border-destructive/25 bg-destructive/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-destructive'>
								<AlertTriangle className='size-3.5' aria-hidden />
								Estimated Revenue Leakage: 41%
							</div>

							<div className='relative rounded-2xl border border-destructive/20 bg-card/75 p-4'>
								<div className='pointer-events-none absolute bottom-4 left-1/2 top-4 w-1 -translate-x-1/2 rounded-full bg-linear-to-b from-destructive/40 via-destructive/20 to-transparent' />
								{LEAK_STAGES.map((stage, index) => {
									const severityStyles = LEAK_SEVERITY_STYLES[stage.severity];
									return (
										<div
											key={stage.label}
											className={cn(
												index > 0 && 'mt-4',
												'relative rounded-xl border border-border/60 bg-background/70 p-4',
											)}>
											<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
												<span className='text-base font-medium text-foreground'>{stage.label}</span>
												<div className='inline-flex items-center gap-2'>
													<span className={cn('size-2 rounded-full', severityStyles.dot)} />
													<span className={cn('text-sm font-semibold', severityStyles.text)}>{stage.lossLabel}</span>
												</div>
											</div>
											<div className='mt-3 h-2.5 rounded-full bg-muted'>
												<div className='h-full rounded-full bg-foreground/45' style={{ width: stage.progressWidth }} />
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<div className='relative z-10 mt-6 border-t border-border/70 pt-5'>
							<ul className='space-y-3'>
								{LEAK_BULLETS.map((item) => (
									<li key={item} className='flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground'>
										<X className='mt-0.5 size-4 shrink-0 text-destructive' aria-hidden />
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					</motion.article>

					<motion.article
						variants={cardVariants}
						className='relative overflow-hidden rounded-3xl border border-pastel-sky-border bg-card p-6 shadow-sm md:p-8'>
						<div className='absolute -right-24 -top-24 size-64 rounded-full bg-pastel-sky/45 blur-3xl' />
						<div className='absolute -bottom-24 -left-24 size-64 rounded-full bg-pastel-peach/45 blur-3xl' />
						<div className='relative z-10'>
							<span className='inline-flex rounded-full border border-pastel-sky-border bg-pastel-sky/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-pastel-sky-ink'>
								The CoreCloser Way
							</span>
							<h3 className='mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl'>
								Retention Infrastructure
							</h3>
							<p className='mt-2 text-base text-muted-foreground'>Unified, closed-loop system for automated growth.</p>
						</div>

						<div className='relative z-10 mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div className='rounded-2xl border border-pastel-peach-border bg-pastel-peach/60 p-5 sm:col-span-2'>
								<div className='inline-flex items-center gap-2 text-sm font-semibold text-foreground'>
									<Database className='size-4 text-pastel-peach-ink' aria-hidden />
									360deg Customer View
								</div>
								<p className='mt-2 text-sm text-muted-foreground'>
									Unified subscriber profile across ESP, CRM, and purchase behavior.
								</p>
								<div className='mt-5 flex items-baseline gap-2'>
									<span className='text-3xl font-black tracking-tight text-foreground sm:text-4xl'>+124%</span>
									<span className='text-xs font-bold uppercase tracking-[0.14em] text-pastel-mint-ink'>
										Avg LTV Increase
									</span>
								</div>
							</div>
							<div className='rounded-2xl border border-pastel-mint-border bg-pastel-mint/60 p-5 text-center'>
								<div className='mx-auto inline-flex size-10 items-center justify-center rounded-xl border border-pastel-mint-border bg-card'>
									<Zap className='size-4 text-pastel-mint-ink' aria-hidden />
								</div>
								<div className='mt-3 text-base font-semibold text-foreground'>Zero-Leak Automation</div>
							</div>
							<div className='rounded-2xl border border-pastel-sky-border bg-pastel-sky/60 p-5 text-center'>
								<div className='mx-auto inline-flex size-10 items-center justify-center rounded-xl border border-pastel-sky-border bg-card'>
									<TrendingUp className='size-4 text-pastel-sky-ink' aria-hidden />
								</div>
								<div className='mt-3 text-base font-semibold text-foreground'>Predictable Revenue</div>
							</div>
						</div>

						<div className='relative z-10 mt-6 border-t border-border/70 pt-5'>
							<ul className='space-y-3'>
								{RETENTION_BULLETS.map((item) => (
									<li key={item} className='flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground'>
										<ShieldCheck className='mt-0.5 size-4 shrink-0 text-pastel-mint-ink' aria-hidden />
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					</motion.article>
				</motion.div>

				<motion.div
					variants={cardVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-30px' }}
					className='relative mt-12 overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900 p-6 md:p-8 lg:p-10'>
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_45%)]' />
					<div className='relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
						<div className='max-w-xl'>
							<h4 className='text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl'>
								The Difference Is Infrastructure
							</h4>
							<p className='mt-2 text-base leading-relaxed text-slate-200'>
								Funnels acquire attention. Infrastructure captures and compounds customer value over time.
							</p>
						</div>
						<div className='flex flex-col gap-2 sm:flex-row sm:gap-3'>
							<Button asChild size='lg' className='group gap-2'>
								<Link href='#consultation'>
									Evolve My Funnel
									<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' aria-hidden />
								</Link>
							</Button>
							<Button
								asChild
								size='lg'
								variant='outline'
								className='border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white'>
								<Link href='/services/digital-marketing#case-studies'>
									<Activity className='size-4' aria-hidden />
									View Case Studies
								</Link>
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
