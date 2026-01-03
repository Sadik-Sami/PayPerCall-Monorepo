import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import {
	SectionHeader,
	StatsGrid,
	ProcessSteps,
	FAQSection,
	CTABanner,
	CaseStudyGrid,
} from '@workspace/ui/components/sections';

// Page-specific components
import HireCallCenterHero from './_components/hero';
import TrustBar from './_components/trust-bar';
import ServicesBreakdown from './_components/services-breakdown';
import WhyChooseUs from './_components/why-choose-us';
import PricingSection from './_components/pricing-section';
import TestimonialsSection from './_components/testimonials-section';

// Data
import { impactStats } from './_data/stats';
import { processSteps } from './_data/process';
import { faqs } from './_data/faq';
import { caseStudies } from './_data/case-studies';

// SEO Metadata
export const metadata: Metadata = {
	title: 'Hire a Call Center | Professional BPO & Outsourcing Services',
	description:
		'Hire a call center that delivers results. 24/7 inbound support, outbound calling, appointment setting, and lead generation. US-based agents, HIPAA compliant, no long-term contracts. Get a free quote today.',
	keywords: [
		'hire call center',
		'call center outsourcing',
		'BPO services',
		'inbound call center',
		'outbound call center',
		'appointment setting services',
		'customer service outsourcing',
		'lead generation call center',
		'HIPAA compliant call center',
		'24/7 call center services',
	],
	openGraph: {
		title: 'Hire a Call Center That Delivers Results | Core Closer',
		description:
			'Professional call center services with 24/7 coverage. Inbound support, outbound sales, appointment setting. US-based agents available. No long-term contracts.',
		type: 'website',
		url: '/hire-call-center',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Hire a Call Center | Core Closer',
		description:
			'Scale your customer service and sales with professional call center services. Get a free quote today.',
	},
	alternates: {
		canonical: '/hire-call-center',
	},
};

// JSON-LD Schema
const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	name: 'Call Center Outsourcing Services',
	provider: {
		'@type': 'Organization',
		name: 'Core Closer',
		url: 'https://corecloser.com',
	},
	description:
		'Professional call center outsourcing services including inbound customer support, outbound sales, appointment setting, and lead generation.',
	serviceType: 'Call Center Services',
	areaServed: {
		'@type': 'Country',
		name: 'United States',
	},
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Call Center Services',
		itemListElement: [
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Inbound Customer Support',
					description: '24/7 customer service, technical support, and order processing',
				},
			},
			{
				'@type': 'Offer',
				itemOffered: {
					'@type': 'Service',
					name: 'Outbound Calling Services',
					description: 'Lead generation, appointment setting, and market research',
				},
			},
		],
	},
};

export default function HireCallCenterPage() {
	return (
		<>
			{/* JSON-LD Schema */}
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<main className='min-h-screen'>
				{/* Hero Section */}
				<HireCallCenterHero />

				{/* Trust Bar */}
				<TrustBar />

				{/* Services Breakdown */}
				<ServicesBreakdown />

				{/* Impact Stats */}
				<section className='py-24 px-6 bg-muted/30'>
					<div className='max-w-6xl mx-auto'>
						<SectionHeader
							title='Results That Speak for'
							highlight='Themselves'
							subtitle='Our track record is built on delivering measurable outcomes for businesses across multiple industries.'
						/>
						<StatsGrid stats={impactStats} columns={4} />
					</div>
				</section>

				{/* Why Choose Us */}
				<WhyChooseUs />

				{/* How It Works */}
				<section className='py-24 px-6 bg-muted/30'>
					<div className='max-w-6xl mx-auto'>
						<SectionHeader
							badge='Getting Started'
							title='How It'
							highlight='Works'
							subtitle='From initial consultation to full operation in as little as 2-3 weeks. Our proven onboarding process ensures a smooth transition.'
						/>
						<ProcessSteps steps={processSteps} columns={4} />
					</div>
				</section>

				{/* Case Studies */}
				<section className='py-24 px-6 bg-background'>
					<div className='max-w-6xl mx-auto'>
						<SectionHeader
							badge='Success Stories'
							title='Real Results for Real'
							highlight='Businesses'
							subtitle='See how we have helped companies like yours scale their customer operations and drive measurable growth.'
						/>
						<CaseStudyGrid caseStudies={caseStudies} columns={3} />
					</div>
				</section>

				{/* Testimonials */}
				<TestimonialsSection />

				{/* Pricing */}
				<PricingSection />

				{/* FAQ */}
				<section className='py-24 px-6 bg-background'>
					<div className='max-w-6xl mx-auto'>
						<FAQSection
							faqs={faqs}
							title='Frequently Asked Questions'
							subtitle={
								<>
									Everything you need to know about our call center services. Can&apos;t find what you&apos;re looking
									for?{' '}
									<Link href='/contact' className='text-primary font-medium hover:underline'>
										Contact us
									</Link>
								</>
							}
							layout='split'
						/>
					</div>
				</section>

				{/* CTA */}
				<section className='py-24 px-6 bg-muted/30'>
					<CTABanner
						title='Ready to Scale Your Customer Operations?'
						subtitle="Get a free consultation to discuss your call center needs. We'll create a custom proposal within 48 hours."
						benefits={['No long-term contracts', 'Free consultation', 'Launch in 2-3 weeks']}
						phone='1-800-555-1234'>
						<Button asChild size='lg' className='h-12 px-8 rounded-lg font-medium'>
							<Link href='/contact'>
								Get a Free Quote
								<ArrowRight className='ml-2 size-4' />
							</Link>
						</Button>
						<Button asChild size='lg' variant='outline' className='h-12 px-8 rounded-lg font-medium'>
							<a href='tel:+18005551234'>
								<Phone className='mr-2 size-4' />
								Call Now
							</a>
						</Button>
					</CTABanner>
				</section>
			</main>
		</>
	);
}
