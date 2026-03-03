'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@workspace/ui/components/button';
import { SectionHeader } from '@workspace/ui/components/sections';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { ArrowRight, Check, Clock, Phone, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@workspace/ui/lib/utils';

const pricingModels = [
	{
		title: 'Per-Minute',
		description: 'Pay only for talk time',
		icon: Clock,
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
		icon: Phone,
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
		icon: Users,
		bestFor: 'Consistent high volume',
		features: [
			'Agents trained exclusively on your brand',
			'Maximum quality control',
			'Best cost at scale',
			'Custom scheduling options',
		],
	},
];

const CARD_TONES = [
	'bg-pastel-peach border-pastel-peach-border',
	'bg-pastel-sky border-pastel-sky-border',
	'bg-pastel-lilac border-pastel-lilac-border',
] as const;

export default function PricingSection() {
	const shouldReduceMotion = useReducedMotion();

	return (
		<section className='relative overflow-hidden py-20 md:py-24'>
			<div className='pointer-events-none absolute inset-0 bg-linear-to-b from-muted/35 via-background to-background' />
			<div className='relative mx-auto max-w-6xl px-6'>
				<SectionHeader
					badge='Transparent Pricing'
					title='Flexible Plans That Fit'
					highlight='Your Business'
					subtitle='No hidden fees, no long-term contracts. Choose the pricing model that works for your volume and budget.'
				/>

				<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
					{pricingModels.map((model, idx) => {
						const Icon = model.icon;
						return (
							<motion.div
								key={model.title}
								initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
								whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : idx * 0.06 }}
								whileHover={shouldReduceMotion ? undefined : { y: -5 }}>
								<Card
									className={cn(
										'h-full rounded-3xl border shadow-sm transition-shadow hover:shadow-md',
										CARD_TONES[idx % CARD_TONES.length],
									)}>
									<CardHeader className='pb-2'>
										<div className='mb-2 inline-flex size-11 items-center justify-center rounded-xl border border-white/70 bg-white/45'>
											<Icon className='size-5 text-primary' />
										</div>
										<CardTitle className='text-xl'>{model.title}</CardTitle>
										<p className='text-sm text-foreground/80'>{model.description}</p>
										<div className='mt-2 inline-flex w-fit rounded-full border border-white/70 bg-white/45 px-3 py-1 text-xs font-semibold text-foreground/80'>
											Best for: {model.bestFor}
										</div>
									</CardHeader>

									<CardContent className='pt-1'>
										<ul className='space-y-2.5'>
											{model.features.map((feature) => (
												<li key={feature} className='flex items-start gap-2 text-sm text-foreground/85'>
													<Check className='mt-0.5 size-4 shrink-0 text-primary' />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</div>

				<motion.div
					initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
					whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='mt-10 rounded-2xl border border-border/70 bg-card/80 p-6 text-center md:p-7'>
					<p className='text-sm text-muted-foreground md:text-base'>
						Not sure which model is right for you? Get a tailored recommendation based on volume, staffing goals, and
						target CPL.
					</p>
					<div className='mt-5 flex flex-wrap items-center justify-center gap-3'>
						<Button asChild size='lg' className='group h-11 rounded-xl px-7'>
							<Link href='/contact'>
								Request Custom Quote
								<ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
							</Link>
						</Button>
						<Button asChild size='lg' variant='outline' className='h-11 rounded-xl px-7'>
							<a href='tel:+18553302777'>Call +1 (855) 330-2777</a>
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
