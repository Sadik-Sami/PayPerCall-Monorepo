import { Metadata } from 'next';
import { AdvertiserSignupForm } from './_components/advertiserSignupForm';
import { CheckCircle2, Trophy, Zap, BarChart3 } from 'lucide-react';

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

const benefits = [
	{
		icon: Trophy,
		title: 'Top-Tier Commissions',
		description: 'Access exclusive offers with the highest payouts in the industry.',
	},
	{
		icon: Zap,
		title: 'Weekly Payouts',
		description: 'Reliable, on-time payments so you can reinvest and scale faster.',
	},
	{
		icon: BarChart3,
		title: 'Real-Time Tracking',
		description: 'Advanced dashboard to track your clicks, leads, and revenue live.',
	},
];

export default function advertiserSignup() {
	return (
		<main className='min-h-screen bg-linear-to-br from-background via-muted/30 to-background'>
			<div className='container mx-auto px-4 py-8 sm:py-12 lg:py-16'>
				<div className='grid lg:grid-cols-12 gap-12 items-start'>
					{/* Left Column: Sticky Content */}
					<div className='lg:col-span-5 lg:sticky lg:top-24 space-y-8'>
						<div className='space-y-4'>
							<div className='inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-2'>
								<span className='flex h-2 w-2 rounded-full bg-primary mr-2'></span>
								Accepting New Partners
							</div>
							<h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-foreground'>
								Scale Your Traffic With Us
							</h1>
							<p className='text-lg text-muted-foreground leading-relaxed'>
								Join a network designed for performance marketers. We connect you with high-converting offers across
								insurance, solar, and finance verticals.
							</p>
						</div>

						<div className='space-y-6 pt-4'>
							{benefits.map((item, idx) => (
								<div
									key={idx}
									className='flex gap-4 items-start p-4 rounded-lg bg-card border border-border/50 shadow-sm'>
									<div className='bg-primary/10 p-2.5 rounded-md text-primary shrink-0'>
										<item.icon className='w-6 h-6' />
									</div>
									<div>
										<h3 className='font-semibold text-foreground'>{item.title}</h3>
										<p className='text-sm text-muted-foreground mt-1'>{item.description}</p>
									</div>
								</div>
							))}
						</div>

						<div className='pt-6 border-t border-border'>
							<div className='flex items-center gap-2 text-sm text-muted-foreground'>
								<CheckCircle2 className='w-4 h-4 text-green-500' />
								<span>Simple application process</span>
								<span className='mx-2'>•</span>
								<CheckCircle2 className='w-4 h-4 text-green-500' />
								<span>Approval within 24 hours</span>
							</div>
						</div>
					</div>

					{/* Right Column: Form */}
					<div className='lg:col-span-7'>
						<AdvertiserSignupForm />
					</div>
				</div>
			</div>
		</main>
	);
}
