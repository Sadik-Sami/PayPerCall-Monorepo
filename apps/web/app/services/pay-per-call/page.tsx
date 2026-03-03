import { HeroSection } from "@/components/blocks/hero-1";
import { InfiniteSlider } from "@workspace/ui/components/infinite-slider";
import appleIcon from '@/public/icons/apple.svg'
import googleIcon from '@/public/icons/google.svg'
import facebookIcon from '@/public/icons/facebook.svg'
import twitterIcon from '@/public/icons/twitter.svg'
import slackIcon from '@/public/icons/slack.svg'
import whatsappIcon from '@/public/icons/whatsapp.svg'
import Image from "next/image";
import {
	CaseStudyStrip,
	ConsultationCTA,
	ROICalculatorSection,
	ServiceCapabilitiesGateway,
	StrategicBlueprintSection,
	TransformationComparisonSection,
	ValuePropositionSection,
} from '@/components/services';
import FAQ from '@/components/landing/FAQ';
import type { CaseStudyCardItem, FaqItem } from '@/types/services';
import {
	PAY_PER_CALL_SERVICE_NAV,
	PAY_PER_CALL_GATEWAY_CONFIG,
	buildGatewayCards,
} from '@/components/services/nav-items';

const PAY_PER_CALL_CASE_STUDIES: CaseStudyCardItem[] = [
	{
		title: 'Solar Growth',
		description:
			'A comprehensive call-based acquisition strategy for a leading solar provider, resulting in a 300% increase in qualified inbound calls within the first quarter.',
		accentColor: 'pastel-peach',
	},
	{
		title: 'Legal Scale',
		description:
			'Custom call routing and intake funnel designed for a premium law firm, optimizing their client intake process and significantly reducing cost-per-acquisition.',
		accentColor: 'pastel-lilac',
	},
	{
		title: 'Tech Innovate',
		description:
			'End-to-end call attribution and routing strategy that helped a mid-size SaaS company streamline their sales operations and boost conversion from calls by 45%.',
		accentColor: 'pastel-lime',
	},
];

const PAY_PER_CALL_FAQS: FaqItem[] = [
	{
		question: 'What is Pay Per Call and how does it work?',
		answer:
			'Pay Per Call is a performance-based marketing model where you pay only for qualified inbound phone calls. We drive high-intent prospects to your phone via targeted channels—search, display, and partnerships—so you only pay when a real prospect reaches you. No retainers, no guessing: you pay for results.',
	},
	{
		question: 'How do you ensure call quality?',
		answer:
			'Quality is protected through smart targeting, IVR filtering, minimum call duration rules, geo and device controls, and fraud detection. We layer intent targeting and qualification rules so you receive calls that match your offer. Weekly performance reviews help us optimize toward conversions, not just volume.',
	},
	{
		question: 'How quickly can I start receiving calls?',
		answer:
			'Most campaigns go live within a few business days once we have your targeting, offer details, call routing, and tracking in place. Setup time depends on compliance approvals and any custom tracking needs. We move fast so you can start closing sooner.',
	},
	{
		question: 'What tracking and reporting do I get?',
		answer:
			'You get clear reporting on call volume, call duration, conversion signals, source performance, and cost-per-acquisition. We provide ongoing optimization based on what actually converts—sharper targeting, stronger quality, and scalable growth driven by real outcomes.',
	},
	{
		question: 'Is there a minimum commitment or long-term contract?',
		answer:
			'No long-term lock-ins. We offer flexible terms so you can scale based on results. Start with a test volume, prove the ROI, and grow from there. You stay in control—we focus on delivering calls that convert.',
	},
	{
		question: 'How does billing work?',
		answer:
			'You pay per qualified call. Pricing is transparent with clear definitions of what counts as a billable call—typically based on duration, IVR confirmation, or other quality thresholds we agree on upfront. No hidden fees or surprise charges.',
	},
];

const SECTION_PADDING = 'max-w-7xl mx-auto py-20 md:py-24';

export default function PayPerCallPage() {
	return (
		<main className='min-h-screen'>
			<HeroSection
				className="mt-12 md:mt-0"
				title="Pay Per Call"
				subtitle="Pay Per Call is a marketing service that allows you to pay for each call you receive. It is a great way to get more leads and sales."
				callToAction={{
					text: "Get a Free Consultation",
					href: "/contact",
				}}
				backgroundImage="https://plus.unsplash.com/premium_photo-1687362298502-1881385c786f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				contactInfo={{
					website: "https://corecloser.com",
					phone: "+1 (855) 330-2777",
					address: "20555 US-19 N, Clearwater, FL 33763",
				}}
			/>
			<div className="w-full bg-background">
				<InfiniteSlider gap={128} speed={50} className={SECTION_PADDING}>
					<Image src={appleIcon} className='h-12 w-auto' alt="apple" width={48} height={48} />
					<Image src={googleIcon} className='h-12 w-auto' alt="google" width={48} height={48} />
					<Image src={facebookIcon} className='h-12 w-auto' alt="facebook" width={48} height={48} />
					<Image src={twitterIcon} className='h-12 w-auto' alt="twitter" width={48} height={48} />
					<Image src={slackIcon} className='h-12 w-auto' alt="slack" width={48} height={48} />
					<Image src={whatsappIcon} className='h-12 w-auto' alt="whatsapp" width={48} height={48} />
				</InfiniteSlider>
			</div>
			<div className="w-full bg-muted/30">
				<ValuePropositionSection className={SECTION_PADDING} />
			</div>
			<div className="w-full bg-background">
				<TransformationComparisonSection className={SECTION_PADDING} />
			</div>
			<div className="w-full bg-muted/30">
				<StrategicBlueprintSection className={SECTION_PADDING} />
			</div>
			<div className="w-full bg-background">
				<ROICalculatorSection className={SECTION_PADDING} />
			</div>
			<div className="w-full bg-muted/30">
				<CaseStudyStrip
					items={PAY_PER_CALL_CASE_STUDIES}
					title="Success Stories"
					description="See how we've helped businesses scale their operations and achieve unprecedented growth with our strategic blueprint."
					cta={{ text: 'Get a Free Consultation', href: '/contact' }}
					className={SECTION_PADDING}
				/>
			</div>
			<div className="w-full bg-background">
				<ServiceCapabilitiesGateway
					title={PAY_PER_CALL_GATEWAY_CONFIG.title}
					subtitle={PAY_PER_CALL_GATEWAY_CONFIG.subtitle}
					cards={buildGatewayCards(
						PAY_PER_CALL_SERVICE_NAV,
						'/services/pay-per-call',
						PAY_PER_CALL_GATEWAY_CONFIG.ctaLabels,
						PAY_PER_CALL_GATEWAY_CONFIG.iconKeys
					)}
					primaryCta={PAY_PER_CALL_GATEWAY_CONFIG.primaryCta}
					primaryCtaNote={PAY_PER_CALL_GATEWAY_CONFIG.primaryCtaNote}
					columns={PAY_PER_CALL_GATEWAY_CONFIG.columns}
					className={SECTION_PADDING}
				/>
			</div>
			<div className="w-full bg-muted/30">
				<FAQ
					items={PAY_PER_CALL_FAQS}
					variant="pastel"
					badge="Pay Per Call FAQ"
					description="Everything you need to know about Pay Per Call—billing, quality, tracking, and how to get started. We're here to help you scale."
					className={SECTION_PADDING}
				/>
			</div>
			<div className="w-full bg-background">
				<ConsultationCTA
					className={SECTION_PADDING}
					category='pay-per-call'
					badge={{ label: 'Exclusive Access', icon: 'Check' }}
					title='Apply for Call Capacity'
					subtitle='Scale your operations with pre-vetted, high-intent inbound calls. Skip the cold outreach and start closing immediately.'
					features={[
						{
							title: 'Instant High-Intent Leads',
							description: 'Connect with prospects who are actively searching for your solution right now.',
							icon: 'Zap',
						},
						{
							title: 'Predictable Scaling',
							description: 'Receive phased volume recommendations tailored to your team’s capacity.',
							icon: 'TrendingUp',
						},
						{
							title: 'Full Transparency',
							description: 'See exact budget ranges, timelines, and expected ROI before you commit.',
							icon: 'Eye',
						},
					]}
					tagline='No retainers, no long-term lock-ins—just results.'
					formTitle='Tell us about your needs'
					submitLabel='Secure My Call Flow'
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}