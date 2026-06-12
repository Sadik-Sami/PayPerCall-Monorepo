import type { Metadata } from 'next';
import FAQ from '@/components/sections/shared/FAQ';
import { TestimonialsSection } from '@/components/sections/services/shared/TestimonialsSection';
import { AboutPageCta } from '@/components/sections/about/AboutPageCta';
import { ComplianceTrust } from './_components/ComplianceTrust';
import { OperatingModel } from './_components/OperatingModel';
import { PlatformComparison } from './_components/PlatformComparison';
import { PlatformPillars } from './_components/PlatformPillars';
import { WhyUsCrossLink } from './_components/WhyUsCrossLink';
import { WhyUsHero } from './_components/WhyUsHero';
import { WHY_US_FAQS, WHY_US_TESTIMONIALS, whyUsJsonLd } from './_data/why-us-content';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Why Us | CoreCloser',
	description:
		'See why teams choose CoreCloser for pay per call, pay per lead, digital marketing, development, and managed operational support under one platform model.',
	alternates: {
		canonical: '/about/why-us',
	},
	openGraph: {
		title: 'Why Us | CoreCloser',
		description:
			'Learn how CoreCloser connects acquisition, conversion, reporting, and delivery for growth-focused teams.',
		url: '/about/why-us',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Why Us | CoreCloser',
		description: 'Explore the platform-level differentiators behind CoreCloser’s growth and delivery model.',
	},
};

export default function WhyUsPage() {
	return (
		<>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(whyUsJsonLd) }} />

			<main className='flex flex-col'>
				<WhyUsHero />
				<div className='bg-background'>
					<PlatformPillars />
				</div>
				<div className='bg-muted/30'>
					<PlatformComparison />
				</div>
				<div className='bg-background'>
					<OperatingModel />
				</div>
				<div className='bg-muted/30'>
					<ComplianceTrust />
				</div>
				<div className='bg-background'>
					<TestimonialsSection
						testimonials={WHY_US_TESTIMONIALS}
						variant='featured'
						title='What clients notice once the platform is connected'
						description='The value shows up when acquisition, delivery, and reporting stop operating in separate silos.'
						className='py-16 sm:py-20'
					/>
				</div>
				<div className='bg-muted/30'>
					<FAQ
						items={WHY_US_FAQS}
						variant='pastel'
						badge='Why CoreCloser FAQ'
						title='Questions teams ask before'
						description='Answers about platform fit, delivery support, compliance-sensitive workflows, and how engagements usually begin.'
						className='section-container py-16 sm:py-20'
					/>
				</div>
				<div className='bg-background'>
					<WhyUsCrossLink />
				</div>
				<div className='bg-muted/30'>
					<AboutPageCta
						title='Want one partner accountable for growth and delivery?'
						description='We can review your current funnel, identify where vendor separation is slowing execution, and recommend a practical path forward.'
						ctaLabel='Book a strategy call'
					/>
				</div>
			</main>
		</>
	);
}
