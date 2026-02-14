'use client';

import { motion } from 'framer-motion';
import { ImagesSlider } from '@workspace/ui/components/ui/images-slider';
import { Button } from '@workspace/ui/components/button';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import sliderImage1 from '@/public/images/slider/slider-6.webp';
import sliderImage2 from '@/public/images/slider/slider-4.webp';
import sliderImage3 from '@/public/images/slider/slider-5.webp';
import sliderImage4 from '@/public/images/slider/slider-7.webp';

export default function Hero() {
	const images = [sliderImage1.src, sliderImage2.src, sliderImage3.src, sliderImage4.src];

	return (
		<ImagesSlider className='h-150 md:h-175' images={images}>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='z-50 flex flex-col justify-center items-center px-6 max-w-4xl mx-auto text-center'>
				{/* Main Headline - SEO optimized H1 */}
				<h1 className='font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6'>
					Quality Leads That Convert Into <span className='text-primary'>Paying Customers</span>
				</h1>

				{/* Subheadline */}
				<p className='text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed'>
					We connect your business with high-intent customers through Pay Per Call and Pay Per Lead campaigns.
					Performance-based pricing means you only pay for results.
				</p>

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
		</ImagesSlider>
	);
}
