import type { CaseStudy } from '@workspace/ui/components/sections/case-study-card';

export const caseStudies: CaseStudy[] = [
	{
		company: 'National Insurance Brokerage',
		industry: 'Insurance',
		problem:
			'Struggling with high call abandonment rates during peak enrollment periods and losing potential policyholders to competitors with faster response times.',
		solution:
			'Implemented a dedicated inbound team with overflow support during Medicare enrollment periods. Added after-hours coverage to capture leads from evening TV advertising.',
		results: [
			{ metric: 'Call Abandonment', value: '-78%' },
			{ metric: 'Policy Conversions', value: '+45%' },
			{ metric: 'Cost Per Acquisition', value: '-32%' },
			{ metric: 'Customer Satisfaction', value: '94%' },
		],
	},
	{
		company: 'Elite Home Services',
		industry: 'Home Services',
		problem:
			'Missing emergency service calls overnight and on weekends. In-house team could not handle seasonal volume spikes during summer HVAC season.',
		solution:
			'24/7 dispatch support with real-time technician scheduling integration. Seasonal overflow team activated during peak periods with same-day training protocols.',
		results: [
			{ metric: 'Lead Capture Rate', value: '+67%' },
			{ metric: 'After-Hours Revenue', value: '+$2.1M' },
			{ metric: 'Response Time', value: '<30 sec' },
			{ metric: 'Annual ROI', value: '340%' },
		],
	},
	{
		company: 'Pacific Legal Partners',
		industry: 'Legal Services',
		problem:
			'Intake team could not keep up with lead volume from advertising campaigns. Qualified leads were going cold before attorneys could follow up.',
		solution:
			'HIPAA-compliant intake specialists conducting initial consultations and case qualification. Real-time lead scoring and immediate attorney notification for high-value cases.',
		results: [
			{ metric: 'Lead-to-Client Rate', value: '+52%' },
			{ metric: 'Intake Capacity', value: '3x' },
			{ metric: 'Average Case Value', value: '+28%' },
			{ metric: 'Attorney Productivity', value: '+40%' },
		],
	},
];
