import type { StatItem } from '@workspace/ui/components/sections/stats-grid';
import type { FaqItem } from '@/types/services';

export interface TestimonialRecord {
	id: string;
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar?: string;
	rating: number;
	highlight?: string;
	industry: string;
	service: string;
	detailedStory?: {
		challenge: string;
		solution: string;
		result: string;
	};
}

export const TESTIMONIAL_STATS: StatItem[] = [
	{ label: 'Client teams supported', value: 200, suffix: '+', description: 'Organizations with active programs' },
	{ label: 'Industries served', value: 10, suffix: '+', description: 'Verticals covered across sectors' },
	{ label: 'Client retention rate', value: 95, suffix: '%', description: 'Average across all programs' },
	{ label: 'Satisfaction score', value: 4.8, suffix: '/5', description: 'Based on client feedback' },
];

export const INDUSTRY_FILTERS = [
	'All',
	'Insurance',
	'Legal',
	'Healthcare',
	'Home Services',
	'Financial',
	'B2B',
] as const;

export type IndustryFilter = (typeof INDUSTRY_FILTERS)[number];

export const TESTIMONIALS: TestimonialRecord[] = [
	{
		id: 'daniel-reyes',
		quote:
			'We needed one partner that could tighten call quality, improve lead routing, and fix our landing-page conversion issues. Core Closer gave us one operating rhythm instead of three vendor threads.',
		author: 'Daniel Reyes',
		role: 'Founder',
		company: 'BlueHaven Digital Studio',
		rating: 5,
		highlight: 'One operating rhythm',
		industry: 'B2B',
		service: 'Pay Per Call',
		detailedStory: {
			challenge:
				'BlueHaven was juggling three separate vendors for call generation, lead routing, and landing page optimization. Reporting was fragmented and nobody owned the full funnel.',
			solution:
				'Core Closer consolidated all three functions under one operating model. Call quality scripts were rewritten, lead routing rules were tightened, and landing pages were rebuilt with proper conversion tracking.',
			result:
				'Within 60 days, call-to-close rates improved by 34% and the team saved 12 hours per week on vendor coordination. Reporting now lives in a single dashboard.',
		},
	},
	{
		id: 'noah-kim',
		quote:
			'The reporting is clear enough for marketing and operations to use in the same meeting. That changed how quickly we could make budget and staffing decisions.',
		author: 'Noah Kim',
		role: 'Performance Marketer',
		company: 'Evergreen Demand Lab',
		rating: 5,
		highlight: 'Shared reporting clarity',
		industry: 'B2B',
		service: 'Digital Marketing',
	},
	{
		id: 'grace-wilson',
		quote:
			'Their team connects acquisition strategy to what happens after the lead arrives. That sounds basic, but most vendors stop at delivery and leave the rest to you.',
		author: 'Grace Wilson',
		role: 'Director of Sales',
		company: 'BridgePoint Solutions',
		rating: 5,
		highlight: 'End-to-end accountability',
		industry: 'Financial',
		service: 'Pay Per Lead',
	},
	{
		id: 'ethan-brooks',
		quote:
			'Pay-per-call volume is steady and the intent is strong. Reporting is clean, and tweaks get implemented fast. We scaled from 200 to 800 calls per month without quality dropping.',
		author: 'Ethan Brooks',
		role: 'Growth Manager',
		company: 'NorthPeak Media Co.',
		rating: 5,
		highlight: '4x call volume',
		industry: 'Insurance',
		service: 'Pay Per Call',
		detailedStory: {
			challenge:
				'NorthPeak needed to scale inbound call volume for their insurance division without sacrificing lead quality. Previous providers delivered volume but conversion rates were falling.',
			solution:
				'Core Closer implemented a tiered call routing system with real-time quality scoring. Each call was scored on intent signals before being transferred, and underperforming sources were paused automatically.',
			result:
				'Call volume quadrupled from 200 to 800 monthly while the close rate held steady at 18%. The automated quality scoring eliminated 40% of wasted transfers.',
		},
	},
	{
		id: 'jasmine-patel',
		quote:
			'The pay-per-lead feed is consistent and easy to work. We saw fewer junk leads and better appointment rates after the first optimization cycle.',
		author: 'Jasmine Patel',
		role: 'Operations Director',
		company: 'Riverstone Home Solutions',
		rating: 5,
		highlight: 'Cleaner lead feed',
		industry: 'Home Services',
		service: 'Pay Per Lead',
	},
	{
		id: 'marcus-hill',
		quote:
			'Live transfers are better qualified than our previous source. We scaled gradually and quality stayed stable through the entire ramp.',
		author: 'Marcus Hill',
		role: 'VP of Sales',
		company: 'BrightLine Connect',
		rating: 5,
		highlight: 'Stable quality at scale',
		industry: 'Legal',
		service: 'Pay Per Call',
	},
	{
		id: 'olivia-chen',
		quote:
			'They rebuilt our landing pages and improved conversions. Calls and leads both got cleaner after week two. The team actually listens to feedback.',
		author: 'Olivia Chen',
		role: 'Marketing Lead',
		company: 'Cedar & Co. Roofing',
		rating: 5,
		highlight: 'Week-two improvements',
		industry: 'Home Services',
		service: 'Web Development',
	},
	{
		id: 'alyssa-morgan',
		quote:
			'Inbound calls feel customer-ready, not cold. Their QA feedback loop helped reduce wasted transfers and our agents close more consistently.',
		author: 'Alyssa Morgan',
		role: 'Client Success Manager',
		company: 'SummitCare Advisors',
		rating: 5,
		highlight: 'Higher close consistency',
		industry: 'Healthcare',
		service: 'Pay Per Call',
	},
	{
		id: 'sophia-grant',
		quote:
			'Pay-per-lead quality improved after they tightened filters. Our team spends less time chasing bad info and more time closing deals.',
		author: 'Sophia Grant',
		role: 'Business Development Director',
		company: 'Pioneer Health Partners',
		rating: 5,
		highlight: 'Less time on bad leads',
		industry: 'Healthcare',
		service: 'Pay Per Lead',
		detailedStory: {
			challenge:
				'Pioneer Health was receiving over 500 leads per month but their sales team was spending 60% of their time on unqualified or duplicate entries. Conversion was dropping.',
			solution:
				'Core Closer implemented field-level validation, duplicate detection, and intent-based scoring. Leads were filtered through a three-step qualification process before reaching the sales team.',
			result:
				'Monthly lead volume dropped to 350 but the appointment rate jumped from 12% to 31%. The sales team now closes 2.5x more deals with less effort.',
		},
	},
	{
		id: 'caleb-turner',
		quote:
			'The calls are high intent and the pipeline is more predictable. Weekly reporting is straightforward and actually useful for planning.',
		author: 'Caleb Turner',
		role: 'Managing Partner',
		company: 'Lakeside Legal Group',
		rating: 5,
		highlight: 'Predictable pipeline',
		industry: 'Legal',
		service: 'Pay Per Call',
	},
	{
		id: 'mia-alvarez',
		quote:
			'SEO started producing better inbound traffic within weeks. Combined with paid ads, we are seeing steady growth across all channels.',
		author: 'Mia Alvarez',
		role: 'Digital Strategist',
		company: 'OakBridge Commerce',
		rating: 5,
		highlight: 'Multi-channel growth',
		industry: 'Financial',
		service: 'Digital Marketing',
	},
	{
		id: 'ryan-foster',
		quote:
			'Pay-per-call volume scaled without turning into junk. They listen to feedback and adjust quickly. Our cost per acquisition dropped 28%.',
		author: 'Ryan Foster',
		role: 'Head of Growth',
		company: 'Suncrest Solar Pros',
		rating: 5,
		highlight: '-28% CPA',
		industry: 'Home Services',
		service: 'Pay Per Call',
	},
	{
		id: 'hannah-price',
		quote:
			'Lead delivery is fast and organized. Our close rate improved because follow-up is easier when the data is accurate from the start.',
		author: 'Hannah Price',
		role: 'Marketing Coordinator',
		company: 'Stonegate HVAC',
		rating: 4,
		highlight: 'Faster follow-up',
		industry: 'Home Services',
		service: 'Pay Per Lead',
	},
	{
		id: 'isaac-bennett',
		quote:
			'Web development was clean and professional. The site loads faster and converts better. Tracking is finally accurate across all campaigns.',
		author: 'Isaac Bennett',
		role: 'CTO',
		company: 'AtlasWeb Systems',
		rating: 5,
		highlight: 'Faster + better tracking',
		industry: 'B2B',
		service: 'Web Development',
	},
	{
		id: 'priya-shah',
		quote:
			'App work was delivered on schedule with clear milestones. QA was solid and the release went smoothly. Would recommend for any build project.',
		author: 'Priya Shah',
		role: 'Product Manager',
		company: 'NimbleRoute Apps',
		rating: 5,
		highlight: 'On-schedule delivery',
		industry: 'B2B',
		service: 'Web Development',
	},
	{
		id: 'logan-wright',
		quote:
			'The lead flow is consistent and quality is improving month over month. Their communication is excellent and response times are fast.',
		author: 'Logan Wright',
		role: 'Sales Manager',
		company: 'ClearPath Funding',
		rating: 5,
		highlight: 'Improving month over month',
		industry: 'Financial',
		service: 'Pay Per Lead',
	},
	{
		id: 'emily-dawson',
		quote:
			'Email and social campaigns finally feel aligned to conversions. The creative and targeting are a big step up from what we had before.',
		author: 'Emily Dawson',
		role: 'Brand Manager',
		company: 'HarborView Wellness',
		rating: 5,
		highlight: 'Aligned campaigns',
		industry: 'Healthcare',
		service: 'Digital Marketing',
	},
	{
		id: 'jordan-collins',
		quote:
			'They built a modern site and fixed our tracking. Leads are now attributed correctly and performance is clearer across every channel.',
		author: 'Jordan Collins',
		role: 'Director of Marketing',
		company: 'MetroFleet Logistics',
		rating: 5,
		highlight: 'Fixed attribution',
		industry: 'B2B',
		service: 'Web Development',
	},
];

export const FEATURED_TESTIMONIALS = TESTIMONIALS.filter((t) =>
	['daniel-reyes', 'ethan-brooks', 'sophia-grant'].includes(t.id),
);

export const DETAILED_STORIES = TESTIMONIALS.filter((t) => t.detailedStory);

export const TESTIMONIAL_FAQS: FaqItem[] = [
	{
		question: 'How do you ensure testimonial authenticity?',
		answer:
			'All testimonials come from verified clients with active or completed programs. We never fabricate reviews or use stock testimonials.',
	},
	{
		question: 'Can I speak directly with a reference client?',
		answer:
			'Yes. Once we understand your goals and fit, we can connect you with a relevant client reference in your industry or service area.',
	},
	{
		question: 'What results can I expect from working with Core Closer?',
		answer:
			'Results vary by industry, offer, and program maturity. Most clients see measurable improvements in call quality, lead conversion, or reporting clarity within the first 60 days.',
	},
	{
		question: 'Do you work with businesses in my industry?',
		answer:
			'Core Closer serves insurance, legal, healthcare, home services, financial, and B2B sectors. If your industry is not listed, reach out and we will discuss fit.',
	},
];

export const TESTIMONIALS_CROSS_LINKS = [
	{
		title: 'Our Portfolio',
		description: 'See the full scope of services and operational capabilities Core Closer delivers.',
		href: '/about/portfolio',
		label: 'View portfolio',
	},
	{
		title: 'Why Core Closer',
		description: 'Understand the platform model and what makes our approach different.',
		href: '/about/why-us',
		label: 'See why us',
	},
	{
		title: 'Meet the Team',
		description: 'Meet the specialists behind acquisition, operations, engineering, and client growth.',
		href: '/about/team',
		label: 'Meet the team',
	},
];

export const testimonialsJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	name: 'Client Testimonials | Core Closer',
	description:
		'Read real testimonials from client teams across insurance, legal, healthcare, home services, financial, and B2B sectors who trust Core Closer for performance marketing and delivery.',
	mainEntity: {
		'@type': 'Organization',
		name: 'Core Closer',
		url: 'https://paypercall.com',
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			reviewCount: TESTIMONIALS.length.toString(),
			bestRating: '5',
		},
		review: TESTIMONIALS.slice(0, 5).map((t) => ({
			'@type': 'Review',
			author: {
				'@type': 'Person',
				name: t.author,
				jobTitle: t.role,
				worksFor: { '@type': 'Organization', name: t.company },
			},
			reviewBody: t.quote,
			reviewRating: {
				'@type': 'Rating',
				ratingValue: t.rating.toString(),
				bestRating: '5',
			},
		})),
	},
};
