import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TEAM_DEPARTMENTS } from '../_data/team-content';

const ACCENT_CLASSES = {
	mint: 'border-pastel-mint-border bg-pastel-mint/55',
	lilac: 'border-pastel-lilac-border bg-pastel-lilac/55',
	sky: 'border-pastel-sky-border bg-pastel-sky/55',
	peach: 'border-pastel-peach-border bg-pastel-peach/55',
	lime: 'border-pastel-lime-border bg-pastel-lime/55',
} as const;

export function DepartmentExpertise() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<div className='mx-auto max-w-3xl text-center'>
				<p className='inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
					Department Expertise
				</p>
				<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
					Teams organized around how modern programs actually run
				</h2>
				<p className='mt-3 text-base leading-relaxed text-muted-foreground'>
					Every department maps back to an active service line so strategy, execution, reporting, and delivery move together.
				</p>
			</div>

			<div className='mt-10 grid gap-5 lg:grid-cols-5'>
				{TEAM_DEPARTMENTS.map((department) => (
					<Link
						key={department.name}
						href={department.href}
						className={`group flex min-h-72 flex-col rounded-3xl border p-5 transition-transform duration-200 hover:-translate-y-1 ${ACCENT_CLASSES[department.accent]}`}>
						<div className='flex items-start justify-between gap-3'>
							<h3 className='text-lg font-semibold text-foreground'>{department.name}</h3>
							<ArrowRight className='size-4 text-foreground transition-transform duration-200 group-hover:translate-x-1' />
						</div>
						<p className='mt-3 text-sm leading-relaxed text-muted-foreground'>{department.description}</p>
						<ul className='mt-5 flex flex-1 flex-col gap-2 text-sm text-foreground/85'>
							{department.points.map((point) => (
								<li key={point} className='rounded-2xl border border-background/70 bg-background/70 px-3 py-2'>
									{point}
								</li>
							))}
						</ul>
					</Link>
				))}
			</div>
		</section>
	);
}
