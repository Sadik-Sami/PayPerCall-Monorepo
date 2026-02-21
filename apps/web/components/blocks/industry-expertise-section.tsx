'use client';

import { motion } from 'framer-motion';
import {
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

const INDUSTRIES = [
	// Row 1
	{ name: 'Finance & Banking', icon: Banknote, color: 'bg-[#FAD2E1]', shape: 'rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-none' },
	{ name: 'E-commerce', icon: ShoppingCart, color: 'bg-[#D0F4DE]', shape: 'rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Telecom', icon: Phone, color: 'bg-[#E2D9F3]', shape: 'rounded-tl-none rounded-tr-3xl rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Real Estate', icon: Building2, color: 'bg-[#CBEBF9]', shape: 'rounded-tl-3xl rounded-tr-3xl rounded-br-none rounded-bl-3xl' },
	{ name: 'Software', icon: Terminal, color: 'bg-[#FFEACC]', shape: 'rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Health & Fitness', icon: HeartPulse, color: 'bg-[#D0F4DE]', shape: 'rounded-tl-none rounded-tr-3xl rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Automotive', icon: Car, color: 'bg-[#E2D9F3]', shape: 'rounded-tl-3xl rounded-tr-3xl rounded-br-none rounded-bl-3xl' },
	// Row 2
	{ name: 'Photo & Video', icon: Video, color: 'bg-[#FFEACC]', shape: 'rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-none' },
	{ name: 'Business', icon: Briefcase, color: 'bg-[#FFEACC]', shape: 'rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Startup', icon: Rocket, color: 'bg-[#CBEBF9]', shape: 'rounded-tl-none rounded-tr-3xl rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Legal Services', icon: Scale, color: 'bg-[#CBEBF9]', shape: 'rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Non-profit', icon: HeartHandshake, color: 'bg-[#FFEACC]', shape: 'rounded-tl-none rounded-tr-3xl rounded-br-3xl rounded-bl-3xl' },
	// Row 3
	{ name: 'Govt. & Public Sector', icon: Landmark, color: 'bg-[#CBEBF9]', shape: 'rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-none' },
	{ name: 'Sports & Fitness', icon: Dumbbell, color: 'bg-[#E2D9F3]', shape: 'rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Gaming', icon: Gamepad2, color: 'bg-[#CBEBF9]', shape: 'rounded-tl-none rounded-tr-3xl rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Fashion & Apparel', icon: Shirt, color: 'bg-[#FFEACC]', shape: 'rounded-tl-3xl rounded-tr-3xl rounded-br-none rounded-bl-3xl' },
	{ name: 'Energy & Utilities', icon: Zap, color: 'bg-[#D0F4DE]', shape: 'rounded-tl-3xl rounded-tr-none rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Agriculture', icon: Leaf, color: 'bg-[#D0F4DE]', shape: 'rounded-tl-none rounded-tr-3xl rounded-br-3xl rounded-bl-3xl' },
	{ name: 'Logistics', icon: Truck, color: 'bg-[#CBEBF9]', shape: 'rounded-tl-3xl rounded-tr-3xl rounded-br-none rounded-bl-3xl' },
];

export function IndustryExpertiseSection() {
	return (
		<section className="py-24 bg-card relative overflow-hidden my-16 mx-4 lg:mx-12 xl:mx-auto max-w-7xl">
			<div className="relative z-10 text-center px-6 lg:px-12">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
					className="text-3xl lg:text-5xl font-bold text-foreground mb-6"
				>
					Our Industry Expertises
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-muted-foreground max-w-2xl mx-auto mb-16 text-sm lg:text-base leading-relaxed"
				>
					Our deep understanding of diverse industries empowers us to design customized software solutions. Let
					our expertise be the catalyst for your next triumph.
				</motion.p>

				<div className="flex flex-col gap-6 items-center">
					{/* Row 1 */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						className="flex flex-wrap justify-center gap-6 w-full"
					>
						{INDUSTRIES.slice(0, 6).map((industry, idx) => (
							<IndustryCard key={idx} industry={industry} />
						))}
					</motion.div>
					{/* Row 2 */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						className="flex flex-wrap justify-center gap-6 w-full lg:px-12"
					>
						{INDUSTRIES.slice(7, 13).map((industry, idx) => (
							<IndustryCard key={idx} industry={industry} />
						))}
					</motion.div>
					{/* Row 3 */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						className="flex flex-wrap justify-center gap-6 w-full"
					>
						{INDUSTRIES.slice(13).map((industry, idx) => (
							<IndustryCard key={idx} industry={industry} />
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}

function IndustryCard({ industry }: { industry: (typeof INDUSTRIES)[0] }) {
	const Icon = industry.icon;
	return (
		<motion.div
			variants={itemVariants}
			whileHover={{ y: -8, scale: 1.02 }}
			transition={{ type: 'spring', stiffness: 300, damping: 20 }}
			className={`w-36 h-28 sm:w-40 sm:h-32 ${industry.color} text-slate-900 flex flex-col items-center justify-center ${industry.shape} shadow-sm hover:shadow-xl cursor-default border border-border/50`}
		>
			<Icon className="w-8 h-8 mb-2" strokeWidth={1.5} />
			<span className="text-xs font-bold px-2 text-center tracking-tight">{nameFormatter(industry.name)}</span>
		</motion.div>
	);
}

function nameFormatter(name: string) {
	return name.split(' ').map((word, i) => (
		<span key={i}>
			{word}
			{i !== name.split(' ').length - 1 && ' '}
		</span>
	));
}