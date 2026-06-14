import type { Metadata } from 'next';
import { InfiniteSlider } from '@workspace/ui/components/infinite-slider';
import {
	ConsultationCTA,
	ImageContentSplit,
	StrategicBlueprintSection,
	TestimonialsSection,
} from '@/components/sections/services';
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
	SHOWS,
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
	podcastMarketingJsonLd,
} from './_data/podcast-marketing-content';

export const metadata: Metadata = {
	title: 'Podcast Marketing for Paid-Media Operators | Core Closer',
	description:
		'Podcast as an acquisition channel — outreach shows, branded podcasts, clip engines, and sales-enablement repurposing built to feed your paid funnel.',
	alternates: { canonical: '/services/podcast-marketing' },
	robots: { index: true, follow: true },
	openGraph: {
		title: 'Podcast Marketing — built for paid-media operators',
		description:
			'Podcast as an acquisition channel — outreach shows, branded podcasts, clip engines, and sales-enablement repurposing built to feed your paid funnel.',
		type: 'website',
		url: 'https://corecloser.com/services/podcast-marketing',
	},
};

export const revalidate = 3600;

const COVER_ASPECT_TILE_BASE =
	'flex h-32 w-32 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-3 sm:h-36 sm:w-36';

const COVER_ACCENT: Record<string, string> = {
	mint: 'bg-pastel-mint/40 border-pastel-mint-border text-pastel-mint-ink',
	sky: 'bg-pastel-sky/40 border-pastel-sky-border text-pastel-sky-ink',
	lilac: 'bg-pastel-lilac/40 border-pastel-lilac-border text-pastel-lilac-ink',
	peach: 'bg-pastel-peach/40 border-pastel-peach-border text-pastel-peach-ink',
	blush: 'bg-pastel-blush/40 border-pastel-blush-border text-pastel-blush-ink',
	lime: 'bg-pastel-lime/40 border-pastel-lime-border text-pastel-lime-ink',
};

export default function PodcastMarketingPage() {
	return (
		<main className='min-h-screen'>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastMarketingJsonLd) }}
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
				stickerKind={HERO.stickerKind}
				nowPlaying={HERO.nowPlaying}
			/>

			<div className='w-full bg-background'>
				<ClientsMarqueeStrip />
			</div>

			<div className='w-full bg-muted/30'>
				<CapabilitiesBento
					className={SECTION_PADDING}
					eyebrow={CAPABILITIES.eyebrow}
					headline={CAPABILITIES.headline}
					description={CAPABILITIES.description}
					tiles={CAPABILITIES.tiles}
				/>
			</div>

			<section aria-hidden className='relative w-full overflow-hidden border-y border-border/40 bg-background py-6'>
				<InfiniteSlider gap={48} speed={36} speedOnHover={12}>
					{MARQUEE_DISCIPLINES.map((token, i) => (
						<div
							key={`${token}-${i}`}
							className='flex items-center gap-12 font-display text-2xl font-extrabold uppercase tracking-tight text-foreground/80 sm:text-3xl md:text-4xl'
						>
							<span>{token}</span>
							<span className='text-pastel-peach-strong'>●</span>
						</div>
					))}
				</InfiniteSlider>
			</section>

			<div id='shows' className='w-full bg-muted/30'>
				<WorkMosaic
					className={SECTION_PADDING}
					eyebrow={SHOWS.eyebrow}
					headline={SHOWS.headline}
					description={SHOWS.description}
					pieces={SHOWS.pieces}
				/>
			</div>

			<div className='w-full bg-background'>
				<StrategicBlueprintSection
					className={SECTION_PADDING}
					badgeLabel={BLUEPRINT.badgeLabel}
					title={BLUEPRINT.title}
					description={BLUEPRINT.description}
					steps={BLUEPRINT.steps}
				/>
			</div>

			<div className='w-full bg-muted/30'>
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

			<div className='w-full bg-background'>
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

			<div className='w-full bg-muted/30'>
				<DesignPrinciples
					className={SECTION_PADDING}
					eyebrow={PRINCIPLES.eyebrow}
					headline={PRINCIPLES.headline}
					description={PRINCIPLES.description}
					principles={PRINCIPLES.principles}
				/>
			</div>

			<div className='w-full bg-background'>
				<EngagementTiers
					className={SECTION_PADDING}
					eyebrow={ENGAGEMENT.eyebrow}
					headline={ENGAGEMENT.headline}
					description={ENGAGEMENT.description}
					tiers={ENGAGEMENT.tiers}
				/>
			</div>

			<div className='w-full bg-muted/30'>
				<TestimonialsSection
					className={SECTION_PADDING}
					testimonials={TESTIMONIALS}
					title='Praise from the operators running shows like media buys'
					description='Quotes about pipeline, clip CTR, and deal influence — not download counts.'
					variant='carousel'
				/>
			</div>

			<div className='w-full bg-background'>
				<CrossLinkBand
					eyebrow={CROSS_LINK.eyebrow}
					headline={CROSS_LINK.headline}
					description={CROSS_LINK.description}
					cta={CROSS_LINK.cta}
					accent={CROSS_LINK.accent}
				/>
			</div>

			<div className='w-full bg-muted/30'>
				<FAQ
					items={FAQS}
					variant='pastel'
					badge='/ Podcast Marketing FAQ'
					title='Common questions about a show.'
					description='Scope, hand-offs, attribution, ownership. The honest answers.'
					className={SECTION_PADDING}
				/>
			</div>

			<div className='w-full bg-background'>
				<ConsultationCTA
					className={SECTION_PADDING}
					category='podcast-marketing'
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
