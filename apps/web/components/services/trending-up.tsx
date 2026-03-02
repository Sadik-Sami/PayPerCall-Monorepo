'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { TrendingUpIcon } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

interface TrendingMetric {
	label: string;
	value: string;
	change: string;
	context: string;
}

interface TrendingUpProps {
	title: string;
	description: string;
	metrics: TrendingMetric[];
	className?: string;
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
} satisfies Variants;

const easeOutCubic: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		// framer-motion@12 `ease` expects an Easing function or cubic-bezier tuple (not a string).
		transition: { duration: 0.5, ease: easeOutCubic },
	},
} satisfies Variants;

export function TrendingUp({ title, description, metrics, className = '' }: TrendingUpProps) {
	return (
		<section className={cn('py-12 md:py-16', className)}>
			<div className='section-container space-y-8'>
				{/* Header */}
				<motion.div
					className='space-y-4'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}>
					<div className='flex items-center gap-3'>
						<TrendingUpIcon className='size-6 text-foreground' />
						<h2 className='text-3xl md:text-4xl font-bold text-foreground'>{title}</h2>
					</div>
					<p className='text-lg text-muted-foreground max-w-2xl'>{description}</p>
				</motion.div>

				{/* Metrics Grid */}
				<motion.div
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}>
					{metrics.map((metric, index) => (
						<motion.div
							key={`${metric.label}-${index}`}
							variants={itemVariants}
							className='group relative overflow-hidden rounded-lg border border-border bg-card p-6 hover:border-foreground/20 transition-colors'>
							{/* Gradient Background */}
							<div className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

							{/* Content */}
							<div className='relative space-y-4'>
								<div className='space-y-2'>
									<p className='text-sm font-medium text-muted-foreground uppercase tracking-wide'>{metric.label}</p>
									<div className='flex items-baseline gap-2'>
										<span className='text-4xl font-bold text-foreground'>{metric.value}</span>
										<span className='inline-flex items-center gap-1 px-2 py-1 rounded-md bg-pastel-mint text-pastel-mint-ink text-sm font-semibold'>
											<TrendingUpIcon className='size-4' />
											{metric.change}
										</span>
									</div>
								</div>
								<p className='text-sm text-muted-foreground leading-relaxed'>{metric.context}</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
