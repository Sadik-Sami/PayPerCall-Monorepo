import type { Metadata } from 'next';
import FAQ from '@/components/sections/shared/FAQ';
import { AboutPageCta } from '@/components/sections/about/AboutPageCta';
import { ComplianceTrust } from '@/app/about/why-us/_components/ComplianceTrust';
import { OperatingModel } from '@/app/about/why-us/_components/OperatingModel';
import { LeadershipGrid } from '@/app/about/team/_components/LeadershipGrid';
import { DepartmentExpertise } from '@/app/about/team/_components/DepartmentExpertise';
import { PortfolioHero } from './_components/PortfolioHero';
import { ProofStrip } from './_components/ProofStrip';
import { OperatingPhilosophy } from './_components/OperatingPhilosophy';
import { PortfolioCapabilities } from './_components/PortfolioCapabilities';
import { ResultsProof } from './_components/ResultsProof';
import { PortfolioCrossLinks } from './_components/PortfolioCrossLinks';
import { PORTFOLIO_FAQS, portfolioJsonLd } from './_data/portfolio-content';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'About Core Closer | Performance Growth and Delivery Partner',
	description:
		'Learn how Core Closer connects acquisition, pay-per-call delivery, pay-per-lead operations, digital marketing, engineering, reporting, and compliance for accountable growth.',
	alternates: {
		canonical: '/about/portfolio',
	},
	openGraph: {
		title: 'About Core Closer',
		description:
			'A performance partner for acquisition, delivery, reporting, and technical execution.',
		url: '/about/portfolio',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'About Core Closer',
		description: 'A performance partner for acquisition, delivery, reporting, and technical execution.',
	},
};

export default function PortfolioPage() {
	return (
		<>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }} />

			<main className='flex flex-col'>
				<PortfolioHero />
				<div className='bg-background'>
					<ProofStrip />
				</div>
				<div className='bg-muted/30'>
					<OperatingPhilosophy />
				</div>
				<div className='bg-background'>
					<PortfolioCapabilities />
				</div>
				<div className='bg-muted/30'>
					<OperatingModel />
				</div>
				<div className='bg-background'>
					<ResultsProof />
				</div>
				<div className='bg-muted/30'>
					<LeadershipGrid />
				</div>
				<div className='bg-background'>
					<DepartmentExpertise />
				</div>
				<div className='bg-muted/30'>
					<ComplianceTrust />
				</div>
				<div className='bg-background'>
					<FAQ
						items={PORTFOLIO_FAQS}
						variant='pastel'
						badge='Portfolio FAQ'
						title='Questions teams ask before'
						description='Answers about platform fit, delivery support, compliance-sensitive workflows, and how engagements usually begin.'
						className='section-container py-16 sm:py-20'
					/>
				</div>
				<div className='bg-muted/30'>
					<PortfolioCrossLinks />
				</div>
				<div className='bg-background'>
					<AboutPageCta
						title='Ready to connect acquisition, delivery, and reporting under one accountable team?'
						description='Tell us where your current funnel, call flow, lead routing, reporting, or technical implementation is slowing growth. We will recommend a practical next step.'
						ctaLabel='Start a strategy conversation'
					/>
				</div>
			</main>
		</>
	);
}