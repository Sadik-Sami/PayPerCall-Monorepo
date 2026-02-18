'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import { ArrowRight, Check, HelpCircle, MessageSquare, PhoneCall } from 'lucide-react';

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
	const reduceMotion = useReducedMotion();

	const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

	const floatTransition = (duration: number, delay = 0) => ({
		duration,
		delay,
		repeat: Infinity,
		repeatType: 'mirror' as const,
		ease: 'easeInOut' as const,
	});

	return (
		<section className='py-20 lg:py-32 px-6 bg-background'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-16 lg:mb-20 max-w-3xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full'>
						Support Center
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.05 }}
						className='text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground mb-6'>
						Got questions? We’ve got{' '}
						<span className='text-primary relative inline-block'>
							answers.
							<svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" preserveAspectRatio="none" viewBox="0 0 100 10">
								<path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
							</svg>
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className='text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
						Everything you need to know about our Pay Per Call, lead generation, and development services. We’re here to help you
						scale efficiently.
					</motion.p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start'>
					{/* Left: FAQ Accordion */}
					<div className='order-2 lg:order-1'>
						<Accordion type='single' collapsible defaultValue='item-0' className='space-y-4'>
							{faqs.map((faq, index) => (
								<AccordionItem
									key={faq.question}
									value={`item-${index}`}
									className='group rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-300 hover:border-primary/30 dark:hover:border-primary/50'>
									<AccordionTrigger className='p-6 hover:no-underline text-left hover:bg-muted/40 dark:hover:bg-muted/20'>
										<span className='font-semibold text-foreground text-lg'>{faq.question}</span>
									</AccordionTrigger>
									<AccordionContent className='px-6 pb-6 pt-0 text-muted-foreground leading-relaxed'>
										<div className='pt-4 border-t border-border/60 text-sm'>{faq.answer}</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>

					{/* Right: Support illustration */}
					<div className='order-1 lg:order-2 flex flex-col items-center justify-center h-full relative'>
						<div className='relative w-full max-w-lg aspect-4/3 flex items-center justify-center mb-8'>
							<div className='relative w-64 h-64 md:w-80 md:h-80'>
								{/* Main card */}
								<motion.div
									initial={{ opacity: 0, y: 16, scale: 0.98 }}
									whileInView={{ opacity: 1, y: 0, scale: 1 }}
									viewport={{ once: true, amount: 0.4 }}
									transition={{ duration: 0.7, ease: EASE_OUT }}
									style={{ rotate: -5 }}
									className='absolute inset-0 m-auto z-20 w-48 h-48 md:w-56 md:h-56'>
									<motion.div
										animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
										transition={reduceMotion ? undefined : floatTransition(7)}
										className='h-full w-full rounded-[2.5rem] bg-card border border-border shadow-xl flex items-center justify-center'>
										<div className='text-primary'>
											<MessageSquare className='size-20 md:size-24' aria-hidden='true' />
											<span className='sr-only'>Support chat</span>
										</div>
									</motion.div>
								</motion.div>

								{/* Phone tile (bottom-right) */}
								<motion.div
									initial={{ opacity: 0, scale: 0.98 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true, amount: 0.4 }}
									transition={{ duration: 0.7, delay: 0.05, ease: EASE_OUT }}
									style={{ rotate: 12 }}
									className='absolute bottom-[-20px] right-[-20px] z-30 w-24 h-24 md:w-28 md:h-28'>
									<motion.div
										animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
										transition={reduceMotion ? undefined : floatTransition(8, 0.3)}
										className='h-full w-full rounded-3xl bg-card border border-border shadow-lg flex items-center justify-center'>
										<PhoneCall className='size-10 text-primary' aria-hidden='true' />
									</motion.div>
								</motion.div>

								{/* Status pill (top-right) */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.4 }}
									transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT }}
									style={{ rotate: 8 }}
									className='absolute top-0 right-[-10px] z-30'>
									<motion.div
										animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
										transition={reduceMotion ? undefined : floatTransition(9, 0.2)}
										className='px-4 py-2 bg-card rounded-lg shadow-lg border border-border'>
										<div className='flex gap-2 items-center'>
											<div className='w-2 h-2 rounded-full bg-emerald-500' />
											<div className='h-2 w-12 bg-muted rounded-full' />
										</div>
									</motion.div>
								</motion.div>

								{/* Check bubble (bottom-left) */}
								<motion.div
									initial={{ opacity: 0, x: -8, y: 8 }}
									whileInView={{ opacity: 1, x: 0, y: 0 }}
									viewport={{ once: true, amount: 0.4 }}
									transition={{ duration: 0.7, delay: 0.12, ease: EASE_OUT }}
									className='absolute bottom-10 left-[-40px] z-30'>
									<motion.div
										animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
										transition={reduceMotion ? undefined : floatTransition(10, 0.6)}
										className='w-12 h-12 bg-card rounded-full shadow-lg border border-border flex items-center justify-center'>
										<Check className='size-5 text-primary' aria-hidden='true' />
									</motion.div>
								</motion.div>

								{/* Question tile (top-left) */}
								<motion.div
									initial={{ opacity: 0, x: -6, y: -6 }}
									whileInView={{ opacity: 1, x: 0, y: 0 }}
									viewport={{ once: true, amount: 0.4 }}
									transition={{ duration: 0.7, delay: 0.14, ease: EASE_OUT }}
									style={{ rotate: -12 }}
									className='absolute top-[-30px] left-10 z-30'>
									<motion.div
										animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
										transition={reduceMotion ? undefined : floatTransition(11, 0.1)}
										className='w-10 h-10 bg-muted/60 dark:bg-muted/30 rounded-xl shadow-md border border-border flex items-center justify-center'>
										<HelpCircle className='size-4 text-primary/70' aria-hidden='true' />
									</motion.div>
								</motion.div>
							</div>
						</div>

						<div className='text-center p-6 rounded-2xl w-full max-w-sm bg-card border border-border shadow-sm'>
							<p className='text-muted-foreground font-medium mb-3'>Still haven’t found what you’re looking for?</p>
							<Link
								href='/contact'
								className='inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/90 transition-colors text-lg group'>
								Contact Us
								<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' aria-hidden='true' />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
