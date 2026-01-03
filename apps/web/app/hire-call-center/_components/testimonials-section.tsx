'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { SectionHeader } from '@workspace/ui/components/sections';
import { Marquee } from '@workspace/ui/components/ui/marquee';
import { cn } from '@workspace/ui/lib/utils';
import { testimonials } from '../_data/testimonials';

function TestimonialCard({
	name,
	role,
	company,
	image,
	quote,
	highlight,
}: {
	name: string;
	role: string;
	company: string;
	image?: string;
	quote: string;
	highlight?: string;
}) {
	return (
		<div
			className={cn(
				'mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4',
				'border-border bg-card/50 border shadow-sm',
				'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'
			)}>
			<div className='text-muted-foreground text-sm font-normal select-none'>
				<p>
					{quote}
					{highlight && (
						<span className='bg-primary/10 px-1 py-0.5 font-semibold text-primary'>
							{' '}
							{highlight}
						</span>
					)}
				</p>
				<div className='flex flex-row py-2'>
					{[...Array(5)].map((_, i) => (
						<Star key={i} className='size-4 fill-primary text-primary' />
					))}
				</div>
			</div>

			<div className='flex w-full items-center justify-start gap-4 select-none'>
				{image && (
					<Image
						width={40}
						height={40}
						src={image}
						alt={name}
						className='size-10 rounded-full ring-1 ring-primary/20 ring-offset-2'
					/>
				)}
				<div>
					<p className='text-foreground font-medium'>{name}</p>
					<p className='text-muted-foreground text-xs font-normal'>
						{role}, {company}
					</p>
				</div>
			</div>
		</div>
	);
}

export default function TestimonialsSection() {
	return (
		<section className='py-24 px-6 bg-background'>
			<div className='max-w-7xl mx-auto'>
				<SectionHeader
					title='Trusted by Growing'
					highlight='Businesses'
					subtitle='See what our clients have to say about working with our call center team.'
				/>

				<div className='relative mt-6 max-h-[600px] overflow-hidden'>
					<div className='gap-4 md:columns-2 xl:columns-3'>
						{Array(Math.ceil(testimonials.length / 2))
							.fill(0)
							.map((_, i) => (
								<Marquee
									vertical
									key={i}
									className={cn({
										'[--duration:50s]': i === 0,
										'[--duration:40s]': i === 1,
										'[--duration:60s]': i === 2,
									})}>
									{testimonials
										.slice(i * 2, (i + 1) * 2)
										.map((testimonial, idx) => (
											<motion.div
												key={idx}
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												viewport={{ once: true }}
												transition={{
													delay: Math.random() * 0.5,
													duration: 0.8,
												}}>
												<TestimonialCard {...testimonial} />
											</motion.div>
										))}
								</Marquee>
							))}
					</div>
					<div className='from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-linear-to-t from-20%'></div>
					<div className='from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-linear-to-b from-20%'></div>
				</div>
			</div>
		</section>
	);
}
