import type { Metadata } from 'next';
import FAQ from '@/components/sections/shared/FAQ';
import { AboutPageCta } from '@/components/sections/about/AboutPageCta';
import { TestimonialsHero } from './_components/TestimonialsHero';
import { StatsStrip } from './_components/StatsStrip';
import { FeaturedTestimonials } from './_components/FeaturedTestimonials';
import { FilterableTestimonials } from './_components/FilterableTestimonials';
import { DetailedStories } from './_components/DetailedStories';
import { TrustIndicators } from './_components/TrustIndicators';
import { TestimonialsCrossLinks } from './_components/TestimonialsCrossLinks';
import { TESTIMONIAL_FAQS, testimonialsJsonLd } from './_data/testimonials-content';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Client Testimonials | Core Closer',
	description:
		'Read real testimonials from client teams across insurance, legal, healthcare, home services, financial, and B2B sectors who trust Core Closer for performance marketing and delivery.',
	alternates: {
		canonical: '/about/testimonials',
	},
	openGraph: {
		title: 'Client Testimonials | Core Closer',
		description:
			'Real results from teams who chose Core Closer for pay per call, pay per lead, digital marketing, and development.',
		url: '/about/testimonials',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Client Testimonials | Core Closer',
		description: 'See what client teams say about working with Core Closer across industries.',
	},
};

export default function TestimonialsPage() {
	return (
		<>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsJsonLd) }} />

			<main className='flex flex-col'>
				<TestimonialsHero />
				<div className='bg-muted/30'>
					<StatsStrip />
				</div>
				<div className='bg-background'>
					<FeaturedTestimonials />
				</div>
				<div className='bg-muted/30'>
					<FilterableTestimonials />
				</div>
				<div className='bg-background'>
					<DetailedStories />
				</div>
				<div className='bg-muted/30'>
					<TrustIndicators />
				</div>
				<div className='bg-background'>
					<FAQ
						items={TESTIMONIAL_FAQS}
						variant='pastel'
						badge='Testimonials FAQ'
						title='Questions teams ask before'
						description='Answers about client references, expected results, and how Core Closer supports different industries.'
						className='section-container py-16 sm:py-20'
					/>
				</div>
				<div className='bg-muted/30'>
					<TestimonialsCrossLinks />
				</div>
				<div className='bg-background'>
					<AboutPageCta
						title='Ready to become our next success story?'
						description='Tell us about your current challenges with call quality, lead routing, reporting, or conversion. We will recommend a practical path forward.'
						ctaLabel='Start a strategy conversation'
					/>
				</div>
			</main>
		</>
	);
}
