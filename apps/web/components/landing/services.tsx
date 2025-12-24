'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { Code2, Terminal, PhoneIncoming, Layers, ChevronRight, ArrowUpRight } from 'lucide-react';

// Simplified mapping from your navigationData
const categories = [
	{
		id: 'web-dev',
		title: 'Web Development',
		icon: <Code2 className='size-6' />,
		description: 'Custom engineering from MERN to JAMstack architectures.',
		color: 'text-blue-500',
		bgColor: 'bg-blue-500/10',
		subServices: [
			{ label: 'MERN Stack', desc: 'MongoDB, Express, React, Node.js' },
			{ label: 'Next.js Apps', desc: 'High-performance React frameworks' },
			{ label: 'Serverless', desc: 'Scalable cloud-native functions' },
			{ label: 'UI/UX Design', desc: 'Intuitive user-centered interfaces' },
			{ label: 'JAMstack', desc: 'JavaScript, APIs, and Markup' },
			{ label: 'RESTful APIs', desc: 'Scalable backend communication' },
			{ label: 'PWA', desc: 'Progressive Web Applications' },
			{ label: 'Database Design', desc: 'Optimized schema architecture' },
		],
	},
	{
		id: 'devops',
		title: 'DevOps & Cloud',
		icon: <Terminal className='size-6' />,
		description: 'Infrastructure as code and automated deployment pipelines.',
		color: 'text-sky-400',
		bgColor: 'bg-sky-400/10',
		subServices: [
			{ label: 'AWS Solutions', desc: 'EC2, S3, Lambda, and RDS' },
			{ label: 'CI/CD Pipelines', desc: 'GitHub Actions & Jenkins' },
			{ label: 'Docker', desc: 'Containerization & Orchestration' },
			{ label: 'Cloud Security', desc: 'Compliance & Vulnerability audits' },
			{ label: 'Monitoring', desc: 'Real-time logging and alerting' },
			{ label: 'IaC', desc: 'Terraform and CloudFormation' },
			{ label: 'Azure Cloud', desc: 'Enterprise Microsoft solutions' },
			{ label: 'Pen-Testing', desc: 'Proactive security hardening' },
		],
	},
	{
		id: 'ppc',
		title: 'Pay-Per-Call',
		icon: <PhoneIncoming className='size-6' />,
		description: 'Performance marketing driven by real-time call analytics.',
		color: 'text-accent', // Using your new Cyber Mint!
		bgColor: 'bg-accent/10',
		subServices: [
			{ label: 'Call Tracking', desc: 'Real-time attribution & analytics' },
			{ label: 'Lead Generation', desc: 'High-intent lead acquisition' },
			{ label: 'ROI Optimization', desc: 'Maximizing marketing spend' },
			{ label: 'IVR Integration', desc: 'Smart voice response systems' },
			{ label: 'Legal PPC', desc: 'Specialized legal lead gen' },
			{ label: 'Healthcare PPC', desc: 'HIPAA compliant marketing' },
			{ label: 'Finance PPC', desc: 'High-value financial leads' },
			{ label: 'Call Recording', desc: 'QA and compliance monitoring' },
		],
	},
	{
		id: 'cms',
		title: 'CMS & Platforms',
		icon: <Layers className='size-6' />,
		description: 'Modern content management for agile marketing teams.',
		color: 'text-blue-400',
		bgColor: 'bg-blue-400/10',
		subServices: [
			{ label: 'Headless CMS', desc: 'Strapi, Contentful, and Sanity' },
			{ label: 'Shopify Plus', desc: 'Enterprise e-commerce solutions' },
			{ label: 'WordPress', desc: 'Custom enterprise deployments' },
			{ label: 'WooCommerce', desc: 'Scalable WP commerce' },
			{ label: 'Magento', desc: 'Complex retail ecosystems' },
			{ label: 'Custom CMS', desc: 'Tailored content architectures' },
			{ label: 'Ghost', desc: 'Modern publishing platforms' },
			{ label: 'Prismic', desc: 'Component-based editing' },
		],
	},
];

export default function Services() {
	const [activeTab, setActiveTab] = useState(categories[0]?.id);

	return (
		<section className='relative mx-auto max-w-7xl px-6 py-24'>
			{/* Header */}
			<div className='mb-16 space-y-4 text-center'>
				<h2 className='font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl'>
					Engineered for <span className='text-primary'>Performance.</span>
				</h2>
				<p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
					From complex backends to high-intent marketing funnels, we provide the full-stack infrastructure your business
					demands.
				</p>
			</div>

			{/* Category Row */}
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				{categories.map((cat) => (
					<button
						key={cat.id}
						onClick={() => setActiveTab(cat.id)}
						className={cn(
							'group relative flex flex-col items-start rounded-2xl border p-6 text-left transition-all duration-300',
							activeTab === cat.id ?
								'border-primary bg-card shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]'
							:	'border-border bg-card/40 hover:border-primary/50'
						)}>
						<div className={cn('mb-4 rounded-lg p-2 transition-colors', cat.bgColor, cat.color)}>{cat.icon}</div>
						<h3 className='mb-1 font-bold text-foreground'>{cat.title}</h3>
						<p className='text-sm text-muted-foreground'>{cat.description}</p>

						{activeTab === cat.id && (
							<motion.div
								layoutId='active-glow'
								className='absolute inset-0 rounded-2xl ring-2 ring-primary/50 pointer-events-none'
							/>
						)}
					</button>
				))}
			</div>

			{/* Detailed Services Grid */}
			<div className='mt-12 rounded-3xl border border-border bg-card/30 p-8 backdrop-blur-sm'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
						{categories
							.find((c) => c.id === activeTab)
							?.subServices.map((service, idx) => (
								<div
									key={idx}
									className='group relative flex flex-col justify-between rounded-xl border border-border/50 bg-background/50 p-5 hover:border-primary/30 hover:bg-background transition-all'>
									<div>
										<div className='flex items-center justify-between mb-2'>
											<span className='text-sm font-bold text-foreground'>{service.label}</span>
											<ArrowUpRight className='size-4 text-muted-foreground group-hover:text-primary transition-colors' />
										</div>
										<p className='text-xs leading-relaxed text-muted-foreground'>{service.desc}</p>
									</div>
									<div className='mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity'>
										Learn More <ChevronRight className='size-3' />
									</div>
								</div>
							))}
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Performance Decoration */}
			<div className='absolute -bottom-24 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-border to-transparent' />
		</section>
	);
}
