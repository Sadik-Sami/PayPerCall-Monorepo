import { AdvertiserSignupForm } from './_components/advertiserSignupForm';
import { CheckCircle2 } from 'lucide-react';

export const metadata = {
	title: 'Advertiser Sign Up | Performance Marketing Solutions',
	description:
		'Join our network of elite advertisers and maximize your ROAS with tailored performance marketing strategies.',
};

export default function AdvertiserSignupPage() {
	const benefits = [
		'Highest quality leads vetted 24/7.',
		'Robust compliance and anti-fraud technology (FraudBlock™).',
		'Proprietary tracking and reporting software.',
		'Dedicated Account Management Team.',
	];

	return (
		<main className='min-h-screen bg-background font-body'>
			<div className='max-w-7xl mx-auto px-4 py-16 md:py-24'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start'>
					{/* Left Column: Content */}
					<div className='lg:sticky lg:top-24 space-y-8'>
						<div className='space-y-4'>
							<h1 className='text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight leading-tighter'>
								Advertiser Signup
							</h1>
							<p className='text-xl text-muted-foreground leading-relaxed'>
								Our team is passionate about creating tailored solutions that achieve your brand’s unique goals and
								maximize your ROAS.
							</p>
						</div>

						<div className='space-y-6 text-lg text-foreground/80 leading-relaxed'>
							<p>
								We’ll utilize our vast network of vetted, expert affiliates to put your product or service in front of
								new, targeted audiences. You’ll only pay for the actions that matter to your business, whether that’s
								sales, sign-ups, installs or anything else you deem essential to its growth.
							</p>
							<p className='font-medium text-foreground'>
								Let us design the one of one performance marketing strategy that your brand deserves.
							</p>
						</div>

						<ul className='space-y-4'>
							{benefits.map((benefit, index) => (
								<li key={index} className='flex items-start gap-3'>
									<CheckCircle2 className='w-6 h-6 text-primary mt-0.5 shrink-0' />
									<span className='text-lg font-medium'>{benefit}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Right Column: Multi-step Form */}
					<div className='bg-card border border-border rounded-xl p-6 md:p-8 lg:p-10 shadow-sm'>
						<AdvertiserSignupForm />
					</div>
				</div>
			</div>
		</main>
	);
}
