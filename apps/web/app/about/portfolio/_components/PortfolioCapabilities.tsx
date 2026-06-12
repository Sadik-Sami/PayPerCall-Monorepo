import { ServiceCards } from '@workspace/ui/components/sections/service-cards';
import { SectionHeader } from '@workspace/ui/components/sections/section-header';
import { PORTFOLIO_CAPABILITIES } from '../_data/portfolio-content';

export function PortfolioCapabilities() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<SectionHeader
				badge='What We Do'
				title='Portfolio capabilities'
				subtitle='Six service lines that cover the full revenue workflow from intent capture to conversion and follow-through.'
			/>
			<div className='mt-10'>
				<ServiceCards services={PORTFOLIO_CAPABILITIES} columns={3} />
			</div>
		</section>
	);
}