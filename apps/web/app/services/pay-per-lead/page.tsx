import { HeroSection } from '@/components/blocks/hero-1';
import { InfiniteSlider } from '@workspace/ui/components/infinite-slider';
import appleIcon from '@/public/icons/apple.svg';
import googleIcon from '@/public/icons/google.svg';
import facebookIcon from '@/public/icons/facebook.svg';
import twitterIcon from '@/public/icons/twitter.svg';
import slackIcon from '@/public/icons/slack.svg';
import whatsappIcon from '@/public/icons/whatsapp.svg';
import Image from 'next/image';
import {
	CaseStudyStrip,
	ConsultationCTA,
	ROICalculatorSection,
	ServiceCapabilitiesGateway,
	StrategicBlueprintSection,
	TransformationComparisonSection,
	ValuePropositionSection,
	type BlueprintStep,
	type ValuePropositionCard,
	type ValueTransformationPair,
	type TransformationBeforeItem,
	type TransformationAfterItem,
	type TransformationStat,
} from '@/components/services';
import FAQ from '@/components/landing/FAQ';
import Industries from '@/components/landing/Industries';
import type { CaseStudyCardItem, FaqItem } from '@/types/services';
import {
	PAY_PER_LEAD_SERVICE_NAV,
	PAY_PER_LEAD_GATEWAY_CONFIG,
	buildGatewayCards,
} from '@/components/services/nav-items';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Pay Per Lead Services | Exclusive, Shared & Real-Time Leads | PayPerCall',
	description:
		'Expert pay-per-lead services: exclusive leads, shared leads, and real-time lead delivery for measurable marketing ROI. Free consultation.',
	alternates: { canonical: '/services/pay-per-lead' },
	robots: { index: true, follow: true },
};

const PAY_PER_LEAD_VALUE_CARDS: ValuePropositionCard[] = [
	{
		title: 'Verified Intent',
		description:
			'Every lead is validated through multi-step qualification—contact info, purchase intent, and custom criteria—so your team receives only sales-ready prospects.',
		icon: 'UserCheck',
		theme: 'emerald',
	},
	{
		title: 'Duplicate Suppression',
		description:
			'Advanced deduplication ensures you never pay twice for the same prospect. Our systems scrub against your CRM and our network before delivery.',
		icon: 'Filter',
		theme: 'purple',
	},
	{
		title: 'Compliant by Design',
		description:
			'Full legal compliance with documented consent, litigator scrubbing, and state-specific rules. Every lead meets TCPA and applicable regulations.',
		icon: 'FileCheck',
		theme: 'amber',
	},
	{
		title: 'Real-Time Delivery',
		description:
			'Leads reach your CRM or sales team in seconds via API, webhook, or postback. No batch delays—close while intent is hot.',
		icon: 'Zap',
		theme: 'blue',
	},
];

const PAY_PER_LEAD_TRANSFORMATION_PAIRS: ValueTransformationPair[] = [
	{ before: 'Chasing cold form fills', after: 'Sales-Ready Leads', featured: true },
	{ before: 'Hours to first contact', after: 'Seconds to CRM', featured: false },
	{ before: 'Duplicate waste', after: 'Exclusive ownership', featured: false },
	{ before: 'Guessing ROI', after: 'Proven economics', featured: false },
];

const PAY_PER_LEAD_BEFORE_ITEMS: TransformationBeforeItem[] = [
	{
		title: 'Cold, Slow Leads',
		description:
			'Buying generic form fills that take hours to reach your team. By the time you follow up, the prospect has moved on or gone with a competitor.',
		icon: 'Inbox',
	},
	{
		title: 'Duplicate Burn',
		description:
			'Paying for the same lead across multiple sources. Your SDRs waste time on recycled contacts that have already been contacted or converted.',
		icon: 'Users',
	},
	{
		title: 'No Visibility',
		description:
			'Guessing at lead quality with no real-time tracking. Revenue stalls when you can\'t predict volume or optimize based on what actually converts.',
		icon: 'Clock',
	},
];

const PAY_PER_LEAD_AFTER_ITEMS: TransformationAfterItem[] = [
	{
		title: 'Instant Delivery',
		description:
			'Leads hit your CRM in seconds via API or webhook. Your team follows up while intent is high—no more playing catch-up with stale submissions.',
		icon: 'Zap',
		pastel: 'pastel-mint',
	},
	{
		title: 'Exclusive Ownership',
		description:
			'Exclusive leads are yours alone—no sharing. Or choose shared leads for lower cost when exclusivity isn\'t required. You control the model.',
		icon: 'UserCheck',
		pastel: 'pastel-sky',
	},
	{
		title: 'Predictable Volume',
		description:
			'Scale lead flow on demand. Clear reporting on CPL, conversion, and source performance so you optimize toward outcomes, not vanity metrics.',
		icon: 'BarChart3',
		pastel: 'pastel-lilac',
	},
	{
		title: 'Quality-First',
		description:
			'Every lead passes qualification rules you define. Geographic, demographic, and intent filters ensure you pay only for prospects that match your offer.',
		icon: 'Filter',
		pastel: 'pastel-peach',
	},
];

const PAY_PER_LEAD_STATS: TransformationStat[] = [
	{ value: '90+', label: 'Seconds to CRM', pastel: 'pastel-sky' },
	{ value: '2.8x', label: 'ROI Average', pastel: 'pastel-mint' },
	{ value: '0%', label: 'Duplicate Waste', pastel: 'pastel-lilac' },
];

const PAY_PER_LEAD_BLUEPRINT_STEPS: BlueprintStep[] = [
	{
		title: 'Define Vertical',
		description:
			'Choose your niche—Insurance, Legal, Home Services, or more. We target the right audience and intent from day one.',
		icon: 'Target',
		bg: 'bg-pastel-lime',
		border: 'border-pastel-lime-border',
		iconCircle: 'bg-pastel-lime-strong text-primary-foreground',
		numberAccent: 'text-pastel-lime-strong/40',
	},
	{
		title: 'Specify Lead Criteria',
		description:
			'Define qualification rules, required fields, geo-targeting, and delivery preferences. We match leads to your exact specs.',
		icon: 'Filter',
		bg: 'bg-pastel-sky',
		border: 'border-pastel-sky-border',
		iconCircle: 'bg-pastel-sky-strong text-primary-foreground',
		numberAccent: 'text-pastel-sky-strong/40',
	},
	{
		title: 'Connect Delivery',
		description:
			'Integrate via API, webhook, or CRM postback. Leads flow directly into your systems in real time.',
		icon: 'Database',
		bg: 'bg-pastel-lilac',
		border: 'border-pastel-lilac-border',
		iconCircle: 'bg-pastel-lilac-strong text-primary-foreground',
		numberAccent: 'text-pastel-lilac-strong/40',
	},
	{
		title: 'Scale at Will',
		description:
			'Ramp volume up or down based on results. Predictable CPL and clear ROI let you grow with confidence.',
		icon: 'TrendingUp',
		bg: 'bg-value-soft-yellow',
		border: 'border-pastel-peach-border',
		iconCircle: 'bg-pastel-peach-strong text-primary-foreground',
		numberAccent: 'text-pastel-peach-strong/40',
	},
];

const PAY_PER_LEAD_CASE_STUDIES: CaseStudyCardItem[] = [
	{
		title: 'Insurance Scale',
		description:
			'Exclusive lead program for a regional insurance agency that delivered 2,400 qualified homeowners leads in the first quarter, with a 22% quote-to-close rate.',
		accentColor: 'pastel-peach',
	},
	{
		title: 'Legal Intake',
		description:
			'Real-time lead delivery and custom qualification for a PI firm. Reduced intake time from hours to seconds and increased signed retainers by 35%.',
		accentColor: 'pastel-lilac',
	},
	{
		title: 'Solar Pipeline',
		description:
			'Shared and exclusive lead mix for a solar installer. Optimized CPL while maintaining conversion quality, cutting cost-per-acquisition by 40%.',
		accentColor: 'pastel-lime',
	},
];

const PAY_PER_LEAD_FAQS: FaqItem[] = [
	{
		question: 'What is Pay Per Lead and how does it work?',
		answer:
			'Pay Per Lead is a performance-based model where you pay only for qualified lead submissions—contact forms, quote requests, or appointment bookings. We drive high-intent prospects to your offers via targeted channels, then deliver each lead to your CRM or sales team in real time. You pay for results, not impressions.',
	},
	{
		question: 'What\'s the difference between exclusive and shared leads?',
		answer:
			'Exclusive leads are sold to you alone—no other buyer receives the same prospect. Shared leads are distributed to multiple buyers at a lower cost per lead. We help you choose based on your close rate, team capacity, and budget. Many clients start with a mix and optimize over time.',
	},
	{
		question: 'How fresh are the leads when they reach me?',
		answer:
			'Leads are delivered in real time—typically within seconds of submission—via API, webhook, or CRM integration. The faster you follow up, the higher your conversion. We also support speed-to-lead alerts so your team can prioritize hot prospects.',
	},
	{
		question: 'How do you prevent duplicate leads?',
		answer:
			'We use network-wide deduplication, CRM scrubbing, and configurable rules to ensure you never pay twice for the same prospect. You can define duplicate windows and match criteria. Invalid or duplicate leads are credited per our replacement policy.',
	},
	{
		question: 'What delivery options do you support?',
		answer:
			'We support API, webhook, CRM postbacks (Salesforce, HubSpot, etc.), and email/SMS. You choose the format and fields. Setup typically takes a few business days once we have your integration details and compliance approvals.',
	},
	{
		question: 'How does billing work?',
		answer:
			'You pay per qualified lead. Pricing is transparent with clear definitions of what counts as billable—typically based on validation rules and delivery confirmation. No hidden fees. We offer flexible terms so you can scale based on results.',
	},
];

const SECTION_PADDING = 'max-w-7xl mx-auto py-20 md:py-24';

export default function PayPerLeadPage() {
	return (
		<main className="min-h-screen">
			<HeroSection
				className="mt-12 md:mt-0"
				title="Pay Per Lead"
				subtitle="Pay only for qualified leads delivered to your CRM in real time. Exclusive, shared, or instant—we scale your pipeline with measurable ROI."
				callToAction={{
					text: 'Get a Free Consultation',
					href: '/contact',
				}}
				backgroundImage="https://plus.unsplash.com/premium_photo-1687362298502-1881385c786f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				contactInfo={{
					website: 'https://corecloser.com',
					phone: '+1 (855) 330-2777',
					address: '20555 US-19 N, Clearwater, FL 33763',
				}}
			/>
			<div className="w-full bg-background">
				<InfiniteSlider gap={128} speed={50} className={SECTION_PADDING}>
					<Image src={appleIcon} className="h-12 w-auto" alt="apple" width={48} height={48} />
					<Image src={googleIcon} className="h-12 w-auto" alt="google" width={48} height={48} />
					<Image src={facebookIcon} className="h-12 w-auto" alt="facebook" width={48} height={48} />
					<Image src={twitterIcon} className="h-12 w-auto" alt="twitter" width={48} height={48} />
					<Image src={slackIcon} className="h-12 w-auto" alt="slack" width={48} height={48} />
					<Image src={whatsappIcon} className="h-12 w-auto" alt="whatsapp" width={48} height={48} />
				</InfiniteSlider>
			</div>
			<div className="w-full bg-muted/30">
				<ValuePropositionSection
					className={SECTION_PADDING}
					badgeLabel="The Pay Per Lead Advantage"
					titleHighlight="Pay Per Lead"
					description="We've reimagined lead generation. No more cold form fills—just sales-ready leads delivered to your CRM in seconds, with full transparency and quality control."
					valueCards={PAY_PER_LEAD_VALUE_CARDS}
					transformationPairs={PAY_PER_LEAD_TRANSFORMATION_PAIRS}
				/>
			</div>
			<div className="w-full bg-background">
				<TransformationComparisonSection
					className={SECTION_PADDING}
					ctaHref="/contact"
					ctaLabel="Upgrade Your Lead Engine"
					badgeLabel="Transformation Comparison"
					titleHighlight="Lead Efficiency"
					description="Stop burning budget on cold or duplicate leads. Pay Per Lead bridges the gap between generic form fills and predictable, conversion-driven growth."
					beforeTitle="Before Pay Per Lead"
					beforeDescription="The manual grind of chasing stale leads and surviving on low-quality or duplicated submissions."
					afterTitle="The Pay Per Lead Effect"
					afterDescription="Dominating the market with a stream of sales-ready leads and real-time delivery to your CRM."
					beforeItems={PAY_PER_LEAD_BEFORE_ITEMS}
					afterItems={PAY_PER_LEAD_AFTER_ITEMS}
					stats={PAY_PER_LEAD_STATS}
					readyTitle="Ready to switch?"
					readyDescription="Join 200+ teams already using Pay Per Lead to scale conversions and cut CPL waste."
				/>
			</div>
			<div className="w-full bg-muted/30">
				<Industries variant="pastel" className="py-20 md:py-24" />
			</div>
			<div className="w-full bg-background">
				<StrategicBlueprintSection
					className={SECTION_PADDING}
					badgeLabel="Strategic Blueprint"
					title="Your Blueprint to Inbound Leads"
					description="We simplify lead generation into four actionable steps—from vertical selection to real-time delivery and scaling."
					steps={PAY_PER_LEAD_BLUEPRINT_STEPS}
				/>
			</div>
			<div className="w-full bg-muted/30">
				<ROICalculatorSection className={SECTION_PADDING} mode="lead" />
			</div>
			<div className="w-full bg-background">
				<CaseStudyStrip
					items={PAY_PER_LEAD_CASE_STUDIES}
					title="Success Stories"
					description="See how we've helped businesses scale their lead pipelines with exclusive, shared, and real-time delivery."
					cta={{ text: 'Get a Free Consultation', href: '/contact' }}
					className={SECTION_PADDING}
				/>
			</div>
			<div className="w-full bg-muted/30">
				<ServiceCapabilitiesGateway
					title={PAY_PER_LEAD_GATEWAY_CONFIG.title}
					subtitle={PAY_PER_LEAD_GATEWAY_CONFIG.subtitle}
					cards={buildGatewayCards(
						PAY_PER_LEAD_SERVICE_NAV,
						'/services/pay-per-lead',
						PAY_PER_LEAD_GATEWAY_CONFIG.ctaLabels,
						PAY_PER_LEAD_GATEWAY_CONFIG.iconKeys
					)}
					primaryCta={PAY_PER_LEAD_GATEWAY_CONFIG.primaryCta}
					primaryCtaNote={PAY_PER_LEAD_GATEWAY_CONFIG.primaryCtaNote}
					columns={PAY_PER_LEAD_GATEWAY_CONFIG.columns}
					className={SECTION_PADDING}
				/>
			</div>
			<div className="w-full bg-background">
				<FAQ
					items={PAY_PER_LEAD_FAQS}
					variant="pastel"
					badge="Pay Per Lead FAQ"
					description="Everything you need to know about Pay Per Lead—exclusivity, delivery, compliance, and billing. We're here to help you scale."
					className={SECTION_PADDING}
				/>
			</div>
			<div className="w-full bg-muted/30">
				<ConsultationCTA
					className={SECTION_PADDING}
					category="pay-per-lead"
					badge={{ label: 'Exclusive Access', icon: 'Check' }}
					title="Apply for Lead Capacity"
					subtitle="Scale your pipeline with pre-vetted, sales-ready leads. Exclusive or shared—delivered to your CRM in seconds."
					features={[
						{
							title: 'Sales-Ready Leads',
							description: 'Connect with prospects who have shown intent and match your qualification criteria.',
							icon: 'Zap',
						},
						{
							title: 'Predictable CPL',
							description: 'Receive phased volume and CPL recommendations tailored to your budget and close rate.',
							icon: 'TrendingUp',
						},
						{
							title: 'Full Transparency',
							description: 'See exact budget ranges, delivery methods, and expected ROI before you commit.',
							icon: 'Eye',
						},
					]}
					tagline="No retainers, no long-term lock-ins—just results."
					formTitle="Tell us about your needs"
					submitLabel="Secure My Lead Flow"
					formVariant="detailed"
				/>
			</div>
		</main>
	);
}
