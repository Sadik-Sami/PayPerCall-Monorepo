import FAQ from '@/components/sections/shared/FAQ';
import {
	CaseStudyStrip,
	ConsultationCTA,
	ServiceComparison,
	TrendingUp,
} from '@/components/sections/services';
import type { Metadata } from 'next';
import { mapCaseStudyToCard } from '@/lib/utils/case-study-mapper';
import { PastelFunnelHero, PastelBentoGrid } from '../../web-dev/_components';
import { WIX_STUDIO_DATA } from '@/lib/data/services/cms-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import { PastelIntegrationsGrid } from '@workspace/ui/components/ui/pastel-integrations-grid';
import { cn } from '@workspace/ui/lib/utils';

export const metadata: Metadata = {
	title: 'Wix Studio Development | Fast Business Website Launches | PayPerCall',
	description:
		'Professional Wix Studio websites for small businesses. Managed hosting, visual builder, and SEO tools. Launch in 2 weeks from $3k.',
	alternates: { canonical: '/services/cms/wix-studio' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Wix Studio Development | Fast Business Website Launches',
		description: 'Professional Wix sites with managed hosting and SEO tools. Launch in 2 weeks.',
		url: '/services/cms/wix-studio',
		images: [
			{
				url: '/images/slider/slider-2.webp',
				width: 1200,
				height: 630,
				alt: 'Wix Studio development',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Wix Studio Development',
		description: 'Fast website launches for small businesses with Wix Studio.',
		images: ['/images/slider/slider-2.jpg'],
	},
	keywords: [
		'wix studio',
		'wix development',
		'wix website',
		'small business website',
		'wix ecommerce',
		'wix velo',
		'fast website launch',
	],
};

const SECTION_PADDING = 'py-12 md:py-16';

export default function WixStudioPage() {
	return (
		<main className='space-y-0'>
			<PastelFunnelHero {...WIX_STUDIO_DATA.HERO} />

			<div className={cn("w-full bg-background pt-8 pb-16")}>
				<ClientsMarqueeStrip />
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<div className="flex flex-col items-center text-center mb-12 md:mb-16">
						<h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-4">
							Wix Studio outcomes backed by data
						</h2>
						<p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-body max-w-2xl">
							Metrics that matter for agile website launches.
						</p>
					</div>
					<PastelBentoGrid outcomes={WIX_STUDIO_DATA.OUTCOMES} />
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<TrendingUp
					className="section-container"
					title="Wix Studio performance trends"
					description="Why agencies and brands are moving to high-end visual development."
					metrics={WIX_STUDIO_DATA.TRENDING_METRICS}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<Timeline
					className="section-container"
					title='Fast Wix Studio workflow'
					description='Streamlined process from design to launch in just weeks.'
					data={WIX_STUDIO_DATA.TIMELINE_STEPS.map((s) => ({
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
					title="Wix apps and integrations"
					description="Extend your Wix site with apps from the Wix marketplace and custom Velo integrations."
					integrations={WIX_STUDIO_DATA.INTEGRATIONS}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<ServiceComparison
					className="section-container"
					title="Wix Studio advantages"
					subtitle="Comparing Wix Studio's capabilities against standard web builders."
					tiers={WIX_STUDIO_DATA.COMPARISON_TIERS}
					features={WIX_STUDIO_DATA.COMPARISON_FEATURES}
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<CaseStudyStrip
					className="section-container"
					items={WIX_STUDIO_DATA.CASE_STUDIES.map(mapCaseStudyToCard)}
					title='Wix Studio success stories'
					description='Brands launching fast with professional, animated Wix sites.'
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<FAQ
					variant="pastel"
					title="Wix Studio FAQ"
					description="Common questions about our agile Wix Studio development services."
					className="section-container"
					items={WIX_STUDIO_DATA.FAQ_ITEMS}
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<ConsultationCTA
						category='cms'
						className='w-full'
						title='Start your Wix Studio project with a free consultation'
						bullets={[
							'Discuss your business website needs and design ideas.',
							'Review Wix capabilities, animations, and Velo logic.',
							'Budget estimate and launch timeline (typically 2-4 weeks).',
						]}
						formVariant='detailed'
					/>
				</div>
			</div>
		</main>
	);
}
