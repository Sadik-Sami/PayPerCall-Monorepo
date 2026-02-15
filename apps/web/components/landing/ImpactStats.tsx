'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Phone, Users, TrendingUp, Building2 } from 'lucide-react';

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
		label: 'Leads Generated',
		value: 10,
		suffix: 'M+',
		description: 'Qualified leads delivered to clients',
		icon: <Users className='size-6 text-primary' />,
	},
	{
		label: 'Calls Connected',
		value: 800,
		suffix: 'K+',
		description: 'Monthly inbound calls routed',
		icon: <Phone className='size-6 text-primary' />,
	},
	{
		label: 'Client ROI',
		value: 340,
		suffix: '%',
		description: 'Average return on ad spend',
		icon: <TrendingUp className='size-6 text-primary' />,
	},
	{
		label: 'Industries Served',
		value: 20,
		suffix: '+',
		description: 'Verticals with proven results',
		icon: <Building2 className='size-6 text-primary' />,
	},
];

export default function ImpactStats() {
	return (
		<section className='py-24 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				{/* Header Section */}
				<div className='mb-16 text-center'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground mb-4'>
						Results That Speak for Themselves
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='max-w-2xl mx-auto text-muted-foreground text-lg'>
						Our track record is built on delivering measurable outcomes for businesses across multiple industries.
					</motion.p>
				</div>

				{/* Stats Grid */}
				<div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className='flex flex-col items-center p-6 md:p-8 rounded-lg border border-border bg-card'>
							<div className='mb-4 p-3 rounded-lg bg-primary/10'>{stat.icon}</div>

							<h3 className='text-3xl md:text-4xl font-heading font-bold text-foreground mb-1 tabular-nums'>
								<Counter value={stat.value} />
								{stat.suffix}
							</h3>

							<p className='text-sm font-semibold text-foreground mb-1'>{stat.label}</p>
							<p className='text-xs text-muted-foreground text-center'>{stat.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
