import { cn } from '@workspace/ui/lib/utils';
import { Clock, Database, GitBranch, ArrowUpRight } from 'lucide-react';
import type { SuccessOutcome } from '@/components/sections/services';
import React from 'react';

const ICONS: Record<string, React.ElementType> = {
	clock: Clock,
	database: Database,
	gitBranch: GitBranch,
	default: ArrowUpRight,
};

// "Blueprint" intense solid pastel themes
const BLUEPRINT_THEMES = [
	{
		bg: 'bg-pastel-mint',
		border: 'border-pastel-mint-border',
		iconBg: 'bg-pastel-mint-ink',
		iconText: 'text-white',
		numberColor: 'text-pastel-mint-strong',
		titleColor: 'text-slate-900 dark:text-slate-50',
		descColor: 'text-slate-700 dark:text-slate-300',
	},
	{
		bg: 'bg-pastel-sky',
		border: 'border-pastel-sky-border',
		iconBg: 'bg-pastel-sky-ink',
		iconText: 'text-white',
		numberColor: 'text-pastel-sky-strong',
		titleColor: 'text-slate-900 dark:text-slate-50',
		descColor: 'text-slate-700 dark:text-slate-300',
	},
	{
		bg: 'bg-pastel-lilac',
		border: 'border-pastel-lilac-border',
		iconBg: 'bg-pastel-lilac-ink',
		iconText: 'text-white',
		numberColor: 'text-pastel-lilac-strong',
		titleColor: 'text-slate-900 dark:text-slate-50',
		descColor: 'text-slate-700 dark:text-slate-300',
	},
	{
		bg: 'bg-pastel-peach',
		border: 'border-pastel-peach-border',
		iconBg: 'bg-pastel-peach-ink',
		iconText: 'text-white',
		numberColor: 'text-pastel-peach-strong',
		titleColor: 'text-slate-900 dark:text-slate-50',
		descColor: 'text-slate-700 dark:text-slate-300',
	},
];

export function PastelBentoGrid({
	outcomes,
	className,
}: {
	outcomes: SuccessOutcome[];
	className?: string;
}) {
	return (
		<div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
			{outcomes.map((outcome, idx) => {
				const Icon = (ICONS[outcome.icon as string] || ArrowUpRight) as React.ElementType;
				const theme = BLUEPRINT_THEMES[idx % BLUEPRINT_THEMES.length] || BLUEPRINT_THEMES[0]!;
				const formattedNumber = `0${idx + 1}`;
				
				return (
					<div
						key={idx}
						className={cn(
							"group relative overflow-hidden rounded-3xl p-8 transition-transform duration-300",
							"border",
							theme.bg,
							theme.border,
							"hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5",
							"md:col-span-1 flex flex-col justify-start"
						)}
					>
						{/* Massive Background Number */}
						<div className={cn(
							"absolute -top-6 -right-2 font-bold text-[8rem] leading-none opacity-40 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105",
							theme.numberColor
						)}>
							{formattedNumber}
						</div>

						{/* Solid Icon Badge */}
						<div className={cn("flex h-12 w-12 items-center justify-center rounded-full mb-8 shadow-sm relative z-10", theme.iconBg, theme.iconText)}>
							<Icon className="h-5 w-5" strokeWidth={2.5} />
						</div>

						<div className="space-y-3 relative z-10">
							<h3 className={cn("font-bold tracking-tight text-3xl md:text-4xl", theme.titleColor)}>
								{outcome.metric}
							</h3>
							<p className={cn("font-bold text-lg", theme.titleColor)}>
								{outcome.label}
							</p>

							<p className={cn("leading-relaxed text-base font-medium", theme.descColor)}>
								{outcome.description}
							</p>

							{outcome.context && (
								<div className={cn("pt-4 mt-4 border-t", theme.border)}>
									<p className={cn("text-sm font-medium", theme.descColor)}>
										{outcome.context}
									</p>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
