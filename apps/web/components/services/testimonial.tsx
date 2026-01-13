'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import { Button } from '@workspace/ui/components/button';
import Image from 'next/image';

export interface Testimonial {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating?: number;
	highlight?: string;
}

export interface TestimonialsSectionProps {
	testimonials?: Testimonial[];
	title?: string;
	description?: string;
	variant?: 'carousel' | 'grid' | 'featured';
	className?: string;
}

const defaultTestimonials: Testimonial[] = [
	{
		quote:
			"The team delivered a site that's faster and more conversion-focused than anything we've had before. Our lead volume increased by 40% in the first quarter.",
		author: 'Sarah Chen',
		role: 'VP of Marketing',
		company: 'TechFlow Inc.',
		rating: 5,
		highlight: '+40% lead volume',
	},
	{
		quote:
			'Working with them felt like an extension of our team. They understood our brand, met every deadline, and the final product exceeded expectations.',
		author: 'Marcus Johnson',
		role: 'Founder & CEO',
		company: 'GrowthLabs',
		rating: 5,
		highlight: 'On-time delivery',
	},
	{
		quote:
			'Our e-commerce rebuild resulted in a 2.3x improvement in mobile conversions. The attention to performance details made all the difference.',
		author: 'Emily Rodriguez',
		role: 'Head of Digital',
		company: 'Meridian Retail',
		rating: 5,
		highlight: '2.3x mobile conversions',
	},
];

function StarRating({ rating }: { rating: number }) {
	return (
		<div className='flex gap-0.5'>
			{Array.from({ length: 5 }).map((_, i) => (
				<Star
					key={i}
					className={cn('h-4 w-4', i < rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted')}
				/>
			))}
		</div>
	);
}

function TestimonialCard({ testimonial, isFeatured = false }: { testimonial: Testimonial; isFeatured?: boolean }) {
	return (
		<div
			className={cn(
				'group relative flex h-full flex-col rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl',
				isFeatured && 'md:p-8 lg:p-10'
			)}>
			{/* Quote icon */}
			<Quote className='mb-4 h-8 w-8 text-primary/30' />

			{/* Highlight badge */}
			{testimonial.highlight && (
				<div className='mb-4 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'>
					{testimonial.highlight}
				</div>
			)}

			{/* Quote */}
			<blockquote
				className={cn('mb-6 flex-1 text-foreground/90', isFeatured ? 'text-lg md:text-xl lg:text-2xl' : 'text-base')}>
				&ldquo;{testimonial.quote}&rdquo;
			</blockquote>

			{/* Rating */}
			{testimonial.rating && (
				<div className='mb-4'>
					<StarRating rating={testimonial.rating} />
				</div>
			)}

			{/* Author */}
			<div className='flex items-center gap-4'>
				{testimonial.avatar ?
					<Image
						src={testimonial.avatar}
						alt={testimonial.author}
						width={48}
						height={48}
						className='h-12 w-12 rounded-full object-cover ring-2 ring-border'
					/>
				:	<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
						<span className='text-lg font-semibold'>
							{testimonial.author
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</span>
					</div>
				}
				<div>
					<p className='font-semibold text-foreground'>{testimonial.author}</p>
					<p className='text-sm text-muted-foreground'>
						{testimonial.role} · {testimonial.company}
					</p>
				</div>
			</div>
		</div>
	);
}

export function TestimonialsSection({
	testimonials = defaultTestimonials,
	title = 'Trusted by teams who ship',
	description = 'Real feedback from clients who partnered with us to build performant, conversion-focused web experiences.',
	variant = 'carousel',
	className,
}: TestimonialsSectionProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	const nextSlide = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % testimonials.length);
	}, [testimonials.length]);

	const prevSlide = useCallback(() => {
		setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	}, [testimonials.length]);

	if (variant === 'grid') {
		return (
			<section className={cn('section-container py-20 lg:py-28', className)}>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='space-y-12'>
					{/* Header */}
					<motion.div variants={itemVariants} className='mx-auto max-w-2xl text-center'>
						<div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5'>
							<Building2 className='h-4 w-4 text-primary' />
							<span className='text-sm font-medium text-primary'>Client Stories</span>
						</div>
						<h2 className='mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'>{title}</h2>
						<p className='text-muted-foreground'>{description}</p>
					</motion.div>

					{/* Grid */}
					<motion.div variants={itemVariants} className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{testimonials.map((testimonial) => (
							<TestimonialCard key={testimonial.author} testimonial={testimonial} />
						))}
					</motion.div>
				</motion.div>
			</section>
		);
	}

	if (variant === 'featured') {
		if (testimonials.length === 0) {
			return null;
		}
		const featured = testimonials[0];
		if (!featured) {
			return null;
		}
		const rest = testimonials.slice(1);

		return (
			<section className={cn('section-container py-20 lg:py-28', className)}>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='space-y-12'>
					{/* Header */}
					<motion.div variants={itemVariants} className='mx-auto max-w-2xl text-center'>
						<div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5'>
							<Building2 className='h-4 w-4 text-primary' />
							<span className='text-sm font-medium text-primary'>Client Stories</span>
						</div>
						<h2 className='mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'>{title}</h2>
						<p className='text-muted-foreground'>{description}</p>
					</motion.div>

					{/* Featured + Grid */}
					<motion.div variants={itemVariants} className='grid gap-6 lg:grid-cols-2'>
						<TestimonialCard testimonial={featured} isFeatured />
						<div className='grid gap-6'>
							{rest.slice(0, 2).map((testimonial) => (
								<TestimonialCard key={testimonial.author} testimonial={testimonial} />
							))}
						</div>
					</motion.div>
				</motion.div>
			</section>
		);
	}

	// Carousel variant (default)
	return (
		<section className={cn('overflow-hidden py-20 lg:py-28', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='space-y-12'>
					{/* Header */}
					<motion.div variants={itemVariants} className='mx-auto max-w-2xl text-center'>
						<div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5'>
							<Building2 className='h-4 w-4 text-primary' />
							<span className='text-sm font-medium text-primary'>Client Stories</span>
						</div>
						<h2 className='mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'>{title}</h2>
						<p className='text-muted-foreground'>{description}</p>
					</motion.div>

					{/* Carousel */}
					<motion.div variants={itemVariants} className='relative'>
						<div className='mx-auto max-w-4xl'>
							{testimonials.length > 0 && testimonials[activeIndex] && (
								<AnimatePresence mode='wait'>
									<motion.div
										key={activeIndex}
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -50 }}
										transition={{ duration: 0.3 }}>
										<TestimonialCard testimonial={testimonials[activeIndex]} isFeatured />
									</motion.div>
								</AnimatePresence>
							)}
						</div>

						{/* Navigation */}
						<div className='mt-8 flex items-center justify-center gap-4'>
							<Button variant='outline' size='icon' onClick={prevSlide} className='rounded-full'>
								<ChevronLeft className='h-4 w-4' />
								<span className='sr-only'>Previous</span>
							</Button>

							{/* Dots */}
							<div className='flex gap-2'>
								{testimonials.map((_, i) => (
									<button
										key={i}
										onClick={() => setActiveIndex(i)}
										className={cn(
											'h-2 w-2 rounded-full transition-all duration-300',
											i === activeIndex ? 'w-6 bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
										)}>
										<span className='sr-only'>Go to slide {i + 1}</span>
									</button>
								))}
							</div>

							<Button variant='outline' size='icon' onClick={nextSlide} className='rounded-full'>
								<ChevronRight className='h-4 w-4' />
								<span className='sr-only'>Next</span>
							</Button>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
