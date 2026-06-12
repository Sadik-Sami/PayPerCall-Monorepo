'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
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

function TestimonialCard({ testimonial }: { testimonial: TestimonialRecord }) {
	return (
		<div className='group flex h-full flex-col rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl'>
			<Quote className='mb-4 h-7 w-7 text-primary/30' />

			{testimonial.highlight && (
				<div className='mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
					{testimonial.highlight}
				</div>
			)}

			<blockquote className='mb-4 flex-1 text-sm leading-relaxed text-foreground/90'>
				&ldquo;{testimonial.quote}&rdquo;
			</blockquote>

			<div className='mb-4'>
				<StarRating rating={testimonial.rating} />
			</div>

			<div className='flex items-center gap-3'>
				<div className='flex size-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary'>
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

interface TestimonialGridProps {
	testimonials: TestimonialRecord[];
}

export function TestimonialGrid({ testimonials }: TestimonialGridProps) {
	return (
		<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
			<AnimatePresence mode='popLayout'>
				{testimonials.map((testimonial) => (
					<motion.div
						key={testimonial.id}
						layout
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.25, ease: 'easeOut' }}>
						<TestimonialCard testimonial={testimonial} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
