'use client';

import { SectionHeader } from '@workspace/ui/components/sections';
import { FAQSection as UIFAQSection } from '@workspace/ui/components/sections';

interface FAQ {
	id: string;
	question: string;
	answer: string;
}

interface FAQSectionProps {
	faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
	const faqData = faqs.map((faq) => ({
		question: faq.question,
		answer: faq.answer,
	}));

	return (
		<section className='py-24 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<SectionHeader title='Frequently Asked' highlight='Questions' subtitle='Everything you need to know' />
				<div className='mt-12'>
					<UIFAQSection faqs={faqData} />
				</div>
			</div>
		</section>
	);
}

