import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	PricingTable,
	ServiceHero,
	ClientSuccessBreakdown,
	type SuccessOutcome,
	IntegrationLogos,
	ResultsGallery,
	ProcessSteps,
} from '@/components/services';
import { Timeline, type TimelineEntry } from '@workspace/ui/components/ui/timeline';
import heroImageCommerce from '@/public/images/slider/slider-1.jpg';
import { ShoppingBag, Truck, CreditCard } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Ecommerce Website Development | Performance, Ops, and Integrations | PayPerCall',
	description:
		'Conversion-ready ecommerce builds: storefront performance, payments, tax, fulfillment, and ERP/CRM integrations with measurable revenue outcomes.',
	alternates: { canonical: '/services/web-dev/ecommerce' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Ecommerce Website Development',
		description: 'Storefront performance, merchandising, and integrations delivered together for reliable growth.',
		url: '/services/web-dev/ecommerce',
		images: [
			{
				url: '/images/slider/slider-1.jpg',
				width: 1200,
				height: 630,
				alt: 'Ecommerce website development and operations',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Ecommerce Website Development',
		description: 'Performance, payments, and ops-ready ecommerce builds with measurable outcomes.',
		images: ['/images/slider/slider-1.jpg'],
	},
	keywords: [
		'ecommerce web development',
		'headless commerce development',
		'Shopify headless storefront',
		'checkout optimization',
		'payments tax fulfillment integrations',
		'ecommerce performance optimization',
	],
};

const HERO_CONTENT = {
	pill: 'Ecommerce',
	title: 'Conversion-ready storefronts with reliable ops',
	subtitle: 'Performance, merchandising, and integrations handled together so you can scale revenue without surprises.',
	features: ['Headless commerce', 'Payments + tax', 'Inventory + ERP sync'],
	stat: { value: 'Complimentary audit', label: 'Delivered with prioritized next steps' },
	primaryCta: { label: 'Start a Free Strategy Session', href: '/contact' },
	secondaryCta: { label: 'Request Store Audit', href: '/services/web-dev/ecommerce#consultation' },
	footnote: 'We only need access to analytics and current goals—no prep decks required.',
	media: {
		src: heroImageCommerce,
		alt: 'Commerce operations dashboard presentation',
		caption: 'Every engagement aligns ops, marketing, and engineering.',
	},
};

const SUCCESS_OUTCOMES = [
	{
		icon: 'default',
		metric: '$220M+',
		label: 'GMV supported in 2025',
		description: "Total gross merchandise value processed through storefronts we've built",
		context: 'Across DTC brands, B2B marketplaces, and enterprise catalogs.',
	},
	{
		icon: 'database',
		metric: '78%',
		label: 'Average checkout completion rate',
		description: 'Conversion from cart to confirmation across all store types',
		context: 'Industry average is 70%. We focus on reducing friction and removing abandonment.',
	},
	{
		icon: 'gitBranch',
		metric: '+21%',
		label: 'Average AOV lift',
		description: 'Increase in average order value post-launch',
		context: 'Through better product discovery, bundling, and personalization.',
	},
] satisfies SuccessOutcome[];

const ECOMMERCE_INTEGRATIONS = [
	{ name: 'Stripe', category: 'Payments' },
	{ name: 'Adyen', category: 'Payments' },
	{ name: 'Square', category: 'Payments' },
	{ name: 'TaxJar', category: 'Tax & Compliance' },
	{ name: 'Avalara', category: 'Tax & Compliance' },
	{ name: 'ShipStation', category: 'Fulfillment' },
	{ name: 'ShipBob', category: 'Fulfillment' },
	{ name: 'NetSuite', category: 'ERP' },
	{ name: 'SAP', category: 'ERP' },
	{ name: 'Segment', category: 'Analytics' },
	{ name: 'Google Analytics', category: 'Analytics' },
	{ name: 'Klaviyo', category: 'Marketing' },
	{ name: 'Mailchimp', category: 'Marketing' },
	{ name: 'Chargify', category: 'Subscriptions' },
	{ name: 'Recurly', category: 'Subscriptions' },
	{ name: 'Algolia', category: 'Search' },
	{ name: 'Elasticsearch', category: 'Search' },
];

const RESULTS = [
	{
		label: 'Checkout Completion',
		before: '62%',
		after: '78%',
		improvement: '+16pp',
		context: 'Reduced form friction, mobile optimization, and trust signals.',
	},
	{
		label: 'Page Load Speed',
		before: '3.2s',
		after: '1.1s',
		improvement: '3x faster',
		context: 'ISR, edge caching, and image optimization impact.',
	},
	{
		label: 'Average Order Value',
		before: '$87',
		after: '$105',
		improvement: '+21%',
		context: 'Better product discovery, related items, and bundling.',
	},
];

const CASE_STUDIES = [
	{
		client: 'Westward Goods',
		industry: 'Retail',
		problem: 'Peak-season traffic brought the monolithic store down and created order sync issues.',
		solution: 'Rebuilt the storefront with ISR, edge caching, and resilient order webhooks tied into ERP.',
		outcome: '0 downtime events during holiday rush and +21% checkout rate.',
		icon: <ShoppingBag className='size-5' />,
		metrics: [
			{ label: 'Checkout rate', value: '+21%' },
			{ label: 'Peak downtime', value: '0 min' },
		],
	},
	{
		client: 'Boreal Outdoor',
		industry: 'DTC',
		problem: 'Hard to merchandise bundles and accessories with their existing platform.',
		solution: 'Introduced dynamic bundle builder, structured product metadata, and guided selling UX.',
		outcome: 'Average order value increased 18% while support tickets dropped by half.',
		icon: <CreditCard className='size-5' />,
		metrics: [
			{ label: 'AOV lift', value: '+18%' },
			{ label: 'Tickets', value: '-50%' },
		],
	},
	{
		client: 'Harbor Supply',
		industry: 'B2B ecommerce',
		problem: 'Needed customer-specific pricing, punchout integrations, and account workflows.',
		solution:
			'Deployed a headless commerce stack with contract pricing, account approvals, and procurement integrations.',
		outcome: 'Digital revenue surpassed in-person orders within six months.',
		icon: <Truck className='size-5' />,
		metrics: [
			{ label: 'Digital revenue', value: '>50%' },
			{ label: 'Implementation', value: '6 mo' },
		],
	},
];

const PROCESS_STEPS = [
	{
		title: 'Commerce Blueprint',
		description: 'Forecast SKU counts, fulfillment flows, and integration requirements before design.',
	},
	{
		title: 'Experience Design',
		description: 'Define product templates, merchandising rules, and conversion guardrails for every journey.',
	},
	{
		title: 'Build & Integrate',
		description: 'Implement storefront, headless services, payment, tax, and fulfillment systems with automated QA.',
	},
	{
		title: 'Optimize & Scale',
		description: 'Monitor funnel metrics, iterate on CRO experiments, and support seasonal traffic patterns.',
	},
];

const ECOM_TIMELINE: TimelineEntry[] = [
	{
		title: '01 · Commerce blueprint',
		content: (
			<>
				<p>SKU strategy, fulfillment partners, and platform selection documented.</p>
				<ul className='mt-3 space-y-1'>
					<li>• Channel + promo calendar review</li>
					<li>• Payments, tax, fraud stack decisions</li>
					<li>• Data sync cadence (ERP, OMS, CRM)</li>
				</ul>
			</>
		),
	},
	{
		title: '02 · Experience modeling',
		content: (
			<>
				<p>Design PDP/PLP, bundles, checkout, and account flows with conversion heuristics.</p>
				<ul className='mt-3 space-y-1'>
					<li>• Merchandising rules + personalization hooks</li>
					<li>• Accessibility + performance budgets</li>
					<li>• Content ops for launches & promos</li>
				</ul>
			</>
		),
	},
	{
		title: '03 · Build & integrate',
		content: (
			<>
				<p>Implement storefront, headless services, and middleware with automated QA and load testing.</p>
				<ul className='mt-3 space-y-1'>
					<li>• Payments/tax/shipping integrations</li>
					<li>• Inventory + ERP sync monitoring</li>
					<li>• Event instrumentation + dashboards</li>
				</ul>
			</>
		),
	},
	{
		title: '04 · Optimize & scale',
		content: (
			<>
				<p>Launch with safeguards, then iterate via CRO and seasonal readiness checklists.</p>
				<ul className='mt-3 space-y-1'>
					<li>• Experiment backlog tied to KPIs</li>
					<li>• Load/chaos tests before peaks</li>
					<li>• Ongoing ops reviews with revenue + ops leads</li>
				</ul>
			</>
		),
	},
];

const PRICING_PLANS = [
	{
		name: 'Growth Storefront',
		description: 'For scaling DTC brands ready for a custom experience layer.',
		priceLabel: 'From $55k',
		features: [
			'Custom storefront with headless CMS',
			'Optimized PDP + PLP templates',
			'Payment + tax integration',
			'Analytics + CRO setup',
		],
	},
	{
		name: 'B2B Commerce',
		description: 'Complex catalogs, contract pricing, or procurement workflows.',
		priceLabel: 'From $80k',
		features: ['Account hierarchies', 'Punchout or EDI integration', 'Approval workflows', 'Inventory + ERP syncing'],
		isRecommended: true,
		badge: 'Most selected',
	},
	{
		name: 'Replatform & Scale',
		description: 'Full migration or multi-store program.',
		priceLabel: 'Custom',
		features: [
			'Platform selection support',
			'Data + SEO migration',
			'Load + resilience testing',
			'Runbook + team training',
		],
	},
];

const FAQ_ITEMS = [
	{
		question: "We're worried about losing sales during a platform migration.",
		answer:
			'We protect conversion rates through parallel testing, redirect mapping, and real-time monitoring. We preserve all structured data (product schemas, reviews, pricing) and run side-by-side analytics to catch any dips immediately.',
		bulletPoints: [
			'Pre-launch SEO audit and redirect plan',
			'Structured data migration without data loss',
			'Parallel monitoring for 30 days post-launch',
		],
	},
	{
		question: 'What happens with payment security and PCI compliance?',
		answer:
			'Payment processing is never stored on your servers. We use tokenization and handle everything through PCI-compliant payment gateways. Your infrastructure stays clean and auditable.',
		bulletPoints: [
			'Tokenized payment handling via Stripe, Adyen, or Square',
			'PCI DSS compliance verified pre-launch',
			'Encrypted form transmission and HTTPS everywhere',
		],
	},
	{
		question: 'How do you handle traffic spikes during peak seasons?',
		answer:
			'Built-in auto-scaling, edge caching, and load testing before peak dates. We run chaos tests before Black Friday or your busy season so we know exactly how the system behaves under stress.',
		bulletPoints: [
			'Edge caching for product pages and assets',
			'Load tests at 3x expected peak traffic',
			'Database connection pooling and optimization',
		],
	},
	{
		question: 'Do you handle platform selection?',
		answer:
			'Yes. We assess catalog complexity, internal capabilities, and integration needs to recommend the right platform before we commit to build.',
	},
	{
		question: 'Can you support CRO after launch?',
		answer:
			'We provide optimization retainers that include test planning, implementation, and reporting tied to revenue metrics.',
	},
	{
		question: 'Do you charge for the store audit?',
		answer: 'No. The audit and recommendation brief are complimentary, so you can decide next steps without risk.',
	},
];

export default function EcommerceWebDevPage() {
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Service',
						serviceType: 'Ecommerce Website Development',
						provider: {
							'@type': 'Organization',
							name: 'PayPerCall',
							url: 'https://paypercall.com',
						},
						description:
							'Conversion-ready ecommerce builds: storefront performance, payments, tax, fulfillment, and ERP/CRM integrations with measurable revenue outcomes.',
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
								price: '55000',
								description: 'Starting from $55k for Growth Storefront builds',
							},
						},
					}),
				}}
			/>
			<main className='space-y-0'>
				<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
				<ClientSuccessBreakdown
					className='py-12 md:py-16 max-w-7xl mx-auto'
					title='Ecommerce results that drive revenue'
					subtitle='We measure success in sales, not just metrics.'
					outcomes={SUCCESS_OUTCOMES}
				/>
				<ProcessSteps
					className='py-12 md:py-16 max-w-7xl mx-auto'
					steps={PROCESS_STEPS}
					title='How we deliver ecommerce projects'
					variant='cards'
				/>
				<Timeline
					className='py-12 md:py-16 max-w-7xl mx-auto'
					title='Commerce program timeline'
					description='Each commerce build follows four checkpoints so ops, marketing, and engineering stay aligned.'
					data={ECOM_TIMELINE}
				/>
				<IntegrationLogos
					className='py-12 md:py-16 max-w-7xl mx-auto'
					title='Integrated payment & fulfillment stack'
					description='We work with every major commerce platform and payment gateway.'
					integrations={ECOMMERCE_INTEGRATIONS}
					variant='grid'
					ctaHref='/contact'
					ctaLabel='Discuss integrations'
				/>
				<ResultsGallery
					className='py-12 md:py-16 max-w-7xl mx-auto'
					title='Ecommerce performance gains'
					subtitle='Real improvements from migration and optimization projects.'
					results={RESULTS}
				/>
				<CaseStudyStrip
					className='py-12 md:py-16 max-w-7xl mx-auto'
					items={CASE_STUDIES}
					title='Commerce case studies anchored in revenue'
				/>
				<div id='pricing' className='scroll-mt-24'>
					<PricingTable
						className='py-12 md:py-16 max-w-7xl mx-auto'
						title='Ecommerce engagement tiers'
						description='Each tier includes launch readiness, QA, and hypercare—and starts with a free store audit.'
						plans={PRICING_PLANS}
						billingNote='Payment schedules are milestone-based with clear deliverable checkpoints.'
					/>
				</div>
				<FAQSection className='py-12 md:py-16 max-w-7xl mx-auto' items={FAQ_ITEMS} />
				<div id='consultation' className='scroll-mt-24 py-12 md:py-16 max-w-7xl mx-auto'>
					<ConsultationCTA
						className='max-w-7xl mx-auto'
						title='Request an ecommerce performance review'
						bullets={[
							'Share funnel data, speed metrics, and ops gaps.',
							'Receive prioritized recommendations with ranges.',
							'Choose replatform vs. optimization with clarity.',
						]}
						formVariant='detailed'
					/>
				</div>
			</main>
		</>
	);
}
