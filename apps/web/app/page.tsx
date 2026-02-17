import CTA from '@/components/landing/cta';
import FAQ from '@/components/landing/FAQ';
import Hero from '@/components/landing/hero';
import HowItWorks from '@/components/landing/steps';
import ImpactStats from '@/components/landing/ImpactStats';
import Industries from '@/components/landing/Industries';
import TechSpotlight from '@/components/landing/techSpotlight';
import TrustBar from '@/components/landing/TrustBar';
import Testimonials from '@/components/landing/testimonials';
import Methodology from '@/components/landing/Methodology';

export default function Page() {
	return (
		<main className='min-h-screen'>
			<Hero />
			<TrustBar />
			<TechSpotlight />
			<ImpactStats />
			<Industries />
			<HowItWorks />
			<Testimonials />
			<Methodology />
			<FAQ />
			<CTA />
		</main>
	);
}
