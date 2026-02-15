'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ImagesSlider } from '@workspace/ui/components/ui/images-slider';
import { Button } from '@workspace/ui/components/button';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import sliderImage1 from '@/public/images/slider/slider-6.webp';
import sliderImage2 from '@/public/images/slider/slider-4.webp';
import sliderImage3 from '@/public/images/slider/slider-5.webp';
import sliderImage4 from '@/public/images/slider/slider-7.webp';
import sliderImage5 from '@/public/images/slider/slider-8.png';

export default function Hero() {
	const slides = [
		{
			imageSrc: sliderImage1.src,
			title: 'Pay Per Call Marketing for Qualified Inbound Calls',
			subtitle:
				'Consumer-initiated calls and compliant live transfers from online and offline media to boost sales.',
		},
		{
			imageSrc: sliderImage2.src,
			title: 'Real-Time Lead Generation with Exclusive or Shared Leads',
			subtitle:
				'Get exclusive or shared leads delivered instantly—improve contact rates, qualify faster, close more deals.',
		},
		{
			imageSrc: sliderImage3.src,
			title: 'SEO & Paid Media That Drives Organic and Paid Growth',
			subtitle: 'SEO, ads, email, and social campaigns that raise rankings, cut CPA, and turn traffic into customers.',
		},
		{
			imageSrc: sliderImage4.src,
			title: 'Conversion-Focused Web Development for Business Sites',
			subtitle:
				'Full-stack builds for eCommerce and landing pages—fast, mobile-first, and optimized for higher conversions.',
		},
		{
			imageSrc: sliderImage5.src,
			title: 'CMS & App Development Built for Speed, Scale, and SEO',
			subtitle:
				'WordPress, Drupal, HubSpot, Wix Studio, plus iOS/Android apps—secure, scalable, and search-ready.',
		},
	] as const;

	const images = slides.map((slide) => slide.imageSrc);

	return (
		<ImagesSlider className='h-150 md:h-175' images={images} keyboardKeys='vertical' ariaLabel='Hero slides'>
			{({ activeIndex }) => {
				const slide = slides[activeIndex] ?? slides[0];

				return (
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='z-50 flex flex-col justify-center items-center px-6 max-w-4xl mx-auto text-center'>
						{/* Stable H1 (SEO) */}
						<h1 className='font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6'>
							Quality Leads That Convert Into <span className='text-primary'>Paying Customers</span>
						</h1>

						{/* Per-slide content (H2 + lead) */}
						<AnimatePresence mode='wait' initial={false}>
							<motion.div
								key={activeIndex}
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -12 }}
								transition={{ duration: 0.25 }}
								className='max-w-3xl mb-8'>
								<h2 className='font-heading font-semibold text-xl sm:text-2xl md:text-3xl text-white leading-snug'>
									{slide.title}
								</h2>
								<p className='mt-3 text-base md:text-lg text-white/90 leading-relaxed'>{slide.subtitle}</p>
							</motion.div>
						</AnimatePresence>

						{/* CTA Buttons */}
						<div className='flex flex-col sm:flex-row gap-4'>
							<Button
								asChild
								size='lg'
								className='bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-lg font-medium'>
								<Link href='/contact'>
									Get a Free Consultation
									<ArrowRight className='ml-2 size-4' />
								</Link>
							</Button>
							<Button
								asChild
								size='lg'
								variant='outline'
								className='bg-white/10 border-white/30 text-white hover:bg-white/20 h-12 px-8 rounded-lg font-medium'>
								<Link href='/advertiser-signup'>
									<Phone className='mr-2 size-4' />
									Advertiser Signup
								</Link>
							</Button>
						</div>

						{/* Trust indicator */}
						<p className='mt-8 text-sm text-white/70'>
							Trusted by businesses in Insurance, Legal, Healthcare, and Home Services
						</p>
					</motion.div>
				);
			}}
		</ImagesSlider>
	);
}
