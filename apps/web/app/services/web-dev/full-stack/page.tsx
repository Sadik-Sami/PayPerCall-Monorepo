import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	PricingTable,
	ServiceHero,
	ClientSuccessBreakdown,
	TimelineSteps,
	IntegrationLogos,
	DeliverablesSection,
} from '@/components/services';
import heroImage2 from '@/public/images/slider/slider-2.jpg';
import { ShieldCheck, Factory, Activity } from 'lucide-react';
import TechMarquee from '@/components/services/Tech-Marquee';
export const revalidate = 3600;

const HERO_CONTENT = {
	pill: 'Web Development',
	eyebrow: 'Services',
	title: 'Web programs built for measurable impact',
	subtitle:
		'We ship React/Next.js experiences that stay fast, search-ready, and easy to operate. Start with a no-cost roadmap call.',
	features: ['SSG + ISR first', 'Analytics-ready', 'Accessible by default'],
	stat: { value: '30 minutes', label: 'Strategy session · free consultation' },
	primaryCta: { label: 'Book a Free Consultation', href: '/contact' },
	secondaryCta: { label: 'View Recent Work', href: '/portfolio' },
	footnote: 'No retainers or prep fees—just bring your goals and constraints.',
	media: {
		src: heroImage2,
		alt: 'Web development visualization',
		caption: 'Our roadmap sessions end with a written action plan.',
	},
};
const SUCCESS_OUTCOMES = [
	{
		icon: 'clock' as const,
		metric: '6 weeks',
		label: 'Mean time to MVP launch',
		description: 'From technical blueprint to shipping on production infrastructure',
		context: 'Includes discovery, architecture, and initial stabilization.',
	},
	{
		icon: 'database' as const,
		metric: '4+',
		label: 'Systems integrated per project',
		description: 'CRMs, ERPs, payment processors, authentication—all working together',
		context: 'We handle data sync, webhooks, and error recovery automatically.',
	},
	{
		icon: 'gitBranch' as const,
		metric: '100%',
		label: 'Type safety coverage',
		description: 'End-to-end TypeScript from database schema to UI components',
		context: 'Catches errors during development, not in production.',
	},
];

const INTEGRATIONS = [
	{ name: 'Stripe', category: 'Payments' },
	{ name: 'Twilio', category: 'Communications' },
	{ name: 'SendGrid', category: 'Communications' },
	{ name: 'Auth0', category: 'Authentication' },
	{ name: 'HubSpot', category: 'CRM' },
	{ name: 'Salesforce', category: 'CRM' },
	{ name: 'Shopify', category: 'Ecommerce' },
	{ name: 'Datadog', category: 'Observability' },
	{ name: 'Segment', category: 'Analytics' },
	{ name: 'Sentry', category: 'Observability' },
	{ name: 'Vercel', category: 'Hosting' },
	{ name: 'AWS', category: 'Cloud' },
];

const DELIVERABLE_STANDARDS = [
	'Typed API contracts with boundary validation.',
	'Security reviews aligned to SOC 2, HIPAA, or GDPR requirements.',
	'Monitoring, alerting, and runbooks prior to launch.',
	'Performance budgets tracked against Core Web Vitals.',
];

const DELIVERABLES = [
	{
		title: 'Architecture package',
		description: 'Context diagrams, integration inventory, and data ownership for every system.',
		bulletPoints: ['Service boundaries', 'Dependency mapping', 'API contract review'],
	},
	{
		title: 'Data + integration plan',
		description: 'Sync strategy for third-party systems with clear failure handling.',
		bulletPoints: ['Webhooks and retries', 'Idempotency rules', 'Backfill playbooks'],
	},
	{
		title: 'Security baseline',
		description: 'Identity, access controls, and secure data handling documented and implemented.',
		bulletPoints: ['Role-based access', 'Secrets management', 'Audit logging'],
	},
	{
		title: 'Observability setup',
		description: 'Logging, metrics, and alerting configured for core user journeys.',
		bulletPoints: ['Error tracking', 'SLO/SLA dashboards', 'Incident escalation'],
	},
	{
		title: 'Performance guardrails',
		description: 'Budgets and regression checks to keep UX fast after launch.',
		bulletPoints: ['CWV targets', 'Automated checks', 'Performance monitoring'],
	},
	{
		title: 'Handoff readiness',
		description: 'Operational docs and enablement so teams can run the platform.',
		bulletPoints: ['Runbooks', 'Architecture walkthroughs', 'Hypercare window'],
	},
];

const TIMELINE_STEPS = [
	{
		number: '01',
		title: 'Technical Blueprint',
		description: 'Map architecture, integrations, and data flows.',
		details: [
			'Domain model documentation',
			'API contract definition',
			'Data sync strategy and cadence',
			'Deployment topology & scaling plan',
		],
	},
	{
		number: '02',
		title: 'Experience Design',
		description: 'Define user flows, admin dashboards, and operational workflows.',
		details: [
			'User journey mapping',
			'Admin interface design',
			'Permission and role models',
			'Performance budgets defined',
		],
	},
	{
		number: '03',
		title: 'Build & Integrate',
		description: 'Implement with type-safe code and automated QA.',
		details: [
			'Component library development',
			'API and third-party integrations',
			'Automated testing coverage',
			'CI/CD pipeline setup',
		],
	},
	{
		number: '04',
		title: 'Stabilize & Launch',
		description: 'Hardening, documentation, and knowledge transfer.',
		details: [
			'Performance optimization',
			'Security and compliance review',
			'Runbook and documentation',
			'Handoff training sessions',
		],
	},
];

const CASE_STUDIES = [
	{
		client: 'Regional Insurance Platform',
		industry: 'Insurance',
		problem: 'Legacy marketing site could not keep up with new product launches.',
		solution: 'Migrated to a headless Next.js stack with modular CMS entries and ISR.',
		outcome: '+37% qualified inbound calls in 90 days with <2s median LCP.',
		icon: <ShieldCheck className='h-5 w-5' />,
		metrics: [
			{ label: 'Page load', value: '1.7s' },
			{ label: 'Lead lift', value: '+37%' },
		],
	},
	{
		client: 'Northwind Energy',
		industry: 'Energy',
		problem: 'Corporate site failed security reviews and had inconsistent lead capture.',
		solution: 'Rebuilt with strict access controls, encrypted forms, and CRM routing.',
		outcome: 'Lead-to-opportunity rate improved by 29%.',
		icon: <Factory className='h-5 w-5' />,
		metrics: [
			{ label: 'Security findings', value: '0' },
			{ label: 'SQL growth', value: '+29%' },
		],
	},
	{
		client: 'Cedar Labs',
		industry: 'SaaS',
		problem: 'Outdated product pages did not reflect the new platform narrative.',
		solution: 'Designed modular product stories and pricing scenarios for enterprise buyers.',
		outcome: 'Time on page doubled and demo requests grew 46%.',
		icon: <Activity className='h-5 w-5' />,
		metrics: [
			{ label: 'Time on page', value: '2x' },
			{ label: 'Demo lift', value: '+46%' },
		],
	},
];

const PRICING_PLANS = [
	{
		name: 'MVP Build',
		description: 'Ideal for validating a new product with a focused scope.',
		priceLabel: 'From $65k',
		features: [
			'Discovery + architecture sprint',
			'Core feature set build',
			'Foundational observability',
			'Launch + stabilization window',
		],
	},
	{
		name: 'Product Extension',
		description: 'Embed a dedicated pod to extend an existing platform.',
		priceLabel: 'From $45k / month',
		features: [
			'Dedicated cross-functional squad',
			'Backlog co-planning',
			'Security + compliance reviews',
			'24/7 incident escalation path',
		],
		isRecommended: true,
		badge: 'Most popular',
	},
	{
		name: 'Platform Rebuild',
		description: 'For complex migrations or multi-system consolidations.',
		priceLabel: 'Custom',
		features: ['Legacy system audit', 'Migration roadmap', 'Parallel run support', 'Post-launch optimization budget'],
	},
];

const FAQ_ITEMS = [
	{
		question: 'How do you keep timelines predictable with complex integrations?',
		answer:
			'We start every project with a technical blueprint that maps integrations, data flows, and dependencies before development begins.',
		bulletPoints: [
			'Architecture documented before development starts',
			'Risk assessment for third-party systems',
			'Milestone-based delivery with 24-48 hour demos',
		],
	},
	{
		question: 'What about security and compliance? Do you handle GDPR, HIPAA, etc.?',
		answer: 'Yes. We build security into the foundation and can align controls to SOC 2, HIPAA, and GDPR requirements.',
		bulletPoints: [
			'Security reviews built into each sprint',
			'Encrypted handling for sensitive fields',
			'Automated vulnerability scanning and patching',
		],
	},
	{
		question: 'Do you help with the transition after launch? What about handoff?',
		answer: 'Handoff is part of every engagement. We provide runbooks, documentation, and optional training sessions.',
		bulletPoints: ['Runbooks with operational checklists', 'System walkthroughs', '1-2 week hypercare window'],
	},
	{
		question: 'How do you keep full-stack projects type-safe?',
		answer:
			'Shared TypeScript contracts, zod validation, and automated schema generation ensure clients, APIs, and data layers remain consistent.',
	},
	{
		question: 'What does your architecture documentation include?',
		answer:
			'It covers context diagrams, integration inventories, deployment topologies, and operational checklists so handoffs are smooth.',
	},
	{
		question: 'Do you support DevOps and monitoring?',
		answer:
			'Yes. We embed CI/CD pipelines, logging, metrics, and alerting from day one so the platform ships with operational readiness.',
	},
	{
		question: 'Do we pay for the discovery call?',
		answer: 'No. Architecture reviews are part of the free consultation and include a short follow-up summary.',
	},
];

export default function FullStackWebDevPage() {
	return (
		<main className='space-y-0'>
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<section className='py-6 md:py-8 mx-auto max-w-7xl'>
				<TechMarquee />
			</section>
			<ClientSuccessBreakdown
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Full-stack outcomes backed by data'
				subtitle='Metrics that matter to your business goals.'
				outcomes={SUCCESS_OUTCOMES}
			/>
			<DeliverablesSection
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Deliverables that keep full-stack programs on track'
				subtitle='We align product, engineering, and operations with clear artifacts at every stage.'
				standards={DELIVERABLE_STANDARDS}
				deliverables={DELIVERABLES}
			/>
			<TimelineSteps
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Full-stack project timeline'
				subtitle='Clear milestones from blueprint to launch.'
				steps={TIMELINE_STEPS}
				orientation='horizontal'
			/>
			<IntegrationLogos
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Integrations that support full-stack delivery'
				description='We connect your product to the systems your teams already rely on.'
				integrations={INTEGRATIONS}
				variant='grid'
				ctaLabel='Discuss integration requirements'
				ctaHref='/contact'
			/>
			<CaseStudyStrip
				className='max-w-7xl mx-auto py-12 md:py-16'
				items={CASE_STUDIES}
				title='Representative full-stack engagements'
				description='Every case study highlights the measurable outcomes stakeholders care about.'
			/>
			<PricingTable
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Flexible engagement structures'
				description='Pick the model that best matches your internal capacity—each starts with a free discovery call.'
				plans={PRICING_PLANS}
				billingNote='Budgets include senior engineering oversight, QA, and documentation. Travel or third-party licenses billed at cost.'
			/>
			<FAQSection className='max-w-7xl mx-auto py-12 md:py-16' items={FAQ_ITEMS} />
			<div className='section-container py-12 md:py-16'>
				<ConsultationCTA
					className='w-full'
					title='Book a full-stack discovery call'
					bullets={[
						'Walk through architecture, teams, and constraints.',
						'Flag integration or compliance risks early.',
						'Leave with a phased roadmap and guardrails.',
					]}
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
