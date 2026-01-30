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
import heroImage3 from '@/public/images/slider/slider-3.jpg';
import { Tablet, Smartphone, Shield } from 'lucide-react';
import TechMarquee from '@/components/services/Tech-Marquee';

export const metadata: Metadata = {
	title: 'Android App Development Services | Native Android Apps | PayPerCall',
	description:
		'Expert Android app development: Native Android apps built with Kotlin and Jetpack Compose. Google Play Store optimization, Material Design, and device compatibility.',
	alternates: { canonical: '/services/app-dev/android' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Android App Development Services | Native Android Apps',
		description: 'Native Android apps built with Kotlin and Jetpack Compose for Google Play Store.',
		url: '/services/app-dev/android',
		images: [
			{
				url: '/images/slider/slider-3.jpg',
				width: 1200,
				height: 630,
				alt: 'Android app development services',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Android App Development Services | Native Android Apps',
		description: 'Native Android apps built with Kotlin and Jetpack Compose for Google Play Store.',
		images: ['/images/slider/slider-3.jpg'],
	},
	keywords: [
		'Android app development',
		'Kotlin app development',
		'Jetpack Compose development',
		'Google Play Store optimization',
		'Material Design apps',
		'native Android apps',
		'Android development services',
	],
};

export const revalidate = 3600;

const HERO_CONTENT = {
	pill: 'Android Development',
	eyebrow: 'App Development Services',
	title: 'Native Android apps built for scale and performance',
	subtitle:
		'We deliver Kotlin and Jetpack Compose apps that handle device fragmentation, follow Material Design, and achieve Google Play Store success. Start with a free Android strategy consultation.',
	features: ['Kotlin & Jetpack Compose', 'Play Store optimization', 'Material Design'],
	stat: { value: '4.7★', label: 'Average Play Store rating across Android apps' },
	primaryCta: { label: 'Start Android Project', href: '/contact' },
	secondaryCta: { label: 'Request Android Audit', href: '#consultation' },
	footnote: 'Free Android strategy session includes platform assessment and technical roadmap.',
	media: {
		src: heroImage3,
		alt: 'Android app development dashboard',
		caption: 'Every Android build includes Play Store optimization and device testing.',
	},
};

const SUCCESS_OUTCOMES: SuccessOutcome[] = [
	{
		icon: 'clock' as const,
		metric: '11 weeks',
		label: 'Average time to Android launch',
		description: 'From kickoff to Play Store approval with device testing',
		context: 'Includes design, development, device testing, and Play Store submission.',
	},
	{
		icon: 'default' as const,
		metric: '4.7★',
		label: 'Average Play Store rating',
		description: 'Median rating across Android apps we have launched',
		context: 'Through quality UX, performance optimization, and Material Design implementation.',
	},
	{
		icon: 'database' as const,
		metric: '95%',
		label: 'Device compatibility',
		description: 'Apps work across Android versions and screen sizes',
		context: 'We test on multiple devices and Android versions to ensure broad compatibility.',
	},
];

const PROCESS_STEPS: ProcessStep[] = [
	{
		title: 'Android Strategy & Design',
		description:
			'Define app architecture, user flows, and design system following Material Design guidelines. Plan for device fragmentation and multiple screen sizes.',
	},
	{
		title: 'Kotlin Development',
		description:
			'Build native Android app with Kotlin and Jetpack Compose, implement Room database, integrate APIs, and add Android-specific features like Google Pay, biometrics, and push notifications.',
	},
	{
		title: 'Device Testing',
		description:
			'Test across multiple Android devices, screen sizes, and OS versions. Conduct performance testing, memory profiling, and battery optimization.',
	},
	{
		title: 'Play Store Submission',
		description:
			'Prepare Play Store listing, screenshots, metadata, and privacy policy. Submit for review and handle any rejection issues until approved.',
	},
];

const DELIVERABLE_STANDARDS = [
	'Kotlin app with Jetpack Compose following Material Design guidelines.',
	'Play Store listing with optimized metadata, screenshots, and descriptions.',
	'Device testing across multiple Android devices and OS versions.',
	'Room database or Firebase integration for local and cloud data sync.',
];

const DELIVERABLES = [
	{
		title: 'Native Android App',
		description: 'Kotlin app built with Jetpack Compose for modern Android devices.',
		bulletPoints: ['Kotlin & Jetpack Compose', 'Material Design 3', 'Dark theme support', 'Accessibility features'],
	},
	{
		title: 'Play Store Submission',
		description: 'Complete Play Store listing and submission process.',
		bulletPoints: ['Play Console setup', 'Metadata & screenshots', 'Privacy policy integration', 'Review process management'],
	},
	{
		title: 'Device Testing',
		description: 'Comprehensive testing across Android devices and versions.',
		bulletPoints: ['Multiple device testing', 'OS version compatibility', 'Screen size adaptation', 'Performance profiling'],
	},
	{
		title: 'Google Services Integration',
		description: 'Integration with Google services and Android frameworks.',
		bulletPoints: ['Google Pay', 'Firebase integration', 'Google Sign-In', 'Google Maps (if applicable)'],
	},
	{
		title: 'Performance Optimization',
		description: 'Android performance tuning for smooth user experience.',
		bulletPoints: ['60 FPS animations', 'Fast app startup', 'Memory optimization', 'Battery efficiency'],
	},
	{
		title: 'Documentation & Handoff',
		description: 'Technical documentation and knowledge transfer.',
		bulletPoints: ['Architecture documentation', 'Code comments', 'Deployment guide', 'Maintenance runbook'],
	},
];

const ANDROID_INTEGRATIONS = [
	{ name: 'Kotlin', category: 'Language' },
	{ name: 'Jetpack Compose', category: 'UI Framework' },
	{ name: 'Material Design', category: 'Design System' },
	{ name: 'Room Database', category: 'Data Storage' },
	{ name: 'Firebase', category: 'Backend Services' },
	{ name: 'Google Pay', category: 'Payments' },
	{ name: 'Google Sign-In', category: 'Authentication' },
	{ name: 'Google Maps', category: 'Location Services' },
	{ name: 'Push Notifications', category: 'Engagement' },
	{ name: 'Play Console', category: 'Distribution' },
	{ name: 'Android Studio', category: 'Development' },
	{ name: 'Gradle', category: 'Build System' },
];

const CASE_STUDIES: CaseStudyItem[] = [
	{
		client: 'DeliveryPro Android',
		industry: 'Logistics',
		problem: 'Logistics company needed Android app with real-time tracking, offline capabilities, and Google Maps integration.',
		solution:
			'Built Kotlin app with Jetpack Compose, Google Maps SDK, Room database for offline mode, and Firebase for real-time updates.',
		outcome: 'Launched in 10 weeks with 4.8-star rating and 25k downloads in first month.',
		icon: <Tablet className='h-5 w-5' />,
		metrics: [
			{ label: 'Play Store rating', value: '4.8★' },
			{ label: 'Month 1 downloads', value: '25k' },
		],
	},
	{
		client: 'FinanceHub Android',
		industry: 'Financial Services',
		problem: 'Financial services firm required secure Android app with Google Pay integration and real-time transaction processing.',
		solution:
			'Developed Kotlin app with Jetpack Compose, Google Pay, biometric authentication, encrypted storage, and real-time API integration.',
		outcome: 'Processed $2.3M in transactions in first quarter with 99.9% uptime and 4.7-star rating.',
		icon: <Smartphone className='h-5 w-5' />,
		metrics: [
			{ label: 'Q1 transactions', value: '$2.3M' },
			{ label: 'Uptime', value: '99.9%' },
		],
	},
	{
		client: 'RetailFlow Android',
		industry: 'Retail',
		problem: 'Retail company needed Android app with offline shopping cart, inventory sync, and support for multiple screen sizes.',
		solution:
			'Built Kotlin app with Jetpack Compose, Room database, responsive layouts, and Firebase sync for inventory updates.',
		outcome: 'Launched with 95% device compatibility and 4.6-star rating with 80% user retention after 30 days.',
		icon: <Shield className='h-5 w-5' />,
		metrics: [
			{ label: 'Device compatibility', value: '95%' },
			{ label: '30-day retention', value: '80%' },
		],
	},
];

const PRICING_PLANS: PricingPlan[] = [
	{
		name: 'Android MVP',
		description: 'Essential Android app with core features.',
		priceLabel: 'From $45k',
		features: [
			'Kotlin & Jetpack Compose app',
			'Core features (3-5 features)',
			'Play Store submission',
			'Device testing (5+ devices)',
			'Basic backend integration',
		],
	},
	{
		name: 'Android Growth',
		description: 'Full-featured Android app with comprehensive device support.',
		priceLabel: 'From $75k',
		features: [
			'Complete feature set',
			'Google Pay & Sign-In',
			'Play Store optimization',
			'Device testing (10+ devices)',
			'Firebase or Room database',
			'3 months post-launch support',
		],
		isRecommended: true,
		badge: 'Most popular',
	},
	{
		name: 'Android Enterprise',
		description: 'Complex Android apps with advanced features and compliance needs.',
		priceLabel: 'Custom',
		features: [
			'Advanced Android features',
			'Custom Google service integration',
			'Enterprise security & compliance',
			'Custom backend development',
			'Ongoing optimization retainer',
		],
	},
];

const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'Should we use Jetpack Compose or traditional Views for our Android app?',
		answer:
			'Jetpack Compose is the modern, declarative UI framework recommended for new Android apps. It offers faster development, better performance, and native Material Design 3 support. Traditional Views are still valuable for complex legacy integrations. We recommend Jetpack Compose for most new projects and can help you decide based on your requirements.',
	},
	{
		question: 'How do you handle Android device fragmentation?',
		answer:
			'We test on multiple Android devices, screen sizes, and OS versions. We use responsive layouts, adaptive resources, and comprehensive device testing to ensure broad compatibility. Our apps typically support 95%+ of active Android devices.',
	},
	{
		question: 'How long does Google Play Store review take?',
		answer:
			'Play Store review typically takes 1-3 days for most apps. We prepare all materials correctly to avoid rejections. If issues arise, we address them immediately and resubmit. Our first-time approval rate is high.',
	},
	{
		question: 'Can you integrate with Google services like Google Pay and Firebase?',
		answer:
			'Yes. We integrate with Google Pay, Google Sign-In, Firebase, Google Maps, and other Google services. We handle the complete setup including API keys, OAuth configuration, and Play Console settings.',
	},
	{
		question: 'What Android versions do you support?',
		answer:
			'We typically target Android 8.0 (API 26) and above, ensuring compatibility with the vast majority of active devices. We can support older versions if needed, but recommend staying current for security and feature access.',
	},
	{
		question: 'How do you ensure Android app security?',
		answer:
			'Android security is built into every app. We implement encrypted data storage with EncryptedSharedPreferences, secure API communication with certificate pinning, biometric authentication, and follow Android security best practices. For regulated industries, we align with HIPAA and GDPR requirements.',
	},
	{
		question: 'Do you handle performance optimization for Android?',
		answer:
			'Yes. We optimize for 60 FPS animations, fast app startup, memory efficiency, and battery usage. We use Android Profiler, memory leak detection, and performance testing to ensure smooth user experience across devices.',
	},
	{
		question: 'Is the Android strategy consultation free?',
		answer:
			'Yes. The 30-minute Android strategy session is complimentary and includes platform assessment, technical recommendations, timeline estimates, and budget ranges—no commitment required.',
	},
];

export default function AndroidAppDevPage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: 'Android App Development',
		provider: {
			'@type': 'Organization',
			name: 'PayPerCall',
			url: 'https://paypercall.com',
		},
		description:
			'Expert Android app development services including native Android apps built with Kotlin and Jetpack Compose.',
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
		<main className='space-y-0'>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<section className='py-6 md:py-8'>
				<TechMarquee />
			</section>
			<ClientSuccessBreakdown
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Android outcomes backed by data'
				subtitle='Metrics that matter for Play Store success.'
				outcomes={SUCCESS_OUTCOMES}
			/>
			<ProcessSteps
				className='max-w-7xl mx-auto py-12 md:py-16'
				steps={PROCESS_STEPS}
				title='Android development workflow'
				variant='cards'
			/>
			<DeliverablesSection
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Deliverables included with every Android build'
				subtitle='We ship production-ready Android apps with Play Store optimization and Google services integration.'
				standards={DELIVERABLE_STANDARDS}
				deliverables={DELIVERABLES}
			/>
			<IntegrationLogos
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Android frameworks and services we work with'
				description='From Kotlin to Google Pay, we integrate your Android app with the Google ecosystem.'
				integrations={ANDROID_INTEGRATIONS}
				variant='grid'
				ctaLabel='Discuss Android integration needs'
				ctaHref='/contact'
			/>
			<CaseStudyStrip
				className='max-w-7xl mx-auto py-12 md:py-16'
				items={CASE_STUDIES}
				title='Representative Android engagements'
				description='Every Android build delivers measurable improvements in Play Store ratings, user engagement, and business outcomes.'
			/>
			<div id='pricing' className='scroll-mt-24'>
				<PricingTable
					className='max-w-7xl mx-auto py-12 md:py-16'
					title='Android engagement models'
					description='Choose the tier that matches your needs. Every project starts with a free consultation and Android strategy session.'
					plans={PRICING_PLANS}
					billingNote='All plans include Kotlin development, Play Store submission, device testing, and documentation. Google Play Console fees billed separately.'
				/>
			</div>
			<FAQSection className='max-w-7xl mx-auto py-12 md:py-16' items={FAQ_ITEMS} />
			<div id='consultation' className='section-container py-12 md:py-16'>
				<ConsultationCTA
					className='w-full'
					title='Start your Android project with a free consultation'
					bullets={[
						'Review app requirements and Android platform needs.',
						'Kotlin & Jetpack Compose recommendation and technical roadmap.',
						'Budget estimate and timeline with no obligation.',
					]}
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}

