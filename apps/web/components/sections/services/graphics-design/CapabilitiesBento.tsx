'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import {
	Sparkles,
	Layout,
	Megaphone,
	Share2,
	Mail,
	Presentation,
	Palette,
	Brush,
	Camera,
	Film,
	PenTool,
	Mic,
	AudioLines,
	Radio,
	Scissors,
	Briefcase,
} from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

export type BentoSize = 'sm' | 'lg' | 'wide';

export type BentoIcon =
	| 'Sparkles'
	| 'Layout'
	| 'Megaphone'
	| 'Share2'
	| 'Mail'
	| 'Presentation'
	| 'Palette'
	| 'Brush'
	| 'Camera'
	| 'Film'
	| 'PenTool'
	| 'Mic'
	| 'AudioLines'
	| 'Radio'
	| 'Scissors'
	| 'Briefcase';

export interface BentoTile {
	title: string;
	description: string;
	bullets?: string[];
	icon: BentoIcon;
	accent: Accent;
	size?: BentoSize;
	href?: string;
}

export interface CapabilitiesBentoProps {
	eyebrow: string;
	headline: string;
	description?: string;
	tiles: BentoTile[];
	className?: string;
}

const ICON_MAP: Record<BentoIcon, LucideIcon> = {
	Sparkles,
	Layout,
	Megaphone,
	Share2,
	Mail,
	Presentation,
	Palette,
	Brush,
	Camera,
	Film,
	PenTool,
	Mic,
	AudioLines,
	Radio,
	Scissors,
	Briefcase,
};

const CARD_BG: Record<Accent, string> = {
	mint: 'bg-pastel-mint/45 border-pastel-mint-border',
	sky: 'bg-pastel-sky/45 border-pastel-sky-border',
	lilac: 'bg-pastel-lilac/45 border-pastel-lilac-border',
	peach: 'bg-pastel-peach/45 border-pastel-peach-border',
	blush: 'bg-pastel-blush/45 border-pastel-blush-border',
	lime: 'bg-pastel-lime/45 border-pastel-lime-border',
};

const ICON_CHIP: Record<Accent, string> = {
	mint: 'bg-pastel-mint border-pastel-mint-border text-pastel-mint-ink',
	sky: 'bg-pastel-sky border-pastel-sky-border text-pastel-sky-ink',
	lilac: 'bg-pastel-lilac border-pastel-lilac-border text-pastel-lilac-ink',
	peach: 'bg-pastel-peach border-pastel-peach-border text-pastel-peach-ink',
	blush: 'bg-pastel-blush border-pastel-blush-border text-pastel-blush-ink',
	lime: 'bg-pastel-lime border-pastel-lime-border text-pastel-lime-ink',
};

const INK: Record<Accent, string> = {
	mint: 'text-pastel-mint-ink',
	sky: 'text-pastel-sky-ink',
	lilac: 'text-pastel-lilac-ink',
	peach: 'text-pastel-peach-ink',
	blush: 'text-pastel-blush-ink',
	lime: 'text-pastel-lime-ink',
};

const SIZE_CLASS: Record<BentoSize, string> = {
	sm: 'md:col-span-2 lg:col-span-2',
	lg: 'md:col-span-4 lg:col-span-4 lg:row-span-2',
	wide: 'md:col-span-4 lg:col-span-6',
};

function BentoCard({ tile }: { tile: BentoTile }) {
	const Icon = ICON_MAP[tile.icon];
	const size = tile.size ?? 'sm';
	const isLarge = size === 'lg';

	const inner = (
		<motion.article
			variants={itemVariants}
			className={cn(
				'group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7',
				CARD_BG[tile.accent],
				isLarge && 'sm:p-9',
			)}
		>
			<div className='flex items-start justify-between gap-4'>
				<span
					className={cn(
						'flex size-12 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105',
						ICON_CHIP[tile.accent],
					)}
				>
					<Icon className='size-6' />
				</span>
				{tile.href && (
					<span
						className={cn(
							'flex size-9 items-center justify-center rounded-full border bg-white/70 text-foreground/80 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
							'border-border/40',
						)}
					>
						<ArrowUpRight className='size-4' />
					</span>
				)}
			</div>

			<h3
				className={cn(
					'mt-6 font-heading font-bold tracking-tight text-foreground',
					isLarge ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl',
				)}
			>
				{tile.title}
			</h3>

			<p
				className={cn(
					'mt-3 leading-relaxed text-muted-foreground',
					isLarge ? 'max-w-md text-base sm:text-lg' : 'text-sm sm:text-[15px]',
				)}
			>
				{tile.description}
			</p>

			{tile.bullets && tile.bullets.length > 0 && (
				<ul
					className={cn(
						'mt-auto flex flex-col gap-1.5 pt-6 text-sm font-medium',
						INK[tile.accent],
					)}
				>
					{tile.bullets.map((bullet) => (
						<li key={bullet} className='flex items-center gap-2'>
							<span className='inline-block size-1.5 rounded-full bg-current' />
							{bullet}
						</li>
					))}
				</ul>
			)}
		</motion.article>
	);

	const wrapperClass = SIZE_CLASS[size];

	if (tile.href) {
		return (
			<Link href={tile.href} className={cn('block h-full', wrapperClass)}>
				{inner}
			</Link>
		);
	}
	return <div className={cn('h-full', wrapperClass)}>{inner}</div>;
}

export function CapabilitiesBento({ eyebrow, headline, description, tiles, className }: CapabilitiesBentoProps) {
	return (
		<section className={cn('relative w-full overflow-hidden', className)}>
			<div className='section-container'>
				<div className='mx-auto mb-12 max-w-3xl sm:mb-14'>
					<p className='text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>{eyebrow}</p>
					<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						{headline}
					</h2>
					{description && (
						<p className='mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
							{description}
						</p>
					)}
				</div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5'
				>
					{tiles.map((tile) => (
						<BentoCard key={tile.title} tile={tile} />
					))}
				</motion.div>
			</div>
		</section>
	);
}
