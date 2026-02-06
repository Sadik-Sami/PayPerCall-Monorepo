import {
	CaseStudyStrip,
	FAQSection,
	ServiceHero,
	ConsultationCTA,
	PricingTable,
	ProcessSteps,
	AnimatedServicesGrid,
	TrustBanner,
	ResultsShowcase,
	TestimonialsSection,
	IntegrationLogos,
} from '@/components/services';
import { APP_DEV_SERVICE_NAV } from '@/components/services/nav-items';
import heroImage1 from '@/public/images/slider/slider-1.jpg';
import { Smartphone, Tablet, Code2 } from 'lucide-react';
import TechMarquee from '@/components/services/Tech-Marquee';
import type { Metadata } from 'next';
import type { ProcessStep, CaseStudyItem, PricingPlan, FaqItem } from '@/types/services';

export const metadata: Metadata = {
	title: 'Mobile App Development Services | iOS, Android & Cross-Platform | PayPerCall',
	description:
		'Expert mobile app development: Native iOS, Android, and cross-platform apps built for user engagement and business growth. Free consultation.',
	alternates: { canonical: '/services/app-dev' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Mobile App Development Services | iOS, Android & Cross-Platform',
		description: 'Native and cross-platform mobile apps built for user engagement and measurable business growth.',
		url: '/services/app-dev',
		images: [
			{
				url: '/images/slider/slider-1.jpg',
				width: 1200,
				height: 630,
				alt: 'Mobile app development services',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Mobile App Development Services | iOS, Android & Cross-Platform',
		description: 'Native and cross-platform mobile apps built for user engagement and business growth.',
		images: ['/images/slider/slider-1.jpg'],
	},
	keywords: [
		'app development services',
		'mobile app development company',
		'iOS Android app development',
		'custom mobile app development',
		'react native development',
		'flutter app development',
		'native app development',
	],
};

export const revalidate = 3600;

const HERO_CONTENT = {
	pill: 'App Development',
	eyebrow: 'Services',
	title: 'Mobile apps built for user engagement and business growth',
	subtitle:
		'We deliver native iOS, Android, and cross-platform apps that stay performant, scalable, and aligned with your business goals. Start with a free strategy consultation.',
	features: ['Native & cross-platform', 'App Store optimization', 'Backend integration'],
	stat: { value: '30 minutes', label: 'Strategy session · free consultation' },
	primaryCta: { label: 'Book a Free Consultation', href: '/contact' },
	secondaryCta: { label: 'View App Portfolio', href: '/portfolio' },
	footnote: 'No commitment required—we assess fit and provide roadmap before you commit.',
	media: {
		src: heroImage1,
		alt: 'Mobile app development visualization',
		caption: 'Our strategy sessions end with a written technical roadmap and budget ranges.',
	},
	variant: 'asymmetric' as const,
};

const PROCESS_STEPS: ProcessStep[] = [
	{
		title: 'Discovery & Strategy',
		description:
			'Align on business goals, target audience, platform requirements, and technical constraints. Produce a measurable requirements brief with platform recommendations.',
	},
	{
		title: 'Design & Architecture',
		description:
			'Design user flows, create wireframes, and architect the technical stack. Map integrations, data flows, and define performance budgets.',
	},
	{
		title: 'Development & Integration',
		description:
			'Build native or cross-platform apps with type-safe code, integrate backend services, and implement automated testing. Handle App Store and Play Store requirements.',
	},
	{
		title: 'Launch & Optimization',
		description:
			'Submit to app stores, monitor analytics, and run optimization cycles based on user feedback and performance data.',
	},
];

const CASE_STUDIES: CaseStudyItem[] = [
	{
		client: 'HealthTrack Pro',
		industry: 'Healthcare',
		problem: 'Healthcare provider needed HIPAA-compliant iOS and Android apps for patient data management with real-time sync.',
		solution:
			'Built native iOS (SwiftUI) and Android (Kotlin) apps with encrypted data storage, secure API integration, and offline-first architecture.',
		outcome: 'Launched on both stores in 10 weeks with 4.8-star ratings and zero security incidents in 12 months.',
		icon: <Smartphone className='size-5' />,
		metrics: [
			{ label: 'App Store rating', value: '4.8★' },
			{ label: 'Security incidents', value: '0' },
		],
	},
	{
		client: 'RetailFlow Mobile',
		industry: 'Retail',
		problem: 'E-commerce company needed cross-platform app to reach iOS and Android users with shared codebase and faster time-to-market.',
		solution:
			'Developed React Native app with native payment modules, push notifications, and deep linking. Integrated with existing e-commerce backend.',
		outcome: 'Launched on both platforms simultaneously, reducing development time by 40% and achieving 85% code reuse.',
		icon: <Tablet className='size-5' />,
		metrics: [
			{ label: 'Code reuse', value: '85%' },
			{ label: 'Time saved', value: '40%' },
		],
	},
	{
		client: 'FinanceHub Mobile',
		industry: 'Financial Services',
		problem: 'Financial services firm required secure Android app with biometric authentication and real-time transaction processing.',
		solution:
			'Built native Android app with Jetpack Compose, biometric authentication, encrypted local storage, and real-time API integration.',
		outcome: 'Processed $2.3M in transactions in first quarter with 99.9% uptime and 4.7-star Play Store rating.',
		icon: <Code2 className='size-5' />,
		metrics: [
			{ label: 'Q1 transactions', value: '$2.3M' },
			{ label: 'Uptime', value: '99.9%' },
		],
	},
];

const PRICING_PLANS: PricingPlan[] = [
	{
		name: 'MVP App',
		description: 'Ideal for validating a product idea with core features.',
		priceLabel: 'From $45k',
		features: [
			'Core feature set (3-5 features)',
			'Single platform (iOS or Android)',
			'Basic backend integration',
			'App Store submission',
			'Launch support',
		],
	},
	{
		name: 'Growth App',
		description: 'Full-featured app with integrations and both platforms.',
		priceLabel: 'From $85k',
		features: [
			'Complete feature set',
			'iOS and Android (or cross-platform)',
			'Backend API integration',
			'Push notifications & analytics',
			'App Store optimization',
			'3 months post-launch support',
		],
		isRecommended: true,
		badge: 'Recommended',
	},
	{
		name: 'Enterprise App',
		description: 'Complex apps with advanced security, compliance, and scalability needs.',
		priceLabel: 'Custom',
		features: [
			'Advanced features & custom modules',
			'Multi-platform support',
			'Enterprise security & compliance',
			'Custom backend development',
			'Ongoing optimization retainer',
		],
	},
];

const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'Should we build native iOS/Android apps or use a cross-platform framework?',
		answer:
			'We assess your requirements during the discovery phase. Native apps offer best performance and platform-specific features. Cross-platform (React Native, Flutter) reduces development time and cost while maintaining good performance. We recommend native for apps requiring advanced platform features, and cross-platform for most business apps.',
	},
	{
		question: 'How long does it take to develop and launch a mobile app?',
		answer:
			'Timeline depends on complexity and platform choice. MVP apps typically take 8-12 weeks. Full-featured apps take 12-20 weeks. Cross-platform apps can launch on both stores simultaneously, while native apps may require separate timelines. We provide detailed timelines during the discovery phase.',
	},
	{
		question: 'Do you handle App Store and Google Play Store submissions?',
		answer:
			'Yes. We handle the complete submission process including app store optimization, metadata creation, screenshot preparation, privacy policy integration, and submission. We also manage the review process and address any rejection issues.',
	},
	{
		question: 'What about backend development and API integration?',
		answer:
			'We can build custom backends or integrate with your existing systems. We work with REST and GraphQL APIs, real-time services, authentication systems, and third-party integrations. Every app includes secure API integration and data synchronization.',
	},
	{
		question: 'How do you ensure app security and data privacy?',
		answer:
			'Security is built into every app from the start. We implement encrypted data storage, secure API communication, biometric authentication, and follow OWASP mobile security guidelines. For regulated industries, we align with HIPAA, GDPR, and SOC 2 requirements.',
	},
	{
		question: 'What happens after the app launches?',
		answer:
			'We provide post-launch support including bug fixes, performance monitoring, analytics setup, and optimization. Most engagements include 3 months of support. We also offer ongoing maintenance retainers for long-term support and feature updates.',
	},
	{
		question: 'Can you help with app updates and new feature development?',
		answer:
			'Yes. We provide ongoing development services for app updates, new features, and platform updates. We can work on a project basis or through a retainer model depending on your needs.',
	},
	{
		question: 'Is the initial consultation really free?',
		answer:
			'Yes. The 30-minute strategy session is complimentary and includes a written technical roadmap with platform recommendations, timeline estimates, and budget ranges—no commitment required.',
	},
];

const APP_INTEGRATIONS = [
	{ name: 'REST APIs', category: 'Backend' },
	{ name: 'GraphQL', category: 'Backend' },
	{ name: 'Firebase', category: 'Backend' },
	{ name: 'AWS Amplify', category: 'Backend' },
	{ name: 'Stripe', category: 'Payments' },
	{ name: 'Apple Pay', category: 'Payments' },
	{ name: 'Google Pay', category: 'Payments' },
	{ name: 'Push Notifications', category: 'Engagement' },
	{ name: 'Analytics', category: 'Analytics' },
	{ name: 'Crash Reporting', category: 'Monitoring' },
	{ name: 'Authentication', category: 'Security' },
	{ name: 'Biometric Auth', category: 'Security' },
];

export default function AppDevOverviewPage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: 'Mobile App Development',
		provider: {
			'@type': 'Organization',
			name: 'PayPerCall',
			url: 'https://paypercall.com',
		},
		description:
			'Expert mobile app development services including native iOS, Android, and cross-platform apps built for user engagement and business growth.',
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

	return (
		<main className='space-y-12'>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<TechMarquee />
			<TrustBanner />
			<ResultsShowcase className='max-w-7xl mx-auto' variant='split' />
			<section className='py-16 max-w-7xl mx-auto'>
				<div className='mb-12 max-w-3xl mx-auto text-center'>
					<h2 className='mb-4 text-foreground text-3xl md:text-4xl lg:text-5xl font-bold'>
						App Development Capabilities
					</h2>
					<p className='text-muted-foreground'>
						Each platform links to a dedicated plan so stakeholders can explore what matters most.
					</p>
				</div>
				<AnimatedServicesGrid
					services={APP_DEV_SERVICE_NAV.filter((item) => item.href !== '/services/app-dev').map(
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						({ icon: _icon, ...service }) => service
					)}
					className='grid gap-6 md:grid-cols-2'
				/>
			</section>
			<ProcessSteps
				className='max-w-7xl mx-auto'
				steps={PROCESS_STEPS}
				title='How we deliver app development projects'
				description='Every engagement follows a predictable arc so stakeholders always know what is happening next.'
				variant='cards'
			/>
			<CaseStudyStrip
				items={CASE_STUDIES}
				title='Results grounded in performance data'
				description='Every case study highlights the measurable outcomes stakeholders care about.'
			/>
			<TestimonialsSection className='max-w-7xl mx-auto' variant='featured' />
			<IntegrationLogos
				className='max-w-7xl mx-auto'
				title='App integrations and services we work with'
				description='From backend APIs to payment processors, we connect your app to the systems your business relies on.'
				integrations={APP_INTEGRATIONS}
				variant='grid'
				ctaLabel='Discuss integration requirements'
				ctaHref='/contact'
			/>
			<PricingTable
				className='max-w-7xl mx-auto'
				title='Engagement models suited to your stage'
				description='Transparent ranges help you budget faster. Every project begins with a free planning call.'
				plans={PRICING_PLANS}
				billingNote='Budgets include design, engineering, QA, App Store submission, and launch support.'
			/>
			<FAQSection className='max-w-7xl mx-auto' items={FAQ_ITEMS} />
			<div className='section-container pb-16 max-w-7xl mx-auto'>
				<ConsultationCTA
					category='app-dev'
					title='Plan your next app with a 30-minute strategy session'
					bullets={[
						'Share goals, target audience, and platform preferences—no prep deck required.',
						'Receive platform recommendations and technical roadmap within one business day.',
						'See budget ranges and timelines before you commit.',
					]}
				/>
			</div>
		</main>
	);
}

