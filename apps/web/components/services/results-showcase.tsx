'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, Zap, Users, DollarSign, ArrowUpRight, Check } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import type { LucideIcon } from 'lucide-react';

export interface ResultMetric {
	icon?: LucideIcon;
	value: string;
	label: string;
	description?: string;
	trend?: string;
	colorTheme?: 'emerald' | 'purple' | 'orange' | 'blue';
	caseStudy?: string;
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
		description: 'Average improvement in Core Web Vitals across all projects.',
		trend: '+47%',
		colorTheme: 'emerald',
		caseStudy: 'How we helped TechFlow modernize their architecture to achieve sub-second load times.',
	},
	{
		icon: TrendingUp,
		value: '3.2x',
		label: 'Conversion Lift',
		description: 'Average increase in goal completions post-launch.',
		trend: '3.2x',
		colorTheme: 'purple',
		caseStudy: 'How we redesigned the checkout experience to eliminate cart abandonment for a major retailer.',
	},
	{
		icon: Users,
		value: '89%',
		label: 'Client Retention',
		description: 'Clients return for additional projects or ongoing support.',
		trend: '89%',
		colorTheme: 'orange',
		caseStudy: 'Why SaaS platform DataSync chose to retain us for 3 consecutive major version updates.',
	},
	{
		icon: DollarSign,
		value: '$2.4M',
		label: 'Revenue Generated',
		description: 'Tracked revenue increase attributed to our web builds.',
		trend: '+$2.4M',
		colorTheme: 'blue',
		caseStudy: 'How a headless commerce migration unlocked $2.4M in new revenue for StyleHouse.',
	},
];

const floatingAnimation = {
	y: ['0%', '-10%', '0%'],
	rotate: [0, 5, 0],
	transition: {
		duration: 6,
		ease: 'easeInOut' as const,
		repeat: Infinity,
	},
};

const floatingReverseAnimation = {
	y: ['0%', '10%', '0%'],
	rotate: [0, -5, 0],
	transition: {
		duration: 7,
		ease: 'easeInOut' as const,
		repeat: Infinity,
	},
};

const getColorStyles = (color: string) => {
	switch (color) {
		case 'emerald':
			return {
				bg: 'bg-emerald-100 dark:bg-emerald-900/30',
				border: 'dark:border-emerald-500/20',
				textBase: 'text-emerald-900 dark:text-emerald-100',
				textAccent: 'text-emerald-800 dark:text-emerald-200',
				textMuted: 'text-emerald-700/80 dark:text-emerald-300/80',
				icon: 'text-emerald-600 dark:text-emerald-400',
				sparkline: 'stroke-emerald-600 dark:stroke-emerald-400',
				path: 'M0 25 Q 25 25, 30 15 T 60 20 T 100 5',
			};
		case 'purple':
			return {
				bg: 'bg-purple-100 dark:bg-purple-900/30',
				border: 'dark:border-purple-500/20',
				textBase: 'text-purple-900 dark:text-purple-100',
				textAccent: 'text-purple-800 dark:text-purple-200',
				textMuted: 'text-purple-700/80 dark:text-purple-300/80',
				icon: 'text-purple-600 dark:text-purple-400',
				sparkline: 'stroke-purple-600 dark:stroke-purple-400',
				path: 'M0 28 L 20 20 L 40 22 L 60 10 L 80 15 L 100 2',
			};
		case 'orange':
			return {
				bg: 'bg-orange-100 dark:bg-orange-900/30',
				border: 'dark:border-orange-500/20',
				textBase: 'text-orange-900 dark:text-orange-100',
				textAccent: 'text-orange-800 dark:text-orange-200',
				textMuted: 'text-orange-700/80 dark:text-orange-300/80',
				icon: 'text-orange-600 dark:text-orange-400',
				sparkline: 'stroke-orange-600 dark:stroke-orange-400',
				path: 'M0 20 C 30 20, 40 10, 70 10 S 100 5, 100 5',
			};
		case 'blue':
		default:
			return {
				bg: 'bg-blue-100 dark:bg-blue-900/30',
				border: 'dark:border-blue-500/20',
				textBase: 'text-blue-900 dark:text-blue-100',
				textAccent: 'text-blue-800 dark:text-blue-200',
				textMuted: 'text-blue-700/80 dark:text-blue-300/80',
				icon: 'text-blue-600 dark:text-blue-400',
				sparkline: 'stroke-blue-600 dark:stroke-blue-400',
				path: 'M0 25 L 20 25 L 40 15 L 60 15 L 80 5 L 100 0',
			};
	}
};

export function ResultsShowcase({
	metrics = defaultMetrics,
	title = 'Results that speak for themselves',
	description = 'We measure success by the outcomes that matter to your business—speed, conversions, and sustainable growth.',
	variant = 'split',
	className,
}: ResultsShowcaseProps) {
	const reduceMotion = useReducedMotion();
	const floatingAnim = reduceMotion ? {} : floatingAnimation;
	const floatingRevAnim = reduceMotion ? {} : floatingReverseAnimation;

	if (variant === 'split') {
		return (
			<section className={cn('relative w-full', className)}>
				<div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
					{/* Left Content */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						className="space-y-8 z-10 relative"
					>
						<motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-500/20 border border-blue-500/20 backdrop-blur-sm">
							<TrendingUp className="text-blue-600 dark:text-blue-400 w-4 h-4" />
							<span className="text-blue-600 dark:text-blue-400 font-medium text-sm">Proven Results</span>
						</motion.div>
						<motion.h2 variants={itemVariants} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground text-balance">
							{title.split('themselves')[0]}
							<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
								{title.includes('themselves') ? 'themselves' : title}
							</span>
						</motion.h2>
						<motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
							{description}
						</motion.p>

						<motion.div variants={itemVariants} className="space-y-4 pt-4">
							{[
								'Full-stack engineering for scalable growth',
								'Built-in SEO and performance optimization',
								'Seamless integration with your existing tools',
							].map((item, i) => (
								<div key={i} className="flex items-center gap-3">
									<div className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
										<Check className="w-3.5 h-3.5" />
									</div>
									<span className="text-foreground font-medium text-sm">{item}</span>
								</div>
							))}
						</motion.div>

						<motion.div variants={itemVariants} className="flex items-center space-x-2 text-muted-foreground text-sm font-medium pt-4 border-t border-border/50 max-w-md">
							<ArrowUpRight className="text-blue-500 w-5 h-5" />
							<span>Based on 120+ completed projects</span>
						</motion.div>
					</motion.div>

					{/* Right Metrics Grid */}
					<div className="relative z-10">
						<motion.div
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-100px' }}
							className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative"
						>
							{/* Connection SVG */}
							<svg className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20 dark:opacity-10 text-primary hidden sm:block" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
								<path d="M50 50 C 150 50, 150 150, 200 200 S 350 350, 350 350" stroke="currentColor" strokeDasharray="8 8" strokeWidth="2"></path>
							</svg>

							{metrics.map((metric, index) => {
								const Icon = metric.icon ?? TrendingUp;
								const style = getColorStyles(metric.colorTheme || 'emerald');
								const isOffset = index === 1 || index === 3;

								return (
									<motion.div 
										key={metric.label} 
										variants={itemVariants}
										className={cn('h-full', isOffset && 'sm:translate-y-12')} 
									>
										<div className="group relative w-full h-full cursor-pointer" style={{ perspective: 1000 }}>
											<div
												className="relative w-full h-full transition-transform duration-700 ease-in-out group-hover:transform-[rotateY(180deg)]"
												style={{ transformStyle: 'preserve-3d' }}
											>
												{/* Front of Card */}
												<div
													className={cn(
														'rounded-2xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] dark:shadow-none border border-transparent backdrop-blur-md relative overflow-hidden w-full h-full',
														style.bg,
														style.border
													)}
													style={{ backfaceVisibility: 'hidden' }}
												>
													{/* Abstract 3D Shapes */}
													{index === 0 && (
														<motion.div
															animate={floatingAnim}
															className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-60 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(255,255,255,0.1))] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.05)] backdrop-blur-sm"
														/>
													)}
													{index === 1 && (
														<motion.div
															animate={floatingAnim}
															className="absolute -bottom-2 -right-2 w-12 h-12 rounded-lg rotate-12 opacity-50 bg-[linear-gradient(135deg,rgba(255,255,255,0.6),rgba(255,255,255,0.1))] border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]"
														/>
													)}
													{index === 2 && (
														<motion.div
															animate={floatingRevAnim}
															className="absolute top-10 -right-6 w-20 h-20 rounded-full opacity-50 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(255,255,255,0.1))] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.05)] backdrop-blur-sm"
														/>
													)}
													{index === 3 && (
														<motion.div
															animate={floatingAnim}
															initial={{ y: -10 }}
															transition={{ delay: 1 }}
															className="absolute -top-6 left-10 w-14 h-14 rounded-xl rotate-45 opacity-60 bg-[linear-gradient(135deg,rgba(255,255,255,0.6),rgba(255,255,255,0.1))] border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]"
														/>
													)}

													<div className="relative z-10">
														<Icon className={cn('w-8 h-8 mb-4', style.icon)} />
														<motion.div
															initial={{ opacity: 0, scale: 0.5 }}
															whileInView={{ opacity: 1, scale: 1 }}
															transition={{ type: 'spring', stiffness: 100, delay: 0.2 + (index * 0.1) }}
															className={cn('text-5xl font-bold mb-2', style.textBase)}
														>
															{metric.value}
														</motion.div>
														<h3 className={cn('text-lg font-semibold mb-2', style.textAccent)}>{metric.label}</h3>
														<p className={cn('text-sm leading-relaxed', style.textMuted)}>{metric.description}</p>

														{/* Sparkline Graph */}
														<div className="mt-4 h-10 w-28">
															<svg className={cn("w-full h-full fill-none stroke-[3px] drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]", style.sparkline)} preserveAspectRatio="none" viewBox="0 0 100 30">
																<motion.path
																	initial={{ pathLength: 0 }}
																	whileInView={{ pathLength: 1 }}
																	transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 + (index * 0.1) }}
																	d={style.path}
																/>
															</svg>
														</div>
													</div>
												</div>

												{/* Back of Card (Case Study) */}
												<div
													className={cn(
														'absolute inset-0 rounded-2xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] dark:shadow-none border border-transparent backdrop-blur-md flex flex-col items-center justify-center text-center overflow-hidden',
														style.bg,
														style.border
													)}
													style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
												>
													<Icon className={cn('w-10 h-10 mb-4 opacity-50', style.icon)} />
													<h4 className={cn('text-lg font-bold mb-3', style.textBase)}>The Story</h4>
													<p className={cn('text-sm leading-relaxed', style.textMuted)}>
														{metric.caseStudy}
													</p>
												</div>
											</div>
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					</div>
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
							<h2 className='font-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance'>
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
							<h2 className='font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance'>{title}</h2>
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
