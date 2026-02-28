'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Cloud, Rocket } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { springContainer, springItem } from '@/lib/animations';

const HERO = {
	headline: {
		main: 'High-Performance Web Apps, Engineered for',
		highlight: 'Growth.',
	},
	subtitle:
		'We build React/Next.js experiences that scale with your business. Fast, measurable, and built to convert—from first visit to closed deal.',
	primaryCta: { label: 'Book a Free Consultation', href: '/contact' },
	secondaryCta: { label: 'View Recent Work', href: '/portfolio' },
	statCard: {
		title: 'Real-time Analytics',
		value: '72%',
		label: 'Growth',
	},
	deployCard: {
		title: 'Seamless Deployment',
		checks: ['Build optimized', 'Tests passed (42/42)'],
		live: 'Deploying to Edge…',
	},
	dashboard: {
		revenue: '$124,500',
		revenueChange: '+12.5%',
		activeUsers: '8,420',
		usersPct: 75,
		conversion: '3.2%',
		conversionPct: 45,
		latency: '42ms latency',
		cluster: 'US-East Cluster',
	},
};

function BentoCard({
	children,
	className,
	...props
}: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'rounded-xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-lg ring-1 ring-black/5 dark:ring-white/5',
				className
			)}
			{...props}>
			{children}
		</div>
	);
}

export function WebDevHero({ className }: { className?: string }) {
	const reduceMotion = useReducedMotion();
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : springContainer;
	const itemAnimation = reduceMotion ? { hidden: {}, visible: {} } : springItem;

	return (
		<section
			className={cn(
				'relative flex flex-col justify-center overflow-visible py-8 lg:py-12',
				className
			)}>
			{/* Subtle background – matches ServiceHero / rest of page */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/5" />
				<div className="absolute -top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-3xl" />
				<div className="absolute -bottom-1/4 right-0 h-150 w-150 rounded-full bg-gradient-radial from-accent/8 via-transparent to-transparent blur-3xl" />
			</div>

			<div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
				{/* Left: Copy */}
				<motion.div
					variants={containerAnimation}
					initial="hidden"
					animate="visible"
					className="flex flex-col gap-8 pt-10 lg:w-[45%] lg:pt-0"
				>
					<div className="flex flex-col">
						<motion.h1
							variants={itemAnimation}
							className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
						>
							{HERO.headline.main}{' '}
							<span className="relative inline-block">
								<span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/80">
									{HERO.headline.highlight}
								</span>
								<span className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-primary/30" />
							</span>
						</motion.h1>
					</div>

					<motion.p
						variants={itemAnimation}
						className="mt-4 max-w-lg border-l-2 border-border pl-6 text-lg font-light leading-relaxed text-muted-foreground"
					>
						{HERO.subtitle}
					</motion.p>

					<motion.div variants={itemAnimation} className="mt-6 flex flex-wrap gap-4">
						<Button asChild size="lg" className="group gap-2 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
							<Link href={HERO.primaryCta.href}>
								{HERO.primaryCta.label}
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
						<Button
							asChild
							size="lg"
							variant="outline"
							className="border-border/80 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card/80"
						>
							<Link href={HERO.secondaryCta.href}>{HERO.secondaryCta.label}</Link>
						</Button>
					</motion.div>
				</motion.div>

				{/* Right: Bento grid – dashboard + analytics (1) : deployment (2) */}
				<div className="relative flex w-full flex-col gap-4 pt-12 lg:w-[55%] lg:pt-0">
					{/* Top: Isometric dashboard */}
					<motion.div
						variants={itemAnimation}
						initial="hidden"
						animate="visible"
						className="relative flex w-full items-center justify-center"
					>
						<div
							className="w-full max-w-[520px] perspective-[1500px]"
							style={{
								transform: 'rotateX(18deg) rotateY(-8deg) rotateZ(2deg)',
								transformStyle: 'preserve-3d',
							}}
						>
							<div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-lg ring-1 ring-black/5 dark:ring-white/5">
								{/* Window chrome */}
								<div className="flex h-10 items-center justify-between border-b border-border bg-muted/50 px-4">
									<div className="flex gap-2">
										<span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
										<span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
									</div>
									<div className="h-4 w-32 rounded-full bg-muted opacity-50" />
									<div className="w-4" />
								</div>
								{/* Dashboard content */}
								<div className="grid flex-1 grid-cols-3 gap-4 bg-card p-5">
									<div className="relative col-span-2 overflow-hidden rounded-lg border border-border bg-muted/30 p-4">
										<div className="mb-4 flex items-end justify-between">
											<div>
												<div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Revenue</div>
												<div className="font-display text-2xl font-bold text-foreground">{HERO.dashboard.revenue}</div>
											</div>
											<span className="rounded bg-emerald-500/10 px-2 py-1 text-xs text-emerald-500">
												{HERO.dashboard.revenueChange}
											</span>
										</div>
										<div className="flex h-24 w-full items-end justify-between gap-1 opacity-80">
											{[40, 65, 50, 80, 60, 90].map((h, i) => (
												<div
													key={i}
													className="relative w-full rounded-t-sm bg-linear-to-t from-primary/25 to-transparent"
													style={{ height: `${h}%` }}
												>
													<span className="absolute top-0 h-0.5 w-full bg-primary" />
												</div>
											))}
										</div>
									</div>
									<div className="col-span-1 flex flex-col gap-3">
										<div className="h-full rounded-lg border border-border bg-muted/30 p-3">
											<div className="mb-1 text-[10px] text-muted-foreground">Active Users</div>
											<div className="font-display text-xl font-bold">{HERO.dashboard.activeUsers}</div>
											<div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
												<div
													className="h-full bg-primary"
													style={{ width: `${HERO.dashboard.usersPct}%` }}
												/>
											</div>
										</div>
										<div className="h-full rounded-lg border border-border bg-muted/30 p-3">
											<div className="mb-1 text-[10px] text-muted-foreground">Conversion</div>
											<div className="font-display text-xl font-bold">{HERO.dashboard.conversion}</div>
											<div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
												<div
													className="h-full bg-chart-4"
													style={{ width: `${HERO.dashboard.conversionPct}%` }}
												/>
											</div>
										</div>
									</div>
									<div className="col-span-3 flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
										<div className="flex items-center gap-3">
											<div className="flex h-8 w-8 items-center justify-center rounded bg-primary/20 text-primary">
												<Cloud className="h-4 w-4" />
											</div>
											<div>
												<div className="text-xs font-semibold">Server Load</div>
												<div className="text-[10px] text-muted-foreground">{HERO.dashboard.cluster}</div>
											</div>
										</div>
										<span className="font-mono text-xs text-muted-foreground">{HERO.dashboard.latency}</span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Bottom: Bento row – Analytics (1) : Deployment (2) */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						{/* Analytics card – 1 part */}
						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.4 }}
							className="sm:col-span-1"
						>
							<BentoCard className="relative overflow-hidden p-5 h-full flex flex-col items-center justify-center min-h-[140px]">
								<div className="absolute inset-0 bg-primary/5 blur-2xl pointer-events-none" aria-hidden />
								<div className="relative flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
									<span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" aria-hidden />
									<span>{HERO.statCard.title}</span>
								</div>
								<div className="relative flex h-16 w-16 items-center justify-center">
									<svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 64 64" aria-hidden>
										<circle cx="32" cy="32" r="28" fill="none" className="stroke-border" strokeWidth="5" />
										<motion.circle
											cx="32"
											cy="32"
											r="28"
											fill="none"
											className="stroke-primary"
											strokeWidth="5"
											strokeLinecap="round"
											strokeDasharray="175.9"
											initial={{ strokeDashoffset: 175.9 }}
											animate={{ strokeDashoffset: 175.9 - 175.9 * 0.72 }}
											transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
										/>
									</svg>
									<div className="absolute inset-0 flex flex-col items-center justify-center">
										<span className="font-display text-lg font-bold text-foreground">{HERO.statCard.value}</span>
										<span className="text-[8px] uppercase text-muted-foreground">{HERO.statCard.label}</span>
									</div>
								</div>
							</BentoCard>
						</motion.div>

						{/* Deployment card – 2 parts */}
						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.45, duration: 0.4 }}
							className="sm:col-span-2"
						>
							<BentoCard className="p-5 min-h-[140px] flex flex-col justify-center">
								<div className="mb-3 flex items-center justify-between border-b border-border/80 pb-2">
									<span className="text-sm font-medium text-foreground">{HERO.deployCard.title}</span>
									<Rocket className="h-4 w-4 text-muted-foreground" aria-hidden />
								</div>
								<div className="space-y-2">
									{HERO.deployCard.checks.map((text) => (
										<div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
											<span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500" aria-hidden>
												<Check className="h-2.5 w-2.5" />
											</span>
											<span>{text}</span>
										</div>
									))}
									<div className="flex items-center gap-3 text-sm font-medium text-foreground mt-1">
										<span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20" aria-hidden>
											<span className="absolute inset-0 animate-ping rounded-full border border-primary opacity-75" />
											<span className="h-1.5 w-1.5 rounded-full bg-primary relative z-10" />
										</span>
										{HERO.deployCard.live}
									</div>
								</div>
							</BentoCard>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
