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
