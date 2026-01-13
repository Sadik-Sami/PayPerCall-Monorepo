import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	PricingTable,
	ProcessSteps,
	ServiceHero,
	TrustStrip,
} from '@/components/services';
import heroImageLanding from '@/public/images/slider/slider-2.jpg';
import { Megaphone, MousePointer, BarChart3 } from 'lucide-react';

export const revalidate = 3600;

const HERO_CONTENT = {
	pill: 'Landing Pages',
	title: 'Campaign landing pages with clean proof and tracking',
	subtitle: 'Each build ships with fast load times, tested messaging, and analytics so you know every dollar’s impact.',
	features: ['Conversion copy', 'Event tracking', 'A/B test ready'],
	stat: { value: 'Kickoff call · free', label: 'Includes outline + measurement plan' },
	primaryCta: { label: 'Brief Us on Your Campaign', href: '/contact' },
	secondaryCta: { label: 'See Pricing Options', href: '/services/web-dev/landing-page#pricing' },
	footnote: 'We’ll share draft wireframes within 48 hours of the call.',
	media: {
		src: heroImageLanding,
		alt: 'Creative director reviewing landing page wireframes',
		caption: 'Wireframes plus copy beats guesswork every time.',
	},
};

const TRUST_CONTENT = {
	logos: [{ name: 'Peak Software' }, { name: 'Atlas Risk' }, { name: 'Lumen Healthcare' }],
	metrics: [
		{ label: 'Landing pages shipped in 2025', value: '210' },
		{ label: 'Median conversion lift', value: '+28%' },
		{ label: 'Average turnaround for first version', value: '10 days' },
		{ label: 'A/B test support duration', value: '4 weeks' },
	],
};

const PROCESS_STEPS = [
	{ title: 'Campaign Intake', description: 'Clarify the offer, audience, traffic source, and success metrics.' },
	{
		title: 'Wireframe & Copy Collaboration',
		description: 'Draft structure and conversion copy with stakeholders or internal copy partners.',
	},
	{
		title: 'Build & QA',
		description: 'Develop in Next.js with strict performance budgets and analytics instrumentation.',
	},
	{
		title: 'Experiment & Optimize',
		description: 'Support variant launches, heatmaps, and metric reviews to secure lift.',
	},
];

const CASE_STUDIES = [
	{
		client: 'Peak Software',
		problem: 'Paid search campaigns were constrained by legacy landing templates.',
		solution: 'Introduced modular hero, proof, and pricing blocks with targeted messaging for each vertical.',
		outcome: 'Lowered cost per qualified lead by 33% within 45 days.',
		icon: <Megaphone className='size-5' />,
		metrics: [
			{ label: 'CPL', value: '-33%' },
			{ label: 'Time to launch', value: '45 days' },
		],
	},
	{
		client: 'Atlas Risk',
		problem: 'Enterprise risk offering needed long-form education without hurting speed.',
		solution: 'Crafted a narrative-driven page with expandable sections and structured schema.',
		outcome: 'Sales accepted leads improved 41% with sub-1.5s LCP.',
		icon: <BarChart3 className='size-5' />,
		metrics: [
			{ label: 'SQL lift', value: '+41%' },
			{ label: 'LCP', value: '1.5s' },
		],
	},
	{
		client: 'Lumen Healthcare',
		problem: 'Webinar registrations stalled due to unclear agenda and proof.',
		solution: 'Developed a repeatable webinar page system with agenda builder, speaker bios, and reminders.',
		outcome: 'Registration rate climbed to 48% of unique visitors.',
		icon: <MousePointer className='size-5' />,
		metrics: [
			{ label: 'Registrations', value: '48%' },
			{ label: 'Reminder opt-in', value: '+63%' },
		],
	},
];

const PRICING_PLANS = [
	{
		name: 'Single Landing Page',
		description: 'One campaign, high velocity.',
		priceLabel: 'From $6k',
		features: [
			'Strategy + copy walkthrough',
			'Custom design + build',
			'Analytics + event setup',
			'One round of refinements',
		],
	},
	{
		name: 'Landing Page Bundle',
		description: 'Three coordinated pages or funnel steps.',
		priceLabel: 'From $15k',
		features: ['Shared component system', 'Per-channel optimization', 'QA across devices', 'Experiment roadmap'],
		isRecommended: true,
		badge: 'Most booked',
	},
	{
		name: 'Optimization Retainer',
		description: 'Ongoing testing and variant creation.',
		priceLabel: 'From $8k / month',
		features: [
			'Experiment backlog management',
			'Design + build of variants',
			'Weekly reporting',
			'Stakeholder reviews',
		],
	},
];

const FAQ_ITEMS = [
	{
		question: 'Do you supply copy or work with our team?',
		answer:
			'We can collaborate with your internal marketers or bring in conversion-focused copy partners. Every engagement starts with a messaging workshop.',
	},
	{
		question: 'What analytics integrations are included?',
		answer:
			'We wire up your analytics stack (GA4, HubSpot, Segment, etc.) and configure conversion events tied to the campaign goal.',
	},
	{
		question: 'Can you support multiple traffic sources?',
		answer:
			'Yes. We adapt modules for paid search, paid social, webinars, or partnerships so you can run controlled experiments per channel.',
	},
	{
		question: 'Is the campaign planning call free?',
		answer: 'Yes. Sharing your brief and getting our outline costs nothing—we only bill if you green-light a build.',
	},
];

export default function LandingPageWebDevPage() {
	return (
		<main className='space-y-12'>
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<TrustStrip className='max-w-7xl mx-auto' {...TRUST_CONTENT} />
			<ProcessSteps className='max-w-7xl mx-auto' steps={PROCESS_STEPS} title='Landing page delivery model' />
			<CaseStudyStrip className='max-w-7xl mx-auto' items={CASE_STUDIES} title='Conversion lifts backed by data' />
			<PricingTable
				className='max-w-7xl mx-auto scroll-mt-24'
				title='Landing page pricing'
				description='Choose the engagement that matches your campaign cadence—every option kicks off with a free brief.'
				plans={PRICING_PLANS}
				billingNote='Turnarounds assume approved copy and brand assets within 48 hours of kickoff.'
			/>
			<FAQSection className='max-w-7xl mx-auto' items={FAQ_ITEMS} />
			<ConsultationCTA
				className='max-w-7xl mx-auto scroll-mt-24'
				title='Highlight your next campaign with a free planning call'
				bullets={[
					'Share the offer, KPI, and traffic plan in plain language.',
					'See wireframe and copy patterns that already convert.',
					'Leave with scope, price range, and launch timeline.',
				]}
				formVariant='short'
			/>
		</main>
	);
}
