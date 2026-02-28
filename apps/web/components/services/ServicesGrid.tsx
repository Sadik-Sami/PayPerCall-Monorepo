'use client';

import { motion } from 'framer-motion';
import { ServiceCard } from './ServicesCard';
import { containerVariants } from '@/lib/animations';
import type { ServiceNavItem } from './types';

interface ServicesGridProps {
	services: ServiceNavItem[];
	className?: string;
}

export function ServicesGrid({ services, className }: ServicesGridProps) {
	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={className}>
			{services.map((service) => {
				return (
					<ServiceCard
						key={service.href}
						label={service.label}
						href={service.href}
						summary={service.summary ?? ''}
						capabilities={service.capabilities}
						icon={service.icon}
					/>
				);
			})}
		</motion.div>
	);
}
