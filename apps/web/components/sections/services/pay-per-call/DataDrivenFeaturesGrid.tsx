'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
	Filter,
	ShieldCheck,
	BarChart3,
	RefreshCw,
	Sparkles,
	Send,
	Zap,
	type LucideIcon,
} from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import type { CallGatewayAccent } from './constants';
import type { DataDrivenFeatureItem } from './data-driven-features';

const ICON_MAP: Record<string, LucideIcon> = {
	Filter,
	ShieldCheck,
	BarChart3,
	RefreshCw,
	Sparkles,
	Send,
};

/** Per-card pastel theme: card bg + border; icon uses white box + accent color. */
const TONE_STYLES: Record<
	CallGatewayAccent,
	{ cardBg: string; cardBorder: string; iconColor: string }
> = {
	mint: {
		cardBg: 'bg-pastel-mint',
		cardBorder: 'border-pastel-mint-border',
		iconColor: 'text-pastel-mint-strong',
	},
	lilac: {
		cardBg: 'bg-pastel-lilac',
		cardBorder: 'border-pastel-lilac-border',
		iconColor: 'text-pastel-lilac-strong',
	},
	peach: {
		cardBg: 'bg-pastel-peach',
		cardBorder: 'border-pastel-peach-border',
		iconColor: 'text-pastel-peach-strong',
	},
	sky: {
		cardBg: 'bg-pastel-sky',
		cardBorder: 'border-pastel-sky-border',
		iconColor: 'text-pastel-sky-strong',
	},
};

export interface DataDrivenFeaturesGridProps {
	badge?: string;
	title: string;
	subtitle?: string;
	features: DataDrivenFeatureItem[];
	className?: string;
}

export function DataDrivenFeaturesGrid({
	badge,
	title,
	subtitle,
	features,
	className,
}: DataDrivenFeaturesGridProps) {
	const reduceMotion = useReducedMotion();
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : containerVariants;
	const itemAnimation = reduceMotion ? { hidden: {}, visible: {} } : itemVariants;

	if (!features.length) return null;

	return (
		<section className={cn('w-full', className)} aria-labelledby="data-driven-features-title">
			<div className="section-container">
				<motion.div
					variants={containerAnimation}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.15 }}
					className="space-y-10"
				>
					{/* Centered header */}
					<motion.div
						variants={itemAnimation}
						className="max-w-4xl mx-auto text-center"
					>
						{badge && (
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-sky/50 border border-pastel-sky-border text-pastel-sky-ink text-xs font-bold uppercase tracking-wider mb-6">
								<Zap className="size-3.5" aria-hidden />
								{badge}
							</div>
						)}
						<h2
							id="data-driven-features-title"
							className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground"
						>
							{title}
						</h2>
						{subtitle && (
							<p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
								{subtitle}
							</p>
						)}
					</motion.div>

					{/* 2x3 grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{features.map((feature, index) => {
							const Icon = ICON_MAP[feature.iconKey] ?? Zap;
							const styles = TONE_STYLES[feature.tone];
							return (
								<motion.article
									key={feature.title}
									variants={itemAnimation}
									transition={{ delay: index * 0.05 }}
									className={cn(
										'group/card relative flex flex-col justify-between p-8 rounded-2xl border min-h-[240px]',
										'transition-shadow duration-300 hover:shadow-xl',
										styles.cardBg,
										styles.cardBorder
									)}
									whileHover={
										reduceMotion
											? undefined
											: { y: -4, transition: { type: 'spring', stiffness: 400, damping: 22 } }
									}
									whileTap={reduceMotion ? undefined : { scale: 0.995 }}
								>
									<div>
										{/* White icon box - reference design */}
										<motion.div
											className={cn(
												'w-12 h-12 rounded-xl bg-background dark:bg-card flex items-center justify-center shadow-sm mb-6',
												styles.iconColor
											)}
											whileHover={
												reduceMotion ? undefined : { scale: 1.1 }
											}
											transition={{ type: 'spring', stiffness: 400, damping: 18 }}
										>
											<Icon className="size-6" strokeWidth={2} aria-hidden />
										</motion.div>
										<h3 className="text-xl font-bold text-foreground mb-3">
											{feature.title}
										</h3>
										<p className="text-muted-foreground text-sm leading-relaxed">
											{feature.description}
										</p>
									</div>
								</motion.article>
							);
						})}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
