import Link from 'next/link';
import { ArrowRight, Layers3 } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { WHY_US_SERVICE_CHIPS } from '../_data/why-us-content';

export function WhyUsHero() {
	return (
		<section className='relative overflow-hidden border-b border-border/60 bg-background py-16 sm:py-20 md:py-24'>
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute left-0 top-12 size-52 rounded-full bg-pastel-peach/35 blur-3xl' />
				<div className='absolute right-0 top-10 size-64 rounded-full bg-pastel-sky/35 blur-3xl' />
				<div className='absolute bottom-4 left-1/2 size-56 -translate-x-1/2 rounded-full bg-pastel-lilac/35 blur-3xl' />
			</div>

			<div className='section-container relative z-10'>
				<div className='mx-auto max-w-4xl text-center'>
					<div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary'>
						<Layers3 className='size-4' />
						Why teams choose Core Closer
					</div>
					<h1 className='mt-6 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
						One partner for acquisition, conversion, and delivery
					</h1>
					<p className='mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
						Core Closer is built for teams that need more than isolated channel execution. We connect marketing, operations, and systems so growth is easier to scale and easier to explain.
					</p>

					<div className='mt-7 flex flex-wrap items-center justify-center gap-2'>
						{WHY_US_SERVICE_CHIPS.map((chip) => (
							<span key={chip} className='rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-sm text-foreground'>
								{chip}
							</span>
						))}
					</div>

					<div className='mt-8 flex justify-center'>
						<Button asChild size='lg' className='rounded-xl px-7'>
							<Link href='/contact'>
								Start a strategy conversation
								<ArrowRight className='size-4' data-icon='inline-end' />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
