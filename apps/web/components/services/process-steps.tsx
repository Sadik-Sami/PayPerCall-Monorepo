'use client';
import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, cardVariants } from '@/lib/animations';
import type { ProcessStepsProps } from '@/types/services';

export function ProcessSteps({ steps, title, description, variant = 'grid', className }: ProcessStepsProps) {
	if (variant === 'timeline') {
		return (
			<section className={cn('section-container py-16', className)}>
				{(title || description) && (
					<div className='mb-12 max-w-3xl'>
						{title && <h2 className='mb-4 text-foreground'>{title}</h2>}
						{description && <p className='text-muted-foreground'>{description}</p>}
					</div>
				)}

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='relative'>
					{/* Timeline line */}
					<div className='absolute left-8 top-0 hidden h-full w-px bg-linear-to-b from-primary/50 via-primary/20 to-transparent lg:block' />

					<div className='space-y-8'>
						{steps.map((step, index) => (
							<motion.div key={step.title} variants={cardVariants} className='group relative flex gap-6 lg:gap-12'>
								{/* Step number */}
								<div className='relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-glow'>
									{String(index + 1).padStart(2, '0')}
								</div>

								{/* Content card */}
								<div className='flex-1 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg'>
									<p className='mb-1 text-xs font-semibold uppercase tracking-wider text-primary'>Step {index + 1}</p>
									<h3 className='mb-3 text-xl font-semibold text-foreground'>{step.title}</h3>
									<p className='text-muted-foreground'>{step.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</section>
		);
	}

	if (variant === 'cards') {
		return (
			<section className={cn('section-container py-16', className)}>
				{(title || description) && (
					<div className='mb-12 text-center'>
						{title && <h2 className='mb-4 text-foreground text-3xl md:text-4xl lg:text-5xl font-bold'>{title}</h2>}
						{description && <p className='mx-auto max-w-3xl text-muted-foreground'>{description}</p>}
					</div>
				)}

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
					{steps.map((step, index) => (
						<motion.div
							key={step.title}
							variants={cardVariants}
							className='group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl'>
							{/* Background gradient on hover */}
							<div className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100' />

							<div className='relative'>
								<div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-lg font-bold text-primary-foreground shadow-glow'>
									{String(index + 1).padStart(2, '0')}
								</div>
								<h3 className='mb-2 text-lg font-semibold text-foreground'>{step.title}</h3>
								<p className='text-sm text-muted-foreground'>{step.description}</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</section>
		);
	}

	// Default grid variant - asymmetric 2x2 grid
	return (
		<section
			className={cn(
				'rounded-3xl border border-border/50 bg-linear-to-br from-card via-card to-primary/5 p-8 lg:p-12',
				className
			)}>
			{(title || description) && (
				<div className='mb-10 max-w-2xl'>
					{title && <h2 className='mb-4 text-foreground'>{title}</h2>}
					{description && <p className='text-muted-foreground'>{description}</p>}
				</div>
			)}

			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='grid gap-6 md:grid-cols-2'>
				{steps.map((step, index) => (
					<motion.div
						key={step.title}
						variants={cardVariants}
						className='group rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg'>
						<div className='mb-4 flex items-center gap-4'>
							<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground'>
								{String(index + 1).padStart(2, '0')}
							</div>
							<div>
								<p className='text-xs font-semibold uppercase tracking-wider text-primary/80'>Step {index + 1}</p>
								<h3 className='text-lg font-semibold text-foreground'>{step.title}</h3>
							</div>
						</div>
						<p className='text-muted-foreground'>{step.description}</p>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
}
