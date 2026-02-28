import type { ServiceNavItem } from './types';
import type { LucideIcon } from 'lucide-react';
import type { GatewayIconKey } from './ServiceCapabilitiesGateway';
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
	Users,
	UserCheck,
	Zap,
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

export const PAY_PER_CALL_SERVICE_NAV: ServiceNavItem[] = [
	{
		label: 'Overview',
		href: '/services/pay-per-call',
		summary: 'Explore our Pay Per Call development capabilities.',
		capabilities: ['Program roadmaps', 'Cross-team governance', 'Full lifecycle support'],
		icon: Globe,
	},
	{
		label: 'Consumer-Initiated Calls',
		href: '/services/pay-per-call/consumer-initiated',
		summary: 'Explore our Consumer-Initiated Calls development capabilities.',
		capabilities: ['Program roadmaps', 'Cross-team governance', 'Full lifecycle support'],
		icon: Globe,
	},
	{
		label: 'Live Transfer Calls',
		href: '/services/pay-per-call/live-transfer',
		summary: 'Explore our Live Transfer Calls development capabilities.',
		capabilities: ['Program roadmaps', 'Cross-team governance', 'Full lifecycle support'],
		icon: Globe,
	},
	{
		label: 'Offline Media-Driven Calls',
		href: '/services/pay-per-call/offline-media',
		summary: 'Explore our Offline Media-Driven Calls development capabilities.',
		capabilities: ['Program roadmaps', 'Cross-team governance', 'Full lifecycle support'],
		icon: Globe,
	},
];

export const PAY_PER_LEAD_SERVICE_NAV: ServiceNavItem[] = [
	{
		label: 'Overview',
		href: '/services/pay-per-lead',
		summary: 'Explore our Pay Per Lead development capabilities.',
		capabilities: ['Program roadmaps', 'Lead qualification', 'Full lifecycle support'],
		icon: Globe,
	},
	{
		label: 'Exclusive Leads',
		href: '/services/pay-per-lead/exclusive',
		summary: 'Exclusive lead programs with no sharing and full ownership of each lead.',
		capabilities: ['Dedicated leads', 'No sharing', 'Custom qualification'],
		icon: Users,
	},
	{
		label: 'Shared Leads',
		href: '/services/pay-per-lead/shared',
		summary: 'Cost-effective shared leads distributed across multiple buyers.',
		capabilities: ['Lower cost', 'Volume scaling', 'Shared distribution'],
		icon: UserCheck,
	},
	{
		label: 'Real-Time Lead Delivery',
		href: '/services/pay-per-lead/real-time',
		summary: 'Instant lead delivery via API, webhook, or CRM integration.',
		capabilities: ['Real-time delivery', 'API integration', 'CRM sync'],
		icon: Zap,
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

// Gateway section config and helper (serializable data for ServiceCapabilitiesGateway)
export type GatewaySectionConfig = {
	title: string;
	subtitle: string;
	primaryCta: { label: string; href: string };
	primaryCtaNote: string;
	columns: 2 | 3;
	ctaLabels: Record<string, string>;
	iconKeys: Record<string, string>;
};

export function buildGatewayCards(
	navItems: ServiceNavItem[],
	overviewHref: string,
	ctaLabels: Record<string, string>,
	iconKeys: Record<string, string>
): Array<{ label: string; description: string; href: string; ctaLabel: string; iconKey: GatewayIconKey }> {
	return navItems
		.filter((item) => item.href !== overviewHref)
		.map((item) => ({
			label: item.label,
			description: item.summary ?? '',
			href: item.href,
			ctaLabel: ctaLabels[item.href] ?? 'Explore →',
			iconKey: (iconKeys[item.href] ?? 'Globe') as GatewayIconKey,
		}));
}

export const WEB_DEV_GATEWAY_CONFIG: GatewaySectionConfig = {
	title: 'Web Development Capabilities',
	subtitle:
		'Each capability links to a dedicated plan so stakeholders can scan what matters most.',
	primaryCta: { label: 'Start Your Web Blueprint', href: '/contact' },
	primaryCtaNote: 'No commitment required. Free 30-minute strategy session.',
	columns: 2,
	ctaLabels: {
		'/services/web-dev/full-stack': 'Explore Full-Stack',
		'/services/web-dev/business': 'Explore Business Sites',
		'/services/web-dev/ecommerce': 'Explore Ecommerce',
		'/services/web-dev/landing-page': 'Explore Landing Pages',
	},
	iconKeys: {
		'/services/web-dev/full-stack': 'Code2',
		'/services/web-dev/business': 'Building2',
		'/services/web-dev/ecommerce': 'ShoppingCart',
		'/services/web-dev/landing-page': 'FileText',
	},
};

export const CMS_GATEWAY_CONFIG: GatewaySectionConfig = {
	title: 'CMS Development Capabilities',
	subtitle:
		'Each platform links to a dedicated plan so stakeholders can explore what matters most.',
	primaryCta: { label: 'Get a Platform Assessment', href: '/contact' },
	primaryCtaNote: 'No commitment required. Free 30-minute assessment.',
	columns: 2,
	ctaLabels: {
		'/services/cms/wordpress': 'Explore WordPress',
		'/services/cms/drupal': 'Explore Drupal',
		'/services/cms/content-hub': 'Explore Content Hub',
		'/services/cms/wix-studio': 'Explore Wix Studio',
	},
	iconKeys: {
		'/services/cms/wordpress': 'FileText',
		'/services/cms/drupal': 'ShieldCheck',
		'/services/cms/content-hub': 'Cloud',
		'/services/cms/wix-studio': 'Sparkles',
	},
};

export const APP_DEV_GATEWAY_CONFIG: GatewaySectionConfig = {
	title: 'App Development Capabilities',
	subtitle:
		'Each platform links to a dedicated plan so stakeholders can explore what matters most.',
	primaryCta: { label: 'Start Your App Blueprint', href: '/contact' },
	primaryCtaNote: 'No commitment required. Free 30-minute strategy session.',
	columns: 3,
	ctaLabels: {
		'/services/app-dev/ios': 'Explore iOS',
		'/services/app-dev/android': 'Explore Android',
		'/services/app-dev/cross-platform': 'Explore Cross-Platform',
	},
	iconKeys: {
		'/services/app-dev/ios': 'Smartphone',
		'/services/app-dev/android': 'Tablet',
		'/services/app-dev/cross-platform': 'Code2',
	},
};

export const PAY_PER_CALL_GATEWAY_CONFIG: GatewaySectionConfig = {
	title: 'Pay Per Call Capabilities',
	subtitle:
		'Select your call acquisition channel. Our gateway routes high-intent callers directly to your sales floor.',
	primaryCta: { label: 'Start Your Call Blueprint', href: '/contact' },
	primaryCtaNote: 'No commitment required. Free 30-minute consultation.',
	columns: 3,
	ctaLabels: {
		'/services/pay-per-call/consumer-initiated': 'Explore Search & Social',
		'/services/pay-per-call/live-transfer': 'View Qualification Process',
		'/services/pay-per-call/offline-media': 'See Media Channels',
	},
	iconKeys: {
		'/services/pay-per-call/consumer-initiated': 'Phone',
		'/services/pay-per-call/live-transfer': 'Headphones',
		'/services/pay-per-call/offline-media': 'Radio',
	},
};

export const PAY_PER_LEAD_GATEWAY_CONFIG: GatewaySectionConfig = {
	title: 'Pay Per Lead Capabilities',
	subtitle:
		'Select your lead acquisition model. Our gateway delivers qualified leads directly to your CRM or sales team.',
	primaryCta: { label: 'Start Your Lead Blueprint', href: '/contact' },
	primaryCtaNote: 'No commitment required. Free 30-minute consultation.',
	columns: 2,
	ctaLabels: {
		'/services/pay-per-lead/exclusive': 'Explore Exclusive Leads',
		'/services/pay-per-lead/shared': 'Explore Shared Leads',
		'/services/pay-per-lead/real-time': 'Explore Real-Time Delivery',
	},
	iconKeys: {
		'/services/pay-per-lead/exclusive': 'Users',
		'/services/pay-per-lead/shared': 'UserCheck',
		'/services/pay-per-lead/real-time': 'Zap',
	},
};
