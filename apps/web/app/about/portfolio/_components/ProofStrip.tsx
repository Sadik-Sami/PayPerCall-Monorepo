import { StatsGrid } from '@workspace/ui/components/sections/stats-grid';
import { PORTFOLIO_PROOF_STATS } from '../_data/portfolio-content';

export function ProofStrip() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<StatsGrid stats={PORTFOLIO_PROOF_STATS} columns={4} />
		</section>
	);
}