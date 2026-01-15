import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	PricingTable,
	ProcessSteps,
	ServiceHero,
	ClientSuccessBreakdown,
	type SuccessOutcome,
	ServiceComparison,
	TrendingUp,
} from '@/components/services';
import type { Metadata } from 'next';
import type { FaqItem } from '@/types/services';
import heroImage3 from '@/public/images/slider/slider-3.jpg';
import { Briefcase, Building, Target } from 'lucide-react';

export const metadata: Metadata = {
	title: 'Business Website Development for B2B Companies | PayPerCall',
	description:
		'B2B websites built for measurable lead quality: SEO + schema, CMS governance, analytics instrumentation, and CRM routing.',
	alternates: { canonical: '/services/web-dev/business' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Business Website Development for B2B Companies',
		description: 'Websites designed to support sales with trust signals, search visibility, and measurable funnels.',
		url: '/services/web-dev/business',
		images: [
			{
				url: '/images/slider/slider-3.jpg',
				width: 1200,
				height: 630,
				alt: 'B2B business website development',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Business Website Development for B2B Companies',
		description: 'SEO-ready, CMS-driven B2B sites with analytics and CRM routing for lead quality.',
		images: ['/images/slider/slider-3.jpg'],
	},
	keywords: [
		'B2B website development',
		'business website design and development',
		'Next.js B2B website',
		'technical SEO and schema',
		'CRM lead routing',
		'headless CMS development',
	],
};

export const revalidate = 3600;

const HERO_CONTENT = {
	pill: 'Business Websites',
	title: 'B2B websites that back up your revenue goals',
	subtitle: 'Streamlined messaging, trust signals, and measurement so sales teams get cleaner leads.',
	features: ['Headless CMS', 'SEO + schema', 'Lead routing'],
	stat: { value: 'Free audit', label: 'Includes action plan + budget ranges' },
	primaryCta: { label: 'Request a Free Website Review', href: '/contact' },
	secondaryCta: { label: 'See Comparison Table', href: '/services/web-dev/business#pricing' },
	footnote: 'We follow up within one business day with the recorded findings.',
	media: {
		src: heroImage3,
		alt: 'Marketing leaders reviewing brand messaging',
		caption: 'Clear positioning, measurable funnels, confident governance.',
	},
};

const SUCCESS_OUTCOMES = [
	{
		icon: 'default',
		metric: '+32%',
		label: 'Average organic lift',
		description: 'Three months after launch across B2B sites',
		context: 'Through better SEO, schema markup, and content organization.',
	},
	{
		icon: 'database',
		metric: '4.6%',
		label: 'Median form completion rate',
		description: "Across all lead generation forms we've deployed",
		context: 'Industry average is 2-3%. We reduce friction and add trust.',
	},
	{
		icon: 'clock',
		metric: '48',
		label: 'Business sites launched',
		description: 'In insurance, legal, logistics, finance, and other B2B sectors',
		context: 'Each one measurably improved lead quality and sales conversation quality.',
	},
] satisfies SuccessOutcome[];

const OBJECTION_FAQ = [
	{
		question: 'Our internal team changes content frequently—how do we manage that without developer help?',
		answer:
			'We build with a headless CMS so your team can publish pages, change layouts, and add content without needing engineering. We provide training and operational docs so you stay confident and independent.',
		bulletPoints: [
			'Intuitive CMS interface (Contentful, Sanity, etc.)',
			'Reusable content blocks and page templates',
			'Video training and operations runbooks included',
		],
	},
	{
		question: "We're regulated (finance/legal/healthcare)—can you handle compliance requirements?",
		answer:
			"Yes. We've built compliant sites for financial advisors, law firms, and healthcare practices. We document all changes for audit trails, implement access controls, and ensure GDPR/HIPAA handling where required.",
		bulletPoints: [
			'Audit-ready change logs and version history',
			'Role-based access controls for sensitive content',
			'Compliance checklist reviewed before launch',
		],
	},
	{
		question: 'How do we measure whether the new site is actually driving better leads?',
		answer:
			'Every site ships with full attribution tracking. We configure your CRM integration so lead source is tracked through the entire pipeline. Weekly dashboards show which pages drive SQLs.',
		bulletPoints: [
			'CRM integration with lead scoring',
			'Page-to-opportunity attribution dashboards',
			'Weekly reporting to marketing and sales leadership',
		],
	},
] satisfies FaqItem[];

const COMPARISON_TIERS = [
	{ name: 'Essential', description: 'Focused positioning sites' },
	{ name: 'Growth', description: 'Multi-offer businesses' },
	{ name: 'Enterprise', description: 'Complex governance needs', recommended: true },
];

const COMPARISON_FEATURES = [
	{ name: 'Core page templates', included: ['Up to 6', '10+', '20+'] },
	{ name: 'Case study system', included: [false, true, true] },
	{ name: 'CRM integration', included: [false, true, true] },
	{ name: 'Testimonial management', included: [false, true, true] },
	{ name: 'Content automation', included: [false, 'Yes', 'Yes'] },
	{ name: 'Multi-region support', included: [false, false, true] },
	{ name: 'Advanced security reviews', included: [false, false, true] },
	{ name: 'Compliance audit trail', included: [false, 'Optional', true] },
];

const PROCESS_STEPS = [
	{
		title: 'Audience & Message Alignment',
		description: 'Work with stakeholders to clarify offers, proof points, and calls-to-action per audience.',
	},
	{
		title: 'Architecture & Content Planning',
		description: 'Define page types, modular sections, and metadata so content teams can scale confidently.',
	},
	{
		title: 'Design & Build',
		description: 'Produce accessible layouts, then ship them as reusable components managed via CMS.',
	},
	{
		title: 'Launch & Iterate',
		description: 'Deploy via ISR, validate analytics, and plan optimization sprints based on live data.',
	},
];

const CASE_STUDIES = [
	{
		client: 'Meridian Legal',
		industry: 'Legal',
		problem: 'Practice areas were buried and not mapped to regional search intent.',
		solution: 'Re-architected site navigation, added localized schema, and introduced evidence-driven testimonials.',
		outcome: 'Qualified consultation requests increased 52% with consistent first-response SLAs.',
		icon: <Briefcase className='size-5' />,
		metrics: [
			{ label: 'Consultations', value: '+52%' },
			{ label: 'First response', value: '<2 hrs' },
		],
	},
	{
		client: 'Waypoint Logistics',
		industry: 'Supply Chain',
		problem: 'Site failed to articulate service tiers and lacked conversion tracking.',
		solution: 'Built a modular services catalog, ROI snapshots, and integrated HubSpot workflows.',
		outcome: 'Sales accepted opportunities rose 34%, and marketing gained full-funnel attribution.',
		icon: <Building className='size-5' />,
		metrics: [
			{ label: 'SAOs', value: '+34%' },
			{ label: 'Attribution', value: 'Full-funnel' },
		],
	},
	{
		client: 'Everest Advisory',
		industry: 'Finance',
		problem: 'Needed a modern site that satisfied compliance reviews without sacrificing messaging.',
		solution: 'Established a compliant component library, audit-ready change logs, and encrypted form routing.',
		outcome: 'Passed regulatory review on the first attempt and doubled inbound RFP volume.',
		icon: <Target className='size-5' />,
		metrics: [
			{ label: 'RFP volume', value: '2x' },
			{ label: 'Audit issues', value: '0' },
		],
	},
];

const PRICING_PLANS = [
	{
		name: 'Essential Corporate Site',
		description: 'For focused positioning sites or rebrands with lean content.',
		priceLabel: 'From $22k',
		features: [
			'Up to 6 core templates',
			'CMS + publishing workflow',
			'On-page SEO + schema',
			'Analytics + lead routing',
		],
	},
	{
		name: 'Growth Website',
		description: 'Best for multi-offer businesses that need robust proof and resources.',
		priceLabel: 'From $38k',
		features: [
			'10+ templates including resources',
			'Case study + testimonial system',
			'CRM + marketing automation integration',
			'Performance budget + monitoring',
		],
		isRecommended: true,
		badge: 'Recommended',
	},
	{
		name: 'Enterprise Communications Hub',
		description: 'Global or regulated organizations with complex governance.',
		priceLabel: 'Custom',
		features: [
			'Multi-region or multilingual support',
			'Granular permissions + approval chains',
			'Advanced security reviews',
			'Quarterly optimization retainers',
		],
	},
];

const FAQ_ITEMS = [
	...OBJECTION_FAQ,
	{
		question: 'Do you provide copywriting?',
		answer:
			'We collaborate with your subject matter experts and can supply B2B copy partners upon request. Every layout includes content guidance to keep messaging consistent.',
	},
	{
		question: 'Can you integrate our preferred CMS?',
		answer:
			'Yes. We work with headless CMS platforms and can provide guidance on governance, workflows, and author experience.',
	},
	{
		question: 'How do you measure success for business sites?',
		answer:
			'We track Core Web Vitals, conversion rates, SQLs, and engagement metrics defined during discovery so you can see improvement clearly.',
	},
	{
		question: 'Is the website review complimentary?',
		answer: 'Yes. The review and follow-up brief are free—we only start billing if you approve a scoped build.',
	},
];

const TRENDING_METRICS = [
	{
		label: 'B2B buyers researching digitally',
		value: '94%',
		change: 'Up 23%',
		context: 'Decision-makers now prefer self-service research before talking to sales.',
	},
	{
		label: 'CMS adoption in enterprise',
		value: '78%',
		change: 'Up 18%',
		context: 'Content teams increasingly manage sites independently without developers.',
	},
	{
		label: 'Lead quality improvement',
		value: '+41%',
		change: 'Average',
		context: 'When B2B sites have clear messaging and trust signals.',
	},
	{
		label: 'Conversion rate uplift',
		value: '+35%',
		change: 'Typical',
		context: 'After implementing dynamic CTA routing and better funnel visibility.',
	},
];

export default function BusinessWebsitesPage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: 'Business Website Development',
		serviceType: 'B2B website design and development',
		provider: {
			'@type': 'Organization',
			name: 'PayPerCall',
			url: 'https://paypercall.com',
		},
		areaServed: {
			'@type': 'Country',
			name: 'United States',
		},
		description:
			'B2B websites built for measurable lead quality with SEO, schema, CMS governance, analytics, and CRM routing.',
	};

	return (
		<main className='space-y-0'>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<ClientSuccessBreakdown
				className='py-12 md:py-16 max-w-7xl mx-auto'
				title='B2B website results in clean leads'
				subtitle='Measured through lead quality and sales engagement rates.'
				outcomes={SUCCESS_OUTCOMES}
			/>
			<TrendingUp
				className='py-12 md:py-16 max-w-7xl mx-auto'
				title='How B2B buying behavior is shifting'
				description='The digital-first B2B buyer is now the norm. Sites that adapt to self-directed research and clear proof points win.'
				metrics={TRENDING_METRICS}
			/>
			<ProcessSteps
				className='py-12 md:py-16 max-w-7xl mx-auto'
				steps={PROCESS_STEPS}
				title='Structured delivery for corporate sites'
				variant='cards'
			/>
			<ServiceComparison
				className='py-12 md:py-16 max-w-7xl mx-auto'
				title='Choose your business website tier'
				subtitle='All tiers include strategy consultation, launch support, and ongoing CMS training.'
				tiers={COMPARISON_TIERS}
				features={COMPARISON_FEATURES}
			/>
			<CaseStudyStrip
				className='py-12 md:py-16 max-w-7xl mx-auto'
				items={CASE_STUDIES}
				title='Case studies focused on outcomes executives value'
			/>
			<div id='pricing' className='scroll-mt-24'>
				<PricingTable
					className='py-12 md:py-16 max-w-7xl mx-auto'
					title='Business website packages'
					description='Choose the tier that fits your content footprint. Every engagement still begins with a free website review.'
					plans={PRICING_PLANS}
					billingNote='Pricing assumes approved brand guidelines and access to stakeholders for timely reviews.'
				/>
			</div>
			<FAQSection className='py-12 md:py-16 max-w-7xl mx-auto' items={FAQ_ITEMS} />
			<div className='py-12 md:py-16 max-w-7xl mx-auto'>
				<ConsultationCTA
					className='max-w-7xl mx-auto'
					title='Request an evidence-based website review'
					bullets={[
						'Get a quick audit across UX, SEO, and trust signals.',
						'See the top fixes to schedule next release.',
						'Walk away with timeline and budget ranges.',
					]}
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
