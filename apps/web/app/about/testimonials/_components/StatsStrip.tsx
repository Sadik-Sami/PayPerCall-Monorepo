import { StatsGrid } from '@workspace/ui/components/sections/stats-grid';
import { TESTIMONIAL_STATS } from '../_data/testimonials-content';

export function StatsStrip() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<StatsGrid stats={TESTIMONIAL_STATS} columns={4} />
		</section>
	);
}
