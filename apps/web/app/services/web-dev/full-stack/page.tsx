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
import heroImage2 from '@/public/images/slider/slider-2.jpg';
import { CircuitBoard, ServerCog, Lock } from 'lucide-react';

export const revalidate = 3600;

const HERO_CONTENT = {
	pill: 'Full-Stack Delivery',
	title: 'One accountable team for product, API, and ops',
	subtitle: 'Architecture, frontend, backend, and integrations handled together so you see progress every sprint.',
	features: ['React & Next.js', 'Node · Go · Python', 'Secure APIs + observability'],
	stat: { value: '30 minutes', label: 'Technical discovery · free' },
	primaryCta: { label: 'Discuss Your Full-Stack Project', href: '/contact' },
	secondaryCta: { label: 'Review Collaboration Models', href: '/about/why-us' },
	footnote: 'Discovery calls include a short follow-up summary with risks and next steps.',
	media: {
		src: heroImage2,
		alt: 'Engineers collaborating on architecture diagrams',
		caption: 'Cross-functional pods blend product, design, and engineering.',
	},
};

const TRUST_CONTENT = {
	logos: [{ name: 'SecureLend' }, { name: 'Helios Labs' }, { name: 'Beacon Health' }],
	metrics: [
		{ label: 'Full-stack engineers on staff', value: '25+' },
		{ label: 'Average engagement length', value: '14 mos' },
		{ label: 'Mean time to first release', value: '6 wks', helperText: 'After kickoff for typical MVP' },
		{ label: 'Systems integrated per project', value: '4+', helperText: 'CRMs, ERPs, billing, auth, and more' },
	],
};

const PROCESS_STEPS = [
	{
		title: 'Technical Blueprint',
		description:
			'Document domain models, APIs, deployment strategy, and non-functional requirements before writing code.',
	},
	{
		title: 'Experience Definition',
		description: 'Wireframe user journeys, admin views, and operational workflows to remove ambiguity.',
	},
	{
		title: 'Incremental Delivery',
		description: 'Ship value every sprint with CI/CD pipelines, automated checks, and transparent demos.',
	},
	{
		title: 'Stabilize & Transition',
		description: 'Hardening sprints, documentation, and optional handoff training for in-house teams.',
	},
];

const FULL_STACK_TIMELINE: TimelineEntry[] = [
	{
		title: '01 · Architecture baseline',
		content: (
			<>
				<p>Document context, domain models, and integration contracts.</p>
				<ul className='mt-3 space-y-1'>
					<li>• Diagram services + data sources</li>
					<li>• Select auth (NextAuth, Better Auth, custom JWT)</li>
					<li>• Define observability + SLO targets</li>
				</ul>
			</>
		),
	},
	{
		title: '02 · Experience rehearsal',
		content: (
			<>
				<p>Wireframes, admin tools, and operational views validated with stakeholders.</p>
				<ul className='mt-3 space-y-1'>
					<li>• Shared component inventory</li>
					<li>• Access + compliance requirements captured</li>
					<li>• Data contracts for FE/BE handoff</li>
				</ul>
			</>
		),
	},
	{
		title: '03 · Iterative delivery',
		content: (
			<>
				<p>Weekly increments deploy to staging using Docker, GitHub actions, and automated tests.</p>
				<ul className='mt-3 space-y-1'>
					<li>• Drizzle/Prisma migrations with review gates</li>
					<li>• API hardening (rate limits, logging)</li>
					<li>• Contract tests against partner systems</li>
				</ul>
			</>
		),
	},
	{
		title: '04 · Stabilize & handoff',
		content: (
			<>
				<p>Performance, load, and security checks precede launch, followed by docs/training.</p>
				<ul className='mt-3 space-y-1'>
					<li>• Runbooks + escalation paths</li>
					<li>• Optional onsite/remote training</li>
					<li>• Optimization backlog for post-launch</li>
				</ul>
			</>
		),
	},
];

const CASE_STUDIES = [
	{
		client: 'Helios Labs',
		problem: 'Needed a secure platform for processing IoT telemetry with real-time dashboards.',
		solution: 'Built a full-stack Next.js + NestJS platform with WebSocket streaming and role-based access controls.',
		outcome: 'Process automation removed 22 manual touchpoints, while dashboards kept <200ms latency under load.',
		icon: <CircuitBoard className='size-5' />,
		metrics: [
			{ label: 'Latency', value: '<200ms' },
			{ label: 'Manual steps', value: '-22' },
		],
	},
	{
		client: 'SecureLend',
		industry: 'Fintech',
		problem: 'Legacy underwriting system could not be exposed to partners safely.',
		solution: 'Designed a modular API layer with audit logging, rate limiting, and partner-specific policies.',
		outcome: 'Partner onboarding went from 12 weeks to 4 while meeting SOC 2 security benchmarks.',
		icon: <Lock className='size-5' />,
		metrics: [
			{ label: 'Onboarding time', value: '4 wks' },
			{ label: 'Compliance', value: 'SOC 2' },
		],
	},
	{
		client: 'Beacon Health',
		industry: 'Healthcare',
		problem: 'Multiple patient intake apps created inconsistent data and compliance gaps.',
		solution: 'Unified intake workflows, EHR integrations, and consent management in a HIPAA-aligned platform.',
		outcome: 'Error rates dropped 41% and clinicians gained real-time visibility into patient queues.',
		icon: <ServerCog className='size-5' />,
		metrics: [
			{ label: 'Error reduction', value: '-41%' },
			{ label: 'Queue visibility', value: 'Real-time' },
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
		<main className='space-y-12'>
			<ServiceHero {...HERO_CONTENT} />
			<TrustStrip {...TRUST_CONTENT} />
			<ProcessSteps steps={PROCESS_STEPS} title='A predictable full-stack delivery model' />
			<Timeline
				title='Delivery timeline for full-stack builds'
				description='Four structured phases keep product, platform, and operations aligned.'
				data={FULL_STACK_TIMELINE}
			/>
			<CaseStudyStrip items={CASE_STUDIES} title='Representative full-stack engagements' />
			<PricingTable
				title='Flexible engagement structures'
				description='Pick the model that best matches your internal capacity—each starts with a free discovery call.'
				plans={PRICING_PLANS}
				billingNote='Budgets include senior engineering oversight, QA, and documentation. Travel or third-party licenses billed at cost.'
			/>
			<FAQSection items={FAQ_ITEMS} />
			<FreeConsultationSection
				title='Book a full-stack discovery call'
				bullets={[
					'Walk through architecture, teams, and constraints.',
					'Flag integration or compliance risks early.',
					'Leave with a phased roadmap and guardrails.',
				]}
				formVariant='detailed'
			/>
		</main>
	);
}
