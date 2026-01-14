'use client';

import { motion } from 'framer-motion';
import { ChevronDown, AlertCircle, Lock, Zap, Sparkles } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import { useState } from 'react';

const iconMap = {
	alertCircle: AlertCircle,
	lock: Lock,
	zap: Zap,
	default: Sparkles,
};

type IconName = keyof typeof iconMap;

export interface Objection {
	icon: IconName;
	concern: string;
	answer: string;
	bulletPoints?: string[];
}

export interface ObjectionSectionProps {
	title?: string;
	subtitle?: string;
	objections: Objection[];
	className?: string;
}

export function ObjectionSection({
	title = 'Questions about our process?',
	subtitle = 'We address the real concerns we hear from every prospect.',
	objections,
	className,
}: ObjectionSectionProps) {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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

				{/* Objections grid */}
				<motion.div variants={containerVariants} className='grid gap-4 md:grid-cols-2'>
					{objections.map((objection, index) => {
						const Icon = iconMap[objection.icon] ?? iconMap.default;
						const isExpanded = expandedIndex === index;

						return (
							<motion.button
								key={objection.concern}
								variants={itemVariants}
								onClick={() => setExpandedIndex(isExpanded ? null : index)}
								className={cn(
									'group relative overflow-hidden rounded-2xl border transition-all duration-300 text-left',
									isExpanded ?
										'border-primary/40 bg-primary/5 shadow-lg col-span-2 md:col-span-2'
									:	'border-border/50 bg-card/80 hover:border-primary/30'
								)}>
								<div className={cn('p-6', isExpanded && 'pb-8')}>
									<div className='flex items-start justify-between gap-4'>
										<div className='space-y-2 flex-1'>
											<div className='flex items-center gap-3'>
												<Icon className='h-5 w-5 text-primary shrink-0' />
												<h3 className='font-semibold text-foreground'>{objection.concern}</h3>
											</div>
										</div>
										<ChevronDown
											className={cn(
												'h-5 w-5 text-muted-foreground transition-transform duration-300 shrink-0',
												isExpanded && 'rotate-180'
											)}
										/>
									</div>

									{/* Expanded content */}
									{isExpanded && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: 'auto' }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.3 }}
											className='mt-4 space-y-4'>
											<p className='text-sm text-muted-foreground leading-relaxed'>{objection.answer}</p>
											{objection.bulletPoints && objection.bulletPoints.length > 0 && (
												<ul className='space-y-2'>
													{objection.bulletPoints.map((point) => (
														<li key={point} className='flex items-start gap-3'>
															<span className='mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0' />
															<span className='text-sm text-muted-foreground'>{point}</span>
														</li>
													))}
												</ul>
											)}
										</motion.div>
									)}
								</div>
							</motion.button>
						);
					})}
				</motion.div>
			</motion.div>
		</section>
	);
}
