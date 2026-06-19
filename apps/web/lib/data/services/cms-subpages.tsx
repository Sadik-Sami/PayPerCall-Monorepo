import React from 'react';
import { ShieldCheck, Factory, Activity, Globe, Database, PenTool, Search, LayoutTemplate, Layers, Zap, Code, Shield, Cloud, Globe2 } from 'lucide-react';
import type { SuccessOutcome } from '@/components/sections/services';
import type { TimelineEntry } from '@workspace/ui/components/ui/timeline';

export const HEADLESS_DATA = {
	HERO: {
		pill: 'Headless CMS',
		eyebrow: 'CMS Services',
		title: 'API-first content hubs for omnichannel delivery',
		subtitle: 'We architect headless CMS solutions with Contentful, Sanity, or Strapi that power web, mobile, and IoT experiences from a single content source. Built for developer teams and modern stacks.',
		features: ['API-First', 'GraphQL + REST', 'Framework Agnostic'],
		primaryCta: { label: 'Discuss Headless Project', href: '/contact' },
	},
	OUTCOMES: [
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
			label: 'Publishing overhead reduction',
			description: 'Less time spent on multi-channel content updates',
			context: 'Measured against previous multi-CMS architecture.',
		},
	],
	TRENDING_METRICS: [
		{ label: 'Headless Adoption', value: '+156%', change: '+156%', context: 'Year-over-year increase in enterprise adoption' },
		{ label: 'API-First', value: '68%', change: '+68%', context: 'Of developers choose headless over traditional CMS' },
		{ label: 'Update Speed', value: '3.2x', change: '+220%', context: 'Faster multi-channel content publishing' },
	],
	TIMELINE_STEPS: [
		{
			number: '01',
			title: 'Platform Selection & Architecture',
			description: 'Evaluate headless CMS platforms and design API architecture.',
			details: [
				'Contentful vs Sanity vs Strapi comparison',
				'Content model design',
				'API endpoint planning',
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
			],
		},
		{
			number: '03',
			title: 'API Development & Integration',
			description: 'Build GraphQL/REST APIs and integrate with frontends.',
			details: [
				'GraphQL schema design',
				'Frontend integration (Next.js)',
				'Real-time webhook configuration',
			],
		},
		{
			number: '04',
			title: 'Launch & Documentation',
			description: 'Deploy to production with comprehensive developer docs.',
			details: [
				'Production deployment',
				'API documentation',
				'Editor training',
			],
		},
	],
	COMPARISON_TIERS: [
		{ name: 'Standard CMS', description: 'Monolithic' },
		{ name: 'Headless Basic', description: 'Single Frontend' },
		{ name: 'Omnichannel Headless', description: 'Enterprise', recommended: true },
	],
	COMPARISON_FEATURES: [
		{ name: 'Content Modeling', included: [true, true, true] },
		{ name: 'API-First Architecture', included: [false, true, true] },
		{ name: 'Omnichannel Delivery', included: [false, false, true] },
		{ name: 'Multi-Frontend Support', included: [false, false, true] },
		{ name: 'Framework Agnostic', included: [false, true, true] },
	],
	INTEGRATIONS: [
		{ name: 'Contentful', category: 'Platform', description: 'Enterprise-grade headless SaaS.', icon: <Database className="w-6 h-6"/> },
		{ name: 'Sanity', category: 'Platform', description: 'Flexible, real-time structured content.', icon: <Layers className="w-6 h-6"/> },
		{ name: 'Next.js', category: 'Frontend', description: 'React framework for the web.', icon: <Code className="w-6 h-6"/> },
		{ name: 'GraphQL', category: 'API', description: 'Precise, type-safe data fetching.', icon: <Zap className="w-6 h-6"/> },
	],
	FAQ_ITEMS: [
		{
			question: 'What is the difference between headless CMS and traditional WordPress/Drupal?',
			answer: 'Headless CMS separates content management from presentation. Content is accessed via APIs (GraphQL or REST) and can power any frontend: web, mobile apps, kiosks, IoT devices. Traditional CMS couples content and presentation in one system.',
		},
		{
			question: 'Should we choose Contentful, Sanity, or Strapi?',
			answer: 'Contentful is enterprise SaaS with great UI and scalability. Sanity offers more flexibility and real-time collaboration. Strapi is open-source and self-hosted for maximum control. We help you choose based on budget, team skills, and control requirements.',
		},
		{
			question: 'How do you handle SEO with a headless CMS?',
			answer: 'We use Next.js with SSG/ISR to pre-render pages, ensuring search engines can crawl your content. All metadata, schema markup, and sitemaps are generated automatically from your headless CMS content.',
		},
		{
			question: 'Can headless CMS content be previewed before publishing?',
			answer: 'Yes. We set up preview environments where editors can see how content will appear across all channels (web, mobile, etc.) before publishing. Most headless CMS platforms support draft/preview modes.',
		},
	],
};

export const DRUPAL_DATA = {
	HERO: {
		pill: 'Drupal CMS',
		eyebrow: 'Enterprise Architecture',
		title: 'Complex data structures handled with extreme scalability',
		subtitle: 'We engineer robust Drupal architectures for government, higher education, and enterprise organizations demanding strict compliance and deep integrations.',
		features: ['API-First Headless Ready', 'Granular Access Controls', 'Multilingual Core'],
		primaryCta: { label: 'Discuss Your Architecture', href: '/contact' },
	},
	OUTCOMES: [
		{
			icon: 'gitBranch' as const,
			metric: '10M+',
			label: 'Nodes Processed',
			description: 'Capable of handling massive datasets without performance degradation.',
			context: 'Ideal for publishing hubs and global directories.',
		},
		{
			icon: 'clock' as const,
			metric: '99.9%',
			label: 'Accessibility Compliance',
			description: 'Deep integration of WCAG 2.1 AA standards at the core level.',
			context: 'Crucial for government and higher-ed portals.',
		},
		{
			icon: 'database' as const,
			metric: '100%',
			label: 'Data Sovereignty',
			description: 'Deploy anywhere: on-premise, AWS, or specialized secure clouds.',
			context: 'Meets strict HIPAA, GDPR, and FedRAMP requirements.',
		},
	],
	TRENDING_METRICS: [
		{ label: 'Enterprise Choice', value: '70%', change: '70%', context: 'Of top universities use Drupal' },
		{ label: 'API-First', value: 'JSON:API', change: 'Standard', context: 'Native support for decoupled architectures' },
		{ label: 'Security', value: 'Dedicated', change: '24/7', context: 'Managed by the global Drupal Security Team' },
	],
	TIMELINE_STEPS: [
		{
			number: '01',
			title: 'Architecture & Content Modeling',
			description: 'Define complex entity relationships and taxonomies.',
			details: [
				'Content type architecture',
				'Taxonomy and tagging logic',
				'Role-based access permissions',
			],
		},
		{
			number: '02',
			title: 'Backend Configuration & APIs',
			description: 'Setup core systems, views, and external integrations.',
			details: [
				'Decoupled API endpoints',
				'Migration script creation',
				'Third-party auth integration',
			],
		},
		{
			number: '03',
			title: 'Frontend Theming',
			description: 'Implement Twig templates or headless React/Next.js frontends.',
			details: [
				'Component library implementation',
				'WCAG accessibility auditing',
				'Performance optimization',
			],
		},
		{
			number: '04',
			title: 'Security Audit & Deployment',
			description: 'Rigorous testing against enterprise security standards.',
			details: [
				'Penetration testing',
				'Load balancing setup',
				'CI/CD pipeline deployment',
			],
		},
	],
	COMPARISON_TIERS: [
		{ name: 'Single Site', description: 'Departmental use' },
		{ name: 'Multi-Site', description: 'Enterprise standard', recommended: true },
		{ name: 'Headless Drupal', description: 'API-first' },
	],
	COMPARISON_FEATURES: [
		{ name: 'Drupal 10 Installation', included: [true, true, true] },
		{ name: 'Custom Theme', included: [true, true, true] },
		{ name: 'Security Hardening', included: [true, true, true] },
		{ name: 'Multi-Site Architecture', included: [false, true, true] },
		{ name: 'Role-Based Workflows', included: [false, true, true] },
		{ name: 'HIPAA/SOC 2 Support', included: [false, true, true] },
		{ name: 'Headless API', included: [false, false, true] },
	],
	INTEGRATIONS: [
		{ name: 'Salesforce', category: 'CRM', description: 'Deep suite integration for complex user journeys.', icon: <Database className="w-6 h-6"/> },
		{ name: 'Solr', category: 'Search', description: 'Faceted, high-performance enterprise search.', icon: <Search className="w-6 h-6"/> },
		{ name: 'Next.js', category: 'Frontend', description: 'Headless rendering for lightning-fast UX.', icon: <Layers className="w-6 h-6"/> },
		{ name: 'SAML/SSO', category: 'Security', description: 'Enterprise identity management.', icon: <Shield className="w-6 h-6"/> },
	],
	FAQ_ITEMS: [
		{
			question: 'Is Drupal the right choice for my business?',
			answer: 'Drupal is best suited for organizations with complex content architectures, stringent security requirements, high traffic volumes, or a need for a headless CMS backend. It is the gold standard for enterprise, government, and higher education.',
		},
		{
			question: 'What is a decoupled or headless Drupal architecture?',
			answer: 'A headless setup uses Drupal purely as a backend content repository. Content is exposed via APIs (like JSON:API or GraphQL) to a modern frontend framework like Next.js, allowing for incredibly fast, highly interactive user experiences.',
		},
		{
			question: 'How do you handle Drupal version upgrades?',
			answer: 'We provide structured upgrade paths (e.g., Drupal 9 to 10 or 11) using automated tools like Rector, ensuring custom modules and themes are thoroughly refactored and tested before deployment.',
		},
	],
};

export const WIX_STUDIO_DATA = {
	HERO: {
		pill: 'Wix Studio',
		eyebrow: 'Agile Web Development',
		title: 'Visually stunning websites deployed at incredible speed',
		subtitle: 'We leverage Wix Studio to deliver high-end, responsive designs and complex animations in a fraction of the time of traditional development.',
		features: ['Advanced Animations', 'Responsive AI', 'Integrated Velo Code'],
		primaryCta: { label: 'Start Your Wix Studio Project', href: '/contact' },
	},
	OUTCOMES: [
		{
			icon: 'clock' as const,
			metric: '2x',
			label: 'Faster Delivery',
			description: 'Visual development speeds up the design-to-deployment pipeline.',
			context: 'Perfect for campaigns, agencies, and high-impact brand sites.',
		},
		{
			icon: 'gitBranch' as const,
			metric: '100%',
			label: 'Responsive Control',
			description: 'Pixel-perfect layouts across every breakpoint via advanced CSS grid.',
			context: 'No compromises on tablet or mobile experiences.',
		},
		{
			icon: 'database' as const,
			metric: 'Zero',
			label: 'Hosting Hassles',
			description: 'Enterprise-grade infrastructure managed natively.',
			context: 'Multi-cloud hosting ensures 99.99% uptime.',
		},
	],
	TRENDING_METRICS: [
		{ label: 'Performance', value: 'CWV', change: 'High', context: 'Optimized out-of-the-box for Google Core Web Vitals' },
		{ label: 'Design Freedom', value: 'Unlimited', change: '100%', context: 'No template restrictions, pure custom canvas' },
		{ label: 'Extensibility', value: 'Velo JS', change: 'Node.js', context: 'Full stack Node.js capabilities built-in' },
	],
	TIMELINE_STEPS: [
		{
			number: '01',
			title: 'Visual Design & Prototyping',
			description: 'Figma to high-fidelity visual concepts.',
			details: [
				'Brand identity translation',
				'Typography and spatial rules',
				'Motion design strategy',
			],
		},
		{
			number: '02',
			title: 'Studio Implementation',
			description: 'Building out the responsive canvas.',
			details: [
				'CSS Grid architecture',
				'Responsive AI calibration',
				'Custom interactions',
			],
		},
		{
			number: '03',
			title: 'Velo Development (If needed)',
			description: 'Coding custom logic and API integrations.',
			details: [
				'Custom database collections',
				'Dynamic page routing',
				'Third-party API connections',
			],
		},
		{
			number: '04',
			title: 'QA & Launch',
			description: 'Final polishing and handover.',
			details: [
				'Breakpoint testing',
				'SEO configuration',
				'Client editor handover',
			],
		},
	],
	COMPARISON_TIERS: [
		{ name: 'Standard Builder', description: 'Basic sites' },
		{ name: 'Wix Studio Pro', description: 'Business ready', recommended: true },
		{ name: 'Wix Studio + Velo', description: 'Custom apps' },
	],
	COMPARISON_FEATURES: [
		{ name: 'Responsive Design', included: [true, true, true] },
		{ name: 'Managed Hosting', included: [true, true, true] },
		{ name: 'Advanced CSS Grid', included: [false, true, true] },
		{ name: 'Complex Animations', included: [false, true, true] },
		{ name: 'Custom Velo Code', included: [false, false, true] },
		{ name: 'External APIs', included: [false, false, true] },
	],
	INTEGRATIONS: [
		{ name: 'Google Workspace', category: 'Productivity', description: 'Native email and domain integration.', icon: <Globe className="w-6 h-6"/> },
		{ name: 'Wix Bookings', category: 'Scheduling', description: 'Integrated scheduling and calendar sync.', icon: <Activity className="w-6 h-6"/> },
		{ name: 'Velo APIs', category: 'Custom Data', description: 'Connect to any REST API instantly.', icon: <Code className="w-6 h-6"/> },
		{ name: 'Wix Stores', category: 'Ecommerce', description: 'Native, fast checkout flows.', icon: <LayoutTemplate className="w-6 h-6"/> },
	],
	FAQ_ITEMS: [
		{
			question: 'Is Wix Studio good for SEO?',
			answer: 'Yes. Wix has overhauled its SEO capabilities. Studio includes customizable meta tags, structured data markup, URL redirects, auto-generated XML sitemaps, and excellent Core Web Vitals performance out of the box.',
		},
		{
			question: 'Can we build custom web applications on Wix Studio?',
			answer: 'Yes, using Velo by Wix. Velo provides a full-stack Node.js environment where we can write custom JavaScript, create database collections, build dynamic pages, and integrate with external APIs.',
		},
		{
			question: 'How is Wix Studio different from standard Wix?',
			answer: "Wix Studio is an enterprise-grade platform built specifically for agencies and professional developers. It offers advanced responsive design controls (like proportional scaling and CSS Grid), a unified workspace, and deep coding capabilities that aren't available in the standard editor.",
		},
	],
};

export const WORDPRESS_DATA = {
	HERO: {
		pill: 'WordPress Development',
		eyebrow: 'CMS Services',
		title: 'Custom WordPress sites built for growth and security',
		subtitle: 'We deliver WordPress solutions that stay fast, SEO-ready, and secure. From custom themes to WooCommerce stores, every build includes security hardening and editor training.',
		features: ['Custom Themes', 'Plugin Development', 'WooCommerce Ready'],
		primaryCta: { label: 'Start WordPress Project', href: '/contact' },
	},
	OUTCOMES: [
		{
			icon: 'clock' as const,
			metric: '4 weeks',
			label: 'Average time to launch',
			description: 'From kickoff to production-ready site with content migration.',
			context: 'Includes custom theme, plugin setup, and editor training.',
		},
		{
			icon: 'database' as const,
			metric: '0',
			label: 'Security Breaches',
			description: 'Zero successful attacks in 18 months across managed sites.',
			context: 'Through our proprietary security hardening protocols.',
		},
		{
			icon: 'gitBranch' as const,
			metric: '1.8s',
			label: 'Average Page Load',
			description: 'Median LCP across WordPress sites we build.',
			context: 'Achieved through caching, CDN, and image optimization.',
		},
	],
	TRENDING_METRICS: [
		{ label: 'Market Share', value: '43%', change: 'Stable', context: 'Of the entire web runs on WordPress' },
		{ label: 'Ecosystem', value: '60k+', change: 'Growing', context: 'Plugins available for rapid feature deployment' },
		{ label: 'Flexibility', value: '100%', change: 'OSS', context: 'Fully open-source and customizable architecture' },
	],
	TIMELINE_STEPS: [
		{
			number: '01',
			title: 'Discovery & Planning',
			description: 'Understand content needs and functional requirements.',
			details: [
				'Custom post types definition',
				'ACF schema planning',
				'Plugin stack selection',
			],
		},
		{
			number: '02',
			title: 'Theme Development',
			description: 'Build a custom, lightweight theme from scratch.',
			details: [
				'Tailwind CSS integration',
				'Block editor (Gutenberg) customization',
				'Performance budgeting',
			],
		},
		{
			number: '03',
			title: 'Content Migration',
			description: 'Safely move data without losing SEO equity.',
			details: [
				'Automated database scripts',
				'301 redirect mapping',
				'Media library optimization',
			],
		},
		{
			number: '04',
			title: 'Hardening & Launch',
			description: 'Secure, optimize, and train your team.',
			details: [
				'Wordfence/Security configuration',
				'Redis/Memcached setup',
				'Editor training sessions',
			],
		},
	],
	COMPARISON_TIERS: [
		{ name: 'Template Theme', description: 'Quick launch' },
		{ name: 'Custom Theme', description: 'Performance optimized', recommended: true },
		{ name: 'Enterprise WP', description: 'High availability' },
	],
	COMPARISON_FEATURES: [
		{ name: 'CMS Setup', included: [true, true, true] },
		{ name: 'Basic Plugins', included: [true, true, true] },
		{ name: 'Custom Theme Code', included: [false, true, true] },
		{ name: 'Core Web Vitals Focus', included: [false, true, true] },
		{ name: 'Advanced Security Hardening', included: [false, true, true] },
		{ name: 'Load Balancing', included: [false, false, true] },
		{ name: 'Custom Plugin Dev', included: [false, false, true] },
	],
	INTEGRATIONS: [
		{ name: 'WooCommerce', category: 'Ecommerce', description: 'Native, fully-featured online store capabilities.', icon: <LayoutTemplate className="w-6 h-6"/> },
		{ name: 'ACF Pro', category: 'Data', description: 'Complex content schemas made simple.', icon: <Database className="w-6 h-6"/> },
		{ name: 'Yoast / RankMath', category: 'SEO', description: 'Industry-leading search optimization suites.', icon: <Search className="w-6 h-6"/> },
		{ name: 'WP Rocket', category: 'Performance', description: 'Advanced caching and optimization engine.', icon: <Zap className="w-6 h-6"/> },
	],
	FAQ_ITEMS: [
		{
			question: 'Do you build custom WordPress themes or use pre-made templates?',
			answer: 'We build custom themes tailored to your brand and requirements. Pre-made themes often include bloat and require heavy customization anyway. Custom themes are cleaner, faster, and more maintainable.',
		},
		{
			question: 'How do you handle WordPress security?',
			answer: 'Every site includes a firewall, malware scanning, automatic security updates, SSL certificates, two-factor authentication for admins, and security hardening based on OWASP guidelines.',
		},
		{
			question: 'Can you help with WooCommerce stores?',
			answer: 'Yes. We build full WooCommerce stores including payment gateway integration, shipping configurations, tax setup, product imports, and inventory management.',
		},
		{
			question: 'How do you ensure WordPress sites are fast?',
			answer: 'We optimize every layer: object caching, CDN configuration, image compression, lazy loading, minified CSS/JS, and database optimization. Most sites achieve LCP under 2 seconds.',
		},
	],
};
