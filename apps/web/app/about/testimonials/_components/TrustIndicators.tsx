'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, Lock, Globe } from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';

const TRUST_ITEMS = [
	{
		icon: ShieldCheck,
		label: 'ISO 27001',
		description: 'Information security management',
	},
	{
		icon: Lock,
		label: 'SOC 2',
		description: 'Security and compliance controls',
	},
	{
		icon: Globe,
		label: 'GDPR',
		description: 'Privacy-aware data handling',
	},
	{
		icon: Award,
		label: '200+ Teams',
		description: 'Organizations trust Core Closer',
	},
];

export function TrustIndicators() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='space-y-10'>
				<motion.div variants={itemVariants} className='text-center'>
					<h2 className='font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
						Trusted by organizations worldwide
					</h2>
					<p className='mt-3 text-muted-foreground'>
						Compliance and security are built into every engagement, not treated as an afterthought.
					</p>
				</motion.div>

				<motion.div variants={itemVariants} className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
					{TRUST_ITEMS.map((item) => (
						<div
							key={item.label}
							className='flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-card/80 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md'>
							<div className='flex size-12 items-center justify-center rounded-full bg-primary/10'>
								<item.icon className='size-6 text-primary' />
							</div>
							<div>
								<p className='font-semibold text-foreground'>{item.label}</p>
								<p className='mt-0.5 text-xs text-muted-foreground'>{item.description}</p>
							</div>
						</div>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}
