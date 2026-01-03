'use client';

import { motion } from 'framer-motion';
import { Button } from '@workspace/ui/components/button';
import { SectionHeader } from '@workspace/ui/components/sections';
import { ArrowRight, Check, Phone, Users, Clock } from 'lucide-react';
import Link from 'next/link';

const pricingModels = [
	{
		title: 'Per-Minute',
		description: 'Pay only for talk time',
		icon: <Clock className='size-6 text-primary' />,
		bestFor: 'Fluctuating call volumes',
		features: [
			'No minimum commitments',
			'Real-time usage tracking',
			'Ideal for seasonal businesses',
			'Scale up or down instantly',
		],
	},
	{
		title: 'Per-Call',
		description: 'Fixed rate per interaction',
		icon: <Phone className='size-6 text-primary' />,
		bestFor: 'Outbound campaigns',
		features: [
			'Predictable campaign costs',
			'Perfect for lead generation',
			'Includes follow-up attempts',
			'Detailed call disposition reports',
		],
	},
	{
		title: 'Dedicated Agents',
		description: 'Full-time agents for your account',
		icon: <Users className='size-6 text-primary' />,
		bestFor: 'Consistent high volume',
		features: [
			'Agents trained exclusively on your brand',
			'Maximum quality control',
			'Best cost at scale',
			'Custom scheduling options',
		],
	},
];

export default function PricingSection() {
	return (
		<section className='py-24 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<SectionHeader
					badge='Transparent Pricing'
					title='Flexible Plans That Fit'
					highlight='Your Business'
					subtitle='No hidden fees, no long-term contracts. Choose the pricing model that works for your volume and budget.'
				/>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
					{pricingModels.map((model, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className='p-6 md:p-8 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors'>
							<div className='p-3 rounded-lg bg-primary/10 w-fit mb-4'>
								{model.icon}
							</div>
							<h3 className='text-xl font-bold text-foreground mb-1'>
								{model.title}
							</h3>
							<p className='text-muted-foreground mb-4'>{model.description}</p>

							<div className='inline-block px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground mb-4'>
								Best for: {model.bestFor}
							</div>

							<ul className='space-y-2'>
								{model.features.map((feature, featureIdx) => (
									<li
										key={featureIdx}
										className='flex items-start gap-2 text-sm text-muted-foreground'>
										<Check className='size-4 text-primary mt-0.5 shrink-0' />
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center'>
					<p className='text-muted-foreground mb-6'>
						Not sure which model is right for you? Get a custom quote based on
						your specific needs.
					</p>
					<Button
						asChild
						size='lg'
						className='h-12 px-8 rounded-lg font-medium'>
						<Link href='/contact'>
							Request Custom Quote
							<ArrowRight className='ml-2 size-4' />
						</Link>
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
