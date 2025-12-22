import { Hero } from '@/components/landing/hero';
import Testimonials from '@/components/landing/testimonials';

export default function Page() {
	return (
		<>
			<main className='min-h-screen'>
				<div className='px-0 sm:px-6 mx-auto '>
					<Hero />
				</div>
				<div className='container px-6 mx-auto'>
					<Testimonials />
				</div>
			</main>
		</>
	);
}
