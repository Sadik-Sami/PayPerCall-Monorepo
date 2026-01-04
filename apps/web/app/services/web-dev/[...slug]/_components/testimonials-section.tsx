import { SectionHeader } from '@workspace/ui/components/sections';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
	id: string;
	name: string;
	role?: string;
	company?: string;
	content: string;
	image?: {
		url: string;
		publicId: string;
		alt?: string;
	};
	rating?: number;
}

interface TestimonialsSectionProps {
	testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
	return (
		<section className='py-24 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<SectionHeader title='Client' highlight='Testimonials' subtitle='What our clients say about us' />
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12'>
					{testimonials.map((testimonial) => (
						<Card key={testimonial.id}>
							<CardContent className='pt-6'>
								{testimonial.rating && (
									<div className='flex gap-1 mb-4'>
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												className={`h-4 w-4 ${
													i < Math.floor(testimonial.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
												}`}
											/>
										))}
									</div>
								)}
								<p className='text-sm text-muted-foreground mb-4'>&quot;{testimonial.content}&quot;</p>
								<div className='flex items-center gap-3'>
									{testimonial.image && (
										<div className='relative h-10 w-10 rounded-full overflow-hidden'>
											<Image src={testimonial.image.url} alt={testimonial.image.alt || testimonial.name} fill className='object-cover' />
										</div>
									)}
									<div>
										<p className='font-semibold text-sm'>{testimonial.name}</p>
										{(testimonial.role || testimonial.company) && (
											<p className='text-xs text-muted-foreground'>
												{testimonial.role}
												{testimonial.role && testimonial.company && ', '}
												{testimonial.company}
											</p>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

