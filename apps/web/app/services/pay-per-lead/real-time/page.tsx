import type { Metadata } from 'next';
import {
	CallLogicBanner,
	CallProcessFlow,
	CallAdvantagesGrid,
	DataDrivenFeaturesGrid,
	StandardVsOptimizedMicroCard,
	SECTION_PADDING,
	ConsultationCTA,
	type DataDrivenFeatureItem,
} from '@/components/sections/services';
import FAQ from '@/components/sections/shared/FAQ';
import type { FaqItem } from '@/types/services';

export const metadata: Metadata = {
	title: 'Real-Time Lead Delivery | Pay Per Lead | CoreCloser',
	description:
		'Deliver qualified leads in seconds through API, webhook, or CRM integration so reps can respond while intent is highest.',
	alternates: { canonical: '/services/pay-per-lead/real-time' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Real-Time Lead Delivery | Pay Per Lead',
		description: 'Instant qualified lead routing through API, webhook, and CRM integrations.',
		url: '/services/pay-per-lead/real-time',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Real-Time Lead Delivery | Pay Per Lead',
		description: 'Sync qualified leads to your sales stack in seconds.',
	},
	keywords: ['real-time lead delivery', 'pay per lead', 'api lead routing', 'crm lead sync', 'webhook lead delivery'],
};

export const revalidate = 3600;

const REAL_TIME_FEATURES: DataDrivenFeatureItem[] = [
	{
		title: 'Sub-Second Validation Layer',
		description:
			'Validate required fields and contact signals immediately so only usable lead records move downstream.',
		iconKey: 'Filter',
		tone: 'mint',
	},
	{
		title: 'Consent-Aware Delivery',
		description:
			'Attach consent and source metadata at delivery time to support compliant outreach and cleaner operations.',
		iconKey: 'ShieldCheck',
		tone: 'sky',
	},
	{
		title: 'Latency & Throughput Reporting',
		description:
			'Monitor pipeline speed, acceptance rates, and endpoint health to keep delivery performance stable at scale.',
		iconKey: 'BarChart3',
		tone: 'lilac',
	},
	{
		title: 'Multi-Endpoint Integrations',
		description:
			'Route leads through API, webhook, and native CRM connectors with fallback logic to prevent delivery gaps.',
		iconKey: 'RefreshCw',
		tone: 'peach',
	},
	{
		title: 'Priority-Based Dispatch',
		description: 'Use scoring and routing priorities to send the highest-intent leads to the right queue first.',
		iconKey: 'Sparkles',
		tone: 'mint',
	},
	{
		title: 'Instant Team Notifications',
		description: 'Notify reps and systems in real time so outreach starts while lead intent is still fresh.',
		iconKey: 'Send',
		tone: 'sky',
	},
];

const REAL_TIME_FAQS: FaqItem[] = [
	{
		question: 'How fast is real-time lead delivery in practice?',
		answer:
			'Most qualified leads are delivered within seconds after submission. Actual timing depends on integration type and endpoint response speed, but routing is designed to minimize latency.',
	},
	{
		question: 'Which systems can you integrate with?',
		answer:
			'We support common CRM platforms, custom APIs, and webhook endpoints. During onboarding, we map your required fields and build a delivery flow that matches your existing stack.',
	},
	{
		question: 'What happens if an endpoint fails or times out?',
		answer:
			'Fallback and retry rules can be configured to prevent lead loss. Delivery logs make it clear what happened, when retries occurred, and whether a backup path was used.',
	},
	{
		question: 'Can we include lead scoring with real-time delivery?',
		answer:
			'Yes. Scoring and qualification rules can run before dispatch so high-priority leads are routed to the best-fit queue as soon as they pass validation.',
	},
];

export default function RealTimeLeadDeliveryPage() {
	return (
		<main className='min-h-screen'>
			<CallLogicBanner
				badge='Pay Per Lead'
				title='Real-Time Lead Delivery: Speed-to-Contact Advantage'
				subtitle='Send qualified leads to your CRM or sales stack in seconds with full routing visibility.'
				accent='sky'
				bgVariant='search_social'
				primaryCta={{ label: 'Get a Free Consultation', href: '/contact' }}
				secondaryLink={{ label: 'Back to Pay Per Lead', href: '/services/pay-per-lead' }}
			/>
			<div className='w-full bg-background'>
				<CallProcessFlow
					className={SECTION_PADDING}
					title='How real-time lead delivery works'
					subtitle='Validate, route, and dispatch qualified leads with minimal latency.'
					accent='sky'
					steps={[
						{
							step: '01',
							title: 'Instant validation',
							description:
								'New lead records are checked for required fields, contact quality, and campaign fit before delivery is triggered.',
							techNotes: ['Field + contact checks', 'Campaign fit', 'Submission timestamping'],
						},
						{
							step: '02',
							title: 'Smart routing logic',
							description:
								'Leads are routed by priority, geography, and endpoint availability so each record reaches the right destination reliably.',
							techNotes: ['Priority queues', 'Geo-aware routing', 'Endpoint health checks'],
						},
						{
							step: '03',
							title: 'Live dispatch + tracking',
							description:
								'Dispatch occurs via API, webhook, or CRM connector, with delivery logs and response status available for audit and optimization.',
							techNotes: ['API/webhook/CRM sync', 'Delivery logs', 'Retry + fallback support'],
						},
					]}
				/>
			</div>
			<div className='w-full bg-muted/30'>
				<CallAdvantagesGrid
					className={SECTION_PADDING}
					title='Key advantages of real-time lead delivery'
					subtitle='Why speed and reliability improve conversion outcomes.'
					items={[
						{
							title: 'Faster speed-to-contact',
							description:
								'Leads arrive while intent is active, enabling your team to engage before competitors or drop-off.',
							iconKey: 'Zap',
							tone: 'sky',
						},
						{
							title: 'Reliable delivery infrastructure',
							description:
								'Routing rules, retries, and fallback paths reduce missed records and keep your lead flow stable.',
							iconKey: 'ShieldCheck',
							tone: 'mint',
						},
						{
							title: 'Operational transparency',
							description:
								'Delivery logs and latency metrics make it easy to diagnose bottlenecks and improve handoff performance.',
							iconKey: 'BarChart3',
							tone: 'peach',
						},
					]}
				/>
			</div>
			<div className='w-full bg-background'>
				<DataDrivenFeaturesGrid
					className={SECTION_PADDING}
					badge='Powerful Features'
					title='Data-Driven Capabilities'
					subtitle='Engineer fast, reliable lead dispatch with live observability across every endpoint.'
					features={REAL_TIME_FEATURES}
				/>
			</div>
			<div className='w-full bg-background'>
				<StandardVsOptimizedMicroCard
					className={SECTION_PADDING}
					title='Standard vs CoreCloser-Optimized'
					accent='sky'
					standard={{
						label: 'Standard',
						bullets: [
							'Batch exports with delayed follow-up windows',
							'Single endpoint with limited fallback handling',
							'Low visibility into dispatch failures and lag',
						],
					}}
					optimized={{
						label: 'CoreCloser-optimized',
						bullets: [
							'Seconds-level routing after qualification',
							'API/webhook/CRM delivery with retry logic',
							'Live tracking for latency and endpoint health',
						],
					}}
					note='Delivery SLAs and fallback rules are aligned during onboarding.'
				/>
			</div>
			<div className='w-full bg-muted/30'>
				<FAQ
					items={REAL_TIME_FAQS}
					variant='pastel'
					badge='Real-Time Delivery FAQ'
					description='Frequently asked questions about real-time Pay Per Lead delivery—integrations, latency, reliability, and scoring.'
					className={SECTION_PADDING}
				/>
			</div>
			<div className='w-full bg-background'>
				<ConsultationCTA
					className={SECTION_PADDING}
					category='pay-per-lead'
					sourcePage='real-time'
					badge={{ label: 'Exclusive Access', icon: 'Check' }}
					title='Apply for real-time lead delivery capacity'
					subtitle='Route qualified leads into your stack in seconds with full delivery visibility and control.'
					features={[
						{
							title: 'Seconds-level dispatch',
							description: 'Move from lead capture to rep engagement without batch delays.',
							icon: 'Zap',
						},
						{
							title: 'Integration-ready routing',
							description: 'Deliver through API, webhook, or CRM connectors with fallback support.',
							icon: 'TrendingUp',
						},
						{
							title: 'Live delivery observability',
							description: 'Track latency, endpoint responses, and retries in one transparent workflow.',
							icon: 'Eye',
						},
					]}
					tagline='No retainers, no long-term lock-ins—just results.'
					formTitle='Tell us about your needs'
					submitLabel='Secure My Real-Time Lead Flow'
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
