import type { NavItem } from './types';

export const navigationData: NavItem[] = [
	{
		id: 'web-dev',
		label: 'Web Development',
		columns: [
			{
				title: 'Full-Stack Solutions',
				links: [
					{ label: 'MERN Stack', href: '/services/mern', description: 'MongoDB, Express, React, Node.js' },
					{ label: 'LAMP Stack', href: '/services/lamp', description: 'Linux, Apache, MySQL, PHP' },
					{ label: 'JAMstack', href: '/services/jamstack', description: 'JavaScript, APIs, Markup' },
					{ label: 'Serverless Architecture', href: '/services/serverless', description: 'Scalable cloud solutions' },
				],
			},
			{
				title: 'Frontend Development',
				links: [
					{ label: 'React Development', href: '/services/react' },
					{ label: 'Next.js Applications', href: '/services/nextjs' },
					{ label: 'Vue.js Development', href: '/services/vue' },
					{ label: 'Angular Solutions', href: '/services/angular' },
					{ label: 'UI/UX Design', href: '/services/uiux' },
					{ label: 'Responsive Design', href: '/services/responsive' },
					{ label: 'Progressive Web Apps', href: '/services/pwa' },
				],
			},
			{
				title: 'Backend Development',
				links: [
					{ label: 'Node.js', href: '/services/nodejs' },
					{ label: 'Python/Django', href: '/services/django' },
					{ label: 'RESTful APIs', href: '/services/api' },
					{ label: 'GraphQL', href: '/services/graphql' },
					{ label: 'Database Design', href: '/services/database' },
				],
			},
			{
				title: 'Featured',
				links: [
					{ label: 'Enterprise Solutions', href: '/enterprise' },
					{ label: 'Microservices', href: '/services/microservices' },
					{ label: 'Performance Optimization', href: '/services/performance' },
				],
			},
		],
	},
	{
		id: 'devops',
		label: 'DevOps',
		columns: [
			{
				title: 'Cloud Infrastructure',
				links: [
					{ label: 'AWS Solutions', href: '/devops/aws', description: 'EC2, S3, Lambda, RDS' },
					{ label: 'Azure Cloud', href: '/devops/azure', description: 'Virtual Machines, Storage' },
					{ label: 'Google Cloud Platform', href: '/devops/gcp', description: 'Compute Engine, Cloud Storage' },
					{ label: 'Docker Containerization', href: '/devops/docker', description: 'Container orchestration' },
				],
			},
			{
				title: 'CI/CD Pipelines',
				links: [
					{ label: 'Jenkins Automation', href: '/devops/jenkins' },
					{ label: 'GitHub Actions', href: '/devops/github-actions' },
					{ label: 'GitLab CI/CD', href: '/devops/gitlab' },
					{ label: 'Deployment Automation', href: '/devops/automation' },
					{ label: 'Infrastructure as Code', href: '/devops/iac' },
					{ label: 'Monitoring & Logging', href: '/devops/monitoring' },
				],
			},
			{
				title: 'Security & Compliance',
				links: [
					{ label: 'Security Audits', href: '/devops/security' },
					{ label: 'Compliance Management', href: '/devops/compliance' },
					{ label: 'Penetration Testing', href: '/devops/pentesting' },
				],
			},
		],
	},
	{
		id: 'ppc',
		label: 'Pay-Per-Call',
		columns: [
			{
				title: 'Core Services',
				links: [
					{ label: 'Call Tracking Systems', href: '/ppc/tracking', description: 'Real-time analytics' },
					{ label: 'Lead Generation', href: '/ppc/leads', description: 'Quality lead acquisition' },
					{ label: 'Campaign Management', href: '/ppc/campaigns', description: 'End-to-end optimization' },
					{ label: 'Analytics & Reporting', href: '/ppc/analytics', description: 'Detailed insights' },
					{ label: 'ROI Optimization', href: '/ppc/roi', description: 'Maximize returns' },
				],
			},
			{
				title: 'Industry Solutions',
				links: [
					{ label: 'Legal Services', href: '/ppc/legal' },
					{ label: 'Healthcare', href: '/ppc/healthcare' },
					{ label: 'Financial Services', href: '/ppc/finance' },
					{ label: 'Real Estate', href: '/ppc/realestate' },
					{ label: 'Home Services', href: '/ppc/home' },
					{ label: 'Insurance', href: '/ppc/insurance' },
				],
			},
			{
				title: 'Technology',
				links: [
					{ label: 'IVR Integration', href: '/ppc/ivr' },
					{ label: 'Call Recording', href: '/ppc/recording' },
					{ label: 'Quality Assurance', href: '/ppc/qa' },
				],
			},
		],
	},
	{
		id: 'cms',
		label: 'CMS & Platforms',
		columns: [
			{
				title: 'Enterprise CMS',
				links: [
					{ label: 'Drupal', href: '/cms/drupal', description: 'Powerful enterprise CMS' },
					{ label: 'WordPress', href: '/cms/wordpress', description: 'Popular content management' },
					{ label: 'Contentful', href: '/cms/contentful', description: 'Headless CMS platform' },
					{ label: 'Strapi', href: '/cms/strapi', description: 'Open-source headless CMS' },
				],
			},
			{
				title: 'E-Commerce Platforms',
				links: [
					{ label: 'Shopify', href: '/cms/shopify' },
					{ label: 'WooCommerce', href: '/cms/woocommerce' },
					{ label: 'Magento', href: '/cms/magento' },
					{ label: 'BigCommerce', href: '/cms/bigcommerce' },
					{ label: 'Custom Solutions', href: '/cms/custom' },
					{ label: 'Payment Integration', href: '/cms/payments' },
				],
			},
			{
				title: 'Specialized Platforms',
				links: [
					{ label: 'Rumba', href: '/cms/rumba' },
					{ label: 'Sanity', href: '/cms/sanity' },
					{ label: 'Prismic', href: '/cms/prismic' },
					{ label: 'Ghost', href: '/cms/ghost' },
				],
			},
		],
	},
	// {
	// 	id: 'home',
	// 	label: 'Home',
	// 	href: '/',
	// },
	// {
	// 	id: 'about',
	// 	label: 'About Us',
	// 	href: '/about',
	// },
	// {
	// 	id: 'faq',
	// 	label: 'FAQs',
	// 	href: '/faq',
	// },
	// {
	// 	id: 'contact',
	// 	label: 'Contact Us',
	// 	href: '/contact',
	// },
];
