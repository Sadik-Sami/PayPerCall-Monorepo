import { cn } from '@workspace/ui/lib/utils';
import type { ProcessStepsProps } from './types';

export function ProcessSteps({ steps, title, className }: ProcessStepsProps) {
	return (
		<section className={cn('space-y-6 rounded-3xl border border-primary/5 bg-gradient-to-br from-slate-900/5 to-primary/5 p-8', className)}>
			{title ? <h2 className='text-2xl font-semibold text-foreground'>{title}</h2> : null}
			<div className='grid gap-6 md:grid-cols-2'>
				{steps.map((step, index) => (
					<div key={step.title} className='space-y-4 rounded-2xl bg-background/90 p-6 shadow-sm shadow-primary/5'>
						<div className='flex items-center gap-4'>
							<div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-base font-semibold text-primary-foreground'>
								{String(index + 1).padStart(2, '0')}
							</div>
							<div>
								<p className='text-xs font-semibold uppercase tracking-wide text-primary/80'>Step {index + 1}</p>
								<h3 className='text-xl font-semibold text-foreground'>{step.title}</h3>
							</div>
						</div>
						<p className='text-sm text-muted-foreground'>{step.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}

