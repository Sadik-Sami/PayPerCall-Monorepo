import {
	CaseStudyStrip,
	FAQSection,
	FreeConsultationSection,
	PricingTable,
	ProcessSteps,
	ServiceHero,
	TrustStrip,
} from '@/components/services';
import heroImage3 from '@/public/images/slider/slider-3.jpg';
import { Briefcase, Building, Target } from 'lucide-react';

export const revalidate = 3600;

const HERO_CONTENT = {
	pill: 'Business Websites',
	title: 'B2B websites that back up your revenue goals',
	subtitle: 'Streamlined messaging, trust signals, and measurement so sales teams get cleaner leads.',
	features: ['Headless CMS', 'SEO + schema', 'Lead routing'],
	stat: { value: 'Free audit', label: 'Includes action plan + budget ranges' },
	primaryCta: { label: 'Request a Free Website Review', href: '/contact' },
	secondaryCta: { label: 'See Comparison Table', href: '/services/web-dev/business#pricing' },
	footnote: 'We follow up within one business day with the recorded findings.',
	media: {
		src: heroImage3,
		alt: 'Marketing leaders reviewing brand messaging',
		caption: 'Clear positioning, measurable funnels, confident governance.',
	},
};

const TRUST_CONTENT = {
	logos: [
		{ name: 'Everest Advisory' },
		{ name: 'Waypoint Logistics' },
		{ name: 'Meridian Legal' },
	],
	metrics: [
		{ label: 'Business sites launched in 24 months', value: '48' },
		{ label: 'Average organic lift', value: '+32%', helperText: 'Three months after launch' },
		{ label: 'Median form completion rate', value: '4.6%', helperText: 'Across lead generation forms' },
		{ label: 'Industries covered', value: 'B2B + Regulated' },
	],
};

const PROCESS_STEPS = [
	{
		title: 'Audience & Message Alignment',
		description: 'Work with stakeholders to clarify offers, proof points, and calls-to-action per audience.',
	},
	{
		title: 'Architecture & Content Planning',
		description: 'Define page types, modular sections, and metadata so content teams can scale confidently.',
	},
	{
		title: 'Design & Build',
		description: 'Produce accessible layouts, then ship them as reusable components managed via CMS.',
	},
	{
		title: 'Launch & Iterate',
		description: 'Deploy via ISR, validate analytics, and plan optimization sprints based on live data.',
	},
];

const CASE_STUDIES = [
	{
		client: 'Meridian Legal',
		industry: 'Legal',
		problem: 'Practice areas were buried and not mapped to regional search intent.',
		solution: 'Re-architected site navigation, added localized schema, and introduced evidence-driven testimonials.',
		outcome: 'Qualified consultation requests increased 52% with consistent first-response SLAs.',
		icon: <Briefcase className='size-5' />,
		metrics: [
			{ label: 'Consultations', value: '+52%' },
			{ label: 'First response', value: '<2 hrs' },
		],
	},
	{
		client: 'Waypoint Logistics',
		industry: 'Supply Chain',
		problem: 'Site failed to articulate service tiers and lacked conversion tracking.',
		solution: 'Built a modular services catalog, ROI snapshots, and integrated HubSpot workflows.',
		outcome: 'Sales accepted opportunities rose 34%, and marketing gained full-funnel attribution.',
		icon: <Building className='size-5' />,
		metrics: [
			{ label: 'SAOs', value: '+34%' },
			{ label: 'Attribution', value: 'Full-funnel' },
		],
	},
	{
		client: 'Everest Advisory',
		industry: 'Finance',
		problem: 'Needed a modern site that satisfied compliance reviews without sacrificing messaging.',
		solution: 'Established a compliant component library, audit-ready change logs, and encrypted form routing.',
		outcome: 'Passed regulatory review on the first attempt and doubled inbound RFP volume.',
		icon: <Target className='size-5' />,
		metrics: [
			{ label: 'RFP volume', value: '2x' },
			{ label: 'Audit issues', value: '0' },
		],
	},
];

const PRICING_PLANS = [
	{
		name: 'Essential Corporate Site',
		description: 'For focused positioning sites or rebrands with lean content.',
		priceLabel: 'From $22k',
		features: ['Up to 6 core templates', 'CMS + publishing workflow', 'On-page SEO + schema', 'Analytics + lead routing'],
	},
	{
		name: 'Growth Website',
		description: 'Best for multi-offer businesses that need robust proof and resources.',
		priceLabel: 'From $38k',
		features: [
			'10+ templates including resources',
			'Case study + testimonial system',
			'CRM + marketing automation integration',
			'Performance budget + monitoring',
		],
		isRecommended: true,
		badge: 'Recommended',
	},
	{
		name: 'Enterprise Communications Hub',
		description: 'Global or regulated organizations with complex governance.',
		priceLabel: 'Custom',
		features: [
			'Multi-region or multilingual support',
			'Granular permissions + approval chains',
			'Advanced security reviews',
			'Quarterly optimization retainers',
		],
	},
];

const FAQ_ITEMS = [
	{
		question: 'Do you provide copywriting?',
		answer:
			'We collaborate with your subject matter experts and can supply B2B copy partners upon request. Every layout includes content guidance to keep messaging consistent.',
	},
	{
		question: 'Can you integrate our preferred CMS?',
		answer:
			'Yes. We work with headless CMS platforms and can provide guidance on governance, workflows, and author experience.',
	},
	{
		question: 'How do you measure success for business sites?',
		answer:
			'We track Core Web Vitals, conversion rates, SQLs, and engagement metrics defined during discovery so you can see improvement clearly.',
	},
	{
		question: 'Is the website review complimentary?',
		answer: 'Yes. The review and follow-up brief are free—we only start billing if you approve a scoped build.',
	},
];

export default function BusinessWebsitesPage() {
	return (
		<main className='space-y-12'>
			<ServiceHero {...HERO_CONTENT} />
			<TrustStrip {...TRUST_CONTENT} />
			<ProcessSteps steps={PROCESS_STEPS} title='Structured delivery for corporate sites' />
			<CaseStudyStrip items={CASE_STUDIES} title='Case studies focused on outcomes executives value' />
			<PricingTable
				title='Business website packages'
				description='Choose the tier that fits your content footprint. Every engagement still begins with a free website review.'
				plans={PRICING_PLANS}
				billingNote='Pricing assumes approved brand guidelines and access to stakeholders for timely reviews.'
				className='scroll-mt-24'
			/>
			<FAQSection items={FAQ_ITEMS} />
			<FreeConsultationSection
				title='Request an evidence-based website review'
				bullets={[
					'Get a quick audit across UX, SEO, and trust signals.',
					'See the top fixes to schedule next release.',
					'Walk away with timeline and budget ranges.',
				]}
				formVariant='detailed'
			/>
		</main>
	);
}

