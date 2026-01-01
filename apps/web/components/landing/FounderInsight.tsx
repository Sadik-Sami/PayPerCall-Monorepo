'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote, CheckCircle2, Linkedin } from 'lucide-react';
import founderImage from '@/public/images/founder.jpg';

export default function FounderInsight() {
	return (
		<section className='py-24 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center'>
					{/* Left: Founder Image */}
					<div className='lg:col-span-5 relative'>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className='relative z-10 aspect-4/5 rounded-lg overflow-hidden border border-border'>
							<Image src={founderImage} alt='Founder' fill className='object-cover' />
						</motion.div>

						{/* Experience Badge */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.3 }}
							className='absolute -bottom-4 -right-4 z-20 bg-card border border-border p-4 rounded-lg shadow-lg'>
							<p className='text-2xl font-bold text-foreground'>10+</p>
							<p className='text-xs text-muted-foreground'>Years in Lead Generation</p>
						</motion.div>
					</div>

					{/* Right: Quote and Info */}
					<div className='lg:col-span-7 space-y-6'>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground'>
							Why I Started This Company
						</motion.h2>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className='relative'>
							<Quote className='absolute -top-2 -left-6 size-10 text-border opacity-50' />
							<p className='text-lg text-muted-foreground leading-relaxed'>
								&quot;After years of watching businesses waste money on low-quality leads, I knew there had to be a
								better way. We built Core Closer on a simple promise:{' '}
								<span className='font-semibold text-foreground'>every lead we deliver should be worth your time</span>.
								That means real people, with real intent, ready to have a conversation. No bots, no recycled data, no
								games.&quot;
							</p>
						</motion.div>

						<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2'>
							<Point text='Performance-based pricing' />
							<Point text='Full transparency on sources' />
							<Point text='Dedicated account management' />
							<Point text='Real-time reporting' />
						</div>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.4 }}
							className='pt-6 border-t border-border flex items-center justify-between'>
							<div>
								<p className='text-xl font-semibold text-foreground'>Alex Sterling</p>
								<p className='text-sm text-muted-foreground'>Founder & CEO</p>
							</div>
							<a href='#' className='p-2 rounded-lg border border-border hover:border-primary/50 transition-colors'>
								<Linkedin className='size-5 text-muted-foreground hover:text-primary' />
							</a>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}

function Point({ text }: { text: string }) {
	return (
		<div className='flex items-center gap-3'>
			<CheckCircle2 className='size-5 text-primary' />
			<span className='text-sm font-semibold text-foreground/80'>{text}</span>
		</div>
	);
}
