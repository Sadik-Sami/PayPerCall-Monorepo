
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
