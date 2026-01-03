'use client';

import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';

export interface SectionHeaderProps {
	badge?: string;
	title: string;
	highlight?: string;
	subtitle?: string;
	align?: 'left' | 'center';
	className?: string;
}

export function SectionHeader({
	badge,
	title,
	highlight,
	subtitle,
	align = 'center',
	className,
}: SectionHeaderProps) {
	return (
		<div
			className={cn(
				'mb-16',
				align === 'center' ? 'text-center' : 'text-left',
				className
			)}>
			{badge && (
				<motion.span
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full'>
					{badge}
				</motion.span>
			)}

			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground mb-4'>
				{title}
				{highlight && <span className='text-primary'> {highlight}</span>}
			</motion.h2>

			{subtitle && (
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
					className={cn(
						'text-muted-foreground text-lg',
						align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
					)}>
					{subtitle}
				</motion.p>
			)}
		</div>
	);
}
