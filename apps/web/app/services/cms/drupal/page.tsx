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
import { DRUPAL_DATA } from '@/lib/data/services/cms-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import { PastelIntegrationsGrid } from '@workspace/ui/components/ui/pastel-integrations-grid';
import { cn } from '@workspace/ui/lib/utils';

export const metadata: Metadata = {
	title: 'Drupal Development Services | Enterprise CMS & Multi-Site | PayPerCall',
	description:
		'Enterprise Drupal development for complex content workflows, multi-site management, and high-security requirements. HIPAA and SOC 2 aligned.',
	alternates: { canonical: '/services/cms/drupal' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Drupal Development Services | Enterprise CMS & Multi-Site',
		description:
			'Enterprise Drupal for complex content, multi-site architecture, and compliance (HIPAA, SOC 2, GDPR).',
		url: '/services/cms/drupal',
		images: [
			{
				url: '/images/slider/slider-3.webp',
				width: 1200,
				height: 630,
				alt: 'Drupal enterprise development',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Drupal Development Services',
		description: 'Enterprise Drupal for security, compliance, and multi-site management.',
		images: ['/images/slider/slider-3.jpg'],
	},
	keywords: [
		'drupal development',
		'enterprise drupal',
		'drupal multisite',
		'drupal security',
		'drupal 10',
		'headless drupal',
		'drupal compliance',
	],
};

const SECTION_PADDING = 'py-12 md:py-16';

export default async function DrupalPage() {
	const caseStudies = await getCaseStudiesByCategory('cms');
	return (
		<main className='space-y-0'>
			<PastelFunnelHero {...DRUPAL_DATA.HERO} />

			<div className={cn("w-full bg-background pt-8 pb-16")}>
				<ClientsMarqueeStrip />
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<div className="flex flex-col items-center text-center mb-12 md:mb-16">
						<h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-4">
							Enterprise Drupal outcomes backed by data
						</h2>
						<p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-body max-w-2xl">
							Metrics that matter for large-scale content platforms.
						</p>
					</div>
					<PastelBentoGrid outcomes={DRUPAL_DATA.OUTCOMES} />
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<TrendingUp
					className="section-container"
					title="Drupal adoption trends"
					description="Why Drupal remains the standard for complex data structures and strict compliance."
					metrics={DRUPAL_DATA.TRENDING_METRICS}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<Timeline
					className="section-container"
					title='Enterprise Drupal implementation timeline'
					description='Clear milestones from requirements to production launch.'
					data={DRUPAL_DATA.TIMELINE_STEPS.map((s) => ({
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
					title="Drupal integrations"
					description="From Acquia to SAML authentication, we connect Drupal to enterprise systems."
					integrations={DRUPAL_DATA.INTEGRATIONS}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<ServiceComparison
					className="section-container"
					title="Drupal vs alternatives"
					subtitle="Comparing Drupal's architecture against standard CMS constraints."
					tiers={DRUPAL_DATA.COMPARISON_TIERS}
					features={DRUPAL_DATA.COMPARISON_FEATURES}
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<CaseStudyStrip
					className="section-container"
					items={caseStudies}
					title='Enterprise Drupal engagements'
					description='Every Drupal build delivers security, compliance, and operational efficiency.'
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<FAQ
					variant="pastel"
					title="Drupal FAQ"
					description="Common questions about our enterprise Drupal services."
					className="section-container"
					items={DRUPAL_DATA.FAQ_ITEMS}
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<ConsultationCTA
						category='cms'
						className='w-full'
						title='Start your Drupal project with a free architecture review'
						bullets={[
							'Review content model, workflows, and compliance requirements.',
							'Multi-site architecture recommendations if applicable.',
							'Budget estimate and implementation timeline.',
						]}
						formVariant='detailed'
					/>
				</div>
			</div>
		</main>
	);
}
