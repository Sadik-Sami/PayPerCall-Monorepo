'use client';

import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import { DETAILED_STORIES } from '../_data/testimonials-content';
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

function StoryCard({ testimonial, index }: { testimonial: TestimonialRecord; index: number }) {
	const isReversed = index % 2 !== 0;

	if (!testimonial.detailedStory) {
		return null;
	}

	return (
		<motion.div
			variants={itemVariants}
			className={cn(
				'grid gap-8 lg:grid-cols-2 lg:items-center',
				isReversed && 'lg:[direction:rtl]',
			)}>
			<div className={cn('space-y-5', isReversed && 'lg:[direction:ltr]')}>
				<div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
					{testimonial.service} · {testimonial.industry}
				</div>

				<blockquote className='text-lg font-medium leading-relaxed text-foreground sm:text-xl'>
					&ldquo;{testimonial.quote}&rdquo;
				</blockquote>

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
					<div className='ml-auto'>
						<StarRating rating={testimonial.rating} />
					</div>
				</div>
			</div>

			<div className={cn('space-y-4 rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm', isReversed && 'lg:[direction:ltr]')}>
				<div>
					<h4 className='mb-1 text-xs font-semibold uppercase tracking-wider text-destructive'>Challenge</h4>
					<p className='text-sm leading-relaxed text-muted-foreground'>{testimonial.detailedStory.challenge}</p>
				</div>
				<div className='border-t border-border/50 pt-4'>
					<h4 className='mb-1 text-xs font-semibold uppercase tracking-wider text-primary'>Solution</h4>
					<p className='text-sm leading-relaxed text-muted-foreground'>{testimonial.detailedStory.solution}</p>
				</div>
				<div className='border-t border-border/50 pt-4'>
					<h4 className='mb-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground'>Result</h4>
					<p className='text-sm leading-relaxed text-muted-foreground'>{testimonial.detailedStory.result}</p>
				</div>
			</div>
		</motion.div>
	);
}

export function DetailedStories() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='space-y-12'>
				<motion.div variants={itemVariants} className='mx-auto max-w-2xl text-center'>
					<div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5'>
						<ArrowRight className='h-4 w-4 text-primary' />
						<span className='text-sm font-medium text-primary'>Deep Dives</span>
					</div>
					<h2 className='font-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
						Behind the results
					</h2>
					<p className='text-muted-foreground'>
						Every engagement starts with a challenge. Here is how Core Closer helped these teams move from problem to outcome.
					</p>
				</motion.div>

				<div className='space-y-12'>
					{DETAILED_STORIES.map((testimonial, index) => (
						<StoryCard key={testimonial.id} testimonial={testimonial} index={index} />
					))}
				</div>
			</motion.div>
		</section>
	);
}
