'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
	Shield,
	Scale,
	Banknote,
	Home,
	Stethoscope,
	Car,
	Plane,
	Wifi,
	GraduationCap,
	Briefcase,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@workspace/ui/lib/utils';

export type IndustryItem = {
	name: string;
	description: string;
	icon: LucideIcon;
	href: string;
};

const PASTEL_CYCLES = [
	'bg-pastel-mint border-pastel-mint-border',
	'bg-pastel-lilac border-pastel-lilac-border',
	'bg-pastel-peach border-pastel-peach-border',
	'bg-pastel-sky border-pastel-sky-border',
	'bg-pastel-lime border-pastel-lime-border',
	'bg-pastel-blush border-pastel-blush-border',
] as const;

const industriesData: IndustryItem[] = [
	{
		name: 'Insurance',
		description: 'Auto, Home, Health, and Life Insurance leads',
		icon: Shield,
		href: '/industries/insurance',
	},
	{
		name: 'Legal Services',
		description: 'Personal Injury, Family Law, and Bankruptcy',
		icon: Scale,
		href: '/industries/legal',
	},
	{
		name: 'Financial Services',
		description: 'Mortgage, Debt Relief, and Tax Services',
		icon: Banknote,
		href: '/industries/financial',
	},
	{
		name: 'Home Services',
		description: 'HVAC, Plumbing, Roofing, and Solar',
		icon: Home,
		href: '/industries/home-services',
	},
	{
		name: 'Healthcare',
		description: 'Medicare, Medical Devices, and Rehab Centers',
		icon: Stethoscope,
		href: '/industries/healthcare',
	},
	{
		name: 'Automotive',
		description: 'Auto Dealers, Repair, and Warranty Services',
		icon: Car,
		href: '/industries/automotive',
	},
	{
		name: 'Travel',
		description: 'Hotels, Vacation Rentals, and Travel Agencies',
		icon: Plane,
		href: '/industries/travel',
	},
	{
		name: 'Telecom',
		description: 'Internet, Phone, and Cable Providers',
		icon: Wifi,
		href: '/industries/telecom',
	},
	{
		name: 'Education',
		description: 'Online Courses, Colleges, and Trade Schools',
		icon: GraduationCap,
		href: '/industries/education',
	},
	{
		name: 'B2B Services',
		description: 'Software, Consulting, and Professional Services',
		icon: Briefcase,
		href: '/industries/b2b',
	},
];

export type IndustriesProps = {
	variant?: 'blue' | 'pastel';
	title?: string;
	subtitle?: string;
	items?: IndustryItem[];
	className?: string;
};

export default function Industries({
	variant = 'blue',
	title = 'Industries We Serve',
	subtitle = 'We serve industries where calls, leads, and digital performance directly impact revenue. Our core solutions include Pay Per Call, Pay Per Lead, Digital Marketing, and Web Development—built to drive qualified inquiries, improve conversion rates, and scale results with measurable ROI.',
	items = industriesData,
	className,
}: IndustriesProps) {
	const reduceMotion = useReducedMotion();
	const isPastel = variant === 'pastel';

	return (
		<section className={cn('py-24 px-6 bg-background', className)}>
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-16 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground mb-4"
					>
						{title}
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="max-w-2xl mx-auto text-muted-foreground text-lg"
					>
						{subtitle}
					</motion.p>
				</div>

				{/* Industries Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					{items.map((industry, idx) => {
						const Icon = industry.icon;
						const pastelClasses = isPastel
							? PASTEL_CYCLES[idx % PASTEL_CYCLES.length]
							: null;

						return (
							<motion.div
								key={industry.href}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: idx * 0.05 }}
								whileHover={
									reduceMotion
										? undefined
										: isPastel
											? { y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }
											: { scale: 1.03, y: -2, transition: { type: 'spring', stiffness: 350, damping: 20 } }
								}
							>
								<Link
									href={industry.href}
									className={cn(
										'flex flex-col items-center p-6 rounded-lg border text-center group h-full transition-colors duration-300',
										isPastel
											? cn(
													pastelClasses,
													'hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20'
												)
											: 'border-border bg-card hover:border-primary/30 hover:bg-card/80'
									)}
								>
									<div
										className={cn(
											'mb-3 p-3 rounded-lg transition-all duration-300',
											isPastel
												? 'bg-white/70 dark:bg-background group-hover:scale-110 group-hover:rotate-3'
												: 'bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-105'
										)}
									>
										<Icon className="size-5" strokeWidth={2} />
									</div>
									<h3 className="text-sm font-semibold text-foreground mb-1">
										{industry.name}
									</h3>
									<p className="text-xs text-muted-foreground leading-relaxed">
										{industry.description}
									</p>
								</Link>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
