'use client';

import React from 'react';
import { cn } from '@workspace/ui/lib/utils';

export interface TimelineEntry {
	title: string;
	content: React.ReactNode;
}

interface TimelineProps {
	title: string;
	description?: string;
	data: TimelineEntry[];
	className?: string;
}

const PASTEL_THEMES = [
	{
		name: 'mint',
		bg: 'bg-pastel-mint border-pastel-mint-border',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'text-slate-900 dark:text-slate-50',
		watermark: 'text-pastel-mint-strong',
	},
	{
		name: 'sky',
		bg: 'bg-pastel-sky border-pastel-sky-border',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'text-slate-900 dark:text-slate-50',
		watermark: 'text-pastel-sky-strong',
	},
	{
		name: 'lilac',
		bg: 'bg-pastel-lilac border-pastel-lilac-border',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'text-slate-900 dark:text-slate-50',
		watermark: 'text-pastel-lilac-strong',
	},
	{
		name: 'peach',
		bg: 'bg-pastel-peach border-pastel-peach-border',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'text-slate-900 dark:text-slate-50',
		watermark: 'text-pastel-peach-strong',
	},
	{
		name: 'blush',
		bg: 'bg-pastel-blush border-pastel-blush-border',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'text-slate-900 dark:text-slate-50',
		watermark: 'text-pastel-blush-strong',
	},
	{
		name: 'lime',
		bg: 'bg-pastel-lime border-pastel-lime-border',
		text: 'text-slate-700 dark:text-slate-300',
		accent: 'text-slate-900 dark:text-slate-50',
		watermark: 'text-pastel-lime-strong',
	},
];

const colSpanClasses: Record<number, string> = {
	4: 'md:col-span-4',
	5: 'md:col-span-5',
	7: 'md:col-span-7',
	8: 'md:col-span-8',
	12: 'md:col-span-12',
};

const getColSpan = (idx: number, total: number) => {
	if (total === 1) return 12;
	if (idx === total - 1 && total % 2 !== 0) {
		return 12;
	}
	const patternIndex = idx % 4;
	if (patternIndex === 0) return 7;
	if (patternIndex === 1) return 5;
	if (patternIndex === 2) return 8;
	return 4;
};

export const Timeline = ({ title, description, data, className }: TimelineProps) => {
	return (
		<div className={cn('w-full rounded-3xl bg-background font-body', className)}>
			{/* Title and Header Section */}
			<div className='mx-auto max-w-3xl px-6 py-12 md:py-16 text-center'>
				<h2 className='text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground mb-4'>
					{title}
				</h2>
				{description && (
					<p className='text-lg text-muted-foreground font-body max-w-2xl mx-auto'>
						{description}
					</p>
				)}
			</div>

			{/* Bento Grid */}
			<div className='mx-auto max-w-7xl px-6 pb-16 md:px-12'>
				<div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
					{data.map((item, idx) => {
						const theme = PASTEL_THEMES[idx % PASTEL_THEMES.length] || PASTEL_THEMES[0]!;
						const span = getColSpan(idx, data.length);
						const colSpanClass = colSpanClasses[span] || 'md:col-span-6';
						const formattedNumber = String(idx + 1).padStart(2, '0');

						return (
							<div
								key={item.title + idx}
								style={{
									'--bullet-color': `var(--pastel-${theme.name}-strong)`,
								} as React.CSSProperties}
								className={cn(
									'relative overflow-hidden rounded-3xl border p-8 md:p-10 shadow-sm transition-all duration-300',
									'hover:shadow-lg hover:-translate-y-1 group flex flex-col justify-between min-h-[300px]',
									theme.bg,
									colSpanClass
								)}
							>
								{/* Massive Background Number Watermark */}
								<span
									className={cn(
										'absolute -bottom-10 -right-4 font-heading text-[10rem] font-extrabold opacity-[0.06] select-none pointer-events-none transition-transform duration-500 group-hover:scale-105',
										theme.watermark
									)}
								>
									{formattedNumber}
								</span>

								<div className='relative z-10 w-full h-full flex flex-col justify-between gap-6'>
									<div className='w-full'>
										<h3 className={cn('text-xl md:text-2xl font-heading font-bold mb-4', theme.accent)}>
											{item.title}
										</h3>

										{/* Content Wrapper */}
										<div
											className={cn(
												'font-body text-foreground/80 text-sm leading-relaxed',
												theme.text,
												// Typography and layout constraints for sub-elements
												'[&_p]:font-medium [&_p]:text-foreground/90 [&_p]:text-base [&_p]:leading-relaxed',
												'[&_ul]:mt-4 [&_ul]:space-y-3',
												'[&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-foreground/80 [&_li]:text-sm [&_li]:mt-2',
												// Custom bullet style overriding default dots
												'[&_li_span]:w-1.5 [&_li_span]:h-1.5 [&_li_span]:rounded-full [&_li_span]:mt-1.5 [&_li_span]:shrink-0 [&_li_span]:block',
												'[&_li_span]:bg-(--bullet-color)!'
											)}
										>
											{item.content}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
