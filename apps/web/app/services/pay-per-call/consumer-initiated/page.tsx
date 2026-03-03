import type { Metadata } from 'next';
import {
	CallLogicBanner,
	CallProcessFlow,
	CallAdvantagesGrid,
	DataDrivenFeaturesGrid,
	DEFAULT_DATA_DRIVEN_FEATURES,
	StandardVsOptimizedMicroCard,
	SECTION_PADDING,
} from '@/components/sections/services';
import FAQ from '@/components/sections/shared/FAQ';
import { ConsultationCTA } from '@/components/sections/services';
import type { FaqItem } from '@/types/services';

export const metadata: Metadata = {
	title: 'Consumer-Initiated Calls | Pay Per Call | CoreCloser',
	description:
		'Intent-first inbound call capture from search and social. Prospects call because they searched, clicked, and self-selected into your offer.',
	alternates: { canonical: '/services/pay-per-call/consumer-initiated' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Consumer-Initiated Calls | Pay Per Call',
		description: 'Click-to-call paths with intent gating and source-level attribution.',
		url: '/services/pay-per-call/consumer-initiated',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Consumer-Initiated Calls | Pay Per Call',
		description: 'Intent-first inbound call capture from search and social.',
	},
	keywords: [
		'consumer-initiated calls',
		'pay per call',
		'click to call',
		'search call attribution',
		'IVR qualification',
	],
};

export const revalidate = 3600;

const CONSUMER_INITIATED_FAQS: FaqItem[] = [
	{
		question: 'How do you prevent low-intent "price shoppers"?',
		answer:
			'We use IVR prompts, minimum call duration rules, and optional qualification questions so only callers who meet your criteria reach sales. You define what "qualified" means—e.g., duration, key press, or geo—and we enforce it before the handoff.',
	},
	{
		question: 'How do you attribute calls to keywords/ad groups?',
		answer:
			'Dynamic number insertion (DNI) and source-level tracking tie each call to the specific campaign, keyword, or ad group that drove it. Reporting shows which sources convert so you can optimize spend and creative.',
	},
	{
		question: 'What qualifies as a billable consumer-initiated call?',
		answer:
			'Billable calls are defined upfront—typically minimum duration, IVR confirmation, and/or geo. We only count calls that meet your agreed thresholds, so you pay for outcomes, not noise.',
	},
	{
		question: 'Can you run this in multiple states/metros?',
		answer:
			'Yes. We support geo-targeting and regional number pools so you can scale consumer-initiated campaigns across states or metros while keeping attribution and routing rules clear per region.',
	},
];

export default function ConsumerInitiatedPage() {
	return (
		<main className="min-h-screen">
			<CallLogicBanner
				badge="Pay Per Call"
				title="Intent-First Inbound: Consumer-Initiated Call Capture"
				subtitle="Prospects call because they searched, clicked, and self-selected into your offer."
				accent="sky"
				bgVariant="search_social"
				primaryCta={{ label: 'Get a Free Consultation', href: '/contact' }}
				secondaryLink={{ label: 'Back to Pay Per Call', href: '/services/pay-per-call' }}
			/>
			<div className="w-full bg-background">
				<CallProcessFlow
					className={SECTION_PADDING}
					title="How consumer-initiated calls reach you"
					subtitle="From signal capture to live handoff—the technical path."
					accent="sky"
					steps={[
						{
							step: '01',
							title: 'Signal capture',
							description:
								'Search and social placements drive traffic to landing pages or click-to-call extensions. Caller intent is captured at the moment they choose to call.',
							techNotes: ['Search/social placement', 'Landing or extension', 'Intent at click'],
						},
						{
							step: '02',
							title: 'Qualification layer',
							description:
								'Geo, device, and IVR prompts filter and qualify the caller before they reach your team. Duration and key-press rules ensure only qualified calls are billed.',
							techNotes: ['Geo + device rules', 'IVR prompts', 'Duration thresholds'],
						},
						{
							step: '03',
							title: 'Routing + attribution',
							description:
								'Dynamic number insertion and source tagging route the call to the right team. Full attribution is preserved for reporting and optimization.',
							techNotes: ['DNI + source tags', 'Live handoff', 'Attribution in reporting'],
						},
					]}
				/>
			</div>
			<div className="w-full bg-muted/30">
				<CallAdvantagesGrid
					className={SECTION_PADDING}
					title="Key advantages of consumer-initiated calls"
					subtitle="Why this channel converts."
					items={[
						{
							title: 'Highest intent entry point',
							description:
								'Callers self-select by clicking to call—they’re already in buying mode, not just browsing.',
							iconKey: 'Search',
							tone: 'sky',
						},
						{
							title: 'Cleaner attribution',
							description:
								'Every call is tied to campaign, keyword, or creative so you know exactly what drives revenue.',
							iconKey: 'BarChart3',
							tone: 'lilac',
						},
						{
							title: 'Offer-to-call matching',
							description:
								'Routing rules align call volume with your offer and sales coverage—no wasted handoffs.',
							iconKey: 'Target',
							tone: 'peach',
						},
					]}
				/>
			</div>
			<div className="w-full bg-background">
				<DataDrivenFeaturesGrid
					className={SECTION_PADDING}
					badge="Powerful Features"
					title="Data-Driven Capabilities"
					subtitle="Optimize your entire lead conversion workflow with features designed for speed, compliance, and efficiency."
					features={DEFAULT_DATA_DRIVEN_FEATURES}
				/>
			</div>
			<div className="w-full bg-background">
				<StandardVsOptimizedMicroCard
					className={SECTION_PADDING}
					title="Standard vs CoreCloser-Optimized"
					accent="sky"
					standard={{
						label: 'Standard',
						bullets: [
							'Form fill → delayed follow-up',
							'Attribution breaks between click and call',
							'Sales wastes time calling back',
						],
					}}
					optimized={{
						label: 'CoreCloser-optimized',
						bullets: [
							'Click-to-call paths with intent gating',
							'Source-level call tagging',
							'Routing rules aligned to sales coverage',
						],
					}}
					note="All rules are auditable in reporting."
				/>
			</div>
			<div className="w-full bg-muted/30">
				<FAQ
					items={CONSUMER_INITIATED_FAQS}
					variant="pastel"
					badge="Consumer-Initiated FAQ"
					description="Frequently asked questions about consumer-initiated Pay Per Call—qualification, attribution, and scaling."
					className={SECTION_PADDING}
				/>
			</div>
			<div className="w-full bg-background">
				<ConsultationCTA
					className={SECTION_PADDING}
					category="pay-per-call"
					badge={{ label: 'Exclusive Access', icon: 'Check' }}
					title="Apply for consumer-initiated call capacity"
					subtitle="Scale high-intent inbound calls from search and social with clear attribution and qualification."
					features={[
						{
							title: 'Intent-first callers',
							description: 'Connect with prospects who clicked to call—already in buying mode.',
							icon: 'Zap',
						},
						{
							title: 'Full source attribution',
							description: 'See which campaigns and keywords drive revenue so you can optimize spend.',
							icon: 'TrendingUp',
						},
						{
							title: 'Transparent qualification',
							description: 'Agree on what counts as a billable call—duration, IVR, geo—upfront.',
							icon: 'Eye',
						},
					]}
					tagline="No retainers, no long-term lock-ins—just results."
					formTitle="Tell us about your needs"
					submitLabel="Secure My Call Flow"
					formVariant="detailed"
				/>
			</div>
		</main>
	);
}
