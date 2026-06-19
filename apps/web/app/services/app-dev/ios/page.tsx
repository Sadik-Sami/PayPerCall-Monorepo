import FAQ from '@/components/sections/shared/FAQ';
import {
	CaseStudyStrip,
	ConsultationCTA,
} from '@/components/sections/services';
import type { Metadata } from 'next';
import { getCaseStudiesByCategory } from '@/lib/api/case-studies';
import { PastelFunnelHero, PastelBentoGrid } from '@/app/services/web-dev/_components';
import { PastelIntegrationsGrid } from '@workspace/ui/components/ui/pastel-integrations-grid';
import { IOS_DATA } from '@/lib/data/services/app-dev-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { HoverEffect } from '@workspace/ui/components/ui/card-hover-effect';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import { cn } from '@workspace/ui/lib/utils';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'iOS App Development Services | Native Swift Apps | PayPerCall',
	description:
		'Expert iOS app development services. Native Swift and SwiftUI apps built for App Store success, high performance, and Apple ecosystem integration.',
	alternates: { canonical: '/services/app-dev/ios' },
	robots: { index: true, follow: true },
};

const SECTION_PADDING = 'py-12 md:py-16';

export default async function IosAppDevPage() {
	const caseStudies = await getCaseStudiesByCategory('app-dev');
	return (
		<main className='space-y-0'>
			<PastelFunnelHero {...IOS_DATA.HERO} />
			
			<div className={cn("w-full bg-background pt-8 pb-16")}>
				<ClientsMarqueeStrip />
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<div className="mb-10 md:mb-16">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							iOS outcomes backed by data
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
							Metrics that matter for App Store success.
						</p>
					</div>
					<PastelBentoGrid outcomes={IOS_DATA.OUTCOMES} />
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="section-container">
					<div className="mb-10 md:mb-16">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							Deliverables included with every iOS build
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
							We ship production-ready iOS apps with App Store optimization and native Apple integrations.
						</p>
					</div>
					<HoverEffect items={IOS_DATA.DELIVERABLES} />
				</div>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<Timeline 
						title="iOS development workflow"
						description="From discovery to App Store publishing."
						data={IOS_DATA.PROCESS_STEPS.map((step, idx) => ({
							title: `Phase ${idx + 1}`,
							content: (
								<div className="space-y-4">
									<h3 className="text-xl font-bold text-foreground">{step.title}</h3>
									<p className="text-muted-foreground leading-relaxed">
										{step.description}
									</p>
								</div>
							)
						}))} 
					/>
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="section-container">
					<PastelIntegrationsGrid 
						title="iOS frameworks and services we work with"
						description="From SwiftUI to Apple Pay, we integrate your iOS app with the Apple ecosystem."
						integrations={IOS_DATA.INTEGRATIONS} 
					/>
				</div>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<CaseStudyStrip
						items={caseStudies}
						title='Representative iOS engagements'
						description='Every iOS build delivers measurable improvements in App Store ratings, user engagement, and business outcomes.'
					/>
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="section-container">
					<FAQ 
						items={IOS_DATA.FAQ_ITEMS} 
						variant="pastel"
						badge="iOS App FAQ"
					/>
				</div>
			</div>

			<div id='consultation' className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<ConsultationCTA
						category='app-dev'
						className='w-full'
						title='Start your iOS project with a free strategy session'
						bullets={[
							'Review app requirements and iOS platform needs.',
							'SwiftUI recommendation and technical roadmap.',
							'Budget estimate and timeline with no obligation.',
						]}
						formVariant='detailed'
					/>
				</div>
			</div>
		</main>
	);
}
