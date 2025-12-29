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
				links: [
					{ label: 'Consumer-Initiated Calls', href: '/services/pay-per-call/consumer-initiated' },
					{ label: 'Live Transfer Calls', href: '/services/pay-per-call/live-transfer' },
					{ label: 'Offline Media-Driven Calls', href: '/services/pay-per-call/offline-media' },
				],
			},
			{
				title: 'Pay Per Lead',
				links: [
					{ label: 'Exclusive Leads', href: '/services/pay-per-lead/exclusive' },
					{ label: 'Shared Leads', href: '/services/pay-per-lead/shared' },
					{ label: 'Real-Time Lead Delivery', href: '/services/pay-per-lead/real-time' },
				],
			},
			{
				title: 'Digital Marketing',
				links: [
					{ label: 'Search Engine Optimization', href: '/services/digital-marketing/seo' },
					{ label: 'Paid Advertising', href: '/services/digital-marketing/ppc' },
					{ label: 'Email Marketing', href: '/services/digital-marketing/email' },
					{ label: 'Social Media Marketing', href: '/services/digital-marketing/social' },
				],
			},
			{
				title: 'Web Development',
				links: [
					{ label: 'Full-Stack Development', href: '/services/web-dev/full-stack' },
					{ label: 'Business Websites', href: '/services/web-dev/business' },
					{ label: 'Ecommerce Websites', href: '/services/web-dev/ecommerce' },
					{ label: 'Landing Pages', href: '/services/web-dev/landing-page' },
				],
			},
			{
				title: 'CMS Development',
				links: [
					{ label: 'Wordpress', href: '/services/cms/wordpress' },
					{ label: 'Drupal', href: '/services/cms/drupal' },
					{ label: 'Content Hub', href: '/services/cms/content-hub' },
					{ label: 'Wix Studio', href: '/services/cms/wix-studio' },
				],
			},
			{
				title: 'App Development',
				links: [
					{ label: 'iOS App Development', href: '/services/app-dev/ios' },
					{ label: 'Android App Development', href: '/services/app-dev/android' },
					{ label: 'Cross-Platform Apps', href: '/services/app-dev/cross-platform' },
				],
			},
		],
	},
	{
		id: 'blog',
		label: 'Blog',
		columns: [
			{
				title: 'Latest Updates',
				links: [
					{ label: 'Insurance Insights', href: '/blog/insurance' },
					{ label: 'Legal Trends', href: '/blog/legal' },
					{ label: 'Home Services Market', href: '/blog/home-services' },
					{ label: 'Healthcare News', href: '/blog/healthcare' },
				],
			},
		],
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
				],
			},
			{
				title: 'Resources',
				links: [
					{ label: 'Testimonials', href: '/about/testimonials' },
					{ label: 'FAQs', href: '/about/faq' },
				],
			},
		],
	},
	{
		id: 'contact',
		label: 'Contact Us',
		href: '/contact',
	},
	{
		id: 'hire',
		label: 'Hire a Call Center',
		href: '/hire-call-center',
	},
	{
		id: 'industries',
		label: 'Industries',
		columns: [
			{
				title: 'Financial & Legal',
				links: [
					{ label: 'Insurance', href: '/industries/insurance' },
					{ label: 'Legal Services', href: '/industries/legal' },
					{ label: 'Financial Services', href: '/industries/financial' },
				],
			},
			{
				title: 'Service & Health',
				links: [
					{ label: 'Home Services', href: '/industries/home-services' },
					{ label: 'Healthcare & Medical', href: '/industries/healthcare' },
					{ label: 'Automotive', href: '/industries/automotive' },
				],
			},
			{
				title: 'Other Sectors',
				links: [
					{ label: 'Travel & Hospitality', href: '/industries/travel' },
					{ label: 'Telecom & Utilities', href: '/industries/telecom' },
					{ label: 'Education & Career', href: '/industries/education' },
					{ label: 'B2B Services', href: '/industries/b2b' },
				],
			},
		],
	},
	{
		id: 'signup',
		label: 'Advertiser Signup',
		href: '/advertiser-signup',
	},
];
