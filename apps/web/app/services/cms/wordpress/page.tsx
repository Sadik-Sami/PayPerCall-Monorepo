import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	PricingTable,
	ProcessSteps,
	ServiceHero,
	ClientSuccessBreakdown,
	DeliverablesSection,
	IntegrationLogos,
} from '@/components/services';
import type { Metadata } from 'next';
import type { FaqItem, ProcessStep, CaseStudyItem, PricingPlan } from '@/types/services';
import type { SuccessOutcome } from '@/components/services/client-success-breakdown';
import heroImage2 from '@/public/images/slider/slider-2.jpg';
import { Briefcase, ShoppingCart, Shield } from 'lucide-react';
import TechMarquee from '@/components/services/Tech-Marquee';

export const metadata: Metadata = {
	title: 'WordPress Development Services | Custom Themes, Plugins & Security | PayPerCall',
	description:
		'Expert WordPress development: custom themes, plugin development, WooCommerce integration, and security hardening for scalable, SEO-ready sites.',
	alternates: { canonical: '/services/cms/wordpress' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'WordPress Development Services | Custom Themes, Plugins & Security',
		description:
			'Custom WordPress development with security hardening, WooCommerce integration, and plugin development.',
		url: '/services/cms/wordpress',
		images: [
			{
				url: '/images/slider/slider-2.jpg',
				width: 1200,
				height: 630,
				alt: 'WordPress development services',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'WordPress Development Services',
		description: 'Custom WordPress themes, plugins, WooCommerce, and security hardening.',
		images: ['/images/slider/slider-2.jpg'],
	},
	keywords: [
		'wordpress development',
		'custom wordpress themes',
		'wordpress plugin development',
		'woocommerce development',
		'wordpress security',
		'wordpress multisite',
	],
};

export const revalidate = 3600;

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	serviceType: 'WordPress Development',
	provider: {
		'@type': 'Organization',
		name: 'PayPerCall',
		url: 'https://paypercall.com',
	},
	description:
		'Professional WordPress development services including custom themes, plugin development, WooCommerce integration, and security hardening.',
	areaServed: { '@type': 'Country', name: 'United States' },
	offers: {
		'@type': 'Offer',
		availability: 'https://schema.org/InStock',
		priceSpecification: {
			'@type': 'PriceSpecification',
			priceCurrency: 'USD',
			price: '8000',
			description: 'Starting from $8k',
		},
	},
};

const HERO_CONTENT = {
	pill: 'WordPress Development',
	eyebrow: 'CMS Services',
	title: 'Custom WordPress sites built for growth and security',
	subtitle:
		'We deliver WordPress solutions that stay fast, SEO-ready, and secure. From custom themes to WooCommerce stores, every build includes security hardening and editor training.',
	features: ['Custom themes', 'Plugin development', 'WooCommerce ready'],
	stat: { value: '2,800+', label: 'WordPress sites delivered since 2015' },
	primaryCta: { label: 'Start WordPress Project', href: '/contact' },
	secondaryCta: { label: 'Request Site Audit', href: '#consultation' },
	footnote: 'Free security audit included with every project assessment.',
	media: {
		src: heroImage2,
		alt: 'WordPress development dashboard',
		caption: 'Every WordPress build includes performance optimization and security hardening.',
	},
};

const SUCCESS_OUTCOMES: SuccessOutcome[] = [
	{
		icon: 'clock' as const,
		metric: '4 weeks',
		label: 'Average time to WordPress launch',
		description: 'From kickoff to production-ready site with content migration',
		context: 'Includes custom theme, plugin setup, and editor training.',
	},
	{
		icon: 'database' as const,
		metric: '0',
		label: 'Security breaches across client sites',
		description: 'Zero successful attacks in 18 months with our security hardening',
		context: 'Includes firewall, malware scanning, and automatic updates.',
	},
	{
		icon: 'default' as const,
		metric: '1.8s',
		label: 'Average page load time',
		description: 'Median LCP across WordPress sites we build',
		context: 'Through caching, CDN, and image optimization.',
	},
];

const PROCESS_STEPS: ProcessStep[] = [
	{
		title: 'Discovery & Planning',
		description:
			'Understand your content needs, design preferences, and functional requirements. Define custom post types and page templates.',
	},
	{
		title: 'Theme & Plugin Development',
		description:
			'Build custom WordPress theme or child theme. Develop or configure plugins for features like forms, SEO, and security.',
	},
	{
		title: 'Content Migration & Testing',
		description:
			'Migrate existing content with SEO metadata preserved. Test across devices, browsers, and conduct security audits.',
	},
	{
		title: 'Training & Launch',
		description:
			'Provide comprehensive editor training, documentation, and go-live support with post-launch monitoring.',
	},
];

const DELIVERABLE_STANDARDS = [
	'WordPress core and all plugins kept up to date with automatic patching.',
	'Security hardening checklist: Wordfence firewall, SSL certificates, two-factor authentication.',
	'Performance optimization: Object caching, CDN configuration, image compression.',
	'SEO foundation: Yoast configuration, schema markup, XML sitemaps, 301 redirects.',
];

const DELIVERABLES = [
	{
		title: 'Custom Theme',
		description: 'Responsive WordPress theme built to your brand guidelines and design system.',
		bulletPoints: ['Page builder compatibility', 'Custom post types', 'Widget-ready sidebars'],
	},
	{
		title: 'Security Package',
		description: 'Comprehensive security hardening and ongoing monitoring.',
		bulletPoints: ['Wordfence firewall', 'Malware scanning', '2FA for admins', 'SSL setup'],
	},
	{
		title: 'SEO Foundation',
		description: 'Technical SEO setup for maximum search visibility.',
		bulletPoints: ['Yoast SEO Pro', 'Schema markup', 'XML sitemaps', 'Redirect management'],
	},
	{
		title: 'Performance Optimization',
		description: 'Speed optimizations for fast page loads and Core Web Vitals.',
		bulletPoints: ['Object caching', 'CDN setup', 'Image optimization', 'Lazy loading'],
	},
	{
		title: 'Editor Training',
		description: 'Comprehensive training for your content team.',
		bulletPoints: ['Video tutorials', 'Written documentation', 'Live training session'],
	},
	{
		title: 'Backup & Recovery',
		description: 'Automated backup system with disaster recovery plan.',
		bulletPoints: ['Daily automated backups', 'Off-site storage', 'Recovery runbook'],
	},
];

const INTEGRATIONS = [
	{ name: 'Advanced Custom Fields (ACF)', category: 'Content Management' },
	{ name: 'Yoast SEO', category: 'SEO' },
	{ name: 'WooCommerce', category: 'Ecommerce' },
	{ name: 'Elementor', category: 'Page Builders' },
	{ name: 'Gravity Forms', category: 'Forms' },
	{ name: 'WP Rocket', category: 'Performance' },
	{ name: 'Wordfence', category: 'Security' },
	{ name: 'WPML', category: 'Multi-language' },
	{ name: 'HubSpot', category: 'CRM Integration' },
	{ name: 'Mailchimp', category: 'Email Marketing' },
	{ name: 'Stripe', category: 'Payments' },
	{ name: 'Google Analytics', category: 'Analytics' },
];

const CASE_STUDIES: CaseStudyItem[] = [
	{
		client: 'Cascade Marketing Group',
		industry: 'Marketing',
		problem: 'Outdated WordPress site with slow load times and security vulnerabilities.',
		solution:
			'Rebuilt with custom Genesis child theme, WP Rocket caching, and Wordfence security hardening.',
		outcome: 'Page load time reduced from 4.2s to 1.6s and passed all security audits.',
		icon: <Briefcase className='h-5 w-5' />,
		metrics: [
			{ label: 'Page speed', value: '1.6s' },
			{ label: 'Security score', value: 'A+' },
		],
	},
	{
		client: 'Green Valley Organics',
		industry: 'Ecommerce',
		problem: 'Needed WooCommerce store with complex shipping rules and subscription products.',
		solution:
			'Built custom WooCommerce site with WooCommerce Subscriptions, advanced shipping zones, and Stripe integration.',
		outcome: 'Launched with 250+ products and processed $180k in first 90 days.',
		icon: <ShoppingCart className='h-5 w-5' />,
		metrics: [
			{ label: 'Products', value: '250+' },
			{ label: '90-day revenue', value: '$180k' },
		],
	},
	{
		client: 'Regional Healthcare Alliance',
		industry: 'Healthcare',
		problem: 'WordPress Multisite needed for 8 hospital locations with HIPAA compliance.',
		solution:
			'Deployed WordPress Multisite with centralized management, HIPAA security controls, and role-based access.',
		outcome: '8 sites launched in 6 weeks with unified branding and zero security incidents.',
		icon: <Shield className='h-5 w-5' />,
		metrics: [
			{ label: 'Sites', value: '8' },
			{ label: 'Launch time', value: '6 weeks' },
		],
	},
];

const PRICING_PLANS: PricingPlan[] = [
	{
		name: 'Starter Site',
		description: 'Essential WordPress site for small businesses.',
		priceLabel: 'From $8k',
		features: [
			'Custom theme (up to 5 page templates)',
			'Essential plugins (SEO, security, performance)',
			'Content migration (up to 50 pages)',
			'Editor training session',
		],
	},
	{
		name: 'Business Site',
		description: 'Full-featured WordPress with custom functionality.',
		priceLabel: 'From $18k',
		features: [
			'Advanced custom theme',
			'Custom plugin development',
			'WooCommerce setup (optional)',
			'Security hardening + SSL',
			'Performance optimization',
			'Ongoing support (3 months)',
		],
		isRecommended: true,
		badge: 'Most popular',
	},
	{
		name: 'Enterprise Multisite',
		description: 'WordPress Multisite for large organizations.',
		priceLabel: 'From $45k',
		features: [
			'Multisite architecture',
			'Role-based workflows',
			'Custom admin interface',
			'HIPAA/GDPR compliance support',
			'Managed hosting setup',
			'Annual support retainer',
		],
	},
];

const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'Do you build custom WordPress themes or use pre-made templates?',
		answer:
			'We build custom themes tailored to your brand and requirements. Pre-made themes often include bloat and require heavy customization anyway. Custom themes are cleaner, faster, and more maintainable.',
	},
	{
		question: 'How do you handle WordPress security?',
		answer:
			'Every site includes Wordfence firewall, malware scanning, automatic security updates, SSL certificates, two-factor authentication for admins, and security hardening based on OWASP guidelines. We monitor all sites for security threats.',
	},
	{
		question: 'Can you help with WooCommerce stores?',
		answer:
			'Yes. We build full WooCommerce stores including payment gateway integration, shipping configurations, tax setup, product imports, and inventory management. We handle both simple and complex ecommerce requirements.',
	},
	{
		question: 'Will you train our team to manage the WordPress site?',
		answer:
			'Every engagement includes comprehensive editor training: video tutorials, written documentation, and a live training session. Your team will be confident managing content, images, pages, and basic settings.',
	},
	{
		question: 'What about ongoing WordPress maintenance and updates?',
		answer:
			'We offer optional managed WordPress support that includes plugin updates, security monitoring, daily backups, uptime monitoring, and priority support. Most clients add this after launch.',
	},
	{
		question: 'How do you ensure WordPress sites are fast?',
		answer:
			'We optimize every layer: object caching, CDN configuration, image compression, lazy loading, minified CSS/JS, database optimization, and performance monitoring. Most sites achieve LCP under 2 seconds.',
	},
	{
		question: 'Can you migrate our existing WordPress site to a new host or redesign?',
		answer:
			'Yes. We handle WordPress migrations with zero downtime, preserve all SEO metadata, implement 301 redirects for changed URLs, and run parallel testing to ensure nothing breaks during the transition.',
	},
];

export default function WordPressPage() {
	return (
		<main className='space-y-0'>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<section className='py-6 md:py-8'>
				<TechMarquee />
			</section>
			<ClientSuccessBreakdown
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='WordPress outcomes backed by data'
				subtitle='Metrics that matter for content-driven sites.'
				outcomes={SUCCESS_OUTCOMES}
			/>
			<ProcessSteps
				className='max-w-7xl mx-auto py-12 md:py-16'
				steps={PROCESS_STEPS}
				title='WordPress development workflow'
				variant='cards'
			/>
			<DeliverablesSection
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Deliverables included with every WordPress build'
				subtitle='We ship production-ready WordPress sites with security, performance, and SEO built in.'
				standards={DELIVERABLE_STANDARDS}
				deliverables={DELIVERABLES}
			/>
			<IntegrationLogos
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='WordPress plugins and integrations we work with'
				description='From WooCommerce to CRM integrations, we connect WordPress to your business systems.'
				integrations={INTEGRATIONS}
				variant='grid'
				ctaLabel='Discuss integration needs'
				ctaHref='/contact'
			/>
			<CaseStudyStrip
				className='max-w-7xl mx-auto py-12 md:py-16'
				items={CASE_STUDIES}
				title='Representative WordPress engagements'
				description='Every WordPress build delivers measurable improvements in speed, security, and content efficiency.'
			/>
			<div id='pricing' className='scroll-mt-24'>
				<PricingTable
					className='max-w-7xl mx-auto py-12 md:py-16'
					title='WordPress engagement models'
					description='Choose the tier that matches your needs. Every project starts with a free consultation and security audit.'
					plans={PRICING_PLANS}
					billingNote='All plans include theme development, security hardening, editor training, and documentation. Hosting and premium plugins billed separately.'
				/>
			</div>
			<FAQSection className='max-w-7xl mx-auto py-12 md:py-16' items={FAQ_ITEMS} />
			<div id='consultation' className='section-container py-12 md:py-16'>
				<ConsultationCTA
					category='cms'
					className='w-full'
					title='Start your WordPress project with a free consultation'
					bullets={[
						'Review current site or discuss new WordPress build.',
						'Security audit and performance analysis.',
						'Budget estimate and timeline with no obligation.',
					]}
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
