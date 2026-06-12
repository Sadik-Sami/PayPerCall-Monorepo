import type { ComparisonRow } from '@workspace/ui/components/sections/comparison-table';
import type { FaqItem } from '@/types/services';
import type { Testimonial } from '@/components/sections/services/shared/TestimonialsSection';

export interface WhyUsPillar {
	title: string;
	description: string;
	outcome: string;
	icon: 'Phone' | 'Users' | 'TrendingUp' | 'Code2';
	accent: 'mint' | 'lilac' | 'sky' | 'peach';
	points: string[];
}

export interface ComplianceItem {
	label: string;
	description: string;
}

export const WHY_US_SERVICE_CHIPS = ['Pay Per Call', 'Pay Per Lead', 'Digital Marketing', 'Web & App Development'];

export const WHY_US_PILLARS: WhyUsPillar[] = [
	{
		title: 'High-intent acquisition',
		description: 'Programs are built to capture buyer intent across calls, leads, paid channels, and organic demand without fragmenting reporting.',
		outcome: 'Designed for qualified volume, not disconnected traffic spikes.',
		icon: 'Phone',
		accent: 'mint',
		points: ['Call and lead programs aligned to qualification rules', 'Pacing based on conversion signals', 'Channel mix optimized around revenue quality'],
	},
	{
		title: 'Operational delivery',
		description: 'Managed call workflows and lead operations keep response speed, QA, and handoff quality consistent after launch.',
		outcome: 'Better follow-through when inbound demand reaches your team.',
		icon: 'Users',
		accent: 'sky',
		points: ['24/7/365 support options', 'Routing, scripting, and QA controls', 'Real-time delivery coordination'],
	},
	{
		title: 'Optimization discipline',
		description: 'Weekly review loops connect media, conversion, and delivery data so the program improves instead of drifting.',
		outcome: 'Faster decisions with fewer blind spots across teams.',
		icon: 'TrendingUp',
		accent: 'lilac',
		points: ['Unified reporting views', 'Dedicated account strategy support', 'Change recommendations tied to outcome metrics'],
	},
	{
		title: 'Build capability',
		description: 'Engineering and CRO support close the gap between campaign strategy and the systems needed to capture and attribute demand.',
		outcome: 'Fewer handoff gaps between marketing, ops, and product.',
		icon: 'Code2',
		accent: 'peach',
		points: ['Landing page and funnel updates', 'CRM, webhook, and dashboard integrations', 'Web and app builds aligned to conversion'],
	},
];

export const WHY_US_COMPARISON_ROWS: ComparisonRow[] = [
	{ feature: 'Unified reporting across channels', us: true, others: 'Usually split by vendor' },
	{ feature: 'Pay Per Call + Pay Per Lead under one team', us: true, others: false },
	{ feature: 'Digital marketing and CRO support', us: true, others: 'Often outsourced separately' },
	{ feature: 'Development support for integrations and funnels', us: true, others: 'Rare or referral-only' },
	{ feature: 'Flexible pricing models', us: 'Performance + scoped delivery', others: 'Fixed retainers or narrow models' },
	{ feature: 'Compliance-aware operations', us: true, others: 'Varies by partner' },
	{ feature: 'Dedicated account strategy contact', us: true, others: 'Shared queue support' },
	{ feature: 'Real-time delivery and workflow visibility', us: true, others: 'Delayed exports or weekly summaries' },
	{ feature: 'No long-term lock-in language', us: 'Pilot-friendly planning', others: 'Longer-term commitments common' },
	{ feature: 'Cross-functional optimization loop', us: 'Media + ops + engineering', others: 'Single-channel optimization only' },
];

export const WHY_US_PROCESS_STEPS = [
	{
		step: 1,
		title: 'Discover',
		description: 'Clarify goals, qualification rules, capacity limits, and the revenue signals that matter most.',
	},
	{
		step: 2,
		title: 'Build the pipeline',
		description: 'Set up channels, routing, scripts, integrations, and reporting around the agreed operating model.',
	},
	{
		step: 3,
		title: 'Launch and optimize',
		description: 'Go live with monitoring in place, then tighten targeting, handoffs, and delivery quality quickly.',
	},
	{
		step: 4,
		title: 'Scale with transparency',
		description: 'Expand volume, channels, or delivery support while keeping visibility clear for your internal team.',
	},
];

export const WHY_US_COMPLIANCE_ITEMS: ComplianceItem[] = [
	{
		label: 'TCPA',
		description: 'Call and lead workflows are built with consent and handling rules in mind for regulated outreach.',
	},
	{
		label: 'HIPAA',
		description: 'Healthcare-related programs can be structured around secure intake, access control, and documented handling expectations.',
	},
	{
		label: 'SOC 2',
		description: 'Process discipline and system design align with stronger security and accountability expectations.',
	},
	{
		label: 'PCI',
		description: 'Payment-adjacent flows are planned to reduce risk and keep sensitive handling paths clear.',
	},
	{
		label: 'GDPR',
		description: 'Privacy-aware data handling is part of the broader reporting and delivery model.',
	},
];

export const WHY_US_TESTIMONIALS: Testimonial[] = [
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
			'Their team connects acquisition strategy to what happens after the lead arrives. That sounds basic, but most vendors stop at delivery and leave the rest to you.',
		author: 'Grace Wilson',
		role: 'Director of Sales',
		company: 'BridgePoint Solutions',
		highlight: 'End-to-end accountability',
		rating: 5,
	},
];

export const WHY_US_FAQS: FaqItem[] = [
	{
		question: 'What makes Core Closer different from a typical channel-specific vendor?',
		answer:
			'Most vendors only manage one part of the funnel. Core Closer combines acquisition strategy, delivery operations, reporting, and build support so channel decisions and operational realities stay connected.',
	},
	{
		question: 'Can you support both call-driven and lead-driven programs at the same time?',
		answer:
			'Yes. The operating model is designed for teams that need different intake paths by offer, vertical, geography, or buyer intent. We can coordinate calls, form leads, and supporting marketing channels under one plan.',
	},
	{
		question: 'How do you handle compliance-sensitive campaigns?',
		answer:
			'Compliance is handled as an operating requirement, not an afterthought. Scripts, routing logic, delivery rules, access patterns, and reporting expectations are reviewed against the needs of each program.',
	},
	{
		question: 'Do you also handle the web or technical changes required to improve conversion?',
		answer:
			'Yes. The platform includes development and integration support for landing pages, tracking, routing, CRM workflows, dashboards, and related conversion infrastructure.',
	},
	{
		question: 'What does working together usually start with?',
		answer:
			'Most engagements start with a strategy conversation covering goals, current bottlenecks, qualification rules, reporting gaps, and internal team capacity. From there we recommend a practical launch or improvement path.',
	},
];

export const whyUsJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'CoreCloser',
	url: 'https://paypercall.com',
	description:
		'CoreCloser is a performance-focused partner for pay per call, pay per lead, digital marketing, development, and managed call operations.',
	sameAs: [
		'https://www.linkedin.com',
		'https://www.facebook.com',
		'https://www.instagram.com',
	],
};
