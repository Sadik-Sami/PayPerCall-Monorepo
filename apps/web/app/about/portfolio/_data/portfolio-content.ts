import type { StatItem } from '@workspace/ui/components/sections/stats-grid';
import type { ServiceItem } from '@workspace/ui/components/sections/service-cards';
import type { FaqItem } from '@/types/services';
import type { Testimonial } from '@/components/sections/services/shared/TestimonialsSection';

export interface PhilosophyCard {
	title: string;
	description: string;
	icon: 'Target' | 'BarChart3' | 'ShieldCheck';
	accent: 'mint' | 'lilac' | 'sky' | 'peach';
}

export interface OutcomeCard {
	title: string;
	description: string;
}

export const PORTFOLIO_TRUST_PILLS = ['Pay Per Call + Pay Per Lead', 'US + Philippines operations', 'ISO 27001 · SOC 2 · GDPR', '200+ client teams supported'];

export const PORTFOLIO_SERVICE_CHIPS = ['Acquisition', 'Call Operations', 'Lead Operations', 'Engineering', 'Compliance', 'Client Success'];

export const PORTFOLIO_PROOF_STATS: StatItem[] = [
	{ label: 'Client teams supported', value: 200, suffix: '+', description: 'Organizations with active programs' },
	{ label: 'Inbound calls routed', value: 800000, suffix: 'K+', description: 'Monthly call volume' },
	{ label: 'Industries served', value: 20, suffix: '+', description: 'Vertical coverage' },
	{ label: 'Leads delivered', value: 10000000, suffix: 'M+', description: 'Qualified volume' },
];

export const PORTFOLIO_PHILOSOPHY_CARDS: PhilosophyCard[] = [
	{
		title: 'Acquisition connected to delivery',
		description: 'Media, call, and lead programs are planned around the operational reality of what happens after the conversion.',
		icon: 'Target',
		accent: 'mint',
	},
	{
		title: 'Reporting connected to decisions',
		description: 'Performance data is structured so marketing, sales, operations, and leadership can act from the same view.',
		icon: 'BarChart3',
		accent: 'sky',
	},
	{
		title: 'Compliance connected to execution',
		description: 'Handling rules, routing logic, access expectations, and documentation are treated as part of the workflow, not an afterthought.',
		icon: 'ShieldCheck',
		accent: 'lilac',
	},
];

export const PORTFOLIO_CAPABILITIES: ServiceItem[] = [
	{
		title: 'Pay Per Call Programs',
		description: 'High-intent call programs designed for qualified volume and reliable handoff quality.',
		features: ['Inbound call strategy', 'Routing and scripting', 'QA and performance monitoring'],
	},
	{
		title: 'Pay Per Lead Delivery',
		description: 'Real-time lead operations with field-level validation and CRM coordination.',
		features: ['Real-time delivery logic', 'Field-level validation', 'CRM and webhook coordination'],
	},
	{
		title: 'Digital Marketing',
		description: 'Paid media, SEO, and landing page optimization aligned to qualified outcomes.',
		features: ['Paid media and SEO alignment', 'Landing page optimization', 'Channel mix planning'],
	},
	{
		title: 'Web and App Development',
		description: 'Conversion-focused builds with tracking, attribution, and internal tooling.',
		features: ['Conversion-focused builds', 'Tracking and attribution', 'Internal tools and integrations'],
	},
	{
		title: 'Managed Operations',
		description: '24/7/365 coverage planning with agent coaching and delivery coordination.',
		features: ['24/7/365 coverage planning', 'Agent coaching and scorecards', 'Delivery coordination'],
	},
	{
		title: 'Reporting and Optimization',
		description: 'Unified reporting views with weekly review loops and actionable recommendations.',
		features: ['Unified reporting views', 'Weekly review loops', 'Change recommendations tied to outcomes'],
	},
];

export const PORTFOLIO_OUTCOME_CARDS: OutcomeCard[] = [
	{
		title: 'Better qualified volume',
		description: 'Acquisition and delivery rules stay aligned so growth is measured by lead and call quality, not raw traffic.',
	},
	{
		title: 'Clearer operating visibility',
		description: 'Marketing, sales, and operations can review the same signals instead of reconciling separate vendor reports.',
	},
	{
		title: 'Faster execution loops',
		description: 'Strategy, technical changes, and delivery adjustments can move together without long handoff delays.',
	},
];

export const PORTFOLIO_FAQS: FaqItem[] = [
	{
		question: 'What makes Core Closer different from a typical agency or vendor?',
		answer: 'Most vendors only manage one part of the funnel. Core Closer combines acquisition strategy, delivery operations, reporting, and build support so channel decisions and operational realities stay connected.',
	},
	{
		question: 'Can you support both call-driven and lead-driven programs?',
		answer: 'Yes. The operating model is designed for teams that need different intake paths by offer, vertical, geography, or buyer intent. We can coordinate calls, form leads, and supporting marketing channels under one plan.',
	},
	{
		question: 'Do you handle the technical work required for tracking, routing, and conversion?',
		answer: 'Yes. The platform includes development and integration support for landing pages, tracking, routing, CRM workflows, dashboards, and related conversion infrastructure.',
	},
	{
		question: 'How do you support compliance-sensitive campaigns?',
		answer: 'Compliance is handled as an operating requirement, not an afterthought. Scripts, routing logic, delivery rules, access patterns, and reporting expectations are reviewed against the needs of each program.',
	},
	{
		question: 'What does a first engagement usually look like?',
		answer: 'Most engagements start with a strategy conversation covering goals, current bottlenecks, qualification rules, reporting gaps, and internal team capacity. From there we recommend a practical launch or improvement path.',
	},
];

export const PORTFOLIO_TESTIMONIALS: Testimonial[] = [
	{
		quote:
			'We needed one partner that could tighten call quality, improve lead routing, and fix our landing-page conversion issues. Core Closer gave us one operating rhythm instead of three vendor threads.',
		author: 'Daniel Reyes',
		role: 'Founder',
		company: 'BlueHaven Digital Studio',
		highlight: 'One operating rhythm',
		rating: 5,
	},
	{
		quote:
			'The reporting is clear enough for marketing and operations to use in the same meeting. That changed how quickly we could make budget and staffing decisions.',
		author: 'Noah Kim',
		role: 'Performance Marketer',
		company: 'Evergreen Demand Lab',
		highlight: 'Shared reporting clarity',
		rating: 5,
	},
	{
		quote:
			"Their team connects acquisition strategy to what happens after the lead arrives. That sounds basic, but most vendors stop at delivery and leave the rest to you.",
		author: 'Grace Wilson',
		role: 'Director of Sales',
		company: 'BridgePoint Solutions',
		highlight: 'End-to-end accountability',
		rating: 5,
	},
];

export const portfolioJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'CoreCloser',
	url: 'https://paypercall.com',
	description:
		'CoreCloser connects acquisition strategy, pay-per-call and pay-per-lead operations, digital marketing, engineering, reporting, and compliance into one accountable operating model.',
};