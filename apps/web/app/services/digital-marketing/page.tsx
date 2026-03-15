import type { Metadata } from 'next';
import Image from 'next/image';
import { BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { HeroSection } from '@/components/sections/blocks/HeroSection';
import {
	CaseStudyStrip,
	ConsultationCTA,
	ROICalculatorSection,
	ServiceCapabilitiesGateway,
} from '@/components/sections/services';
import FAQ from '@/components/sections/shared/FAQ';
import { InfiniteSlider } from '@workspace/ui/components/infinite-slider';
import { cn } from '@workspace/ui/lib/utils';
import appleIcon from '@/public/icons/apple.svg';
import googleIcon from '@/public/icons/google.svg';
import facebookIcon from '@/public/icons/facebook.svg';
import twitterIcon from '@/public/icons/twitter.svg';
import slackIcon from '@/public/icons/slack.svg';
import whatsappIcon from '@/public/icons/whatsapp.svg';
import {
	DIGITAL_MARKETING_GATEWAY_CONFIG,
	DIGITAL_MARKETING_SERVICE_NAV,
	buildGatewayCards,
} from '@/lib/services/nav-items';
import {
	CASE_STUDIES,
	CONSULTATION_FEATURES,
	FAQS,
	GROWTH_SPRINT_STEPS,
	INTEGRATED_SUCCESS_BLUEPRINTS,
	PILLARS,
	PILLAR_PROOF_ITEMS,
	SECTION_PADDING,
	TRUST_INDICATORS,
	DigitalMarketingGrowthMatrixSection,
	DigitalMarketingPillarsSection,
	IntegratedSuccessBlueprintsSection,
} from '@/components/sections/services/digital-marketing';

const TRUST_ICON_MAP = {
	ShieldCheck,
	Zap,
	BarChart3,
};

export const metadata: Metadata = {
	title: 'Digital Marketing Services | SEO, Paid Media, Lifecycle & CRO | PayPerCall',
	description:
		'Scalable digital marketing programs across SEO, paid media, lifecycle automation, and conversion optimization. Book a strategy consultation.',
	alternates: { canonical: '/services/digital-marketing' },
	robots: { index: true, follow: true },
};

export default function DigitalMarketingPage() {
	return (
		<main className='min-h-screen'>
			<HeroSection
				className='mt-12 md:mt-0'
				title='Digital Marketing'
				subtitle='Design and scale a full-funnel growth engine across search, paid media, lifecycle retention, and conversion optimization—built for predictable revenue, not vanity metrics.'
				callToAction={{
					text: 'Book a Growth Strategy Session',
					href: '#contact',
				}}
				backgroundImage='https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop'
				contactInfo={{
					website: 'https://corecloser.com',
					phone: '+1 (855) 330-2777',
					address: '20555 US-19 N, Clearwater, FL 33763',
				}}
			/>

			<div id='trust-signals' className='w-full bg-background'>
				<div className='max-w-7xl mx-auto px-4 pt-20 sm:px-6 lg:px-8'>
					<p className='text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground'>
						Trusted by data-driven teams
					</p>
				</div>
				<InfiniteSlider gap={128} speed={50} className='max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8'>
					<Image
						src={appleIcon}
						className='h-12 w-auto opacity-70 hover:opacity-100 transition-opacity'
						alt='Apple'
						width={48}
						height={48}
					/>
					<Image
						src={googleIcon}
						className='h-12 w-auto opacity-70 hover:opacity-100 transition-opacity'
						alt='Google'
						width={48}
						height={48}
					/>
					<Image
						src={facebookIcon}
						className='h-12 w-auto opacity-70 hover:opacity-100 transition-opacity'
						alt='Meta'
						width={48}
						height={48}
					/>
					<Image
						src={twitterIcon}
						className='h-12 w-auto opacity-70 hover:opacity-100 transition-opacity'
						alt='X'
						width={48}
						height={48}
					/>
					<Image
						src={slackIcon}
						className='h-12 w-auto opacity-70 hover:opacity-100 transition-opacity'
						alt='Slack'
						width={48}
						height={48}
					/>
					<Image
						src={whatsappIcon}
						className='h-12 w-auto opacity-70 hover:opacity-100 transition-opacity'
						alt='WhatsApp'
						width={48}
						height={48}
					/>
				</InfiniteSlider>

				<div className='max-w-7xl mx-auto px-4 pb-20 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
						{TRUST_INDICATORS.map((indicator, index) => {
							const Icon = TRUST_ICON_MAP[indicator.icon];
							const cardClasses =
								index === 0 ? 'border-pastel-peach-border bg-pastel-peach'
								: index === 1 ? 'border-pastel-sky-border bg-pastel-sky'
								: 'border-pastel-lilac-border bg-pastel-lilac';

							return (
								<article
									key={indicator.title}
									className={cn(
										'rounded-2xl border p-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-0.5',
										cardClasses,
									)}>
									<div className='mx-auto inline-flex size-11 items-center justify-center rounded-2xl border border-white/50 bg-white/70 dark:bg-black/10'>
										<Icon className='size-5 text-primary' aria-hidden />
									</div>
									<h3 className='mt-4 text-xl font-bold tracking-tight text-foreground'>{indicator.title}</h3>
									<p className='mt-2 text-sm leading-relaxed text-foreground/80 dark:text-foreground/75'>
										{indicator.description}
									</p>
								</article>
							);
						})}
					</div>
				</div>
			</div>

			<div className='w-full bg-muted/30'>
				<ServiceCapabilitiesGateway
					title={DIGITAL_MARKETING_GATEWAY_CONFIG.title}
					subtitle={DIGITAL_MARKETING_GATEWAY_CONFIG.subtitle}
					cards={buildGatewayCards(
						DIGITAL_MARKETING_SERVICE_NAV,
						'/services/digital-marketing',
						DIGITAL_MARKETING_GATEWAY_CONFIG.ctaLabels,
						DIGITAL_MARKETING_GATEWAY_CONFIG.iconKeys,
					)}
					primaryCta={DIGITAL_MARKETING_GATEWAY_CONFIG.primaryCta}
					primaryCtaNote={DIGITAL_MARKETING_GATEWAY_CONFIG.primaryCtaNote}
					columns={DIGITAL_MARKETING_GATEWAY_CONFIG.columns}
					className={SECTION_PADDING}
				/>
			</div>

			<div className='w-full bg-background'>
				<DigitalMarketingPillarsSection
					className={SECTION_PADDING}
					pillars={PILLARS}
					proofItems={PILLAR_PROOF_ITEMS}
					whyItWorksCta={{ label: 'Explore Our Methodology', href: '#growth-sprint' }}
				/>
			</div>

			<div className='w-full bg-muted/30'>
				<DigitalMarketingGrowthMatrixSection
					className={SECTION_PADDING}
					steps={GROWTH_SPRINT_STEPS}
					primaryCta={{ label: 'Book a Strategy Call', href: '#contact' }}
					secondaryCta={{ label: 'View Case Studies', href: '#case-studies' }}
				/>
			</div>

			<div className='w-full bg-background'>
				<IntegratedSuccessBlueprintsSection className={SECTION_PADDING} data={INTEGRATED_SUCCESS_BLUEPRINTS} />
			</div>

			<div id='roi-optimizer' className='w-full bg-background'>
				<div className='section-container pt-20 pb-8 text-center md:pt-24 md:pb-10'>
					<span className='inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary'>
						ROI Modeling
					</span>
					<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						Forecast Marketing Efficiency Before You Scale Spend
					</h2>
					<p className='mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg'>
						Use your current spend and conversion inputs to estimate annual lift, CAC movement, and efficiency
						gains before expanding budget.
					</p>
				</div>
				<ROICalculatorSection className='max-w-7xl mx-auto pt-0 pb-20 md:pb-24' mode='marketing' />
			</div>

			<div id='case-studies' className='w-full bg-muted/30'>
				<CaseStudyStrip
					items={CASE_STUDIES}
					title='Digital Marketing Success Stories'
					description='See how the sprint model translates into predictable lift across pipeline quality, CAC efficiency, and revenue velocity.'
					cta={{ text: 'Get a Free Consultation', href: '#contact' }}
					className={SECTION_PADDING}
				/>
			</div>

			<div id='faq' className='w-full bg-background'>
				<FAQ
					items={FAQS}
					variant='pastel'
					badge='Digital Marketing FAQ'
					description='Everything you need to know about our digital marketing operating model, attribution standards, and growth process.'
					className={SECTION_PADDING}
				/>
			</div>

			<div id='contact' className='w-full bg-muted/30'>
				<ConsultationCTA
					className={SECTION_PADDING}
					category='digital-marketing'
					badge={{ label: 'Growth Planning Access', icon: 'Check' }}
					title='Apply for a Growth Sprint Plan'
					subtitle='Share your current funnel and goals. We’ll return a tailored channel strategy with sprint priorities, budget guidance, and expected outcome ranges.'
					features={CONSULTATION_FEATURES}
					tagline='No retainers required to start planning—just a focused growth conversation.'
					formTitle='Tell us about your growth targets'
					submitLabel='Request My Strategy Plan'
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
