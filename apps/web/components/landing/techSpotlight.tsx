'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Code2, Database, Server, ArrowRight } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

const capabilities = [
	{
		title: 'Full-Stack Development',
		description: 'Production-ready applications built with Next.js, React, and TypeScript. Optimized for performance, SEO, and scalability.',
		details: ['MERN stack expertise', 'Serverless architecture', 'Real-time features'],
		icon: <Code2 className='size-5 text-primary' />,
	},
	{
		title: 'DevOps & Infrastructure',
		description: 'Reliable cloud infrastructure with 99.99% uptime. Automated deployments, monitoring, and monitoring.',
		details: ['CI/CD pipelines', 'Container orchestration', 'Performance monitoring'],
		icon: <Server className='size-5 text-primary' />,
	},
	{
		title: 'Data Architecture',
		description: 'Scalable database design and data pipelines. Built for growth with proper indexing and query optimization.',
		details: ['Database optimization', 'Data migration', 'Backup strategies'],
		icon: <Database className='size-5 text-primary' />,
	},
];

const trustIndicators = [
	'No vendor lock-in',
	'Transparent pricing',
	'Code ownership',
	'Documentation included',
];

export default function TechSpotlight() {
	return (
		<section className='relative py-24 px-6 bg-background border-y border-border'>
			<div className='max-w-6xl mx-auto'>
				{/* Header */}
				<div className='mb-20 text-center'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-foreground mb-6 leading-tight'>
						Built for <span className='text-primary'>Business Growth</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed'>
						We deliver enterprise-grade software solutions and infrastructure that scale with your business.
						Every project includes comprehensive documentation, ongoing support, and full code ownership.
					</motion.p>
				</div>

				{/* Capabilities Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
					{capabilities.map((capability, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							className='p-8 border border-border bg-card rounded-lg hover:border-primary/30 transition-colors duration-300'>
							<div className='mb-6 p-3 w-fit rounded-lg bg-background border border-border'>
								{capability.icon}
							</div>
							<h3 className='text-xl font-bold text-foreground mb-3 tracking-tight'>
								{capability.title}
							</h3>
							<p className='text-muted-foreground mb-4 leading-relaxed'>
								{capability.description}
							</p>
							<ul className='space-y-2'>
								{capability.details.map((detail, detailIdx) => (
									<li key={detailIdx} className='flex items-start gap-2 text-sm text-muted-foreground'>
										<CheckCircle2 className='size-4 text-primary mt-0.5 shrink-0' />
										<span>{detail}</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				{/* Trust Indicators */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className='border-t border-border pt-12'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-8'>
						<div className='flex flex-wrap items-center gap-6 justify-center md:justify-start'>
							{trustIndicators.map((indicator, idx) => (
								<div key={idx} className='flex items-center gap-2 text-sm text-muted-foreground'>
									<CheckCircle2 className='size-4 text-primary' />
									<span>{indicator}</span>
								</div>
							))}
						</div>
						<Button
							size='lg'
							className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 rounded-lg group font-medium transition-colors duration-300'>
							Get Started
							<ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
