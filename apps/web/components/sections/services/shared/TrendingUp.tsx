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

const easeOutCubic: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.1,
		},
	},
} satisfies Variants;

const itemVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: easeOutCubic },
	},
} satisfies Variants;

export function TrendingUp({ title, description, metrics, className = '' }: TrendingUpProps) {
	return (
		<section className={cn('py-16 md:py-24 overflow-hidden relative', className)}>
			<div className='section-container'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start'>

					{/* Left Column: Sticky Title */}
					<motion.div
						className='lg:col-span-5 lg:sticky lg:top-32 space-y-6'
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.8, ease: easeOutCubic }}
					>
						<div className='flex items-center gap-3'>
							<div className='flex items-center justify-center size-14 rounded-full bg-pastel-mint dark:bg-pastel-mint-ink shadow-sm ring-1 ring-pastel-mint/50 dark:ring-pastel-mint-ink/50'>
								<TrendingUpIcon className='size-7 text-pastel-mint-ink dark:text-pastel-mint' strokeWidth={2.5} />
							</div>
						</div>
						<h2 className='text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]'>
							{title}
						</h2>
						<p className='text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed'>
							{description}
						</p>
					</motion.div>

					{/* Right Column: Stacked Metrics */}
					<motion.div
						className='lg:col-span-7 flex flex-col gap-6 md:gap-8'
						variants={containerVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-100px' }}
					>
						{metrics.map((metric, index) => (
							<motion.div
								key={`${metric.label}-${index}`}
								variants={itemVariants}
								className='group relative overflow-hidden rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md p-8 md:p-10 transition-all duration-500 hover:border-pastel-mint/50 dark:hover:border-pastel-mint/40 hover:shadow-xl hover:shadow-pastel-mint/10 dark:hover:shadow-pastel-mint/5'
							>
								{/* Ambient Color - Persistent Wash */}
								<div className='absolute inset-0 bg-linear-to-br from-pastel-lilac via-transparent to-transparent dark:from-pastel-lilac opacity-100' />

								{/* Vibrant Mesh Gradient Background (Revealed on Hover) */}
								<div className='absolute inset-0 bg-linear-to-br from-pastel-mint/30 via-pastel-sky/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 dark:from-pastel-mint/20 dark:via-pastel-sky/10' />

								<div className='relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>

									{/* Context & Label */}
									<div className='space-y-4 md:max-w-[280px]'>
										<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-mint dark:bg-pastel-mint-ink text-pastel-mint-ink dark:text-pastel-mint text-sm font-bold tracking-wide uppercase shadow-sm ring-1 ring-pastel-mint/20 dark:ring-pastel-mint-ink/20'>
											<TrendingUpIcon className='size-4' strokeWidth={3} />
											{metric.change}
										</span>
										<div className='space-y-2'>
											<h3 className='text-lg md:text-xl font-bold text-foreground uppercase tracking-widest'>
												{metric.label}
											</h3>
											<p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
												{metric.context}
											</p>
										</div>
									</div>

									{/* Massive Number */}
									<div className='text-6xl md:text-7xl lg:text-[7.5rem] font-black text-foreground tracking-tighter leading-none shrink-0 group-hover:scale-105 transition-transform duration-700 ease-out origin-right'>
										{metric.value}
									</div>

								</div>
							</motion.div>
						))}
					</motion.div>

				</div>
			</div>
		</section>
	);
}
