import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function WhyUsCrossLink() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<div className='rounded-3xl border border-pastel-sky-border bg-pastel-sky/45 p-8 sm:p-10'>
				<p className='text-xs font-semibold uppercase tracking-[0.18em] text-pastel-sky-ink'>Meet the team</p>
				<div className='mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
					<div className='max-w-2xl'>
						<h2 className='font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
							Meet the people behind the results
						</h2>
						<p className='mt-3 text-base leading-relaxed text-muted-foreground'>
							See the operators responsible for planning, optimization, engineering, and managed delivery.
						</p>
					</div>
					<Link
						href='/about/team'
						className='inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary'>
						Visit Team
						<ArrowRight className='size-4' />
					</Link>
				</div>
			</div>
		</section>
	);
}
