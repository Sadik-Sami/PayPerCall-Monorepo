'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { ImagesSlider } from '@workspace/ui/components/ui/images-slider';
import sliderImage1 from '@/public/images/slider/slider-1.jpg';
import sliderImage3 from '@/public/images/slider/slider-3.jpg';
import sliderImage2 from '@/public/images/slider/slider-2.jpg';

export function Hero() {
	const images = [sliderImage1.src, sliderImage2.src, sliderImage3.src];
	return (
		<ImagesSlider className='h-160' images={images}>
			<motion.div
				initial={{
					opacity: 0,
					y: -80,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					duration: 0.6,
				}}
				className='z-50 flex flex-col justify-center items-center font-body'>
				<motion.p className='font-heading font-semibold tracking-wider text-xl md:text-6xl text-center bg-clip-text text-transparent bg-linear-to-b from-sky-50 to-sky-400 py-4'>
					Almost the hero section slideshow <br /> We Hoped for
				</motion.p>
				<button className='px-4 py-2 backdrop-blur-sm border bg-blue-300/10 border-blue-500/20 text-white mx-auto text-center rounded-full relative mt-4'>
					<span>Join now →</span>
					<div className='absolute inset-x-0  h-px -bottom-px bg-linear-to-r w-3/4 mx-auto from-transparent via-blue-500 to-transparent' />
				</button>
			</motion.div>
		</ImagesSlider>
	);
}
