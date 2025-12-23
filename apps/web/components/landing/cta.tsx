'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@workspace/ui/components/button';
import { ArrowRight, Zap, ShieldCheck, BarChart3 } from 'lucide-react';

export default function FinalCTA() {
	return (
		<section className='relative overflow-hidden py-24 px-6'>
			<div className='absolute inset-0 z-0'>
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]' />

				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-blue-500/10 blur-[120px] rounded-full' />
				<div className='absolute top-1/2 left-1/4 -translate-y-1/2 w-75 h-75 bg-sky-500/5 blur-[100px] rounded-full' />
			</div>

			<div className='relative z-10 mx-auto max-w-7xl rounded-3xl border border-blue-500/20 bg-card/30 p-8 backdrop-blur-md md:p-16 shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)]'>
				<div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
					<div className='space-y-6'>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className='inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm font-medium text-sky-400'>
							<Zap size={14} className='fill-current' />
							Ready to Scale?
						</motion.div>

						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className='font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl'>
							Stop guessing. <br />
							<span className='bg-linear-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent'>
								Start Engineering.
							</span>
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className='text-lg text-muted-foreground'>
							Whether it&apos;s a MERN stack deployment or a high-volume Pay-Per-Call campaign, we provide the
							architecture that makes growth inevitable.
						</motion.p>

						<div className='flex flex-wrap gap-6 pt-4'>
							<FeatureItem icon={<ShieldCheck className='text-blue-500' />} label='Enterprise Security' />
							<FeatureItem icon={<BarChart3 className='text-sky-500' />} label='Real-time Analytics' />
						</div>
					</div>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className='flex flex-col items-center justify-center space-y-6 rounded-2xl bg-blue-600 p-8 text-center text-white shadow-xl md:p-12'>
						<h3 className='text-2xl font-bold'>Launch your project today</h3>
						<p className='text-blue-100'>Join the league of high-performance companies powered by our technology.</p>

						<Button size='lg' className='group w-full bg-white text-blue-600 hover:bg-blue-50'>
							Schedule a Strategic Audit
							<ArrowRight className='ml-2 transition-transform group-hover:translate-x-1' size={18} />
						</Button>

						<p className='text-xs text-blue-200/70 italic'>
							*Custom solutions tailored to your specific infrastructure requirements.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

function FeatureItem({ icon, label }: { icon: React.ReactNode; label: string }) {
	return (
		<div className='flex items-center gap-2 text-sm font-medium text-foreground/80'>
			{icon}
			{label}
		</div>
	);
}
