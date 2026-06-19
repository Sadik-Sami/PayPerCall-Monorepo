import React from 'react';
import { ShieldCheck, Factory, Activity } from 'lucide-react';

export const FULL_STACK_DATA = {
	HERO: {
		pill: 'Web Development',
		eyebrow: 'Full-Stack Services',
		title: 'Web programs built for measurable impact',
		subtitle:
			'We ship React/Next.js experiences that stay fast, search-ready, and easy to operate. Start with a no-cost roadmap call.',
		features: ['SSG + ISR first', 'Analytics-ready', 'Accessible by default'],
		primaryCta: { label: 'Book a Free Consultation', href: '/contact' },
	},
	OUTCOMES: [
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
	],
	DELIVERABLE_STANDARDS: [
		'Typed API contracts with boundary validation.',
		'Security reviews aligned to SOC 2, HIPAA, or GDPR requirements.',
		'Monitoring, alerting, and runbooks prior to launch.',
		'Performance budgets tracked against Core Web Vitals.',
	],
	DELIVERABLES: [
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
	],
	TIMELINE_STEPS: [
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
	],
	FAQ_ITEMS: [
		{
			question: 'How do you keep timelines predictable with complex integrations?',
			answer:
				'We start every project with a technical blueprint that maps integrations, data flows, and dependencies before development begins.',
		},
		{
			question: 'What about security and compliance? Do you handle GDPR, HIPAA, etc.?',
			answer: 'Yes. We build security into the foundation and can align controls to SOC 2, HIPAA, and GDPR requirements.',
		},
		{
			question: 'Do you help with the transition after launch? What about handoff?',
			answer: 'Handoff is part of every engagement. We provide runbooks, documentation, and optional training sessions.',
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
	],
};

import { ShoppingBag, Truck, CreditCard } from 'lucide-react';
import type { SuccessOutcome } from '@/components/sections/services';
import type { TimelineEntry } from '@workspace/ui/components/ui/timeline';

export const ECOMMERCE_DATA = {
	HERO: {
		pill: 'Ecommerce',
		eyebrow: 'Web Development',
		title: 'Conversion-ready storefronts with reliable ops',
		subtitle: 'Performance, merchandising, and integrations handled together so you can scale revenue without surprises.',
		features: ['Headless commerce', 'Payments + tax', 'Inventory + ERP sync'],
		primaryCta: { label: 'Start a Free Strategy Session', href: '/contact' },
	},
	OUTCOMES: [
		{
			icon: 'default' as const,
			metric: '$220M+',
			label: 'GMV supported in 2025',
			description: "Total gross merchandise value processed through storefronts we've built",
			context: 'Across DTC brands, B2B marketplaces, and enterprise catalogs.',
		},
		{
			icon: 'database' as const,
			metric: '78%',
			label: 'Average checkout completion rate',
			description: 'Conversion from cart to confirmation across all store types',
			context: 'Industry average is 70%. We focus on reducing friction and removing abandonment.',
		},
		{
			icon: 'gitBranch' as const,
			metric: '+21%',
			label: 'Average AOV lift',
			description: 'Increase in average order value post-launch',
			context: 'Through better product discovery, bundling, and personalization.',
		},
	] satisfies SuccessOutcome[],
	PROCESS_STEPS: [
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
	],
	TIMELINE: [
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
	] as TimelineEntry[],
	RESULTS: [
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
	],
	FAQ_ITEMS: [
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
	],
};

import { Briefcase, Building, Target, Megaphone, BarChart3, MousePointer } from 'lucide-react';
import type { FaqItem } from '@/types/services';

export const BUSINESS_DATA = {
	HERO: {
		pill: 'Business Websites',
		eyebrow: 'Web Development',
		title: 'B2B websites that back up your revenue goals',
		subtitle: 'Streamlined messaging, trust signals, and measurement so sales teams get cleaner leads.',
		features: ['Headless CMS', 'SEO + schema', 'Lead routing'],
		primaryCta: { label: 'Request a Free Website Review', href: '/contact' },
	},
	OUTCOMES: [
		{
			icon: 'default' as const,
			metric: '+32%',
			label: 'Average organic lift',
			description: 'Three months after launch across B2B sites',
			context: 'Through better SEO, schema markup, and content organization.',
		},
		{
			icon: 'database' as const,
			metric: '4.6%',
			label: 'Median form completion rate',
			description: "Across all lead generation forms we've deployed",
			context: 'Industry average is 2-3%. We reduce friction and add trust.',
		},
		{
			icon: 'clock' as const,
			metric: '48',
			label: 'Business sites launched',
			description: 'In insurance, legal, logistics, finance, and other B2B sectors',
			context: 'Each one measurably improved lead quality and sales conversation quality.',
		},
	] satisfies SuccessOutcome[],
	PROCESS_STEPS: [
		{
			title: 'Audience & Message Alignment',
			description: 'Work with stakeholders to clarify offers, proof points, and calls-to-action per audience.',
		},
		{
			title: 'Architecture & Content Planning',
			description: 'Define page types, modular sections, and metadata so content teams can scale confidently.',
		},
		{
			title: 'Design & Build',
			description: 'Produce accessible layouts, then ship them as reusable components managed via CMS.',
		},
		{
			title: 'Launch & Iterate',
			description: 'Deploy via ISR, validate analytics, and plan optimization sprints based on live data.',
		},
	],
	COMPARISON_TIERS: [
		{ name: 'Essential', description: 'Focused positioning sites' },
		{ name: 'Growth', description: 'Multi-offer businesses' },
		{ name: 'Enterprise', description: 'Complex governance needs', recommended: true },
	],
	COMPARISON_FEATURES: [
		{ name: 'Core page templates', included: ['Up to 6', '10+', '20+'] },
		{ name: 'Case study system', included: [false, true, true] },
		{ name: 'CRM integration', included: [false, true, true] },
		{ name: 'Testimonial management', included: [false, true, true] },
		{ name: 'Content automation', included: [false, 'Yes', 'Yes'] },
		{ name: 'Multi-region support', included: [false, false, true] },
		{ name: 'Advanced security reviews', included: [false, false, true] },
		{ name: 'Compliance audit trail', included: [false, 'Optional', true] },
	],
	TRENDING_METRICS: [
		{
			label: 'B2B buyers researching digitally',
			value: '94%',
			change: 'Up 23%',
			context: 'Decision-makers now prefer self-service research before talking to sales.',
		},
		{
			label: 'CMS adoption in enterprise',
			value: '78%',
			change: 'Up 18%',
			context: 'Content teams increasingly manage sites independently without developers.',
		},
		{
			label: 'Lead quality improvement',
			value: '+41%',
			change: 'Average',
			context: 'When B2B sites have clear messaging and trust signals.',
		},
		{
			label: 'Conversion rate uplift',
			value: '+35%',
			change: 'Typical',
			context: 'After implementing dynamic CTA routing and better funnel visibility.',
		},
	],
	FAQ_ITEMS: [
		{
			question: 'Our internal team changes content frequently—how do we manage that without developer help?',
			answer:
				'We build with a headless CMS so your team can publish pages, change layouts, and add content without needing engineering. We provide training and operational docs so you stay confident and independent.',
			bulletPoints: [
				'Intuitive CMS interface (Contentful, Sanity, etc.)',
				'Reusable content blocks and page templates',
				'Video training and operations runbooks included',
			],
		},
		{
			question: "We're regulated (finance/legal/healthcare)—can you handle compliance requirements?",
			answer:
				"Yes. We've built compliant sites for financial advisors, law firms, and healthcare practices. We document all changes for audit trails, implement access controls, and ensure GDPR/HIPAA handling where required.",
			bulletPoints: [
				'Audit-ready change logs and version history',
				'Role-based access controls for sensitive content',
				'Compliance checklist reviewed before launch',
			],
		},
		{
			question: 'How do we measure whether the new site is actually driving better leads?',
			answer:
				'Every site ships with full attribution tracking. We configure your CRM integration so lead source is tracked through the entire pipeline. Weekly dashboards show which pages drive SQLs.',
			bulletPoints: [
				'CRM integration with lead scoring',
				'Page-to-opportunity attribution dashboards',
				'Weekly reporting to marketing and sales leadership',
			],
		},
		{
			question: 'Do you provide copywriting?',
			answer:
				'We collaborate with your subject matter experts and can supply B2B copy partners upon request. Every layout includes content guidance to keep messaging consistent.',
		},
		{
			question: 'Can you integrate our preferred CMS?',
			answer:
				'Yes. We work with headless CMS platforms and can provide guidance on governance, workflows, and author experience.',
		},
		{
			question: 'How do you measure success for business sites?',
			answer:
				'We track Core Web Vitals, conversion rates, SQLs, and engagement metrics defined during discovery so you can see improvement clearly.',
		},
		{
			question: 'Is the website review complimentary?',
			answer: 'Yes. The review and follow-up brief are free—we only start billing if you approve a scoped build.',
		},
	] satisfies FaqItem[],
};

export const LANDING_PAGE_DATA = {
	HERO: {
		pill: 'Landing Pages',
		eyebrow: 'Web Development',
		title: 'Campaign landing pages with clean proof and tracking',
		subtitle: 'Each build ships with fast load times, tested messaging, and analytics so you know every dollar’s impact.',
		features: ['Conversion copy', 'Event tracking', 'A/B test ready'],
		primaryCta: { label: 'Brief Us on Your Campaign', href: '/contact' },
	},
	OUTCOMES: [
		{
			icon: 'default' as const,
			metric: '210',
			label: 'Landing pages shipped in 2025',
			description: 'Across demand gen, product launches, and webinar campaigns',
			context: 'Average time to first version: 10 days from kickoff.',
		},
		{
			icon: 'database' as const,
			metric: '+28%',
			label: 'Median conversion lift',
			description: 'Performance improvement vs. previous or competitor pages',
			context: 'Measured 30 days post-launch with control group comparison.',
		},
		{
			icon: 'clock' as const,
			metric: '<1.5s',
			label: 'Median LCP score',
			description: 'Large Contentful Paint across all page variants',
			context: 'Speed directly impacts conversion rates and SEO rankings.',
		},
	] satisfies SuccessOutcome[],
	PROCESS_STEPS: [
		{ title: 'Campaign Intake', description: 'Clarify the offer, audience, traffic source, and success metrics.' },
		{
			title: 'Wireframe & Copy Collaboration',
			description: 'Draft structure and conversion copy with stakeholders or internal copy partners.',
		},
		{
			title: 'Build & QA',
			description: 'Develop in Next.js with strict performance budgets and analytics instrumentation.',
		},
		{
			title: 'Experiment & Optimize',
			description: 'Support variant launches, heatmaps, and metric reviews to secure lift.',
		},
	],
	RESULTS: [
		{
			label: 'Cost Per Lead',
			before: '$42',
			after: '$28',
			improvement: '-33%',
			context: 'Improved conversion rate on paid search campaigns.',
		},
		{
			label: 'Form Completion Rate',
			before: '2.1%',
			after: '4.6%',
			improvement: '+119%',
			context: 'Better copy, fewer form fields, and trust signals.',
		},
		{
			label: 'Webinar Registration Rate',
			before: '18%',
			after: '38%',
			improvement: '+111%',
			context: 'Added agenda visibility, speaker bios, and social proof.',
		},
	],
	FAQ_ITEMS: [
		{
			question: 'We need pages fast—can you keep turnarounds short without sacrificing quality?',
			answer:
				'Yes. We use a battle-tested template system and reusable components so we can ship high-quality pages in 10–15 days. We skip the unnecessary design cycles and focus on conversion science and messaging.',
			bulletPoints: [
				'Modular hero, proof, pricing, CTA blocks',
				'Proven conversion patterns from 200+ pages',
				'Fast iteration cycles with client feedback',
			],
		},
		{
			question: 'How do we know which version wins? Do you support A/B testing?',
			answer:
				'Absolutely. Every page ships with analytics hooks and A/B testing capability. We guide you on what to test (headline variants, CTA copy, proof elements) and provide weekly reporting so you can iterate with confidence.',
			bulletPoints: [
				'Built-in GA4 and Segment instrumentation',
				'A/B test framework ready (no developer overhead)',
				'Weekly conversion and traffic reports',
			],
		},
		{
			question: 'We run campaigns across multiple channels—can pages adapt to different traffic sources?',
			answer:
				'Yes. We design modular pages so you can adapt headlines, copy, and proof elements per traffic source (paid search, paid social, email, etc.) without rebuilding. Same codebase, different messaging.',
			bulletPoints: [
				'Dynamic headline and CTA variation per URL param',
				'Channel-specific proof and social proof sections',
				'One codebase, multiple messaging layers',
			],
		},
		{
			question: 'Do you supply copy or work with our team?',
			answer:
				'We can collaborate with your internal marketers or bring in conversion-focused copy partners. Every engagement starts with a messaging workshop.',
		},
		{
			question: 'What analytics integrations are included?',
			answer:
				'We wire up your analytics stack (GA4, HubSpot, Segment, etc.) and configure conversion events tied to the campaign goal.',
		},
		{
			question: 'Can you support multiple traffic sources?',
			answer:
				'Yes. We adapt modules for paid search, paid social, webinars, or partnerships so you can run controlled experiments per channel.',
		},
		{
			question: 'Is the campaign planning call free?',
			answer: 'Yes. Sharing your brief and getting our outline costs nothing—we only bill if you green-light a build.',
		},
	] satisfies FaqItem[],
};
