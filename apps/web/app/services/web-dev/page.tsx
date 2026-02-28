import { cn } from '@workspace/ui/lib/utils';
import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	ProcessSteps,
	ServiceCapabilitiesGateway,
	TrustBanner,
	ResultsShowcase,
	TestimonialsSection,
	IntegrationLogos,
} from '@/components/services';
import {
	WEB_DEV_SERVICE_NAV,
	WEB_DEV_GATEWAY_CONFIG,
	buildGatewayCards,
} from '@/components/services/nav-items';
import { ShieldCheck, Factory, Activity } from 'lucide-react';
import { PremiumServicesGrid } from '@/components/blocks/premium-services-grid';
import { IndustryExpertiseSection } from '@/components/blocks/industry-expertise-section';
import { WebDevHero } from './_components';

const PROCESS_STEPS = [
	{
		title: 'Discovery',
		description:
			'We dive deep into your business goals. Through stakeholder interviews and data analysis, we establish a crystal-clear roadmap and set success metrics.',
	},
	{
		title: 'Architecture',
		description:
			'Design systems and tech stacks are selected. We create high-fidelity prototypes and map out the database schemas to ensure scalability from day one.',
	},
	{
		title: 'Development',
		description:
			'Agile sprints bring the design to life. We write clean, type-safe code with automated testing, ensuring regular deployments for feedback loops.',
	},
	{
		title: 'Launch',
		description:
			'We manage the final deployment, DNS configuration, and performance tuning. Post-launch monitoring ensures stability as users start to engage.',
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

const SECTION_PADDING = 'py-12 sm:py-16 md:py-20 lg:py-24';

export default function WebDevOverviewPage() {
	return (
		<main className='flex flex-col'>
			<WebDevHero />
			<TrustBanner className={cn('bg-muted/30', SECTION_PADDING)} />
			<PremiumServicesGrid className={cn('bg-background', SECTION_PADDING)} />
			<IndustryExpertiseSection className={cn('bg-muted/30', SECTION_PADDING)} />
			<ResultsShowcase className={cn('bg-background', SECTION_PADDING)} />
			<ServiceCapabilitiesGateway
				title={WEB_DEV_GATEWAY_CONFIG.title}
				subtitle={WEB_DEV_GATEWAY_CONFIG.subtitle}
				cards={buildGatewayCards(
					WEB_DEV_SERVICE_NAV,
					'/services/web-dev',
					WEB_DEV_GATEWAY_CONFIG.ctaLabels,
					WEB_DEV_GATEWAY_CONFIG.iconKeys
				)}
				primaryCta={WEB_DEV_GATEWAY_CONFIG.primaryCta}
				primaryCtaNote={WEB_DEV_GATEWAY_CONFIG.primaryCtaNote}
				columns={WEB_DEV_GATEWAY_CONFIG.columns}
				className={cn('w-full bg-muted/30', SECTION_PADDING)}
			/>
			<ProcessSteps
				steps={PROCESS_STEPS}
				title='Our Path to Digital Perfection'
				description='A transparent, step-by-step approach ensuring your vision translates flawlessly into reality.'
				variant='cards'
				className={cn('bg-background', SECTION_PADDING)}
			/>
			<IntegrationLogos className={cn('w-full bg-background', SECTION_PADDING)} />
			<CaseStudyStrip
				items={CASE_STUDIES}
				title='Results grounded in performance data'
				description='Every case study highlights the measurable outcomes stakeholders care about.'
				className={cn('w-full bg-muted/30', SECTION_PADDING)}
			/>
			<TestimonialsSection className={cn('w-full bg-background', SECTION_PADDING)} variant='featured' />
			<FAQSection className={cn('w-full bg-muted/30', SECTION_PADDING)} items={FAQ_ITEMS} />
			<div className={cn('bg-background w-full', SECTION_PADDING)}>
				<div className="section-container">
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
			</div>
		</main>
	);
}
