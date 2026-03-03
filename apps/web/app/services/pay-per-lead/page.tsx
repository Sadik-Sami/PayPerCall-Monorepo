import { HeroSection } from '@/components/sections/blocks/HeroSection';
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
} from '@/components/sections/services';
import FAQ from '@/components/sections/shared/FAQ';
import Industries from '@/components/sections/shared/Industries';
import {
	PAY_PER_LEAD_SERVICE_NAV,
	PAY_PER_LEAD_GATEWAY_CONFIG,
	buildGatewayCards,
} from '@/lib/services/nav-items';
import {
	SECTION_PADDING,
	VALUE_CARDS,
	TRANSFORMATION_PAIRS,
	BEFORE_ITEMS,
	AFTER_ITEMS,
	STATS,
	BLUEPRINT_STEPS,
	CASE_STUDIES,
	FAQS,
	CONSULTATION_FEATURES,
} from '@/components/sections/services/pay-per-lead';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Pay Per Lead Services | Exclusive, Shared & Real-Time Leads | PayPerCall',
	description:
		'Expert pay-per-lead services: exclusive leads, shared leads, and real-time lead delivery for measurable marketing ROI. Free consultation.',
	alternates: { canonical: '/services/pay-per-lead' },
	robots: { index: true, follow: true },
};

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
					valueCards={VALUE_CARDS}
					transformationPairs={TRANSFORMATION_PAIRS}
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
					beforeItems={BEFORE_ITEMS}
					afterItems={AFTER_ITEMS}
					stats={STATS}
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
					steps={BLUEPRINT_STEPS}
				/>
			</div>
			<div className="w-full bg-muted/30">
				<ROICalculatorSection className={SECTION_PADDING} mode="lead" />
			</div>
			<div className="w-full bg-background">
				<CaseStudyStrip
					items={CASE_STUDIES}
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
		</main>
	);
}
