'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { EqualiserBars } from './EqualiserBars';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

export interface NowPlayingChipProps {
	eyebrow?: string;
	title: string;
	meta?: string;
	accent?: Accent;
	className?: string;
}

const PROGRESS_BG: Record<Accent, string> = {
	mint: 'bg-pastel-mint-strong',
	sky: 'bg-pastel-sky-strong',
	lilac: 'bg-pastel-lilac-strong',
	peach: 'bg-pastel-peach-strong',
	blush: 'bg-pastel-blush-strong',
	lime: 'bg-pastel-lime-strong',
};

const INK: Record<Accent, string> = {
	mint: 'text-pastel-mint-ink',
	sky: 'text-pastel-sky-ink',
	lilac: 'text-pastel-lilac-ink',
	peach: 'text-pastel-peach-ink',
	blush: 'text-pastel-blush-ink',
	lime: 'text-pastel-lime-ink',
};

export function NowPlayingChip({
	eyebrow = 'Now playing',
	title,
	meta,
	accent = 'peach',
	className,
}: NowPlayingChipProps) {
	const reduceMotion = useReducedMotion();
	return (
		<div
			aria-hidden
			className={cn(
				'flex w-full max-w-sm flex-col gap-3 rounded-2xl border border-border/60 bg-card/85 p-4 shadow-sm backdrop-blur-sm sm:p-5',
				className,
			)}
		>
			<div className='flex items-start gap-3'>
				<span className={cn('mt-0.5 flex size-9 items-center justify-center rounded-xl border border-border/40 bg-background/80')}>
					<EqualiserBars accent={accent} size='md' />
				</span>
				<div className='min-w-0 flex-1'>
					<p className={cn('text-[10px] font-semibold uppercase tracking-[0.22em]', INK[accent])}>{eyebrow}</p>
					<p className='mt-0.5 truncate text-sm font-semibold text-foreground'>{title}</p>
					{meta && <p className='text-[11px] text-muted-foreground'>{meta}</p>}
				</div>
			</div>

			<div className='relative h-1 w-full overflow-hidden rounded-full bg-muted'>
				<motion.span
					className={cn('absolute left-0 top-0 block h-full rounded-full', PROGRESS_BG[accent])}
					initial={{ width: '35%' }}
					animate={reduceMotion ? { width: '35%' } : { width: ['35%', '92%', '35%'] }}
					transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
				/>
			</div>
		</div>
	);
}
