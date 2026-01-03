'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';

export interface ProcessStep {
	step: number;
	title: string;
	description: string;
	icon?: ReactNode;
}

export interface ProcessStepsProps {
	steps: ProcessStep[];
	columns?: 3 | 4;
	className?: string;
}

export function ProcessSteps({
	steps,
	columns = 4,
	className,
}: ProcessStepsProps) {
	const gridCols = {
		3: 'lg:grid-cols-3',
		4: 'lg:grid-cols-4',
	};

	return (
		<div
			className={cn(
				'grid grid-cols-1 md:grid-cols-2 gap-8',
				gridCols[columns],
				className
			)}>
			{steps.map((step, idx) => (
				<motion.div
					key={idx}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: idx * 0.1 }}
					className='relative'>
					{/* Connector line (hidden on last item and mobile) */}
					{idx < steps.length - 1 && (
						<div className='hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border' />
					)}

					<div className='flex flex-col items-center text-center'>
						{/* Step number circle */}
						<div className='relative mb-6'>
							<div className='flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-border'>
								{step.icon}
							</div>
							<div className='absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>
								{step.step}
							</div>
						</div>

						<h3 className='text-lg font-bold text-foreground mb-2'>
							{step.title}
						</h3>
						<p className='text-sm text-muted-foreground leading-relaxed'>
							{step.description}
						</p>
					</div>
				</motion.div>
			))}
		</div>
	);
}
