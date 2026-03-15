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

export const EMAIL_PILLARS: DigitalMarketingPillar[] = [
	{
		id: 'email-automation',
		title: 'Automation',
		description:
			'Build lifecycle flows for welcome, browse recovery, cart recovery, post-purchase, and winback so revenue is not dependent on one-off campaigns.',
		ctaLabel: 'FLOW ARCHITECTURE',
		icon: 'Sparkles',
		theme: 'mint',
	},
	{
		id: 'email-segmentation',
		title: 'Segmentation',
		description:
			'Group subscribers by intent, purchase behavior, and engagement signals to increase message relevance and protect sender reputation.',
		ctaLabel: 'AUDIENCE LOGIC',
		icon: 'Users',
		theme: 'sky',
	},
	{
		id: 'email-deliverability',
		title: 'Deliverability',
		description:
			'Strengthen list hygiene, frequency control, and domain trust so your best sequences consistently reach the inbox.',
		ctaLabel: 'INBOX HEALTH',
		icon: 'ShieldCheck',
		theme: 'lilac',
	},
	{
		id: 'email-retention',
		title: 'Retention',
		description:
			'Turn lifecycle messaging into repeat purchases, stronger customer value, and clearer revenue visibility across the funnel.',
		ctaLabel: 'REPEAT REVENUE',
		icon: 'BarChart3',
		theme: 'peach',
	},
];

export const EMAIL_PILLAR_PROOF_ITEMS: DigitalMarketingProofItem[] = [
	{
		title: 'Sequence Coverage',
		description: 'Priority flows mapped across first purchase, replenishment windows, and churn-risk moments.',
		icon: 'Sparkles',
	},
	{
		title: 'Subscriber Quality Control',
		description: 'List growth, engagement decay, and suppression logic monitored to keep lifecycle performance durable.',
		icon: 'ShieldCheck',
	},
	{
		title: 'Revenue Visibility',
		description: 'Performance reviews tied to assisted revenue, repeat-order rate, and reactivation contribution.',
		icon: 'BarChart3',
	},
];

export const PPC_PILLARS: DigitalMarketingPillar[] = [
	{
		id: 'ppc-intent',
		title: 'Intent',
		description:
			'Align keywords, audiences, and placements to high-value buying signals so spend is directed at real commercial demand.',
		ctaLabel: 'DEMAND CAPTURE',
		icon: 'Search',
		theme: 'mint',
	},
	{
		id: 'ppc-control',
		title: 'Control',
		description:
			'Structure campaigns, budgets, and conversion actions around margin and sales quality instead of platform defaults.',
		ctaLabel: 'BUDGET GUARDRAILS',
		icon: 'ShieldCheck',
		theme: 'sky',
	},
	{
		id: 'ppc-testing',
		title: 'Testing',
		description:
			'Run disciplined experiments across ads, landing pages, offers, and audiences so optimization compounds instead of drifting.',
		ctaLabel: 'EXPERIMENT CADENCE',
		icon: 'Sparkles',
		theme: 'lilac',
	},
	{
		id: 'ppc-efficiency',
		title: 'Efficiency',
		description:
			'Scale only the segments that improve conversion rate, CAC discipline, and pipeline quality with defensible economics.',
		ctaLabel: 'PROFITABLE SCALE',
		icon: 'BarChart3',
		theme: 'peach',
	},
];

export const PPC_PILLAR_PROOF_ITEMS: DigitalMarketingProofItem[] = [
	{
		title: 'Spend Protection',
		description: 'Search term control, pacing reviews, and conversion QA reduce leakage before more budget is deployed.',
		icon: 'ShieldCheck',
	},
	{
		title: 'Weekly Test Backlog',
		description: 'Creative, offer, and landing page experiments prioritized by expected impact and implementation speed.',
		icon: 'Sparkles',
	},
	{
		title: 'Pipeline Accountability',
		description: 'Optimization decisions tied to qualified leads, cost per opportunity, and downstream revenue performance.',
		icon: 'BarChart3',
	},
];

export const SEO_PILLARS: DigitalMarketingPillar[] = [
	{
		id: 'seo-technical',
		title: 'Technical Health',
		description:
			'Resolve crawl, indexation, site structure, and performance issues that suppress visibility before content scale begins.',
		ctaLabel: 'FOUNDATION FIRST',
		icon: 'ShieldCheck',
		theme: 'mint',
	},
	{
		id: 'seo-authority',
		title: 'Authority',
		description:
			'Build topic clusters and expert-led content assets that expand SERP ownership across your highest-intent themes.',
		ctaLabel: 'CLUSTER STRATEGY',
		icon: 'Search',
		theme: 'sky',
	},
	{
		id: 'seo-architecture',
		title: 'Architecture',
		description:
			'Improve internal linking, page hierarchy, and template structure so relevance and equity flow toward priority pages.',
		ctaLabel: 'SITE SIGNALS',
		icon: 'Sparkles',
		theme: 'lilac',
	},
	{
		id: 'seo-pipeline',
		title: 'Pipeline',
		description:
			'Translate organic visibility into qualified sessions, conversion lift, and measurable pipeline contribution over time.',
		ctaLabel: 'REVENUE IMPACT',
		icon: 'BarChart3',
		theme: 'peach',
	},
];

export const SEO_PILLAR_PROOF_ITEMS: DigitalMarketingProofItem[] = [
	{
		title: 'Technical Prioritization',
		description: 'High-impact crawl, speed, and indexation fixes sequenced before lower-value cleanup work.',
		icon: 'ShieldCheck',
	},
	{
		title: 'Intent Coverage',
		description: 'Content plans mapped to commercial, comparison, and problem-aware queries that move buyers forward.',
		icon: 'Search',
	},
	{
		title: 'Organic Revenue Tracking',
		description: 'Reporting connects rankings and traffic changes to conversion quality and pipeline creation.',
		icon: 'BarChart3',
	},
];

export const SOCIAL_PILLARS: DigitalMarketingPillar[] = [
	{
		id: 'social-signal',
		title: 'Brand Signal',
		description:
			'Shape a clear narrative across channels so audiences recognize your expertise quickly and trust builds through repetition.',
		ctaLabel: 'POSITIONING SYSTEM',
		icon: 'Megaphone',
		theme: 'mint',
	},
	{
		id: 'social-creative',
		title: 'Creative System',
		description:
			'Develop platform-native hooks, visual formats, and messaging angles that improve retention, reach quality, and action.',
		ctaLabel: 'FORMAT STRATEGY',
		icon: 'Sparkles',
		theme: 'sky',
	},
	{
		id: 'social-community',
		title: 'Engagement',
		description:
			'Turn comments, shares, and responses into feedback loops that sharpen offers and create stronger buying intent.',
		ctaLabel: 'AUDIENCE MOMENTUM',
		icon: 'Users',
		theme: 'lilac',
	},
	{
		id: 'social-demand',
		title: 'Demand Capture',
		description:
			'Connect organic and paid distribution to landing pages, lead magnets, and follow-up systems that convert attention into pipeline.',
		ctaLabel: 'PIPELINE LINKAGE',
		icon: 'BarChart3',
		theme: 'peach',
	},
];

export const SOCIAL_PILLAR_PROOF_ITEMS: DigitalMarketingProofItem[] = [
	{
		title: 'Channel Role Clarity',
		description: 'Each platform gets a defined job across awareness, consideration, response, and retargeting.',
		icon: 'Megaphone',
	},
	{
		title: 'Creative Iteration',
		description: 'Hooks, visuals, and offers are refined from live audience response instead of guesswork.',
		icon: 'Sparkles',
	},
	{
		title: 'Business Outcome Mapping',
		description: 'Social reporting connects engagement quality to lead capture, branded demand, and assisted pipeline.',
		icon: 'BarChart3',
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
