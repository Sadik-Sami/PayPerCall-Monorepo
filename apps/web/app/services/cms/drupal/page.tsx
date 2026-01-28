import {
	CaseStudyStrip,
	FAQSection,
	ConsultationCTA,
	PricingTable,
	ServiceHero,
	ClientSuccessBreakdown,
	TimelineSteps,
	DeliverablesSection,
	IntegrationLogos,
	ServiceComparison,
} from '@/components/services';
import type { Metadata } from 'next';
import type { FaqItem, CaseStudyItem, PricingPlan } from '@/types/services';
import type { SuccessOutcome } from '@/components/services/client-success-breakdown';
import heroImage3 from '@/public/images/slider/slider-3.jpg';
import { Shield, Building2, Lock } from 'lucide-react';

export const metadata: Metadata = {
	title: 'Drupal Development Services | Enterprise CMS & Multi-Site | PayPerCall',
	description:
		'Enterprise Drupal development for complex content workflows, multi-site management, and high-security requirements. HIPAA and SOC 2 aligned.',
	alternates: { canonical: '/services/cms/drupal' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Drupal Development Services | Enterprise CMS & Multi-Site',
		description:
			'Enterprise Drupal for complex content, multi-site architecture, and compliance (HIPAA, SOC 2, GDPR).',
		url: '/services/cms/drupal',
		images: [
			{
				url: '/images/slider/slider-3.jpg',
				width: 1200,
				height: 630,
				alt: 'Drupal enterprise development',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Drupal Development Services',
		description: 'Enterprise Drupal for security, compliance, and multi-site management.',
		images: ['/images/slider/slider-3.jpg'],
	},
	keywords: [
		'drupal development',
		'enterprise drupal',
		'drupal multisite',
		'drupal security',
		'drupal 10',
		'headless drupal',
		'drupal compliance',
	],
};

export const revalidate = 3600;

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	serviceType: 'Drupal Development',
	provider: {
		'@type': 'Organization',
		name: 'PayPerCall',
		url: 'https://paypercall.com',
	},
	description:
		'Enterprise Drupal development for complex content workflows, multi-site architecture, and high-security requirements including HIPAA and SOC 2 compliance.',
	areaServed: { '@type': 'Country', name: 'United States' },
	offers: {
		'@type': 'Offer',
		availability: 'https://schema.org/InStock',
		priceSpecification: {
			'@type': 'PriceSpecification',
			priceCurrency: 'USD',
			price: '35000',
			description: 'Starting from $35k',
		},
	},
};

const HERO_CONTENT = {
	pill: 'Drupal Development',
	eyebrow: 'CMS Services',
	title: 'Enterprise Drupal platforms for security and scale',
	subtitle:
		'We build Drupal solutions for organizations that need advanced security, complex content workflows, and multi-site management. Every build includes compliance reviews and performance hardening.',
	features: ['Drupal 10+', 'Multi-site architecture', 'Security-first'],
	stat: { value: '100%', label: 'SOC 2 / HIPAA audit pass rate' },
	primaryCta: { label: 'Discuss Drupal Project', href: '/contact' },
	secondaryCta: { label: 'Download Drupal Guide', href: '#consultation' },
	footnote: 'Complimentary architecture review for qualified enterprise projects.',
	media: {
		src: heroImage3,
		alt: 'Enterprise Drupal development',
		caption: 'Every Drupal build includes security review and compliance alignment.',
	},
};

const SUCCESS_OUTCOMES: SuccessOutcome[] = [
	{
		icon: 'gitBranch' as const,
		metric: '12+',
		label: 'Average sites per Drupal multisite',
		description: 'Regional sites managed from single Drupal instance',
		context: 'Centralized governance with localized content control.',
	},
	{
		icon: 'clock' as const,
		metric: '8 weeks',
		label: 'Enterprise Drupal implementation time',
		description: 'From requirements to production launch',
		context: 'Includes security review, content migration, and training.',
	},
	{
		icon: 'database' as const,
		metric: '99.97%',
		label: 'Average uptime across Drupal sites',
		description: 'High availability through proper hosting and architecture',
		context: 'Measured across Acquia and Pantheon deployments.',
	},
];

const TIMELINE_STEPS = [
	{
		number: '01',
		title: 'Requirements & Architecture',
		description: 'Map content models, user roles, workflows, and compliance requirements.',
		details: [
			'Content type definitions',
			'Role-based access control design',
			'Multi-site topology planning',
			'Compliance gap analysis',
		],
	},
	{
		number: '02',
		title: 'Development & Security',
		description: 'Build custom modules, themes, and implement security controls.',
		details: [
			'Custom module development',
			'Theme implementation',
			'Security hardening checklist',
			'API integrations',
		],
	},
	{
		number: '03',
		title: 'Testing & Compliance',
		description: 'Security testing, compliance validation, and user acceptance testing.',
		details: [
			'Security penetration testing',
			'HIPAA/SOC 2 compliance review',
			'Performance load testing',
			'UAT with stakeholders',
		],
	},
	{
		number: '04',
		title: 'Launch & Support',
		description: 'Production deployment, monitoring, and knowledge transfer.',
		details: [
			'Staged rollout to production',
			'Monitoring and alerting setup',
			'Admin and editor training',
			'Documentation handoff',
		],
	},
];

const DELIVERABLE_STANDARDS = [
	'Drupal core and contributed modules vetted for security and kept up to date.',
	'Security configurations aligned to OWASP, CIS benchmarks, and NIST frameworks.',
	'Multi-site architecture with shared codebase and separate databases per site.',
	'Performance monitoring with SLAs defined for uptime and response time.',
];

const DELIVERABLES = [
	{
		title: 'Custom Drupal Architecture',
		description: 'Tailored Drupal setup for your content model and organizational structure.',
		bulletPoints: ['Custom content types', 'Taxonomy design', 'View configurations', 'Workflow states'],
	},
	{
		title: 'Security & Compliance Package',
		description: 'Enterprise-grade security controls and compliance documentation.',
		bulletPoints: [
			'Security hardening checklist',
			'Audit logging',
			'RBAC implementation',
			'Compliance evidence',
		],
	},
	{
		title: 'Custom Modules & Integrations',
		description: 'Bespoke Drupal modules and third-party system integrations.',
		bulletPoints: ['Custom module code', 'API connectors', 'Data sync workflows', 'Migration scripts'],
	},
	{
		title: 'Admin & Editorial Training',
		description: 'Comprehensive training for administrators and content editors.',
		bulletPoints: [
			'Admin training sessions',
			'Editor documentation',
			'Video walkthroughs',
			'Runbook for operations',
		],
	},
];

const INTEGRATIONS = [
	{ name: 'Acquia Cloud', category: 'Hosting' },
	{ name: 'Pantheon', category: 'Hosting' },
	{ name: 'Drupal Commerce', category: 'Ecommerce' },
	{ name: 'Webform', category: 'Forms' },
	{ name: 'Paragraphs', category: 'Content Building' },
	{ name: 'Pathauto', category: 'SEO' },
	{ name: 'Metatag', category: 'SEO' },
	{ name: 'JSON:API', category: 'Headless' },
	{ name: 'GraphQL', category: 'Headless' },
	{ name: 'LDAP', category: 'Authentication' },
	{ name: 'SAML', category: 'Authentication' },
	{ name: 'New Relic', category: 'Monitoring' },
];

const CASE_STUDIES: CaseStudyItem[] = [
	{
		client: 'State Healthcare Portal',
		industry: 'Government',
		problem: 'Needed HIPAA-compliant portal for 15 regional health departments with unified branding.',
		solution:
			'Deployed Drupal 10 Multisite with role-based publishing, encrypted patient data handling, and audit logging.',
		outcome: 'Passed HIPAA audit on first attempt and consolidated 15 separate sites into one platform.',
		icon: <Shield className='h-5 w-5' />,
		metrics: [
			{ label: 'Sites unified', value: '15' },
			{ label: 'HIPAA audit', value: 'Passed' },
		],
	},
	{
		client: 'Global Financial Corp',
		industry: 'Financial Services',
		problem: 'Required multi-language Drupal platform with SOC 2 compliance and complex approval workflows.',
		solution:
			'Built Drupal platform with 12-language support, multi-step approval workflows, and SOC 2-aligned security controls.',
		outcome: 'Reduced content approval cycle from 21 days to 5 days and passed SOC 2 Type II audit.',
		icon: <Building2 className='h-5 w-5' />,
		metrics: [
			{ label: 'Approval time', value: '-76%' },
			{ label: 'Languages', value: '12' },
		],
	},
	{
		client: 'University System',
		industry: 'Education',
		problem: 'Managing 25 university websites separately was inefficient and led to brand inconsistencies.',
		solution:
			'Consolidated to Drupal Multisite with shared component library, centralized user management, and local content control.',
		outcome: 'Unified 25 sites in 12 weeks with 80% reduction in administrative overhead.',
		icon: <Lock className='h-5 w-5' />,
		metrics: [
			{ label: 'Sites', value: '25' },
			{ label: 'Admin overhead', value: '-80%' },
		],
	},
];

const COMPARISON_FEATURES = [
	{ name: 'Drupal 10 Installation', included: [true, true, true] },
	{ name: 'Custom Theme', included: [true, true, true] },
	{ name: 'Security Hardening', included: [true, true, true] },
	{ name: 'Multi-Site Architecture', included: [false, true, true] },
	{ name: 'Role-Based Workflows', included: [false, true, true] },
	{ name: 'HIPAA/SOC 2 Support', included: [false, true, true] },
	{ name: 'Headless API (JSON:API/GraphQL)', included: [false, false, true] },
	{ name: 'Custom Frontend (Next.js)', included: [false, false, true] },
	{ name: 'Ongoing Support', included: ['Optional', 'Included (6 mo)', 'Included (12 mo)'] },
];

const PRICING_PLANS: PricingPlan[] = [
	{
		name: 'Single Site',
		description: 'Drupal site for departmental or single-purpose use.',
		priceLabel: 'From $35k',
		features: [
			'Drupal 10 installation',
			'Custom theme + content types',
			'Security hardening',
			'Editorial training',
		],
	},
	{
		name: 'Multi-Site Platform',
		description: 'Centralized Drupal for multiple sites or brands.',
		priceLabel: 'From $75k',
		features: [
			'Multi-site architecture',
			'Shared content repository',
			'Role-based publishing workflows',
			'HIPAA/GDPR compliance support',
			'Managed hosting setup',
		],
		isRecommended: true,
		badge: 'Enterprise standard',
	},
	{
		name: 'Headless Drupal',
		description: 'Drupal as API-driven content backend.',
		priceLabel: 'From $85k',
		features: [
			'Headless architecture (JSON:API or GraphQL)',
			'Decoupled frontend (Next.js)',
			'API documentation',
			'Developer onboarding',
		],
	},
];

const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'Why choose Drupal over WordPress for enterprise content?',
		answer:
			'Drupal excels at complex content models, multi-site management, granular permissions, and enterprise security. If you need role-based workflows, multi-language support, or manage dozens of sites from one platform, Drupal is the better choice.',
	},
	{
		question: 'How do you handle HIPAA and SOC 2 compliance with Drupal?',
		answer:
			'We implement security controls aligned to HIPAA and SOC 2 requirements: encrypted data at rest and in transit, audit logging, role-based access, session timeouts, and regular security scanning. We provide compliance documentation for your audits.',
	},
	{
		question: 'What is Drupal Multisite and when should we use it?',
		answer:
			'Drupal Multisite lets you manage multiple websites from one codebase. Ideal for universities, franchises, multi-brand organizations, or government agencies. Each site has its own database and content, but shares modules and themes for efficiency.',
	},
	{
		question: 'Can Drupal integrate with our existing systems?',
		answer:
			'Yes. Drupal has robust API capabilities. We integrate with CRMs (Salesforce, HubSpot), ERPs, LDAP/SAML authentication, payment gateways, marketing automation, and custom internal systems via REST or GraphQL APIs.',
	},
	{
		question: 'How do you ensure Drupal sites stay secure over time?',
		answer:
			'We implement automatic security updates for Drupal core, vet all contributed modules for security advisories, configure Web Application Firewalls, enable audit logging, and can provide ongoing managed security monitoring.',
	},
	{
		question: 'What is the difference between Drupal 10 and headless Drupal?',
		answer:
			'Drupal 10 includes both the content management backend and the theming/frontend layer. Headless Drupal uses Drupal only as a content API (JSON:API or GraphQL) with a separate frontend like Next.js. Headless provides more flexibility for omnichannel delivery.',
	},
];

export default function DrupalPage() {
	return (
		<main className='space-y-0'>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<ClientSuccessBreakdown
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Enterprise Drupal outcomes backed by data'
				subtitle='Metrics that matter for large-scale content platforms.'
				outcomes={SUCCESS_OUTCOMES}
			/>
			<TimelineSteps
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Enterprise Drupal implementation timeline'
				subtitle='Clear milestones from requirements to production launch.'
				steps={TIMELINE_STEPS}
				orientation='horizontal'
			/>
			<DeliverablesSection
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Deliverables for enterprise Drupal projects'
				subtitle='Every Drupal engagement includes security, compliance documentation, and training.'
				standards={DELIVERABLE_STANDARDS}
				deliverables={DELIVERABLES}
			/>
			<ServiceComparison
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Compare Drupal engagement tiers'
				subtitle='Choose the tier that matches your content complexity and organizational scale.'
				tiers={[
					{ name: 'Single Site', description: 'Departmental use' },
					{ name: 'Multi-Site', description: 'Enterprise standard' },
					{ name: 'Headless Drupal', description: 'API-first' },
				]}
				features={COMPARISON_FEATURES}
			/>
			<IntegrationLogos
				className='max-w-7xl mx-auto py-12 md:py-16'
				title='Drupal integrations and hosting platforms'
				description='From Acquia to SAML authentication, we connect Drupal to enterprise systems.'
				integrations={INTEGRATIONS}
				variant='grid'
				ctaLabel='Discuss integration requirements'
				ctaHref='/contact'
			/>
			<CaseStudyStrip
				className='max-w-7xl mx-auto py-12 md:py-16'
				items={CASE_STUDIES}
				title='Enterprise Drupal engagements'
				description='Every Drupal build delivers security, compliance, and operational efficiency for large organizations.'
			/>
			<div id='pricing' className='scroll-mt-24'>
				<PricingTable
					className='max-w-7xl mx-auto py-12 md:py-16'
					title='Drupal engagement models'
					description='Transparent pricing for enterprise Drupal projects. Every engagement starts with a free architecture review.'
					plans={PRICING_PLANS}
					billingNote='Budgets include custom development, security hardening, compliance documentation, and training. Hosting (Acquia/Pantheon) billed separately.'
				/>
			</div>
			<FAQSection className='max-w-7xl mx-auto py-12 md:py-16' items={FAQ_ITEMS} />
			<div id='consultation' className='section-container py-12 md:py-16'>
				<ConsultationCTA
					className='w-full'
					title='Start your Drupal project with a free architecture review'
					bullets={[
						'Review content model, workflows, and compliance requirements.',
						'Multi-site architecture recommendations if applicable.',
						'Budget estimate and implementation timeline.',
					]}
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
