import {
	CaseStudyStrip,
	FAQSection,
	FreeConsultationSection,
	PricingTable,
	ProcessSteps,
	ServiceHero,
	TrustStrip,
} from '@/components/services';
import { Timeline, type TimelineEntry } from '@workspace/ui/components/ui/timeline';
import heroImageCommerce from '@/public/images/slider/slider-1.jpg';
import { ShoppingBag, Truck, CreditCard } from 'lucide-react';

export const revalidate = 3600;

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

const TRUST_CONTENT = {
	logos: [
		{ name: 'Westward Goods' },
		{ name: 'Boreal Outdoor' },
		{ name: 'Harbor Supply' },
	],
	metrics: [
		{ label: 'GMV supported in 2025', value: '$220M+' },
		{ label: 'Average checkout completion rate', value: '78%' },
		{ label: 'Page load under 2s across catalog size', value: '95%', helperText: 'Based on CrUX data' },
		{ label: 'Supported platforms', value: 'Headless, Shopify, Commerce tools' },
	],
};

const PROCESS_STEPS = [
	{ title: 'Commerce Blueprint', description: 'Forecast SKU counts, fulfillment flows, and integration requirements before design.' },
	{ title: 'Experience Design', description: 'Define product templates, merchandising rules, and conversion guardrails for every journey.' },
	{ title: 'Build & Integrate', description: 'Implement storefront, headless services, payment, tax, and fulfillment systems with automated QA.' },
	{ title: 'Optimize & Scale', description: 'Monitor funnel metrics, iterate on CRO experiments, and support seasonal traffic patterns.' },
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
		solution: 'Deployed a headless commerce stack with contract pricing, account approvals, and procurement integrations.',
		outcome: 'Digital revenue surpassed in-person orders within six months.',
		icon: <Truck className='size-5' />,
		metrics: [
			{ label: 'Digital revenue', value: '>50%' },
			{ label: 'Implementation', value: '6 mo' },
		],
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
		features: ['Custom storefront with headless CMS', 'Optimized PDP + PLP templates', 'Payment + tax integration', 'Analytics + CRO setup'],
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
		features: ['Platform selection support', 'Data + SEO migration', 'Load + resilience testing', 'Runbook + team training'],
	},
];

const FAQ_ITEMS = [
	{
		question: 'Do you handle platform selection?',
		answer:
			'Yes. We assess catalog complexity, internal capabilities, and integration needs to recommend the right platform before we commit to build.',
	},
	{
		question: 'How do you protect conversion rates during a migration?',
		answer:
			'We map redirects, preserve structured data, replicate tracking, and run parallel monitoring to ensure conversions do not dip post-launch.',
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
		<main className='space-y-12'>
			<ServiceHero {...HERO_CONTENT} />
			<TrustStrip {...TRUST_CONTENT} />
			<ProcessSteps steps={PROCESS_STEPS} title='Ecommerce engagement model' />
			<Timeline
				title='Commerce program timeline'
				description='Each commerce build follows four checkpoints so ops, marketing, and engineering stay aligned.'
				data={ECOM_TIMELINE}
			/>
			<CaseStudyStrip items={CASE_STUDIES} title='Commerce case studies anchored in revenue' />
			<PricingTable
				title='Ecommerce engagement tiers'
				description='Each tier includes launch readiness, QA, and hypercare—and starts with a free store audit.'
				plans={PRICING_PLANS}
				billingNote='Payment schedules are milestone-based with clear deliverable checkpoints.'
			/>
			<FAQSection items={FAQ_ITEMS} />
			<FreeConsultationSection
				title='Request an ecommerce performance review'
				bullets={[
					'Share funnel data, speed metrics, and ops gaps.',
					'Receive prioritized recommendations with ranges.',
					'Choose replatform vs. optimization with clarity.',
				]}
				formVariant='detailed'
				className='scroll-mt-24'
			/>
		</main>
	);
}

