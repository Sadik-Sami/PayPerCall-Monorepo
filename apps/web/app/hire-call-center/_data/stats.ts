import { Phone, Users, Clock, ThumbsUp, Building2, Headphones } from 'lucide-react';
import { createElement } from 'react';
import type { StatItem } from '@workspace/ui/components/sections/stats-grid';

export const impactStats: StatItem[] = [
	{
		label: 'Calls Handled Monthly',
		value: 850,
		suffix: 'K+',
		description: 'Inbound and outbound calls processed',
		icon: createElement(Phone, { className: 'size-6 text-primary' }),
	},
	{
		label: 'Active Clients',
		value: 200,
		suffix: '+',
		description: 'Businesses trust us with their calls',
		icon: createElement(Building2, { className: 'size-6 text-primary' }),
	},
	{
		label: 'Client Retention',
		value: 96,
		suffix: '%',
		description: 'Year-over-year client retention rate',
		icon: createElement(ThumbsUp, { className: 'size-6 text-primary' }),
	},
	{
		label: 'Trained Agents',
		value: 500,
		suffix: '+',
		description: 'US and offshore team members',
		icon: createElement(Headphones, { className: 'size-6 text-primary' }),
	},
];

export const trustIndicators = [
	'TCPA Compliant',
	'HIPAA Certified',
	'SOC 2 Type II',
	'PCI DSS Compliant',
	'24/7/365 Operations',
];
