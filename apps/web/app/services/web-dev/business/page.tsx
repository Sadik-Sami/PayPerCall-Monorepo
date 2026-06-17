import FAQ from '@/components/sections/shared/FAQ';
import {
	CaseStudyStrip,
	ConsultationCTA,
	ServiceComparison,
	TrendingUp,
} from '@/components/sections/services';
import type { Metadata } from 'next';
import { mapCaseStudyToCard } from '@/lib/utils/case-study-mapper';
import { PastelFunnelHero, PastelBentoGrid } from '../_components';
import { BUSINESS_DATA } from '@/lib/data/services/web-dev-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import { cn } from '@workspace/ui/lib/utils';

export const metadata: Metadata = {
	title: 'Business Website Development for B2B Companies | PayPerCall',
	description:
		'B2B websites built for measurable lead quality: SEO + schema, CMS governance, analytics instrumentation, and CRM routing.',
	alternates: { canonical: '/services/web-dev/business' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Business Website Development for B2B Companies',
		description: 'Websites designed to support sales with trust signals, search visibility, and measurable funnels.',
		url: '/services/web-dev/business',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Business Website Development for B2B Companies',
	},
};
const SECTION_PADDING = 'py-12 md:py-16';

export default function BusinessWebsitesPage() {
	return (
		<main className='space-y-0'>
			<PastelFunnelHero {...BUSINESS_DATA.HERO} />

			<div className={cn("w-full bg-background pt-8 pb-16")}>
				<ClientsMarqueeStrip />
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<div className="mb-10 md:mb-16">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							B2B website results in clean leads
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
							Measured through lead quality and sales engagement rates.
						</p>
					</div>
					<PastelBentoGrid outcomes={BUSINESS_DATA.OUTCOMES} />
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<TrendingUp
					className="max-w-7xl mx-auto"
					title='How B2B buying behavior is shifting'
					description='The digital-first B2B buyer is now the norm. Sites that adapt to self-directed research and clear proof points win.'
					metrics={BUSINESS_DATA.TRENDING_METRICS}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<Timeline
					className="max-w-7xl mx-auto"
					title="Structured delivery for corporate sites"
					data={BUSINESS_DATA.PROCESS_STEPS.map((s, i) => ({
						title: `0${i + 1} · ${s.title}`,
						content: (
							<p className="font-medium text-foreground leading-relaxed">{s.description}</p>
						)
					}))}
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<ServiceComparison
					className="max-w-7xl mx-auto"
					title='Choose your business website tier'
					subtitle='All tiers include strategy consultation, launch support, and ongoing CMS training.'
					tiers={BUSINESS_DATA.COMPARISON_TIERS}
					features={BUSINESS_DATA.COMPARISON_FEATURES}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<CaseStudyStrip
					className="max-w-7xl mx-auto"
					items={BUSINESS_DATA.CASE_STUDIES.map(mapCaseStudyToCard)}
					title='Case studies focused on outcomes executives value'
				/>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<FAQ
					variant="pastel"
					badge="Business Websites FAQ"
					description="Common questions about our B2B website development process and capabilities."
					className="max-w-7xl mx-auto"
					items={BUSINESS_DATA.FAQ_ITEMS}
				/>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="max-w-7xl mx-auto px-4 md:px-8">
					<ConsultationCTA
						category='web-dev'
						className='w-full'
						title='Request an evidence-based website review'
						bullets={[
							'Get a quick audit across UX, SEO, and trust signals.',
							'See the top fixes to schedule next release.',
							'Walk away with timeline and budget ranges.',
						]}
						formVariant='detailed'
					/>
				</div>
			</div>
		</main>
	);
}
