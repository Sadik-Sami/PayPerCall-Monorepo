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
	title: 'Shared Leads | Pay Per Lead | CoreCloser',
	description:
		'Scale efficiently with qualified shared leads distributed across approved buyers, backed by clear routing and quality controls.',
	alternates: { canonical: '/services/pay-per-lead/shared' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Shared Leads | Pay Per Lead',
		description: 'Cost-efficient shared lead programs with transparent qualification and distribution.',
		url: '/services/pay-per-lead/shared',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Shared Leads | Pay Per Lead',
		description: 'Scale lead volume with controlled shared distribution and quality safeguards.',
	},
	keywords: [
		'shared leads',
		'pay per lead',
		'lead distribution',
		'cost per lead optimization',
		'lead quality controls',
	],
};

export const revalidate = 3600;

const SHARED_FEATURES: DataDrivenFeatureItem[] = [
	{
		title: 'Segmented Distribution Rules',
		description:
			'Allocate leads by market, service type, and buyer profile so volume is spread intentionally across approved partners.',
		iconKey: 'Filter',
		tone: 'mint',
	},
	{
		title: 'Quality & Compliance Filters',
		description:
			'Validation and consent controls are applied before a lead is shared to maintain consistency and reduce disputes.',
		iconKey: 'ShieldCheck',
		tone: 'sky',
	},
	{
		title: 'Buyer-Level Performance Data',
		description:
			'Track delivery, acceptance, and downstream conversion signals to identify the best-performing channels and cohorts.',
		iconKey: 'BarChart3',
		tone: 'lilac',
	},
	{
		title: 'Flexible Delivery Endpoints',
		description: 'Deliver shared leads through CRM, API, webhook, or secure inbox workflows based on each buyer setup.',
		iconKey: 'RefreshCw',
		tone: 'peach',
	},
	{
		title: 'Priority-Based Allocation',
		description: 'Use scoring and pacing rules to direct higher-fit leads toward your top-converting buyer profiles.',
		iconKey: 'Sparkles',
		tone: 'mint',
	},
	{
		title: 'Real-Time Delivery Notifications',
		description:
			'Instant delivery alerts help teams respond quickly, even when lead volume is scaled across multiple recipients.',
		iconKey: 'Send',
		tone: 'sky',
	},
];

const SHARED_FAQS: FaqItem[] = [
	{
		question: 'How many buyers can receive a shared lead?',
		answer:
			'The share model is defined upfront and can vary by campaign. We document distribution depth and enforce it through routing rules so delivery remains predictable.',
	},
	{
		question: 'How do you keep shared lead quality consistent?',
		answer:
			'Every lead still passes qualification checks before distribution. Contact verification, geo rules, and service-fit filters are applied consistently to protect quality at scale.',
	},
	{
		question: 'Is shared lead delivery still real-time?',
		answer:
			'Yes. Shared programs can still deliver in seconds through API, webhook, or CRM sync. Distribution logic happens automatically once a lead passes qualification.',
	},
	{
		question: 'Why choose shared over exclusive leads?',
		answer:
			'Shared leads typically lower cost per lead and increase volume capacity. They are a strong fit when speed, team process, and conversion operations are tuned for competitive follow-up.',
	},
];

export default function SharedLeadsPage() {
	return (
		<main className='min-h-screen'>
			<CallLogicBanner
				badge='Pay Per Lead'
				title='Shared Leads: Scalable Volume at Efficient CPL'
				subtitle='Increase lead flow through controlled multi-buyer distribution with quality safeguards built in.'
				accent='mint'
				bgVariant='live_transfer'
				primaryCta={{ label: 'Get a Free Consultation', href: '/contact' }}
				secondaryLink={{ label: 'Back to Pay Per Lead', href: '/services/pay-per-lead' }}
			/>
			<div className='w-full bg-background'>
				<CallProcessFlow
					className={SECTION_PADDING}
					title='How shared leads are distributed'
					subtitle='Quality-first intake followed by rules-based multi-buyer delivery.'
					accent='mint'
					steps={[
						{
							step: '01',
							title: 'Lead intake and verification',
							description:
								'Inbound leads are captured from approved sources and validated for contact quality and required campaign fields.',
							techNotes: ['Approved source capture', 'Field checks', 'Contact verification'],
						},
						{
							step: '02',
							title: 'Qualification and allocation',
							description:
								'Lead records are filtered against campaign criteria, then allocated based on predefined buyer and pacing rules.',
							techNotes: ['Campaign fit filters', 'Buyer allocation logic', 'Volume pacing controls'],
						},
						{
							step: '03',
							title: 'Multi-endpoint delivery',
							description:
								'Qualified leads are distributed instantly through CRM, API, or webhook endpoints with source context included.',
							techNotes: ['CRM/API/webhook routing', 'Instant distribution', 'Attribution metadata'],
						},
					]}
				/>
			</div>
			<div className='w-full bg-muted/30'>
				<CallAdvantagesGrid
					className={SECTION_PADDING}
					title='Key advantages of shared lead programs'
					subtitle='When growth velocity and cost efficiency matter most.'
					items={[
						{
							title: 'Lower average cost per lead',
							description:
								'Shared distribution reduces per-lead costs while preserving qualification standards, improving budget flexibility.',
							iconKey: 'BarChart3',
							tone: 'mint',
						},
						{
							title: 'Faster volume scaling',
							description:
								'Shared inventory supports higher throughput, making it easier to grow campaigns without waiting on narrow supply.',
							iconKey: 'TrendingUp',
							tone: 'sky',
						},
						{
							title: 'Structured distribution control',
							description:
								'Rules-based sharing keeps allocation consistent across buyers and preserves quality expectations across the program.',
							iconKey: 'Target',
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
					subtitle='Run shared lead distribution with transparent rules, measurable quality, and flexible delivery.'
					features={SHARED_FEATURES}
				/>
			</div>
			<div className='w-full bg-background'>
				<StandardVsOptimizedMicroCard
					className={SECTION_PADDING}
					title='Standard vs CoreCloser-Optimized'
					accent='mint'
					standard={{
						label: 'Standard',
						bullets: [
							'Unstructured sharing without pacing rules',
							'Inconsistent quality checks before delivery',
							'Limited visibility into source performance',
						],
					}}
					optimized={{
						label: 'CoreCloser-optimized',
						bullets: [
							'Controlled multi-buyer distribution logic',
							'Qualification filters applied before sharing',
							'Performance data by source and buyer profile',
						],
					}}
					note='Distribution depth and billing definitions are aligned before launch.'
				/>
			</div>
			<div className='w-full bg-muted/30'>
				<FAQ
					items={SHARED_FAQS}
					variant='pastel'
					badge='Shared Leads FAQ'
					description='Frequently asked questions about shared Pay Per Lead—distribution, quality, pricing, and delivery speed.'
					className={SECTION_PADDING}
				/>
			</div>
			<div className='w-full bg-background'>
				<ConsultationCTA
					className={SECTION_PADDING}
					category='pay-per-lead'
					sourcePage='shared'
					badge={{ label: 'Exclusive Access', icon: 'Check' }}
					title='Apply for shared lead capacity'
					subtitle='Scale volume with controlled shared distribution and qualification standards your team can trust.'
					features={[
						{
							title: 'Efficient CPL at scale',
							description: 'Access larger lead volume while keeping acquisition costs competitive.',
							icon: 'Zap',
						},
						{
							title: 'Rules-based distribution',
							description: 'Control how leads are allocated across buyers and markets.',
							icon: 'TrendingUp',
						},
						{
							title: 'Fast delivery workflows',
							description: 'Push leads to CRM, API, or webhook endpoints in real time.',
							icon: 'Eye',
						},
					]}
					tagline='No retainers, no long-term lock-ins—just results.'
					formTitle='Tell us about your needs'
					submitLabel='Secure My Shared Leads'
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
