import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	PricingTable,
	ServiceHero,
	ClientSuccessBreakdown,
	TimelineSteps,
	IntegrationLogos,
	ResultsGallery,
	TrendingUp,
} from '@/components/services';
import type { Metadata } from 'next';
import type { FaqItem, CaseStudyItem, PricingPlan } from '@/types/services';
import type { SuccessOutcome } from '@/components/services/client-success-breakdown';
import heroImage1 from '@/public/images/slider/slider-1.jpg';
import { Cloud, Zap, Globe2 } from 'lucide-react';
import TechMarquee from '@/components/services/Tech-Marquee';

export const metadata: Metadata = {
	title: 'Headless CMS Development | Contentful, Sanity, Strapi | PayPerCall',
	description:
		'API-first headless CMS architecture with Contentful, Sanity, or Strapi for omnichannel content delivery. GraphQL and REST APIs for modern stacks.',
	alternates: { canonical: '/services/cms/content-hub' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Headless CMS Development | Contentful, Sanity, Strapi',
		description:
			'API-first headless CMS for omnichannel content delivery with GraphQL and REST APIs.',
		url: '/services/cms/content-hub',
		images: [
			{
				url: '/images/slider/slider-1.jpg',
				width: 1200,
				height: 630,
				alt: 'Headless CMS development',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Headless CMS Development',
		description: 'API-first content hubs for omnichannel experiences.',
		images: ['/images/slider/slider-1.jpg'],
	},
	keywords: [
		'headless cms',
		'contentful development',
		'sanity cms',
		'strapi development',
		'api-first cms',
		'omnichannel content',
		'graphql cms',
	],
};

export const revalidate = 3600;

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	serviceType: 'Headless CMS Development',
	provider: {
		'@type': 'Organization',
		name: 'PayPerCall',
		url: 'https://paypercall.com',
	},
	description:
		'API-first headless CMS architecture with Contentful, Sanity, or Strapi for omnichannel content delivery across web, mobile, and IoT.',
	areaServed: { '@type': 'Country', name: 'United States' },
	offers: {
		'@type': 'Offer',
		availability: 'https://schema.org/InStock',
		priceSpecification: {
			'@type': 'PriceSpecification',
			priceCurrency: 'USD',
			price: '45000',
			description: 'Starting from $45k',
		},
	},
};

const HERO_CONTENT = {
	pill: 'Headless CMS',
	eyebrow: 'CMS Services',
	title: 'API-first content hubs for omnichannel delivery',
	subtitle:
		'We architect headless CMS solutions with Contentful, Sanity, or Strapi that power web, mobile, and IoT experiences from a single content source. Built for developer teams and modern stacks.',
	features: ['API-first', 'GraphQL + REST', 'Framework agnostic'],
	stat: { value: '3+ channels', label: 'Average content delivery endpoints' },
	primaryCta: { label: 'Discuss Headless Project', href: '/contact' },
	secondaryCta: { label: 'Compare Platforms', href: '#comparison' },
	footnote: 'Free platform comparison guide for qualified headless CMS projects.',
	media: {
		src: heroImage1,
		alt: 'Headless CMS architecture diagram',
		caption: 'Every headless build includes API documentation and developer onboarding.',
	},
};

const SUCCESS_OUTCOMES: SuccessOutcome[] = [
	{
		icon: 'clock' as const,
		metric: '200ms',
		label: 'Average API response time',
		description: 'Median content API latency across headless deployments',
		context: 'Through edge caching and optimized queries.',
	},
	{
		icon: 'gitBranch' as const,
		metric: '5+',
		label: 'Channels per content source',
		description: 'Web, mobile app, kiosks, email, and voice from single CMS',
		context: 'Real-time content sync across all touchpoints.',
	},
	{
		icon: 'database' as const,
		metric: '-70%',
		label: 'Content publishing overhead reduction',
		description: 'Less time spent on multi-channel content updates',
		context: 'Measured against previous multi-CMS architecture.',
	},
];

const TIMELINE_STEPS = [
	{
		number: '01',
		title: 'Platform Selection & Architecture',
		description: 'Evaluate headless CMS platforms and design API architecture.',
		details: [
			'Contentful vs Sanity vs Strapi comparison',
			'Content model design',
			'API endpoint planning',
			'Caching strategy',
		],
	},
	{
		number: '02',
		title: 'CMS Setup & Content Modeling',
		description: 'Configure headless CMS and build content schemas.',
		details: [
			'Content type definitions',
			'Field validation rules',
			'Media asset configuration',
			'Preview environment setup',
		],
	},
	{
		number: '03',
		title: 'API Development & Integration',
		description: 'Build GraphQL/REST APIs and integrate with frontends.',
		details: [
			'GraphQL schema design',
			'REST endpoint development',
			'Frontend integration (Next.js, React Native)',
			'Real-time webhook configuration',
		],
	},
	{
		number: '04',
		title: 'Launch & Documentation',
		description: 'Deploy to production with comprehensive developer docs.',
		details: [
			'Production deployment',
			'API documentation (Postman, GraphQL Playground)',
			'Editor training',
			'Developer onboarding guide',
		],
	},
];

const TRENDING_METRICS = [
	{
		label: 'Headless CMS adoption growth',
		value: '+156%',
		change: '+156%',
		context: 'Year-over-year increase in enterprise headless CMS adoption',
	},
	{
		label: 'Prefer API-first approach',
		value: '68%',
		change: '+68%',
		context: 'Developer teams choosing headless over traditional CMS',
	},
	{
		label: 'Faster content updates',
		value: '3.2x',
		change: '+220%',
		context: 'Speed improvement for multi-channel content publishing',
	},
	{
		label: 'Infrastructure costs',
		value: '-45%',
		change: '-45%',
		context: 'Savings through serverless architecture and edge caching',
	},
];

const INTEGRATIONS = [
	{ name: 'Contentful', category: 'Headless CMS' },
	{ name: 'Sanity', category: 'Headless CMS' },
	{ name: 'Strapi', category: 'Headless CMS' },
	{ name: 'Hygraph', category: 'Headless CMS' },
	{ name: 'Next.js', category: 'Frontend Framework' },
	{ name: 'React', category: 'Frontend Framework' },
	{ name: 'Vue.js', category: 'Frontend Framework' },
	{ name: 'GraphQL', category: 'API Layer' },
	{ name: 'REST', category: 'API Layer' },
	{ name: 'Vercel', category: 'Hosting' },
	{ name: 'Netlify', category: 'Hosting' },
	{ name: 'AWS', category: 'Cloud Infrastructure' },
];

const RESULTS = [
	{
		label: 'Page Load Time',
		before: '3.8s',
		after: '1.2s',
		improvement: '-68%',
		context: 'Faster page loads through edge caching and optimized API queries.',
	},
	{
		label: 'API Response',
		before: 'N/A',
		after: '200ms',
		improvement: 'New capability',
		context: 'API-first architecture enables real-time content delivery across channels.',
	},
	{
		label: 'Channels Supported',
		before: '1-2',
		after: '5+',
		improvement: '+150%',
		context: 'Single content source powers web, mobile, kiosks, email, and voice.',
	},
];

const CASE_STUDIES: CaseStudyItem[] = [
	{
		client: 'Omni Retail Corp',
		industry: 'Retail',
		problem: 'Managing separate content for web, mobile app, and in-store kiosks was inefficient.',
		solution:
			'Implemented Contentful headless CMS with GraphQL API feeding Next.js web, React Native app, and kiosk displays.',
		outcome: 'Unified content across 3 channels with real-time updates and 70% reduction in publishing time.',
		icon: <Cloud className='h-5 w-5' />,
		metrics: [
			{ label: 'Channels unified', value: '3' },
			{ label: 'Publishing time', value: '-70%' },
		],
	},
	{
		client: 'Modern Media Group',
		industry: 'Media & Publishing',
		problem: 'Needed to deliver content to web, mobile apps, email newsletters, and smart speakers.',
		solution:
			'Built Sanity headless CMS with custom webhooks, GraphQL APIs, and multi-channel delivery pipeline.',
		outcome: 'Content now reaches 5 channels simultaneously with zero duplication and 200ms API response time.',
		icon: <Zap className='h-5 w-5' />,
		metrics: [
			{ label: 'Channels', value: '5' },
			{ label: 'API latency', value: '200ms' },
		],
	},
	{
		client: 'TechFlow SaaS',
		industry: 'SaaS',
		problem: 'Product documentation needed to power web docs, in-app help, and API reference from one source.',
		solution:
			'Deployed self-hosted Strapi with custom GraphQL schema, versioning, and Next.js documentation site.',
		outcome: 'Developer-friendly CMS with API-first architecture and 90% faster doc updates.',
		icon: <Globe2 className='h-5 w-5' />,
		metrics: [
			{ label: 'Doc update time', value: '-90%' },
			{ label: 'API response', value: '150ms' },
		],
	},
];

const PRICING_PLANS: PricingPlan[] = [
	{
		name: 'Headless Starter',
		description: 'Single-channel headless CMS (web or mobile).',
		priceLabel: 'From $45k',
		features: [
			'Headless CMS setup (Contentful or Sanity)',
			'GraphQL or REST API architecture',
			'Next.js frontend (web)',
			'Editor training',
		],
	},
	{
		name: 'Omnichannel Hub',
		description: 'Multi-channel content delivery platform.',
		priceLabel: 'From $75k',
		features: [
			'Advanced headless architecture',
			'Multi-channel delivery (web + mobile)',
			'Content preview & workflows',
			'API documentation',
			'Performance SLAs',
		],
		isRecommended: true,
		badge: 'Most flexible',
	},
	{
		name: 'Enterprise Content Platform',
		description: 'Custom content infrastructure for complex needs.',
		priceLabel: 'From $125k',
		features: [
			'Self-hosted Strapi or custom CMS',
			'Multi-tenant architecture',
			'Advanced permissions & workflows',
			'Integration middleware',
			'DevOps & monitoring',
		],
	},
];

const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'What is the difference between headless CMS and traditional WordPress/Drupal?',
		answer:
			'Headless CMS separates content management from presentation. Content is accessed via APIs (GraphQL or REST) and can power any frontend: web, mobile apps, kiosks, IoT devices. Traditional CMS couples content and presentation in one system.',
	},
	{
		question: 'Should we choose Contentful, Sanity, or Strapi?',
		answer:
			'Contentful is enterprise SaaS with great UI and scalability. Sanity offers more flexibility and real-time collaboration. Strapi is open-source and self-hosted for maximum control. We help you choose based on budget, team skills, and control requirements.',
	},
	{
		question: 'Can headless CMS content be previewed before publishing?',
		answer:
			'Yes. We set up preview environments where editors can see how content will appear across all channels (web, mobile, etc.) before publishing. Most headless CMS platforms support draft/preview modes.',
	},
	{
		question: 'How do you handle SEO with a headless CMS?',
		answer:
			'We use Next.js with SSG/ISR to pre-render pages, ensuring search engines can crawl your content. All metadata, schema markup, and sitemaps are generated automatically from your headless CMS content.',
	},
	{
		question: 'What about costs for headless CMS platforms?',
		answer:
			'Contentful and Sanity have monthly subscription costs based on users and API calls (typically $500-2000/month). Strapi is free and self-hosted (you pay for hosting infrastructure). We include platform cost estimates in every proposal.',
	},
	{
		question: 'Can we migrate from WordPress/Drupal to headless CMS?',
		answer:
			'Yes. We export your existing content, map it to the new headless CMS content model, and migrate with all metadata and media assets. SEO rankings are preserved through proper redirects and metadata migration.',
	},
	{
		question: 'Do you provide developer documentation for the headless CMS APIs?',
		answer:
			'Every headless engagement includes comprehensive API documentation: GraphQL playground, Postman collections, code examples, and onboarding guides for your development team.',
	},
];

export default function ContentHubPage() {
	return (
		<main className='space-y-0'>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<section className='py-6 md:py-8'>
				<TechMarquee />
			</section>
			<ClientSuccessBreakdown
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Headless CMS outcomes backed by data'
				subtitle='Metrics that matter for API-first content platforms.'
				outcomes={SUCCESS_OUTCOMES}
			/>
			<TimelineSteps
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Headless CMS implementation timeline'
				subtitle='From platform selection to production APIs.'
				steps={TIMELINE_STEPS}
				orientation='horizontal'
			/>
			<TrendingUp
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Headless CMS adoption trends'
				description='The shift to API-first content infrastructure is accelerating across enterprises.'
				metrics={TRENDING_METRICS}
			/>
			<IntegrationLogos
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Headless CMS platforms and tech stack'
				description='From Contentful to Next.js, we build with modern APIs and frameworks.'
				integrations={INTEGRATIONS}
				variant='grid'
				ctaLabel='Discuss platform selection'
				ctaHref='/contact'
			/>
			<ResultsGallery
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Headless CMS vs Traditional CMS performance'
				subtitle='Measurable improvements in speed, flexibility, and channel support.'
				results={RESULTS}
			/>
			<CaseStudyStrip
				className='max-w-7xl mx-auto py-12 md:py-16'
				items={CASE_STUDIES}
				title='Headless CMS transformations'
				description='Every headless build delivers omnichannel content delivery with API-first architecture.'
			/>
			<div id='pricing' className='scroll-mt-24'>
				<PricingTable
					className='max-w-7xl mx-auto py-12 md:py-16'
					title='Headless CMS engagement models'
					description='Choose the tier that matches your channel requirements. Every project starts with a free platform comparison.'
					plans={PRICING_PLANS}
					billingNote='Budgets include CMS setup, API development, frontend integration, and documentation. Platform subscription costs (Contentful/Sanity) billed separately.'
				/>
			</div>
			<FAQSection className='max-w-7xl mx-auto py-12 md:py-16' items={FAQ_ITEMS} />
			<div id='consultation' className='section-container py-12 md:py-16'>
				<ConsultationCTA
					category='cms'
					className='w-full'
					title='Start your headless CMS project with a free platform comparison'
					bullets={[
						'Compare Contentful, Sanity, and Strapi for your use case.',
						'Review content model and channel requirements.',
						'Budget estimate with platform subscription costs included.',
					]}
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
