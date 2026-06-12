import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

const DEFAULT_BENEFITS = [
	'Focused strategy conversation',
	'Channel and delivery recommendations',
	'Transparent next-step planning',
];

interface AboutPageCtaProps {
	title: string;
	description: string;
	ctaLabel?: string;
	ctaHref?: string;
	benefits?: string[];
}

export function AboutPageCta({
	title,
	description,
	ctaLabel = 'Talk to the Core Closer team',
	ctaHref = '/contact',
	benefits = DEFAULT_BENEFITS,
}: AboutPageCtaProps) {
	return (
		<section className='section-container py-16 sm:py-20 md:py-24'>
			<div className='rounded-3xl border border-border/70 bg-card p-8 text-center sm:p-10 md:p-12'>
				<span className='inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
					Strategy Conversation
				</span>
				<h2 className='mt-5 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
					{title}
				</h2>
				<p className='mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
					{description}
				</p>

				<div className='mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground'>
					{benefits.map((benefit) => (
						<div key={benefit} className='inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1.5'>
							<CheckCircle2 className='size-4 text-primary' />
							<span>{benefit}</span>
						</div>
					))}
				</div>

				<div className='mt-8 flex justify-center'>
					<Button asChild size='lg' className='rounded-xl px-7'>
						<Link href={ctaHref}>
							{ctaLabel}
							<ArrowRight className='size-4' data-icon='inline-end' />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
