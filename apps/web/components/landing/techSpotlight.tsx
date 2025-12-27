'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Headset, ArrowRight, BarChart3 } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

const highlights = [
	{
		title: 'Dedicated Specialists',
		desc: 'Certified engineers and strategists.',
		icon: <Shield className='size-5 text-primary' />,
	},
	{
		title: 'Tailored Solutions',
		desc: 'Data-built for unique needs.',
		icon: <Zap className='size-5 text-accent' />,
	},
	{
		title: 'Proven Results',
		desc: 'Data-driven, measurable growth.',
		icon: <BarChart3 className='size-5 text-primary' />,
	},
	{
		title: 'High-Quality Support',
		desc: '24/7 proactive monitoring.',
		icon: <Headset className='size-5 text-accent' />,
	},
];

export default function TechSpotlight() {
	return (
		<section className='relative py-32 px-6 bg-background overflow-hidden border-y border-border/50'>
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 border border-primary/10 rounded-full pointer-events-none' />
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-225 border border-accent/5 rounded-full pointer-events-none' />

			<div className='relative z-10 max-w-7xl mx-auto'>
				<div className='flex flex-col items-center text-center mb-16'>
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6'>
						<Target className='size-3' />
						Elevate Your Infrastructure
					</motion.div>

					{/* Headline */}
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter text-foreground mb-6 leading-tight'>
						Unlocking <span className='text-primary'>Peak Performance</span> <br />
						For Digital Leaders
					</motion.h2>

					{/* Sub-description */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='max-w-2xl text-muted-foreground text-lg'>
						We engineer bespoke digital solutions, from scalable cloud architectures to high-converting funnels,
						designed for the top 1% of businesses.
					</motion.p>
				</div>

				{/* Feature Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{highlights.map((item, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className='group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card transition-all duration-300'>
							<div className='mb-6 p-3 w-fit rounded-xl bg-background border border-border group-hover:border-primary/30 transition-colors shadow-sm'>
								{item.icon}
							</div>
							<h4 className='text-base font-bold text-foreground mb-2 tracking-tight'>{item.title}</h4>
							<p className='text-sm text-muted-foreground leading-relaxed'>{item.desc}</p>
							<div className='absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-border to-transparent group-hover:via-primary/50 transition-all' />
						</motion.div>
					))}
				</div>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4 }}
					className='mt-16 flex flex-col items-center gap-6'>
					<Button
						size='lg'
						className='bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 rounded-full group font-bold tracking-tight shadow-lg shadow-primary/20'>
						Launch Your Success
						<ArrowRight className='ml-2 size-5 transition-transform group-hover:translate-x-1' />
					</Button>

					<p className='text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium'>
						Zero-Debt Engineering • Radical Transparency
					</p>
				</motion.div>
			</div>
		</section>
	);
}
