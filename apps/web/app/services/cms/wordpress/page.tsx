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
import { WORDPRESS_DATA } from '@/lib/data/services/cms-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import { PastelIntegrationsGrid } from '@workspace/ui/components/ui/pastel-integrations-grid';
import { cn } from '@workspace/ui/lib/utils';

export const metadata: Metadata = {
	title: 'WordPress Development Services | Custom Themes, Plugins & Security | PayPerCall',
	description:
		'Expert WordPress development: custom themes, plugin development, WooCommerce integration, and security hardening for scalable, SEO-ready sites.',
	alternates: { canonical: '/services/cms/wordpress' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'WordPress Development Services | Custom Themes, Plugins & Security',
		description:
			'Custom WordPress development with security hardening, WooCommerce integration, and plugin development.',
		url: '/services/cms/wordpress',
		images: [
			{
				url: '/images/slider/slider-2.webp',
				width: 1200,
				height: 630,
				alt: 'WordPress development services',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'WordPress Development Services',
		description: 'Custom WordPress themes, plugins, WooCommerce, and security hardening.',
		images: ['/images/slider/slider-2.jpg'],
	},
	keywords: [
		'wordpress development',
		'custom wordpress themes',
		'wordpress plugin development',
		'woocommerce development',
		'wordpress security',
		'wordpress multisite',
	],
};

const SECTION_PADDING = 'py-12 md:py-16';

export default function WordPressPage() {
	return (
		<main className='space-y-0'>
			<PastelFunnelHero {...WORDPRESS_DATA.HERO} />

			<div className={cn("w-full bg-background pt-8 pb-16")}>
				<ClientsMarqueeStrip />
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col items-center text-center mb-12 md:mb-16">
						<h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-4">
							WordPress outcomes backed by data
						</h2>
						<p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-body max-w-2xl">
							Metrics that matter for custom, high-performance themes.
						</p>
					</div>
					<PastelBentoGrid outcomes={WORDPRESS_DATA.OUTCOMES} />
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<TrendingUp
					className="max-w-7xl mx-auto"
					title="WordPress adoption trends"
					description="Why the majority of the web still relies on the open-source power of WordPress."
					metrics={WORDPRESS_DATA.TRENDING_METRICS}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<Timeline
					className="max-w-7xl mx-auto"
					title='WordPress development workflow'
					description='Clear milestones from blueprint to production launch.'
					data={WORDPRESS_DATA.TIMELINE_STEPS.map((s) => ({
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
					className="max-w-7xl mx-auto"
					title="WordPress ecosystem"
					description="Leading plugins, optimization tools, and integrations we implement."
					integrations={WORDPRESS_DATA.INTEGRATIONS}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<ServiceComparison
					className="max-w-7xl mx-auto"
					title="Custom WordPress advantages"
					subtitle="Why custom development beats pre-built theme templates."
					tiers={WORDPRESS_DATA.COMPARISON_TIERS}
					features={WORDPRESS_DATA.COMPARISON_FEATURES}
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<CaseStudyStrip
					className="max-w-7xl mx-auto"
					items={WORDPRESS_DATA.CASE_STUDIES.map(mapCaseStudyToCard)}
					title='WordPress development success stories'
					description='Brands achieving scale and speed with our custom themes and security hardening.'
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<FAQ
					variant="pastel"
					title="WordPress FAQ"
					description="Common questions about our custom WordPress development process."
					className="max-w-7xl mx-auto"
					items={WORDPRESS_DATA.FAQ_ITEMS}
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<ConsultationCTA
						category='cms'
						className='w-full'
						title='Start your WordPress project with a free architecture review'
						bullets={[
							'Review current site, plugin stack, and performance bottlenecks.',
							'Security audit and infrastructure recommendations.',
							'Budget estimate for custom theme and plugin development.',
						]}
						formVariant='detailed'
					/>
				</div>
			</div>
		</main>
	);
}
