'use client';

import { motion } from 'framer-motion';
import {
	Code2,
	Globe,
	ShoppingCart,
	Layers,
	Briefcase,
	LayoutDashboard,
	Plug,
	CalendarCheck,
	Wrench,
} from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';

const SERVICES = [
	{
		title: 'Custom Web Application Development',
		description: 'We build custom web applications tailored to your business needs using modern technologies like React and Node.js.',
		icon: Code2,
		color: 'blue',
		bgShape: 'rounded-tr-[2rem] rounded-bl-[1rem] rounded-tl-md rounded-br-md',
		hoverShape: 'rotate-0',
		initialShape: '-rotate-3',
	},
	{
		title: 'E-Commerce Development',
		description: 'Professional online stores with secure payments, product management, and modern user experiences.',
		icon: ShoppingCart,
		color: 'pink',
		bgShape: 'rounded-full',
		hoverShape: 'scale-100',
		initialShape: 'scale-110 opacity-80',
	},
	{
		title: 'Business Management Systems',
		description: 'Custom systems like ERP, CRM, inventory management, and dashboards to streamline your business operations.',
		icon: Briefcase,
		color: 'green',
		bgShape: 'rounded-tl-[2rem] rounded-br-[2rem]',
		hoverShape: 'rotate-0',
		initialShape: 'rotate-6',
	},
	{
		title: 'SaaS Application Development',
		description: 'We build scalable Software-as-a-Service platforms with subscriptions, user roles, and secure authentication.',
		icon: Layers,
		color: 'purple',
		bgShape: 'rounded-full',
		hoverShape: 'rounded-lg',
		initialShape: '',
	},
	{
		title: 'Admin Dashboards & Panels',
		description: 'Powerful admin panels for managing users, content, analytics, and business operations.',
		icon: LayoutDashboard,
		color: 'sky',
		bgShape: 'rounded-bl-[2rem] rounded-tr-[1rem]',
		hoverShape: 'rotate-0',
		initialShape: '-rotate-6',
	},
	{
		title: 'Booking & Reservation Systems',
		description: 'Online booking systems for hotels, appointments, services, and reservations.',
		icon: CalendarCheck,
		color: 'rose',
		bgShape: 'rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-sm rounded-bl-sm',
		hoverShape: 'scale-105',
		initialShape: '',
	},
	{
		title: 'API Development & Integration',
		description: 'Secure REST APIs and third-party integrations including payments, email services, and external platforms.',
		icon: Plug,
		color: 'indigo',
		bgShape: 'rounded-tr-[2rem] rounded-bl-[1rem]',
		hoverShape: 'rotate-0',
		initialShape: 'rotate-3',
	},
	{
		title: 'Website Design & Development',
		description: 'Modern, fast, and responsive websites designed to grow your business online.',
		icon: Globe,
		color: 'emerald',
		bgShape: 'rounded-tl-[2rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[1rem]',
		hoverShape: 'translate-y-1',
		initialShape: '',
	},
	{
		title: 'Maintenance & Support',
		description: 'Ongoing support, updates, and improvements to keep your web application secure and up-to-date.',
		icon: Wrench,
		color: 'cyan',
		bgShape: 'rounded-full scale-90',
		hoverShape: 'scale-100',
		initialShape: '',
	},
];

const getColorClasses = (color: string) => {
	const map: Record<string, { bg: string; text: string }> = {
		blue: { bg: 'bg-pastel-sky', text: 'text-pastel-sky-ink' },
		pink: { bg: 'bg-pastel-blush', text: 'text-pastel-blush-ink' },
		purple: { bg: 'bg-pastel-lilac', text: 'text-pastel-lilac-ink' },
		green: { bg: 'bg-pastel-mint', text: 'text-pastel-mint-ink' },
		sky: { bg: 'bg-pastel-sky', text: 'text-pastel-sky-ink' },
		rose: { bg: 'bg-pastel-blush', text: 'text-pastel-blush-ink' },
		indigo: { bg: 'bg-pastel-lilac', text: 'text-pastel-lilac-ink' },
		emerald: { bg: 'bg-pastel-mint', text: 'text-pastel-mint-ink' },
		cyan: { bg: 'bg-pastel-sky', text: 'text-pastel-sky-ink' },
	};
	return map[color] || map.blue;
};

export function PremiumServicesGrid({ className }: { className?: string }) {
	return (
		<section className={cn('w-full', className)}>
			<div className="section-container">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12">
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className="lg:col-span-5"
				>
					<h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-6 text-foreground text-balance">
						Web Development <br className="hidden lg:block" />
						Services That <br className="hidden lg:block" />
						Scale With You
					</h2>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
					className="lg:col-span-7 flex items-start lg:items-center"
				>
					<p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
						From custom web apps to e-commerce and SaaS platforms—we deliver modern, performant solutions built with React, Next.js, and your business goals in mind.
					</p>
				</motion.div>
			</div>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-100px' }}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-14 lg:gap-x-8 lg:gap-y-16 mt-12 md:mt-16 lg:mt-20"
			>
				{SERVICES.map((service, idx) => {
					const colors = getColorClasses(service.color);
					const Icon = service.icon;
					return (
						<motion.div key={idx} variants={itemVariants} className="group">
							<div className="relative w-16 h-16 mb-6">
								<div
									className={cn(
										'absolute inset-0 transform transition-all duration-300 ease-out group-hover:' + service.hoverShape,
										colors?.bg,
										service.bgShape,
										service.initialShape
									)}
								></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<Icon className={cn('w-8 h-8', colors?.text)} strokeWidth={1.5} />
								</div>
							</div>
							<h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
							<p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
						</motion.div>
					);
				})}
			</motion.div>
			</div>
		</section>
	);
}