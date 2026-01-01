import CTA from '@/components/landing/cta';
import FAQ from '@/components/landing/FAQ';
import FounderInsight from '@/components/landing/FounderInsight';
import Hero from '@/components/landing/hero';
import HowItWorks from '@/components/landing/steps';
import ImpactStats from '@/components/landing/ImpactStats';
import Industries from '@/components/landing/Industries';
import TechSpotlight from '@/components/landing/techSpotlight';
import Testimonials from '@/components/landing/testimonials';
import TrustBar from '@/components/landing/TrustBar';

export default function Page() {
	return (
		<main className='min-h-screen'>
			<Hero />
			<TrustBar />
			<TechSpotlight />
			<ImpactStats />
			<Industries />
			<HowItWorks />
			<div className='container px-6 mx-auto'>
				<Testimonials />
			</div>
			<FounderInsight />
			<FAQ />
			<CTA />
		</main>
	);
}
