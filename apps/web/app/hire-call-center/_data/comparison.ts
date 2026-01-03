import type { ComparisonRow } from '@workspace/ui/components/sections/comparison-table';

export const comparisonData: ComparisonRow[] = [
	{
		feature: 'US-Based Agent Options',
		us: true,
		others: false,
	},
	{
		feature: 'No Long-Term Contracts',
		us: true,
		others: false,
	},
	{
		feature: '24/7/365 Coverage',
		us: true,
		others: 'Limited hours',
	},
	{
		feature: 'Dedicated Account Manager',
		us: true,
		others: 'Shared support',
	},
	{
		feature: 'Real-Time Reporting Dashboard',
		us: true,
		others: 'Weekly reports only',
	},
	{
		feature: 'HIPAA & SOC 2 Compliant',
		us: true,
		others: 'Varies',
	},
	{
		feature: 'Custom CRM Integration',
		us: true,
		others: 'Extra fees',
	},
	{
		feature: 'Call Recording & QA',
		us: 'Included',
		others: 'Extra fees',
	},
	{
		feature: 'Flexible Pricing Models',
		us: 'Per-minute, per-call, or dedicated',
		others: 'Fixed contracts',
	},
	{
		feature: 'Agent Training on Your Brand',
		us: 'Comprehensive',
		others: 'Basic scripts',
	},
];

export const differentiators = [
	{
		title: '100% US-Based or Philippines Options',
		description: 'Choose the team composition that fits your brand and budget. Many clients use a hybrid approach.',
	},
	{
		title: 'TCPA, HIPAA, SOC2, PCI Compliant',
		description: 'Enterprise-grade security and compliance built into every aspect of our operation.',
	},
	{
		title: 'Real-Time Reporting Dashboard',
		description: 'Monitor performance, listen to calls, and track KPIs in real-time from any device.',
	},
	{
		title: 'Dedicated Account Manager',
		description: 'Your single point of contact for strategy, optimization, and day-to-day operations.',
	},
	{
		title: 'No Long-Term Contracts',
		description: 'Start with a pilot program and scale based on results. Cancel anytime with 30 days notice.',
	},
	{
		title: 'Seamless Integrations',
		description: 'Connect with Salesforce, HubSpot, Zendesk, and 50+ other platforms out of the box.',
	},
];
