import Link from 'next/link';
import { cn } from '@workspace/ui/lib/utils';
import type { CaseStudyStripProps } from './types';
import { Button } from '@workspace/ui/components/button';
import { ArrowUpRight } from 'lucide-react';

export function CaseStudyStrip({ items, title, description, className }: CaseStudyStripProps) {
	return (
		<section className={cn('space-y-8', className)}>
			<div className='space-y-2'>
				{title ?
					<h2 className='text-2xl font-semibold text-foreground'>{title}</h2>
				:	null}
				{description ?
					<p className='text-muted-foreground'>{description}</p>
				:	null}
			</div>
			<div className='grid gap-6 md:grid-cols-3'>
				{items.map((item, index) => {
					const sparkTemplate = [45, 65, 40, 80, 55, 70, 35, 90, 60, 85, 45, 65, 40, 80, 55, 70, 35, 90, 60, 85, 45, 65, 40, 80, 55, 70, 35, 90];
					return (
						<div
							key={`${item.client}-${item.problem}`}
							className='group h-full rounded-3xl border border-primary/10 bg-linear-to-br from-background to-primary/5 p-6 shadow-lg shadow-primary/5'>
							<div className='flex items-center gap-3 text-primary'>
								<div className='flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
									{item.icon ?? <ArrowUpRight className='size-4' />}
								</div>
								<div>
									<p className='text-xs font-semibold uppercase tracking-wide text-primary/80'>
										{item.industry ?? 'B2B'}
									</p>
									<p className='text-lg font-semibold text-foreground'>{item.client ?? 'Confidential Client'}</p>
								</div>
							</div>
							<div className='mt-5 space-y-3 text-sm text-muted-foreground'>
								<div>
									<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground/80'>Problem</p>
									<p>{item.problem}</p>
								</div>
								<div>
									<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground/80'>Solution</p>
									<p>{item.solution}</p>
								</div>
								<div>
									<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground/80'>Outcome</p>
									<p>{item.outcome}</p>
								</div>
							</div>
							{item.metrics?.length ?
								<div className='mt-5 grid grid-cols-2 gap-3'>
									{item.metrics.map((metric) => (
										<div
											key={metric.label}
											className='rounded-2xl bg-white/70 p-3 text-sm font-semibold text-slate-900 dark:bg-slate-900/60 dark:text-slate-100'>
											<p className='text-2xl font-bold text-primary'>{metric.value}</p>
											<p className='text-xs uppercase tracking-wide text-muted-foreground'>{metric.label}</p>
											{metric.helperText ?
												<p className='text-[11px] text-muted-foreground'>{metric.helperText}</p>
											:	null}
										</div>
									))}
								</div>
							:	null}
							<div className='mt-6 flex h-20 items-end gap-2 rounded-2xl bg-linear-to-t from-primary/20 to-transparent p-3'>
								{sparkTemplate.map((height, idx) => (
									<span
										key={idx}
										className='w-2 rounded-full bg-primary/70'
										style={{ height: `${Math.min(95, height + ((index * 7 + idx * 5) % 25))}%` }}
									/>
								))}
							</div>
							{item.link ?
								<Button asChild variant='link' className='mt-4 px-0 text-primary'>
									<Link href={item.link}>View case study</Link>
								</Button>
							:	null}
						</div>
					);
				})}
			</div>
		</section>
	);
}
