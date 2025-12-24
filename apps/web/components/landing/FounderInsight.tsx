'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote, CheckCircle2, Linkedin, Twitter } from 'lucide-react';
import founderImage from '@/public/images/founder.jpg';

export default function FounderInsight() {
	return (
		<section className='relative py-24 px-6 overflow-hidden bg-background'>
			{/* Decorative background element */}
			{/* REFINED: Organic Glow that bleeds into adjacent sections */}
			<div className='absolute inset-0 z-0 pointer-events-none overflow-visible'>
				{/* Primary Glow - Centered behind the text for depth */}
				<div
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 rounded-full opacity-20 blur-[120px]'
					style={{
						background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
					}}
				/>

				{/* Secondary Accent Glow - Subtle Cyber Mint hit to link with the signature */}
				<div
					className='absolute bottom-0 right-1/4 w-100 h-75 rounded-full opacity-10 blur-[100px]'
					style={{
						background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
					}}
				/>
			</div>

			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-16 items-center'>
					{/* Left: The Visual Authority (5 Cols) */}
					<div className='lg:col-span-5 relative'>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							className='relative z-10 aspect-4/5 rounded-2xl overflow-hidden border border-border shadow-2xl'>
							<Image
								src={founderImage}
								alt='Founder Lead Engineer'
								fill
								className='object-cover grayscale hover:grayscale-0 transition-all duration-700'
							/>
							{/* Overlay Gradient */}
							<div className='absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60' />
						</motion.div>

						{/* Float Badge: Technical Ownership */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.4 }}
							className='absolute -bottom-6 -right-6 z-20 bg-card border border-border p-6 rounded-xl shadow-xl backdrop-blur-md max-w-60'>
							<div className='flex flex-col gap-3'>
								<div className='flex gap-1'>
									{[1, 2, 3, 4, 5].map((s) => (
										<div key={s} className='size-2 rounded-full bg-accent' />
									))}
								</div>
								<p className='text-xs font-bold uppercase tracking-tighter text-muted-foreground'>
									Verified Engineering Lead
								</p>
								<div className='flex gap-4'>
									<Linkedin className='size-4 text-muted-foreground hover:text-primary cursor-pointer' />
									<Twitter className='size-4 text-muted-foreground hover:text-primary cursor-pointer' />
								</div>
							</div>
						</motion.div>
					</div>

					{/* Right: The Manifesto (7 Cols) */}
					<div className='lg:col-span-7 space-y-8'>
						<div className='space-y-4'>
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest'>
								Founder&apos;s Perspective
							</motion.div>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1 }}
								className='text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground'>
								We don&apos;t just build features. <br />
								<span className='text-muted-foreground font-normal italic'>We architect outcomes.</span>
							</motion.h2>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className='relative'>
							<Quote className='absolute -top-4 -left-8 size-12 text-border -z-10 opacity-50' />
							<p className='text-xl text-muted-foreground leading-relaxed'>
								&quot;In a world of <span className='underline'>come and go</span> agencies, we stood ground on one
								principle: <span className='font-bold'>Technical Integrity</span>. Whether we are scaling a DevOps
								pipeline or optimizing a PPC funnel, my team and I treat your infrastructure as if it were our own
								silicon. We are here to be the last agency you ever need to hire.&quot;
							</p>
						</motion.div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
							<Point text='Zero-debt engineering' />
							<Point text='Radical transparency' />
							<Point text='Direct access to experts' />
							<Point text='Outcome-based roadmaps' />
						</div>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.5 }}
							className='pt-8 border-t border-border'>
							<p className='text-2xl font-signature text-accent'>Alex Sterling</p>
							<p className='text-sm text-muted-foreground font-medium uppercase tracking-widest'>
								Founder & Chief Systems Architect
							</p>
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
