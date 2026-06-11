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

import {
	DIGITAL_MARKETING_SERVICE_NAV,
	DIGITAL_MARKETING_GATEWAY_CONFIG,
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
	CASE_STUDIES,
	FAQS,
	CONSULTATION_FEATURES,
} from '@/components/sections/services/digital-marketing';

export default function DigitalMarketingPage() {
	return (
		<main className='min-h-screen'>
			<HeroSection
				className='mt-12 md:mt-0'
				title='Digital Marketing'
				subtitle='Scale your revenue with data-driven SEO, PPC, and Social Media campaigns designed for measurable ROI and predictable growth.'
				callToAction={{
					text: 'Get a Marketing Audit',
					href: '/contact',
				}}
				backgroundImage='https://plus.unsplash.com/premium_photo-1687362298502-1881385c786f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
				contactInfo={{
					website: 'https://corecloser.com',
					phone: '+1 (855) 330-2777',
					address: '20555 US-19 N, Clearwater, FL 33763',
				}}
			/>
            <IndustryTrustSlider />
            <div className='w-full bg-muted/30'>
				<ROICalculatorSection className={SECTION_PADDING} mode='marketing' />
			</div>
			<div className='w-full bg-background'>
				<ValuePropositionSection
					className={SECTION_PADDING}
					badgeLabel='The Digital Marketing Advantage'
					titleHighlight='Digital Marketing'
					description='We move beyond vanity metrics. Our strategies focus on what actually matters: lower acquisition costs, higher conversion rates, and scalable revenue growth.'
					valueCards={VALUE_CARDS}
					transformationPairs={TRANSFORMATION_PAIRS}
				/>
			</div>
			<div className='w-full bg-muted/30'>
				<TransformationComparisonSection
					className={SECTION_PADDING}
					ctaHref='/contact'
					ctaLabel='Audit Your Marketing ROI'
					badgeLabel='Transformation Comparison'
					titleHighlight='Marketing Efficiency'
					description='Stop guessing which channels work. We align your ad spend with actual pipeline growth and predictable conversions.'
					beforeTitle='Before Our Marketing'
					beforeDescription='Fragmented campaigns, unknown attribution, and rising CPLs eating into profit margins.'
					afterTitle='The Optimized Approach'
					afterDescription='Unified channel strategy, clear attribution, and compounding organic growth.'
					beforeItems={BEFORE_ITEMS}
					afterItems={AFTER_ITEMS}
					stats={STATS}
					readyTitle='Ready to scale?'
					readyDescription='Join businesses already using our framework to drive predictable inbound growth.'
				/>
			</div>
			<div className='w-full bg-background'>
				<Industries variant='pastel' className='py-20 md:py-24' />
			</div>
			<div className='w-full bg-muted/30'>
				<StrategicBlueprintSection
					className={SECTION_PADDING}
					badgeLabel='Strategic Blueprint'
					title='Your Blueprint to Market Dominance'
					description='We engineer growth through a proven process—from auditing your current state to scaling winning campaigns.'
					steps={BLUEPRINT_STEPS}
				/>
			</div>
			<div className='w-full bg-background'>
				<CaseStudyStrip
					items={CASE_STUDIES}
					title='Success Stories'
					description='See how we’ve helped businesses scale their digital footprint and dominate their search and social channels.'
					cta={{ text: 'Get a Marketing Audit', href: '/contact' }}
					className={SECTION_PADDING}
				/>
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
				<FAQ
					items={FAQS}
					variant='pastel'
					badge='Marketing FAQ'
					description='Everything you need to know about our SEO, PPC, and Social campaigns. We believe in total transparency.'
					className={SECTION_PADDING}
				/>
			</div>
			<div className='w-full bg-muted/30'>
				<ConsultationCTA
					className={SECTION_PADDING}
					category='digital-marketing'
					badge={{ label: 'Expert Strategy', icon: 'Check' }}
					title='Get Your Free Marketing Audit'
					subtitle='We will analyze your current campaigns, find the leaks in your funnel, and show you exactly how to scale.'
					features={CONSULTATION_FEATURES}
					tagline='Stop guessing. Start growing.'
					formTitle='Tell us about your goals'
					submitLabel='Request Free Audit'
					formVariant='detailed'
				/>
			</div>
            <StickyCTA title="Want to scale your traffic?" ctaText="Get a Marketing Audit" href="/contact" />
		</main>
	);
}
