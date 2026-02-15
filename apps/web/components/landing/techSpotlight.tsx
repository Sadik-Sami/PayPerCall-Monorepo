'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, Users, TrendingUp, Code2, ArrowRight, Rocket, Target, Megaphone, Sparkles } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

const services = [
	{
		title: 'Pay Per Call Lead Generation',
		description:
			'Turn ready-to-buy shoppers into real conversations with qualified inbound calls and live transfer calls. Our call tracking, call routing, and call analytics help you focus on the calls that convert—so you\'re investing in outcomes, not guesswork.',
		details: [
			'Consumer-initiated inbound calls from high-intent prospects',
			'Live transfers with real-time screening and verification',
			'Offline media campaigns that drive phone call volume',
			'Call recording, reporting, and optimization for higher close rates',
		],
		icon: <Phone className='size-5 text-primary' />,
	},
	{
		title: 'Pay Per Lead Services',
		description:
			'Get pre-qualified leads delivered directly to your team with the accuracy and targeting you expect. Every lead is validated and aligned to your criteria before delivery, helping you improve lead quality, sales efficiency, and cost per acquisition (CPA).',
		details: [
			'Exclusive leads with no reselling or recycled data',
			'Shared leads at competitive pricing for scale',
			'Real-time lead delivery via API, webhook, CRM, or email',
			'Custom qualification filters to match your targeting rules',
		],
		icon: <Users className='size-5 text-primary' />,
	},
	{
		title: 'Digital Marketing That Scales',
		description:
			'Drive consistent growth with a performance-based approach to digital marketing services. From search engine optimization to paid media management, we build and manage campaigns designed to improve traffic, leads, and return on ad spend (ROAS).',
		details: [
			'SEO services with on-page, technical SEO, and content strategy',
			'PPC management (Google Ads, Bing Ads, display advertising)',
			'Email marketing automation and lifecycle campaigns',
			'Social media marketing and ongoing optimization',
		],
		icon: <TrendingUp className='size-5 text-primary' />,
	},
	{
		title: 'Web & App Development Built to Convert',
		description:
			'Your website should be a conversion engine—not just a brochure. We build modern, fast, and scalable experiences optimized for lead capture, landing page performance, and user experience (UX) across devices.',
		details: [
			'Business websites and ecommerce development',
			'WordPress development, Drupal development, and CMS builds',
			'iOS app development and Android app development',
			'Landing page design + conversion rate optimization (CRO)',
		],
		icon: <Code2 className='size-5 text-primary' />,
	},
];

const trustIndicators = [
	{ title: 'Fast Launch, Faster Results', icon: <Rocket className='size-4 text-primary' /> },
	{ title: 'Exclusive & Scalable Supply', icon: <Target className='size-4 text-primary' /> },
	{ title: 'Omnichannel Acquisition', icon: <Megaphone className='size-4 text-primary' /> },
	{ title: 'Conversion-Optimized Experiences', icon: <Sparkles className='size-4 text-primary' /> },
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
						Revenue-Driven Performance Marketing Solutions <span className='text-primary'>Built for Growth</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed'>
						Grow faster with a results-first partner built for lead generation, customer acquisition, and measurable ROI. We help businesses scale with high-intent phone calls, verified leads, SEO, PPC advertising, and conversion-focused web & app development—all backed by transparent reporting and performance tracking.
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
									<li key={detailIdx} className='flex items-start gap-2 text-sm text-muted-foreground italic'>
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
					<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
						<div className='flex flex-wrap items-center gap-x-4 gap-y-4 justify-center md:justify-start'>
							{trustIndicators.map((indicator, idx) => (
								<div key={idx} className='flex items-center gap-2 text-sm text-muted-foreground'>
									{indicator.icon}
									<span>{indicator.title}</span>
								</div>
							))}
						</div>
						<Link href='/contact'>
							<Button
								size='lg'
								className='bg-primary hover:bg-primary/90 text-primary-foreground px-4 h-12 rounded-lg group font-medium transition-colors duration-300'>
								Get A Free Consultation
								<ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
							</Button>
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
