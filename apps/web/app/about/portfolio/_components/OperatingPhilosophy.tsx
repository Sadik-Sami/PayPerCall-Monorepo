import { Target, BarChart3, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@workspace/ui/components/card';
import { PORTFOLIO_PHILOSOPHY_CARDS } from '../_data/portfolio-content';

const ICON_MAP = {
	Target,
	BarChart3,
	ShieldCheck,
} as const;

const ACCENT_CLASSES = {
	mint: 'border-pastel-mint-border bg-pastel-mint/55',
	lilac: 'border-pastel-lilac-border bg-pastel-lilac/55',
	sky: 'border-pastel-sky-border bg-pastel-sky/55',
	peach: 'border-pastel-peach-border bg-pastel-peach/55',
} as const;

export function OperatingPhilosophy() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<div className='mx-auto max-w-3xl text-center'>
				<p className='inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
					Operating Philosophy
				</p>
				<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
					We believe growth should be measurable, operational, and accountable
				</h2>
				<p className='mt-3 text-base leading-relaxed text-muted-foreground'>
					Core Closer was built for teams that need more than isolated channel execution. The company combines
					strategy, delivery, reporting, and technical implementation so every growth decision connects back to
					qualified outcomes.
				</p>
			</div>

			<div className='mt-10 grid gap-5 md:grid-cols-3'>
				{PORTFOLIO_PHILOSOPHY_CARDS.map((card) => {
					const Icon = ICON_MAP[card.icon];
					return (
						<Card
							key={card.title}
							className={`h-full rounded-3xl border-border/70 bg-card/90 transition-transform duration-200 hover:-translate-y-1 ${ACCENT_CLASSES[card.accent]}`}>
							<CardContent className='flex h-full flex-col gap-4 p-6'>
								<div className='inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-background/70 bg-background/70'>
									<Icon className='size-5 text-primary' />
								</div>
								<div>
									<h3 className='text-lg font-semibold text-foreground'>{card.title}</h3>
									<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{card.description}</p>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</section>
	);
}