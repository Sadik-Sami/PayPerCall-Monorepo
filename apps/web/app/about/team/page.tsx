import type { Metadata } from 'next';
import ImpactStats from '@/components/sections/landing/ImpactStats';
import { AboutPageCta } from '@/components/sections/about/AboutPageCta';
import { DepartmentExpertise } from './_components/DepartmentExpertise';
import { LeadershipGrid } from './_components/LeadershipGrid';
import { TeamCrossLink } from './_components/TeamCrossLink';
import { TeamCulture } from './_components/TeamCulture';
import { TeamHero } from './_components/TeamHero';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Team | CoreCloser',
	description:
		'Meet the CoreCloser team behind acquisition strategy, managed operations, engineering, and client growth across performance marketing programs.',
	alternates: {
		canonical: '/about/team',
	},
	openGraph: {
		title: 'Team | CoreCloser',
		description:
			'See the operators behind CoreCloser’s pay-per-call, pay-per-lead, digital marketing, development, and managed call-center work.',
		url: '/about/team',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Team | CoreCloser',
		description: 'Meet the specialists behind CoreCloser’s revenue and delivery engine.',
	},
};

export default function TeamPage() {
	return (
		<main className='flex flex-col'>
			<TeamHero />
			<div className='bg-background'>
				<LeadershipGrid />
			</div>
			<div className='bg-muted/30'>
				<DepartmentExpertise />
			</div>
			<div className='bg-background'>
				<TeamCulture />
			</div>
			<div className='bg-muted/30'>
				<ImpactStats />
			</div>
			<div className='bg-background'>
				<TeamCrossLink />
			</div>
			<div className='bg-muted/30'>
				<AboutPageCta
					title='Need a team that can plan, launch, and scale with you?'
					description='Tell us where acquisition, conversion, or operational bottlenecks are showing up. We will map the right mix of services and delivery support.'
					ctaLabel='Start a strategy conversation'
				/>
			</div>
		</main>
	);
}
