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
import { caseStudies } from './_data/case-studies';
import Testimonials from '@/components/sections/landing/Testimonials';

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

const SECTION_PADDING = 'py-20 md:py-24';

const VALUE_CARDS = [
	{
		title: 'Conversion-Ready Teams',
		description:
			'Dedicated agents trained on your offer, scripts, and qualification criteria to move every interaction toward revenue.',
		icon: 'UserCheck',
		theme: 'emerald' as const,
	},
	{
		title: 'Flexible Staffing Models',
		description:
			'Blend US-based and offshore teams to match your budget, service levels, and coverage windows without long-term lock-in.',
		icon: 'Users',
		theme: 'blue' as const,
	},
	{
		title: 'Compliance-First Operations',
		description:
			'TCPA adherence with HIPAA-ready workflows and secure call handling standards for sensitive industries.',
		icon: 'ShieldCheck',
		theme: 'purple' as const,
	},
	{
		title: 'Performance Visibility',
		description:
			'Track call quality, conversion trends, and ramp progress so optimization decisions are fast and measurable.',
		icon: 'BarChart3',
		theme: 'amber' as const,
	},
];

const TRANSFORMATION_PAIRS = [
	{ before: 'In-house coverage gaps', after: '24/7/365 support coverage', featured: true },
	{ before: 'Long onboarding cycles', after: 'Launch in 2-3 weeks' },
	{ before: 'Missed high-intent calls', after: 'Overflow + after-hours capture' },
	{ before: 'Fixed staffing overhead', after: 'Elastic call center capacity' },
];

const BEFORE_ITEMS = [
	{
		title: 'Missed Revenue Windows',
		description:
			'Internal teams struggle to cover nights, weekends, and seasonal spikes, leaving qualified prospects unanswered.',
		icon: 'PhoneOff',
	},
	{
		title: 'Unpredictable Intake Quality',
		description:
			'Without clear scripts and QA, lead qualification is inconsistent and sales teams waste time on poor-fit contacts.',
		icon: 'FileQuestion',
	},
	{
		title: 'Limited Scale Capacity',
		description: 'Hiring and training in-house takes too long when campaign volume rises or expansion targets change.',
		icon: 'Clock',
	},
];

const AFTER_ITEMS = [
	{
		title: 'Always-On Coverage',
		description:
			'Calls are handled across business hours, after-hours, weekends, and holidays with your escalation rules in place.',
		icon: 'PhoneCall',
		pastel: 'pastel-mint' as const,
	},
	{
		title: 'Qualified Conversations',
		description:
			'Agents follow your qualification framework so your closers receive better-context opportunities and cleaner handoffs.',
		icon: 'Filter',
		pastel: 'pastel-sky' as const,
	},
	{
		title: 'Compliance Confidence',
		description:
			'Programs are configured for regulated workflows with clear QA checkpoints and documented call handling standards.',
		icon: 'ShieldCheck',
		pastel: 'pastel-lilac' as const,
	},
	{
		title: 'Growth Without Rebuilds',
		description: 'Scale volume up or down quickly while maintaining service quality and response consistency.',
		icon: 'TrendingUp',
		pastel: 'pastel-peach' as const,
	},
];

const TRANSFORMATION_STATS = [
	{ value: '850K+', label: 'Calls handled monthly', pastel: 'pastel-sky' as const },
	{ value: '96%', label: 'Client retention', pastel: 'pastel-mint' as const },
	{ value: '500+', label: 'Trained agents', pastel: 'pastel-lilac' as const },
];

const HIRE_SERVICE_CARDS = [
	{
		label: 'Inbound Support Teams',
		description: 'Customer care, order support, and technical intake built around your workflows.',
		href: '/contact',
		ctaLabel: 'Build Inbound Team',
		iconKey: 'Headphones' as const,
		accentColor: 'green' as const,
	},
	{
		label: 'Outbound Revenue Ops',
		description: 'Lead qualification, appointment setting, and reactivation campaigns for pipeline growth.',
		href: '/contact',
		ctaLabel: 'Build Outbound Team',
		iconKey: 'Phone' as const,
		accentColor: 'purple' as const,
	},
	{
		label: 'Hybrid Coverage Model',
		description: 'Combine inbound support and outbound programs under one QA-driven management layer.',
		href: '/contact',
		ctaLabel: 'Design Hybrid Plan',
		iconKey: 'Users' as const,
		accentColor: 'amber' as const,
	},
];

const CASE_STUDY_ITEMS = caseStudies.map((item, index) => ({
	title: item.company,
	description: `${item.industry}: ${item.problem} ${item.solution}`,
	accentColor: (['pastel-peach', 'pastel-lilac', 'pastel-mint'] as const)[index % 3],
}));

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
