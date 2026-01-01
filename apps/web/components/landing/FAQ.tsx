'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import Link from 'next/link';

const faqs = [
	{
		question: 'How do you ensure lead quality?',
		answer:
			'Every lead goes through our verification process before delivery. We validate contact information, confirm intent through qualifying questions, and filter out duplicates. Our clients typically see 30-40% higher conversion rates compared to other lead sources.',
	},
	{
		question: 'What industries do you specialize in?',
		answer:
			'We focus on industries where phone calls drive conversions: Insurance (auto, home, health, Medicare), Legal Services (personal injury, bankruptcy, family law), Home Services (HVAC, plumbing, roofing, solar), Healthcare, Financial Services, and Automotive. Our team has deep expertise in compliance requirements for each vertical.',
	},
	{
		question: 'How is pricing structured?',
		answer:
			'We offer performance-based pricing—you only pay for qualified leads or calls that meet your criteria. Pricing varies by industry and lead type. There are no long-term contracts required, and we provide transparent reporting so you can track exactly what you are paying for.',
	},
	{
		question: 'How quickly can I start receiving leads?',
		answer:
			'Most clients start receiving leads within 24-48 hours of completing onboarding. We begin with a discovery call to understand your ideal customer profile, set up tracking and routing, then launch campaigns. Initial volume can be adjusted as we optimize for quality.',
	},
	{
		question: 'Can I set my own lead criteria and filters?',
		answer:
			'Absolutely. You can define geographic targeting, demographic filters, specific services of interest, and qualification questions. Leads that do not meet your criteria are not charged. We also offer real-time pause and resume controls so you can manage volume based on your capacity.',
	},
	{
		question: 'How do you track and report results?',
		answer:
			'You get access to a real-time dashboard showing all leads, call recordings (where permitted), conversion tracking, and ROI metrics. We provide weekly performance reports and monthly strategy reviews to continuously improve results.',
	},
];

export default function FAQ() {
	return (
		<section className='py-24 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16'>
					{/* Left Side: Header */}
					<div className='lg:col-span-5 space-y-4'>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground'>
							Frequently Asked Questions
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className='text-lg text-muted-foreground leading-relaxed'>
							Everything you need to know about our lead generation services. Can&apos;t find what you&apos;re looking
							for?{' '}
							<Link href='/contact' className='text-primary font-medium hover:underline'>
								Contact us
							</Link>
						</motion.p>
					</div>

					{/* Right Side: Accordion */}
					<div className='lg:col-span-7'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='rounded-lg border border-border bg-card'>
							<Accordion type='single' collapsible className='w-full'>
								{faqs.map((faq, index) => (
									<AccordionItem
										key={index}
										value={`item-${index}`}
										className='border-b border-border last:border-0 px-6'>
										<AccordionTrigger className='hover:no-underline py-5 text-left'>
											<span className='text-base font-semibold text-foreground'>{faq.question}</span>
										</AccordionTrigger>
										<AccordionContent className='text-muted-foreground text-sm leading-relaxed pb-5'>
											{faq.answer}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
