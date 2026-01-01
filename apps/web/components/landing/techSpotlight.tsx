'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, Users, TrendingUp, Code2, ArrowRight } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

const services = [
	{
		title: 'Pay Per Call',
		description:
			'Connect with high-intent customers through verified phone leads. Our call tracking and routing ensures you only pay for qualified conversations that convert.',
		details: [
			'Consumer-initiated inbound calls',
			'Live transfer with real-time verification',
			'Offline media-driven campaigns',
			'Call recording and analytics',
		],
		icon: <Phone className='size-5 text-primary' />,
	},
	{
		title: 'Pay Per Lead',
		description:
			'Receive pre-qualified leads delivered directly to your CRM. Each lead is verified for accuracy and matched to your specific criteria before delivery.',
		details: [
			'Exclusive leads with no reselling',
			'Shared leads at competitive rates',
			'Real-time delivery via API or email',
			'Custom qualification filters',
		],
		icon: <Users className='size-5 text-primary' />,
	},
	{
		title: 'Digital Marketing',
		description:
			'Data-driven campaigns designed to maximize your return on ad spend. We manage everything from strategy to execution with full transparency on results.',
		details: [
			'Search engine optimization (SEO)',
			'Paid advertising (PPC & display)',
			'Email marketing automation',
			'Social media management',
		],
		icon: <TrendingUp className='size-5 text-primary' />,
	},
	{
		title: 'Web & App Development',
		description:
			'Custom websites and applications built to convert visitors into customers. From landing pages to full-scale platforms, we deliver production-ready solutions.',
		details: [
			'Business & ecommerce websites',
			'WordPress, Drupal & CMS solutions',
			'iOS & Android app development',
			'Landing page optimization',
		],
		icon: <Code2 className='size-5 text-primary' />,
	},
];

const trustIndicators = [
	'Performance-based pricing',
	'No long-term contracts',
	'Dedicated account manager',
	'Weekly performance reports',
];

export default function TechSpotlight() {
	return (
		<section className='relative py-24 px-6 bg-background border-y border-border'>
			<div className='max-w-6xl mx-auto'>
				{/* Header */}
				<div className='mb-16 text-center'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-foreground mb-6 leading-tight'>
						Solutions Built for <span className='text-primary'>Revenue Growth</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed'>
						We specialize in performance marketing and lead generation for businesses that need measurable results.
						Every service is designed to deliver qualified prospects and trackable ROI.
					</motion.p>
				</div>

				{/* Services Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
					{services.map((service, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							className='p-8 border border-border bg-card rounded-lg hover:border-primary/30 transition-colors duration-300'>
							<div className='flex items-center gap-4 mb-4'>
								<div className='p-3 rounded-lg bg-background border border-border shrink-0'>{service.icon}</div>
								<div>
									<h3 className='text-xl font-bold text-foreground tracking-tight'>{service.title}</h3>
								</div>
							</div>
							<p className='text-muted-foreground mb-5 leading-relaxed'>{service.description}</p>
							<ul className='space-y-2.5'>
								{service.details.map((detail, detailIdx) => (
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
						<div className='flex flex-wrap items-center gap-x-8 gap-y-4 justify-center md:justify-start'>
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
							Request a Quote
							<ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
