import FAQ from '@/components/sections/shared/FAQ';
import {
	CaseStudyStrip,
	ConsultationCTA,
} from '@/components/sections/services';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import type { Metadata } from 'next';
import { getCaseStudiesByCategory } from '@/lib/api/case-studies';
import { PastelFunnelHero, PastelBentoGrid } from '../_components';
import { ECOMMERCE_DATA } from '@/lib/data/services/web-dev-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { HoverEffect } from '@workspace/ui/components/ui/card-hover-effect';
import { cn } from '@workspace/ui/lib/utils';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Ecommerce Website Development | Performance, Ops, and Integrations | PayPerCall',
	description:
		'Conversion-ready ecommerce builds: storefront performance, payments, tax, fulfillment, and ERP/CRM integrations with measurable revenue outcomes.',
	alternates: { canonical: '/services/web-dev/ecommerce' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Ecommerce Website Development',
		description: 'Storefront performance, merchandising, and integrations delivered together for reliable growth.',
		url: '/services/web-dev/ecommerce',
		images: [
			{
				url: '/images/slider/slider-1.webp',
				width: 1200,
				height: 630,
				alt: 'Ecommerce website development and operations',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Ecommerce Website Development',
		description: 'Performance, payments, and ops-ready ecommerce builds with measurable outcomes.',
		images: ['/images/slider/slider-1.jpg'],
	},
};

const SECTION_PADDING = 'py-12 md:py-16';

export default async function EcommerceWebDevPage() {
	const caseStudies = await getCaseStudiesByCategory('web-dev');
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Service',
						serviceType: 'Ecommerce Website Development',
						provider: {
							'@type': 'Organization',
							name: 'PayPerCall',
							url: 'https://paypercall.com',
						},
						description:
							'Conversion-ready ecommerce builds: storefront performance, payments, tax, fulfillment, and ERP/CRM integrations with measurable revenue outcomes.',
					}),
				}}
			/>
			<main className='space-y-0'>
				<PastelFunnelHero {...ECOMMERCE_DATA.HERO} />
				
				<div className={cn("w-full bg-background pt-8 pb-16")}>
					<ClientsMarqueeStrip />
				</div>

				<div className={cn("w-full bg-background", SECTION_PADDING)}>
					<div className="section-container">
						<div className="mb-10 md:mb-16">
							<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
								Ecommerce results that drive revenue
							</h2>
							<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
								We measure success in sales, not just metrics.
							</p>
						</div>
						<PastelBentoGrid outcomes={ECOMMERCE_DATA.OUTCOMES} />
					</div>
				</div>
				
				<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
					<div className="section-container">
						<div className="mb-10 md:mb-16">
							<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
								How we deliver ecommerce projects
							</h2>
							<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
								Clear artifacts and alignment across ops, marketing, and engineering.
							</p>
						</div>
						<HoverEffect 
							items={ECOMMERCE_DATA.PROCESS_STEPS.map((p, i) => ({
								id: p.title + i,
								title: p.title,
								description: p.description,
								link: '#'
							}))}
						/>
					</div>
				</div>
				
				<div className={cn("w-full bg-background", SECTION_PADDING)}>
					<Timeline
						className='section-container'
						title='Commerce program timeline'
						description='Each commerce build follows four checkpoints so ops, marketing, and engineering stay aligned.'
						data={ECOMMERCE_DATA.TIMELINE}
					/>
				</div>
				
				<div className={cn("w-full bg-muted/30", SECTION_PADDING)}>
					<div className="section-container">
						<div className="mb-10 md:mb-16">
							<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
								Ecommerce performance gains
							</h2>
							<p className="mt-4 text-lg text-muted-foreground max-w-2xl">
								Real improvements from migration and optimization projects.
							</p>
						</div>
						<HoverEffect 
							items={ECOMMERCE_DATA.RESULTS.map((r, i) => ({
								id: r.label + i,
								title: r.label,
								description: `${r.improvement} (from ${r.before} to ${r.after}). ${r.context}`,
								link: '#'
							}))}
						/>
					</div>
				</div>
				
				<CaseStudyStrip
					className={cn("w-full bg-background", SECTION_PADDING)}
					items={caseStudies}
					title='Commerce case studies anchored in revenue'
				/>
				
				<FAQ
					variant="pastel"
					badge="Ecommerce FAQ"
					description="Answers to common questions about our ecommerce development process and integrations."
					className={cn("w-full bg-muted/30", SECTION_PADDING)} 
					items={ECOMMERCE_DATA.FAQ_ITEMS} 
				/>
				
				<div id='consultation' className={cn("w-full bg-background scroll-mt-24", SECTION_PADDING)}>
					<div className="section-container">
						<ConsultationCTA
							category='web-dev'
							className='w-full'
							title='Request an ecommerce performance review'
							bullets={[
								'Share funnel data, speed metrics, and ops gaps.',
								'Receive prioritized recommendations with ranges.',
								'Choose replatform vs. optimization with clarity.',
							]}
							formVariant='detailed'
						/>
					</div>
				</div>
			</main>
		</>
	);
}
