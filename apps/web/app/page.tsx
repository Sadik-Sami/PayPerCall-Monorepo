import CTA from '@/components/landing/cta';
import FAQ from '@/components/landing/FAQ';
import FounderInsight from '@/components/landing/FounderInsight';
import { Hero } from '@/components/landing/hero';
import ImpactStats from '@/components/landing/ImpactStats';
import Services from '@/components/landing/services';
import FeatureSteps from '@/components/landing/steps';
import { TechCloud } from '@/components/landing/TechCloud';
import Testimonials from '@/components/landing/testimonials';

export default function Page() {
	return (
		<>
			<main className='min-h-screen'>
				<div className='px-0 sm:px-6 mx-auto '>
					<Hero />
				</div>
				<TechCloud />
				<Services />
				<ImpactStats />
				<FeatureSteps />
				<FounderInsight />
				<div className='container px-6 mx-auto'>
					<Testimonials />
				</div>
				<FAQ/>
				<CTA />
			</main>
		</>
	);
}
