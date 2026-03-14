import type { Metadata } from 'next';
import { ConsultationCTA } from '@/components/sections/services';
import {
	DigitalMarketingGrowthMatrixSection,
	PpcPerformanceHero,
	type GrowthMatrixStep,
} from '@/components/sections/services/digital-marketing';

export const metadata: Metadata = {
	title: 'PPC Management Services | Paid Search and Paid Social Performance | PayPerCall',
	description:
		'Performance-focused PPC management across Google Ads and paid social with disciplined testing, bidding control, and conversion optimization.',
	alternates: { canonical: '/services/digital-marketing/ppc' },
	robots: { index: true, follow: true },
};

export const revalidate = 3600;

const CONSULTATION_FEATURES = [
	{
		title: 'Channel Performance Audit',
		description: 'Review campaign structure, keyword intent, audience quality, and budget allocation gaps.',
		icon: 'Eye',
	},
	{
		title: 'Testing and Bidding Plan',
		description: 'Define experiment backlog across ads, landing pages, offers, and bid strategy settings.',
		icon: 'Flame',
	},
	{
		title: 'Pipeline-Focused KPIs',
		description: 'Align optimization decisions to qualified lead volume, CAC discipline, and revenue contribution.',
		icon: 'TrendingUp',
	},
];

const PPC_GROWTH_STEPS: GrowthMatrixStep[] = [
	{
		step: '01',
		title: 'Account Forensics',
		description:
			'Audit search terms, audience quality, budget pacing, and funnel leakage to identify high-cost inefficiencies quickly.',
		tagline: 'WEEK 1: PERFORMANCE BASELINE',
		icon: 'Search',
		theme: 'sky',
	},
	{
		step: '02',
		title: 'Control Framework',
		description:
			'Rebuild campaign structure, conversion actions, and bidding guardrails to align spend with true business goals.',
		tagline: 'WEEK 2: INFRASTRUCTURE RESET',
		icon: 'Settings2',
		theme: 'lilac',
	},
	{
		step: '03',
		title: 'Creative + Offer Tests',
		description:
			'Launch iterative tests across ads, audiences, and landing experiences to increase qualified conversion rate.',
		tagline: 'WEEK 3-4: CONTROLLED TESTING',
		icon: 'FlaskConical',
		theme: 'peach',
	},
	{
		step: '04',
		title: 'Profit-First Scaling',
		description:
			'Scale winning segments and channels with disciplined pacing and weekly optimization tied to CAC and pipeline quality.',
		tagline: 'WEEK 5+: PROFITABLE EXPANSION',
		icon: 'Rocket',
		theme: 'mint',
	},
];

export default function PaidAdvertisingPage() {
	return (
		<main className='space-y-0'>
			<PpcPerformanceHero />
			<div className='w-full bg-muted/30'>
				<DigitalMarketingGrowthMatrixSection
					className='py-12 md:py-16'
					badgeLabel='PPC Optimization Sprint'
					title='The 4-Step PPC Performance Matrix'
					description='A practical framework for reducing wasted spend, improving conversion efficiency, and scaling paid media with confidence.'
					steps={PPC_GROWTH_STEPS}
					ctaTitle='Need stronger performance from paid channels?'
					ctaDescription='Use this sprint model to move from reactive campaign management to structured, profit-oriented PPC growth.'
					primaryCta={{ label: 'Book PPC Strategy Session', href: '#consultation' }}
					secondaryCta={{ label: 'Get Paid Media Priorities', href: '#consultation' }}
				/>
			</div>
			<div id='consultation' className='section-container py-12 md:py-16'>
				<ConsultationCTA
					category='digital-marketing'
					className='w-full'
					badge={{ label: 'PPC Growth Consultation', icon: 'Check' }}
					title='Plan your PPC efficiency and scaling roadmap'
					subtitle='Tell us your targets and current channel mix. We will identify where to protect spend, where to scale, and what to test next.'
					features={CONSULTATION_FEATURES}
					tagline='Start with practical priorities you can execute immediately across paid search and paid social.'
					formTitle='Tell us about your paid media goals'
					submitLabel='Request PPC Strategy Plan'
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
