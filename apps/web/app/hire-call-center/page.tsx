import { Metadata } from 'next';
import {
	CaseStudyStrip,
	ConsultationCTA,
	ProcessSteps,
	ServiceCapabilitiesGateway,
	ServiceHero,
	TransformationComparisonSection,
	ValuePropositionSection,
} from '@/components/sections/services';
import FAQ from '@/components/sections/shared/FAQ';
import { AudienceFitSection } from './_components/audience-fit-section';
import PricingSection from './_components/pricing-section';
import ServicesBreakdown from './_components/services-breakdown';
import WhyChooseUs from './_components/why-choose-us';

import { processSteps } from './_data/process';
import { faqs } from './_data/faq';
import {
	AFTER_ITEMS,
	BEFORE_ITEMS,
	CASE_STUDY_ITEMS,
	HIRE_SERVICE_CARDS,
	SECTION_PADDING,
	TRANSFORMATION_PAIRS,
	TRANSFORMATION_STATS,
	VALUE_CARDS,
	jsonLd,
} from './_data/page-content';
import Testimonials from '@/components/sections/landing/Testimonials';

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
		title: 'Hire a Call Center Built to Convert | Core Closer',
		description:
			'Conversion-focused inbound and outbound call center services with 24/7/365 coverage, compliance support, and flexible staffing.',
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

export default function HireCallCenterPage() {
	return (
		<>
			{/* JSON-LD Schema */}
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<main className='min-h-screen'>
				<div className='w-full bg-background'>
					<ServiceHero
						className='section-container pt-16 pb-12 md:pt-20 md:pb-16'
						pill='Hire a Call Center'
						eyebrow='Inbound + Outbound Operations'
						title='Build a high-converting call center program without long hiring cycles'
						subtitle='Launch a managed call center team for customer support, lead qualification, and appointment setting with 24/7/365 coverage and flexible staffing.'
						primaryCta={{ label: 'Book Free Consultation', href: '/contact' }}
						secondaryCta={{ label: 'Call +1 (855) 330-2777', href: 'tel:+18553302777' }}
						features={[
							'Launch in 2-3 weeks',
							'No long-term contracts',
							'US + offshore options',
							'HIPAA-ready workflows',
						]}
						stat={{ value: '96%', label: 'Client retention rate' }}
						footnote='Ideal for growing teams that need conversion-focused call handling without operational bottlenecks.'
						media={{
							src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
							alt: 'Call center agents collaborating on customer support and sales workflows',
							caption: 'Dedicated teams aligned to your scripts, KPIs, and conversion goals.',
						}}
					/>
				</div>

				<div className='w-full bg-muted/30'>
					<AudienceFitSection className={SECTION_PADDING} />
				</div>

				<div className='w-full bg-background'>
					<ServicesBreakdown />
				</div>

				<div className='w-full bg-background'>
					<ValuePropositionSection
						className={SECTION_PADDING}
						badgeLabel='Why teams outsource with us'
						titleHighlight='Call Center Services'
						description='A conversion-focused operating model that combines coverage, quality control, and measurable improvement across inbound and outbound workflows.'
						valueCards={VALUE_CARDS}
						transformationPairs={TRANSFORMATION_PAIRS}
					/>
				</div>

				<div className='w-full bg-muted/30'>
					<TransformationComparisonSection
						className={SECTION_PADDING}
						ctaHref='/contact'
						ctaLabel='Get My Call Center Blueprint'
						badgeLabel='Operational Shift'
						titleHighlight='Customer Operations'
						description='Replace missed-call risk and inconsistent qualification with a structured call center engine built for conversion and scale.'
						beforeTitle='Before Outsourcing'
						beforeDescription='Coverage gaps, uneven call quality, and slow scaling limit revenue and customer satisfaction.'
						afterTitle='With Managed Call Center Support'
						afterDescription='Consistent interactions, qualified call handling, and flexible capacity aligned with your growth targets.'
						beforeItems={BEFORE_ITEMS}
						afterItems={AFTER_ITEMS}
						stats={TRANSFORMATION_STATS}
						readyTitle='Ready to scale with confidence?'
						readyDescription='Start with a free consultation and get a practical rollout path in 48 hours.'
					/>
				</div>

				<div className='w-full bg-background'>
					<WhyChooseUs />
				</div>

				<div className='w-full bg-background'>
					<ProcessSteps
						className={SECTION_PADDING}
						variant='cards'
						title='From strategy call to go-live in weeks'
						description='A structured launch path designed to reduce onboarding friction and accelerate measurable outcomes.'
						steps={processSteps.map((step) => ({
							title: step.title,
							description: step.description,
						}))}
					/>
				</div>

				<div className='w-full bg-muted/30'>
					<PricingSection />
				</div>

				<div className='w-full bg-background'>
					<ServiceCapabilitiesGateway
						className={SECTION_PADDING}
						title='Choose the call center model that matches your growth stage'
						subtitle='Start with focused inbound or outbound execution, then evolve into a unified hybrid operation as volume grows.'
						cards={HIRE_SERVICE_CARDS}
						columns={3}
						primaryCta={{ label: 'Schedule My Strategy Call', href: '/contact' }}
						primaryCtaNote='Prefer immediate help? Call +1 (855) 330-2777.'
					/>
				</div>

				<div className='w-full bg-muted/30'>
					<CaseStudyStrip
						className={SECTION_PADDING}
						title='What conversion-focused call operations deliver'
						description='Examples from insurance, home services, and legal programs where response speed and qualified conversations directly impacted growth.'
						items={CASE_STUDY_ITEMS}
						cta={{ text: 'Start My Pilot Program', href: '/contact' }}
					/>
				</div>

				<div className='w-full bg-background'>
					<Testimonials />
				</div>

				<div className='w-full bg-muted/30'>
					<FAQ
						items={faqs.map((faq) => ({ question: faq.question, answer: faq.answer as string }))}
						variant='pastel'
						badge='Hire Call Center FAQ'
						description='Answers on onboarding speed, compliance, staffing models, integrations, and scaling strategy.'
						className={SECTION_PADDING}
					/>
				</div>

				<div className='w-full bg-background'>
					<div className='section-container py-20 md:py-24'>
						<ConsultationCTA
							category='hire-call-center'
							title='Get your custom call center rollout plan'
							subtitle='Tell us your volume targets and service requirements. We will map staffing structure, launch timeline, and KPI targets for your team.'
							badge={{ label: 'Free Consultation', icon: 'MessageSquare' }}
							features={[
								{
									title: '48-hour strategy response',
									description: 'Receive a scoped recommendation and next-step rollout path fast.',
									icon: 'Zap',
								},
								{
									title: 'Dual conversion path',
									description: 'Use form submission for planning or call immediately for urgent launch timelines.',
									icon: 'TrendingUp',
								},
								{
									title: 'Transparent rollout scope',
									description: 'Know team structure, expected ramp, and operating model before commitment.',
									icon: 'Eye',
								},
							]}
							tagline='No long-term contract required. Start with a pilot and expand based on outcomes.'
							formTitle='Tell us about your call center goals'
							submitLabel='Get My Custom Plan'
							formVariant='detailed'
							urgencyBadge={{ text: 'Prefer to talk now? Call +1 (855) 330-2777', icon: 'MessageSquare' }}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
