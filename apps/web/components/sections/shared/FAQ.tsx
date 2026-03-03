'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import { ArrowRight, Check, HelpCircle, MessageSquare, PhoneCall } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import type { FaqItem } from '@/types/services';

export interface FAQProps {
	items: FaqItem[];
	variant?: 'landing' | 'pastel';
	title?: string;
	description?: string;
	badge?: string;
	ctaText?: string;
	ctaHref?: string;
	className?: string;
}

const DEFAULT_LANDING = {
	badge: 'Support Center',
	title: "Got questions? We've got",
	titleHighlight: 'answers.',
	description:
		"Everything you need to know about our Pay Per Call, lead generation, and development services. We're here to help you scale efficiently.",
	ctaText: 'Contact Us',
	ctaHref: '/contact',
	ctaPrompt: "Still haven't found what you're looking for?",
};

const DEFAULT_PASTEL = {
	badge: 'Pay Per Call FAQ',
	title: "Got questions? We've got",
	titleHighlight: 'answers.',
	description:
		"Everything you need to know about Pay Per Call—billing, quality, tracking, and how to get started. We're here to help you scale.",
	ctaText: 'Contact Us',
	ctaHref: '/contact',
	ctaPrompt: "Still haven't found what you're looking for?",
};

export default function FAQ({
	items,
	variant = 'landing',
	title,
	description,
	badge,
	ctaText,
	ctaHref,
	className,
}: FAQProps) {
	if (!items.length) return null;

	const reduceMotion = useReducedMotion();
	const isPastel = variant === 'pastel';

	const defaults = isPastel ? DEFAULT_PASTEL : DEFAULT_LANDING;
	const finalBadge = badge ?? defaults.badge;
	const finalTitle = title ?? defaults.title;
	const finalTitleHighlight = isPastel ? defaults.titleHighlight : defaults.titleHighlight;
	const finalDescription = description ?? defaults.description;
	const finalCtaText = ctaText ?? defaults.ctaText;
	const finalCtaHref = ctaHref ?? defaults.ctaHref;
	const finalCtaPrompt = defaults.ctaPrompt;

	const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

	const floatTransition = (duration: number, delay = 0) => ({
		duration,
		delay,
		repeat: Infinity,
		repeatType: 'mirror' as const,
		ease: 'easeInOut' as const,
	});

	/* Variant-specific classes */
	const sectionClass = isPastel
		? 'py-20 lg:py-32 px-6'
		: 'py-20 lg:py-32 px-6';

	const badgeClass = isPastel
		? 'bg-pastel-lilac/60 text-pastel-lilac-ink'
		: 'bg-primary/10 text-primary';

	const titleHighlightClass = isPastel ? 'text-pastel-lilac-strong' : 'text-primary';
	const underlineClass = isPastel ? 'text-pastel-lilac-strong/30' : 'text-primary/20';

	const accordionItemClass = (index: number) =>
		isPastel
			? cn(
				'group rounded-2xl overflow-hidden transition-all duration-300',
				index % 3 === 0 && 'border border-pastel-peach-border bg-pastel-peach/30 hover:border-pastel-peach-strong',
				index % 3 === 1 && 'border border-pastel-lilac-border bg-pastel-lilac/20 hover:border-pastel-lilac-strong',
				index % 3 === 2 && 'border border-pastel-sky-border bg-pastel-sky/20 hover:border-pastel-sky-strong'
			)
			: 'group rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-300 hover:border-primary/30 dark:hover:border-primary/50';

	const accordionTriggerClass = isPastel
		? 'p-6 hover:no-underline text-left'
		: 'p-6 hover:no-underline text-left';

	const accordionContentBorderClass = isPastel
		? 'border-pastel-lilac-border'
		: 'border-border';

	const mainCardClass = isPastel
		? 'h-full w-full rounded-[2.5rem] bg-pastel-lilac border border-pastel-lilac-border shadow-xl flex items-center justify-center'
		: 'h-full w-full rounded-[2.5rem] bg-card border border-border shadow-xl flex items-center justify-center';

	const mainIconClass = isPastel ? 'text-pastel-lilac-strong' : 'text-primary';

	const phoneTileClass = isPastel
		? 'h-full w-full rounded-3xl bg-pastel-mint border border-pastel-mint-border shadow-lg flex items-center justify-center'
		: 'h-full w-full rounded-3xl bg-card border border-border shadow-lg flex items-center justify-center';

	const phoneIconClass = isPastel ? 'size-10 text-pastel-mint-strong' : 'size-10 text-primary';

	const statusPillClass = isPastel
		? 'px-4 py-2 bg-pastel-peach/50 rounded-lg shadow-lg border border-pastel-peach-border'
		: 'px-4 py-2 bg-card rounded-lg shadow-lg border border-border';

	const checkBubbleClass = isPastel
		? 'w-12 h-12 bg-pastel-mint rounded-full shadow-lg border border-pastel-mint-border flex items-center justify-center'
		: 'w-12 h-12 bg-card rounded-full shadow-lg border border-border flex items-center justify-center';

	const checkIconClass = isPastel ? 'size-5 text-pastel-mint-strong' : 'size-5 text-primary';

	const helpTileClass = isPastel
		? 'w-10 h-10 bg-pastel-sky/50 rounded-xl shadow-md border border-pastel-sky-border flex items-center justify-center'
		: 'w-10 h-10 bg-muted/60 dark:bg-muted/30 rounded-xl shadow-md border border-border flex items-center justify-center';

	const helpIconClass = isPastel ? 'size-4 text-pastel-sky-strong' : 'size-4 text-primary/70';

	const ctaCardClass = isPastel
		? 'text-center p-6 rounded-2xl w-full max-w-sm bg-pastel-lilac/30 border border-pastel-lilac-border shadow-sm'
		: 'text-center p-6 rounded-2xl w-full max-w-sm bg-card border border-border shadow-sm';

	const ctaLinkClass = isPastel
		? 'inline-flex items-center gap-2 text-pastel-lilac-strong font-semibold hover:text-pastel-lilac-ink transition-colors text-lg group'
		: 'inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/90 transition-colors text-lg group';

	const arrowIconClass = isPastel ? 'size-4 text-pastel-lilac-strong' : 'size-4 text-primary';

	return (
		<section className={cn(sectionClass, className)}>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-16 lg:mb-20 max-w-3xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className={cn(
							'inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full',
							badgeClass
						)}>
						{finalBadge}
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.05 }}
						className='text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground mb-6'>
						{finalTitle}{' '}
						<span className={cn(titleHighlightClass, 'relative inline-block')}>
							{finalTitleHighlight}
							<svg
								className={cn('absolute w-full h-3 -bottom-1 left-0', underlineClass)}
								preserveAspectRatio='none'
								viewBox='0 0 100 10'>
								<path d='M0 5 Q 50 10 100 5' fill='none' stroke='currentColor' strokeWidth='8' />
							</svg>
						</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className='text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
						{finalDescription}
					</motion.p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start'>
					{/* Left: FAQ Accordion */}
					<div className='order-2 lg:order-1'>
						<Accordion type='single' collapsible defaultValue='item-0' className='space-y-4'>
							{items.map((faq, index) => (
								<AccordionItem
									key={faq.question}
									value={`item-${index}`}
									className={accordionItemClass(index)}>
									<AccordionTrigger className={accordionTriggerClass}>
										<span className='font-semibold text-foreground text-lg'>{faq.question}</span>
									</AccordionTrigger>
									<AccordionContent className='px-6 pb-6 pt-0 text-muted-foreground leading-relaxed'>
										<div className={cn('pt-4 border-t text-sm', accordionContentBorderClass)}>
											{faq.answer}
											{faq.bulletPoints && faq.bulletPoints.length > 0 && (
												<ul className='mt-3 space-y-2'>
													{faq.bulletPoints.map((point) => (
														<li key={point} className='flex items-start gap-2'>
															<span
																className={cn(
																	'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
																	isPastel ? 'bg-pastel-lilac-strong' : 'bg-primary'
																)}
															/>
															<span>{point}</span>
														</li>
													))}
												</ul>
											)}
										</div>
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
										className={mainCardClass}>
										<div className={mainIconClass}>
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
									className='absolute -bottom-5 -right-5 z-30 w-24 h-24 md:w-28 md:h-28'>
									<motion.div
										animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
										transition={reduceMotion ? undefined : floatTransition(8, 0.3)}
										className={phoneTileClass}>
										<PhoneCall className={phoneIconClass} aria-hidden='true' />
									</motion.div>
								</motion.div>

								{/* Status pill (top-right) */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.4 }}
									transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT }}
									style={{ rotate: 8 }}
									className='absolute top-0 -right-2.5 z-30'>
									<motion.div
										animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
										transition={reduceMotion ? undefined : floatTransition(9, 0.2)}
										className={statusPillClass}>
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
									className='absolute bottom-10 -left-10 z-30'>
									<motion.div
										animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
										transition={reduceMotion ? undefined : floatTransition(10, 0.6)}
										className={checkBubbleClass}>
										<Check className={checkIconClass} aria-hidden='true' />
									</motion.div>
								</motion.div>

								{/* Question tile (top-left) */}
								<motion.div
									initial={{ opacity: 0, x: -6, y: -6 }}
									whileInView={{ opacity: 1, x: 0, y: 0 }}
									viewport={{ once: true, amount: 0.4 }}
									transition={{ duration: 0.7, delay: 0.14, ease: EASE_OUT }}
									style={{ rotate: -12 }}
									className='absolute -top-7.5 left-10 z-30'>
									<motion.div
										animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
										transition={reduceMotion ? undefined : floatTransition(11, 0.1)}
										className={helpTileClass}>
										<HelpCircle className={helpIconClass} aria-hidden='true' />
									</motion.div>
								</motion.div>
							</div>
						</div>

						<div className={ctaCardClass}>
							<p className='text-muted-foreground font-medium mb-3'>{finalCtaPrompt}</p>
							<Link href={finalCtaHref} className={ctaLinkClass}>
								{finalCtaText}
								<ArrowRight className={cn('transition-transform group-hover:translate-x-1', arrowIconClass)} aria-hidden='true' />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
