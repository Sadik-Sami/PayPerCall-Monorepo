'use client';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';
type Size = 'sm' | 'md' | 'lg';

export interface EqualiserBarsProps {
	accent?: Accent;
	size?: Size;
	className?: string;
	ariaLabel?: string;
}

const ACCENT: Record<Accent, string> = {
	mint: 'bg-pastel-mint-strong',
	sky: 'bg-pastel-sky-strong',
	lilac: 'bg-pastel-lilac-strong',
	peach: 'bg-pastel-peach-strong',
	blush: 'bg-pastel-blush-strong',
	lime: 'bg-pastel-lime-strong',
};

const SIZE: Record<Size, { wrap: string; bar: string }> = {
	sm: { wrap: 'h-4 gap-[3px]', bar: 'w-[3px]' },
	md: { wrap: 'h-6 gap-1', bar: 'w-1' },
	lg: { wrap: 'h-9 gap-1.5', bar: 'w-1.5' },
};

const BARS = [
	{ dur: '1.05s', delay: '0s' },
	{ dur: '0.85s', delay: '0.15s' },
	{ dur: '1.25s', delay: '0.05s' },
	{ dur: '0.95s', delay: '0.2s' },
	{ dur: '1.15s', delay: '0.1s' },
];

export function EqualiserBars({ accent = 'peach', size = 'md', className, ariaLabel }: EqualiserBarsProps) {
	const reduceMotion = useReducedMotion();
	const sz = SIZE[size];
	return (
		<div
			aria-hidden={ariaLabel ? undefined : true}
			aria-label={ariaLabel}
			role={ariaLabel ? 'img' : undefined}
			className={cn('inline-flex items-end', sz.wrap, className)}
		>
			<style>{`
				@keyframes eq-pulse { 0%,100% { transform: scaleY(0.32); } 50% { transform: scaleY(1); } }
			`}</style>
			{BARS.map((b, i) => (
				<span
					key={i}
					className={cn('block h-full rounded-sm origin-bottom', sz.bar, ACCENT[accent])}
					style={
						reduceMotion
							? { transform: 'scaleY(0.6)' }
							: { animation: `eq-pulse ${b.dur} ease-in-out ${b.delay} infinite` }
					}
				/>
			))}
		</div>
	);
}
