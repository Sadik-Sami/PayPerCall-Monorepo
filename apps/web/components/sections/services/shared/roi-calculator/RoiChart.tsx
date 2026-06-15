'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip } from '@workspace/ui/components/chart';
import { RoiDualTooltip } from './RoiDualTooltip';
import type { ComponentProps } from 'react';

type ChartConfig = ComponentProps<typeof ChartContainer>['config'];

interface RoiChartProps {
	chartData: Array<Record<string, number | string>>;
	chartConfig: ChartConfig;
	isMarketing: boolean;
	reduceMotion: boolean;
	volumeLabel: string;
	onChartHover?: (state: unknown) => void;
}

export function RoiChart({ chartData, chartConfig, isMarketing, reduceMotion, volumeLabel, onChartHover }: RoiChartProps) {
	return (
		<ChartContainer
			config={chartConfig}
			className='block h-70 w-full aspect-auto'
			role='img'
			aria-label='12-month profit projection chart'>
			<AreaChart data={chartData} margin={{ top: 14, right: 12, left: 12, bottom: 4 }} onMouseMove={onChartHover}>
				<defs>
					<linearGradient id='fillOptimized' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='5%' stopColor='var(--color-optimized)' stopOpacity={isMarketing ? 0.64 : 0.8} />
						<stop offset='95%' stopColor='var(--color-optimized)' stopOpacity={isMarketing ? 0.08 : 0.1} />
					</linearGradient>
					<linearGradient id='fillIndustry' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='5%' stopColor='var(--color-industry)' stopOpacity={isMarketing ? 0.3 : 0.8} />
						<stop offset='95%' stopColor='var(--color-industry)' stopOpacity={isMarketing ? 0.04 : 0.1} />
					</linearGradient>
				</defs>
				<CartesianGrid vertical={false} />
				<XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} minTickGap={6} />
				<YAxis hide />
				<ChartTooltip
					cursor={false}
					content={(props) => (
						<RoiDualTooltip
							active={props.active}
							payload={props.payload}
							volumeLabel={volumeLabel}
							showVolume={!isMarketing}
						/>
					)}
				/>
				<Area
					type={isMarketing ? 'monotone' : 'natural'}
					dataKey='industry'
					stroke='var(--color-industry)'
					fill='url(#fillIndustry)'
					strokeDasharray={isMarketing ? '6 6' : undefined}
					strokeWidth={isMarketing ? 2.5 : 2}
					fillOpacity={isMarketing ? 0.55 : 1}
					isAnimationActive={!reduceMotion}
					animationDuration={650}
				/>
				<Area
					type={isMarketing ? 'monotone' : 'natural'}
					dataKey='optimized'
					stroke='var(--color-optimized)'
					fill='url(#fillOptimized)'
					isAnimationActive={!reduceMotion}
					animationDuration={700}
				/>
				<ChartLegend
					content={(props) => <ChartLegendContent payload={props.payload} verticalAlign={props.verticalAlign} />}
				/>
			</AreaChart>
		</ChartContainer>
	);
}
