import { Metadata } from 'next';
import { AdvertiserSignupForm } from './_components/advertiserSignupForm';

export const metadata: Metadata = {
	title: 'Affiliate Sign Up | Join Our Partner Program',
	description:
		'Apply to become an affiliate partner. Join our network to earn commissions on lead generation for insurance, solar, mortgage, and more.',
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: '/advertiser-signup',
	},
};

export default function advertiserSignup() {
	return (
		<main className='min-h-screen bg-background'>
			<div className='container mx-auto px-4 py-12 sm:py-16 lg:py-20'>
				<header className='text-center mb-10 sm:mb-12'>
					<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4'>
						Become an Affiliate Partner
					</h1>

					<p className='text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto'>
						Join our network and start earning commissions on high-quality leads across multiple verticals.
					</p>
				</header>

				<div className='max-w-7xl mx-auto'>
					<AdvertiserSignupForm />
				</div>
			</div>
		</main>
	);
}
