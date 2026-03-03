'use client';
import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import type { FAQSectionProps } from '@/types/services';

export function FAQSection({ items, title = 'Frequently Asked Questions', description, className }: FAQSectionProps) {
	if (!items.length) return null;

	return (
		<section className={cn('w-full', className)}>
			<div className="section-container">
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='grid gap-12 lg:grid-cols-[0.4fr_0.6fr]'>
				{/* Left column - Title */}
				<motion.div variants={itemVariants} className='max-w-sm'>
					<h2 className='font-heading mb-4 text-foreground text-3xl md:text-4xl lg:text-5xl font-bold text-pretty'>{title}</h2>
					{description && <p className='text-muted-foreground text-lg md:text-xl lg:text-2xl'>{description}</p>}
				</motion.div>

				{/* Right column - Accordion */}
				<motion.div variants={itemVariants}>
					<Accordion type='single' collapsible className='space-y-3'>
						{items.map((item, index) => (
							<AccordionItem
								key={item.question}
								value={item.question}
								className='rounded-2xl border border-border/50 bg-card/50 px-6 backdrop-blur-sm transition-all duration-300 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg'>
								<AccordionTrigger className='py-5 text-left text-base font-semibold text-foreground hover:no-underline [&[data-state=open]>svg]:text-primary'>
									<span className='flex items-center gap-4'>
										<span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary'>
											{String(index + 1).padStart(2, '0')}
										</span>
										{item.question}
									</span>
								</AccordionTrigger>
								<AccordionContent className='pb-5 pl-12 text-muted-foreground space-y-4'>
									<p>{item.answer}</p>
									{item.bulletPoints && item.bulletPoints.length > 0 && (
										<ul className='space-y-2'>
											{item.bulletPoints.map((point) => (
												<li key={point} className='flex items-start gap-3'>
													<span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary' />
													<span className='text-sm text-muted-foreground'>{point}</span>
												</li>
											))}
										</ul>
									)}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</motion.div>
			</motion.div>
			</div>
		</section>
	);
}
