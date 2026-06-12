import { Code2, Phone, TrendingUp, Users } from 'lucide-react';
import { WHY_US_PILLARS } from '../_data/why-us-content';

const ICON_MAP = {
	Phone,
	Users,
	TrendingUp,
	Code2,
} as const;

const ACCENT_CLASSES = {
	mint: 'border-pastel-mint-border bg-pastel-mint/55',
	lilac: 'border-pastel-lilac-border bg-pastel-lilac/55',
	sky: 'border-pastel-sky-border bg-pastel-sky/55',
	peach: 'border-pastel-peach-border bg-pastel-peach/55',
} as const;

export function PlatformPillars() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<div className='mx-auto max-w-3xl text-center'>
				<p className='inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
					Platform Pillars
				</p>
				<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
					Built to support the full revenue workflow
				</h2>
				<p className='mt-3 text-base leading-relaxed text-muted-foreground'>
					From first touch to delivery and optimization, the model is designed to keep demand generation, conversion systems, and operations connected.
				</p>
			</div>

			<div className='mt-10 grid gap-5 lg:grid-cols-2'>
				{WHY_US_PILLARS.map((pillar) => {
					const Icon = ICON_MAP[pillar.icon];
					return (
						<article
							key={pillar.title}
							className={`rounded-3xl border p-6 transition-transform duration-200 hover:-translate-y-1 ${ACCENT_CLASSES[pillar.accent]}`}>
							<div className='flex items-start gap-4'>
								<div className='inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-background/70 bg-background/70'>
									<Icon className='size-5 text-primary' />
								</div>
								<div className='flex-1'>
									<h3 className='text-xl font-semibold text-foreground'>{pillar.title}</h3>
									<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{pillar.description}</p>
								</div>
							</div>
							<p className='mt-5 rounded-2xl border border-background/70 bg-background/70 px-4 py-3 text-sm font-medium text-foreground'>
								{pillar.outcome}
							</p>
							<ul className='mt-5 flex flex-col gap-2 text-sm text-muted-foreground'>
								{pillar.points.map((point) => (
									<li key={point} className='rounded-2xl border border-background/60 bg-background/60 px-3 py-2'>
										{point}
									</li>
								))}
							</ul>
						</article>
					);
				})}
			</div>
		</section>
	);
}
