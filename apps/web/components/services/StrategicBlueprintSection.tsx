'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Target, PhoneCall, Activity, TrendingUp } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, cardVariants, itemVariants } from '@/lib/animations';

const STEPS = [
	{
		title: 'Define Vertical',
		description:
			'Choose your high-ticket niche like Solar or Legal to target the right audience from day one.',
		icon: Target,
		bg: 'bg-pastel-lime',
		border: 'border-pastel-lime-border',
		iconCircle: 'bg-pastel-lime-strong text-primary-foreground',
		numberAccent: 'text-pastel-lime-strong/40',
	},
	{
		title: 'Connect Phone',
		description:
			'Seamlessly integrate our advanced tracking numbers directly with your existing CRM infrastructure.',
		icon: PhoneCall,
		bg: 'bg-pastel-sky',
		border: 'border-pastel-sky-border',
		iconCircle: 'bg-pastel-sky-strong text-primary-foreground',
		numberAccent: 'text-pastel-sky-strong/40',
	},
	{
		title: 'Calls Flow',
		description:
			'High-intent prospects start calling your sales team, filtered for quality and readiness.',
		icon: Activity,
		bg: 'bg-pastel-lilac',
		border: 'border-pastel-lilac-border',
		iconCircle: 'bg-pastel-lilac-strong text-primary-foreground',
		numberAccent: 'text-pastel-lilac-strong/40',
	},
	{
		title: 'Scale at Will',
		description:
			'Increase ad spend to drive more volume instantly. Predictable growth on your terms.',
		icon: TrendingUp,
		bg: 'bg-value-soft-yellow',
		border: 'border-pastel-peach-border',
		iconCircle: 'bg-pastel-peach-strong text-primary-foreground',
		numberAccent: 'text-pastel-peach-strong/40',
	},
] as const;

export function StrategicBlueprintSection({ className }: { className?: string }) {
	const reduceMotion = useReducedMotion();

	return (
		<section className={cn('section-container py-16 lg:py-24', className)}>
			<motion.div
				variants={reduceMotion ? undefined : containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-80px' }}
				className="text-center mb-14 space-y-4"
			>
				<motion.span
					variants={reduceMotion ? undefined : itemVariants}
					className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary"
				>
					Strategic Blueprint
				</motion.span>
				<motion.h2
					variants={reduceMotion ? undefined : itemVariants}
					className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
				>
					Your Blueprint to Inbound Calls
				</motion.h2>
				<motion.p
					variants={reduceMotion ? undefined : itemVariants}
					className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed"
				>
					We simplify the complex world of pay-per-call into four actionable steps designed for rapid
					scaling and high-intent conversions.
				</motion.p>
			</motion.div>

			<motion.div
				variants={reduceMotion ? undefined : containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-60px' }}
				className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
			>
				{STEPS.map((step, index) => {
					const Icon = step.icon;
					return (
						<motion.article
							key={step.title}
							variants={reduceMotion ? undefined : cardVariants}
							whileHover={
								reduceMotion
									? undefined
									: { y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }
							}
							whileTap={reduceMotion ? undefined : { scale: 0.99 }}
							className={cn(
								'group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl',
								step.bg,
								step.border
							)}
						>
							<span
								className={cn(
									'pointer-events-none absolute -right-1 -top-4 select-none text-[6rem] font-extrabold leading-none tracking-tighter',
									step.numberAccent
								)}
							>
								{String(index + 1).padStart(2, '0')}
							</span>

							<div className="relative">
								<motion.div
									className={cn(
										'mb-5 flex h-14 w-14 items-center justify-center rounded-full shadow-md',
										step.iconCircle
									)}
									whileHover={
										reduceMotion ? undefined : { scale: 1.1, rotate: 5 }
									}
									transition={{ type: 'spring', stiffness: 400, damping: 15 }}
								>
									<Icon className="size-7" strokeWidth={2} />
								</motion.div>
								<h3 className="mb-2 text-lg font-bold tracking-tight text-foreground">
									{step.title}
								</h3>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{step.description}
								</p>
							</div>
						</motion.article>
					);
				})}
			</motion.div>
		</section>
	);
}
