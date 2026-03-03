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
	title: 'Offline Media-Driven Calls | Pay Per Call | CoreCloser',
	description:
		'Track and route calls from radio, TV, and direct mail with clean attribution and time-based controls.',
	alternates: { canonical: '/services/pay-per-call/offline-media' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Offline Media-Driven Calls | Pay Per Call',
		description: 'Broadcast-to-call attribution with daypart and regional control.',
		url: '/services/pay-per-call/offline-media',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Offline Media-Driven Calls | Pay Per Call',
		description: 'Track and route calls from radio, TV, and direct mail.',
	},
	keywords: [
		'offline media pay per call',
		'radio call tracking',
		'TV call attribution',
		'direct mail calls',
		'daypart routing',
	],
};

export const revalidate = 3600;

const OFFLINE_MEDIA_FAQS: FaqItem[] = [
	{
		question: 'How many tracking numbers do we need?',
		answer:
			'It depends on how many segments you want to attribute—e.g., per station, program, or direct mail drop. We help you design a number pool that balances granularity with manageability and compliance.',
	},
	{
		question: 'Can we attribute by station, program, or direct mail drop?',
		answer:
			'Yes. Unique numbers or number pools can be assigned by station, daypart, program, or direct mail campaign so you see exactly which creative or slot drives calls and outcomes.',
	},
	{
		question: 'How fast can numbers go live?',
		answer:
			'Typically within a few business days once we have your targeting and creative plan. Provisioning and routing are set up in parallel so you can launch campaigns without delay.',
	},
	{
		question: 'Can calls route differently by time of day?',
		answer:
			'Yes. Daypart routing and time-based rules let you send calls to different teams or voicemail by hour or region so you only pay for live handoffs when you have coverage.',
	},
];

export default function OfflineMediaPage() {
	return (
		<main className="min-h-screen">
			<CallLogicBanner
				badge="Pay Per Call"
				title="Broadcast-to-Call Attribution: Offline Media Routing"
				subtitle="Track and route calls from radio, TV, and direct mail with clean attribution and time-based controls."
				accent="peach"
				bgVariant="offline_media"
				primaryCta={{ label: 'Get a Free Consultation', href: '/contact' }}
				secondaryLink={{ label: 'Back to Pay Per Call', href: '/services/pay-per-call' }}
			/>
			<div className="w-full bg-background">
				<CallProcessFlow
					className={SECTION_PADDING}
					title="How offline media calls reach you"
					subtitle="From media-to-number mapping to routing and reporting."
					accent="peach"
					steps={[
						{
							step: '01',
							title: 'Media-to-number mapping',
							description:
								'Unique numbers or number pools are assigned per station, slot, or direct mail drop so every call is attributable to a specific source.',
							techNotes: ['Unique numbers per station/slot/drop', 'Source tagging', 'Pool design'],
						},
						{
							step: '02',
							title: 'Time + geo controls',
							description:
								'Dayparting, region, and IVR filtering ensure calls are qualified and routed when and where you have coverage.',
							techNotes: ['Daypart routing', 'Regional rules', 'IVR filtering'],
						},
						{
							step: '03',
							title: 'Routing + reporting',
							description:
								'Call recordings, source tags, and outcome feedback loops feed into reporting so you can optimize creative and slot performance.',
							techNotes: ['Recordings + source tags', 'Outcome feedback', 'Station/creative reporting'],
						},
					]}
				/>
			</div>
			<div className="w-full bg-muted/30">
				<CallAdvantagesGrid
					className={SECTION_PADDING}
					title="Key advantages of offline media-driven calls"
					subtitle="Why broadcast attribution matters."
					items={[
						{
							title: 'Offline attribution that doesn’t guess',
							description:
								'Unique numbers and source tagging tie every call to a specific station, slot, or drop—no modeling or guesswork.',
							iconKey: 'Radio',
							tone: 'peach',
						},
						{
							title: 'Daypart + regional control',
							description:
								'Route by time of day and region so calls reach the right team or overflow when you’re not staffed.',
							iconKey: 'Timer',
							tone: 'mint',
						},
						{
							title: 'Creative/slot optimization via call data',
							description:
								'See which creative and dayparts drive the best outcomes so you can shift spend to what converts.',
							iconKey: 'BarChart3',
							tone: 'lilac',
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
					accent="peach"
					standard={{
						label: 'Standard',
						bullets: [
							'One number for everything',
							'No way to optimize by slot',
							'Missed calls after-hours',
						],
					}}
					optimized={{
						label: 'CoreCloser-optimized',
						bullets: [
							'Number pools per campaign segment',
							'Daypart routing + overflow rules',
							'Station/creative reporting tied to outcomes',
						],
					}}
					note="All rules are auditable in reporting."
				/>
			</div>
			<div className="w-full bg-muted/30">
				<FAQ
					items={OFFLINE_MEDIA_FAQS}
					variant="pastel"
					badge="Offline Media FAQ"
					description="Frequently asked questions about offline media Pay Per Call—tracking numbers, attribution, and daypart routing."
					className={SECTION_PADDING}
				/>
			</div>
			<div className="w-full bg-background">
				<ConsultationCTA
					className={SECTION_PADDING}
					category="pay-per-call"
					badge={{ label: 'Exclusive Access', icon: 'Check' }}
					title="Apply for offline media call capacity"
					subtitle="Get clean attribution from radio, TV, and direct mail with daypart and regional control."
					features={[
						{
							title: 'Per-source attribution',
							description: 'See exactly which station, slot, or drop drives calls and revenue.',
							icon: 'Zap',
						},
						{
							title: 'Daypart & overflow',
							description: 'Route by time and region so you only pay when you have coverage.',
							icon: 'TrendingUp',
						},
						{
							title: 'Creative performance',
							description: 'Use call data to optimize creative and slot spend.',
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
