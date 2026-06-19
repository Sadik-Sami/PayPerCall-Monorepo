import React from 'react';
import { Smartphone, AppWindow, Shield, Tablet, Code2 } from 'lucide-react';

export const IOS_DATA = {
	HERO: {
		pill: 'iOS Development',
		eyebrow: 'App Development Services',
		title: 'Native iOS apps built for speed and App Store success',
		subtitle:
			'We deliver SwiftUI apps that conquer complex Apple guidelines, bypass scope creep, and achieve 99.9% crash-free sessions. Start with a free strategy consultation.',
		features: ['SwiftUI & Xcode', 'Strict HIG Compliance', 'Apple Pay Ready'],
		stat: { value: '98%', label: 'First-time App Store approval rate' },
		primaryCta: { label: 'Book an iOS Strategy Call', href: '/contact' },
		secondaryCta: { label: 'Explore Our Deliverables', href: '#consultation' },
		footnote: 'Your free iOS strategy session includes a full HIG and technical architecture roadmap.',
	},
	OUTCOMES: [
		{
			icon: 'clock' as const,
			metric: '2x',
			label: 'Faster App Store Approvals',
			description: 'First-time success with zero rejections by strictly following Apple guidelines.',
			context: 'We handle App Store Connect, privacy compliance, and metadata.',
		},
		{
			icon: 'default' as const,
			metric: '99.9%',
			label: 'Crash-Free Sessions',
			description: 'Highly scalable architecture preventing memory leaks under high CPU load.',
			context: 'Ensuring seamless UX and protecting your brand reputation.',
		},
		{
			icon: 'gitBranch' as const,
			metric: '4.8★',
			label: 'App Store Ratings',
			description: 'Premium UI/UX aligned with Apple Human Interface Guidelines.',
			context: 'Higher conversion rates driven by fluid native transitions.',
		},
	],
	PROCESS_STEPS: [
		{
			title: 'Discovery & Requirements',
			description: 'Locking down scope to prevent budget blowouts. Technical mapping for APIs and payment integrations.',
		},
		{
			title: 'SwiftUI Architecture',
			description: 'Designing the data flow with CoreData/SwiftData and native FaceID/TouchID security.',
		},
		{
			title: 'TestFlight Validation',
			description: 'Internal and external QA to guarantee a 99.9% crash-free experience before public launch.',
		},
		{
			title: 'App Store Submission',
			description: 'End-to-end management of the Apple review process for first-time approval.',
		},
	],
	DELIVERABLES: [
		{
			title: 'Production-ready Swift code',
			description: 'Clean, documented SwiftUI codebase owned 100% by you.',
			link: '#',
		},
		{
			title: 'App Store Publishing',
			description: 'Handling metadata, screenshots, and compliance for the App Store.',
			link: '#',
		},
		{
			title: 'Figma Prototypes',
			description: 'Interactive high-fidelity designs following strict Apple HIG.',
			link: '#',
		},
		{
			title: 'API & Backend Specs',
			description: 'Detailed documentation for your backend team to connect seamlessly.',
			link: '#',
		},
		{
			title: 'Continuous Integration',
			description: 'Automated Xcode build and testing pipelines via GitHub Actions.',
			link: '#',
		},
		{
			title: 'Analytics Integration',
			description: 'Custom event tracking setup with Firebase or Mixpanel.',
			link: '#',
		},
	],
	INTEGRATIONS: [
		{ name: 'SwiftUI', category: 'UI Framework' },
		{ name: 'CoreData', category: 'Data Storage' },
		{ name: 'Apple Pay', category: 'Payments' },
		{ name: 'FaceID', category: 'Security' },
		{ name: 'APNs', category: 'Push Notifications' },
		{ name: 'TestFlight', category: 'Distribution' },
		{ name: 'HealthKit', category: 'Health & Fitness' },
		{ name: 'ARKit', category: 'Augmented Reality' },
	],
	FAQ_ITEMS: [
		{
			question: 'How much does it cost to develop an iOS app?',
			answer: 'Typically $20,000 to $150,000+ depending on scope, complexity, and backend needs. MVPs usually start at the lower end of that spectrum. We provide a transparent budget breakdown during discovery.',
		},
		{
			question: 'How long does the iOS app development process take?',
			answer: 'Usually 3 to 8 months from discovery to launch, depending on features and API readiness. We use milestone-based agile sprints to ensure predictable delivery.',
		},
		{
			question: 'What technologies do you use for native iOS development?',
			answer: 'We prioritize modern tech stacks: Swift, SwiftUI, Xcode, and Apple’s native SDKs, ensuring long-term maintainability and high performance.',
		},
		{
			question: 'Will you handle the App Store submission and approval process?',
			answer: 'Yes. We provide end-to-end management of App Store Connect, ensuring strict compliance with Apple’s guidelines to secure first-time approvals.',
		},
		{
			question: 'Who owns the source code and intellectual property?',
			answer: 'The client owns 100% of the code and intellectual property upon project completion. We hand over the GitHub/GitLab repository directly to your team.',
		},
	],
};

export const ANDROID_DATA = {
	HERO: {
		pill: 'Android Development',
		eyebrow: 'App Development Services',
		title: 'Scalable Android apps tested across thousands of devices',
		subtitle:
			'We build Kotlin & Jetpack Compose applications that solve fragmentation issues, pass rigorous Google Play reviews, and deliver a 99% crash-free experience.',
		features: ['Kotlin & Jetpack', 'Google Play Compliant', 'Anti-Fragmentation'],
		stat: { value: '99%', label: 'Crash-free session rate across OS versions' },
		primaryCta: { label: 'Book an Android Strategy Call', href: '/contact' },
		secondaryCta: { label: 'View Case Studies', href: '#consultation' },
		footnote: 'Free technical roadmap includes device testing strategy and architecture review.',
	},
	OUTCOMES: [
		{
			icon: 'clock' as const,
			metric: '100%',
			label: 'Agile Transparency',
			description: 'No hidden costs. On-time sprint deliveries with real-time budget tracking.',
			context: 'We eliminate scope creep through rigorous PRD creation.',
		},
		{
			icon: 'database' as const,
			metric: '95%+',
			label: 'Device Compatibility',
			description: 'Consistent UX across various screen sizes and hardware profiles.',
			context: 'Thorough QA testing to solve Android fragmentation.',
		},
		{
			icon: 'gitBranch' as const,
			metric: '99%',
			label: 'Crash-Free Rate',
			description: 'Robust, bug-free interface engineered for user retention.',
			context: 'Future-proof scalability using native Kotlin and Material Design.',
		},
	],
	PROCESS_STEPS: [
		{
			title: 'Device & OS Strategy',
			description: 'Defining baseline OS support (e.g., Android 8.0+) and screen adaptation logic to handle fragmentation.',
		},
		{
			title: 'Jetpack Compose Dev',
			description: 'Building native features like Google Pay and securing data for HIPAA/GDPR compliance.',
		},
		{
			title: 'Rigorous QA & Profiling',
			description: 'Memory profiling, battery optimization, and device-farm testing to ensure a 99%+ crash-free rate.',
		},
		{
			title: 'Play Store Publishing',
			description: 'Generating App Bundles (AAB) and handling Google Play Developer console verifications.',
		},
	],
	DELIVERABLES: [
		{
			title: 'Kotlin Source Code',
			description: 'Modern, safe Kotlin codebase utilizing Jetpack Compose.',
			link: '#',
		},
		{
			title: 'Google Play Publishing',
			description: 'AAB generation, Keystore management, and store listing optimization.',
			link: '#',
		},
		{
			title: 'Material Design UI/UX',
			description: 'Figma files fully compliant with Google’s Material Design 3.',
			link: '#',
		},
		{
			title: 'Security & QA Reports',
			description: 'Comprehensive test logs ensuring data encryption and stability.',
			link: '#',
		},
		{
			title: 'Continuous Integration',
			description: 'Automated AAB generation and testing pipelines.',
			link: '#',
		},
		{
			title: 'Analytics Integration',
			description: 'Deep event tracking with Firebase Analytics and Crashlytics.',
			link: '#',
		},
	],
	INTEGRATIONS: [
		{ name: 'Kotlin', category: 'Language' },
		{ name: 'Jetpack Compose', category: 'UI Framework' },
		{ name: 'Firebase', category: 'Backend' },
		{ name: 'Google Pay', category: 'Payments' },
		{ name: 'Material Design', category: 'Design' },
		{ name: 'Play Console', category: 'Distribution' },
		{ name: 'Room', category: 'Data Storage' },
		{ name: 'Google Maps', category: 'Location Services' },
	],
	FAQ_ITEMS: [
		{
			question: 'What programming languages are used for native Android development?',
			answer: 'Kotlin is the industry standard and our primary language for modern Android development. We also support Java for legacy system integrations when necessary.',
		},
		{
			question: 'Will my app work on all Android devices?',
			answer: 'We test across numerous screen sizes and hardware profiles. We set a baseline OS support level (typically Android 8.0+) to ensure stability and cover over 95% of active devices.',
		},
		{
			question: 'How long does Android app development take?',
			answer: 'Typically 3 to 9+ months depending on backend complexity and feature scope. We provide a firm timeline after the discovery phase.',
		},
		{
			question: 'How do you handle Google Play Store submission and verification?',
			answer: 'We provide end-to-end management, including Play Console setup, signing keys (keystores), metadata, and policy compliance to ensure a smooth launch.',
		},
		{
			question: 'How much does it cost to develop an Android app?',
			answer: 'Usually $20,000 to $100,000+ depending on features, integrations, and compliance requirements. We offer transparent pricing with zero hidden costs.',
		},
	],
};

export const CROSS_PLATFORM_DATA = {
	HERO: {
		pill: 'Cross-Platform Development',
		eyebrow: 'App Development Services',
		title: 'Launch on iOS and Android up to 50% faster',
		subtitle:
			'We engineer high-performance Flutter and React Native apps that share 90% of their codebase, drastically reducing development costs and simplifying long-term maintenance.',
		features: ['React Native & Flutter', 'Single Codebase', 'Native Performance'],
		stat: { value: '50%', label: 'Reduction in time-to-market' },
		primaryCta: { label: 'Book a Framework Call', href: '/contact' },
		secondaryCta: { label: 'Explore the ROI', href: '#consultation' },
		footnote: 'Free framework assessment: We evaluate if Flutter or React Native is right for your project.',
	},
	OUTCOMES: [
		{
			icon: 'clock' as const,
			metric: '50%',
			label: 'Faster Launch',
			description: 'Simultaneous deployment to both App Store and Play Store.',
			context: 'Bypassing the need for two separate native engineering teams.',
		},
		{
			icon: 'database' as const,
			metric: '90%',
			label: 'Code Reusability',
			description: 'Maintain a single codebase for both platforms.',
			context: 'Unified maintenance means bug fixes are deployed instantly everywhere.',
		},
		{
			icon: 'gitBranch' as const,
			metric: '50%',
			label: 'Budget Optimization',
			description: 'Massive reduction in upfront development costs.',
			context: 'Achieving native-like performance without the native price tag.',
		},
	],
	PROCESS_STEPS: [
		{
			title: 'Framework Selection',
			description: 'Evaluating Flutter vs. React Native based on your hardware constraints and API dependency needs.',
		},
		{
			title: 'Unified UI/UX Design',
			description: 'Designing a cohesive interface that feels native on both iOS and Android simultaneously.',
		},
		{
			title: 'Native Bridging',
			description: 'Writing custom native plugins for OS-specific APIs (Bluetooth, AR, advanced camera) when necessary.',
		},
		{
			title: 'Dual Store Launch',
			description: 'Deploying your shared codebase to both Apple App Store and Google Play Store on the same day.',
		},
	],
	DELIVERABLES: [
		{
			title: 'Shared Source Code',
			description: 'Clean React Native or Flutter repo owned entirely by you.',
			link: '#',
		},
		{
			title: 'Native Plugins',
			description: 'Custom bridging code for deep iOS/Android hardware access.',
			link: '#',
		},
		{
			title: 'Dual Store Publishing',
			description: 'Metadata and assets for both App Store and Play Store.',
			link: '#',
		},
		{
			title: 'Hot Reload Setup',
			description: 'Unified QA pipelines enabling rapid over-the-air (OTA) updates.',
			link: '#',
		},
		{
			title: 'Automated Deployment',
			description: 'CI/CD pipelines for dual platform builds and releases.',
			link: '#',
		},
		{
			title: 'Unified Analytics',
			description: 'Single event tracking setup across both iOS and Android apps.',
			link: '#',
		},
	],
	INTEGRATIONS: [
		{ name: 'React Native', category: 'Framework' },
		{ name: 'Flutter (Dart)', category: 'Framework' },
		{ name: 'Fast Refresh', category: 'Developer Tool' },
		{ name: 'Native Bridges', category: 'Architecture' },
		{ name: 'Code Push', category: 'OTA Updates' },
		{ name: 'Firebase', category: 'Unified Backend' },
		{ name: 'SQLite', category: 'Data Storage' },
		{ name: 'GraphQL', category: 'Backend APIs' },
	],
	FAQ_ITEMS: [
		{
			question: 'What is the benefit of cross-platform versus native development?',
			answer: 'A single codebase reduces development costs by 30-50%, speeds up time-to-market, and enables a simultaneous launch on both Apple and Google app stores without maintaining two separate engineering teams.',
		},
		{
			question: 'What frameworks do you use for cross-platform app development?',
			answer: 'We utilize Flutter (by Google) and React Native (by Meta), which are the industry standards for building high-performance, native-feeling applications.',
		},
		{
			question: 'Will a cross-platform app perform as well as a native app?',
			answer: 'For 95% of business applications, the performance difference is imperceptible. We optimize rendering engines to hit 60fps. Pure native is only required for extremely heavy 3D graphics or deep hardware-level OS integration.',
		},
		{
			question: 'How do you handle OS-specific updates (iOS and Android)?',
			answer: 'Modern frameworks like React Native and Flutter receive updates immediately after major OS releases. When native support is lacking, we write custom bridges and plugins to maintain compatibility.',
		},
		{
			question: 'Can we migrate our cross-platform app to native later?',
			answer: 'Yes. While the frontend UI code would need to be rewritten, your entire backend architecture, APIs, and databases remain completely reusable.',
		},
	],
};
