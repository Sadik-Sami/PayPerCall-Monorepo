import {
	CaseStudyStrip,
	FAQSection,
	ServiceHero,
	ConsultationCTA,
	ProcessSteps,
	ServiceCapabilitiesGateway,
	TrustBanner,
	ResultsShowcase,
	TestimonialsSection,
	IntegrationLogos,
} from '@/components/services';
import heroImage1 from '@/public/images/slider/slider-1.jpg';
import { ShieldCheck, Lock, Cloud } from 'lucide-react';
import type { Metadata } from 'next';
import type { ProcessStep, CaseStudyItem, FaqItem } from '@/types/services';
import {
	CMS_SERVICE_NAV,
	CMS_GATEWAY_CONFIG,
	buildGatewayCards,
} from '@/components/services/nav-items';

export const metadata: Metadata = {
	title: 'CMS Development Services | WordPress, Drupal, Headless CMS | PayPerCall',
	description:
		'Expert CMS development: WordPress, Drupal, and headless solutions built for security, performance, and editorial efficiency. Free platform assessment.',
	alternates: { canonical: '/services/cms' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'CMS Development Services | WordPress, Drupal, Headless CMS',
		description:
			'WordPress, Drupal, and headless CMS development for secure, performant content systems.',
		url: '/services/cms',
		images: [
			{
				url: '/images/slider/slider-1.jpg',
				width: 1200,
				height: 630,
				alt: 'CMS development services',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'CMS Development Services | WordPress, Drupal, Headless CMS',
		description: 'WordPress, Drupal, and headless CMS solutions built for editorial teams.',
		images: ['/images/slider/slider-1.jpg'],
	},
	keywords: [
		'cms development',
		'wordpress development',
		'drupal development',
		'headless cms',
		'contentful development',
		'cms migration',
		'content management system',
	],
};

export const revalidate = 3600;

const HERO_CONTENT = {
	pill: 'CMS Development',
	eyebrow: 'Services',
	title: 'Content systems built for editorial teams and growth',
	subtitle:
		'We deliver WordPress, Drupal, and headless CMS solutions that stay fast, secure, and easy to update. Start with a free platform assessment.',
	features: ['Multi-platform expertise', 'Security-first', 'Editor-friendly'],
	stat: { value: '30 minutes', label: 'Platform assessment · free consultation' },
	primaryCta: { label: 'Book Platform Assessment', href: '/contact' },
	secondaryCta: { label: 'View CMS Case Studies', href: '/portfolio' },
	footnote: 'No commitment required—we assess fit before recommending a platform.',
	media: {
		src: heroImage1,
		alt: 'CMS development dashboard visualization',
		caption: 'Every assessment includes platform recommendations and migration estimates.',
	},
	variant: 'asymmetric' as const,
};

const PROCESS_STEPS: ProcessStep[] = [
	{
		title: 'Platform Assessment & Selection',
		description:
			'Evaluate content workflows, team capabilities, and technical requirements to recommend the right CMS platform.',
	},
	{
		title: 'Architecture & Content Modeling',
		description:
			'Design content types, taxonomies, user roles, and editorial workflows before development starts.',
	},
	{
		title: 'Build & Integrate',
		description:
			'Implement custom themes, plugins, or headless APIs with security hardening and performance optimization.',
	},
	{
		title: 'Training & Handoff',
		description:
			'Provide editorial training, documentation, and optional managed support for ongoing content operations.',
	},
];

const CMS_INTEGRATIONS = [
	{ name: 'WordPress', category: 'Traditional CMS' },
	{ name: 'Drupal', category: 'Traditional CMS' },
	{ name: 'Contentful', category: 'Headless CMS' },
	{ name: 'Sanity', category: 'Headless CMS' },
	{ name: 'Strapi', category: 'Headless CMS' },
	{ name: 'Wix Studio', category: 'Managed Platform' },
	{ name: 'ACF', category: 'WordPress Plugins' },
	{ name: 'Yoast SEO', category: 'WordPress Plugins' },
	{ name: 'WooCommerce', category: 'WordPress Plugins' },
	{ name: 'Elementor', category: 'WordPress Plugins' },
	{ name: 'Acquia', category: 'Drupal Hosting' },
	{ name: 'Pantheon', category: 'Drupal Hosting' },
];

const CASE_STUDIES: CaseStudyItem[] = [
	{
		client: 'Midwest Health Network',
		industry: 'Healthcare',
		problem: 'Legacy WordPress site had security vulnerabilities and could not handle multi-site needs.',
		solution:
			'Migrated to WordPress Multisite with custom security hardening, HIPAA-aligned controls, and centralized content management.',
		outcome:
			'0 security incidents in 18 months and 60% reduction in content publishing time across 12 regional sites.',
		icon: <ShieldCheck className='size-5' />,
		metrics: [
			{ label: 'Security incidents', value: '0' },
			{ label: 'Publishing time', value: '-60%' },
		],
	},
	{
		client: 'Summit Financial Services',
		industry: 'Financial Services',
		problem:
			'Needed enterprise-grade Drupal platform for complex compliance workflows and multi-language support.',
		solution:
			'Built custom Drupal 10 platform with role-based publishing, audit logging, and GDPR compliance features.',
		outcome:
			'Passed SOC 2 audit on first attempt and reduced compliance review cycles from 14 days to 3 days.',
		icon: <Lock className='size-5' />,
		metrics: [
			{ label: 'Review cycle', value: '-79%' },
			{ label: 'SOC 2', value: 'Passed' },
		],
	},
	{
		client: 'Zenith Retail Group',
		industry: 'Retail',
		problem: 'Wanted headless CMS to power web, mobile app, and in-store kiosks from single content source.',
		solution:
			'Implemented Contentful headless CMS with GraphQL APIs feeding Next.js web, React Native app, and kiosk interfaces.',
		outcome: 'Content updates propagate to all channels in real-time, reducing publishing overhead by 70%.',
		icon: <Cloud className='size-5' />,
		metrics: [
			{ label: 'Channels', value: '3+' },
			{ label: 'Update time', value: 'Real-time' },
		],
	},
];

const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'How do I choose between WordPress, Drupal, and headless CMS?',
		answer:
			'We assess your content complexity, team technical skills, channel requirements, and budget. WordPress suits most marketing sites, Drupal handles enterprise multi-site needs, and headless CMS powers omnichannel experiences.',
	},
	{
		question: 'Can you migrate our existing content without losing SEO rankings?',
		answer:
			'Yes. We preserve all metadata, implement 301 redirects, migrate structured data, and run parallel SEO monitoring to catch any drops immediately.',
	},
	{
		question: 'What about security and compliance? Do you handle HIPAA, GDPR?',
		answer:
			'Security is built into every CMS build. We align controls to SOC 2, HIPAA, and GDPR requirements with encrypted fields, audit logging, and role-based access.',
	},
	{
		question: 'Do you provide training for our content editors?',
		answer:
			'Every engagement includes editorial training, video walkthroughs, and written documentation. We can also provide ongoing managed support.',
	},
	{
		question: 'Is the platform assessment really free?',
		answer:
			'Yes. The 30-minute assessment is complimentary and includes a written platform recommendation with budget ranges.',
	},
];

export default function CMSOverviewPage() {
	return (
		<main className='space-y-12'>
			<ServiceHero className='max-w-7xl mx-auto' {...HERO_CONTENT} />
			<TrustBanner />
			<ResultsShowcase className='max-w-7xl mx-auto' variant='split' />
			<ServiceCapabilitiesGateway
				title={CMS_GATEWAY_CONFIG.title}
				subtitle={CMS_GATEWAY_CONFIG.subtitle}
				cards={buildGatewayCards(
					CMS_SERVICE_NAV,
					'/services/cms',
					CMS_GATEWAY_CONFIG.ctaLabels,
					CMS_GATEWAY_CONFIG.iconKeys
				)}
				primaryCta={CMS_GATEWAY_CONFIG.primaryCta}
				primaryCtaNote={CMS_GATEWAY_CONFIG.primaryCtaNote}
				columns={CMS_GATEWAY_CONFIG.columns}
				className='max-w-7xl mx-auto'
			/>
			<ProcessSteps
				className='max-w-7xl mx-auto'
				steps={PROCESS_STEPS}
				title='How we deliver CMS projects'
				description='Every engagement follows a predictable arc so stakeholders always know what is happening next.'
				variant='cards'
			/>
			<CaseStudyStrip
				items={CASE_STUDIES}
				title='CMS transformations grounded in measurable outcomes'
				description='Every case study highlights the security, efficiency, and editorial improvements that matter.'
				className='max-w-7xl mx-auto'
			/>
			<TestimonialsSection className='max-w-7xl mx-auto' variant='featured' />
			<IntegrationLogos
				className='max-w-7xl mx-auto'
				title='CMS platforms and integrations we work with'
				description='From WordPress to headless CMS, we connect your content to the systems your teams rely on.'
				integrations={CMS_INTEGRATIONS}
				variant='grid'
				ctaLabel='Discuss platform requirements'
				ctaHref='/contact'
			/>
			<FAQSection className='max-w-7xl mx-auto' items={FAQ_ITEMS} />
			<div className='section-container pb-16 max-w-7xl mx-auto'>
				<ConsultationCTA
					category='cms'
					title='Plan your content platform with a 30-minute assessment'
					bullets={[
						'Platform recommendation based on your content needs.',
						'Migration estimates and content workflow review.',
						'Budget ranges and engagement options—no commitment required.',
					]}
				/>
			</div>
		</main>
	);
}
