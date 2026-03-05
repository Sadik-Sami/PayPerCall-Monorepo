import type { NavItem } from './types';

export const navigationData: NavItem[] = [
	{
		id: 'home',
		label: 'Home',
		href: '/',
	},
	{
		id: 'services',
		label: 'Services',
		columns: [
			{
				title: 'Pay Per Call',
				href: '/services/pay-per-call',
				links: [
					{ label: 'Consumer-Initiated Calls', href: '/services/pay-per-call/consumer-initiated' },
					{ label: 'Live Transfer Calls', href: '/services/pay-per-call/live-transfer' },
					{ label: 'Offline Media-Driven Calls', href: '/services/pay-per-call/offline-media' },
				],
			},
			{
				title: 'Pay Per Lead',
				href: '/services/pay-per-lead',
				links: [
					{ label: 'Exclusive Leads', href: '/services/pay-per-lead/exclusive' },
					{ label: 'Shared Leads', href: '/services/pay-per-lead/shared' },
					{ label: 'Real-Time Lead Delivery', href: '/services/pay-per-lead/real-time' },
				],
			},
			{
				title: 'Digital Marketing',
				href: '/services/digital-marketing',
				links: [
					{ label: 'Search Engine Optimization', href: '/services/digital-marketing/seo' },
					{ label: 'Paid Advertising', href: '/services/digital-marketing/ppc' },
					{ label: 'Email Marketing', href: '/services/digital-marketing/email' },
					{ label: 'Social Media Marketing', href: '/services/digital-marketing/social' },
				],
			},
			{
				title: 'Web & App Development',
				links: [
					{ label: 'Web Development', href: '/services/web-dev' },
					{ label: 'CMS Development', href: '/services/cms' },
					{ label: 'App Development', href: '/services/app-dev' },
				],
			},
			{
				title: 'Other Services',
				links: [
					{ label: 'WordPress Development', href: '/services/cms/wordpress' },
					{ label: 'Graphics Design', href: '/services/graphics-design' },
					{ label: 'Video Editing', href: '/services/video-editing' },
					{ label: 'Podcast Marketing', href: '/services/podcast-marketing' },
				],
			},
		],
	},
	{
		id: 'hire',
		label: 'Hire a Call Center',
		href: '/hire-call-center',
	},
	{
		id: 'about',
		label: 'About',
		columns: [
			{
				title: 'Our Company',
				links: [
					{ label: 'Team Members', href: '/about/team' },
					{ label: 'Why Us', href: '/about/why-us' },
					{ label: 'Portfolio', href: '/about/portfolio' },
					{ label: 'Testimonials', href: '/about/testimonials' },
				],
			},
			{
				title: 'Resources',
				links: [
					{ label: 'FAQs', href: '/about/faq' },
					{ label: 'Article', href: '/about/articles' },
					{ label: 'Blog', href: '/blogs' },
				],
			},
		],
	},
	{
		id: 'signup',
		label: 'Advertiser Signup',
		href: '/advertiser-signup',
	},
	{
		id: 'contact',
		label: 'Contact Us',
		href: '/contact',
	},
];

export const footerData = {
	services: [
		{ label: 'Pay Per Call', href: '/services/pay-per-call/consumer-initiated' },
		{ label: 'Pay Per Lead', href: '/services/pay-per-lead/exclusive' },
		{ label: 'Digital Marketing', href: '/services/digital-marketing/seo' },
		{ label: 'Web Development', href: '/services/web-dev/full-stack' },
		{ label: 'App Development', href: '/services/app-dev/cross-platform' },
	],
	company: [
		{ label: 'About Us', href: '/about/why-us' },
		{ label: 'Team', href: '/about/team' },
		{ label: 'Careers', href: '/about/careers' }, // Explicitly included
		{ label: 'Contact', href: '/contact' },
		{ label: 'Hire Call Center', href: '/hire-call-center' },
	],
	industries: [
		{ label: 'Insurance', href: '/industries/insurance' },
		{ label: 'Legal', href: '/industries/legal' },
		{ label: 'Home Services', href: '/industries/home-services' },
		{ label: 'Healthcare', href: '/industries/healthcare' },
		{ label: 'Financial', href: '/industries/financial' },
	],
	legal: [
		{ label: 'Privacy Policy', href: '/privacy' },
		{ label: 'Terms of Service', href: '/terms' },
		{ label: 'Cookie Policy', href: '/cookies' },
		{ label: 'GDPR Compliance', href: '/gdpr' },
	],
};
