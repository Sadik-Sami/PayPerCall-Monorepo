'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';

export interface ResultItem {
	label: string;
	before: string;
	after: string;
	improvement: string;
	context?: string;
	icon?: React.ReactNode;
}

export interface ResultsGalleryProps {
	title?: string;
	subtitle?: string;
	results: ResultItem[];
	className?: string;
}

export function ResultsGallery({
	title = 'Measurable improvements',
	subtitle = 'Service-specific outcomes from real projects.',
	results,
	className,
}: ResultsGalleryProps) {
	return (
		<section className={cn('py-16 md:py-24', className)}>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='space-y-12'>
				{/* Header */}
				<motion.div variants={itemVariants} className='max-w-3xl'>
					<h2 className='mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'>{title}</h2>
					{subtitle && <p className='text-lg text-muted-foreground'>{subtitle}</p>}
				</motion.div>

				{/* Results grid */}
				<motion.div variants={containerVariants} className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{results.map((result) => (
						<motion.div
							key={result.label}
							variants={itemVariants}
							className='group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg'>
							{/* Icon or indicator */}
							<div className='mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1'>
								<TrendingUp className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
								<span className='text-xs font-medium text-emerald-600 dark:text-emerald-400'>{result.improvement}</span>
							</div>

							{/* Label */}
							<h3 className='mb-6 font-semibold text-foreground'>{result.label}</h3>

							{/* Before/After comparison */}
							<div className='space-y-4'>
								<div>
									<p className='text-xs font-medium uppercase tracking-wider text-muted-foreground/70 mb-2'>Before</p>
									<p className='text-2xl font-bold text-muted-foreground'>{result.before}</p>
								</div>
								<div className='flex justify-center py-2'>
									<ArrowUpRight className='h-5 w-5 text-emerald-600 dark:text-emerald-400' />
								</div>
								<div>
									<p className='text-xs font-medium uppercase tracking-wider text-muted-foreground/70 mb-2'>After</p>
									<p className='text-2xl font-bold text-foreground'>{result.after}</p>
								</div>
							</div>

							{result.context && (
								<p className='mt-6 border-t border-border/50 pt-4 text-xs text-muted-foreground'>{result.context}</p>
							)}
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}
