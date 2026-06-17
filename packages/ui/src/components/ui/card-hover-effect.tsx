'use client';

import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

const CARD_THEMES = [
	{
		bg: 'bg-pastel-mint hover:bg-pastel-mint/80 border-pastel-mint-border',
		title: 'text-slate-900 dark:text-slate-50',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'bg-pastel-mint-ink',
	},
	{
		bg: 'bg-pastel-sky hover:bg-pastel-sky/80 border-pastel-sky-border',
		title: 'text-slate-900 dark:text-slate-50',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'bg-pastel-sky-ink',
	},
	{
		bg: 'bg-pastel-lilac hover:bg-pastel-lilac/80 border-pastel-lilac-border',
		title: 'text-slate-900 dark:text-slate-50',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'bg-pastel-lilac-ink',
	},
	{
		bg: 'bg-pastel-peach hover:bg-pastel-peach/80 border-pastel-peach-border',
		title: 'text-slate-900 dark:text-slate-50',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'bg-pastel-peach-ink',
	},
	{
		bg: 'bg-pastel-blush hover:bg-pastel-blush/80 border-pastel-blush-border',
		title: 'text-slate-900 dark:text-slate-50',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'bg-pastel-blush-ink',
	},
	{
		bg: 'bg-pastel-lime hover:bg-pastel-lime/80 border-pastel-lime-border',
		title: 'text-slate-900 dark:text-slate-50',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'bg-pastel-lime-ink',
	},
];

export const HoverEffect = ({
	items,
	className,
}: {
	items: {
		id?: string | number;
		title: string;
		description: string;
		link?: string;
	}[];
	className?: string;
}) => {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4', className)}>
			{items.map((item, idx) => {
				const key = item.id ?? item.title ?? idx;
				const theme = CARD_THEMES[idx % CARD_THEMES.length] || CARD_THEMES[0]!;

				return (
					<a
						href={item?.link || '#'}
						key={key}
						className='relative group block p-2 h-full w-full'
						onMouseEnter={() => setHoveredIndex(idx)}
						onMouseLeave={() => setHoveredIndex(null)}
					>
						<AnimatePresence>
							{hoveredIndex === idx && (
								<motion.span
									className='absolute inset-0 h-full w-full block rounded-3xl bg-slate-200 dark:bg-slate-800/80'
									layoutId='hoverBackground'
									initial={{ opacity: 0 }}
									animate={{
										opacity: 1,
										transition: { duration: 0.15 },
									}}
									exit={{
										opacity: 0,
										transition: { duration: 0.15, delay: 0.2 },
									}}
								/>
							)}
						</AnimatePresence>

						<Card className={cn(theme.bg)}>
							{/* Themed Accent dot next to Card Title */}
							<div className='flex items-center gap-3 mb-2'>
								<span className={cn('w-2 h-2 rounded-full shrink-0', theme.accent)} />
								<CardTitle className={cn(theme.title)}>{item.title}</CardTitle>
							</div>
							<CardDescription className={cn(theme.text)}>{item.description}</CardDescription>
						</Card>
					</a>
				);
			})}
		</div>
	);
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return (
		<div
			className={cn(
				'rounded-3xl h-full w-full p-6 md:p-8 overflow-hidden bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 relative z-20 shadow-sm transition-all duration-300',
				className
			)}
		>
			<div className='relative z-50 h-full'>{children}</div>
		</div>
	);
};

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return (
		<h4 className={cn('text-slate-900 dark:text-slate-100 font-heading font-extrabold tracking-tight text-lg md:text-xl', className)}>
			{children}
		</h4>
	);
};

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return (
		<p className={cn('mt-3 text-slate-600 dark:text-slate-400 font-body text-sm leading-relaxed', className)}>
			{children}
		</p>
	);
};
