'use client';

import { motion } from 'framer-motion';
import { Shield, Scale, Banknote, Home, Stethoscope, Car, Plane, Wifi, GraduationCap, Briefcase } from 'lucide-react';
import Link from 'next/link';

const industries = [
	{
		name: 'Insurance',
		description: 'Auto, Home, Health, and Life Insurance leads',
		icon: <Shield className='size-5' />,
		href: '/industries/insurance',
	},
	{
		name: 'Legal Services',
		description: 'Personal Injury, Family Law, and Bankruptcy',
		icon: <Scale className='size-5' />,
		href: '/industries/legal',
	},
	{
		name: 'Financial Services',
		description: 'Mortgage, Debt Relief, and Tax Services',
		icon: <Banknote className='size-5' />,
		href: '/industries/financial',
	},
	{
		name: 'Home Services',
		description: 'HVAC, Plumbing, Roofing, and Solar',
		icon: <Home className='size-5' />,
		href: '/industries/home-services',
	},
	{
		name: 'Healthcare',
		description: 'Medicare, Medical Devices, and Rehab Centers',
		icon: <Stethoscope className='size-5' />,
		href: '/industries/healthcare',
	},
	{
		name: 'Automotive',
		description: 'Auto Dealers, Repair, and Warranty Services',
		icon: <Car className='size-5' />,
		href: '/industries/automotive',
	},
	{
		name: 'Travel',
		description: 'Hotels, Vacation Rentals, and Travel Agencies',
		icon: <Plane className='size-5' />,
		href: '/industries/travel',
	},
	{
		name: 'Telecom',
		description: 'Internet, Phone, and Cable Providers',
		icon: <Wifi className='size-5' />,
		href: '/industries/telecom',
	},
	{
		name: 'Education',
		description: 'Online Courses, Colleges, and Trade Schools',
		icon: <GraduationCap className='size-5' />,
		href: '/industries/education',
	},
	{
		name: 'B2B Services',
		description: 'Software, Consulting, and Professional Services',
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
						We serve industries where calls, leads, and digital performance directly impact revenue. Our core solutions include Pay Per Call, Pay Per Lead, Digital Marketing, and Web Development—built to drive qualified inquiries, improve conversion rates, and scale results with measurable ROI.
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
