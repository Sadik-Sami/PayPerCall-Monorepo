'use client';

import { motion } from 'framer-motion';
import { Clock, Database, GitBranch, Sparkles } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';

const iconMap = {
	clock: Clock,
	database: Database,
	gitBranch: GitBranch,
	default: Sparkles,
};

type IconName = keyof typeof iconMap;

export interface SuccessOutcome {
	icon?: IconName;
	metric: string;
	label: string;
	description: string;
	context?: string;
}

export interface ClientSuccessBreakdownProps {
	title?: string;
	subtitle?: string;
	outcomes: SuccessOutcome[];
	section?: string;
	className?: string;
}

export function ClientSuccessBreakdown({
	title = 'Real outcomes from our clients',
	subtitle = 'Measured results that matter to your business.',
	outcomes,
	className,
}: ClientSuccessBreakdownProps) {
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
					<h2 className='mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl'>{title}</h2>
					{subtitle && <p className='text-lg text-muted-foreground'>{subtitle}</p>}
				</motion.div>

				{/* Outcomes grid */}
				<motion.div variants={containerVariants} className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{outcomes.map((outcome) => {
						const Icon = outcome.icon ? (iconMap[outcome.icon] ?? iconMap.default) : iconMap.default;
						return (
							<motion.div
								key={outcome.label}
								variants={itemVariants}
								className='group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg'>
								<div className='space-y-4'>
									<Icon className='h-6 w-6 text-primary' />
									<div>
										<p className='text-3xl font-bold text-foreground lg:text-4xl'>{outcome.metric}</p>
										<p className='text-sm font-medium text-muted-foreground'>{outcome.label}</p>
									</div>
									<p className='text-sm text-muted-foreground'>{outcome.description}</p>
									{outcome.context && (
										<p className='border-t border-border/50 pt-4 text-xs text-muted-foreground'>{outcome.context}</p>
									)}
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</motion.div>
		</section>
	);
}
