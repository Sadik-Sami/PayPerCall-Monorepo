
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
