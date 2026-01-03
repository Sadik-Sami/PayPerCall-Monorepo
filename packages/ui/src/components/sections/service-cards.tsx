'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export interface ServiceItem {
	title: string;
	description: string;
	features: string[];
	icon?: ReactNode;
}

export interface ServiceCardsProps {
	services: ServiceItem[];
	columns?: 1 | 2 | 3;
	className?: string;
}

export function ServiceCards({
	services,
	columns = 2,
	className,
}: ServiceCardsProps) {
	const gridCols = {
		1: 'grid-cols-1',
		2: 'grid-cols-1 md:grid-cols-2',
		3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
	};

	return (
		<div className={cn('grid gap-8', gridCols[columns], className)}>
			{services.map((service, idx) => (
				<motion.div
					key={idx}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: idx * 0.1 }}
					className='p-8 border border-border bg-card rounded-lg hover:border-primary/30 transition-colors duration-300'>
					<div className='flex items-center gap-4 mb-4'>
						{service.icon && (
							<div className='p-3 rounded-lg bg-background border border-border shrink-0'>
								{service.icon}
							</div>
						)}
						<div>
							<h3 className='text-xl font-bold text-foreground tracking-tight'>
								{service.title}
							</h3>
						</div>
					</div>
					<p className='text-muted-foreground mb-5 leading-relaxed'>
						{service.description}
					</p>
					<ul className='space-y-2.5'>
						{service.features.map((feature, featureIdx) => (
							<li
								key={featureIdx}
								className='flex items-start gap-2 text-sm text-muted-foreground'>
								<CheckCircle2 className='size-4 text-primary mt-0.5 shrink-0' />
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</motion.div>
			))}
		</div>
	);
}
