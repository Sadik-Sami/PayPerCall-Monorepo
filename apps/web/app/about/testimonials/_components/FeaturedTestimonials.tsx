'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import { FEATURED_TESTIMONIALS } from '../_data/testimonials-content';
import type { TestimonialRecord } from '../_data/testimonials-content';

function StarRating({ rating }: { rating: number }) {
	return (
		<div className='flex gap-0.5'>
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={cn(
						'h-4 w-4',
						i < rating ? 'fill-pastel-peach-strong text-pastel-peach-strong' : 'fill-muted text-muted',
					)}
				/>
			))}
		</div>
	);
}

function FeaturedCard({ testimonial, isPrimary = false }: { testimonial: TestimonialRecord; isPrimary?: boolean }) {
	return (
		<div
			className={cn(
				'group relative flex h-full flex-col rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl',
				isPrimary ? 'p-6 sm:p-8' : 'p-6',
			)}>
			<Quote className='mb-4 h-8 w-8 text-primary/30' />

			{testimonial.highlight && (
				<div className='mb-4 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
					{testimonial.highlight}
				</div>
			)}

			<blockquote className={cn('mb-6 flex-1 text-foreground/90', isPrimary ? 'text-lg sm:text-xl lg:text-2xl' : 'text-base')}>
				&ldquo;{testimonial.quote}&rdquo;
			</blockquote>

			<div className='mb-4'>
				<StarRating rating={testimonial.rating} />
			</div>

			<div className='flex items-center gap-3'>
				<div className='flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary'>
					{testimonial.author
						.split(' ')
						.map((s) => s.charAt(0))
						.join('')
						.slice(0, 2)
						.toUpperCase()}
				</div>
				<div>
					<p className='text-sm font-semibold text-foreground'>{testimonial.author}</p>
					<p className='text-xs text-muted-foreground'>
						{testimonial.role} · {testimonial.company}
					</p>
				</div>
			</div>
		</div>
	);
}

export function FeaturedTestimonials() {
	const [primary, ...rest] = FEATURED_TESTIMONIALS;

	return (
		<section className='section-container py-16 sm:py-20'>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='space-y-10'>
				<motion.div variants={itemVariants} className='mx-auto max-w-2xl text-center'>
					<div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5'>
						<Star className='h-4 w-4 text-primary' />
						<span className='text-sm font-medium text-primary'>Featured Stories</span>
					</div>
					<h2 className='font-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
						Highlights from our client portfolio
					</h2>
					<p className='text-muted-foreground'>
						These results demonstrate the impact of connecting acquisition, delivery, and reporting under one accountable team.
					</p>
				</motion.div>

				<motion.div variants={itemVariants} className='grid gap-6 lg:grid-cols-2'>
					{primary && <FeaturedCard testimonial={primary} isPrimary />}
					<div className='grid gap-6'>
						{rest.map((testimonial) => (
							<FeaturedCard key={testimonial.id} testimonial={testimonial} />
						))}
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
