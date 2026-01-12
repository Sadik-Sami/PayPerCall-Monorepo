'use client';

import { motion } from 'framer-motion';
import { ServiceCard } from './ServicesCard';
import { containerVariants } from '@/lib/animations';
import type { ServiceNavItem } from './types';
import { Globe, Code2, Building2, ShoppingCart, FileText, type LucideIcon } from 'lucide-react';

// Icon mapping for client-side resolution
const iconMap: Record<string, LucideIcon> = {
	Globe,
	Code2,
	Building2,
	ShoppingCart,
	FileText,
};

interface AnimatedServicesGridProps {
	services: ServiceNavItem[];
	className?: string;
}

export function AnimatedServicesGrid({ services, className }: AnimatedServicesGridProps) {
	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			className={className}>
			{services.map((service) => {
				// Resolve icon from iconName for client-side rendering
				const IconComponent = service.iconName ? iconMap[service.iconName] : service.icon;

				return (
					<ServiceCard
						key={service.href}
						label={service.label}
						href={service.href}
						summary={service.summary ?? ''}
						capabilities={service.capabilities}
						icon={IconComponent}
					/>
				);
			})}
		</motion.div>
	);
}
