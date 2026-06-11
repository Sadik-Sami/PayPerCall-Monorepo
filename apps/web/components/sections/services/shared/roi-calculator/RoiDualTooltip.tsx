import { isMonthlyChartPoint, type RoiTooltipPayloadEntry } from './types';
import { compactCurrency, integerNumber } from './utils';

export function RoiDualTooltip({
	active,
	payload,
	volumeLabel = 'calls',
	showVolume = true,
}: {
	active?: boolean;
	payload?: ReadonlyArray<RoiTooltipPayloadEntry>;
	volumeLabel?: string;
	showVolume?: boolean;
}) {
	if (!active || !payload?.length) return null;
	const rawPoint = payload[0]?.payload;
	if (!isMonthlyChartPoint(rawPoint)) return null;
	const point = rawPoint;

	const gapPct = point.industry === 0 ? 0 : (point.profitGap / Math.max(Math.abs(point.industry), 1)) * 100;

	return (
		<div className='grid min-w-56 gap-2 rounded-xl border border-border/60 bg-background px-3 py-2 text-xs shadow-xl'>
			<div className='flex items-center justify-between gap-4 border-b border-border/60 pb-2'>
				<span className='font-semibold'>{`Month ${point.monthIndex} (${point.month})`}</span>
				{showVolume ?
					<span className='font-mono font-semibold tabular-nums text-muted-foreground'>
						{`${integerNumber.format(point.volume)} ${volumeLabel}`}
					</span>
				:	null}
			</div>

			<div className='grid gap-1'>
				<div className='flex items-center justify-between gap-4'>
					<span className='text-muted-foreground'>Industry Profit</span>
					<span className='font-mono font-semibold tabular-nums'>{compactCurrency.format(point.industry)}</span>
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
