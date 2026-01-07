import { cn } from '@workspace/ui/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';
import type { FAQSectionProps } from './types';

export function FAQSection({ items, title = 'Frequently Asked Questions', description, className }: FAQSectionProps) {
	if (!items.length) return null;

	return (
		<section className={cn('space-y-4 rounded-3xl border bg-background/80 p-8', className)}>
			<div className='space-y-2'>
				<h2 className='text-2xl font-semibold text-foreground'>{title}</h2>
				{description ? <p className='text-muted-foreground'>{description}</p> : null}
			</div>
			<Accordion type='single' collapsible className='space-y-2'>
				{items.map((item) => (
					<AccordionItem key={item.question} value={item.question}>
						<AccordionTrigger className='text-left text-base font-semibold text-foreground'>{item.question}</AccordionTrigger>
						<AccordionContent className='text-sm text-muted-foreground'>{item.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}

