import { MessageSquareQuote, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';

const TESTIMONIALS_TRUST_PILLS = ['200+ client teams', '4.8/5 satisfaction', '10+ industries'];

export function TestimonialsHero() {
	return (
		<section className='relative overflow-hidden border-b border-border/60 bg-background py-16 sm:py-20 md:py-24'>
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute left-0 top-10 size-56 rounded-full bg-pastel-mint/40 blur-3xl' />
				<div className='absolute right-0 top-12 size-64 rounded-full bg-pastel-sky/35 blur-3xl' />
				<div className='absolute bottom-0 left-1/2 size-52 -translate-x-1/2 rounded-full bg-pastel-lilac/35 blur-3xl' />
			</div>

			<div className='section-container relative z-10'>
				<div className='mx-auto max-w-4xl text-center'>
					<div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary'>
						<MessageSquareQuote className='size-4' />
						Client Success Stories
					</div>
					<h1 className='mt-6 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
						Real results from teams who chose Core Closer
					</h1>
					<p className='mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
						Hear from organizations across insurance, legal, healthcare, home services, financial, and B2B sectors
						who trust Core Closer for performance marketing and delivery.
					</p>

					<div className='mt-7 flex flex-wrap items-center justify-center gap-2 text-sm'>
						{TESTIMONIALS_TRUST_PILLS.map((item) => (
							<span
								key={item}
								className='inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-foreground'>
								<CheckCircle2 className='size-4 text-primary' />
								{item}
							</span>
						))}
					</div>

					<div className='mt-8 flex justify-center'>
						<Button asChild size='lg' className='rounded-xl px-7'>
							<Link href='/contact'>
								Start your success story
								<ArrowRight className='size-4' data-icon='inline-end' />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
