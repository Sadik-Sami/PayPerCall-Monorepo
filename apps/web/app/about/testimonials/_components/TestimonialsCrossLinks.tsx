'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';
import { TESTIMONIALS_CROSS_LINKS } from '../_data/testimonials-content';

export function TestimonialsCrossLinks() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='space-y-10'>
				<motion.div variants={itemVariants} className='text-center'>
					<h2 className='font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
						Explore Core Closer
					</h2>
					<p className='mt-3 text-muted-foreground'>
						Learn more about our capabilities, approach, and the team behind the results.
					</p>
				</motion.div>

				<motion.div variants={itemVariants} className='grid gap-5 sm:grid-cols-3'>
					{TESTIMONIALS_CROSS_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className='group flex flex-col rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl'>
							<h3 className='font-heading text-lg font-semibold text-foreground'>{link.title}</h3>
							<p className='mt-2 flex-1 text-sm text-muted-foreground'>{link.description}</p>
							<span className='mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:gap-2.5'>
								{link.label}
								<ArrowRight className='size-4' />
							</span>
						</Link>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}
