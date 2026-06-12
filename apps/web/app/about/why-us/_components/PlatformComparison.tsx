import { SectionHeader } from '@workspace/ui/components/sections/section-header';
import { ComparisonTable } from '@workspace/ui/components/sections/comparison-table';
import { WHY_US_COMPARISON_ROWS } from '../_data/why-us-content';

export function PlatformComparison() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<SectionHeader
				badge='Comparison'
				title='How Core Closer compares'
				highlight='across the platform'
				subtitle='The difference is not just channel access. It is the ability to connect strategy, delivery, and technical execution in one working model.'
			/>
			<ComparisonTable rows={WHY_US_COMPARISON_ROWS} usLabel='Core Closer' othersLabel='Typical Vendors' className='rounded-3xl border-border/70 bg-card/90' />
		</section>
	);
}
