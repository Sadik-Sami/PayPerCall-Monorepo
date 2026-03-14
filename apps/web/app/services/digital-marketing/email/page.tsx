import type { Metadata } from 'next';
import { ConsultationCTA } from '@/components/sections/services';
import {
	DigitalMarketingGrowthMatrixSection,
	EmailRoiEvolutionSection,
	EmailRetentionHero,
	type GrowthMatrixStep,
} from '@/components/sections/services/digital-marketing';

export const metadata: Metadata = {
	title: 'Email Marketing Services | Lifecycle Automation and Retention Revenue | PayPerCall',
	description:
		'Retention-focused email marketing programs for onboarding, nurture, winback, and reactivation. Build lifecycle automation that lifts repeat revenue.',
	alternates: { canonical: '/services/digital-marketing/email' },
	robots: { index: true, follow: true },
};

export const revalidate = 3600;

const CONSULTATION_FEATURES = [
	{
		title: 'Retention Opportunity Mapping',
		description: 'Pinpoint where subscriber drop-off, churn, and missed repeat-purchase opportunities are happening.',
		icon: 'Eye',
	},
	{
		title: 'Automation Sequence Planning',
		description: 'Define high-impact flows for welcome, nurture, cart recovery, post-purchase, and winback.',
		icon: 'Zap',
	},
	{
		title: 'Revenue-Linked Measurement',
		description: 'Set reporting around assisted revenue, repeat-order rate, and lifecycle conversion milestones.',
		icon: 'TrendingUp',
	},
];

const EMAIL_GROWTH_STEPS: GrowthMatrixStep[] = [
	{
		step: '01',
		title: 'Lifecycle Audit',
		description:
			'Assess list health, engagement decay, and flow coverage across welcome, nurture, cart recovery, and winback.',
		tagline: 'WEEK 1: BASELINE DIAGNOSTICS',
		icon: 'Search',
		theme: 'sky',
	},
	{
		step: '02',
		title: 'Segmentation Blueprint',
		description:
			'Define high-value audience segments by behavior, purchase recency, and intent signals to improve message relevance.',
		tagline: 'WEEK 2: AUDIENCE STRATEGY',
		icon: 'Settings2',
		theme: 'lilac',
	},
	{
		step: '03',
		title: 'Sequence Testing',
		description:
			'Run controlled tests on subject lines, offers, send timing, and sequence logic to validate what lifts retention.',
		tagline: 'WEEK 3-4: EXPERIMENTATION',
		icon: 'FlaskConical',
		theme: 'peach',
	},
	{
		step: '04',
		title: 'Retention Scale',
		description:
			'Deploy winning flows, automate reporting, and expand lifecycle programs to increase repeat revenue predictably.',
		tagline: 'WEEK 5+: SCALING EXECUTION',
		icon: 'Rocket',
		theme: 'mint',
	},
];

export default function EmailMarketingPage() {
	return (
		<main className='space-y-0'>
			<EmailRetentionHero />
			<div className='w-full bg-background'>
				<EmailRoiEvolutionSection className='py-12 md:py-16' />
			</div>
			<div className='w-full bg-muted/30'>
				<DigitalMarketingGrowthMatrixSection
					className='py-12 md:py-16'
					badgeLabel='Email Retention Sprint'
					title='The 4-Step Email Retention Growth Matrix'
					description='A structured lifecycle framework to improve deliverability, engagement quality, and repeat purchase performance.'
					steps={EMAIL_GROWTH_STEPS}
					ctaTitle='Ready to turn retention into predictable revenue?'
					ctaDescription='Apply this lifecycle sprint to close retention gaps, recover dormant demand, and scale high-performing automations.'
					primaryCta={{ label: 'Book Email Strategy Session', href: '#consultation' }}
					secondaryCta={{ label: 'Review Retention Priorities', href: '#consultation' }}
				/>
			</div>
			<div id='consultation' className='section-container py-12 md:py-16'>
				<ConsultationCTA
					category='digital-marketing'
					className='w-full'
					badge={{ label: 'Email Growth Consultation', icon: 'Check' }}
					title='Plan your lifecycle email growth system'
					subtitle='Share your current flows and goals. We will map your highest-impact retention opportunities and the sequence priorities to execute first.'
					features={CONSULTATION_FEATURES}
					tagline='No retainers required to start. Begin with a focused strategy consultation.'
					formTitle='Tell us about your email goals'
					submitLabel='Request Email Strategy Plan'
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
