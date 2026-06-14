'use client';
import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

export interface Principle {
	number: string;
	title: string;
	description: string;
	accent: Accent;
}

export interface DesignPrinciplesProps {
	eyebrow: string;
	headline: string;
	description?: string;
	principles: Principle[];
	className?: string;
}

const STRIPE: Record<Accent, string> = {
	mint: 'bg-pastel-mint-strong',
	sky: 'bg-pastel-sky-strong',
	lilac: 'bg-pastel-lilac-strong',
	peach: 'bg-pastel-peach-strong',
	blush: 'bg-pastel-blush-strong',
	lime: 'bg-pastel-lime-strong',
};

const NUMBER_TEXT: Record<Accent, string> = {
	mint: 'text-pastel-mint-strong',
	sky: 'text-pastel-sky-strong',
	lilac: 'text-pastel-lilac-strong',
	peach: 'text-pastel-peach-strong',
	blush: 'text-pastel-blush-strong',
	lime: 'text-pastel-lime-strong',
};

export function DesignPrinciples({ eyebrow, headline, description, principles, className }: DesignPrinciplesProps) {
	return (
		<section className={cn('relative w-full overflow-hidden', className)}>
			<div className='section-container'>
				<div className='mx-auto mb-12 max-w-2xl text-center sm:mb-14'>
					<p className='text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>{eyebrow}</p>
					<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						{headline}
					</h2>
					{description && (
						<p className='mx-auto mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg'>
							{description}
						</p>
					)}
				</div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6'
				>
					{principles.map((p) => (
						<motion.article
							key={p.number}
							variants={itemVariants}
							className='group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-border/60 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8'
						>
							<span className={cn('absolute inset-x-0 top-0 h-1', STRIPE[p.accent])} />
							<span
								className={cn(
									'font-display text-6xl font-extrabold tracking-tighter leading-none sm:text-7xl',
									NUMBER_TEXT[p.accent],
								)}
							>
								{p.number}
							</span>
							<h3 className='font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl'>
								{p.title}
							</h3>
							<p className='text-sm leading-relaxed text-muted-foreground sm:text-[15px]'>{p.description}</p>
						</motion.article>
					))}
				</motion.div>
			</div>
		</section>
	);
}
