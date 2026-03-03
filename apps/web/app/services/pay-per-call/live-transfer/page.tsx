import type { Metadata } from 'next';
import {
	CallLogicBanner,
	CallProcessFlow,
	CallAdvantagesGrid,
	DataDrivenFeaturesGrid,
	DEFAULT_DATA_DRIVEN_FEATURES,
	StandardVsOptimizedMicroCard,
	SECTION_PADDING,
} from '@/components/services';
import FAQ from '@/components/landing/FAQ';
import { ConsultationCTA } from '@/components/services';
import type { FaqItem } from '@/types/services';

export const metadata: Metadata = {
	title: 'Live Transfer Calls | Pay Per Call | CoreCloser',
	description:
		'Direct-to-sales-floor live transfer infrastructure. We qualify the caller first, then warm-transfer to the right rep with context.',
	alternates: { canonical: '/services/pay-per-call/live-transfer' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Live Transfer Calls | Pay Per Call',
		description: 'Warm transfers with rep-ready context and verification.',
		url: '/services/pay-per-call/live-transfer',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Live Transfer Calls | Pay Per Call',
		description: 'Qualify first, then warm-transfer to sales with full context.',
	},
	keywords: [
		'live transfer calls',
		'pay per call',
		'warm transfer',
		'call qualification',
		'TCPA compliance',
	],
};

export const revalidate = 3600;

const LIVE_TRANSFER_FAQS: FaqItem[] = [
	{
		question: 'How do you verify Live Transfers are legitimate?',
		answer:
			'We use minimum duration rules, disposition codes, and optional QA sampling. Post-call validation and dispute workflows ensure only qualified, completed transfers count as billable. You can audit call recordings and dispositions in reporting.',
	},
	{
		question: 'Can we set hours/coverage rules by team?',
		answer:
			'Yes. Routing rules can align to your team’s hours and coverage. Calls outside those windows can be queued, sent to overflow, or routed to a voicemail/IVR so you never pay for calls that don’t reach a live rep when you want them to.',
	},
	{
		question: 'How do you handle compliance + TCPA/consent?',
		answer:
			'We follow TCPA and consent best practices. Pre-qualification scripts and IVR flows are designed to capture consent where required, and we support compliance checks before the transfer so your brand stays protected.',
	},
	{
		question: 'What happens if a rep doesn’t answer?',
		answer:
			'We configure fallback behavior—e.g., overflow to another team, queue, or voicemail. You define the rules so no call is lost and you only pay for transfers that connect when that’s your definition of billable.',
	},
];

export default function LiveTransferPage() {
	return (
		<main className="min-h-screen">
			<CallLogicBanner
				badge="Pay Per Call"
				title="Direct-to-Sales-Floor: Live Transfer Infrastructure"
				subtitle="We qualify the caller first, then warm-transfer to the right rep with context."
				accent="mint"
				bgVariant="live_transfer"
				primaryCta={{ label: 'Get a Free Consultation', href: '/contact' }}
				secondaryLink={{ label: 'Back to Pay Per Call', href: '/services/pay-per-call' }}
			/>
			<div className="w-full bg-background">
				<CallProcessFlow
					className={SECTION_PADDING}
					title="How live transfers reach your team"
					subtitle="Pre-qualification, warm handoff, and post-call validation."
					accent="mint"
					steps={[
						{
							step: '01',
							title: 'Pre-qualification',
							description:
								'Agent script or IVR collects intent and runs compliance checks. Only callers who meet your criteria move to the transfer step.',
							techNotes: ['Agent script / IVR', 'Compliance checks', 'Intent confirmed'],
						},
						{
							step: '02',
							title: 'Warm transfer',
							description:
								'Caller and context are delivered to the right rep. No hold-time surprises—reps see who’s calling and why before they answer.',
							techNotes: ['Context payload', 'No blind transfer', 'Routing by team/skill'],
						},
						{
							step: '03',
							title: 'Post-call validation',
							description:
								'Duration, dispositions, and QA sampling confirm quality. Dispute workflows keep billing fair and auditable.',
							techNotes: ['Duration + disposition', 'QA sampling', 'Dispute workflow'],
						},
					]}
				/>
			</div>
			<div className="w-full bg-muted/30">
				<CallAdvantagesGrid
					className={SECTION_PADDING}
					title="Key Advantages"
					subtitle="Why warm transfers convert."
					items={[
						{
							title: 'Zero Wait Time',
							description:
								'Eliminate lead decay. Connect with prospects the exact moment their interest is highest, ensuring no opportunity slips through the cracks.',
							iconKey: 'Timer',
							tone: 'mint',
						},
						{
							title: 'Higher Close Rates',
							description:
								'Transferred leads convert 3x faster. Our agents warm up the prospect, so your closers step into a conversation, not a cold pitch.',
							iconKey: 'TrendingUp',
							tone: 'sky',
						},
						{
							title: 'Quality Guaranteed',
							description:
								'We only charge for qualified transfers. If a lead doesn’t meet your specific criteria during the handoff, you don’t pay a dime.',
							iconKey: 'BadgeCheck',
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
					accent="mint"
					standard={{
						label: 'Standard',
						bullets: [
							'Random transfers',
							'No context for reps',
							'Hard to verify quality',
						],
					}}
					optimized={{
						label: 'CoreCloser-optimized',
						bullets: [
							'Rules-based transfer routing',
							'Context payload + tracking',
							'QA + fraud controls baked in',
						],
					}}
					note="All rules are auditable in reporting."
				/>
			</div>
			<div className="w-full bg-muted/30">
				<FAQ
					items={LIVE_TRANSFER_FAQS}
					variant="pastel"
					badge="Live Transfer FAQ"
					description="Frequently asked questions about live transfer Pay Per Call—verification, compliance, and routing."
					className={SECTION_PADDING}
				/>
			</div>
			<div className="w-full bg-background">
				<ConsultationCTA
					className={SECTION_PADDING}
					category="pay-per-call"
					badge={{ label: 'Exclusive Access', icon: 'Check' }}
					title="Apply for live transfer capacity"
					subtitle="Get warm transfers with full context and verification—no blind handoffs."
					features={[
						{
							title: 'Warm handoffs only',
							description: 'Reps see caller context before they answer—no cold transfers.',
							icon: 'Zap',
						},
						{
							title: 'Hours & coverage rules',
							description: 'Route by team, skill, and availability so calls reach the right rep.',
							icon: 'TrendingUp',
						},
						{
							title: 'Verification & QA',
							description: 'Duration, dispositions, and sampling keep quality and billing fair.',
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
