import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

export interface CrossLinkBandProps {
	eyebrow: string;
	headline: string;
	description: string;
	cta: { label: string; href: string };
	accent?: Accent;
	className?: string;
}

const SURFACE: Record<Accent, { box: string; ink: string }> = {
	mint: { box: 'border-pastel-mint-border bg-pastel-mint/55', ink: 'text-pastel-mint-ink' },
	sky: { box: 'border-pastel-sky-border bg-pastel-sky/55', ink: 'text-pastel-sky-ink' },
	lilac: { box: 'border-pastel-lilac-border bg-pastel-lilac/55', ink: 'text-pastel-lilac-ink' },
	peach: { box: 'border-pastel-peach-border bg-pastel-peach/55', ink: 'text-pastel-peach-ink' },
	blush: { box: 'border-pastel-blush-border bg-pastel-blush/55', ink: 'text-pastel-blush-ink' },
	lime: { box: 'border-pastel-lime-border bg-pastel-lime/55', ink: 'text-pastel-lime-ink' },
};

export function CrossLinkBand({
	eyebrow,
	headline,
	description,
	cta,
	accent = 'sky',
	className,
}: CrossLinkBandProps) {
	const tone = SURFACE[accent];
	return (
		<section className={cn('section-container py-16 sm:py-20', className)}>
			<div className={cn('group rounded-3xl border p-8 sm:p-10', tone.box)}>
				<p className={cn('text-xs font-semibold uppercase tracking-[0.18em]', tone.ink)}>{eyebrow}</p>
				<div className='mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
					<div className='max-w-2xl'>
						<h2 className='font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
							{headline}
						</h2>
						<p className='mt-3 text-base leading-relaxed text-muted-foreground'>{description}</p>
					</div>
					<Link
						href={cta.href}
						className='inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border/70 bg-card/80 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-md md:self-auto'
					>
						{cta.label}
						<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
					</Link>
				</div>
			</div>
		</section>
	);
}
