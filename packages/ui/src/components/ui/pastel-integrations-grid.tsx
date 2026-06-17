'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'motion/react';
import React from 'react';

export interface Integration {
	name: string;
	category: string;
	description?: string;
	icon?: React.ReactNode;
}

interface PastelIntegrationsGridProps {
	className?: string;
	title: string;
	description?: string;
	integrations: Integration[];
}

const CATEGORY_STYLES: Record<string, { badge: string; cardHover: string; ambientBg: string }> = {
	'SEO': {
		badge: 'bg-pastel-mint text-pastel-mint-ink dark:bg-pastel-mint-ink dark:text-pastel-mint ring-1 ring-pastel-mint/20 dark:ring-pastel-mint-ink/20',
		cardHover: 'hover:border-pastel-mint/50 dark:hover:border-pastel-mint/40 hover:shadow-pastel-mint/10 dark:hover:shadow-pastel-mint/5',
		ambientBg: 'from-pastel-mint/15 dark:from-pastel-mint/10',
	},
	'Platform': {
		badge: 'bg-pastel-sky text-pastel-sky-ink dark:bg-pastel-sky-ink dark:text-pastel-sky ring-1 ring-pastel-sky/20 dark:ring-pastel-sky-ink/20',
		cardHover: 'hover:border-pastel-sky/50 dark:hover:border-pastel-sky/40 hover:shadow-pastel-sky/10 dark:hover:shadow-pastel-sky/5',
		ambientBg: 'from-pastel-sky/15 dark:from-pastel-sky/10',
	},
	'Frontend': {
		badge: 'bg-pastel-peach text-pastel-peach-ink dark:bg-pastel-peach-ink dark:text-pastel-peach ring-1 ring-pastel-peach/20 dark:ring-pastel-peach-ink/20',
		cardHover: 'hover:border-pastel-peach/50 dark:hover:border-pastel-peach/40 hover:shadow-pastel-peach/10 dark:hover:shadow-pastel-peach/5',
		ambientBg: 'from-pastel-peach/15 dark:from-pastel-peach/10',
	},
	'Ecommerce': {
		badge: 'bg-pastel-lilac text-pastel-lilac-ink dark:bg-pastel-lilac-ink dark:text-pastel-lilac ring-1 ring-pastel-lilac/20 dark:ring-pastel-lilac-ink/20',
		cardHover: 'hover:border-pastel-lilac/50 dark:hover:border-pastel-lilac/40 hover:shadow-pastel-lilac/10 dark:hover:shadow-pastel-lilac/5',
		ambientBg: 'from-pastel-lilac/15 dark:from-pastel-lilac/10',
	},
	'Marketing': {
		badge: 'bg-pastel-peach text-pastel-peach-ink dark:bg-pastel-peach-ink dark:text-pastel-peach ring-1 ring-pastel-peach/20 dark:ring-pastel-peach-ink/20',
		cardHover: 'hover:border-pastel-peach/50 dark:hover:border-pastel-peach/40 hover:shadow-pastel-peach/10 dark:hover:shadow-pastel-peach/5',
		ambientBg: 'from-pastel-peach/15 dark:from-pastel-peach/10',
	},
	'Performance': {
		badge: 'bg-pastel-sky text-pastel-sky-ink dark:bg-pastel-sky-ink dark:text-pastel-sky ring-1 ring-pastel-sky/20 dark:ring-pastel-sky-ink/20',
		cardHover: 'hover:border-pastel-sky/50 dark:hover:border-pastel-sky/40 hover:shadow-pastel-sky/10 dark:hover:shadow-pastel-sky/5',
		ambientBg: 'from-pastel-sky/15 dark:from-pastel-sky/10',
	},
	'Security': {
		badge: 'bg-pastel-blush text-pastel-blush-ink dark:bg-pastel-blush-ink dark:text-pastel-blush ring-1 ring-pastel-blush/20 dark:ring-pastel-blush-ink/20',
		cardHover: 'hover:border-pastel-blush/50 dark:hover:border-pastel-blush/40 hover:shadow-pastel-blush/10 dark:hover:shadow-pastel-blush/5',
		ambientBg: 'from-pastel-blush/15 dark:from-pastel-blush/10',
	},
	'Data': {
		badge: 'bg-pastel-mint text-pastel-mint-ink dark:bg-pastel-mint-ink dark:text-pastel-mint ring-1 ring-pastel-mint/20 dark:ring-pastel-mint-ink/20',
		cardHover: 'hover:border-pastel-mint/50 dark:hover:border-pastel-mint/40 hover:shadow-pastel-mint/10 dark:hover:shadow-pastel-mint/5',
		ambientBg: 'from-pastel-mint/15 dark:from-pastel-mint/10',
	},
	'default': {
		badge: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 ring-1 ring-slate-200 dark:ring-slate-700',
		cardHover: 'hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-slate-200/10 dark:hover:shadow-slate-800/10',
		ambientBg: 'from-slate-100/50 dark:from-slate-800/30',
	},
};

export const PastelIntegrationsGrid = ({
	className,
	title,
	description,
	integrations,
}: PastelIntegrationsGridProps) => {
	return (
		<section className={cn('w-full', className)}>
			<div className="flex flex-col items-center text-center mb-12 md:mb-16">
				<h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-4">
					{title}
				</h2>
				{description && (
					<p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-body max-w-2xl">
						{description}
					</p>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{integrations.map((integration, idx) => {
					const style = CATEGORY_STYLES[integration.category] || CATEGORY_STYLES['default']!;

					return (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ duration: 0.4, delay: idx * 0.05 }}
							key={integration.name + idx}
							className={cn("group relative flex flex-col p-6 rounded-3xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 overflow-hidden", style.cardHover)}
						>
							{/* Ambient Color - Persistent Wash */}
							<div className={cn("absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-100 pointer-events-none transition-colors duration-300", style.ambientBg)} />

							<div className="relative z-10 mb-6 flex justify-between items-start">
								<div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
									{integration.icon ? integration.icon : <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700" />}
								</div>
								<span className={cn('text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm', style.badge)}>
									{integration.category}
								</span>
							</div>

							<h3 className="relative z-10 text-xl font-heading font-bold text-slate-900 dark:text-slate-50 mb-2">
								{integration.name}
							</h3>

							{integration.description && (
								<p className="relative z-10 text-slate-600 dark:text-slate-400 font-body text-sm leading-relaxed mt-auto">
									{integration.description}
								</p>
							)}
						</motion.div>
					);
				})}
			</div>
		</section>
	);
};
