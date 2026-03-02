'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import {
	ShieldCheck,
	Shield,
	FileCheck,
	BarChart3,
	X,
	Check,
	Star,
	ArrowRight,
} from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import {
	containerVariants,
	itemVariants,
	cardVariants,
} from '@/lib/animations';

const VALUE_CARDS = [
	{
		title: 'Verified Intent',
		description:
			'Every caller is strictly vetted through a multi-step verification process to ensure purchase readiness.',
		icon: ShieldCheck,
		theme: 'emerald' as const,
	},
	{
		title: 'Zero Fraud',
		description:
			'Our AI-driven filtering blocks 99.9% of bots and spam callers before they ever reach your team.',
		icon: Shield,
		theme: 'purple' as const,
	},
	{
		title: 'TCPA Compliant',
		description:
			'Full legal compliance with real-time litigator scrubbing and documented opt-ins for every call.',
		icon: FileCheck,
		theme: 'amber' as const,
	},
	{
		title: 'Real-time Analytics',
		description:
			'Granular data on call duration, recording analysis, and conversion pathing at your fingertips.',
		icon: BarChart3,
		theme: 'blue' as const,
	},
];

const TRANSFORMATION_PAIRS = [
	{ before: 'Chasing form fills', after: 'High-Intent Calls', featured: true },
	{ before: '< 5% Pick-up Rate', after: '100% Pick-up Rate' },
	{ before: 'Compliance Risk', after: 'TCPA Certified' },
	{ before: 'Guessing ROI', after: 'Proven Economics' },
];

const getCardStyles = (theme: string) => {
	switch (theme) {
		case 'emerald':
			return {
				bg: 'bg-[var(--value-mint)] dark:bg-emerald-950/20',
				border: 'border-emerald-100 dark:border-emerald-900/30',
				orb: 'bg-emerald-400/20',
				icon: 'text-emerald-600 dark:text-emerald-400',
				accent: 'bg-emerald-500/40',
			};
		case 'purple':
			return {
				bg: 'bg-[var(--value-lilac)] dark:bg-purple-950/20',
				border: 'border-purple-100 dark:border-purple-900/30',
				orb: 'bg-purple-400/20',
				icon: 'text-purple-600 dark:text-purple-400',
				accent: 'bg-purple-500/40',
			};
		case 'amber':
			return {
				bg: 'bg-[var(--value-soft-yellow)] dark:bg-amber-950/20',
				border: 'border-amber-100 dark:border-amber-900/30',
				orb: 'bg-amber-400/20',
				icon: 'text-amber-600 dark:text-amber-400',
				accent: 'bg-amber-500/40',
			};
		case 'blue':
		default:
			return {
				bg: 'bg-[var(--value-pale-blue)] dark:bg-blue-950/20',
				border: 'border-blue-100 dark:border-blue-900/30',
				orb: 'bg-blue-400/20',
				icon: 'text-blue-600 dark:text-blue-400',
				accent: 'bg-blue-500/40',
			};
	}
};

export function ValuePropositionSection({ className }: { className?: string }) {
	const reduceMotion = useReducedMotion();

	return (
		<section
			className={cn(
				'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24',
				className
			)}
		>
			<motion.div
				className="text-center mb-16 space-y-4"
				variants={reduceMotion ? undefined : containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div
					variants={reduceMotion ? undefined : itemVariants}
					className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 dark:bg-slate-800 border border-primary/20 dark:border-slate-700 w-fit"
				>
					<span
						className="w-2 h-2 rounded-full bg-primary animate-pulse"
						aria-hidden
					/>
					<span className="text-[10px] font-bold text-primary uppercase tracking-widest">
						The Pay Per Call Advantage
					</span>
				</motion.div>
				<motion.h2
					variants={reduceMotion ? undefined : itemVariants}
					className="text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground"
				>
					Why Industry Leaders Choose{' '}
					<span className="text-primary">Pay Per Call</span>
				</motion.h2>
				<motion.p
					variants={reduceMotion ? undefined : itemVariants}
					className="text-lg text-muted-foreground max-w-2xl mx-auto"
				>
					We&apos;ve reimagined the inbound acquisition funnel. No more
					chasing dead leads—just high-intent calls delivered in real-time.
				</motion.p>
			</motion.div>

			<motion.div
				className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
				variants={reduceMotion ? undefined : containerVariants}
				initial="hidden"
				animate="visible"
			>
				{/* Left column: Value cards */}
				<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
					{VALUE_CARDS.map((card) => {
						const styles = getCardStyles(card.theme);
						const Icon = card.icon;
						return (
							<motion.div
								key={card.title}
								variants={reduceMotion ? undefined : cardVariants}
								className={cn(
									'bento-card group relative overflow-hidden p-8 rounded-3xl flex flex-col justify-between min-h-[280px]',
									styles.bg,
									styles.border,
									'border'
								)}
							>
								{/* Gradient orb for depth */}
								<div
									className={cn(
										'absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2',
										styles.orb
									)}
									aria-hidden
								/>
								<div className="relative flex flex-col">
									<div
										className={cn(
											'glass-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300'
										)}
									>
										<Icon className={cn('w-8 h-8', styles.icon)} strokeWidth={2} />
									</div>
									<div
										className={cn(
											'h-1 w-12 rounded-full mb-3',
											styles.accent
										)}
									/>
									<h3 className="text-xl font-bold text-foreground mb-3">
										{card.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										{card.description}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Right column: Transformation card */}
				<motion.div
					variants={reduceMotion ? undefined : cardVariants}
					className="lg:col-span-5 h-full"
				>
					<div className="bg-card dark:bg-slate-900 rounded-3xl border border-border shadow-2xl overflow-hidden h-full flex flex-col">
						<div className="p-8 border-b border-border">
							<h3 className="text-2xl font-bold text-foreground">
								The Transformation
							</h3>
							<p className="text-muted-foreground mt-2">
								The shift from outbound chasing to inbound closing.
							</p>
						</div>
						<div className="grow flex flex-col p-6 gap-4">
							{TRANSFORMATION_PAIRS.map((pair) => (
								<div key={pair.before} className="grid grid-cols-2 gap-4">
									<div className="p-4 rounded-2xl bg-muted/50 dark:bg-slate-800/50 border border-border">
										{pair === TRANSFORMATION_PAIRS[0] && (
											<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">
												Before
											</span>
										)}
										<div className="flex items-start gap-2 text-muted-foreground">
											<X className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.5} />
											<span className="text-sm font-medium">{pair.before}</span>
										</div>
									</div>
									<div className="p-4 rounded-2xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20 relative">
										{pair.featured && (
											<div className="absolute top-2 right-2">
												<Star className="w-4 h-4 text-primary fill-primary" />
											</div>
										)}
										{pair === TRANSFORMATION_PAIRS[0] && (
											<span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">
												After
											</span>
										)}
										<div className="flex items-start gap-2 text-primary font-bold">
											<Check
												className="w-4 h-4 mt-0.5 shrink-0"
												strokeWidth={2.5}
											/>
											<span className="text-sm">{pair.after}</span>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="p-8 bg-muted/30 dark:bg-slate-800/30 border-t border-border flex items-center justify-between">
							<div>
								<p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
									Next Step
								</p>
								<p className="text-sm font-semibold text-foreground">
									Request your blueprint
								</p>
							</div>
							<Link
								href="/contact"
								className="flex items-center gap-2 text-primary font-bold group hover:gap-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg py-1 px-2 -m-2"
							>
								Get Started
								<ArrowRight className="w-5 h-5" strokeWidth={2} />
							</Link>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
