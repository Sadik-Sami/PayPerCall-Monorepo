'use client';

import { motion } from 'framer-motion';
import { Shield, Scale, Banknote, Home, Stethoscope, Car, Plane, Wifi, GraduationCap, Briefcase } from 'lucide-react';
import Link from 'next/link';

const industries = [
	{
		name: 'Insurance',
		description: 'Auto, home, health, and life insurance leads',
		icon: <Shield className='size-5' />,
		href: '/industries/insurance',
	},
	{
		name: 'Legal Services',
		description: 'Personal injury, family law, and bankruptcy',
		icon: <Scale className='size-5' />,
		href: '/industries/legal',
	},
	{
		name: 'Financial Services',
		description: 'Mortgage, debt relief, and tax services',
		icon: <Banknote className='size-5' />,
		href: '/industries/financial',
	},
	{
		name: 'Home Services',
		description: 'HVAC, plumbing, roofing, and solar',
		icon: <Home className='size-5' />,
		href: '/industries/home-services',
	},
	{
		name: 'Healthcare',
		description: 'Medicare, medical devices, and rehab centers',
		icon: <Stethoscope className='size-5' />,
		href: '/industries/healthcare',
	},
	{
		name: 'Automotive',
		description: 'Auto dealers, repair, and warranty services',
		icon: <Car className='size-5' />,
		href: '/industries/automotive',
	},
	{
		name: 'Travel',
		description: 'Hotels, vacation rentals, and travel agencies',
		icon: <Plane className='size-5' />,
		href: '/industries/travel',
	},
	{
		name: 'Telecom',
		description: 'Internet, phone, and cable providers',
		icon: <Wifi className='size-5' />,
		href: '/industries/telecom',
	},
	{
		name: 'Education',
		description: 'Online courses, colleges, and trade schools',
		icon: <GraduationCap className='size-5' />,
		href: '/industries/education',
	},
	{
		name: 'B2B Services',
		description: 'Software, consulting, and professional services',
		icon: <Briefcase className='size-5' />,
		href: '/industries/b2b',
	},
];

export default function Industries() {
	return (
		<section className='py-24 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				{/* Header */}
				<div className='mb-16 text-center'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground mb-4'>
						Industries We Serve
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='max-w-2xl mx-auto text-muted-foreground text-lg'>
						We specialize in high-intent lead generation across industries where phone calls drive conversions.
					</motion.p>
				</div>

				{/* Industries Grid */}
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
					{industries.map((industry, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.05 }}>
							<Link
								href={industry.href}
								className='flex flex-col items-center p-6 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-card/80 transition-colors text-center group'>
								<div className='mb-3 p-3 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors'>
									{industry.icon}
								</div>
								<h3 className='text-sm font-semibold text-foreground mb-1'>{industry.name}</h3>
								<p className='text-xs text-muted-foreground leading-relaxed'>{industry.description}</p>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
