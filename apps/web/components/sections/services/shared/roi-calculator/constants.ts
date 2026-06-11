
import { type ChartConfig } from '@workspace/ui/components/chart';
import type { RoiInputs, InputKey } from './types';

export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export const DEFAULT_INPUTS: RoiInputs = {
	leadCost: 150,
	callCapacity: 500,
	closeRate: 20,
	dealValue: 2500,
	optimizationRate: 4,
};

export const MARKETING_DEFAULT_INPUTS: RoiInputs = {
	leadCost: 12000,
	callCapacity: 0,
	closeRate: 2.4,
	dealValue: 1800,
	optimizationRate: 4,
};

export const INDUSTRY_CLOSE_RATE = 0.15;
export const OPTIMIZED_CLOSE_RATE_MULTIPLIER = 1.22;
export const MAX_OPTIMIZED_CLOSE_RATE = 0.35;
export const LTV_MULTIPLIER = 4;
export const ASSUMED_MARKETING_TRAFFIC = 5000;

export const INPUT_BOUNDS: Record<InputKey, { min: number; max: number; step: number }> = {
	leadCost: { min: 10, max: 500, step: 5 },
	callCapacity: { min: 50, max: 2000, step: 10 },
	closeRate: { min: 1, max: 100, step: 1 },
	dealValue: { min: 500, max: 10000, step: 100 },
	optimizationRate: { min: 1, max: 12, step: 0.5 },
};

export const CALL_METRIC_FIELDS: Array<{
	key: InputKey;
	label: string;
	prefix?: string;
	suffix?: string;
	name: string;
}> = [
	{ key: 'leadCost', label: 'Current Lead Cost', prefix: '$', name: 'leadCost' },
	{ key: 'callCapacity', label: 'Monthly Call Capacity', name: 'callCapacity' },
	{ key: 'closeRate', label: 'Close Rate', suffix: '%', name: 'closeRate' },
	{ key: 'dealValue', label: 'Average Deal Value', prefix: '$', name: 'dealValue' },
];

export const LEAD_METRIC_FIELDS: Array<{
	key: InputKey;
	label: string;
	prefix?: string;
	suffix?: string;
	name: string;
}> = [
	{ key: 'leadCost', label: 'Cost Per Lead (CPL)', prefix: '$', name: 'leadCost' },
	{ key: 'callCapacity', label: 'Monthly Lead Volume', name: 'callCapacity' },
	{ key: 'closeRate', label: 'Close Rate', suffix: '%', name: 'closeRate' },
	{ key: 'dealValue', label: 'Average Deal Value', prefix: '$', name: 'dealValue' },
];

export const CHART_CONFIG_CALL = {
	optimized: { label: 'Pay Per Call Optimized', color: 'var(--chart-1)' },
	industry: { label: 'Industry Standard', color: 'var(--chart-2)' },
	gap: { label: 'Profit Gap', color: 'var(--chart-3)' },
} satisfies ChartConfig;

export const CHART_CONFIG_LEAD = {
	optimized: { label: 'Pay Per Lead Optimized', color: 'var(--chart-1)' },
	industry: { label: 'Industry Standard', color: 'var(--chart-2)' },
	gap: { label: 'Profit Gap', color: 'var(--chart-3)' },
} satisfies ChartConfig;

export const CHART_CONFIG_MARKETING = {
	optimized: { label: 'Digital Marketing Optimized', color: 'var(--chart-1)' },
	industry: { label: 'Industry Standard', color: 'var(--chart-2)' },
	gap: { label: 'Profit Gap', color: 'var(--chart-3)' },
} satisfies ChartConfig;

export const MARKETING_METRIC_FIELDS: Array<{
	key: InputKey;
	label: string;
	prefix?: string;
	suffix?: string;
	name: string;
}> = [
	{ key: 'leadCost', label: 'Monthly Ad Spend', prefix: '$', name: 'leadCost' },
	{ key: 'closeRate', label: 'Current CVR', suffix: '%', name: 'closeRate' },
	{ key: 'dealValue', label: 'Target AOV', prefix: '$', name: 'dealValue' },
	{ key: 'optimizationRate', label: 'Optimization Rate', suffix: '%', name: 'optimizationRate' },
];
