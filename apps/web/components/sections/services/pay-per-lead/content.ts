import type { ValuePropositionCard, ValueTransformationPair } from '../shared/ValuePropositionSection';
import type {
	TransformationBeforeItem,
	TransformationAfterItem,
	TransformationStat,
} from '../shared/TransformationComparisonSection';
import type { BlueprintStep } from '../shared/StrategicBlueprintSection';
import type { CaseStudyCardItem, FaqItem } from '@/types/services';

export const VALUE_CARDS: ValuePropositionCard[] = [
	{
		title: 'Verified Intent',
		description:
			'Every lead is validated through multi-step qualification—contact info, purchase intent, and custom criteria—so your team receives only sales-ready prospects.',
		icon: 'UserCheck',
		theme: 'emerald',
	},
	{
		title: 'Duplicate Suppression',
		description:
			'Advanced deduplication ensures you never pay twice for the same prospect. Our systems scrub against your CRM and our network before delivery.',
		icon: 'Filter',
		theme: 'purple',
	},
	{
		title: 'Compliant by Design',
		description:
			'Full legal compliance with documented consent, litigator scrubbing, and state-specific rules. Every lead meets TCPA and applicable regulations.',
		icon: 'FileCheck',
		theme: 'amber',
	},
	{
		title: 'Real-Time Delivery',
		description:
			'Leads reach your CRM or sales team in seconds via API, webhook, or postback. No batch delays—close while intent is hot.',
		icon: 'Zap',
		theme: 'blue',
	},
];

export const TRANSFORMATION_PAIRS: ValueTransformationPair[] = [
	{ before: 'Chasing cold form fills', after: 'Sales-Ready Leads', featured: true },
	{ before: 'Hours to first contact', after: 'Seconds to CRM', featured: false },
	{ before: 'Duplicate waste', after: 'Exclusive ownership', featured: false },
	{ before: 'Guessing ROI', after: 'Proven economics', featured: false },
];

export const BEFORE_ITEMS: TransformationBeforeItem[] = [
	{
		title: 'Cold, Slow Leads',
		description:
			'Buying generic form fills that take hours to reach your team. By the time you follow up, the prospect has moved on or gone with a competitor.',
		icon: 'Inbox',
	},
	{
		title: 'Duplicate Burn',
		description:
			'Paying for the same lead across multiple sources. Your SDRs waste time on recycled contacts that have already been contacted or converted.',
		icon: 'Users',
	},
	{
		title: 'No Visibility',
		description:
			"Guessing at lead quality with no real-time tracking. Revenue stalls when you can't predict volume or optimize based on what actually converts.",
		icon: 'Clock',
	},
];

export const AFTER_ITEMS: TransformationAfterItem[] = [
	{
		title: 'Instant Delivery',
		description:
			'Leads hit your CRM in seconds via API or webhook. Your team follows up while intent is high—no more playing catch-up with stale submissions.',
		icon: 'Zap',
		pastel: 'pastel-mint',
	},
	{
		title: 'Exclusive Ownership',
		description:
			"Exclusive leads are yours alone—no sharing. Or choose shared leads for lower cost when exclusivity isn't required. You control the model.",
		icon: 'UserCheck',
		pastel: 'pastel-sky',
	},
	{
		title: 'Predictable Volume',
		description:
			'Scale lead flow on demand. Clear reporting on CPL, conversion, and source performance so you optimize toward outcomes, not vanity metrics.',
		icon: 'BarChart3',
		pastel: 'pastel-lilac',
	},
	{
		title: 'Quality-First',
		description:
			'Every lead passes qualification rules you define. Geographic, demographic, and intent filters ensure you pay only for prospects that match your offer.',
		icon: 'Filter',
		pastel: 'pastel-peach',
	},
];

export const STATS: TransformationStat[] = [
	{ value: '90+', label: 'Seconds to CRM', pastel: 'pastel-sky' },
	{ value: '2.8x', label: 'ROI Average', pastel: 'pastel-mint' },
	{ value: '0%', label: 'Duplicate Waste', pastel: 'pastel-lilac' },
];

export const BLUEPRINT_STEPS: BlueprintStep[] = [
	{
		title: 'Define Vertical',
		description:
			'Choose your niche—Insurance, Legal, Home Services, or more. We target the right audience and intent from day one.',
		icon: 'Target',
		bg: 'bg-pastel-lime',
		border: 'border-pastel-lime-border',
		iconCircle: 'bg-pastel-lime-strong text-primary-foreground',
		numberAccent: 'text-pastel-lime-strong/40',
	},
	{
		title: 'Specify Lead Criteria',
		description:
			'Define qualification rules, required fields, geo-targeting, and delivery preferences. We match leads to your exact specs.',
		icon: 'Filter',
		bg: 'bg-pastel-sky',
		border: 'border-pastel-sky-border',
		iconCircle: 'bg-pastel-sky-strong text-primary-foreground',
		numberAccent: 'text-pastel-sky-strong/40',
	},
	{
		title: 'Connect Delivery',
		description:
			'Integrate via API, webhook, or CRM postback. Leads flow directly into your systems in real time.',
		icon: 'Database',
		bg: 'bg-pastel-lilac',
		border: 'border-pastel-lilac-border',
		iconCircle: 'bg-pastel-lilac-strong text-primary-foreground',
		numberAccent: 'text-pastel-lilac-strong/40',
	},
	{
		title: 'Scale at Will',
		description:
			'Ramp volume up or down based on results. Predictable CPL and clear ROI let you grow with confidence.',
		icon: 'TrendingUp',
		bg: 'bg-value-soft-yellow',
		border: 'border-pastel-peach-border',
		iconCircle: 'bg-pastel-peach-strong text-primary-foreground',
		numberAccent: 'text-pastel-peach-strong/40',
	},
];

export const CASE_STUDIES: CaseStudyCardItem[] = [
	{
		title: 'Insurance Scale',
		description:
			'Exclusive lead program for a regional insurance agency that delivered 2,400 qualified homeowners leads in the first quarter, with a 22% quote-to-close rate.',
		accentColor: 'pastel-peach',
	},
	{
		title: 'Legal Intake',
		description:
			'Real-time lead delivery and custom qualification for a PI firm. Reduced intake time from hours to seconds and increased signed retainers by 35%.',
		accentColor: 'pastel-lilac',
	},
	{
		title: 'Solar Pipeline',
		description:
			'Shared and exclusive lead mix for a solar installer. Optimized CPL while maintaining conversion quality, cutting cost-per-acquisition by 40%.',
		accentColor: 'pastel-lime',
	},
];

export const FAQS: FaqItem[] = [
	{
		question: 'What is Pay Per Lead and how does it work?',
		answer:
			'Pay Per Lead is a performance-based model where you pay only for qualified lead submissions—contact forms, quote requests, or appointment bookings. We drive high-intent prospects to your offers via targeted channels, then deliver each lead to your CRM or sales team in real time. You pay for results, not impressions.',
	},
	{
		question: "What's the difference between exclusive and shared leads?",
		answer:
			'Exclusive leads are sold to you alone—no other buyer receives the same prospect. Shared leads are distributed to multiple buyers at a lower cost per lead. We help you choose based on your close rate, team capacity, and budget. Many clients start with a mix and optimize over time.',
	},
	{
		question: 'How fresh are the leads when they reach me?',
		answer:
			'Leads are delivered in real time—typically within seconds of submission—via API, webhook, or CRM integration. The faster you follow up, the higher your conversion. We also support speed-to-lead alerts so your team can prioritize hot prospects.',
	},
	{
		question: 'How do you prevent duplicate leads?',
		answer:
			'We use network-wide deduplication, CRM scrubbing, and configurable rules to ensure you never pay twice for the same prospect. You can define duplicate windows and match criteria. Invalid or duplicate leads are credited per our replacement policy.',
	},
	{
		question: 'What delivery options do you support?',
		answer:
			'We support API, webhook, CRM postbacks (Salesforce, HubSpot, etc.), and email/SMS. You choose the format and fields. Setup typically takes a few business days once we have your integration details and compliance approvals.',
	},
	{
		question: 'How does billing work?',
		answer:
			'You pay per qualified lead. Pricing is transparent with clear definitions of what counts as billable—typically based on validation rules and delivery confirmation. No hidden fees. We offer flexible terms so you can scale based on results.',
	},
];

export const CONSULTATION_FEATURES = [
	{
		title: 'Sales-Ready Leads',
		description:
			'Connect with prospects who have shown intent and match your qualification criteria.',
		icon: 'Zap',
	},
	{
		title: 'Predictable CPL',
		description:
			'Receive phased volume and CPL recommendations tailored to your budget and close rate.',
		icon: 'TrendingUp',
	},
	{
		title: 'Full Transparency',
		description:
			'See exact budget ranges, delivery methods, and expected ROI before you commit.',
		icon: 'Eye',
	},
];
