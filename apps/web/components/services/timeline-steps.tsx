'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';

export interface TimelineStep {
	number: string;
	title: string;
	description: string;
	details?: string[];
	icon?: React.ReactNode;
}

export interface TimelineStepsProps {
	title?: string;
	subtitle?: string;
	steps: TimelineStep[];
	orientation?: 'vertical' | 'horizontal';
	className?: string;
}

export function TimelineSteps({
	title = 'Project timeline',
	subtitle = 'A clear roadmap from kickoff to launch.',
	steps,
	orientation = 'vertical',
	className,
}: TimelineStepsProps) {
	if (orientation === 'horizontal') {
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

					{/* Horizontal timeline */}
					<motion.div variants={containerVariants} className='relative'>
						{/* Connecting line */}
						<div className='absolute top-6 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent hidden md:block' />

						{/* Steps grid */}
						<div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
							{steps.map((step) => (
								<motion.div key={step.title} variants={itemVariants} className='relative pt-16 md:pt-20'>
									{/* Step number circle */}
									<div className='absolute -top-2 left-0 md:left-1/2 md:-translate-x-1/2'>
										<div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary'>
											{step.number}
										</div>
									</div>

									{/* Content */}
									<div className='ml-16 md:ml-0 rounded-lg border border-border/50 bg-card/80 p-6 backdrop-blur-sm'>
										{step.icon && <div className='mb-3 text-primary'>{step.icon}</div>}
										<h3 className='mb-2 font-semibold text-foreground'>{step.title}</h3>
										<p className='text-sm text-muted-foreground'>{step.description}</p>
										{step.details && step.details.length > 0 && (
											<ul className='mt-3 space-y-1'>
												{step.details.map((detail) => (
													<li key={detail} className='text-xs text-muted-foreground flex items-start gap-2'>
														<span className='mt-1 h-1 w-1 rounded-full bg-primary/50 shrink-0' />
														{detail}
													</li>
												))}
											</ul>
										)}
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</motion.div>
			</section>
		);
	}

	// Vertical timeline (default)
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

				{/* Vertical timeline */}
				<motion.div variants={containerVariants} className='space-y-6'>
					{steps.map((step, index) => (
						<motion.div key={step.title} variants={itemVariants} className='relative pl-8 md:pl-12'>
							{/* Timeline dot and line */}
							<div className='absolute left-0 top-0 flex flex-col items-center'>
								<div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary'>
									{step.number}
								</div>
								{index < steps.length - 1 && (
									<div className='mt-2 h-12 w-0.5 bg-linear-to-b from-primary/30 to-transparent' />
								)}
							</div>

							{/* Content */}
							<div className='rounded-lg border border-border/50 bg-card/80 p-6 backdrop-blur-sm'>
								{step.icon && <div className='mb-3 text-primary'>{step.icon}</div>}
								<h3 className='mb-2 font-semibold text-foreground'>{step.title}</h3>
								<p className='text-sm text-muted-foreground'>{step.description}</p>
								{step.details && step.details.length > 0 && (
									<ul className='mt-4 space-y-2'>
										{step.details.map((detail) => (
											<li key={detail} className='flex items-start gap-3'>
												<span className='mt-1 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0' />
												<span className='text-sm text-muted-foreground'>{detail}</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}
