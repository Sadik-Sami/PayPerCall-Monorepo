'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import type { CallGatewayAccent } from './constants';

const ACCENT_STYLES: Record<
	CallGatewayAccent,
	{ standardBg: string; optimizedBg: string; optimizedBorder: string; arrow: string }
> = {
	mint: {
		standardBg: 'bg-muted/50',
		optimizedBg: 'bg-pastel-mint',
		optimizedBorder: 'border-pastel-mint-border',
		arrow: 'text-pastel-mint-strong',
	},
	lilac: {
		standardBg: 'bg-muted/50',
		optimizedBg: 'bg-pastel-lilac',
		optimizedBorder: 'border-pastel-lilac-border',
		arrow: 'text-pastel-lilac-strong',
	},
	peach: {
		standardBg: 'bg-muted/50',
		optimizedBg: 'bg-pastel-peach',
		optimizedBorder: 'border-pastel-peach-border',
		arrow: 'text-pastel-peach-strong',
	},
	sky: {
		standardBg: 'bg-muted/50',
		optimizedBg: 'bg-pastel-sky',
		optimizedBorder: 'border-pastel-sky-border',
		arrow: 'text-pastel-sky-strong',
	},
};

export interface StandardVsOptimizedMicroCardProps {
	title: string;
	standard: { label: string; bullets: string[] };
	optimized: { label: string; bullets: string[] };
	note?: string;
	accent: CallGatewayAccent;
	className?: string;
}

export function StandardVsOptimizedMicroCard({
	title,
	standard,
	optimized,
	note,
	accent,
	className,
}: StandardVsOptimizedMicroCardProps) {
	const reduceMotion = useReducedMotion();
	const styles = ACCENT_STYLES[accent];
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : containerVariants;
	const itemAnimation = reduceMotion ? { hidden: {}, visible: {} } : itemVariants;

	return (
		<section className={cn('w-full', className)} aria-labelledby="standard-vs-optimized-title">
			<div className="section-container">
				<motion.div
					variants={containerAnimation}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="space-y-6"
				>
					<motion.h2
						id="standard-vs-optimized-title"
						variants={itemAnimation}
						className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground"
					>
						{title}
					</motion.h2>

					<motion.div
						variants={itemAnimation}
						className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border shadow-lg"
					>
						<div className={cn('p-6 md:p-8', styles.standardBg)}>
							<p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
								{standard.label}
							</p>
							<ul className="space-y-2">
								{standard.bullets.map((bullet) => (
									<li
										key={bullet}
										className="flex items-start gap-2 text-sm text-muted-foreground"
									>
										<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
										{bullet}
									</li>
								))}
							</ul>
						</div>

						<div className="relative flex items-stretch">
							<div
								className={cn(
									'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-card shadow-md',
									styles.arrow
								)}
								aria-hidden
							>
								<ArrowRight className="size-5" />
							</div>
							<div
								className={cn(
									'flex-1 p-6 md:p-8 border-l border-border',
									styles.optimizedBg,
									styles.optimizedBorder
								)}
							>
								<p className="text-xs font-bold uppercase tracking-widest text-foreground/80 mb-3">
									{optimized.label}
								</p>
								<ul className="space-y-2">
									{optimized.bullets.map((bullet) => (
										<li
											key={bullet}
											className="flex items-start gap-2 text-sm text-foreground/90"
										>
											<span
												className={cn(
													'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
													styles.arrow
												)}
											/>
											{bullet}
										</li>
									))}
								</ul>
							</div>
						</div>
					</motion.div>

					{note && (
						<motion.p
							variants={itemAnimation}
							className="text-sm text-muted-foreground italic"
						>
							{note}
						</motion.p>
					)}
				</motion.div>
			</div>
		</section>
	);
}
