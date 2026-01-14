'use client';

import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';

export interface Integration {
	name: string;
	icon?: LucideIcon;
	logo?: { src: string; alt: string };
	category: string;
	description: string;
}

export interface IntegrationShowcaseProps {
	title?: string;
	subtitle?: string;
	description?: string;
	integrations: Integration[];
	className?: string;
}

export function IntegrationShowcase({
	title = 'Connected ecosystem',
	subtitle = 'Tools we integrate with to extend your capabilities',
	description,
	integrations,
	className,
}: IntegrationShowcaseProps) {
	// Group integrations by category
	const grouped = integrations.reduce(
		(acc, integration) => {
			if (!acc[integration.category]) {
				acc[integration.category] = [];
			}
			acc[integration.category]?.push(integration);
			return acc;
		},
		{} as Record<string, Integration[]>
	);

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
					{subtitle && <p className='text-lg text-muted-foreground mb-4'>{subtitle}</p>}
					{description && <p className='text-muted-foreground'>{description}</p>}
				</motion.div>

				{/* Categories with integrations */}
				<motion.div variants={containerVariants} className='space-y-8'>
					{Object.entries(grouped).map(([category, items]) => (
						<motion.div key={category} variants={itemVariants} className='space-y-4'>
							<h3 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>{category}</h3>
							<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
								{items.map((integration) => {
									const Icon = integration.icon;

									return (
										<motion.div
											key={integration.name}
											variants={itemVariants}
											className='group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md'>
											<div className='space-y-3'>
												{Icon ?
													<Icon className='h-8 w-8 text-primary' />
												: integration.logo ?
													<Image
														src={integration.logo.src || '/placeholder.svg'}
														alt={integration.logo.alt}
														width={32}
														height={32}
														className='h-8 w-8 opacity-80 group-hover:opacity-100'
													/>
												:	<div className='h-8 w-8 rounded bg-primary/20' />}
												<div>
													<p className='font-medium text-sm text-foreground'>{integration.name}</p>
													<p className='text-xs text-muted-foreground mt-1'>{integration.description}</p>
												</div>
											</div>
										</motion.div>
									);
								})}
							</div>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}
