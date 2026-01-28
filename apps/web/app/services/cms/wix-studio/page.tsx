import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	PricingTable,
	ProcessSteps,
	ServiceHero,
	ClientSuccessBreakdown,
	IntegrationLogos,
} from '@/components/services';
import type { Metadata } from 'next';
import type { FaqItem, ProcessStep, CaseStudyItem, PricingPlan } from '@/types/services';
import type { SuccessOutcome } from '@/components/services/client-success-breakdown';
import heroImage2 from '@/public/images/slider/slider-2.jpg';
import { Zap, DollarSign, Clock } from 'lucide-react';

export const metadata: Metadata = {
	title: 'Wix Studio Development | Fast Business Website Launches | PayPerCall',
	description:
		'Professional Wix Studio websites for small businesses. Managed hosting, visual builder, and SEO tools. Launch in 2 weeks from $3k.',
	alternates: { canonical: '/services/cms/wix-studio' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Wix Studio Development | Fast Business Website Launches',
		description: 'Professional Wix sites with managed hosting and SEO tools. Launch in 2 weeks.',
		url: '/services/cms/wix-studio',
		images: [
			{
				url: '/images/slider/slider-2.jpg',
				width: 1200,
				height: 630,
				alt: 'Wix Studio development',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Wix Studio Development',
		description: 'Fast website launches for small businesses with Wix Studio.',
		images: ['/images/slider/slider-2.jpg'],
	},
	keywords: [
		'wix studio',
		'wix development',
		'wix website',
		'small business website',
		'wix ecommerce',
		'wix velo',
		'fast website launch',
	],
};

export const revalidate = 3600;

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	serviceType: 'Wix Studio Development',
	provider: {
		'@type': 'Organization',
		name: 'PayPerCall',
		url: 'https://paypercall.com',
	},
	description:
		'Professional Wix Studio website development for small businesses with managed hosting, visual builder, and SEO tools.',
	areaServed: { '@type': 'Country', name: 'United States' },
	offers: {
		'@type': 'Offer',
		availability: 'https://schema.org/InStock',
		priceSpecification: {
			'@type': 'PriceSpecification',
			priceCurrency: 'USD',
			price: '3000',
			description: 'Starting from $3k',
		},
	},
};

const HERO_CONTENT = {
	pill: 'Wix Studio',
	eyebrow: 'CMS Services',
	title: 'Fast website launches with Wix Studio',
	subtitle:
		'We build professional Wix sites for small businesses and rapid launches. Managed hosting, visual builder, and SEO tools included. Launch in weeks, not months.',
	features: ['Visual builder', 'Managed hosting', 'SEO included'],
	stat: { value: '2 weeks', label: 'Average time to launch' },
	primaryCta: { label: 'Start Wix Project', href: '/contact' },
	secondaryCta: { label: 'View Wix Examples', href: '/portfolio' },
	footnote: 'Perfect for small businesses needing professional sites fast.',
	media: {
		src: heroImage2,
		alt: 'Wix Studio website builder',
		caption: 'Every Wix build includes mobile optimization and SEO setup.',
	},
};

const SUCCESS_OUTCOMES: SuccessOutcome[] = [
	{
		icon: 'clock' as const,
		metric: '2 weeks',
		label: 'Average launch timeline',
		description: 'From kickoff to live site with content',
		context: 'Includes design, content migration, and training.',
	},
	{
		icon: 'database' as const,
		metric: '$3k-8k',
		label: 'Typical project budget',
		description: 'Affordable professional sites for small businesses',
		context: 'Lower upfront cost than custom development.',
	},
	{
		icon: 'default' as const,
		metric: '0',
		label: 'Server management required',
		description: 'Fully managed hosting and security included',
		context: 'Wix handles all infrastructure and updates.',
	},
];

const PROCESS_STEPS: ProcessStep[] = [
	{
		title: 'Design & Setup',
		description:
			'Choose design direction, set up Wix Studio account, and configure initial site structure with your branding.',
	},
	{
		title: 'Build & Customize',
		description:
			'Build pages with Wix visual builder, add custom functionality with Wix Velo (if needed), and integrate apps from marketplace.',
	},
	{
		title: 'Launch & Train',
		description:
			'Connect custom domain, optimize SEO settings, launch site live, and provide training for your team to manage content.',
	},
	{
		title: 'SEO Optimization',
		description:
			'Optimize site for search engines with proper meta tags, schema markup, and mobile optimization.',
	},
];

const INTEGRATIONS = [
	{ name: 'Wix Payments', category: 'Payments' },
	{ name: 'Stripe', category: 'Payments' },
	{ name: 'PayPal', category: 'Payments' },
	{ name: 'Wix Forms', category: 'Forms' },
	{ name: 'Wix Bookings', category: 'Scheduling' },
	{ name: 'Wix Stores', category: 'Ecommerce' },
	{ name: 'Wix Blog', category: 'Content' },
	{ name: 'Mailchimp', category: 'Email Marketing' },
	{ name: 'Google Analytics', category: 'Analytics' },
	{ name: 'Facebook Pixel', category: 'Analytics' },
	{ name: 'Wix SEO', category: 'SEO' },
	{ name: 'Wix Chat', category: 'Support' },
];

const CASE_STUDIES: CaseStudyItem[] = [
	{
		client: 'Riverside Plumbing',
		industry: 'Home Services',
		problem: 'Needed fast website with online booking for plumbing appointments.',
		solution:
			'Built Wix Studio site with Wix Bookings integration, mobile-optimized design, and local SEO setup.',
		outcome: 'Site launched in 10 days and generated 42 appointment bookings in first month.',
		icon: <Zap className='h-5 w-5' />,
		metrics: [
			{ label: 'Launch time', value: '10 days' },
			{ label: 'Month 1 bookings', value: '42' },
		],
	},
	{
		client: 'Bloom Boutique',
		industry: 'Retail',
		problem: 'Wanted affordable ecommerce store to sell handmade jewelry online.',
		solution:
			'Deployed Wix Stores with Stripe payments, product catalog, and Instagram integration for social selling.',
		outcome: 'Store launched with 85 products and processed $12k in first 60 days.',
		icon: <DollarSign className='h-5 w-5' />,
		metrics: [
			{ label: '60-day revenue', value: '$12k' },
			{ label: 'Products', value: '85' },
		],
	},
	{
		client: 'Peak Consulting Group',
		industry: 'Professional Services',
		problem: 'Consultancy needed professional website fast for upcoming client presentations.',
		solution:
			'Built Wix Studio site with custom Velo forms, case study portfolio, and team member profiles.',
		outcome: 'Launched in 12 days, impressed clients, and led to 3 new consulting contracts.',
		icon: <Clock className='h-5 w-5' />,
		metrics: [
			{ label: 'Launch time', value: '12 days' },
			{ label: 'New contracts', value: '3' },
		],
	},
];

const PRICING_PLANS: PricingPlan[] = [
	{
		name: 'Business Site',
		description: 'Professional Wix site for small businesses.',
		priceLabel: 'From $3k',
		features: [
			'Custom Wix Studio design (up to 7 pages)',
			'Mobile responsive',
			'SEO setup',
			'Contact forms',
			'Training session',
		],
		isRecommended: true,
		badge: 'Best value',
	},
	{
		name: 'Ecommerce Site',
		description: 'Online store with Wix ecommerce.',
		priceLabel: 'From $5k',
		features: [
			'Wix ecommerce setup (up to 50 products)',
			'Payment integration',
			'Shipping configuration',
			'Product management training',
		],
	},
	{
		name: 'Advanced Site',
		description: 'Custom functionality with Wix Velo.',
		priceLabel: 'From $8k',
		features: [
			'Custom code (Wix Velo)',
			'Database integrations',
			'Advanced forms & workflows',
			'Third-party API connections',
		],
	},
];

const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'Is Wix Studio suitable for professional businesses?',
		answer:
			'Yes. Wix Studio is the professional version of Wix, designed for agencies and businesses. It offers advanced design flexibility, custom code (Velo), and client management tools. Many professional businesses use Wix successfully.',
	},
	{
		question: 'What are the limitations of Wix compared to WordPress or custom development?',
		answer:
			'Wix is hosted-only (you cannot self-host), has less flexibility for complex custom functionality, and you are locked into the Wix ecosystem. However, it is faster to build, fully managed, and more affordable for most small businesses.',
	},
	{
		question: 'Can I manage the Wix site myself after you build it?',
		answer:
			'Absolutely. Wix is designed for non-technical users. We provide comprehensive training so you can update content, add pages, change images, and manage products (if ecommerce) without needing a developer.',
	},
	{
		question: 'Does Wix work for SEO and Google rankings?',
		answer:
			'Yes. Modern Wix sites are SEO-friendly with proper setup. We configure meta tags, schema markup, sitemaps, mobile optimization, and Core Web Vitals. Many Wix sites rank well on Google with proper SEO practices.',
	},
	{
		question: 'What are the ongoing costs for a Wix website?',
		answer:
			'Wix charges monthly subscription fees ranging from $27-$159/month depending on features needed (business, ecommerce, storage). This includes hosting, security, SSL certificate, and platform updates. No separate hosting bills.',
	},
	{
		question: 'Can you add custom functionality to Wix sites?',
		answer:
			'Yes, using Wix Velo (JavaScript-based development environment). We can build custom forms, database integrations, API connections, and advanced workflows. For complex requirements, we may recommend a custom-built solution instead.',
	},
];

export default function WixStudioPage() {
	return (
		<main className='space-y-0'>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<ClientSuccessBreakdown
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Wix Studio outcomes backed by data'
				subtitle='Metrics that matter for small business websites.'
				outcomes={SUCCESS_OUTCOMES}
			/>
			<ProcessSteps
				className='max-w-7xl mx-auto py-12 md:py-16'
				steps={PROCESS_STEPS}
				title='Fast Wix Studio workflow'
				description='Streamlined process from design to launch in just weeks.'
				variant='cards'
			/>
			<IntegrationLogos
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Wix apps and integrations'
				description='Extend your Wix site with apps from the Wix marketplace and third-party integrations.'
				integrations={INTEGRATIONS}
				variant='grid'
				ctaLabel='Discuss Wix requirements'
				ctaHref='/contact'
			/>
			<CaseStudyStrip
				className='max-w-7xl mx-auto py-12 md:py-16'
				items={CASE_STUDIES}
				title='Wix Studio success stories'
				description='Small businesses launching fast with professional Wix sites.'
			/>
			<div id='pricing' className='scroll-mt-24'>
				<PricingTable
					className='max-w-7xl mx-auto py-12 md:py-16'
					title='Wix Studio engagement models'
					description='Affordable professional websites for small businesses. Fast turnaround and managed hosting included.'
					plans={PRICING_PLANS}
					billingNote='Development fee is one-time. Wix subscription ($27-159/month) billed separately by Wix and includes hosting, SSL, and security.'
				/>
			</div>
			<FAQSection className='max-w-7xl mx-auto py-12 md:py-16' items={FAQ_ITEMS} />
			<div id='consultation' className='section-container py-12 md:py-16'>
				<ConsultationCTA
					className='w-full'
					title='Start your Wix Studio project with a free consultation'
					bullets={[
						'Discuss your small business website needs.',
						'Review Wix capabilities and limitations.',
						'Budget estimate and timeline (typically 2 weeks).',
					]}
					formVariant='short'
				/>
			</div>
		</main>
	);
}
