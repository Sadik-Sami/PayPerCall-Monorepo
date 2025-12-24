'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import { HelpCircle, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

const faqs = [
	{
		question: 'How quickly can we kick off a new project?',
		answer:
			'For engineering tasks, we typically initiate discovery within 48 hours. PPC campaigns and DevOps infrastructure audits can often begin immediately after the strategic alignment call.',
		icon: <Zap className='size-4 text-accent' />,
	},
	{
		question: 'Do you work with existing in-house technical teams?',
		answer:
			'Absolutely. We often act as a force-multiplier for existing teams, taking over specialized DevOps pipelines or complex frontend migrations while your team stays focused on core business logic.',
		icon: <ShieldCheck className='size-4 text-blue-500' />,
	},
	{
		question: 'What is your stack preference for high-scale apps?',
		answer:
			'We specialize in the MERN stack (MongoDB, Express, React, Node) and Next.js for the frontend. For infrastructure, we are AWS and Docker heavy to ensure 99.9% uptime and global scalability.',
		icon: <HelpCircle className='size-4 text-sky-400' />,
	},
	{
		question: 'How do you handle post-launch maintenance?',
		answer:
			'We don’t believe in "ship and forget." We offer tiered maintenance retainers that include 24/7 monitoring, security patches, and performance optimization as your user base grows.',
		icon: <MessageSquare className='size-4 text-primary' />,
	},
	{
		question: 'Is your PPC management outcome-based?',
		answer:
			'Yes. We focus on "Cost Per Qualified Lead" rather than just vanity clicks. Our systems integrate directly with your CRM to track the full lifecycle of every call generated.',
		icon: <Zap className='size-4 text-accent' />,
	},
];

export default function FAQ() {
	return (
		<section className='relative py-24 px-6 bg-background overflow-hidden'>
			{/* Background Glow */}
			<div className='absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none' />

			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
					{/* Left Side: Editorial Content */}
					<div className='lg:col-span-5 space-y-6'>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.2em]'>
							Support & Discovery
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='text-4xl md:text-5xl font-heading font-bold tracking-tight'>
							Got questions? <br />
							<span className='text-muted-foreground'>We have engineered answers.</span>
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className='text-lg text-muted-foreground leading-relaxed'>
							Everything you need to know about our process, technology, and how we scale your digital presence.
							Can&apos;t find what you&apos;re looking for?
							<span className='text-primary font-bold cursor-pointer hover:underline ml-1'>Reach out directly.</span>
						</motion.p>
					</div>

					{/* Right Side: Accordion */}
					<div className='lg:col-span-7'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='rounded-3xl border border-border/50 bg-card/30 backdrop-blur-xl p-2 md:p-8'>
							<Accordion type='single' collapsible className='w-full space-y-4'>
								{faqs.map((faq, index) => (
									<AccordionItem
										key={index}
										value={`item-${index}`}
										className='border-b border-border/50 last:border-0 px-4'>
										<AccordionTrigger className='hover:no-underline py-6 text-left group'>
											<div className='flex items-center gap-4'>
												<div className='p-2 rounded-lg bg-background border border-border group-hover:border-primary/50 transition-colors'>
													{faq.icon}
												</div>
												<span className='text-base md:text-lg font-bold tracking-tight group-hover:text-primary transition-colors'>
													{faq.question}
												</span>
											</div>
										</AccordionTrigger>
										<AccordionContent className='text-muted-foreground text-sm md:text-base leading-relaxed pb-6 pl-14'>
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
