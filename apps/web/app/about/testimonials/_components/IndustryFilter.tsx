'use client';

import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { INDUSTRY_FILTERS, type IndustryFilter } from '../_data/testimonials-content';

interface IndustryFilterProps {
	activeFilter: IndustryFilter;
	onFilterChange: (filter: IndustryFilter) => void;
}

export function IndustryFilter({ activeFilter, onFilterChange }: IndustryFilterProps) {
	return (
		<div className='mb-8 flex flex-wrap items-center justify-center gap-2'>
			{INDUSTRY_FILTERS.map((filter) => (
				<motion.button
					key={filter}
					onClick={() => onFilterChange(filter)}
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					className={cn(
						'cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200',
						activeFilter === filter
							? 'border-primary bg-primary text-primary-foreground'
							: 'border-border/70 bg-card/80 text-foreground hover:border-primary/40 hover:bg-primary/5',
					)}>
					{filter}
				</motion.button>
			))}
		</div>
	);
}
