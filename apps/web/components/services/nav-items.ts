import type { ServiceNavItem } from './types';
import type { LucideIcon } from 'lucide-react';
import {
	Code2,
	CircuitBoard,
	Layers3,
	Braces,
	PenTool,
	Cpu,
	ServerCog,
	Boxes,
	Database,
	CloudCog,
	GitBranch,
	ShieldCheck,
	Lock,
	TestTube,
	Cloud,
	Sparkles,
	Network,
	Globe,
	Building2,
	ShoppingCart,
	FileText,
	Smartphone,
	Tablet,
} from 'lucide-react';

export const WEB_DEV_SERVICE_NAV: ServiceNavItem[] = [
	{
		label: 'Overview',
		href: '/services/web-dev',
		summary: 'See how our team plans, builds, and optimizes modern web programs.',
		capabilities: ['Program roadmaps', 'Cross-team governance', 'Full lifecycle support'],
		icon: Globe,
	},
	{
		label: 'Full-Stack Development',
		href: '/services/web-dev/full-stack',
		summary: 'End-to-end delivery for complex products, APIs, and integrations.',
		capabilities: ['React & Next.js', 'Node.js · Go · Python', 'Secure APIs', 'Observability'],
		icon: Code2,
	},
	{
		label: 'Business Websites',
		href: '/services/web-dev/business',
		summary: 'Credible corporate sites with measurable lead-generation infrastructure.',
		capabilities: ['Headless CMS', 'Schema & SEO', 'Analytics & CRM routing'],
		icon: Building2,
	},
	{
		label: 'Ecommerce Websites',
		href: '/services/web-dev/ecommerce',
		summary: 'High-conversion storefronts with resilient ops and fulfillment flows.',
		capabilities: ['Headless commerce', 'Payments & tax', 'Inventory integrations'],
		icon: ShoppingCart,
	},
	{
		label: 'Landing Pages',
		href: '/services/web-dev/landing-page',
		summary: 'Campaign-focused pages with clear proof, tracking, and experiments.',
		capabilities: ['Conversion copy', 'Event tracking', 'A/B test support'],
		icon: FileText,
	},
];

export type TechStackItem = {
	label: string;
	icon: LucideIcon;
};

export const WEB_DEV_TECH_STACK: TechStackItem[] = [
	{ label: 'React & Next.js', icon: Code2 },
	{ label: 'TypeScript', icon: Braces },
	{ label: 'Tailwind & shadcn/ui', icon: Layers3 },
	{ label: 'Design systems (Figma)', icon: PenTool },
	{ label: 'Node.js · Express · Hono', icon: Cpu },
	{ label: 'Go & Python services', icon: CircuitBoard },
	{ label: 'Prisma & Drizzle ORM', icon: Boxes },
	{ label: 'MongoDB · PostgreSQL · Neon', icon: Database },
	{ label: 'Supabase & serverless data', icon: CloudCog },
	{ label: 'Microservices & distributed systems', icon: Network },
	{ label: 'GitHub workflows', icon: GitBranch },
	{ label: 'NextAuth · Better Auth · OAuth', icon: ShieldCheck },
	{ label: 'Custom JWT & secure APIs', icon: Lock },
	{ label: 'Dockerized delivery', icon: ServerCog },
	{ label: 'Testing + QA automation', icon: TestTube },
	{ label: 'Vercel · Cloudflare · Render', icon: Cloud },
	{ label: 'Analytics & experimentation', icon: Sparkles },
];

export const CMS_SERVICE_NAV: ServiceNavItem[] = [
	{
		label: 'Overview',
		href: '/services/cms',
		summary: 'Explore our CMS development capabilities across traditional and headless platforms.',
		capabilities: ['Platform selection', 'Custom development', 'Migration support'],
		icon: Globe,
	},
	{
		label: 'WordPress',
		href: '/services/cms/wordpress',
		summary: 'Custom WordPress solutions with enterprise plugins, security, and performance optimization.',
		capabilities: ['Custom themes', 'WooCommerce', 'Gutenberg blocks', 'Multisite'],
		icon: FileText,
	},
	{
		label: 'Drupal',
		href: '/services/cms/drupal',
		summary: 'Enterprise Drupal development for complex content models and high-security requirements.',
		capabilities: ['Multi-site', 'Security hardening', 'API integrations', 'Custom modules'],
		icon: ShieldCheck,
	},
	{
		label: 'Content Hub',
		href: '/services/cms/content-hub',
		summary: 'Headless CMS architecture with API-first content delivery for omnichannel experiences.',
		capabilities: ['Contentful', 'Sanity', 'Strapi', 'GraphQL APIs'],
		icon: Cloud,
	},
	{
		label: 'Wix Studio',
		href: '/services/cms/wix-studio',
		summary: 'Rapid website launches with Wix Studio for small businesses and fast time-to-market.',
		capabilities: ['Visual builder', 'Managed hosting', 'App marketplace', 'SEO tools'],
		icon: Sparkles,
	},
];

export const APP_DEV_SERVICE_NAV: ServiceNavItem[] = [
	{
		label: 'Overview',
		href: '/services/app-dev',
		summary: 'Mobile apps built for user engagement and measurable business growth.',
		capabilities: ['Native & cross-platform', 'App Store optimization', 'Backend integration'],
		icon: Globe,
	},
	{
		label: 'iOS App Development',
		href: '/services/app-dev/ios',
		summary: 'Native iOS apps built for iPhone and iPad with SwiftUI and UIKit.',
		capabilities: ['Swift & SwiftUI', 'App Store submission', 'Apple ecosystem integration'],
		icon: Smartphone,
	},
	{
		label: 'Android App Development',
		href: '/services/app-dev/android',
		summary: 'Native Android apps built for scale and performance across devices.',
		capabilities: ['Kotlin & Jetpack Compose', 'Play Store optimization', 'Material Design'],
		icon: Tablet,
	},
	{
		label: 'Cross-Platform Apps',
		href: '/services/app-dev/cross-platform',
		summary: 'Cross-platform apps that reach iOS and Android from one codebase.',
		capabilities: ['React Native', 'Flutter', 'Code reuse', 'Native modules'],
		icon: Code2,
	},
];
