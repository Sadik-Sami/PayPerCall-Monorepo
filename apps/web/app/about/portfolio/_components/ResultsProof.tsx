import { TestimonialsSection } from '@/components/sections/services/shared/TestimonialsSection';
import { PORTFOLIO_OUTCOME_CARDS, PORTFOLIO_TESTIMONIALS } from '../_data/portfolio-content';
import { Card, CardContent } from '@workspace/ui/components/card';
import { PORTFOLIO_CAPABILITIES } from '../_data/portfolio-content';

export function ResultsProof() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<div className='mx-auto max-w-3xl text-center'>
				<p className='inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
					Results
				</p>
				<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
					Portfolio-style proof without unverified claims
				</h2>
				<p className='mt-3 text-base leading-relaxed text-muted-foreground'>
					The value shows up when acquisition, delivery, and reporting stop operating in separate silos.
				</p>
			</div>

			<div className='mt-10 grid gap-5 md:grid-cols-3'>
				{PORTFOLIO_OUTCOME_CARDS.map((outcome) => (
					<Card key={outcome.title} className='h-full rounded-3xl border-border/70 bg-card/90'>
						<CardContent className='flex h-full flex-col p-6'>
							<h3 className='text-lg font-semibold text-foreground'>{outcome.title}</h3>
							<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{outcome.description}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className='mt-16'>
				<TestimonialsSection
					testimonials={PORTFOLIO_TESTIMONIALS}
					variant='featured'
					title='What clients notice once the platform is connected'
					description='The value shows up when acquisition, delivery, and reporting stop operating in separate silos.'
				/>
			</div>
		</section>
	);
}