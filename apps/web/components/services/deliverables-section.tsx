'use client';

import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import type { DeliverablesSectionProps } from '@/types/services';

export function DeliverablesSection({
	title = 'Deliverables that keep full-stack work predictable',
	subtitle = 'Each engagement includes clear artifacts that align product, engineering, and operations.',
	standards = [],
	deliverables,
	className,
}: DeliverablesSectionProps) {
	return (
		<section className={cn('section-container py-16 md:py-20', className)}>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:gap-12'>
				<motion.div variants={itemVariants} className='space-y-6'>
					<h2 className='text-3xl font-bold tracking-tight text-foreground md:text-4xl'>{title}</h2>
					{subtitle && <p className='text-lg text-muted-foreground'>{subtitle}</p>}
					{standards.length > 0 && (
						<div className='rounded-2xl border border-border/50 bg-card/60 p-5'>
							<p className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>Engineering standards</p>
							<ul className='mt-4 space-y-2 text-sm text-muted-foreground'>
								{standards.map((standard) => (
									<li key={standard} className='flex items-start gap-3'>
										<span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60' />
										<span>{standard}</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</motion.div>

				<motion.div variants={itemVariants} className='grid gap-4 sm:grid-cols-2'>
					{deliverables.map((item) => (
						<div
							key={item.title}
							className='rounded-2xl border border-border/50 bg-card/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg'>
							<h3 className='mb-2 text-base font-semibold text-foreground'>{item.title}</h3>
							<p className='text-sm text-muted-foreground'>{item.description}</p>
							{item.bulletPoints && item.bulletPoints.length > 0 && (
								<ul className='mt-4 space-y-2 text-xs text-muted-foreground'>
									{item.bulletPoints.map((point) => (
										<li key={point} className='flex items-start gap-2'>
											<span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50' />
											<span>{point}</span>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}

