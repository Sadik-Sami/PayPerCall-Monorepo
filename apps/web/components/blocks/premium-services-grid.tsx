'use client';

import { motion } from 'framer-motion';
import {
	PenTool,
	Cloud,
	Headset,
	BarChart,
	Database,
	Cpu,
	Smartphone,
	Palette,
	Bug,
	Banknote,
	ShoppingCart,
	Phone,
	Building2,
	Terminal,
	HeartPulse,
	Car,
	Video,
	Briefcase,
	Rocket,
	Glasses,
	Scale,
	HeartHandshake,
	Landmark,
	Dumbbell,
	Gamepad2,
	Shirt,
	Zap,
	Leaf,
	Truck,
} from 'lucide-react';
import { containerVariants, itemVariants } from '@/lib/animations';

const SERVICES = [
	{
		title: 'Scalable System Design',
		description: 'High-performing product giving you a tailored solution for your business.',
		icon: PenTool,
		color: 'blue',
		bgShape: 'rounded-tr-[2rem] rounded-bl-[1rem] rounded-tl-md rounded-br-md',
		hoverShape: 'rotate-0',
		initialShape: '-rotate-3',
	},
	{
		title: 'Cloud Services',
		description: 'Cloud outsourcing provider managed cloud services for businesses.',
		icon: Cloud,
		color: 'pink',
		bgShape: 'rounded-full',
		hoverShape: 'scale-100',
		initialShape: 'scale-110 opacity-80',
	},
	{
		title: 'Consultation Service',
		description: 'DevOps consulting services based on modern tools & technologies.',
		icon: Headset,
		color: 'purple',
		bgShape: 'rounded-tl-[2rem] rounded-br-[2rem]',
		hoverShape: 'rotate-0',
		initialShape: 'rotate-6',
	},
	{
		title: 'Big Data & Data Science',
		description: 'Drive business transformation through data analytics.',
		icon: BarChart,
		color: 'green',
		bgShape: 'rounded-full',
		hoverShape: 'rounded-lg',
		initialShape: '',
	},
	{
		title: 'Database Management',
		description: 'DBMS establish the relationship between datasets, and how users interact with them.',
		icon: Database,
		color: 'sky',
		bgShape: 'rounded-bl-[2rem] rounded-tr-[1rem]',
		hoverShape: 'rotate-0',
		initialShape: '-rotate-6',
	},
	{
		title: 'Embedded System Design',
		description: 'Provide high-quality embedded system design and embedded architecture design services.',
		icon: Cpu,
		color: 'rose',
		bgShape: 'rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-sm rounded-bl-sm',
		hoverShape: 'scale-105',
		initialShape: '',
	},
	{
		title: 'Mobile Application Dev',
		description: 'We build your apps for all the devices out there.',
		icon: Smartphone,
		color: 'indigo',
		bgShape: 'rounded-tr-[2rem] rounded-bl-[1rem]',
		hoverShape: 'rotate-0',
		initialShape: 'rotate-3',
	},
	{
		title: 'UX Design',
		description: 'UX design ensures the quality of user journey of your digital products and services.',
		icon: Palette,
		color: 'emerald',
		bgShape: 'rounded-tl-[2rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[1rem]',
		hoverShape: 'translate-y-1',
		initialShape: '',
	},
	{
		title: 'SQA',
		description: 'Software test lifecycle services; from test planning to execution and everything in between.',
		icon: Bug,
		color: 'cyan',
		bgShape: 'rounded-full scale-90',
		hoverShape: 'scale-100',
		initialShape: '',
	},
];

const getColorClasses = (color: string) => {
	const map: Record<string, { bg: string; text: string }> = {
		blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
		pink: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400' },
		purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400' },
		green: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
		sky: { bg: 'bg-sky-100 dark:bg-sky-900/30', text: 'text-sky-600 dark:text-sky-400' },
		rose: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-600 dark:text-rose-400' },
		indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-600 dark:text-indigo-400' },
		emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
		cyan: { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-600 dark:text-cyan-400' },
	};
	return map[color] || map.blue;
};

export function PremiumServicesGrid() {
	return (
		<section className="py-20 max-w-7xl mx-auto px-6 lg:px-12 xl:px-0">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
					className="lg:col-span-5"
				>
					<h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground">
						Premium Custom <br className="hidden lg:block" />
						Software Development <br className="hidden lg:block" />
						Services
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
						We prioritize cultivating lasting business partnerships as your trusted software development
						partner.
					</p>
				</motion.div>
			</div>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-100px' }}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-20"
			>
				{SERVICES.map((service, idx) => {
					const colors = getColorClasses(service.color);
					const Icon = service.icon;
					return (
						<motion.div key={idx} variants={itemVariants} className="group">
							<div className="relative w-16 h-16 mb-6">
								<div
									className={`absolute inset-0 ${colors.bg} ${service.bgShape} transform ${service.initialShape} transition-all duration-300 ease-out group-hover:${service.hoverShape}`}
								></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<Icon className={`w-8 h-8 ${colors.text}`} strokeWidth={1.5} />
								</div>
							</div>
							<h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
							<p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
						</motion.div>
					);
				})}
			</motion.div>
		</section>
	);
}