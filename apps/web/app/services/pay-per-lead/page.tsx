import { HeroSection } from '@/components/sections/blocks/HeroSection';
import { IndustryTrustSlider } from '@/components/sections/shared/trust/IndustryTrustSlider';
import { StickyCTA } from '@/components/sections/shared/StickyCTA';
import {
	CaseStudyStrip,
	ConsultationCTA,
	ROICalculatorSection,
	ServiceCapabilitiesGateway,
	StrategicBlueprintSection,
	TransformationComparisonSection,
	ValuePropositionSection,
} from '@/components/sections/services';
import FAQ from '@/components/sections/shared/FAQ';
import Industries from '@/components/sections/shared/Industries';
import { ImageContentSplit } from '@/components/sections/services/shared/ImageContentSplit';
import {
	PAY_PER_LEAD_SERVICE_NAV,
	PAY_PER_LEAD_GATEWAY_CONFIG,
	buildGatewayCards,
} from '@/lib/data/service-navigation';
import {
	SECTION_PADDING,
	VALUE_CARDS,
	TRANSFORMATION_PAIRS,
	BEFORE_ITEMS,
	AFTER_ITEMS,
	STATS,
	BLUEPRINT_STEPS,
	FAQS,
	CONSULTATION_FEATURES,
} from '@/components/sections/services/pay-per-lead';
import type { Metadata } from 'next';
import { getCaseStudiesByCategory } from '@/lib/api/case-studies';

export const metadata: Metadata = {
	title: 'Pay Per Lead Services | Exclusive, Shared & Real-Time Leads | PayPerCall',
	description:
		'Expert pay-per-lead services: exclusive leads, shared leads, and real-time lead delivery for measurable marketing ROI. Free consultation.',
	alternates: { canonical: '/services/pay-per-lead' },
	robots: { index: true, follow: true },
};

export default async function PayPerLeadPage() {
	const caseStudies = await getCaseStudiesByCategory('pay-per-lead');
	return (
		<main className="min-h-screen">
			<HeroSection
				className="mt-12 md:mt-0"
				title="Pay Per Lead"
				subtitle="Pay only for qualified leads delivered to your CRM in real time. Exclusive, shared, or instant—we scale your pipeline with measurable ROI."
				callToAction={{
					text: 'Get Lead Pricing',
					href: '/contact',
				}}
				backgroundImage="https://plus.unsplash.com/premium_photo-1687362298502-1881385c786f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				contactInfo={{
					website: 'https://corecloser.com',
					phone: '+1 (855) 330-2777',
					address: '20555 US-19 N, Clearwater, FL 33763',
				}}
			/>
            <IndustryTrustSlider />
            <div className="w-full bg-muted/30">
				<ROICalculatorSection className={SECTION_PADDING} mode="lead" />
			</div>
			<div className="w-full bg-background">
				<ValuePropositionSection
					className={SECTION_PADDING}
					badgeLabel="The Pay Per Lead Advantage"
					titleHighlight="Pay Per Lead"
					description="We've reimagined lead generation. No more cold form fills—just sales-ready leads delivered to your CRM in seconds, with full transparency and quality control."
					valueCards={VALUE_CARDS}
					transformationPairs={TRANSFORMATION_PAIRS}
				/>
			</div>
			<div className="w-full bg-muted/30">
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
					beforeItems={BEFORE_ITEMS}
					afterItems={AFTER_ITEMS}
					stats={STATS}
					readyTitle="Ready to switch?"
					readyDescription="Join 200+ teams already using Pay Per Lead to scale conversions and cut CPL waste."
				/>
			</div>
			<div className="w-full bg-background">
				<ImageContentSplit
					className={SECTION_PADDING}
					kicker="Real-Time Delivery"
					kickerAccent="sky"
					haloAccent="sky"
					headline="Exclusive leads, delivered the second they convert."
					description="Forget about aged data or shared lists that your competitors are already dialing. The Core Closer platform captures high-intent prospects and pushes their verified data directly into your CRM via API in milliseconds. When your sales team reaches out, the prospect is still actively looking for your solution."
					bullets={[
						{
							title: '100% Exclusive Data',
							description: 'We never recycle or syndicate leads. If you buy it, it’s yours alone.',
						},
						{
							title: 'Zero-Latency API Integration',
							description:
								'Seamlessly push lead data into Salesforce, HubSpot, GoHighLevel, or any custom CRM.',
						},
						{
							title: 'Vertical-Specific Targeting',
							description:
								'Granular filtering to ensure the lead matches your exact ideal customer profile (ICP).',
						},
					]}
					primaryCta={{ label: 'Explore API Integrations', href: '/contact' }}
					image={{
						src: '/images/ppl/ppl1.png',
						alt: 'Verified lead data flowing through the Core Closer hub into a CRM in real time',
					}}
				/>
			</div>
			<div className="w-full bg-muted/30">
				<ImageContentSplit
					reverse
					className={SECTION_PADDING}
					kicker="Verified Intent"
					kickerAccent="lilac"
					haloAccent="lilac"
					headline="Pristine data. You only pay for contactable leads."
					description="Your closers shouldn't spend their day chasing fake numbers and bounced emails. Our rigorous multi-step verification process instantly scrubs every lead in real-time. We validate contact details, verify intent, and block duplicate submissions before the lead ever hits your pipeline."
					bullets={[
						{
							title: 'Automated Verification',
							description:
								'Real-time phone and email pinging ensures the contact information is 100% active.',
						},
						{
							title: 'Strictly TCPA Compliant',
							description:
								'Every lead comes with documented, bulletproof opt-in records to protect your business.',
						},
						{
							title: 'Zero Fraud Guarantee',
							description:
								'Our AI actively blocks bot submissions and fraudulent form fills, protecting your budget.',
						},
					]}
					primaryCta={{ label: 'See Our Quality Standards', href: '/contact' }}
					primaryCtaVariant="lilac"
					image={{
						src: '/images/ppc/ppc2.png',
						alt: 'Verification funnel filtering invalid leads while clean data flows through to revenue',
					}}
				/>
			</div>
			<div className="w-full bg-background">
				<Industries variant="pastel" className="py-20 md:py-24" />
			</div>
			<div className="w-full bg-muted/30">
				<StrategicBlueprintSection
					className={SECTION_PADDING}
					badgeLabel="Strategic Blueprint"
					title="Your Blueprint to Inbound Leads"
					description="We simplify lead generation into four actionable steps—from vertical selection to real-time delivery and scaling."
					steps={BLUEPRINT_STEPS}
				/>
			</div>
			<div className="w-full bg-background">
				<CaseStudyStrip
					items={caseStudies}
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
					items={FAQS}
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
					features={CONSULTATION_FEATURES}
					tagline="No retainers, no long-term lock-ins—just results."
					formTitle="Tell us about your needs"
					submitLabel="Secure My Lead Flow"
					formVariant="detailed"
				/>
			</div>
            <StickyCTA title="Ready for high-intent leads?" ctaText="Get Lead Pricing" href="/contact" />
		</main>
	);
}
