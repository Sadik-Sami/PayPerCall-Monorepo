import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	ProcessSteps,
	ServiceHero,
	ClientSuccessBreakdown,
	ServiceComparison,
	DeliverablesSection,
	IntegrationLogos,
} from '@/components/services';
import type { Metadata } from 'next';
import type { FaqItem, ProcessStep, CaseStudyItem } from '@/types/services';
import type { SuccessOutcome } from '@/components/services/client-success-breakdown';
import heroImage1 from '@/public/images/slider/slider-1.jpg';
import { Code2, Smartphone, Tablet } from 'lucide-react';

export const metadata: Metadata = {
	title: 'Cross-Platform App Development | React Native & Flutter | PayPerCall',
	description:
		'Expert cross-platform app development: React Native and Flutter apps that reach iOS and Android from one codebase. Faster time-to-market and code reuse.',
	alternates: { canonical: '/services/app-dev/cross-platform' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Cross-Platform App Development | React Native & Flutter',
		description: 'Cross-platform apps that reach iOS and Android from one codebase with React Native or Flutter.',
		url: '/services/app-dev/cross-platform',
		images: [
			{
				url: '/images/slider/slider-1.jpg',
				width: 1200,
				height: 630,
				alt: 'Cross-platform app development services',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Cross-Platform App Development | React Native & Flutter',
		description: 'Cross-platform apps that reach iOS and Android from one codebase.',
		images: ['/images/slider/slider-1.jpg'],
	},
	keywords: [
		'cross-platform app development',
		'react native development',
		'flutter app development',
		'hybrid mobile apps',
		'cross-platform mobile development',
		'react native vs flutter',
	],
};

export const revalidate = 3600;

const HERO_CONTENT = {
	pill: 'Cross-Platform Development',
	eyebrow: 'App Development Services',
	title: 'Cross-platform apps that reach iOS and Android from one codebase',
	subtitle:
		'We deliver React Native and Flutter apps that reduce development time, maximize code reuse, and launch on both platforms simultaneously. Start with a free framework consultation.',
	features: ['React Native & Flutter', 'Code reuse', 'Native modules'],
	stat: { value: '85%', label: 'Average code reuse across platforms' },
	primaryCta: { label: 'Start Cross-Platform Project', href: '/contact' },
	secondaryCta: { label: 'Request Framework Consultation', href: '#consultation' },
	footnote: 'Free framework consultation includes React Native vs Flutter recommendation and technical roadmap.',
	media: {
		src: heroImage1,
		alt: 'Cross-platform app development visualization',
		caption: 'Every cross-platform build includes native module integration and platform-specific optimization.',
	},
};

const SUCCESS_OUTCOMES: SuccessOutcome[] = [
	{
		icon: 'clock' as const,
		metric: '40%',
		label: 'Time savings vs native',
		description: 'Average development time reduction with cross-platform approach',
		context: 'Through code reuse and simultaneous platform deployment.',
	},
	{
		icon: 'database' as const,
		metric: '85%',
		label: 'Code reuse',
		description: 'Average percentage of shared code across iOS and Android',
		context: 'Platform-specific code only where needed for native features.',
	},
	{
		icon: 'default' as const,
		metric: '12 weeks',
		label: 'Average time to dual launch',
		description: 'From kickoff to both App Store and Play Store approval',
		context: 'Includes development, testing, and simultaneous store submissions.',
	},
];

const FRAMEWORK_COMPARISON_TIERS = [
	{ name: 'React Native', description: 'JavaScript-based framework with large ecosystem' },
	{ name: 'Flutter', description: 'Dart-based framework with native performance' },
	{ name: 'Other Frameworks', description: 'Ionic, Xamarin, or custom solutions', recommended: false },
];

const FRAMEWORK_COMPARISON_FEATURES = [
	{ name: 'Code reuse', included: ['85-90%', '90-95%', '70-80%'] },
	{ name: 'Performance', included: ['High', 'Native-like', 'Good'] },
	{ name: 'Development speed', included: ['Fast', 'Very fast', 'Moderate'] },
	{ name: 'Native module support', included: [true, true, true] },
	{ name: 'Hot reload', included: [true, true, false] },
	{ name: 'Large community', included: [true, true, 'Varies'] },
	{ name: 'Learning curve', included: ['Moderate', 'Steep', 'Varies'] },
	{ name: 'Platform-specific customization', included: [true, true, true] },
];

const PROCESS_STEPS: ProcessStep[] = [
	{
		title: 'Framework Selection & Strategy',
		description:
			'Evaluate requirements and recommend React Native or Flutter. Define architecture, identify native module needs, and plan platform-specific customizations.',
	},
	{
		title: 'Cross-Platform Development',
		description:
			'Build shared codebase with React Native or Flutter, implement native modules where needed, and create platform-specific UI when required.',
	},
	{
		title: 'Platform Testing & Optimization',
		description:
			'Test on both iOS and Android devices, optimize platform-specific performance, and ensure consistent user experience across platforms.',
	},
	{
		title: 'Dual Store Submission',
		description:
			'Prepare and submit to both App Store and Play Store simultaneously. Handle platform-specific requirements and manage both review processes.',
	},
];

const DELIVERABLE_STANDARDS = [
	'React Native or Flutter app with 80%+ code reuse across platforms.',
	'Native module integration for platform-specific features when needed.',
	'App Store and Play Store listings with optimized metadata for both platforms.',
	'Backend API integration with shared authentication and data sync.',
];

const DELIVERABLES = [
	{
		title: 'Cross-Platform App',
		description: 'React Native or Flutter app running on iOS and Android.',
		bulletPoints: ['React Native or Flutter', 'iOS & Android support', 'Shared codebase', 'Platform-specific UI when needed'],
	},
	{
		title: 'Native Module Integration',
		description: 'Platform-specific native modules for advanced features.',
		bulletPoints: ['Custom native modules', 'Platform APIs integration', 'Performance optimization', 'Bridge implementation'],
	},
	{
		title: 'Dual Store Submission',
		description: 'Complete submission to both App Store and Play Store.',
		bulletPoints: ['App Store listing', 'Play Store listing', 'Platform-specific optimization', 'Review process management'],
	},
	{
		title: 'Backend Integration',
		description: 'Shared backend API integration for both platforms.',
		bulletPoints: ['REST or GraphQL APIs', 'Authentication', 'Real-time sync', 'Push notifications'],
	},
	{
		title: 'Performance Optimization',
		description: 'Cross-platform performance tuning for both iOS and Android.',
		bulletPoints: ['60 FPS animations', 'Fast app startup', 'Memory optimization', 'Platform-specific tuning'],
	},
	{
		title: 'Documentation & Handoff',
		description: 'Technical documentation and knowledge transfer.',
		bulletPoints: ['Architecture documentation', 'Code comments', 'Deployment guide', 'Maintenance runbook'],
	},
];

const CROSS_PLATFORM_INTEGRATIONS = [
	{ name: 'React Native', category: 'Framework' },
	{ name: 'Flutter', category: 'Framework' },
	{ name: 'Expo', category: 'React Native Tools' },
	{ name: 'TypeScript', category: 'Language' },
	{ name: 'Dart', category: 'Language' },
	{ name: 'Firebase', category: 'Backend Services' },
	{ name: 'REST APIs', category: 'Backend' },
	{ name: 'GraphQL', category: 'Backend' },
	{ name: 'Push Notifications', category: 'Engagement' },
	{ name: 'Analytics', category: 'Analytics' },
	{ name: 'Native Modules', category: 'Integration' },
	{ name: 'Code Push', category: 'Updates' },
];

const CASE_STUDIES: CaseStudyItem[] = [
	{
		client: 'RetailFlow Cross-Platform',
		industry: 'Retail',
		problem: 'E-commerce company needed to reach iOS and Android users quickly with shared codebase and faster time-to-market.',
		solution:
			'Developed React Native app with native payment modules, push notifications, and deep linking. Integrated with existing e-commerce backend.',
		outcome: 'Launched on both platforms simultaneously, reducing development time by 40% and achieving 85% code reuse.',
		icon: <Code2 className='h-5 w-5' />,
		metrics: [
			{ label: 'Code reuse', value: '85%' },
			{ label: 'Time saved', value: '40%' },
		],
	},
	{
		client: 'HealthTrack Cross-Platform',
		industry: 'Healthcare',
		problem: 'Healthcare provider needed HIPAA-compliant apps for both iOS and Android with real-time sync and offline capabilities.',
		solution:
			'Built Flutter app with native encryption modules, offline-first architecture, and secure API integration for both platforms.',
		outcome: 'Launched on both stores in 11 weeks with 4.8-star ratings and 90% code reuse.',
		icon: <Smartphone className='h-5 w-5' />,
		metrics: [
			{ label: 'Code reuse', value: '90%' },
			{ label: 'Launch time', value: '11 weeks' },
		],
	},
	{
		client: 'FinanceHub Cross-Platform',
		industry: 'Financial Services',
		problem: 'Financial services firm required secure cross-platform app with payment processing and real-time transactions.',
		solution:
			'Developed React Native app with native payment modules (Apple Pay, Google Pay), biometric authentication, and real-time API integration.',
		outcome: 'Processed $3.2M in transactions across both platforms in first quarter with 99.9% uptime.',
		icon: <Tablet className='h-5 w-5' />,
		metrics: [
			{ label: 'Q1 transactions', value: '$3.2M' },
			{ label: 'Uptime', value: '99.9%' },
		],
	},
];

const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'Should we choose React Native or Flutter for our cross-platform app?',
		answer:
			'React Native is ideal if your team knows JavaScript/TypeScript and you want access to a large ecosystem. Flutter offers better performance and a more consistent UI across platforms. We assess your requirements, team skills, and project needs during discovery to recommend the best fit.',
	},
	{
		question: 'How much code can we actually share between iOS and Android?',
		answer:
			'Typically 80-90% of code is shared. Platform-specific code is needed for native features like payments, biometrics, or platform-specific UI. We minimize platform-specific code and maximize reuse while maintaining native performance.',
	},
	{
		question: 'Can cross-platform apps access native device features?',
		answer:
			'Yes. Both React Native and Flutter support native modules that allow access to platform-specific features. We build custom native modules when needed for features like advanced camera, biometrics, or platform-specific APIs.',
	},
	{
		question: 'How does performance compare to native apps?',
		answer:
			'Modern cross-platform frameworks achieve near-native performance. Flutter compiles to native code for excellent performance. React Native uses native components for UI rendering. For most business apps, performance is indistinguishable from native. We optimize for both platforms.',
	},
	{
		question: 'Can you launch on both App Store and Play Store simultaneously?',
		answer:
			'Yes. One of the main advantages of cross-platform development is launching on both stores at the same time. We handle both submission processes and manage platform-specific requirements.',
	},
	{
		question: 'What about app updates after launch?',
		answer:
			'Cross-platform apps can use over-the-air updates (like Code Push for React Native) for JavaScript/Dart code changes without app store review. Native code changes still require store updates. We set up update mechanisms during development.',
	},
	{
		question: 'Do you support both React Native and Flutter?',
		answer:
			'Yes. We have expertise in both frameworks and can help you choose the best fit. We also work with Expo for React Native development, which simplifies deployment and adds useful tools.',
	},
	{
		question: 'Is the framework consultation free?',
		answer:
			'Yes. The 30-minute framework consultation is complimentary and includes React Native vs Flutter recommendation, technical roadmap, timeline estimates, and budget ranges—no commitment required.',
	},
];

export default function CrossPlatformAppDevPage() {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: 'Cross-Platform App Development',
		provider: {
			'@type': 'Organization',
			name: 'PayPerCall',
			url: 'https://paypercall.com',
		},
		description:
			'Expert cross-platform app development services including React Native and Flutter apps that reach iOS and Android from one codebase.',
		areaServed: { '@type': 'Country', name: 'United States' },
		offers: {
			'@type': 'Offer',
			availability: 'https://schema.org/InStock',
			priceSpecification: {
				'@type': 'PriceSpecification',
				priceCurrency: 'USD',
				price: '65000',
				description: 'Starting from $65k',
			},
		},
	};

	return (
		<main className='space-y-0'>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<ClientSuccessBreakdown
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Cross-platform outcomes backed by data'
				subtitle='Metrics that matter for efficient app development.'
				outcomes={SUCCESS_OUTCOMES}
			/>
			<ServiceComparison
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Framework comparison: React Native vs Flutter'
				subtitle='We help you choose the right framework based on your requirements, team skills, and project needs.'
				tiers={FRAMEWORK_COMPARISON_TIERS}
				features={FRAMEWORK_COMPARISON_FEATURES}
			/>
			<ProcessSteps
				className='max-w-7xl mx-auto py-12 md:py-16'
				steps={PROCESS_STEPS}
				title='Cross-platform development workflow'
				variant='cards'
			/>
			<DeliverablesSection
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Deliverables included with every cross-platform build'
				subtitle='We ship production-ready cross-platform apps with dual store optimization and native module integration.'
				standards={DELIVERABLE_STANDARDS}
				deliverables={DELIVERABLES}
			/>
			<IntegrationLogos
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Cross-platform frameworks and services we work with'
				description='From React Native to Flutter, we build cross-platform apps with the tools that fit your needs.'
				integrations={CROSS_PLATFORM_INTEGRATIONS}
				variant='grid'
				ctaLabel='Discuss cross-platform requirements'
				ctaHref='/contact'
			/>
			<CaseStudyStrip
				className='max-w-7xl mx-auto py-12 md:py-16'
				items={CASE_STUDIES}
				title='Representative cross-platform engagements'
				description='Every cross-platform build delivers measurable improvements in development efficiency, time-to-market, and business outcomes.'
			/>
			<FAQSection className='max-w-7xl mx-auto py-12 md:py-16' items={FAQ_ITEMS} />
			<div id='consultation' className='section-container py-12 md:py-16'>
				<ConsultationCTA
					category='app-dev'
					className='w-full'
					title='Start your cross-platform project with a free framework consultation'
					bullets={[
						'Review app requirements and platform needs.',
						'React Native vs Flutter recommendation and technical roadmap.',
						'Budget estimate and timeline with no obligation.',
					]}
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}

