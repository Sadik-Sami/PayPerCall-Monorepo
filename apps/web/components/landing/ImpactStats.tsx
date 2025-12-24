'use client';

import React, { SVGProps, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Globe, Cpu, Users } from 'lucide-react';

function Counter({ value }: { value: number }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	const springValue = useSpring(0, {
		mass: 1,
		stiffness: 100,
		damping: 30,
	});

	const displayValue = useTransform(springValue, (current) => Math.round(current).toLocaleString());

	useEffect(() => {
		if (isInView) {
			springValue.set(value);
		}
	}, [isInView, value, springValue]);

	return <motion.span ref={ref}>{displayValue}</motion.span>;
}

const stats = [
	{
		label: 'Ad Spend Managed',
		prefix: '$',
		value: 12,
		suffix: 'M+',
		description: 'Optimized across PPC campaigns',
		icon: <TrendingUp className='text-accent' />,
		color: 'oklch(0.82 0.15 160)', // Cyber Mint
	},
	{
		label: 'System Uptime',
		value: 99.99,
		suffix: '%',
		isDecimal: true,
		description: 'For mission-critical DevOps',
		icon: <Cpu className='text-blue-500' />,
		color: 'oklch(0.55 0.24 262)', // Primary Blue
	},
	{
		label: 'Apps Deployed',
		value: 250,
		suffix: '+',
		description: 'High-performance MERN/Next.js',
		icon: <Globe className='text-sky-400' />,
		color: 'oklch(0.746 0.16 232.66)', // Sky Blue
	},
	{
		label: 'Leads Generated',
		value: 850,
		suffix: 'K',
		description: 'Qualified Pay-Per-Call leads',
		icon: <Users className='text-accent' />,
		color: 'oklch(0.82 0.15 160)', // Cyber Mint
	},
];

export default function ImpactStats() {
	return (
		<section className='relative py-24 px-6 overflow-hidden'>
			{/* Background depth glow */}
			<div className='absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-500/5 blur-[120px] pointer-events-none' />

			<div className='max-w-7xl mx-auto'>
				{/* Header Section */}
				<div className='mb-16 space-y-4 text-center'>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em]'>
						Performance Metrics
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground'>
						Measured by <span className='text-primary'>Reliability.</span> <br />
						Driven by <span className='text-accent text-glow'>Results.</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='max-w-2xl mx-auto text-muted-foreground text-lg'>
						Our track record is built on precision engineering and data-driven growth.
					</motion.p>
				</div>

				{/* Stats Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className='group relative flex flex-col items-center p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md hover:border-primary/30 transition-all duration-500'>
							<div className='mb-6 p-4 rounded-full bg-background/50 border border-border group-hover:scale-110 transition-transform duration-500 shadow-inner'>
								{React.isValidElement(stat.icon) ?
									React.cloneElement(stat.icon as React.ReactElement<SVGProps<SVGSVGElement>>, {
										width: 28,
										height: 28,
									})
								:	stat.icon}
							</div>

							{/* Animated Number */}
							<h3
								className='text-4xl lg:text-5xl font-heading font-bold tracking-tighter mb-2 tabular-nums'
								style={{ color: stat.color }}>
								{stat.prefix}
								<Counter value={stat.value} />
								{stat.suffix}
							</h3>

							<p className='text-sm font-bold uppercase tracking-widest text-foreground/90 mb-1'>{stat.label}</p>
							<p className='text-xs text-muted-foreground text-center'>{stat.description}</p>

							<div
								className='absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-1/2 transition-all duration-500 rounded-t-full opacity-50'
								style={{ backgroundColor: stat.color }}
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
