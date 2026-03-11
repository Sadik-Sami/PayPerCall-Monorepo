import type { CaseStudyCardItem, FaqItem } from '@/types/services';
import type {
	DigitalMarketingPillar,
	DigitalMarketingProofItem,
} from './DigitalMarketingPillarsSection';
import type { GrowthMatrixStep } from './DigitalMarketingGrowthMatrixSection';
import type { IntegratedSuccessBlueprintsData } from './IntegratedSuccessBlueprintsSection';

export const TRUST_INDICATORS = [
	{
		title: 'Bank-Grade Security',
		description:
			'Campaign infrastructure with strict governance, access controls, and enterprise-safe workflows.',
		icon: 'ShieldCheck',
		theme: 'peach',
	},
	{
		title: 'Real-Time Processing',
		description:
			'Live attribution, pacing, and bid feedback loops so budget shifts happen while intent is active.',
		icon: 'Zap',
		theme: 'sky',
	},
	{
		title: 'Actionable Insights',
		description:
			'Performance intelligence translated into clear next moves for creative, targeting, and conversion.',
		icon: 'BarChart3',
		theme: 'lilac',
	},
] as const;

export const PILLARS: DigitalMarketingPillar[] = [
	{
		id: 'pillar-authority',
		title: 'Authority',
		description:
			'Dominate high-intent search surfaces with technical SEO, topic clusters, and conversion-first landing architecture.',
		ctaLabel: 'SEO SPECIALIZATION',
		icon: 'Search',
		theme: 'mint',
	},
	{
		id: 'pillar-precision',
		title: 'Precision',
		description:
			'Build paid programs around measurable intent and profitability, not vanity traffic or inflated platform metrics.',
		ctaLabel: 'PAID ADVERTISING',
		icon: 'BarChart3',
		theme: 'sky',
	},
	{
		id: 'pillar-retention',
		title: 'Retention',
		description:
			'Create lifecycle journeys that recover abandoned demand, nurture segments, and increase repeat revenue.',
		ctaLabel: 'LIFECYCLE MARKETING',
		icon: 'Users',
		theme: 'lilac',
	},
	{
		id: 'pillar-signal',
		title: 'Signal',
		description:
			'Amplify brand resonance across social channels to raise branded demand and strengthen conversion lift.',
		ctaLabel: 'SOCIAL VELOCITY',
		icon: 'Megaphone',
		theme: 'peach',
	},
];

export const PILLAR_PROOF_ITEMS: DigitalMarketingProofItem[] = [
	{
		title: 'Certified Results',
		description: 'Performance goals tracked with transparent attribution and weekly operating reviews.',
		icon: 'ShieldCheck',
	},
	{
		title: 'AI-Augmented Ops',
		description: 'Creative testing and budget heuristics accelerated with AI-assisted decision loops.',
		icon: 'Sparkles',
	},
	{
		title: 'Dedicated Pod Model',
		description: 'Channel specialists aligned to your vertical, funnel stage, and growth targets.',
		icon: 'Users',
	},
];

export const GROWTH_SPRINT_STEPS: GrowthMatrixStep[] = [
	{
		step: '01',
		title: 'Audit & Baseline',
		description:
			'Benchmark acquisition channels, creative efficiency, and conversion bottlenecks across your funnel.',
		tagline: 'WEEK 1: DIAGNOSTICS',
		icon: 'Search',
		theme: 'sky',
	},
	{
		step: '02',
		title: 'Attribution Setup',
		description:
			'Unify source tracking and conversion mapping so every optimization decision is tied to revenue.',
		tagline: 'WEEK 2: INFRASTRUCTURE',
		icon: 'Settings2',
		theme: 'lilac',
	},
	{
		step: '03',
		title: 'Alpha Testing',
		description:
			'Launch controlled experiments across copy, audiences, and offers to identify scalable winners quickly.',
		tagline: 'WEEK 3-4: VALIDATION',
		icon: 'FlaskConical',
		theme: 'peach',
	},
	{
		step: '04',
		title: 'Full Deployment',
		description:
			'Double down on validated plays and expand channel coverage with confidence and predictable returns.',
		tagline: 'WEEK 5+: EXPANSION',
		icon: 'Rocket',
		theme: 'mint',
	},
];

export const CASE_STUDIES: CaseStudyCardItem[] = [
	{
		title: 'SaaS Demand Engine',
		description:
			'Restructured paid search + SEO clusters for a B2B SaaS team, producing a 48% increase in qualified pipeline within 90 days.',
		accentColor: 'pastel-sky',
	},
	{
		title: 'DTC Profit Lift',
		description:
			'Creative testing system and lifecycle flows for a DTC brand that cut blended CAC by 29% while increasing repeat purchase rate.',
		accentColor: 'pastel-lilac',
	},
	{
		title: 'Multi-Location Growth',
		description:
			'Local SEO + paid social playbook for a regional services company that delivered 3.1x ROAS and stable appointment volume.',
		accentColor: 'pastel-peach',
	},
];

export const INTEGRATED_SUCCESS_BLUEPRINTS: IntegratedSuccessBlueprintsData = {
	badgeLabel: 'Integrated Success Blueprints',
	title: 'Blueprints Built for Trust, Clarity, and Revenue Lift',
	description:
		'Each blueprint connects channel strategy, reporting standards, and optimization priorities so growth decisions stay aligned from campaign launch to closed revenue.',
	topCta: {
		label: 'Request a Blueprint Review',
		href: '#contact',
	},
	featured: {
		eyebrow: 'Featured Blueprint',
		title: 'Project: 3.4x Pipeline Velocity Upgrade',
		description:
			'Combined paid intent capture, SEO cluster architecture, and lifecycle reactivation to increase qualified opportunities while keeping spend discipline intact.',
		kpis: [
			{ label: 'Pipeline Lift', value: '+64%' },
			{ label: 'CAC Efficiency', value: '+31%' },
		],
		ctaLabel: 'View Full Breakdown',
		ctaHref: '#case-studies',
	},
	audit: {
		title: 'Growth Audit Snapshot',
		description:
			'Fast diagnostic of acquisition performance, conversion friction, and retention leaks with actionable next-step priorities.',
		ctaLabel: 'Download Blueprint Summary',
		ctaHref: '#contact',
	},
	retention: {
		eyebrow: 'Lifecycle Strength',
		title: 'Retention Ops',
		description:
			'Sequence-level optimizations for onboarding, winback, and nurture flows that improve revenue per lead over time.',
		progressLabel: '91% lifecycle milestones achieved',
		progressValue: 91,
	},
	roadmap: {
		eyebrow: 'Blueprint',
		title: 'Omnichannel Scale Plan',
		description:
			'Prioritized roadmap that unifies paid, organic, and conversion optimization into one weekly operating cadence.',
		scoreLabel: 'Strategy Score',
		scoreValue: '97/100',
		complexityLabel: 'Implementation',
		complexityValue: 'Guided',
		ctaLabel: 'Activate Plan',
		ctaHref: '#contact',
	},
	miniMetrics: [
		{
			label: 'Net Revenue Impact',
			value: '+28.5%',
			description: 'Modeled improvement after full blueprint rollout across high-intent segments.',
			bars: [42, 58, 66, 74, 86],
		},
		{
			label: 'Support Load Change',
			value: '-37%',
			description: 'Reduction in repetitive inquiries after messaging and onboarding alignment.',
		},
	],
	spotlight: {
		title: 'Ready for your next growth sprint?',
		description:
			'Get a practical blueprint tailored to your funnel stage, budget profile, and conversion targets—without a long commitment upfront.',
		ctaLabel: 'Get Started Today',
		ctaHref: '#contact',
	},
	footerLink: {
		label: 'Explore More Case Studies',
		href: '#case-studies',
	},
};

export const FAQS: FaqItem[] = [
	{
		question: 'What channels do you manage for digital marketing?',
		answer:
			'We run integrated programs across SEO, paid search, paid social, lifecycle/email automation, and CRO. The channel mix is built around your goals, margins, and sales cycle so every tactic contributes to measurable revenue growth.',
	},
	{
		question: 'How do you report performance and attribution?',
		answer:
			'We align campaign reporting to business outcomes: qualified leads, opportunity value, CAC, and revenue contribution. Dashboards combine platform, analytics, and CRM data so decisions are made on true performance, not isolated channel metrics.',
	},
	{
		question: 'How quickly should we expect results?',
		answer:
			'Paid channels typically show directional improvement in weeks, while SEO and lifecycle systems compound over 2–4 months. We define milestone checkpoints early so you can validate progress at each phase of the sprint.',
	},
	{
		question: 'Do you work with internal marketing teams?',
		answer:
			'Yes. We can operate as your embedded growth pod or collaborate with in-house teams for strategy, execution, and experimentation. Documentation and weekly operating cadences ensure handoffs stay clear and fast.',
	},
	{
		question: 'What budget range is needed to start?',
		answer:
			'Budgets vary by industry and growth target, but we usually start with a focused pilot that proves contribution before scaling. We provide channel-by-channel budget guidance, expected ranges, and testing priorities up front.',
	},
	{
		question: 'How do you manage creative and messaging tests?',
		answer:
			'We run structured test cycles for offers, ad copy, visual direction, and landing experience. Winning patterns are rolled into your system while underperforming variants are retired quickly to protect spend efficiency.',
	},
];

export const CONSULTATION_FEATURES = [
	{
		title: 'Revenue-Aligned Planning',
		description: 'Channel strategy built from your sales targets, margin profile, and operational capacity.',
		icon: 'TrendingUp',
	},
	{
		title: 'Rapid Experiment Cycles',
		description: 'Prioritized tests that move from insight to launch fast without compromising quality.',
		icon: 'Zap',
	},
	{
		title: 'Executive Transparency',
		description: 'Clear weekly reporting on spend efficiency, pipeline impact, and next optimization actions.',
		icon: 'Eye',
	},
];
