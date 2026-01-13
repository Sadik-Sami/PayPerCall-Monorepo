'use client';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import type { LucideIcon } from 'lucide-react';

export interface ResultMetric {
	icon?: LucideIcon;
	value: string;
	label: string;
	description?: string;
	trend?: string;
}

export interface ResultsShowcaseProps {
	metrics?: ResultMetric[];
	title?: string;
	description?: string;
	variant?: 'default' | 'centered' | 'split';
	className?: string;
}

const defaultMetrics: ResultMetric[] = [
	{
		icon: Zap,
		value: '47%',
		label: 'Faster Load Times',
		description: 'Average improvement in Core Web Vitals across all projects',
		trend: '+47%',
	},
	{
		icon: TrendingUp,
		value: '3.2x',
		label: 'Conversion Lift',
		description: 'Average increase in goal completions post-launch',
		trend: '3.2x',
	},
	{
		icon: Users,
		value: '89%',
		label: 'Client Retention',
		description: 'Clients return for additional projects or ongoing support',
		trend: '89%',
	},
	{
		icon: DollarSign,
		value: '$2.4M',
		label: 'Revenue Generated',
		description: 'Tracked revenue increase attributed to our web builds',
		trend: '+$2.4M',
	},
];

export function ResultsShowcase({
	metrics = defaultMetrics,
	title = 'Results that speak for themselves',
	description = 'We measure success by the outcomes that matter to your business—speed, conversions, and growth.',
	variant = 'default',
	className,
}: ResultsShowcaseProps) {
	if (variant === 'split') {
		return (
			<section className={cn('py-20 lg:py-28', className)}>
				<div className='section-container'>
					<motion.div
						variants={containerVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-100px' }}
						className='grid items-center gap-12 lg:grid-cols-2 lg:gap-20'>
						{/* Left content */}
						<motion.div variants={itemVariants} className='space-y-6'>
							<div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5'>
								<TrendingUp className='h-4 w-4 text-primary' />
								<span className='text-sm font-medium text-primary'>Proven Results</span>
							</div>
							<h2 className='text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl'>{title}</h2>
							<p className='text-lg text-muted-foreground'>{description}</p>
							<div className='flex items-center gap-2 text-sm text-muted-foreground'>
								<ArrowUpRight className='h-4 w-4 text-primary' />
								<span>Based on 120+ completed projects</span>
							</div>
						</motion.div>

						{/* Right metrics grid */}
						<motion.div variants={itemVariants} className='grid grid-cols-2 gap-4'>
							{metrics.map((metric, index) => {
								const Icon = metric.icon ?? TrendingUp;
								const isLarge = index === 0 || index === 3;
								return (
									<motion.div
										key={metric.label}
										variants={itemVariants}
										custom={index}
										className={cn(
											'group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl',
											isLarge && 'col-span-2 md:col-span-1'
										)}>
										<div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150' />
										<Icon className='relative mb-3 h-5 w-5 text-primary' />
										<p className='relative text-4xl font-bold text-foreground lg:text-5xl'>{metric.value}</p>
										<p className='relative mt-2 font-medium text-foreground'>{metric.label}</p>
										{metric.description && (
											<p className='relative mt-1 text-sm text-muted-foreground'>{metric.description}</p>
										)}
									</motion.div>
								);
							})}
						</motion.div>
					</motion.div>
				</div>
			</section>
		);
	}

	if (variant === 'centered') {
		return (
			<section
				className={cn(
					'relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-28',
					className
				)}>
				<div className='section-container'>
					<motion.div
						variants={containerVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-100px' }}
						className='space-y-16'>
						{/* Header */}
						<motion.div variants={itemVariants} className='mx-auto max-w-3xl text-center'>
							<div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5'>
								<TrendingUp className='h-4 w-4 text-primary' />
								<span className='text-sm font-medium text-primary'>Proven Results</span>
							</div>
							<h2 className='mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl'>
								{title}
							</h2>
							<p className='text-lg text-muted-foreground'>{description}</p>
						</motion.div>

						{/* Metrics row */}
						<motion.div variants={itemVariants} className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
							{metrics.map((metric, index) => {
								const Icon = metric.icon ?? TrendingUp;
								return (
									<motion.div
										key={metric.label}
										variants={itemVariants}
										custom={index}
										className='group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl'>
										<div className='absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />
										<Icon className='relative mx-auto mb-4 h-8 w-8 text-primary' />
										<p className='relative text-4xl font-bold text-foreground lg:text-5xl'>{metric.value}</p>
										<p className='relative mt-3 font-semibold text-foreground'>{metric.label}</p>
										{metric.description && (
											<p className='relative mt-2 text-sm text-muted-foreground'>{metric.description}</p>
										)}
									</motion.div>
								);
							})}
						</motion.div>
					</motion.div>
				</div>
			</section>
		);
	}

	// Default variant - horizontal strip
	return (
		<section className={cn('border-y border-border/50 bg-muted/30 py-16', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='space-y-10'>
					{/* Header inline with metrics on large screens */}
					<motion.div
						variants={itemVariants}
						className='flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end'>
						<div className='max-w-xl'>
							<div className='mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1'>
								<TrendingUp className='h-3.5 w-3.5 text-primary' />
								<span className='text-xs font-medium text-primary'>Proven Results</span>
							</div>
							<h2 className='text-2xl font-bold tracking-tight text-foreground md:text-3xl'>{title}</h2>
						</div>
						<p className='max-w-md text-muted-foreground lg:text-right'>{description}</p>
					</motion.div>

					{/* Metrics grid */}
					<motion.div variants={itemVariants} className='grid grid-cols-2 gap-4 md:grid-cols-4'>
						{metrics.map((metric, index) => {
							const Icon = metric.icon ?? TrendingUp;
							return (
								<motion.div
									key={metric.label}
									variants={itemVariants}
									custom={index}
									className='group rounded-xl border border-border/50 bg-card/50 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg'>
									<div className='mb-3 flex items-center justify-between'>
										<Icon className='h-5 w-5 text-primary' />
										{metric.trend && (
											<span className='flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400'>
												<ArrowUpRight className='h-3 w-3' />
												{metric.trend}
											</span>
										)}
									</div>
									<p className='text-3xl font-bold text-foreground'>{metric.value}</p>
									<p className='mt-1 text-sm font-medium text-foreground'>{metric.label}</p>
								</motion.div>
							);
						})}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
