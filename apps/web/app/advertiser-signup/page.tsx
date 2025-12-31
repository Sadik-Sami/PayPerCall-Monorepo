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
			<div className='max-w-7xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-4 relative'>
				{/* Content Section */}
				<div className='space-y-8 mb-12 md:sticky md:top-24 md:self-start md:h-fit'>
					<div className='space-y-4'>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight leading-tighter'>
							Advertiser Signup
						</h1>
						<p className='text-xl text-muted-foreground leading-relaxed'>
							Our team is passionate about creating tailored solutions that achieve your brand&apos;s unique goals and
							maximize your ROAS.
						</p>
					</div>

					<div className='space-y-6 text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto'>
						<p>
							We&apos;ll utilize our vast network of vetted, expert affiliates to put your product or service in front
							of new, targeted audiences. You&apos;ll only pay for the actions that matter to your business, whether
							that&apos;s sales, sign-ups, installs or anything else you deem essential to its growth.
						</p>
						<p className='font-medium text-foreground'>
							Let us design the one of one performance marketing strategy that your brand deserves.
						</p>
					</div>

					<ul className='max-w-3xl mx-auto'>
						{benefits.map((benefit, index) => (
							<li key={index} className='flex items-start gap-2 mb-2'>
								<CheckCircle2 className='w-6 h-6 text-primary mt-0.5 shrink-0' />
								<span className='text-lg font-medium'>{benefit}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Form Section */}
				<div className='bg-card border border-border rounded-xl p-6 md:p-8 lg:p-10 shadow-sm'>
					<AdvertiserSignupForm />
				</div>
			</div>
		</main>
	);
}
