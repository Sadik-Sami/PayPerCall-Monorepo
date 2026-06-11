import re
import os

with open("apps/web/components/sections/services/shared/roi-calculator/ROICalculatorSection.original.tsx", "r") as f:
    content = f.read()

types_code = """
export type ChartMode = 'optimized' | 'industry';
export type InputKey = 'leadCost' | 'callCapacity' | 'closeRate' | 'dealValue' | 'optimizationRate';

export type RoiInputs = {
	leadCost: number;
	callCapacity: number;
	closeRate: number;
	dealValue: number;
	optimizationRate: number;
};

export type MonthlyChartPoint = {
	month: string;
	monthIndex: number;
	industry: number;
	optimized: number;
	profitGap: number;
	volume: number;
	upliftPct: number;
};

export type RoiMetrics = {
	closeRateDecimal: number;
	optimizedCloseRate: number;
	projectedMonthlyProfit: number;
	industryMonthlyProfit: number;
	currentCpa: number;
	industryCpa: number;
	optimizedCpa: number;
	cpaEfficiencyPct: number;
	annualRevenue: number;
	industryAnnualRevenue: number;
	lifetimeValue: number;
	vsIndustryPct: number;
	chartData: MonthlyChartPoint[];
	annualLift: number;
	attributionAccuracy: number;
	breakevenMonth: number;
	infrastructureLoad: string;
};

export type RoiTooltipPayloadEntry = { payload?: unknown };

export function isMonthlyChartPoint(value: unknown): value is MonthlyChartPoint {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const point = value as MonthlyChartPoint;
	return (
		typeof point.month === 'string' &&
		typeof point.monthIndex === 'number' &&
		typeof point.industry === 'number' &&
		typeof point.optimized === 'number' &&
		typeof point.profitGap === 'number' &&
		typeof point.volume === 'number' &&
		typeof point.upliftPct === 'number'
	);
}
"""

constants_code = """
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
"""

utils_code = """
export const compactCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0,
});

export const preciseCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export const integerNumber = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 0,
});

export function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

export function smoothstep(t: number) {
	return t * t * (3 - 2 * t);
}

export function roundMoney(value: number) {
	return Number.isFinite(value) ? Math.round(value) : 0;
}
"""

logic_code = """
import type { RoiInputs, RoiMetrics, MonthlyChartPoint } from './types';
import { clamp, smoothstep, roundMoney } from './utils';
import { 
    MONTH_LABELS, 
    INDUSTRY_CLOSE_RATE, 
    OPTIMIZED_CLOSE_RATE_MULTIPLIER, 
    MAX_OPTIMIZED_CLOSE_RATE, 
    LTV_MULTIPLIER, 
    ASSUMED_MARKETING_TRAFFIC 
} from './constants';

export function calculateDefaultRoiMetrics(inputs: RoiInputs): RoiMetrics {
	const closeRateDecimal = clamp(inputs.closeRate / 100, 0.01, 1);
	const optimizedCloseRate =
		closeRateDecimal >= MAX_OPTIMIZED_CLOSE_RATE ? closeRateDecimal : (
			Math.min(closeRateDecimal * OPTIMIZED_CLOSE_RATE_MULTIPLIER, MAX_OPTIMIZED_CLOSE_RATE)
		);

	const industryMonthlyProfit =
		inputs.callCapacity * INDUSTRY_CLOSE_RATE * inputs.dealValue - inputs.callCapacity * inputs.leadCost;

	const projectedMonthlyProfit =
		inputs.callCapacity * optimizedCloseRate * inputs.dealValue - inputs.callCapacity * inputs.leadCost;

	const currentCpa = inputs.leadCost / closeRateDecimal;
	const industryCpa = inputs.leadCost / INDUSTRY_CLOSE_RATE;
	const optimizedCpa = inputs.leadCost / optimizedCloseRate;
	const cpaEfficiencyPct = industryCpa === 0 ? 0 : ((industryCpa - optimizedCpa) / industryCpa) * 100;

	const annualRevenue = inputs.callCapacity * optimizedCloseRate * inputs.dealValue * 12;
	const industryAnnualRevenue = inputs.callCapacity * INDUSTRY_CLOSE_RATE * inputs.dealValue * 12;
	const annualLift = annualRevenue - industryAnnualRevenue;
	const lifetimeValue = inputs.dealValue * LTV_MULTIPLIER;

	const denominator = Math.max(Math.abs(industryMonthlyProfit), 1);
	const vsIndustryPct = ((projectedMonthlyProfit - industryMonthlyProfit) / denominator) * 100;

	const chartData: MonthlyChartPoint[] = MONTH_LABELS.map((month, index) => {
		const t = index / (MONTH_LABELS.length - 1);
		const eased = smoothstep(t);
		const optimized = industryMonthlyProfit + (projectedMonthlyProfit - industryMonthlyProfit) * eased;
		const profitGap = optimized - industryMonthlyProfit;
		const baselineVolume = inputs.callCapacity * (0.88 + eased * 0.12);
		const upliftPct =
			industryMonthlyProfit === 0 ? 0 : ((optimized - industryMonthlyProfit) / Math.abs(industryMonthlyProfit)) * 100;

		return {
			month,
			monthIndex: index + 1,
			industry: roundMoney(industryMonthlyProfit),
			optimized: roundMoney(optimized),
			profitGap: roundMoney(profitGap),
			volume: Math.round(baselineVolume),
			upliftPct,
		};
	});

	return {
		closeRateDecimal,
		optimizedCloseRate,
		projectedMonthlyProfit: roundMoney(projectedMonthlyProfit),
		industryMonthlyProfit: roundMoney(industryMonthlyProfit),
		currentCpa,
		industryCpa,
		optimizedCpa,
		cpaEfficiencyPct,
		annualRevenue: roundMoney(annualRevenue),
		industryAnnualRevenue: roundMoney(industryAnnualRevenue),
		lifetimeValue: roundMoney(lifetimeValue),
		vsIndustryPct,
		chartData,
		annualLift: roundMoney(annualLift),
		attributionAccuracy: 94,
		breakevenMonth: 4,
		infrastructureLoad: 'Automated via CoreCloser',
	};
}

export function calculateMarketingRoiMetrics(inputs: RoiInputs): RoiMetrics {
	const spend = Math.max(inputs.leadCost, 100);
	const closeRateDecimal = clamp(inputs.closeRate / 100, 0.001, 0.5);
	const optimizationRate = clamp(inputs.optimizationRate / 100, 0.01, 0.2);
	const targetAov = Math.max(inputs.dealValue, 100);

	const industryMonthlyProfit = spend * closeRateDecimal * targetAov;

	const chartData: MonthlyChartPoint[] = MONTH_LABELS.map((month, index) => {
		const monthIndex = index + 1;
		const optimizedCloseRate = closeRateDecimal * Math.pow(1 + optimizationRate, monthIndex);
		const optimizedRevenue = spend * optimizedCloseRate * targetAov;
		const profitGap = optimizedRevenue - industryMonthlyProfit;
		const upliftPct =
			industryMonthlyProfit === 0 ? 0 : (
				((optimizedRevenue - industryMonthlyProfit) / Math.max(industryMonthlyProfit, 1)) * 100
			);

		return {
			month,
			monthIndex,
			industry: roundMoney(industryMonthlyProfit),
			optimized: roundMoney(optimizedRevenue),
			profitGap: roundMoney(profitGap),
			volume: Math.round(optimizedCloseRate * 10000),
			upliftPct,
		};
	});

	const projectedMonthlyProfit = chartData[chartData.length - 1]?.optimized ?? 0;
	const annualRevenue = chartData.reduce((sum, point) => sum + point.optimized, 0);
	const industryAnnualRevenue = roundMoney(industryMonthlyProfit * 12);
	const annualLift = annualRevenue - industryAnnualRevenue;

	const baselineConversions = ASSUMED_MARKETING_TRAFFIC * closeRateDecimal;
	const month12CloseRate = closeRateDecimal * Math.pow(1 + optimizationRate, 12);
	const month12Conversions = ASSUMED_MARKETING_TRAFFIC * month12CloseRate;
	const currentCpa = spend / Math.max(baselineConversions, 1);
	const optimizedCpa = spend / Math.max(month12Conversions, 1);
	const cpaEfficiencyPct = ((currentCpa - optimizedCpa) / Math.max(currentCpa, 1)) * 100;
	const vsIndustryPct = (annualLift / Math.max(industryAnnualRevenue, 1)) * 100;

	let cumulativeLift = 0;
	let breakevenMonth = 4;
	for (const point of chartData) {
		cumulativeLift += point.profitGap;
		if (cumulativeLift >= spend) {
			breakevenMonth = point.monthIndex;
			break;
		}
	}

	const attributionAccuracy = clamp(92 + optimizationRate * 160 - (closeRateDecimal < 0.01 ? 4 : 0), 88, 99);

	return {
		closeRateDecimal,
		optimizedCloseRate: month12CloseRate,
		projectedMonthlyProfit,
		industryMonthlyProfit: roundMoney(industryMonthlyProfit),
		currentCpa,
		industryCpa: currentCpa,
		optimizedCpa,
		cpaEfficiencyPct,
		annualRevenue: roundMoney(annualRevenue),
		industryAnnualRevenue,
		lifetimeValue: roundMoney(annualLift),
		vsIndustryPct,
		chartData,
		annualLift: roundMoney(annualLift),
		attributionAccuracy,
		breakevenMonth,
		infrastructureLoad: 'Automated via CoreCloser',
	};
}
"""

with open("apps/web/components/sections/services/shared/roi-calculator/types.ts", "w") as f:
    f.write(types_code)
with open("apps/web/components/sections/services/shared/roi-calculator/constants.ts", "w") as f:
    f.write(constants_code)
with open("apps/web/components/sections/services/shared/roi-calculator/utils.ts", "w") as f:
    f.write(utils_code)
with open("apps/web/components/sections/services/shared/roi-calculator/logic.ts", "w") as f:
    f.write(logic_code)
