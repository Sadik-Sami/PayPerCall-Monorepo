import type { Metadata } from 'next';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactMultiStepForm } from '@/components/sections/contact/ContactMultiStepForm';
import { ContactWorldMapSection } from '@/components/sections/contact/ContactWorldMapSection';
import { CONTACT_REASSURANCE_ITEMS } from '@/components/sections/contact/contact-data';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Contact Us | CoreCloser',
	description:
		'Start a focused strategy conversation with CoreCloser. Share your goals, service priorities, and timeline to get matched with the right growth specialist.',
	alternates: {
		canonical: '/contact',
	},
	openGraph: {
		title: 'Contact CoreCloser',
		description:
			'Use our multi-step consultation form to connect with the right specialist for Pay Per Call, Pay Per Lead, digital marketing, and development services.',
		url: '/contact',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Contact CoreCloser',
		description: 'Tell us what you need and we will reply with a focused strategy path.',
	},
};

export default function ContactPage() {
	return (
		<main className='flex flex-col'>
			<ContactHero />
			<ContactMultiStepForm />

			<section className='w-full border-y border-border/60 bg-muted/30 py-14 sm:py-16 md:py-20'>
				<div className='section-container'>
					<div className='mx-auto max-w-3xl text-center'>
						<p className='inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary'>
							What To Expect
						</p>
						<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
							Everything is Built for Clear Next Steps
						</h2>
						<p className='mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base'>
							Most inquiries fail because the first call lacks context. This page is designed to prevent that and
							make your first meeting outcome-driven.
						</p>
					</div>

					<div className='mt-8 grid gap-4 md:grid-cols-3'>
						{CONTACT_REASSURANCE_ITEMS.map((item) => (
							<article
								key={item.question}
								className='rounded-2xl border border-pastel-peach-border/90 bg-pastel-peach/60 p-5 shadow-sm dark:bg-card/85'>
								<h3 className='text-base font-semibold text-foreground'>{item.question}</h3>
								<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{item.answer}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<ContactWorldMapSection />
		</main>
	);
}
