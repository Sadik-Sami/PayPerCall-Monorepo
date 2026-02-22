import {
	CaseStudyStrip,
	FAQSection,
	ServiceHero,
	ConsultationCTA,
	PricingTable,
	ProcessSteps,
	AnimatedServicesGrid,
	TrustBanner,
	ResultsShowcase,
	TestimonialsSection,
	IntegrationLogos,
} from '@/components/services';
import { WEB_DEV_SERVICE_NAV } from '@/components/services/nav-items';
import heroImage1 from '@/public/images/slider/slider-1.jpg';
import { ShieldCheck, Factory, Activity } from 'lucide-react';
import TechMarquee from '@/components/services/Tech-Marquee';
import { PremiumServicesGrid } from '@/components/blocks/premium-services-grid';
import { IndustryExpertiseSection } from '@/components/blocks/industry-expertise-section';

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
		description: 'Focused engagement for brand-new sites.',
		priceLabel: 'From $1k',
		features: [
			'Up to 5 essential page templates',
			'CMS implementation',
			'Technical SEO baseline',
			'Analytics instrumentation',
		],
	},
	{
		name: 'Growth',
		description: 'Most teams choose this for multi-page builds.',
		priceLabel: 'From $3k',
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
		description: 'Complex builds with advanced security needs.',
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
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<TechMarquee />
			<TrustBanner />
			<PremiumServicesGrid />
			<IndustryExpertiseSection />
			<ResultsShowcase />
			<section className='py-16 max-w-7xl mx-auto'>
				<div className='mb-12 max-w-3xl mx-auto text-center'>
					<h2 className='mb-4 text-foreground text-3xl md:text-4xl lg:text-5xl font-bold'>
						Web Development Capabilities
					</h2>
					<p className='text-muted-foreground'>
						Each capability links to a dedicated plan so stakeholders can scan what matters most.
					</p>
				</div>
				<AnimatedServicesGrid
					services={WEB_DEV_SERVICE_NAV.filter((item) => item.href !== '/services/web-dev').map(
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						({ icon: _icon, ...service }) => service
					)}
					className='grid gap-6 md:grid-cols-2'
				/>
			</section>
			<ProcessSteps
				className='max-w-7xl mx-auto'
				steps={PROCESS_STEPS}
				title='How we deliver web development projects'
				description='Every engagement follows a predictable arc so stakeholders always know what is happening next.'
				variant='cards'
			/>
			<CaseStudyStrip
				items={CASE_STUDIES}
				title='Results grounded in performance data'
				description='Every case study highlights the measurable outcomes stakeholders care about.'
			/>
			<TestimonialsSection className='max-w-7xl mx-auto' variant='featured' />
			<IntegrationLogos className='max-w-7xl mx-auto' />
			<PricingTable
				className='max-w-7xl mx-auto'
				title='Engagement models suited to your stage'
				description='Transparent ranges help you budget faster. Every project begins with a free planning call.'
				plans={PRICING_PLANS}
				billingNote='Budgets include design, engineering, QA, and launch support.'
			/>
			<FAQSection className='max-w-7xl mx-auto' items={FAQ_ITEMS} />
			<div className='section-container pb-16 max-w-7xl mx-auto'>
				<ConsultationCTA
					category='web-dev'
					title='Plan your next web program with a 30-minute strategy session'
					bullets={[
						'Share goals, KPIs, and blockers—no prep deck required.',
						'Receive phased recommendations within one business day.',
						'See budget ranges and timelines before you commit.',
					]}
				/>
			</div>
		</main>
	);
}
