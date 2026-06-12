'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';
import { TESTIMONIALS, type IndustryFilter, type TestimonialRecord } from '../_data/testimonials-content';
import { IndustryFilter as IndustryFilterChips } from './IndustryFilter';
import { TestimonialGrid } from './TestimonialGrid';

function filterTestimonials(testimonials: TestimonialRecord[], filter: IndustryFilter): TestimonialRecord[] {
	if (filter === 'All') {
		return testimonials;
	}
	return testimonials.filter((t) => t.industry === filter);
}

export function FilterableTestimonials() {
	const [activeFilter, setActiveFilter] = useState<IndustryFilter>('All');
	const filtered = useMemo(() => filterTestimonials(TESTIMONIALS, activeFilter), [activeFilter]);

	return (
		<section className='section-container py-16 sm:py-20'>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='space-y-8'>
				<motion.div variants={itemVariants} className='mx-auto max-w-2xl text-center'>
					<div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5'>
						<Building2 className='h-4 w-4 text-primary' />
						<span className='text-sm font-medium text-primary'>All Testimonials</span>
					</div>
					<h2 className='font-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
						What clients say across every engagement
					</h2>
					<p className='text-muted-foreground'>
						Filter by industry to see relevant results from your sector.
					</p>
				</motion.div>

				<motion.div variants={itemVariants}>
					<IndustryFilterChips activeFilter={activeFilter} onFilterChange={setActiveFilter} />
				</motion.div>

				<motion.div variants={itemVariants}>
					<TestimonialGrid testimonials={filtered} />
				</motion.div>
			</motion.div>
		</section>
	);
}
