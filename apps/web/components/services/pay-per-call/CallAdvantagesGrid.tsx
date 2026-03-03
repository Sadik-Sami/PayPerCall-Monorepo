'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
	Phone,
	ShieldCheck,
	Timer,
	MapPin,
	Radio,
	Search,
	BadgeCheck,
	Zap,
	Target,
	BarChart3,
	TrendingUp,
	type LucideIcon,
} from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, cardVariants } from '@/lib/animations';
import type { CallGatewayAccent } from './constants';

const ICON_MAP: Record<string, LucideIcon> = {
	Phone,
	ShieldCheck,
	Timer,
	MapPin,
	Radio,
	Search,
	BadgeCheck,
	Zap,
	Target,
	BarChart3,
	TrendingUp,
};

/** Per-card pastel theme: icon box + card bg + border. Matches reference (mint, blue, yellow). */
const TONE_STYLES: Record<
	CallGatewayAccent,
	{ cardBg: string; cardBorder: string; iconBoxBg: string; iconColor: string }
> = {
	mint: {
		cardBg: 'bg-pastel-mint',
		cardBorder: 'border-pastel-mint-border',
		iconBoxBg: 'bg-pastel-mint-strong/20',
		iconColor: 'text-pastel-mint-strong',
	},
	lilac: {
		cardBg: 'bg-pastel-lilac',
		cardBorder: 'border-pastel-lilac-border',
		iconBoxBg: 'bg-pastel-lilac-strong/20',
		iconColor: 'text-pastel-lilac-strong',
	},
	peach: {
		cardBg: 'bg-pastel-peach',
		cardBorder: 'border-pastel-peach-border',
		iconBoxBg: 'bg-pastel-peach-strong/20',
		iconColor: 'text-pastel-peach-strong',
	},
	sky: {
		cardBg: 'bg-pastel-sky',
		cardBorder: 'border-pastel-sky-border',
		iconBoxBg: 'bg-pastel-sky-strong/20',
		iconColor: 'text-pastel-sky-strong',
	},
};

export type CallAdvantageIconKey = keyof typeof ICON_MAP;

export interface CallAdvantageItem {
	title: string;
	description: string;
	iconKey: string;
	tone: CallGatewayAccent;
}

export interface CallAdvantagesGridProps {
	title: string;
	subtitle?: string;
	items: [CallAdvantageItem, CallAdvantageItem, CallAdvantageItem];
	className?: string;
}

export function CallAdvantagesGrid({ title, subtitle, items, className }: CallAdvantagesGridProps) {
	const reduceMotion = useReducedMotion();
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : containerVariants;
	const cardAnimation = reduceMotion ? { hidden: {}, visible: {} } : cardVariants;

	return (
		<section className={cn('w-full', className)} aria-labelledby="call-advantages-title">
			<div className="section-container">
				<motion.div
					variants={containerAnimation}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="space-y-8"
				>
					<motion.div variants={cardAnimation} className="px-0.5">
						<h2
							id="call-advantages-title"
							className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground"
						>
							{title}
						</h2>
						{subtitle && (
							<p className="mt-2 text-lg text-muted-foreground leading-relaxed max-w-2xl">
								{subtitle}
							</p>
						)}
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{items.map((item, index) => {
							const Icon = ICON_MAP[item.iconKey] ?? Phone;
							const styles = TONE_STYLES[item.tone];
							return (
								<motion.article
									key={item.title}
									variants={cardAnimation}
									transition={{ delay: index * 0.06 }}
									className={cn(
										'group/card relative flex flex-col h-full rounded-2xl p-8 border',
										'transition-all duration-300 hover:shadow-lg',
										styles.cardBg,
										styles.cardBorder
									)}
									whileHover={
										reduceMotion
											? undefined
											: { y: -6, transition: { type: 'spring', stiffness: 350, damping: 22 } }
									}
									whileTap={reduceMotion ? undefined : { scale: 0.995 }}

								>
									{/* Icon box - pastel tint with stronger icon color */}
									<motion.div
										className={cn(
											'w-14 h-14 rounded-xl flex items-center justify-center mb-6',
											styles.iconBoxBg,
											styles.iconColor
										)}
										whileHover={reduceMotion ? undefined : { scale: 1.05 }}
										transition={{ type: 'spring', stiffness: 400, damping: 18 }}
									>
										<Icon className="size-7" strokeWidth={2} aria-hidden />
									</motion.div>
									<h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
										{item.title}
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed flex-1">
										{item.description}
									</p>
								</motion.article>
							);
						})}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
