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
	title: 'Exclusive Leads | Pay Per Lead | CoreCloser',
	description:
		'Own every lead you buy. Exclusive lead programs route one buyer per lead with custom qualification and full delivery transparency.',
	alternates: { canonical: '/services/pay-per-lead/exclusive' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Exclusive Leads | Pay Per Lead',
		description: 'One buyer per lead with qualification rules tailored to your sales process.',
		url: '/services/pay-per-lead/exclusive',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Exclusive Leads | Pay Per Lead',
		description: 'Own every lead you buy with exclusive delivery and transparent qualification.',
	},
	keywords: ['exclusive leads', 'pay per lead', 'lead exclusivity', 'qualified leads', 'crm lead delivery'],
};

export const revalidate = 3600;

const EXCLUSIVE_FEATURES: DataDrivenFeatureItem[] = [
	{
		title: 'Qualification Rule Engine',
		description: 'Define exact filters by geography, service need, and intent signals so only fit leads are delivered.',
		iconKey: 'Filter',
		tone: 'mint',
	},
	{
		title: 'Compliance-Ready Capture',
		description:
			'Consent fields and source records are captured at submission time for cleaner handoffs and audit confidence.',
		iconKey: 'ShieldCheck',
		tone: 'sky',
	},
	{
		title: 'Source Performance Insights',
		description: 'Compare conversion rates by source and campaign so budget moves toward the highest-yield channels.',
		iconKey: 'BarChart3',
		tone: 'lilac',
	},
	{
		title: 'CRM Field Mapping',
		description:
			'Send lead records into your CRM with mapped fields and ownership rules so reps can act without cleanup.',
		iconKey: 'RefreshCw',
		tone: 'peach',
	},
	{
		title: 'Priority Lead Scoring',
		description: 'Highlight higher-intent leads first to improve speed-to-contact and protect your close window.',
		iconKey: 'Sparkles',
		tone: 'mint',
	},
	{
		title: 'Instant Rep Alerts',
		description: 'Trigger real-time notifications so your team can follow up while buyer intent is still high.',
		iconKey: 'Send',
		tone: 'sky',
	},
];

const EXCLUSIVE_FAQS: FaqItem[] = [
	{
		question: 'What does exclusive mean in your lead model?',
		answer:
			'Exclusive means each lead is sold to one buyer only. No parallel distribution, no duplicate resale. Your team has the first and only shot at conversion, which protects close rates and brand experience.',
	},
	{
		question: 'Can we control qualification criteria by campaign?',
		answer:
			'Yes. We configure campaign-level filters such as geography, service type, time window, and contact validity. Your qualification framework is documented upfront and applied before delivery.',
	},
	{
		question: 'How quickly are exclusive leads delivered?',
		answer:
			'Leads are delivered in real time through CRM integration, webhook, or secure email workflow. Most clients receive new records within seconds of qualification.',
	},
	{
		question: 'How is billing handled for invalid submissions?',
		answer:
			'Billing terms are defined before launch, including what qualifies as billable and what counts as invalid. We maintain review workflows so disputed records can be validated quickly and transparently.',
	},
];

export default function ExclusiveLeadsPage() {
	return (
		<main className='min-h-screen'>
			<CallLogicBanner
				badge='Pay Per Lead'
				title='Exclusive Leads: One Buyer, One Opportunity'
				subtitle='Capture high-intent leads that are routed only to your team with clear qualification standards.'
				accent='lilac'
				bgVariant='search_social'
				primaryCta={{ label: 'Get a Free Consultation', href: '/contact' }}
				secondaryLink={{ label: 'Back to Pay Per Lead', href: '/services/pay-per-lead' }}
			/>
			<div className='w-full bg-background'>
				<CallProcessFlow
					className={SECTION_PADDING}
					title='How exclusive leads are delivered'
					subtitle='Qualification-first intake with direct routing to your CRM and sales team.'
					accent='lilac'
					steps={[
						{
							step: '01',
							title: 'Intent capture',
							description:
								'Prospects submit through targeted funnels built around your offer and market. Capture logic validates core details before acceptance.',
							techNotes: ['Offer-specific funnels', 'Field validation', 'Contact verification'],
						},
						{
							step: '02',
							title: 'Exclusive qualification',
							description:
								'Rules filter by geo, service fit, and quality thresholds. Approved records are marked for single-buyer delivery only.',
							techNotes: ['Geo + fit filters', 'Quality thresholds', 'Single-buyer lock'],
						},
						{
							step: '03',
							title: 'Direct delivery',
							description:
								'Qualified leads are pushed to your CRM and rep queues in seconds with source metadata for attribution and follow-up prioritization.',
							techNotes: ['CRM push in seconds', 'Source metadata', 'Rep-ready routing'],
						},
					]}
				/>
			</div>
			<div className='w-full bg-muted/30'>
				<CallAdvantagesGrid
					className={SECTION_PADDING}
					title='Key advantages of exclusive lead programs'
					subtitle='Why single-buyer distribution protects performance.'
					items={[
						{
							title: 'Full ownership of every lead',
							description:
								'Your reps are the only team contacting the lead, eliminating overlap and pricing pressure from shared distribution.',
							iconKey: 'Target',
							tone: 'lilac',
						},
						{
							title: 'Higher close-rate potential',
							description:
								'Exclusive access reduces response competition, giving your team cleaner conversations and better conversion conditions.',
							iconKey: 'TrendingUp',
							tone: 'sky',
						},
						{
							title: 'Controlled quality standards',
							description:
								'Qualification criteria are aligned to your offer and enforced before delivery, so reps spend time only on fit opportunities.',
							iconKey: 'ShieldCheck',
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
					subtitle='Operate your exclusive lead channel with transparent quality controls and delivery automation.'
					features={EXCLUSIVE_FEATURES}
				/>
			</div>
			<div className='w-full bg-background'>
				<StandardVsOptimizedMicroCard
					className={SECTION_PADDING}
					title='Standard vs CoreCloser-Optimized'
					accent='lilac'
					standard={{
						label: 'Standard',
						bullets: [
							'Open-form submissions with minimal filtering',
							'Inconsistent lead ownership and duplicate outreach',
							'Manual CRM cleanup before reps can engage',
						],
					}}
					optimized={{
						label: 'CoreCloser-optimized',
						bullets: [
							'Offer-aligned qualification rules before delivery',
							'Single-buyer exclusive routing by design',
							'Rep-ready CRM records with source context',
						],
					}}
					note='All qualification and billing rules are documented before launch.'
				/>
			</div>
			<div className='w-full bg-muted/30'>
				<FAQ
					items={EXCLUSIVE_FAQS}
					variant='pastel'
					badge='Exclusive Leads FAQ'
					description='Frequently asked questions about exclusive Pay Per Lead—ownership, qualification, delivery, and billing.'
					className={SECTION_PADDING}
				/>
			</div>
			<div className='w-full bg-background'>
				<ConsultationCTA
					className={SECTION_PADDING}
					category='pay-per-lead'
					sourcePage='exclusive'
					badge={{ label: 'Exclusive Access', icon: 'Check' }}
					title='Apply for exclusive lead capacity'
					subtitle='Get single-buyer leads routed to your team with custom qualification and transparent delivery.'
					features={[
						{
							title: 'Single-buyer ownership',
							description: 'Each qualified lead is delivered to one buyer only—your team.',
							icon: 'Zap',
						},
						{
							title: 'Custom quality thresholds',
							description: 'Set qualification rules to match your exact offer and market.',
							icon: 'TrendingUp',
						},
						{
							title: 'Immediate CRM delivery',
							description: 'Route approved leads instantly so reps can follow up while intent is high.',
							icon: 'Eye',
						},
					]}
					tagline='No retainers, no long-term lock-ins—just results.'
					formTitle='Tell us about your needs'
					submitLabel='Secure My Exclusive Leads'
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
