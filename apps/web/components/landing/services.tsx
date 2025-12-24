'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { Code2, Terminal, PhoneIncoming, Layers, ChevronRight, ArrowUpRight, Zap } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

const categories = [
	{
		id: 'web-dev',
		title: 'Web Development',
		icon: <Code2 className='size-6' />,
		description: 'Custom engineering from MERN to JAMstack architectures.',
		color: 'text-blue-500',
		bgColor: 'bg-blue-500/10',
		cta: 'Start Building Your App',
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
		description: 'Infrastructure as code and automated CI/CD pipelines.',
		color: 'text-sky-400',
		bgColor: 'bg-sky-400/10',
		cta: 'Audit Your Infrastructure',
		subServices: [
			{ label: 'AWS/Azure', desc: 'Cloud infrastructure management' },
			{ label: 'Docker & K8s', desc: 'Containerization & Orchestration' },
			{ label: 'CI/CD', desc: 'Automated deployment pipelines' },
			{ label: 'Security', desc: 'Penetration testing & compliance' },
			{ label: 'Monitoring', desc: 'Real-time system health checks' },
			{ label: 'IaC', desc: 'Terraform & Ansible automation' },
		],
	},
	{
		id: 'ppc',
		title: 'Pay-Per-Call',
		icon: <PhoneIncoming className='size-6' />,
		description: 'High-intent lead generation and campaign scaling.',
		color: 'text-accent',
		bgColor: 'bg-accent/10',
		cta: 'Scale Your Leads Now',
		subServices: [
			{ label: 'Campaign Setup', desc: 'End-to-end PPC architecture' },
			{ label: 'Lead Tracking', desc: 'Real-time conversion analytics' },
			{ label: 'IVR Optimization', desc: 'Smart call routing systems' },
			{ label: 'SEO for Calls', desc: 'Organic high-intent traffic' },
		],
	},
	{
		id: 'cms',
		title: 'CMS & Platforms',
		icon: <Layers className='size-6' />,
		description: 'Robust e-commerce and content management solutions.',
		color: 'text-primary',
		bgColor: 'bg-primary/10',
		cta: 'Launch Your Store',
		subServices: [
			{ label: 'Shopify Plus', desc: 'Enterprise e-commerce scaling' },
			{ label: 'Headless CMS', desc: 'Sanity, Strapi, and Contentful' },
			{ label: 'WooCommerce', desc: 'Custom WordPress commerce' },
			{ label: 'Migration', desc: 'Seamless platform transitions' },
		],
	},
];

export default function Services() {
	const [activeTab, setActiveTab] = useState(categories[0]?.id);
	const activeCategory = categories.find((c) => c.id === activeTab);

	return (
		<section id='services' className='relative py-24 px-6 bg-background overflow-hidden'>
			{/* Dynamic Background Glow */}
			<div
				className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 blur-[120px] pointer-events-none transition-all duration-1000'
				style={{ background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)` }}
			/>

			<div className='max-w-7xl mx-auto relative z-10'>
				{/* UPDATED: Centered Header Section */}
				<div className='mb-16 space-y-4 text-center'>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em]'>
						Capabilities
					</motion.div>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground'>
						Specialized <span className='text-primary text-glow'>Solutions</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='text-muted-foreground text-lg max-w-2xl mx-auto'>
						We provide elite-level engineering and marketing infrastructure designed for scale and high-volume
						performance.
					</motion.p>
				</div>

				{/* Category Selectors - Centered via justify-center */}
				{/* Category Selectors - Updated for equal mobile width */}
				<div className='grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4 mb-12'>
					{categories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => setActiveTab(cat.id)}
							className={cn(
								// Added 'w-full' and 'justify-start' for mobile alignment
								'flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 rounded-2xl border transition-all duration-300 w-full md:w-auto',
								activeTab === cat.id ?
									'bg-card border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.1)]'
								:	'bg-transparent border-border/50 hover:border-primary/20 text-muted-foreground'
							)}>
							<div className={cn('p-2 rounded-lg', activeTab === cat.id ? cat.bgColor : 'bg-muted/50')}>
								{React.cloneElement(cat.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
									className: cn('size-5', activeTab === cat.id ? cat.color : 'text-muted-foreground'),
								})}
							</div>
							{/* 'truncate' prevents long text from breaking the button on very small screens */}
							<span className='font-bold tracking-tight text-xs md:text-sm truncate'>{cat.title}</span>
						</button>
					))}
				</div>

				{/* Sub-Services Grid */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
						{activeCategory?.subServices.map((service, idx) => (
							<div
								key={idx}
								className='group relative flex flex-col justify-between rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 hover:border-primary/30 transition-all duration-500 overflow-hidden'>
								<div className='absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />

								<div className='relative z-10'>
									<div className='flex items-center justify-between mb-3'>
										<span className='text-sm font-bold text-foreground group-hover:text-primary transition-colors'>
											{service.label}
										</span>
										<ArrowUpRight className='size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all' />
									</div>
									<p className='text-xs leading-relaxed text-muted-foreground/80'>{service.desc}</p>
								</div>
							</div>
						))}
					</motion.div>
				</AnimatePresence>

				{/* Dynamic Contextual CTA */}
				<motion.div
					layout
					className='mt-12 p-8 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-6'>
					<div className='flex items-center gap-4 text-center md:text-left'>
						<div className='p-3 rounded-full bg-primary/20 text-primary hidden md:block'>
							<Zap className='size-6 fill-primary' />
						</div>
						<div>
							<h4 className='font-bold text-foreground'>{activeCategory?.cta}</h4>
							<p className='text-sm text-muted-foreground'>Ready to deploy these capabilities to your project?</p>
						</div>
					</div>
					<Button size='lg' className='rounded-full px-8 group font-bold tracking-tight'>
						Consult our Engineers
						<ChevronRight className='ml-2 size-4 group-hover:translate-x-1 transition-transform' />
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
