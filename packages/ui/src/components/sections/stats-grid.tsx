'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';

function Counter({ value }: { value: number }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	const springValue = useSpring(0, {
		mass: 1,
		stiffness: 100,
		damping: 30,
	});

	const displayValue = useTransform(springValue, (current) =>
		Math.round(current).toLocaleString()
	);

	useEffect(() => {
		if (isInView) {
			springValue.set(value);
		}
	}, [isInView, value, springValue]);

	return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export interface StatItem {
	label: string;
	value: number;
	suffix?: string;
	description?: string;
	icon?: ReactNode;
}

export interface StatsGridProps {
	stats: StatItem[];
	columns?: 2 | 3 | 4;
	className?: string;
}

export function StatsGrid({ stats, columns = 4, className }: StatsGridProps) {
	const gridCols = {
		2: 'grid-cols-1 sm:grid-cols-2',
		3: 'grid-cols-1 sm:grid-cols-3',
		4: 'grid-cols-2 lg:grid-cols-4',
	};

	return (
		<div className={cn('grid gap-6', gridCols[columns], className)}>
			{stats.map((stat, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: index * 0.1 }}
					className='flex flex-col items-center p-6 md:p-8 rounded-lg border border-border bg-card'>
					{stat.icon && (
						<div className='mb-4 p-3 rounded-lg bg-primary/10'>{stat.icon}</div>
					)}

					<h3 className='text-3xl md:text-4xl font-heading font-bold text-foreground mb-1 tabular-nums'>
						<Counter value={stat.value} />
						{stat.suffix}
					</h3>

					<p className='text-sm font-semibold text-foreground mb-1'>
						{stat.label}
					</p>
					{stat.description && (
						<p className='text-xs text-muted-foreground text-center'>
							{stat.description}
						</p>
					)}
				</motion.div>
			))}
		</div>
	);
}
