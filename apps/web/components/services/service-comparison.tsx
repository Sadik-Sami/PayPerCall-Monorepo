'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';

export interface ComparisonFeature {
	name: string;
	included: boolean[] | ('Yes' | 'No' | 'Optional')[];
}

export interface ComparisonTier {
	name: string;
	description: string;
	recommended?: boolean;
}

export interface ServiceComparisonProps {
	title?: string;
	subtitle?: string;
	tiers: ComparisonTier[];
	features: ComparisonFeature[];
	className?: string;
}

export function ServiceComparison({
	title = 'Choose the right tier for your needs',
	subtitle = 'All plans include strategy consultation and launch support.',
	tiers,
	features,
	className,
}: ServiceComparisonProps) {
	const getIcon = (value: boolean | string) => {
		if (typeof value === 'boolean') {
			return value ?
					<Check className='h-5 w-5 text-emerald-600 dark:text-emerald-400' />
				:	<X className='h-5 w-5 text-muted-foreground/50' />;
		}
		if (value === 'Yes') return <Check className='h-5 w-5 text-emerald-600 dark:text-emerald-400' />;
		if (value === 'No') return <X className='h-5 w-5 text-muted-foreground/50' />;
		return <span className='text-xs font-medium text-muted-foreground'>Optional</span>;
	};

	const getFeatureValue = (value: boolean | string) => {
		if (typeof value === 'boolean') return '';
		return value;
	};

	return (
		<section className={cn('py-16 md:py-24 overflow-x-auto', className)}>
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

				{/* Comparison table */}
				<motion.div
					variants={itemVariants}
					className='rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-border/50'>
								<th className='px-6 py-4 text-left text-sm font-semibold text-foreground'>Feature</th>
								{tiers.map((tier, idx) => (
									<th
										key={tier.name}
										className={cn(
											'px-6 py-4 text-center text-sm font-semibold whitespace-nowrap',
											tier.recommended && 'bg-primary/5',
											idx === 0 && 'border-r border-border/30',
											idx === tiers.length - 1 && idx > 0 && 'border-l border-border/30'
										)}>
										<div className='flex flex-col items-center gap-2'>
											<span className='text-foreground'>{tier.name}</span>
											{tier.recommended && (
												<span className='inline-block px-2 py-1 rounded text-xs font-medium bg-primary/20 text-primary'>
													Recommended
												</span>
											)}
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{features.map((feature, idx) => (
								<tr
									key={feature.name}
									className={cn('border-b border-border/30 last:border-b-0', idx % 2 === 0 && 'bg-muted/30')}>
									<td className='px-6 py-4 text-sm font-medium text-foreground'>{feature.name}</td>
									{feature.included.map((value, tierIdx) => (
										<td
											key={`${feature.name}-${tierIdx}`}
											className={cn('px-6 py-4 text-center', tiers[tierIdx]?.recommended && 'bg-primary/5')}>
											<div className='flex justify-center'>{getIcon(value)}</div>
											{getFeatureValue(value) && (
												<p className='text-xs text-muted-foreground mt-1'>{getFeatureValue(value)}</p>
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</motion.div>
			</motion.div>
		</section>
	);
}
