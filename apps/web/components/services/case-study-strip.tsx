"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, cardVariants } from '@/lib/animations';
import type { CaseStudyStripProps } from '@/types/services';

export function CaseStudyStrip({ items, title, description, className }: CaseStudyStripProps) {
	if (!items.length) return null;

	return (
		<section className={cn('w-full', className)}>
			<div className="section-container">
			{(title || description) && (
				<div className='mb-8 md:mb-10 lg:mb-12 max-w-2xl'>
					{title && <h2 className='font-heading mb-4 text-foreground text-2xl md:text-3xl font-bold text-balance'>{title}</h2>}
					{description && <p className='text-muted-foreground text-lg'>{description}</p>}
				</div>
			)}

			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='grid gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10'>
				{items.map((item) => (
					<motion.div
						key={item.client || item.problem}
						variants={cardVariants}
						className='group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl'>
						{/* Header */}
						<div className='border-b border-border/50 p-6'>
							<div className='flex items-start justify-between gap-4'>
								<div>
									{item.industry && (
										<p className='mb-1 text-xs font-semibold uppercase tracking-wider text-primary'>{item.industry}</p>
									)}
									{item.client && <h3 className='text-lg font-semibold text-foreground'>{item.client}</h3>}
								</div>
								{item.icon && (
									<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary'>
										{item.icon}
									</div>
								)}
							</div>
						</div>

						{/* Content */}
						<div className='flex flex-1 flex-col p-6'>
							<div className='flex-1 space-y-4'>
								<div>
									<p className='mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Challenge</p>
									<p className='text-sm text-foreground'>{item.problem}</p>
								</div>
								<div>
									<p className='mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Solution</p>
									<p className='text-sm text-muted-foreground'>{item.solution}</p>
								</div>
							</div>

							{/* Outcome */}
							<div className='mt-6 rounded-xl bg-primary/5 p-4'>
								<p className='mb-2 text-xs font-semibold uppercase tracking-wider text-primary'>Outcome</p>
								<p className='text-sm font-medium text-foreground'>{item.outcome}</p>
							</div>

							{/* Metrics */}
							{item.metrics && item.metrics.length > 0 && (
								<div className='mt-4 flex gap-4'>
									{item.metrics.map((metric) => (
										<div key={metric.label} className='flex-1'>
											<p className='text-2xl font-bold text-primary tabular-nums'>{metric.value}</p>
											<p className='text-xs text-muted-foreground'>{metric.label}</p>
										</div>
									))}
								</div>
							)}

							{/* Link */}
							{item.link && (
								<a
									href={item.link}
									className='mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline'>
									View full case study
									<ArrowUpRight className='h-4 w-4' />
								</a>
							)}
						</div>
					</motion.div>
				))}
			</motion.div>
			</div>
		</section>
	);
}
