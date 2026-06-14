import type { Metadata } from 'next';
import { InfiniteSlider } from '@workspace/ui/components/infinite-slider';
import { ConsultationCTA, ImageContentSplit, StrategicBlueprintSection, TestimonialsSection } from '@/components/sections/services';
import FAQ from '@/components/sections/shared/FAQ';
import { StickyCTA } from '@/components/sections/shared/StickyCTA';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { KineticHero } from '@/components/sections/services/graphics-design/KineticHero';
import { CapabilitiesBento } from '@/components/sections/services/graphics-design/CapabilitiesBento';
import { WorkMosaic } from '@/components/sections/services/graphics-design/WorkMosaic';
import { EngagementTiers } from '@/components/sections/services/graphics-design/EngagementTiers';
import { DesignPrinciples } from '@/components/sections/services/graphics-design/DesignPrinciples';
import { CrossLinkBand } from '@/components/sections/services/graphics-design/CrossLinkBand';
import {
	HERO,
	CAPABILITIES,
	MARQUEE_DISCIPLINES,
	WORK,
	BLUEPRINT,
	STORY_ONE,
	STORY_TWO,
	PRINCIPLES,
	ENGAGEMENT,
	TESTIMONIALS,
	CROSS_LINK,
	FAQS,
	CONSULTATION,
	STICKY,
	SECTION_PADDING,
	graphicsDesignJsonLd,
} from './_data/graphics-design-content';

export const metadata: Metadata = {
	title: 'Graphics Design for Performance Marketing | Core Closer',
	description:
		'Conversion-focused graphic design for paid-media operators: brand systems, landing pages, ad creative, and design systems built to make your funnel sell.',
	alternates: { canonical: '/services/graphics-design' },
	robots: { index: true, follow: true },
	openGraph: {
		title: 'Graphics Design for Performance Marketing',
		description:
			'Conversion-focused graphic design for paid-media operators: brand systems, landing pages, ad creative, and design systems built to make your funnel sell.',
		type: 'website',
		url: 'https://corecloser.com/services/graphics-design',
	},
};

export const revalidate = 3600;

export default function GraphicsDesignPage() {
	return (
		<main className='min-h-screen'>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(graphicsDesignJsonLd) }}
			/>

			<KineticHero
				eyebrow={HERO.eyebrow}
				lines={HERO.lines}
				accent={HERO.accent}
				accentColour={HERO.accentColour}
				subDeck={HERO.subDeck}
				primaryCta={HERO.primaryCta}
				secondaryCta={HERO.secondaryCta}
				badges={HERO.badges}
				marqueeTokens={HERO.marqueeTokens}
				haloAccents={HERO.haloAccents}
			/>

			<div className='w-full bg-muted/30'>
				<ClientsMarqueeStrip />
			</div>

			<div className='w-full bg-background'>
				<CapabilitiesBento
					className={SECTION_PADDING}
					eyebrow={CAPABILITIES.eyebrow}
					headline={CAPABILITIES.headline}
					description={CAPABILITIES.description}
					tiles={CAPABILITIES.tiles}
				/>
			</div>

			<section aria-hidden className='relative w-full overflow-hidden border-y border-border/40 bg-muted/40 py-6'>
				<InfiniteSlider gap={48} speed={36} speedOnHover={12}>
					{MARQUEE_DISCIPLINES.map((token, i) => (
						<div
							key={`${token}-${i}`}
							className='flex items-center gap-12 font-display text-2xl font-extrabold uppercase tracking-tight text-foreground/80 sm:text-3xl md:text-4xl'
						>
							<span>{token}</span>
							<span className='text-pastel-lilac-strong'>★</span>
						</div>
					))}
				</InfiniteSlider>
			</section>

			<div id='work' className='w-full bg-background'>
				<WorkMosaic
					className={SECTION_PADDING}
					eyebrow={WORK.eyebrow}
					headline={WORK.headline}
					description={WORK.description}
					pieces={WORK.pieces}
				/>
			</div>

			<div className='w-full bg-muted/30'>
				<StrategicBlueprintSection
					className={SECTION_PADDING}
					badgeLabel={BLUEPRINT.badgeLabel}
					title={BLUEPRINT.title}
					description={BLUEPRINT.description}
					steps={BLUEPRINT.steps}
				/>
			</div>

			<div className='w-full bg-background'>
				<ImageContentSplit
					className={SECTION_PADDING}
					kicker={STORY_ONE.kicker}
					kickerAccent='sky'
					haloAccent='sky'
					headline={STORY_ONE.headline}
					description={STORY_ONE.description}
					bullets={STORY_ONE.bullets}
					primaryCta={STORY_ONE.primaryCta}
					image={STORY_ONE.image}
				/>
			</div>

			<div className='w-full bg-muted/30'>
				<ImageContentSplit
					reverse
					className={SECTION_PADDING}
					kicker={STORY_TWO.kicker}
					kickerAccent='lilac'
					haloAccent='lilac'
					headline={STORY_TWO.headline}
					description={STORY_TWO.description}
					bullets={STORY_TWO.bullets}
					primaryCta={STORY_TWO.primaryCta}
					primaryCtaVariant='lilac'
					image={STORY_TWO.image}
				/>
			</div>

			<div className='w-full bg-background'>
				<DesignPrinciples
					className={SECTION_PADDING}
					eyebrow={PRINCIPLES.eyebrow}
					headline={PRINCIPLES.headline}
					description={PRINCIPLES.description}
					principles={PRINCIPLES.principles}
				/>
			</div>

			<div className='w-full bg-muted/30'>
				<EngagementTiers
					className={SECTION_PADDING}
					eyebrow={ENGAGEMENT.eyebrow}
					headline={ENGAGEMENT.headline}
					description={ENGAGEMENT.description}
					tiers={ENGAGEMENT.tiers}
				/>
			</div>

			<div className='w-full bg-background'>
				<TestimonialsSection
					className={SECTION_PADDING}
					testimonials={TESTIMONIALS}
					title='Praise from the operators who run on this creative'
					description='Quotes about how the design actually performs — not how it looks in a mood board.'
					variant='carousel'
				/>
			</div>

			<div className='w-full bg-muted/30'>
				<CrossLinkBand
					eyebrow={CROSS_LINK.eyebrow}
					headline={CROSS_LINK.headline}
					description={CROSS_LINK.description}
					cta={CROSS_LINK.cta}
					accent={CROSS_LINK.accent}
				/>
			</div>

			<div className='w-full bg-background'>
				<FAQ
					items={FAQS}
					variant='pastel'
					badge='/ Graphics Design FAQ'
					title='Common questions about the work.'
					description='Scope, hand-offs, paid-media testing, ownership. The honest answers.'
					className={SECTION_PADDING}
				/>
			</div>

			<div className='w-full bg-muted/30'>
				<ConsultationCTA
					className={SECTION_PADDING}
					category='graphics-design'
					badge={CONSULTATION.badge}
					title={CONSULTATION.title}
					subtitle={CONSULTATION.subtitle}
					features={CONSULTATION.features}
					tagline={CONSULTATION.tagline}
					formTitle={CONSULTATION.formTitle}
					submitLabel={CONSULTATION.submitLabel}
					formVariant='detailed'
				/>
			</div>

			<StickyCTA title={STICKY.title} ctaText={STICKY.ctaText} href={STICKY.href} />
		</main>
	);
}
