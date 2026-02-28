import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	ProcessSteps,
	ServiceHero,
	ClientSuccessBreakdown,
	DeliverablesSection,
	IntegrationLogos,
} from '@/components/services';
import type { Metadata } from 'next';
import type { FaqItem, ProcessStep, CaseStudyItem } from '@/types/services';
import type { SuccessOutcome } from '@/components/services/client-success-breakdown';
import heroImage2 from '@/public/images/slider/slider-2.jpg';
import { Smartphone, AppWindow, Shield } from 'lucide-react';

export const metadata: Metadata = {
	title: 'iOS App Development Services | Native iPhone & iPad Apps | PayPerCall',
	description:
		'Expert iOS app development: Native iPhone and iPad apps built with SwiftUI and UIKit. App Store optimization, TestFlight, and Apple ecosystem integration.',
	alternates: { canonical: '/services/app-dev/ios' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'iOS App Development Services | Native iPhone & iPad Apps',
		description: 'Native iOS apps built with SwiftUI and UIKit for iPhone and iPad with App Store optimization.',
		url: '/services/app-dev/ios',
		images: [
			{
				url: '/images/slider/slider-2.jpg',
				width: 1200,
				height: 630,
				alt: 'iOS app development services',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'iOS App Development Services | Native iPhone & iPad Apps',
		description: 'Native iOS apps built with SwiftUI and UIKit for iPhone and iPad.',
		images: ['/images/slider/slider-2.jpg'],
	},
	keywords: [
		'iOS app development',
		'iPhone app development',
		'Swift app development',
		'SwiftUI development',
		'App Store optimization',
		'iPad app development',
		'native iOS apps',
	],
};

export const revalidate = 3600;

const HERO_CONTENT = {
	pill: 'iOS Development',
	eyebrow: 'App Development Services',
	title: 'Native iOS apps built for iPhone and iPad',
	subtitle:
		'We deliver SwiftUI and UIKit apps that leverage iOS capabilities, follow Human Interface Guidelines, and achieve App Store success. Start with a free iOS strategy consultation.',
	features: ['Swift & SwiftUI', 'App Store submission', 'Apple ecosystem integration'],
	stat: { value: '4.8★', label: 'Average App Store rating across iOS apps' },
	primaryCta: { label: 'Start iOS Project', href: '/contact' },
	secondaryCta: { label: 'Request iOS Audit', href: '#consultation' },
	footnote: 'Free iOS strategy session includes platform assessment and technical roadmap.',
	media: {
		src: heroImage2,
		alt: 'iOS app development dashboard',
		caption: 'Every iOS build includes App Store optimization and TestFlight setup.',
	},
};

const SUCCESS_OUTCOMES: SuccessOutcome[] = [
	{
		icon: 'clock' as const,
		metric: '10 weeks',
		label: 'Average time to iOS launch',
		description: 'From kickoff to App Store approval with TestFlight beta testing',
		context: 'Includes design, development, testing, and App Store submission.',
	},
	{
		icon: 'default' as const,
		metric: '4.8★',
		label: 'Average App Store rating',
		description: 'Median rating across iOS apps we have launched',
		context: 'Through quality UX, performance optimization, and user feedback integration.',
	},
	{
		icon: 'database' as const,
		metric: '98%',
		label: 'App Store approval rate',
		description: 'First-time approval success rate on App Store submissions',
		context: 'We follow App Store guidelines and Human Interface Guidelines from day one.',
	},
];

const PROCESS_STEPS: ProcessStep[] = [
	{
		title: 'iOS Strategy & Design',
		description:
			'Define app architecture, user flows, and design system following Human Interface Guidelines. Plan for iPhone and iPad compatibility.',
	},
	{
		title: 'Swift Development',
		description:
			'Build native iOS app with SwiftUI or UIKit, implement Core Data, integrate APIs, and add iOS-specific features like Face ID, Apple Pay, and push notifications.',
	},
	{
		title: 'Testing & TestFlight',
		description:
			'Conduct device testing across iPhone and iPad models, set up TestFlight beta testing, gather feedback, and iterate before App Store submission.',
	},
	{
		title: 'App Store Submission',
		description:
			'Prepare App Store listing, screenshots, metadata, and privacy details. Submit for review and handle any rejection issues until approved.',
	},
];

const DELIVERABLE_STANDARDS = [
	'SwiftUI or UIKit app following Human Interface Guidelines.',
	'App Store listing with optimized metadata, screenshots, and descriptions.',
	'TestFlight beta testing setup for internal and external testers.',
	'Core Data or CloudKit integration for local and cloud data sync.',
];

const DELIVERABLES = [
	{
		title: 'Native iOS App',
		description: 'SwiftUI or UIKit app built for iPhone and iPad with responsive layouts.',
		bulletPoints: ['SwiftUI or UIKit', 'iPhone & iPad support', 'Dark mode support', 'Accessibility features'],
	},
	{
		title: 'App Store Submission',
		description: 'Complete App Store listing and submission process.',
		bulletPoints: ['App Store Connect setup', 'Metadata & screenshots', 'Privacy policy integration', 'Review process management'],
	},
	{
		title: 'TestFlight Beta',
		description: 'TestFlight beta testing setup for pre-launch validation.',
		bulletPoints: ['Internal testing', 'External beta testing', 'Feedback collection', 'Crash reporting'],
	},
	{
		title: 'Apple Ecosystem Integration',
		description: 'Integration with Apple services and frameworks.',
		bulletPoints: ['Apple Pay', 'Sign in with Apple', 'HealthKit (if applicable)', 'Core ML (if applicable)'],
	},
	{
		title: 'Performance Optimization',
		description: 'iOS performance tuning for smooth user experience.',
		bulletPoints: ['60 FPS animations', 'Fast launch times', 'Memory optimization', 'Battery efficiency'],
	},
	{
		title: 'Documentation & Handoff',
		description: 'Technical documentation and knowledge transfer.',
		bulletPoints: ['Architecture documentation', 'Code comments', 'Deployment guide', 'Maintenance runbook'],
	},
];

const IOS_INTEGRATIONS = [
	{ name: 'SwiftUI', category: 'UI Framework' },
	{ name: 'UIKit', category: 'UI Framework' },
	{ name: 'Swift', category: 'Language' },
	{ name: 'Core Data', category: 'Data Storage' },
	{ name: 'CloudKit', category: 'Cloud Services' },
	{ name: 'Apple Pay', category: 'Payments' },
	{ name: 'Sign in with Apple', category: 'Authentication' },
	{ name: 'HealthKit', category: 'Health Data' },
	{ name: 'Core ML', category: 'Machine Learning' },
	{ name: 'Push Notifications', category: 'Engagement' },
	{ name: 'TestFlight', category: 'Beta Testing' },
	{ name: 'App Store Connect', category: 'Distribution' },
];

const CASE_STUDIES: CaseStudyItem[] = [
	{
		client: 'WellnessTracker iOS',
		industry: 'Healthcare',
		problem: 'Healthcare startup needed native iOS app with HealthKit integration and HIPAA-compliant data handling.',
		solution:
			'Built SwiftUI app with HealthKit integration, encrypted Core Data storage, Face ID authentication, and App Store submission.',
		outcome: 'Launched in 9 weeks with 4.9-star rating and 15k downloads in first month.',
		icon: <Smartphone className='h-5 w-5' />,
		metrics: [
			{ label: 'App Store rating', value: '4.9★' },
			{ label: 'Month 1 downloads', value: '15k' },
		],
	},
	{
		client: 'FinanceHub iOS',
		industry: 'Financial Services',
		problem: 'Financial services firm required secure iOS app with Apple Pay integration and real-time transaction processing.',
		solution:
			'Developed SwiftUI app with Apple Pay, biometric authentication, encrypted data storage, and real-time API integration.',
		outcome: 'Processed $1.8M in transactions in first quarter with 99.9% uptime and 4.8-star rating.',
		icon: <AppWindow className='h-5 w-5' />,
		metrics: [
			{ label: 'Q1 transactions', value: '$1.8M' },
			{ label: 'Uptime', value: '99.9%' },
		],
	},
	{
		client: 'RetailPro iOS',
		industry: 'Retail',
		problem: 'Retail company needed iOS app for both iPhone and iPad with offline capabilities and inventory sync.',
		solution:
			'Built universal SwiftUI app with Core Data, CloudKit sync, offline mode, and responsive layouts for iPhone and iPad.',
		outcome: 'Launched on iPhone and iPad simultaneously with 4.7-star rating and 85% user retention after 30 days.',
		icon: <Shield className='h-5 w-5' />,
		metrics: [
			{ label: 'App Store rating', value: '4.7★' },
			{ label: '30-day retention', value: '85%' },
		],
	},
];

const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'Should we use SwiftUI or UIKit for our iOS app?',
		answer:
			'SwiftUI is the modern, declarative framework recommended for new apps. It offers faster development, better performance, and native iOS 15+ support. UIKit is still valuable for complex legacy integrations or apps requiring iOS 13+ support. We recommend SwiftUI for most new projects and can help you decide based on your requirements.',
	},
	{
		question: 'How long does App Store review take?',
		answer:
			'App Store review typically takes 24-48 hours for most apps. We prepare all materials correctly to avoid rejections. If issues arise, we address them immediately and resubmit. Our first-time approval rate is 98%.',
	},
	{
		question: 'Do you support both iPhone and iPad?',
		answer:
			'Yes. We build universal iOS apps that work on both iPhone and iPad with responsive layouts. We can also create iPad-specific features when needed. Universal apps provide better value and reach more users.',
	},
	{
		question: 'Can you integrate with Apple services like Apple Pay and HealthKit?',
		answer:
			'Yes. We integrate with Apple Pay, Sign in with Apple, HealthKit, Core ML, CloudKit, and other Apple frameworks. We handle the complete setup including entitlements, certificates, and App Store Connect configuration.',
	},
	{
		question: 'What about TestFlight beta testing?',
		answer:
			'Every iOS engagement includes TestFlight setup. We configure internal testing for your team and external beta testing for selected users. We help collect feedback and iterate before App Store submission.',
	},
	{
		question: 'How do you ensure iOS app security?',
		answer:
			'iOS security is built into every app. We implement encrypted data storage with Keychain, secure API communication with certificate pinning, biometric authentication, and follow Apple security best practices. For regulated industries, we align with HIPAA and GDPR requirements.',
	},
	{
		question: 'What iOS versions do you support?',
		answer:
			'We typically target iOS 15+ for SwiftUI apps and iOS 13+ for UIKit apps, ensuring compatibility with the vast majority of active devices. We can support older versions if needed, but recommend staying current for security and feature access.',
	},
	{
		question: 'Is the iOS strategy consultation free?',
		answer:
			'Yes. The 30-minute iOS strategy session is complimentary and includes platform assessment, technical recommendations, timeline estimates, and budget ranges—no commitment required.',
	},
];

export default function IOSAppDevPage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: 'iOS App Development',
		provider: {
			'@type': 'Organization',
			name: 'PayPerCall',
			url: 'https://paypercall.com',
		},
		description:
			'Expert iOS app development services including native iPhone and iPad apps built with SwiftUI and UIKit.',
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
			<ClientSuccessBreakdown
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='iOS outcomes backed by data'
				subtitle='Metrics that matter for App Store success.'
				outcomes={SUCCESS_OUTCOMES}
			/>
			<ProcessSteps
				className='max-w-7xl mx-auto py-12 md:py-16'
				steps={PROCESS_STEPS}
				title='iOS development workflow'
				variant='cards'
			/>
			<DeliverablesSection
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Deliverables included with every iOS build'
				subtitle='We ship production-ready iOS apps with App Store optimization and Apple ecosystem integration.'
				standards={DELIVERABLE_STANDARDS}
				deliverables={DELIVERABLES}
			/>
			<IntegrationLogos
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='iOS frameworks and services we work with'
				description='From SwiftUI to Apple Pay, we integrate your iOS app with the Apple ecosystem.'
				integrations={IOS_INTEGRATIONS}
				variant='grid'
				ctaLabel='Discuss iOS integration needs'
				ctaHref='/contact'
			/>
			<CaseStudyStrip
				className='max-w-7xl mx-auto py-12 md:py-16'
				items={CASE_STUDIES}
				title='Representative iOS engagements'
				description='Every iOS build delivers measurable improvements in App Store ratings, user engagement, and business outcomes.'
			/>
			<FAQSection className='max-w-7xl mx-auto py-12 md:py-16' items={FAQ_ITEMS} />
			<div id='consultation' className='section-container py-12 md:py-16'>
				<ConsultationCTA
					category='app-dev'
					className='w-full'
					title='Start your iOS project with a free consultation'
					bullets={[
						'Review app requirements and iOS platform needs.',
						'SwiftUI vs UIKit recommendation and technical roadmap.',
						'Budget estimate and timeline with no obligation.',
					]}
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}

