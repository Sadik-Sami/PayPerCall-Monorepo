import FAQ from '@/components/sections/shared/FAQ';
import {
	CaseStudyStrip,
	ConsultationCTA,
} from '@/components/sections/services';
import type { Metadata } from 'next';
import { getCaseStudiesByCategory } from '@/lib/api/case-studies';
import { PastelFunnelHero, PastelBentoGrid } from '../_components';
import { LANDING_PAGE_DATA } from '@/lib/data/services/web-dev-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { HoverEffect } from '@workspace/ui/components/ui/card-hover-effect';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import { cn } from '@workspace/ui/lib/utils';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Landing Page Development | Conversion Tracking and A/B Testing | PayPerCall',
	description:
		'High-velocity landing pages built for measurable results: fast performance, conversion-focused structure, event tracking, and A/B test readiness.',
	alternates: { canonical: '/services/web-dev/landing-page' },
	robots: { index: true, follow: true },
};

const SECTION_PADDING = 'py-12 md:py-16';

export default async function LandingPageWebDevPage() {
	const caseStudies = await getCaseStudiesByCategory('web-dev');
	return (
		<main className='space-y-0'>
			<PastelFunnelHero {...LANDING_PAGE_DATA.HERO} />
			
			<div className={cn("w-full bg-background pt-8 pb-16")}>
				<ClientsMarqueeStrip />
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<div className="mb-10 md:mb-16">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							Landing page results that drive campaigns
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
							Conversion rates and speed matter equally.
						</p>
					</div>
					<PastelBentoGrid outcomes={LANDING_PAGE_DATA.OUTCOMES} />
				</div>
			</div>
			
			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<Timeline
					className="section-container"
					title="Landing page delivery model"
					data={LANDING_PAGE_DATA.PROCESS_STEPS.map((s, i) => ({
						title: `0${i + 1} · ${s.title}`,
						content: (
							<p className="font-medium text-foreground leading-relaxed">{s.description}</p>
						)
					}))}
				/>
			</div>
			
			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<div className="mb-10 md:mb-16">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							Conversion improvements across campaign types
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
							Real CPL, registration, and signup rate improvements.
						</p>
					</div>
					<HoverEffect 
						items={LANDING_PAGE_DATA.RESULTS.map((r, i) => ({
							id: r.label + i,
							title: r.label,
							description: `${r.improvement} (from ${r.before} to ${r.after}). ${r.context}`,
							link: '#'
						}))}
					/>
				</div>
			</div>
			
			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<CaseStudyStrip
					className="section-container"
					items={caseStudies}
					title='Conversion lifts backed by data'
				/>
			</div>
			
			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<FAQ
					variant="pastel"
					badge="Landing Pages FAQ"
					description="Common questions about our landing page development and optimization."
					className="section-container"
					items={LANDING_PAGE_DATA.FAQ_ITEMS} 
				/>
			</div>
			
			<div id='consultation' className={cn("w-full bg-muted/30 scroll-mt-24", SECTION_PADDING)}>
				<div className="section-container">
					<ConsultationCTA
						category='web-dev'
						className='w-full'
						title='Highlight your next campaign with a free planning call'
						bullets={[
							'Share the offer, KPI, and traffic plan in plain language.',
							'See wireframe and copy patterns that already convert.',
							'Leave with scope, price range, and launch timeline.',
						]}
						formVariant='short'
					/>
				</div>
			</div>
		</main>
	);
}
