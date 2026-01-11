import Link from 'next/link';
import {
	CaseStudyStrip,
	FAQSection,
	ServiceHero,
	FreeConsultationSection,
	PricingTable,
	ProcessSteps,
	TrustStrip,
} from '@/components/services';
import { WEB_DEV_SERVICE_NAV } from '@/components/services/nav-items';
import { Timeline, type TimelineEntry } from '@workspace/ui/components/ui/timeline';
import { StickyScroll } from '@workspace/ui/components/ui/sticky-scroll-reveal';
import { TestimonialsSection } from '@workspace/ui/components/testimonials';
import heroImage1 from '@/public/images/slider/slider-1.jpg';
import { ShieldCheck, Factory, Activity } from 'lucide-react';

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
		src: heroImage1,
		alt: 'Web development visualization',
		caption: 'Our roadmap sessions end with a written action plan.',
	},
	variant: 'asymmetric' as const,
};

const TRUST_CONTENT = {
	logos: [{ name: 'Atlas Capital' }, { name: 'Northwind Health' }, { name: 'Cedar Labs' }, { name: 'Summit Legal' }],
	metrics: [
		{ label: 'Custom web builds delivered', value: '120+' },
		{ label: 'Median LCP on launch', value: '<1.8s', helperText: 'Measured on production Core Web Vitals' },
		{ label: 'Industries served', value: '15+' },
		{ label: 'Average engagement', value: '18 mos', helperText: 'Many clients stay for ongoing optimization' },
	],
};

const PROCESS_STEPS = [
	{
		title: 'Discovery & Prioritization',
		description:
			'Align on business goals, primary KPIs, and existing systems. Produce a measurable requirements brief.',
	},
	{
		title: 'Architecture & Experience Design',
		description:
			'Select the right stack, map integrations, and work through low-fidelity and high-fidelity experience flows.',
	},
	{
		title: 'Build & Integrate',
		description:
			'Ship accessible, type-safe code, wire up first-party and third-party systems, and cover automated QA.',
	},
	{
		title: 'Launch & Improve',
		description:
			'Deploy via SSG/ISR, monitor analytics, and run structured optimization cycles once real data arrives.',
	},
];

const DELIVERY_TIMELINE_ITEMS: TimelineEntry[] = [
	{
		title: '01 · Strategy sprint',
		content: (
			<>
				<p>Stakeholders, goals, and constraints captured in a concise brief.</p>
				<ul className='mt-4 space-y-1 text-sm text-muted-foreground'>
					<li>• Tech + content inventory</li>
					<li>• KPI targets + reporting needs</li>
					<li>• Security/compliance checkpoints</li>
				</ul>
			</>
		),
	},
	{
		title: '02 · Experience & architecture',
		content: (
			<>
				<p>Low/high-fidelity flows paired with stack choices (React, Next.js, Prisma/Drizzle).</p>
				<ul className='mt-4 space-y-1 text-sm text-muted-foreground'>
					<li>• Content models + CMS governance</li>
					<li>• Integration plan (CRM, Supabase, auth)</li>
					<li>• Performance budgets + testing matrix</li>
				</ul>
			</>
		),
	},
	{
		title: '03 · Build & verify',
		content: (
			<>
				<p>Type-safe engineering with Dockerized environments and CI across linting, tests, and accessibility.</p>
				<ul className='mt-4 space-y-1 text-sm text-muted-foreground'>
					<li>• Components with shadcn/ui + Tailwind</li>
					<li>• Secure end-to-end APIs (Better Auth / NextAuth / custom JWT)</li>
					<li>• Data via NeonDB, PostgreSQL, MongoDB, or Supabase</li>
				</ul>
			</>
		),
	},
	{
		title: '04 · Launch & optimize',
		content: (
			<>
				<p>Deploy to Vercel, Render, or Cloudflare with ISR, then iterate with testing insights.</p>
				<ul className='mt-4 space-y-1 text-sm text-muted-foreground'>
					<li>• Analytics + heatmaps wired</li>
					<li>• Experiment backlog + ownership</li>
					<li>• Post-launch support SLAs</li>
				</ul>
			</>
		),
	},
];

const CAPABILITY_SCROLL_CONTENT = [
	{
		title: 'Front-end foundations',
		description: 'UI systems built with React, Next.js, shadcn/ui, and TailwindCSS stay accessible and consistent.',
		content: (
			<ul className='space-y-2 text-sm leading-relaxed text-muted-foreground'>
				<li>• Component libraries wired to Figma tokens</li>
				<li>• HTML-first markup with semantic headings</li>
				<li>• Performance budgets baked into review checklist</li>
			</ul>
		),
	},
	{
		title: 'Back-end + API layer',
		description: 'Node.js, Go, or Python services with Prisma/Drizzle keep data reliable and testable.',
		content: (
			<ul className='space-y-2 text-sm leading-relaxed text-muted-foreground'>
				<li>• Secure auth (NextAuth, Better Auth, OAuth, custom JWT)</li>
				<li>• APIs validated end-to-end with contract tests</li>
				<li>• Works with NeonDB, Supabase, PostgreSQL, MongoDB</li>
			</ul>
		),
	},
	{
		title: 'Operations + delivery',
		description: 'CI/CD pipelines use Docker, GitHub Actions, and testing suites to keep releases boring.',
		content: (
			<ul className='space-y-2 text-sm leading-relaxed text-muted-foreground'>
				<li>• Automated lint, unit, accessibility, and visual checks</li>
				<li>• Deploy to Vercel, Render, or Cloudflare with ISR defaults</li>
				<li>• Observability via distributed tracing + dashboards</li>
			</ul>
		),
	},
];

const WEB_DEV_TESTIMONIALS = [
	{
		name: 'Priya Patel',
		role: 'VP of Growth',
		company: 'Atlas Capital',
		quote:
			'The new site loads in under two seconds worldwide and our inbound opportunities finally match enterprise expectations.',
		highlight: '+42% qualified demo requests in 60 days',
	},
	{
		name: 'Leo Ramirez',
		role: 'CTO',
		company: 'Northwind Health',
		quote: 'Their hybrid of React, Node, and Go gave us the flexibility we needed without sacrificing reliability.',
		highlight: 'Zero P1 incidents since launch',
	},
	{
		name: 'Katherine Wu',
		role: 'Head of Digital',
		company: 'Summit Legal',
		quote:
			'They handled compliance reviews, CMS governance, and analytics instrumentation so our team could focus on content.',
		highlight: 'Month-end reporting time cut in half',
	},
];

const CASE_STUDIES = [
	{
		client: 'Regional Insurance Platform',
		industry: 'Insurance',
		problem: 'Legacy marketing site could not keep up with new product launches or SEO requirements.',
		solution: 'Migrated to a headless Next.js stack with modular CMS entries and ISR for rapid content updates.',
		outcome: '+37% qualified inbound calls in 90 days with <2s median LCP across all core pages.',
		icon: <ShieldCheck className='size-5' />,
		metrics: [
			{ label: 'Page load', value: '1.7s' },
			{ label: 'Lead lift', value: '+37%' },
		],
	},
	{
		client: 'Northwind Energy',
		industry: 'Energy',
		problem: 'Corporate site failed security reviews and had inconsistent lead capture.',
		solution: 'Rebuilt site with strict access controls, encrypted forms, and CRM-integrated qualification routing.',
		outcome: 'Lead-to-opportunity rate improved by 29% while reducing manual review steps.',
		icon: <Factory className='size-5' />,
		metrics: [
			{ label: 'Security findings', value: '0' },
			{ label: 'SQL growth', value: '+29%' },
		],
	},
	{
		client: 'Cedar Labs',
		industry: 'SaaS',
		problem: 'Outdated product pages did not reflect the new platform narrative or pricing.',
		solution:
			'Designed modular product stories, data visualizations, and pricing scenarios tailored to enterprise buyers.',
		outcome: 'Time on page doubled and demo requests grew 46% in the first quarter post launch.',
		icon: <Activity className='size-5' />,
		metrics: [
			{ label: 'Time on page', value: '2x' },
			{ label: 'Demo lift', value: '+46%' },
		],
	},
];

const PRICING_PLANS = [
	{
		name: 'Foundation',
		description: 'Focused engagement for brand-new sites with a lean scope.',
		priceLabel: 'From $18k',
		features: [
			'Up to 5 essential page templates',
			'CMS implementation',
			'Technical SEO baseline',
			'Analytics instrumentation',
		],
	},
	{
		name: 'Growth',
		description: 'Most teams choose this for multi-page builds with integrations.',
		priceLabel: 'From $42k',
		features: [
			'End-to-end UX + content support',
			'Custom component library',
			'System integrations (CRM, marketing ops)',
			'Performance & accessibility audits',
		],
		isRecommended: true,
		badge: 'Recommended',
	},
	{
		name: 'Enterprise',
		description: 'Complex builds with advanced security, compliance, or localization needs.',
		priceLabel: 'Custom',
		features: [
			'Multi-region deployments',
			'Design system collaboration',
			'Migration support and content ops',
			'Ongoing optimization retainer',
		],
	},
];

const FAQ_ITEMS = [
	{
		question: 'How do you decide between SSG, ISR, or SSR for a project?',
		answer:
			'We default to Static Site Generation with ISR for marketing and service content so pages stay fast and crawlable. SSR is reserved for sensitive, frequently changing data. CSR is used only for interactive widgets.',
	},
	{
		question: 'Can you work with our internal design or engineering teams?',
		answer:
			'Yes. We frequently collaborate with in-house teams, taking the lead on architecture and web performance while your team covers brand or product requirements.',
	},
	{
		question: 'What analytics or measurement is included?',
		answer:
			'Every engagement includes Core Web Vitals tracking, event instrumentation for critical CTAs, and optional funnel dashboards that we configure with your analytics stack.',
	},
	{
		question: 'Is the initial consultation really free?',
		answer:
			'Yes. The 30-minute strategy session is complimentary and includes a written summary—no invoice or commitment required.',
	},
];

export default function WebDevOverviewPage() {
	return (
		<main className='space-y-12'>
			<ServiceHero {...HERO_CONTENT} />
			<TrustStrip {...TRUST_CONTENT} />

			<section className='space-y-6 rounded-3xl border bg-background/80 p-8'>
				<div className='space-y-2'>
					<h2 className='text-2xl font-semibold text-foreground'>Web Development Capabilities</h2>
					<p className='text-muted-foreground'>
						Each capability links to a dedicated plan so stakeholders can scan what matters most.
					</p>
				</div>
				<div className='grid gap-4 md:grid-cols-2'>
					{WEB_DEV_SERVICE_NAV.filter((item) => item.href !== '/services/web-dev').map((service) => (
						<Link
							key={service.href}
							href={service.href}
							className='rounded-2xl border border-muted-foreground/30 bg-card/60 p-6 transition hover:border-primary hover:bg-card'>
							<p className='text-sm font-semibold uppercase tracking-wide text-primary/80'>Service</p>
							<p className='text-lg font-semibold text-foreground'>{service.label}</p>
							<p className='text-sm text-muted-foreground'>
								Learn about scope, pricing, and process for {service.label.toLowerCase()}.
							</p>
						</Link>
					))}
				</div>
			</section>

			<ProcessSteps steps={PROCESS_STEPS} title='How we deliver web development projects' />
			<Timeline
				title='A transparent delivery timeline'
				description='Every engagement follows a predictable arc so stakeholders always know what is happening next.'
				data={DELIVERY_TIMELINE_ITEMS}
			/>
			<div className='space-y-6'>
				<h2 className='text-2xl font-semibold text-foreground'>Depth across the stack</h2>
				<p className='text-muted-foreground'>
					Scroll through the core areas we own so your internal team can stay focused.
				</p>
				<StickyScroll
					content={CAPABILITY_SCROLL_CONTENT}
					className='border border-muted-foreground/30 bg-background text-foreground'
					contentClassName='bg-card/80'
					backgroundColors={['#0a0d12', '#0c111d', '#0a0d12']}
					gradientBackgrounds={[
						'linear-gradient(to bottom right, rgba(15,118,110,0.25), rgba(8,47,73,0.6))',
						'linear-gradient(to bottom right, rgba(37,99,235,0.25), rgba(15,23,42,0.7))',
						'linear-gradient(to bottom right, rgba(2,132,199,0.25), rgba(8,47,73,0.6))',
					]}
				/>
			</div>
			<CaseStudyStrip
				items={CASE_STUDIES}
				title='Results grounded in performance data'
				description='Every case study highlights the measurable outcomes stakeholders care about.'
			/>
			<PricingTable
				title='Engagement models suited to your stage'
				description='Transparent ranges help you budget faster. Every project still begins with a free planning call.'
				plans={PRICING_PLANS}
				billingNote='Budgets include design, engineering, QA, and launch support. Content strategy or copywriting can be added as needed.'
			/>
			<TestimonialsSection
				badge='Client feedback'
				title='Leaders trust us with'
				highlight='mission-critical launches'
				subtitle='A few quick notes from product, marketing, and engineering teams we support.'
				testimonials={WEB_DEV_TESTIMONIALS}
				columns={2}
				showStars={false}
				className='px-0'
			/>
			<FAQSection items={FAQ_ITEMS} />
			<FreeConsultationSection
				title='Plan your next web program with a 30-minute strategy session'
				bullets={[
					'Share goals, KPIs, and blockers—no prep deck required.',
					'Receive phased recommendations within one business day.',
					'See budget ranges and timelines before you commit to work.',
				]}
				formVariant='detailed'
			/>
		</main>
	);
}
