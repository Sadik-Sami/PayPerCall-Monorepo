'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@workspace/ui/components/accordion';
import { cn } from '@workspace/ui/lib/utils';

export interface FAQItem {
	question: string;
	answer: string | ReactNode;
}

export interface FAQSectionProps {
	faqs: FAQItem[];
	title?: string;
	subtitle?: string | ReactNode;
	layout?: 'stacked' | 'split';
	className?: string;
}

export function FAQSection({
	faqs,
	title = 'Frequently Asked Questions',
	subtitle,
	layout = 'split',
	className,
}: FAQSectionProps) {
	if (layout === 'stacked') {
		return (
			<div className={cn('max-w-3xl mx-auto', className)}>
				{/* Header */}
				<div className='mb-12 text-center'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground mb-4'>
						{title}
					</motion.h2>
					{subtitle && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className='text-lg text-muted-foreground'>
							{subtitle}
						</motion.div>
					)}
				</div>

				{/* FAQ Accordion */}
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
									<span className='text-base font-semibold text-foreground'>
										{faq.question}
									</span>
								</AccordionTrigger>
								<AccordionContent className='text-muted-foreground text-sm leading-relaxed pb-5'>
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</motion.div>
			</div>
		);
	}

	// Split layout (default)
	return (
		<div
			className={cn(
				'grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16',
				className
			)}>
			{/* Left Side: Header */}
			<div className='lg:col-span-5 space-y-4'>
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground'>
					{title}
				</motion.h2>
				{subtitle && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='text-lg text-muted-foreground leading-relaxed'>
						{subtitle}
					</motion.div>
				)}
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
									<span className='text-base font-semibold text-foreground'>
										{faq.question}
									</span>
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
	);
}
