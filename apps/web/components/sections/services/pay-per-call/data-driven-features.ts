import type { CallGatewayAccent } from './constants';

export interface DataDrivenFeatureItem {
	title: string;
	description: string;
	iconKey: string;
	tone: CallGatewayAccent;
}

/**
 * Default feature list for Pay Per Call Data-Driven Capabilities.
 * Used across all subcategory pages (consumer-initiated, live-transfer, offline-media).
 */
export const DEFAULT_DATA_DRIVEN_FEATURES: DataDrivenFeatureItem[] = [
	{
		title: 'Instant IVR Filtering',
		description:
			'Automatically filter out invalid numbers and voicemail machines instantly before dialing.',
		iconKey: 'Filter',
		tone: 'mint',
	},
	{
		title: 'TCPA Scrubbed',
		description:
			'Ensure 100% full compliance with current TCPA regulations for every single outbound call.',
		iconKey: 'ShieldCheck',
		tone: 'sky',
	},
	{
		title: 'Real-time Analytics',
		description:
			'Track performance metrics, call duration, and agent productivity live in your dashboard.',
		iconKey: 'BarChart3',
		tone: 'lilac',
	},
	{
		title: 'CRM Integration',
		description:
			'Seamlessly sync data bi-directionally with Salesforce, HubSpot, and other major platforms.',
		iconKey: 'RefreshCw',
		tone: 'peach',
	},
	{
		title: 'Smart Lead Scoring',
		description:
			'Prioritize high-value prospects automatically with our proprietary AI scoring algorithms.',
		iconKey: 'Sparkles',
		tone: 'mint',
	},
	{
		title: 'Automated Follow-ups',
		description:
			'Set up complex automated email and SMS nurture sequences to re-engage cold leads.',
		iconKey: 'Send',
		tone: 'sky',
	},
];
