import { caseStudies } from './case-studies';

// JSON-LD Schema
export const jsonLd = {
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

export const SECTION_PADDING = 'py-20 md:py-24';

export const VALUE_CARDS = [
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

export const TRANSFORMATION_PAIRS = [
	{ before: 'In-house coverage gaps', after: '24/7/365 support coverage', featured: true },
	{ before: 'Long onboarding cycles', after: 'Launch in 2-3 weeks' },
	{ before: 'Missed high-intent calls', after: 'Overflow + after-hours capture' },
	{ before: 'Fixed staffing overhead', after: 'Elastic call center capacity' },
];

export const BEFORE_ITEMS = [
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

export const AFTER_ITEMS = [
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

export const TRANSFORMATION_STATS = [
	{ value: '850K+', label: 'Calls handled monthly', pastel: 'pastel-sky' as const },
	{ value: '96%', label: 'Client retention', pastel: 'pastel-mint' as const },
	{ value: '500+', label: 'Trained agents', pastel: 'pastel-lilac' as const },
];

export const HIRE_SERVICE_CARDS = [
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

export const CASE_STUDY_ITEMS = caseStudies.map((item, index) => ({
	title: item.company,
	description: `${item.industry}: ${item.problem} ${item.solution}`,
	accentColor: (['pastel-peach', 'pastel-lilac', 'pastel-mint'] as const)[index % 3],
}));
