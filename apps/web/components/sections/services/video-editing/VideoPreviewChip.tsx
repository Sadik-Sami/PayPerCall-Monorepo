'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

export interface VideoPreviewChipProps {
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

const POSTER_BG: Record<Accent, string> = {
	mint: 'bg-pastel-mint/60 text-pastel-mint-ink',
	sky: 'bg-pastel-sky/60 text-pastel-sky-ink',
	lilac: 'bg-pastel-lilac/60 text-pastel-lilac-ink',
	peach: 'bg-pastel-peach/60 text-pastel-peach-ink',
	blush: 'bg-pastel-blush/60 text-pastel-blush-ink',
	lime: 'bg-pastel-lime/60 text-pastel-lime-ink',
};

export function VideoPreviewChip({
	eyebrow = 'Now editing',
	title,
	meta,
	accent = 'peach',
	className,
}: VideoPreviewChipProps) {
	const reduceMotion = useReducedMotion();
	return (
		<div
			aria-hidden
			className={cn(
				'flex w-full max-w-sm flex-col gap-3 rounded-2xl border border-border/60 bg-card/85 p-4 shadow-sm backdrop-blur-sm sm:p-5',
				className,
			)}
		>
			<div
				className={cn(
					'relative aspect-video w-full overflow-hidden rounded-xl border border-border/40',
					POSTER_BG[accent],
				)}
			>
				<span className='absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em]'>
					<span className='size-1.5 rounded-full bg-red-500' /> REC
				</span>
				<span className='absolute inset-0 flex items-center justify-center'>
					<span className='flex size-10 items-center justify-center rounded-full bg-background/90 shadow-sm'>
						<Play className='ml-0.5 size-4 fill-current' />
					</span>
				</span>
				<span className='absolute inset-x-2 bottom-1.5 flex items-center gap-1 opacity-70'>
					{Array.from({ length: 18 }).map((_, i) => (
						<span key={i} className='block h-2 flex-1 rounded-sm bg-current opacity-50' style={{ height: `${4 + ((i * 37) % 7)}px` }} />
					))}
				</span>
			</div>

			<div>
				<p className={cn('text-[10px] font-semibold uppercase tracking-[0.22em]', INK[accent])}>{eyebrow}</p>
				<p className='mt-0.5 truncate text-sm font-semibold text-foreground'>{title}</p>
				{meta && <p className='text-[11px] text-muted-foreground'>{meta}</p>}
			</div>

			<div className='relative h-1 w-full overflow-hidden rounded-full bg-muted'>
				<motion.span
					className={cn('absolute left-0 top-0 block h-full rounded-full', PROGRESS_BG[accent])}
					initial={{ width: '40%' }}
					animate={reduceMotion ? { width: '40%' } : { width: ['25%', '88%', '25%'] }}
					transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
				/>
			</div>
		</div>
	);
}
