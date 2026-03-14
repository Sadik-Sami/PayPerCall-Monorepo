import type { Metadata } from 'next';
import { ConsultationCTA } from '@/components/sections/services';
import {
	DigitalMarketingGrowthMatrixSection,
	SocialSignalHero,
	SocialSignalEvolutionSection,
	type GrowthMatrixStep,
} from '@/components/sections/services/digital-marketing';

export const metadata: Metadata = {
	title: 'Social Media Marketing Services | Brand Signal and Demand Generation | PayPerCall',
	description:
		'Social media programs that strengthen brand signal, improve audience engagement, and convert attention into pipeline with channel-specific strategy.',
	alternates: { canonical: '/services/digital-marketing/social' },
	robots: { index: true, follow: true },
};

export const revalidate = 3600;

const CONSULTATION_FEATURES = [
	{
		title: 'Channel Strategy Alignment',
		description: 'Define the role of each platform across awareness, consideration, and conversion goals.',
		icon: 'MessageSquare',
	},
	{
		title: 'Content and Offer Planning',
		description: 'Build a content cadence and offer framework that improves signal quality and response rate.',
		icon: 'Flame',
	},
	{
		title: 'Engagement-to-Pipeline Tracking',
		description: 'Connect social performance to meaningful business metrics and downstream revenue outcomes.',
		icon: 'TrendingUp',
	},
];

const SOCIAL_GROWTH_STEPS: GrowthMatrixStep[] = [
	{
		step: '01',
		title: 'Signal Audit',
		description:
			'Evaluate platform performance, audience quality, and narrative consistency to identify authority and demand gaps.',
		tagline: 'WEEK 1: CHANNEL DIAGNOSTICS',
		icon: 'Search',
		theme: 'sky',
	},
	{
		step: '02',
		title: 'Content System Design',
		description:
			'Build channel-specific messaging pillars, publishing cadence, and offer alignment for sustained engagement.',
		tagline: 'WEEK 2: STRATEGY ARCHITECTURE',
		icon: 'Settings2',
		theme: 'lilac',
	},
	{
		step: '03',
		title: 'Format + Creative Testing',
		description:
			'Run experiments on hooks, visuals, and distribution patterns to improve reach quality and intent capture.',
		tagline: 'WEEK 3-4: CREATIVE VALIDATION',
		icon: 'FlaskConical',
		theme: 'peach',
	},
	{
		step: '04',
		title: 'Demand Acceleration',
		description:
			'Scale high-performing plays, integrate paid support, and connect social performance to downstream pipeline metrics.',
		tagline: 'WEEK 5+: SIGNAL AMPLIFICATION',
		icon: 'Rocket',
		theme: 'mint',
	},
];

export default function SocialMediaMarketingPage() {
	return (
		<main className='space-y-0'>
			<SocialSignalHero />
			<div className='w-full bg-background'>
				<SocialSignalEvolutionSection className='py-12 md:py-16' />
			</div>
			<div className='w-full bg-muted/30'>
				<DigitalMarketingGrowthMatrixSection
					className='py-12 md:py-16'
					badgeLabel='Social Authority Sprint'
					title='The 4-Step Social Demand Matrix'
					description='A repeatable system to strengthen brand signal, improve qualified engagement, and convert social attention into pipeline growth.'
					steps={SOCIAL_GROWTH_STEPS}
					ctaTitle='Want social channels to produce measurable demand?'
					ctaDescription='Deploy this sprint structure to turn fragmented posting into a coherent social growth engine tied to business outcomes.'
					primaryCta={{ label: 'Book Social Strategy Session', href: '#consultation' }}
					secondaryCta={{ label: 'Get Social Growth Priorities', href: '#consultation' }}
				/>
			</div>
			<div id='consultation' className='section-container py-12 md:py-16 lg:py-20'>
				<ConsultationCTA
					category='digital-marketing'
					className='w-full'
					badge={{ label: 'Social Growth Consultation', icon: 'Check' }}
					title='Plan your social demand generation strategy'
					subtitle='Tell us your audience, channels, and growth targets. We will map the fastest path to stronger brand signal and better conversion outcomes.'
					features={CONSULTATION_FEATURES}
					tagline='Start with a practical consultation focused on your highest-impact social opportunities.'
					formTitle='Tell us about your social media goals'
					submitLabel='Request Social Strategy Plan'
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
