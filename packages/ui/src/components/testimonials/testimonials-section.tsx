'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeader } from '@workspace/ui/components/sections';
import { Marquee } from '@workspace/ui/components/ui/marquee';
import { cn } from '@workspace/ui/lib/utils';

export type TestimonialRecord = {
	name: string;
	role: string;
	company: string;
	quote: string;
	highlight?: string;
	avatarUrl?: string;
};

export type TestimonialsSectionProps = {
	badge?: string;
	title: string;
	highlight?: string;
	subtitle?: string;
	testimonials: TestimonialRecord[];
	columns?: number;
	showStars?: boolean;
	className?: string;
};

function chunkTestimonials(testimonials: TestimonialRecord[], columns: number) {
	const safeColumns = Math.max(1, Math.min(columns, testimonials.length || 1));
	return Array.from({ length: safeColumns }, (_, columnIndex) =>
		testimonials.filter((_, idx) => idx % safeColumns === columnIndex)
	);
}

function TestimonialCard({ record, showStars }: { record: TestimonialRecord; showStars: boolean }) {
	return (
		<div
			className={cn(
				'flex w-full flex-col gap-6 rounded-xl border border-border/60 bg-card/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
			)}>
			<div className='text-sm text-muted-foreground'>
				<p>
					{record.quote}{' '}
					{record.highlight ? <span className='bg-primary/10 px-1 font-semibold text-primary'>{record.highlight}</span> : null}
				</p>
				{showStars ? (
				 <div className='mt-3 flex gap-1 text-primary'>
						{Array.from({ length: 5 }).map((_, starIndex) => (
							<Star key={starIndex} className='size-4 fill-primary text-primary' />
						))}
					</div>
				) : null}
			</div>
			<div className='flex items-center gap-3'>
				{record.avatarUrl ? (
					<img src={record.avatarUrl} alt={record.name} className='size-10 rounded-full border border-primary/20 object-cover' />
				) : (
					<div className='flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary'>
						{record.name
							.split(' ')
							.map((segment) => segment.charAt(0))
							.join('')
							.slice(0, 2)
							.toUpperCase()}
					</div>
				)}
				<div>
					<p className='text-sm font-semibold text-foreground'>{record.name}</p>
					<p className='text-xs text-muted-foreground'>
						{record.role}, {record.company}
					</p>
				</div>
			</div>
		</div>
	);
}

export function TestimonialsSection({
	badge = 'Client results',
	title,
	highlight,
	subtitle,
	testimonials,
	columns = 3,
	showStars = true,
	className,
}: TestimonialsSectionProps) {
	const columnData = chunkTestimonials(testimonials, columns);

	return (
		<section className={cn('bg-background px-6 py-24', className)}>
			<div className='mx-auto max-w-6xl'>
				<SectionHeader badge={badge} title={title} highlight={highlight} subtitle={subtitle} align='left' className='mb-10' />
				<div className='relative'>
					<div className='flex flex-col gap-4 md:columns-2 xl:columns-3'>
						{columnData.map((column, columnIndex) => (
							<Marquee
								key={`testimonial-column-${columnIndex}`}
								vertical
								className={cn({
									'[--duration:45s]': columnIndex === 0,
									'[--duration:55s]': columnIndex === 1,
									'[--duration:65s]': columnIndex === 2,
								})}>
								{column.map((testimonial) => (
									<motion.div
										key={`${testimonial.name}-${testimonial.company}`}
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4 }}>
										<TestimonialCard record={testimonial} showStars={showStars} />
									</motion.div>
								))}
							</Marquee>
						))}
					</div>
					<div className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background' />
					<div className='pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background' />
				</div>
			</div>
		</section>
	);
}

