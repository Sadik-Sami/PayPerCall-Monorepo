import type { Metadata } from 'next';
import { ConsultationCTA } from '@/components/sections/services';
import {
	DigitalMarketingGrowthMatrixSection,
	SeoAuthorityHero,
	type GrowthMatrixStep,
} from '@/components/sections/services/digital-marketing';

export const metadata: Metadata = {
	title: 'SEO Services | Technical SEO, Content Authority, and Organic Growth | PayPerCall',
	description:
		'SEO programs built for technical health, topic authority, and conversion-focused organic growth. Increase qualified search visibility and long-term pipeline.',
	alternates: { canonical: '/services/digital-marketing/seo' },
	robots: { index: true, follow: true },
};

export const revalidate = 3600;

const CONSULTATION_FEATURES = [
	{
		title: 'Technical Health Assessment',
		description: 'Identify crawl, indexation, performance, and information-architecture issues limiting search growth.',
		icon: 'Eye',
	},
	{
		title: 'Authority Content Roadmap',
		description: 'Map keyword clusters and content priorities to high-intent stages of your buyer journey.',
		icon: 'Zap',
	},
	{
		title: 'Revenue-Aligned SEO KPIs',
		description: 'Track progress beyond rankings with qualified traffic, conversion, and pipeline contribution metrics.',
		icon: 'TrendingUp',
	},
];

const SEO_GROWTH_STEPS: GrowthMatrixStep[] = [
	{
		step: '01',
		title: 'Technical Baseline',
		description:
			'Audit crawl/indexation health, site architecture, Core Web Vitals, and critical technical blockers impacting search visibility.',
		tagline: 'WEEK 1: TECHNICAL DIAGNOSTICS',
		icon: 'Search',
		theme: 'sky',
	},
	{
		step: '02',
		title: 'Authority Mapping',
		description:
			'Build topic clusters and content priorities aligned to buyer intent, SERP competition, and revenue potential.',
		tagline: 'WEEK 2: CONTENT STRATEGY',
		icon: 'Settings2',
		theme: 'lilac',
	},
	{
		step: '03',
		title: 'On-Page Validation',
		description:
			'Test page structure, internal links, metadata, and conversion messaging to improve both rankings and lead quality.',
		tagline: 'WEEK 3-4: ON-PAGE OPTIMIZATION',
		icon: 'FlaskConical',
		theme: 'peach',
	},
	{
		step: '04',
		title: 'Compounding Growth',
		description:
			'Scale winning templates and clusters while tracking qualified traffic, conversion impact, and pipeline contribution.',
		tagline: 'WEEK 5+: AUTHORITY EXPANSION',
		icon: 'Rocket',
		theme: 'mint',
	},
];

export default function SearchEngineOptimizationPage() {
	return (
		<main className='space-y-0'>
			<SeoAuthorityHero />
			<div className='w-full bg-muted/30'>
				<DigitalMarketingGrowthMatrixSection
					className='py-12 md:py-16'
					badgeLabel='SEO Authority Sprint'
					title='The 4-Step SEO Authority Matrix'
					description='A focused roadmap to fix technical constraints, build topical depth, and convert organic demand into qualified opportunities.'
					steps={SEO_GROWTH_STEPS}
					ctaTitle='Ready to own high-intent search demand?'
					ctaDescription='Implement this SEO sprint to prioritize the highest-impact fixes and build long-term organic growth momentum.'
					primaryCta={{ label: 'Book SEO Strategy Session', href: '#consultation' }}
					secondaryCta={{ label: 'Get SEO Priority Plan', href: '#consultation' }}
				/>
			</div>
			<div id='consultation' className='section-container py-12 md:py-16'>
				<ConsultationCTA
					category='digital-marketing'
					className='w-full'
					badge={{ label: 'SEO Strategy Consultation', icon: 'Check' }}
					title='Build your SEO growth roadmap'
					subtitle='Share your current organic performance and business goals. We will define the technical, content, and conversion priorities that drive meaningful lift.'
					features={CONSULTATION_FEATURES}
					tagline='Start with a focused SEO consultation and leave with clear execution priorities.'
					formTitle='Tell us about your SEO goals'
					submitLabel='Request SEO Strategy Plan'
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
