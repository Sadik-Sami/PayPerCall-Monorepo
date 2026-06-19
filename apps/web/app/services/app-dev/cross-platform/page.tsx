import FAQ from '@/components/sections/shared/FAQ';
import {
	CaseStudyStrip,
	ConsultationCTA,
} from '@/components/sections/services';
import type { Metadata } from 'next';
import { getCaseStudiesByCategory } from '@/lib/api/case-studies';
import { PastelFunnelHero, PastelBentoGrid } from '@/app/services/web-dev/_components';
import { PastelIntegrationsGrid } from '@workspace/ui/components/ui/pastel-integrations-grid';
import { CROSS_PLATFORM_DATA } from '@/lib/data/services/app-dev-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { HoverEffect } from '@workspace/ui/components/ui/card-hover-effect';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import { cn } from '@workspace/ui/lib/utils';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Cross-Platform App Development | React Native & Flutter | PayPerCall',
	description:
		'Expert cross-platform app development: React Native and Flutter apps that reach iOS and Android from one codebase. Faster time-to-market and deep code reuse.',
	alternates: { canonical: '/services/app-dev/cross-platform' },
	robots: { index: true, follow: true },
};

const SECTION_PADDING = 'py-12 md:py-16';

export default async function CrossPlatformAppDevPage() {
	const caseStudies = await getCaseStudiesByCategory('app-dev');
	return (
		<main className='space-y-0'>
			<PastelFunnelHero {...CROSS_PLATFORM_DATA.HERO} />
			
			<div className={cn("w-full bg-background pt-8 pb-16")}>
				<ClientsMarqueeStrip />
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<div className="mb-10 md:mb-16">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							Cross-platform outcomes backed by data
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
							Metrics that matter for efficient dual-platform app development.
						</p>
					</div>
					<PastelBentoGrid outcomes={CROSS_PLATFORM_DATA.OUTCOMES} />
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="section-container">
					<div className="mb-10 md:mb-16">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							Deliverables included with every cross-platform build
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
							We ship production-ready apps with dual-store optimization and native module integration.
						</p>
					</div>
					<HoverEffect items={CROSS_PLATFORM_DATA.DELIVERABLES} />
				</div>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<Timeline 
						title="Cross-platform development workflow"
						description="From framework selection to dual store launch."
						data={CROSS_PLATFORM_DATA.PROCESS_STEPS.map((step, idx) => ({
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
						title="Cross-platform frameworks and services we work with"
						description="From React Native to Flutter, we build robust cross-platform apps with the tools that fit your exact needs."
						integrations={CROSS_PLATFORM_DATA.INTEGRATIONS} 
					/>
				</div>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<CaseStudyStrip
						items={caseStudies}
						title='Representative cross-platform engagements'
						description='Every cross-platform build delivers measurable improvements in development efficiency, time-to-market, and business scalability.'
					/>
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="section-container">
					<FAQ 
						items={CROSS_PLATFORM_DATA.FAQ_ITEMS} 
						variant="pastel"
						badge="Cross-Platform FAQ"
					/>
				</div>
			</div>

			<div id='consultation' className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<ConsultationCTA
						category='app-dev'
						className='w-full'
						title='Start your cross-platform project with a free framework consultation'
						bullets={[
							'Review app requirements and platform needs.',
							'React Native vs Flutter recommendation and technical roadmap.',
							'Budget estimate and timeline with no obligation.',
						]}
						formVariant='detailed'
					/>
				</div>
			</div>
		</main>
	);
}
