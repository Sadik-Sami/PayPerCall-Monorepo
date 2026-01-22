import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	PricingTable,
	ProcessSteps,
	ServiceHero,
	ClientSuccessBreakdown,
	type SuccessOutcome,
	ResultsGallery,
} from '@/components/services';
import heroImageLanding from '@/public/images/slider/slider-2.jpg';
import { Megaphone, MousePointer, BarChart3 } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Landing Page Development | Conversion Tracking and A/B Testing | PayPerCall',
	description:
		'High-velocity landing pages built for measurable results: fast performance, conversion-focused structure, event tracking, and A/B test readiness.',
	alternates: { canonical: '/services/web-dev/landing-page' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Landing Page Development',
		description: 'Campaign landing pages with clean proof, fast load times, and measurement built in.',
		url: '/services/web-dev/landing-page',
		images: [
			{
				url: '/images/slider/slider-2.jpg',
				width: 1200,
				height: 630,
				alt: 'Landing page development and measurement',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Landing Page Development',
		description: 'Conversion-focused landing pages with event tracking and A/B test readiness.',
		images: ['/images/slider/slider-2.jpg'],
	},
	keywords: [
		'landing page development',
		'conversion rate optimization',
		'A/B testing landing pages',
		'GA4 event tracking',
		'paid campaign landing pages',
		'Next.js landing page build',
	],
};

const HERO_CONTENT = {
	pill: 'Landing Pages',
	title: 'Campaign landing pages with clean proof and tracking',
	subtitle: 'Each build ships with fast load times, tested messaging, and analytics so you know every dollar’s impact.',
	features: ['Conversion copy', 'Event tracking', 'A/B test ready'],
	stat: { value: 'Kickoff call · free', label: 'Includes outline + measurement plan' },
	primaryCta: { label: 'Brief Us on Your Campaign', href: '/contact' },
	secondaryCta: { label: 'See Pricing Options', href: '/services/web-dev/landing-page#pricing' },
	footnote: 'We’ll share draft wireframes within 48 hours of the call.',
	media: {
		src: heroImageLanding,
		alt: 'Creative director reviewing landing page wireframes',
		caption: 'Wireframes plus copy beats guesswork every time.',
	},
};

const SUCCESS_OUTCOMES = [
	{
		icon: 'default',
		metric: '210',
		label: 'Landing pages shipped in 2025',
		description: 'Across demand gen, product launches, and webinar campaigns',
		context: 'Average time to first version: 10 days from kickoff.',
	},
	{
		icon: 'database',
		metric: '+28%',
		label: 'Median conversion lift',
		description: 'Performance improvement vs. previous or competitor pages',
		context: 'Measured 30 days post-launch with control group comparison.',
	},
	{
		icon: 'clock',
		metric: '<1.5s',
		label: 'Median LCP score',
		description: 'Large Contentful Paint across all page variants',
		context: 'Speed directly impacts conversion rates and SEO rankings.',
	},
] satisfies SuccessOutcome[];

const RESULTS = [
	{
		label: 'Cost Per Lead',
		before: '$42',
		after: '$28',
		improvement: '-33%',
		context: 'Improved conversion rate on paid search campaigns.',
	},
	{
		label: 'Form Completion Rate',
		before: '2.1%',
		after: '4.6%',
		improvement: '+119%',
		context: 'Better copy, fewer form fields, and trust signals.',
	},
	{
		label: 'Webinar Registration Rate',
		before: '18%',
		after: '38%',
		improvement: '+111%',
		context: 'Added agenda visibility, speaker bios, and social proof.',
	},
];

const PROCESS_STEPS = [
	{ title: 'Campaign Intake', description: 'Clarify the offer, audience, traffic source, and success metrics.' },
	{
		title: 'Wireframe & Copy Collaboration',
		description: 'Draft structure and conversion copy with stakeholders or internal copy partners.',
	},
	{
		title: 'Build & QA',
		description: 'Develop in Next.js with strict performance budgets and analytics instrumentation.',
	},
	{
		title: 'Experiment & Optimize',
		description: 'Support variant launches, heatmaps, and metric reviews to secure lift.',
	},
];

const CASE_STUDIES = [
	{
		client: 'Peak Software',
		problem: 'Paid search campaigns were constrained by legacy landing templates.',
		solution: 'Introduced modular hero, proof, and pricing blocks with targeted messaging for each vertical.',
		outcome: 'Lowered cost per qualified lead by 33% within 45 days.',
		icon: <Megaphone className='size-5' />,
		metrics: [
			{ label: 'CPL', value: '-33%' },
			{ label: 'Time to launch', value: '45 days' },
		],
	},
	{
		client: 'Atlas Risk',
		problem: 'Enterprise risk offering needed long-form education without hurting speed.',
		solution: 'Crafted a narrative-driven page with expandable sections and structured schema.',
		outcome: 'Sales accepted leads improved 41% with sub-1.5s LCP.',
		icon: <BarChart3 className='size-5' />,
		metrics: [
			{ label: 'SQL lift', value: '+41%' },
			{ label: 'LCP', value: '1.5s' },
		],
	},
	{
		client: 'Lumen Healthcare',
		problem: 'Webinar registrations stalled due to unclear agenda and proof.',
		solution: 'Developed a repeatable webinar page system with agenda builder, speaker bios, and reminders.',
		outcome: 'Registration rate climbed to 48% of unique visitors.',
		icon: <MousePointer className='size-5' />,
		metrics: [
			{ label: 'Registrations', value: '48%' },
			{ label: 'Reminder opt-in', value: '+63%' },
		],
	},
];

const PRICING_PLANS = [
	{
		name: 'Single Landing Page',
		description: 'One campaign, high velocity.',
		priceLabel: 'From $6k',
		features: [
			'Strategy + copy walkthrough',
			'Custom design + build',
			'Analytics + event setup',
			'One round of refinements',
		],
	},
	{
		name: 'Landing Page Bundle',
		description: 'Three coordinated pages or funnel steps.',
		priceLabel: 'From $15k',
		features: ['Shared component system', 'Per-channel optimization', 'QA across devices', 'Experiment roadmap'],
		isRecommended: true,
		badge: 'Most booked',
	},
	{
		name: 'Optimization Retainer',
		description: 'Ongoing testing and variant creation.',
		priceLabel: 'From $8k / month',
		features: [
			'Experiment backlog management',
			'Design + build of variants',
			'Weekly reporting',
			'Stakeholder reviews',
		],
	},
];

const FAQ_ITEMS = [
	{
		question: 'We need pages fast—can you keep turnarounds short without sacrificing quality?',
		answer:
			'Yes. We use a battle-tested template system and reusable components so we can ship high-quality pages in 10–15 days. We skip the unnecessary design cycles and focus on conversion science and messaging.',
		bulletPoints: [
			'Modular hero, proof, pricing, CTA blocks',
			'Proven conversion patterns from 200+ pages',
			'Fast iteration cycles with client feedback',
		],
	},
	{
		question: 'How do we know which version wins? Do you support A/B testing?',
		answer:
			'Absolutely. Every page ships with analytics hooks and A/B testing capability. We guide you on what to test (headline variants, CTA copy, proof elements) and provide weekly reporting so you can iterate with confidence.',
		bulletPoints: [
			'Built-in GA4 and Segment instrumentation',
			'A/B test framework ready (no developer overhead)',
			'Weekly conversion and traffic reports',
		],
	},
	{
		question: 'We run campaigns across multiple channels—can pages adapt to different traffic sources?',
		answer:
			'Yes. We design modular pages so you can adapt headlines, copy, and proof elements per traffic source (paid search, paid social, email, etc.) without rebuilding. Same codebase, different messaging.',
		bulletPoints: [
			'Dynamic headline and CTA variation per URL param',
			'Channel-specific proof and social proof sections',
			'One codebase, multiple messaging layers',
		],
	},
	{
		question: 'Do you supply copy or work with our team?',
		answer:
			'We can collaborate with your internal marketers or bring in conversion-focused copy partners. Every engagement starts with a messaging workshop.',
	},
	{
		question: 'What analytics integrations are included?',
		answer:
			'We wire up your analytics stack (GA4, HubSpot, Segment, etc.) and configure conversion events tied to the campaign goal.',
	},
	{
		question: 'Can you support multiple traffic sources?',
		answer:
			'Yes. We adapt modules for paid search, paid social, webinars, or partnerships so you can run controlled experiments per channel.',
	},
	{
		question: 'Is the campaign planning call free?',
		answer: 'Yes. Sharing your brief and getting our outline costs nothing—we only bill if you green-light a build.',
	},
];

export default function LandingPageWebDevPage() {
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Service',
						serviceType: 'Landing Page Development',
						provider: {
							'@type': 'Organization',
							name: 'PayPerCall',
							url: 'https://paypercall.com',
						},
						description:
							'High-velocity landing pages built for measurable results: fast performance, conversion-focused structure, event tracking, and A/B test readiness.',
						areaServed: {
							'@type': 'Place',
							name: 'United States',
						},
						offers: {
							'@type': 'Offer',
							availability: 'https://schema.org/InStock',
							priceSpecification: {
								'@type': 'PriceSpecification',
								priceCurrency: 'USD',
								price: '6000',
								description: 'Starting from $6k for single landing page builds',
							},
						},
					}),
				}}
			/>
			<main className='space-y-0'>
				<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
				<ClientSuccessBreakdown
					className='py-12 md:py-16 max-w-7xl mx-auto'
					title='Landing page results that drive campaigns'
					subtitle='Conversion rates and speed matter equally.'
					outcomes={SUCCESS_OUTCOMES}
				/>
				<ProcessSteps
					className='py-12 md:py-16 max-w-7xl mx-auto'
					steps={PROCESS_STEPS}
					title='Landing page delivery model'
					variant='cards'
				/>
				<ResultsGallery
					className='py-12 md:py-16 max-w-7xl mx-auto'
					title='Conversion improvements across campaign types'
					subtitle='Real CPL, registration, and signup rate improvements.'
					results={RESULTS}
				/>
				<CaseStudyStrip
					className='py-12 md:py-16 max-w-7xl mx-auto'
					items={CASE_STUDIES}
					title='Conversion lifts backed by data'
				/>
				<div id='pricing' className='scroll-mt-24'>
					<PricingTable
						className='py-12 md:py-16 max-w-7xl mx-auto'
						title='Landing page pricing'
						description='Choose the engagement that matches your campaign cadence—every option kicks off with a free brief.'
						plans={PRICING_PLANS}
						billingNote='Turnarounds assume approved copy and brand assets within 48 hours of kickoff.'
					/>
				</div>
				<FAQSection className='py-12 md:py-16 max-w-7xl mx-auto' items={FAQ_ITEMS} />
				<div id='consultation' className='scroll-mt-24 py-12 md:py-16 max-w-7xl mx-auto'>
					<ConsultationCTA
						className='max-w-7xl mx-auto'
						title='Highlight your next campaign with a free planning call'
						bullets={[
							'Share the offer, KPI, and traffic plan in plain language.',
							'See wireframe and copy patterns that already convert.',
							'Leave with scope, price range, and launch timeline.',
						]}
						formVariant='short'
					/>
				</div>
			</main>
		</>
	);
}