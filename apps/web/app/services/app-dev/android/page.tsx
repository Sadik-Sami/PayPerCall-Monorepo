import FAQ from '@/components/sections/shared/FAQ';
import {
	CaseStudyStrip,
	ConsultationCTA,
} from '@/components/sections/services';
import type { Metadata } from 'next';
import { getCaseStudiesByCategory } from '@/lib/api/case-studies';
import { PastelFunnelHero, PastelBentoGrid } from '@/app/services/web-dev/_components';
import { PastelIntegrationsGrid } from '@workspace/ui/components/ui/pastel-integrations-grid';
import { ANDROID_DATA } from '@/lib/data/services/app-dev-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { HoverEffect } from '@workspace/ui/components/ui/card-hover-effect';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import { cn } from '@workspace/ui/lib/utils';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Android App Development Services | Native Android Apps | PayPerCall',
	description:
		'Expert Android app development. Native Android apps built with Kotlin and Jetpack Compose. Google Play Store optimization, Material Design, and deep device compatibility.',
	alternates: { canonical: '/services/app-dev/android' },
	robots: { index: true, follow: true },
};

const SECTION_PADDING = 'py-12 md:py-16';

export default async function AndroidAppDevPage() {
	const caseStudies = await getCaseStudiesByCategory('app-dev');
	return (
		<main className='space-y-0'>
			<PastelFunnelHero {...ANDROID_DATA.HERO} />

			<div className={cn("w-full bg-background pt-8 pb-16")}>
				<ClientsMarqueeStrip />
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<div className="mb-10 md:mb-16">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							Android outcomes backed by data
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
							Metrics that matter for Play Store success and user retention.
						</p>
					</div>
					<PastelBentoGrid outcomes={ANDROID_DATA.OUTCOMES} />
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="section-container">
					<div className="mb-10 md:mb-16">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
							Deliverables included with every Android build
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
							We ship production-ready Android apps with Google Play optimization and integrated security.
						</p>
					</div>
					<HoverEffect items={ANDROID_DATA.DELIVERABLES} />
				</div>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<Timeline
						title="Android development workflow"
						description="From OS strategy to Play Store publishing."
						data={ANDROID_DATA.PROCESS_STEPS.map((step, idx) => ({
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
						title="Android frameworks and services we work with"
						description="From Kotlin to Google Pay, we integrate your Android app deeply into the Google ecosystem."
						integrations={ANDROID_DATA.INTEGRATIONS}
					/>
				</div>
			</div>

			<div className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<CaseStudyStrip
						items={caseStudies}
						title='Representative Android engagements'
						description='Every Android build delivers measurable improvements in Google Play ratings, user engagement, and device compatibility.'
					/>
				</div>
			</div>

			<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
				<div className="section-container">
					<FAQ
						items={ANDROID_DATA.FAQ_ITEMS}
						variant="pastel"
						badge="Android App FAQ"
					/>
				</div>
			</div>

			<div id='consultation' className={cn("w-full bg-background", SECTION_PADDING)}>
				<div className="section-container">
					<ConsultationCTA
						category='app-dev'
						className='w-full'
						title='Start your Android project with a free consultation'
						bullets={[
							'Review app requirements and fragmentation needs.',
							'Kotlin & Jetpack Compose strategy and technical roadmap.',
							'Budget estimate and timeline with no obligation.',
						]}
						formVariant='detailed'
					/>
				</div>
			</div>
		</main>
	);
}
