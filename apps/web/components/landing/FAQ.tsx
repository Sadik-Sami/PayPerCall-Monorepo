'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';

const faqs = [
	{
		question: 'What services do you offer?',
		answer:
			'We offer full-stack growth support from start to finish: Pay-Per-Call, Pay-Per-Lead, SEO, paid ads, and Web & App Development. Whether you’re looking to keep the phone ringing, generate sales-ready leads, climb the Google rankings, tighten up ad performance, or launch a high-converting website/app — we handle the strategy, buildout, launch, and ongoing optimization so results keep getting better over time.',
	},
	{
		question: 'What’s the difference between Pay-Per-Call and Pay-Per-Lead?',
		answer:
			'Pay-Per-Call is built to drive live, inbound phone calls from high-intent prospects—great for urgent needs or high-ticket services where a conversation closes faster. Pay-Per-Lead delivers lead submissions (forms, quote requests, appointment requests) that your team follows up with. We’ll point you to the best fit based on your sales workflow, how quickly you can follow up, and the CPA/CPL targets you want to hit.',
	},
	{
		question: 'How do you ensure call/lead quality?',
		answer:
			'Quality is the name of the game—and we protect it with smart targeting, layered filtering, and real-time monitoring. Depending on the campaign, that can include geo/device controls, keyword + intent targeting, IVR routing, duplicate suppression, fraud filtering, and quality rules (like minimum call duration or required lead fields). We also do weekly performance reviews and tighten the knobs based on what’s converting—so you’re not just getting more volume, you’re getting better outcomes.',
	},
	{
		question: 'How fast can I start receiving calls or leads?',
		answer:
			'Most campaigns can go live within a few business days, depending on the offer, compliance/approvals, and tracking setup. Once we lock in your targeting, qualification rules, call routing, and reporting, we start testing traffic and optimizing toward your KPIs. SEO is a longer play—usually weeks to months—but the upside is compounding growth that builds month after month.',
	},
	{
		question: 'What do you need from me to get started?',
		answer:
			'To get off the ground smoothly, we typically need your target states/service area, hours of operation, offer details, any compliance requirements, your preferred call/lead type, and access to tracking (call tracking number, CRM/postback, or basic reporting). If tracking isn’t in place yet, no worries—we can walk you through it and help implement what you need.',
	},
	{
		question: 'Do you provide reporting and optimization?',
		answer:
			'Absolutely. You’ll get clean, easy-to-read reporting on key metrics like call volume, call duration, lead delivery, CPL/CPA, conversion signals, and source performance, plus ongoing optimization. We’re always working to move the needle—sharper targeting, stronger quality, and scalable growth based on what actually converts (not vanity numbers).',
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
							Got questions? We’ve got answers.
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className='text-lg text-muted-foreground leading-relaxed'>
							Explore Core Closer FAQs for Pay Per Call, Lead Generation, SEO, PPC, and Web & App Development—plus full digital marketing support. Learn how we target the right audience, deliver quality calls/leads, and track results with clear reporting and compliance-first practices. Don’t see your question? Reach out anytime—our team will give you straight answers and recommend the best next step for your goals and budget.
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
