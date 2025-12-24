import CTA from '@/components/landing/cta';
import { Hero } from '@/components/landing/hero';
import Services from '@/components/landing/services';
import FeatureSteps from '@/components/landing/steps';
import Testimonials from '@/components/landing/testimonials';

export default function Page() {
	return (
		<>
			<main className='min-h-screen'>
				<div className='px-0 sm:px-6 mx-auto '>
					<Hero />
				</div>
				<Services />
				<FeatureSteps />
				<div className='container px-6 mx-auto'>
					<Testimonials />
				</div>
				<CTA />
			</main>
		</>
	);
}
