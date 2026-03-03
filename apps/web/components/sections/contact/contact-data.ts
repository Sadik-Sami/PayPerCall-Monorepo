import { navigationData } from '@/components/shared/navbar/data';

type ServiceSubOption = {
	label: string;
	value: string;
	href: string;
};

export type ContactServiceOption = {
	label: string;
	value: string;
	href?: string;
	subServices: ServiceSubOption[];
};

function toSlug(value: string) {
	return value
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function valueFromHrefOrLabel(label: string, href?: string) {
	if (!href) return toSlug(label);
	const normalized = href.replace(/\/+$/, '');
	const fromServices = normalized.match(/^\/services\/(.+)$/);
	return fromServices?.[1] ?? toSlug(label);
}

const servicesNode = navigationData.find((item) => item.id === 'services');
const serviceColumns = servicesNode?.columns ?? [];

export const CONTACT_SERVICE_OPTIONS: ContactServiceOption[] = serviceColumns
	.filter((column) => column.title !== 'Other Services' && (column.links?.length ?? 0) > 0)
	.map((column) => ({
		label: column.title,
		value: valueFromHrefOrLabel(column.title, column.href),
		href: column.href,
		subServices:
			column.links?.map((link) => ({
				label: link.label,
				value: valueFromHrefOrLabel(link.label, link.href),
				href: link.href,
			})) ?? [],
	}));

export const CONTACT_TRUST_POINTS = [
	'Replies within 24 business hours',
	'No commitment required for the first strategy call',
	'Your business details stay private and confidential',
];

export const CONTACT_HERO_FEATURES = [
	{
		title: 'Revenue-Focused Qualification',
		description:
			'We capture enough detail upfront to route your request to the right strategist on day one.',
	},
	{
		title: 'Service-Specific Discovery',
		description:
			'Choose the exact service track you need so your consultation starts with relevant insights.',
	},
	{
		title: 'Fast Next-Step Clarity',
		description:
			'Get a clear recommendation on fit, priorities, and a practical execution path after your call.',
	},
];

export const CONTACT_COMPANY_SIZE_OPTIONS = [
	{ value: '1-10', label: '1-10 employees' },
	{ value: '11-50', label: '11-50 employees' },
	{ value: '51-200', label: '51-200 employees' },
	{ value: '201-500', label: '201-500 employees' },
	{ value: '500-plus', label: '500+ employees' },
];

export const CONTACT_BUDGET_OPTIONS = [
	{ value: 'under-10k', label: 'Under $10k / month' },
	{ value: '10k-25k', label: '$10k-$25k / month' },
	{ value: '25k-50k', label: '$25k-$50k / month' },
	{ value: '50k-100k', label: '$50k-$100k / month' },
	{ value: '100k-plus', label: '$100k+ / month' },
	{ value: 'not-sure', label: "Not sure yet" },
];

export const CONTACT_MEETING_WINDOW_OPTIONS = [
	{ value: 'morning', label: 'Morning (8:00-12:00)' },
	{ value: 'midday', label: 'Midday (12:00-15:00)' },
	{ value: 'afternoon', label: 'Afternoon (15:00-18:00)' },
	{ value: 'evening', label: 'Evening (18:00+)' },
	{ value: 'flexible', label: 'Flexible schedule' },
];

export const CONTACT_PREFERRED_METHOD_OPTIONS = [
	{ value: 'email', label: 'Email' },
	{ value: 'phone', label: 'Phone call' },
	{ value: 'zoom', label: 'Zoom / Meet' },
	{ value: 'whatsapp', label: 'WhatsApp' },
];

export const CONTACT_REASSURANCE_ITEMS = [
	{
		question: 'Who should submit this contact form?',
		answer:
			'Decision-makers, marketing leaders, and growth teams looking for measurable acquisition outcomes should use this form. The more context you provide, the faster we can scope fit.',
	},
	{
		question: 'What happens after I submit?',
		answer:
			'You receive a confirmation and our team reviews your details. We follow up with a proposed meeting slot and a focused agenda tailored to your service interest.',
	},
	{
		question: 'Can you support multi-service engagement?',
		answer:
			'Yes. If you need Pay Per Call plus digital or development support, mention it in the project context and we will structure a unified strategy conversation.',
	},
];

export const CONTACT_WORLD_MAP_DOTS = [
	{
		start: { lat: 40.7128, lng: -74.006, label: 'New York' },
		end: { lat: 51.5072, lng: -0.1276, label: 'London' },
	},
	{
		start: { lat: 25.7617, lng: -80.1918, label: 'Miami' },
		end: { lat: 52.52, lng: 13.405, label: 'Berlin' },
	},
	{
		start: { lat: 34.0522, lng: -118.2437, label: 'Los Angeles' },
		end: { lat: 1.3521, lng: 103.8198, label: 'Singapore' },
	},
	{
		start: { lat: 41.8781, lng: -87.6298, label: 'Chicago' },
		end: { lat: 28.6139, lng: 77.209, label: 'New Delhi' },
	},
	{
		start: { lat: 29.7604, lng: -95.3698, label: 'Houston' },
		end: { lat: -33.8688, lng: 151.2093, label: 'Sydney' },
	},
	{
		start: { lat: 43.6532, lng: -79.3832, label: 'Toronto' },
		end: { lat: -23.5505, lng: -46.6333, label: 'Sao Paulo' },
	},
];
