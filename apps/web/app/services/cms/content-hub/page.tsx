import FAQ from '@/components/sections/shared/FAQ';
import {
	CaseStudyStrip,
	ConsultationCTA,
	ServiceComparison,
	TrendingUp,
} from '@/components/sections/services';
import type { Metadata } from 'next';
import { getCaseStudiesByCategory } from '@/lib/api/case-studies';
import { PastelFunnelHero, PastelBentoGrid } from '../../web-dev/_components';
import { HEADLESS_DATA } from '@/lib/data/services/cms-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import { PastelIntegrationsGrid } from '@workspace/ui/components/ui/pastel-integrations-grid';
import { cn } from '@workspace/ui/lib/utils';

export const metadata: Metadata = {
	title: 'Headless CMS Development | Contentful, Sanity, Strapi | PayPerCall',
	description:
		'API-first headless CMS architecture with Contentful, Sanity, or Strapi for omnichannel content delivery. GraphQL and REST APIs for modern stacks.',
	alternates: { canonical: '/services/cms/content-hub' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Headless CMS Development | Contentful, Sanity, Strapi',
		description:
			'API-first headless CMS for omnichannel content delivery with GraphQL and REST APIs.',
		url: '/services/cms/content-hub',
		images: [
			{
				url: '/images/slider/slider-1.webp',
				width: 1200,
				height: 630,
				alt: 'Headless CMS development',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Headless CMS Development',
		description: 'API-first content hubs for omnichannel experiences.',
		images: ['/images/slider/slider-1.jpg'],
	},
	keywords: [
		'headless cms',
		'contentful development',
		'sanity cms',
		'strapi development',
		'api-first cms',
		'omnichannel content',
		'graphql cms',
	],
};

const SECTION_PADDING = 'py-12 md:py-16';

export default async function ContentHubPage() {
	const caseStudies = await getCaseStudiesByCategory('cms');
	return (
		<main className='space-y-0'>
			<PastelFunnelHero {...HEADLESS_DATA.HERO} />

			<div className={cn("w-full bg-background pt-8 pb-16")}>
				<ClientsMarqueeStrip />
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<div className="flex flex-col items-center text-center mb-12 md:mb-16">
						<h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-4">
							Headless outcomes backed by data
						</h2>
						<p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-body max-w-2xl">
							Metrics that matter for API-first content platforms.
						</p>
					</div>
					<PastelBentoGrid outcomes={HEADLESS_DATA.OUTCOMES} />
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<TrendingUp
					className="section-container"
					title="Headless CMS adoption trends"
					description="The shift to API-first content infrastructure is accelerating across enterprises."
					metrics={HEADLESS_DATA.TRENDING_METRICS}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<Timeline
					className="section-container"
					title='Headless CMS implementation timeline'
					description='From platform selection to production APIs.'
					data={HEADLESS_DATA.TIMELINE_STEPS.map((s) => ({
						title: s.title,
						content: (
							<div className='space-y-4'>
								<p className='font-medium text-foreground'>{s.description}</p>
								<ul className='space-y-2'>
									{s.details.map((detail, idx) => (
										<li key={idx} className='flex items-center text-muted-foreground'>
											<span className='w-1.5 h-1.5 rounded-full bg-primary/60 mr-3' />
											{detail}
										</li>
									))}
								</ul>
							</div>
						),
					}))}
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<PastelIntegrationsGrid
					className="section-container"
					title="Headless ecosystem"
					description="Leading platforms, frontend frameworks, and API technologies we implement."
					integrations={HEADLESS_DATA.INTEGRATIONS}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<ServiceComparison
					className="section-container"
					title="Headless CMS advantages"
					subtitle="Why leading development teams are choosing API-first content architectures."
					tiers={HEADLESS_DATA.COMPARISON_TIERS}
					features={HEADLESS_DATA.COMPARISON_FEATURES}
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<CaseStudyStrip
					className="section-container"
					items={caseStudies}
					title='Headless CMS transformations'
					description='Omnichannel content delivery with API-first architecture.'
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<FAQ
					variant="pastel"
					title="Headless CMS FAQ"
					description="Common questions about our headless CMS implementation services."
					className="section-container"
					items={HEADLESS_DATA.FAQ_ITEMS}
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<ConsultationCTA
						category='cms'
						className='w-full'
						title='Start your headless CMS project with a free platform comparison'
						bullets={[
							'Compare Contentful, Sanity, and Strapi for your use case.',
							'Review content model and channel requirements.',
							'Budget estimate with platform subscription costs included.',
						]}
						formVariant='detailed'
					/>
				</div>
			</div>
		</main>
	);
}
