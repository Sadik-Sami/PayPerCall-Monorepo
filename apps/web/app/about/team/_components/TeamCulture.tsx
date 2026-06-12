import { BarChart3, ShieldCheck, Target, Zap } from 'lucide-react';
import { Card, CardContent } from '@workspace/ui/components/card';
import { TEAM_VALUES } from '../_data/team-content';

const ICON_MAP = {
	Target,
	BarChart3,
	ShieldCheck,
	Zap,
} as const;

const ACCENT_CLASSES = {
	mint: 'border-pastel-mint-border bg-pastel-mint/55',
	lilac: 'border-pastel-lilac-border bg-pastel-lilac/55',
	sky: 'border-pastel-sky-border bg-pastel-sky/55',
	peach: 'border-pastel-peach-border bg-pastel-peach/55',
} as const;

export function TeamCulture() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<div className='mx-auto max-w-3xl text-center'>
				<p className='inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
					Operating Principles
				</p>
				<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
					How the team works when programs are live
				</h2>
				<p className='mt-3 text-base leading-relaxed text-muted-foreground'>
					The culture is practical: clear metrics, reliable operations, fast iteration, and accountability around client outcomes.
				</p>
			</div>

			<div className='mt-10 grid gap-5 md:grid-cols-2'>
				{TEAM_VALUES.map((value) => {
					const Icon = ICON_MAP[value.icon];
					return (
						<Card key={value.title} className={`rounded-3xl border-border/70 bg-card/90 ${ACCENT_CLASSES[value.accent]}`}>
							<CardContent className='flex gap-4 p-6'>
								<div className='inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-background/70 bg-background/70'>
									<Icon className='size-5 text-primary' />
								</div>
								<div>
									<h3 className='text-lg font-semibold text-foreground'>{value.title}</h3>
									<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{value.description}</p>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</section>
	);
}
