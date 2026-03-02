'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useSpring } from 'framer-motion';
import {
	Activity,
	ArrowRight,
	BadgeDollarSign,
	Calculator,
	RefreshCcw,
	Sparkles,
	TrendingUp,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Slider } from '@workspace/ui/components/slider';
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	type ChartConfig,
} from '@workspace/ui/components/chart';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants, cardVariants } from '@/lib/animations';

type ChartMode = 'optimized' | 'industry';
type InputKey = 'leadCost' | 'callCapacity' | 'closeRate' | 'dealValue';

type RoiInputs = {
	leadCost: number;
	callCapacity: number;
	closeRate: number;
	dealValue: number;
};

type MonthlyChartPoint = {
	month: string;
	monthIndex: number;
	industry: number;
	optimized: number;
	profitGap: number;
	volume: number;
	upliftPct: number;
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const DEFAULT_INPUTS: RoiInputs = {
	leadCost: 150,
	callCapacity: 500,
	closeRate: 20,
	dealValue: 2500,
};

const INDUSTRY_CLOSE_RATE = 0.15;
const OPTIMIZED_CLOSE_RATE_MULTIPLIER = 1.22;
const MAX_OPTIMIZED_CLOSE_RATE = 0.35;
const LTV_MULTIPLIER = 4;

const INPUT_BOUNDS: Record<InputKey, { min: number; max: number; step: number }> = {
	leadCost: { min: 10, max: 500, step: 5 },
	callCapacity: { min: 50, max: 2000, step: 10 },
	closeRate: { min: 1, max: 100, step: 1 },
	dealValue: { min: 500, max: 10000, step: 100 },
};

const METRIC_FIELDS: Array<{
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

const chartConfig = {
	optimized: {
		label: 'Pay Per Call Optimized',
		color: 'var(--chart-1)',
	},
	industry: {
		label: 'Industry Standard',
		color: 'var(--chart-2)',
	},
	gap: {
		label: 'Profit Gap',
		color: 'var(--chart-3)',
	},
} satisfies ChartConfig;

const compactCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0,
});

const preciseCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const integerNumber = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 0,
});

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function smoothstep(t: number) {
	return t * t * (3 - 2 * t);
}

function roundMoney(value: number) {
	return Number.isFinite(value) ? Math.round(value) : 0;
}

function calculateRoiMetrics(inputs: RoiInputs) {
	const closeRateDecimal = clamp(inputs.closeRate / 100, 0.01, 1);
	const optimizedCloseRate =
		closeRateDecimal >= MAX_OPTIMIZED_CLOSE_RATE
			? closeRateDecimal
			: Math.min(closeRateDecimal * OPTIMIZED_CLOSE_RATE_MULTIPLIER, MAX_OPTIMIZED_CLOSE_RATE);

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
	const lifetimeValue = inputs.dealValue * LTV_MULTIPLIER;

	const denominator = Math.max(Math.abs(industryMonthlyProfit), 1);
	const vsIndustryPct = ((projectedMonthlyProfit - industryMonthlyProfit) / denominator) * 100;

	const chartData: MonthlyChartPoint[] = MONTH_LABELS.map((month, index) => {
		const t = index / (MONTH_LABELS.length - 1);
		const eased = smoothstep(t);
		const optimized = industryMonthlyProfit + (projectedMonthlyProfit - industryMonthlyProfit) * eased;
		const profitGap = optimized - industryMonthlyProfit;
		const baselineVolume = inputs.callCapacity * (0.88 + eased * 0.12);
		const upliftPct = industryMonthlyProfit === 0
			? 0
			: ((optimized - industryMonthlyProfit) / Math.abs(industryMonthlyProfit)) * 100;

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
	};
}

function RoiDualTooltip({
	active,
	payload,
}: {
	active?: boolean;
	payload?: Array<{ payload?: MonthlyChartPoint }>;
}) {
	if (!active || !payload?.length) return null;
	const point = payload?.[0]?.payload;
	if (!point) return null;

	const gapPct =
		point.industry === 0 ? 0 : (point.profitGap / Math.max(Math.abs(point.industry), 1)) * 100;

	return (
		<div className='grid min-w-56 gap-2 rounded-xl border border-border/60 bg-background px-3 py-2 text-xs shadow-xl'>
			<div className='flex items-center justify-between gap-4 border-b border-border/60 pb-2'>
				<span className='font-semibold'>{`Month ${point.monthIndex} (${point.month})`}</span>
				<span className='font-mono font-semibold tabular-nums text-muted-foreground'>
					{`${integerNumber.format(point.volume)} calls`}
				</span>
			</div>

			<div className='grid gap-1'>
				<div className='flex items-center justify-between gap-4'>
					<span className='text-muted-foreground'>Industry Profit</span>
					<span className='font-mono font-semibold tabular-nums'>
						{compactCurrency.format(point.industry)}
					</span>
				</div>
				<div className='flex items-center justify-between gap-4'>
					<span className='text-muted-foreground'>Optimized Profit</span>
					<span className='font-mono font-semibold tabular-nums text-primary'>
						{compactCurrency.format(point.optimized)}
					</span>
				</div>
				<div className='mt-1 flex items-center justify-between gap-4 rounded-lg border border-pastel-lilac-border bg-pastel-lilac px-2 py-1'>
					<span className='font-semibold text-pastel-lilac-ink'>Profit Gap</span>
					<span className='font-mono font-bold tabular-nums text-pastel-lilac-ink'>
						{`${compactCurrency.format(point.profitGap)} (${gapPct >= 0 ? '+' : ''}${gapPct.toFixed(0)}%)`}
					</span>
				</div>
			</div>
		</div>
	);
}

export function ROICalculatorSection({ className }: { className?: string }) {
	const reduceMotion = useReducedMotion();
	const [inputs, setInputs] = useState<RoiInputs>(DEFAULT_INPUTS);
	const [chartMode, setChartMode] = useState<ChartMode>('optimized');
	const [activeIndex, setActiveIndex] = useState<number>(11);

	const metrics = useMemo(() => calculateRoiMetrics(inputs), [inputs]);

	useEffect(() => {
		setActiveIndex(metrics.chartData.length - 1);
	}, [metrics.chartData.length]);

	const focusedMonthlyProfit =
		chartMode === 'industry'
			? metrics.industryMonthlyProfit
			: metrics.projectedMonthlyProfit;
	const focusedAnnualRevenue =
		chartMode === 'industry'
			? metrics.industryAnnualRevenue
			: metrics.annualRevenue;
	const focusedCpa =
		chartMode === 'industry'
			? metrics.industryCpa
			: metrics.optimizedCpa;

	const animatedProfit = useSpring(metrics.projectedMonthlyProfit, {
		stiffness: 130,
		damping: 22,
		mass: 0.7,
	});
	const [displayProfit, setDisplayProfit] = useState(metrics.projectedMonthlyProfit);

	useMotionValueEvent(animatedProfit, 'change', (value) => {
		setDisplayProfit(Math.round(value));
	});

	useEffect(() => {
		animatedProfit.set(focusedMonthlyProfit);
	}, [animatedProfit, focusedMonthlyProfit]);

	const activePoint = metrics.chartData[clamp(activeIndex, 0, metrics.chartData.length - 1)]!;
	const profitGapAtMonth12 = metrics.chartData[metrics.chartData.length - 1]?.profitGap ?? 0;
	const profitGapPctAtMonth12 =
		metrics.industryMonthlyProfit === 0
			? 0
			: (profitGapAtMonth12 / Math.max(Math.abs(metrics.industryMonthlyProfit), 1)) * 100;

	const updateInput = (key: InputKey, rawValue: number) => {
		if (!Number.isFinite(rawValue)) {
			return;
		}

		const bounds = INPUT_BOUNDS[key];
		const clamped = clamp(rawValue, bounds.min, bounds.max);

		setInputs((prev) => ({
			...prev,
			[key]: clamped,
		}));
	};

	const resetDefaults = () => {
		setInputs(DEFAULT_INPUTS);
	};

	const onChartHover = (state: { activeTooltipIndex?: number }) => {
		if (typeof state.activeTooltipIndex === 'number') {
			setActiveIndex(state.activeTooltipIndex);
		}
	};

	return (
		<section
			className={cn(
				'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20',
				className
			)}
		>
			<motion.div
				className='mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'
				variants={reduceMotion ? undefined : containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.3 }}
			>
				<motion.div variants={reduceMotion ? undefined : itemVariants} className='space-y-3'>
					<div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5'>
						<Activity className='size-4 text-primary' aria-hidden='true' />
						<span className='text-[11px] font-semibold uppercase tracking-widest text-primary'>
							Interactive ROI Calculator
						</span>
					</div>
					<h2 className='font-heading text-3xl font-extrabold tracking-tight text-foreground text-balance md:text-5xl'>
						Project 12-Month Pay Per Call Growth with Real Inputs
					</h2>
					<p className='max-w-3xl text-base text-muted-foreground md:text-lg'>
						Model call economics instantly, compare against industry benchmarks, and
						see how optimized qualification transforms your revenue trajectory.
					</p>
				</motion.div>

				<motion.div
					variants={reduceMotion ? undefined : itemVariants}
					className='inline-flex items-center gap-2 rounded-full border border-pastel-mint-border bg-pastel-mint px-3 py-1.5 text-xs font-semibold uppercase text-pastel-mint-ink'
				>
					<span className='relative flex size-2'>
						<span className='absolute inline-flex size-full animate-ping rounded-full bg-pastel-mint-strong opacity-80' />
						<span className='relative inline-flex size-2 rounded-full bg-pastel-mint-strong' />
					</span>
					Engine Online
				</motion.div>
			</motion.div>

			<motion.div
				className='grid grid-cols-1 gap-6 lg:grid-cols-12'
				variants={reduceMotion ? undefined : containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.2 }}
			>
				<motion.div
					variants={reduceMotion ? undefined : cardVariants}
					className='relative overflow-hidden rounded-3xl border bg-pastel-mint p-5 shadow-sm lg:col-span-5'
				>
					<div
						className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.7)_1px,transparent_1px)] bg-size-[14px_14px] opacity-[0.08]'
						aria-hidden='true'
					/>
					<div className='relative z-10 space-y-5'>
						<div className='flex flex-wrap items-center justify-between gap-3'>
							<div className='inline-flex items-center gap-2 text-sm font-bold text-pastel-mint-ink'>
								<span className='glass-icon inline-flex size-8 items-center justify-center rounded-lg'>
									<Calculator className='size-4 text-pastel-mint-ink' aria-hidden='true' />
								</span>
								Input Metrics
							</div>
							<Button
								type='button'
								size='sm'
								variant='outline'
								onClick={resetDefaults}
								className='h-8 border-pastel-mint-border bg-white/70 px-3 text-xs font-semibold text-pastel-mint-ink hover:bg-white'
							>
								<RefreshCcw className='size-3.5' aria-hidden='true' />
								Reset Defaults
							</Button>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							{METRIC_FIELDS.map((field) => {
								const bounds = INPUT_BOUNDS[field.key];
								const value = inputs[field.key];
								return (
									<div
										key={field.key}
										className='rounded-2xl border border-border/70 bg-background/80 p-4 backdrop-blur-sm'
										// className='rounded-2xl border border-border/70 bg-background/80 p-4 backdrop-blur-sm'
									>
										<label
											htmlFor={field.key}
											className='mb-3 block text-[11px] font-bold uppercase tracking-widest'
										>
											{field.label}
										</label>
										<div className='mb-3 flex items-center gap-2'>
											{field.prefix ? (
												<span className='text-sm font-bold text-pastel-mint-ink'>
													{field.prefix}
												</span>
											) : null}
											<Input
												id={field.key}
												name={field.name}
												type='number'
												autoComplete='off'
												inputMode='numeric'
												value={value}
												onChange={(event) => updateInput(field.key, Number(event.target.value))}
												min={bounds.min}
												max={bounds.max}
												step={bounds.step}
												aria-label={field.label}
												className='h-9 border-pastel-mint-border bg-white text-right text-sm font-bold text-pastel-mint-ink'
											/>
											{field.suffix ? (
												<span className='text-sm font-bold text-pastel-mint-ink'>
													{field.suffix}
												</span>
											) : null}
										</div>
										<Slider
											value={[value]}
											defaultValue={[value]}
											min={bounds.min}
											max={bounds.max}
											step={bounds.step}
											onValueChange={(next) => updateInput(field.key, next[0] ?? value)}
											aria-label={field.label}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</motion.div>

				<motion.div
					variants={reduceMotion ? undefined : cardVariants}
					className='relative overflow-hidden rounded-3xl border bg-pastel-lilac p-6 shadow-md lg:col-span-7'
				>

					<div className='relative z-10 flex h-full flex-col gap-5'>
						<div className='flex items-start justify-between gap-4'>
							<div>
								<p className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
									Projected Profit
								</p>
								<p className='font-heading mt-1 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl'>
									{compactCurrency.format(displayProfit)}
								</p>
								<p className='mt-1 text-xs font-medium text-muted-foreground'>
									<span className='tabular-nums'>
										{compactCurrency.format(metrics.industryMonthlyProfit)}
									</span>
									<span className='mx-2 text-muted-foreground/60' aria-hidden='true'>
										•
									</span>
									<span className='tabular-nums text-primary'>
										{compactCurrency.format(metrics.projectedMonthlyProfit)}
									</span>
								</p>
							</div>
							<div className='rounded-lg border border-pastel-lilac-border bg-pastel-lilac px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-pastel-lilac-ink'>
								{chartMode === 'industry' ? 'Industry' : 'Optimized'}
							</div>
						</div>

						{chartMode === 'industry' ? (
							<div className='inline-flex w-fit items-center gap-2 rounded-lg border border-pastel-peach-border bg-pastel-peach px-2.5 py-1 text-xs font-semibold text-pastel-peach-ink'>
								<span className='font-semibold'>Your current path:</span>
								<span>High waste, low scale.</span>
							</div>
						) : (
							<div className='inline-flex w-fit items-center gap-2 rounded-lg border border-pastel-mint-border bg-pastel-mint px-2.5 py-1 text-xs font-semibold text-pastel-mint-ink'>
								<TrendingUp className='size-3.5' aria-hidden='true' />
								{`${metrics.vsIndustryPct >= 0 ? '+' : ''}${metrics.vsIndustryPct.toFixed(0)}% vs industry`}
							</div>
						)}

						<div className='rounded-2xl border border-border/70 bg-background/80 p-4 backdrop-blur-sm'>
							<div className='mb-2 flex items-center justify-between gap-4'>
								<p className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
									Cost Per Acquisition (CPA)
								</p>
								<span className='text-[10px] font-bold uppercase tracking-widest text-pastel-mint-ink'>
									{`${metrics.cpaEfficiencyPct.toFixed(0)}% lower CPA`}
								</span>
							</div>
							<div className='flex items-center gap-3 text-sm'>
								<div className='min-w-0 rounded-xl border border-border bg-muted/40 px-3 py-2'>
									<p className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>Industry</p>
									<p className={cn(
										'font-semibold tabular-nums',
										chartMode === 'industry' ? 'text-foreground' : 'text-muted-foreground line-through decoration-muted-foreground/50'
									)}>
										{preciseCurrency.format(metrics.industryCpa)}
									</p>
								</div>
								<ArrowRight className='size-4 text-muted-foreground' aria-hidden='true' />
								<div className='min-w-0 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2'>
									<p className='text-[10px] font-semibold uppercase tracking-wider text-primary'>
										Optimized
									</p>
									<p className={cn(
										'font-bold tabular-nums',
										chartMode === 'optimized' ? 'text-primary' : 'text-primary/70'
									)}>
										{preciseCurrency.format(metrics.optimizedCpa)}
									</p>
								</div>
							</div>
						</div>

						<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
							<div className='rounded-2xl border border-border/70 bg-background/75 px-4 py-3'>
								<p className='mb-1 text-xs font-medium text-muted-foreground'>Annual Revenue Potential</p>
								<p className='text-xl font-bold text-foreground tabular-nums'>
									{compactCurrency.format(focusedAnnualRevenue)}
								</p>
							</div>
							<div className='rounded-2xl border border-border/70 bg-background/75 px-4 py-3'>
								<p className='mb-1 text-xs font-medium text-muted-foreground'>Estimated LTV</p>
								<p className='text-xl font-bold text-foreground tabular-nums'>
									{compactCurrency.format(metrics.lifetimeValue)}
								</p>
							</div>
						</div>

						<Button
							type='button'
							size='lg'
							className='mt-1 h-11 w-full rounded-xl text-sm font-bold transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-lg'
						>
							<BadgeDollarSign className='size-4' aria-hidden='true' />
							Get My Custom Scaling Plan
						</Button>
					</div>
				</motion.div>
			</motion.div>

			<motion.div
				variants={reduceMotion ? undefined : cardVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.2 }}
				className='mt-6 overflow-hidden rounded-3xl border bg-card p-5 shadow-sm md:p-6'
			>
				<div className='mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
					<div className='inline-flex items-center gap-2 text-base font-bold'>
						<span className='inline-flex size-8 items-center justify-center rounded-lg border border-pastel-sky-border bg-white/70 shadow-xs'>
							<TrendingUp className='size-4 text-primary' aria-hidden='true' />
						</span>
						12-Month Projected Scaling
					</div>
					<div
						className='inline-flex w-fit rounded-full border border-pastel-sky-border bg-card p-1 shadow-xs'
						role='tablist'
						aria-label='Chart mode toggle'
					>
						<button
							type='button'
							role='tab'
							aria-selected={chartMode === 'industry'}
							onClick={() => setChartMode('industry')}
							className={cn(
								'rounded-full px-3 py-1.5 text-xs font-semibold transition-[background-color,color]',
								chartMode === 'industry'
									? 'bg-muted text-foreground'
									: 'text-muted-foreground hover:text-foreground'
							)}
						>
							Industry Standard
						</button>
						<button
							type='button'
							role='tab'
							aria-selected={chartMode === 'optimized'}
							onClick={() => setChartMode('optimized')}
							className={cn(
								'rounded-full px-3 py-1.5 text-xs font-semibold transition-[background-color,color]',
								chartMode === 'optimized'
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:text-foreground'
							)}
						>
							Pay Per Call Optimized
						</button>
					</div>
				</div>

				<div className='rounded-2xl border border-pastel-sky-border bg-card p-3 md:p-4'>
					<ChartContainer
						config={chartConfig}
						className='h-[280px] w-full aspect-auto'
						role='img'
						aria-label='12-month profit projection chart'
					>
						<AreaChart
							data={metrics.chartData}
							margin={{ top: 14, right: 12, left: 12, bottom: 4 }}
							onMouseMove={onChartHover}
						>
							<defs>
								<linearGradient id="fillOptimized" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="var(--color-optimized)" stopOpacity={0.8} />
									<stop offset="95%" stopColor="var(--color-optimized)" stopOpacity={0.1} />
								</linearGradient>
								<linearGradient id="fillIndustry" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="var(--color-industry)" stopOpacity={0.8} />
									<stop offset="95%" stopColor="var(--color-industry)" stopOpacity={0.1} />
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey='month'
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={6}
							/>
							<YAxis hide />
							<ChartTooltip cursor={false} content={<RoiDualTooltip />} />
							<Area
								type='natural'
								dataKey='industry'
								stroke='var(--color-industry)'
								fill='url(#fillIndustry)'
								isAnimationActive={!reduceMotion}
								animationDuration={650}
							/>
							<Area
								type='natural'
								dataKey='optimized'
								stroke='var(--color-optimized)'
								fill='url(#fillOptimized)'
								isAnimationActive={!reduceMotion}
								animationDuration={700}
							/>
							<ChartLegend content={<ChartLegendContent />} />
						</AreaChart>
					</ChartContainer>
				</div>

				<div className='mt-3 flex flex-col gap-2 rounded-xl border border-pastel-sky-border bg-card px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between'>
					<div className='flex items-center gap-2 text-muted-foreground'>
						<Sparkles className='size-3.5 text-primary' aria-hidden='true' />
						<span>
							{chartMode === 'industry'
								? 'Baseline focus: see the stagnation and waste.'
								: 'Optimized focus: see compounding monthly profit.'}
						</span>
					</div>
					<div className='flex flex-wrap items-center gap-3 text-foreground'>
						<span className='font-semibold'>{`Month ${activePoint.monthIndex} (${activePoint.month})`}</span>
						<span className='tabular-nums'>{`${integerNumber.format(activePoint.volume)} calls`}</span>
						<span className='tabular-nums text-pastel-peach-ink'>
							{compactCurrency.format(activePoint.industry)}
						</span>
						<span className='tabular-nums text-primary'>
							{compactCurrency.format(activePoint.optimized)}
						</span>
						<span className='tabular-nums text-pastel-lilac-ink'>
							{`${compactCurrency.format(activePoint.profitGap)} gap`}
						</span>
					</div>
				</div>

				<div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3'>
					<div className='rounded-xl border border-pastel-peach-border bg-pastel-peach px-4 py-3 text-xs'>
						<p className='text-[10px] font-bold uppercase tracking-widest text-pastel-peach-ink opacity-80'>
							Industry Baseline (Month 12)
						</p>
						<p className='mt-1 text-base font-bold tabular-nums text-pastel-peach-ink'>
							{compactCurrency.format(metrics.industryMonthlyProfit)}
						</p>
					</div>
					<div className='rounded-xl border border-pastel-sky-border bg-pastel-sky px-4 py-3 text-xs'>
						<p className='text-[10px] font-bold uppercase tracking-widest text-pastel-sky-ink opacity-80'>
							Optimized Curve (Month 12)
						</p>
						<p className='mt-1 text-base font-bold tabular-nums text-pastel-sky-ink'>
							{compactCurrency.format(metrics.projectedMonthlyProfit)}
						</p>
					</div>
					<div className='rounded-xl border border-pastel-lilac-border bg-pastel-lilac px-4 py-3 text-xs'>
						<p className='text-[10px] font-bold uppercase tracking-widest text-pastel-lilac-ink opacity-80'>
							Profit Gap (Month 12)
						</p>
						<p className='mt-1 text-base font-bold tabular-nums text-pastel-lilac-ink'>
							{`${compactCurrency.format(profitGapAtMonth12)} (${profitGapPctAtMonth12 >= 0 ? '+' : ''}${profitGapPctAtMonth12.toFixed(0)}%)`}
						</p>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
