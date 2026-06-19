import { CaseStudyStrip, ConsultationCTA, SECTION_PADDING } from '@/components/sections/services';
import { getCaseStudiesByCategory } from '@/lib/api/case-studies';
import FAQ from '@/components/sections/shared/FAQ';
import { PastelFunnelHero, PastelBentoGrid } from '../_components';
import { FULL_STACK_DATA } from '@/lib/data/services/web-dev-subpages';
import { ClientsMarqueeStrip } from '@/app/about/clients/_components/ClientsMarqueeStrip';
import { Timeline } from '@workspace/ui/components/ui/timeline';
import { HoverEffect } from '@workspace/ui/components/ui/card-hover-effect';
import { cn } from '@workspace/ui/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Full Stack Web Development | PayPerCall',
	description:
		'Custom web applications with modern stack.',
	alternates: { canonical: '/services/web-dev/full-stack' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Full Stack Web Development',
		description: 'Custom web applications with modern stack.',
		url: '/services/web-dev/full-stack',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Full Stack Web Development',
	},
};

export default async function FullStackWebDevPage() {
	const caseStudies = await getCaseStudiesByCategory('web-dev');
	return (
		<main className='flex flex-col'>
			<PastelFunnelHero {...FULL_STACK_DATA.HERO} />
			<div className={cn('w-full bg-background pt-8 pb-16')}>
				<ClientsMarqueeStrip />
			</div>

			<div className={cn('w-full bg-background', SECTION_PADDING)}>
				<div className='section-container'>
					<div className='mb-10 md:mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
							Full-stack outcomes backed by data
						</h2>
						<p className='mt-4 text-lg text-muted-foreground max-w-2xl'>Metrics that matter to your business goals.</p>
					</div>
					<PastelBentoGrid outcomes={FULL_STACK_DATA.OUTCOMES} />
				</div>
			</div>

			<div className={cn('w-full bg-muted/30', SECTION_PADDING)}>
				<div className='section-container'>
					<div className='mb-10 md:mb-16'>
						<h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
							Deliverables that keep programs on track
						</h2>
						<p className='mt-4 text-lg text-muted-foreground max-w-2xl'>
							We align product, engineering, and operations with clear artifacts at every stage.
						</p>
					</div>
					<HoverEffect
						items={FULL_STACK_DATA.DELIVERABLES.map((d, i) => ({
							id: d.title + i,
							title: d.title,
							description: `${d.description} Core components: ${d.bulletPoints.join(', ')}.`,
							link: '#',
						}))}
					/>
				</div>
			</div>

			<div className={cn('w-full bg-background', SECTION_PADDING)}>
				<Timeline
					className='section-container'
					title='Full-stack project timeline'
					description='Clear milestones from blueprint to launch.'
					data={FULL_STACK_DATA.TIMELINE_STEPS.map((s) => ({
						title: s.title,
						content: (
							<div className='space-y-4'>
								<p className='font-medium text-foreground'>{s.description}</p>
								<ul className='space-y-2'>
									{s.details.map((detail, idx) => (
										<li key={idx} className='flex items-center text-muted-foreground'>
											<span className='w-1.5 h-1.5 rounded-full bg-primary/60 mr-3' />
											{detail}
										</li>
									))}
								</ul>
							</div>
						),
					}))}
				/>
			</div>

			<div className={cn('w-full bg-muted/30', SECTION_PADDING)}>
				<CaseStudyStrip
					className='section-container'
					items={caseStudies}
					title='Representative full-stack engagements'
					description='Every case study highlights the measurable outcomes stakeholders care about.'
				/>
			</div>

			<div className={cn('w-full bg-background', SECTION_PADDING)}>
				<FAQ
					items={FULL_STACK_DATA.FAQ_ITEMS}
					variant='pastel'
					badge='Full Stack Development FAQ'
					description="Everything you need to know about Web Development, planning, development, and how to get started. We're here to help you scale."
					className='section-container'
				/>
			</div>

			<div className={cn('w-full bg-muted/30', SECTION_PADDING)}>
				<ConsultationCTA
					category='web-dev'
					className='w-full'
					title='Book a full-stack discovery call'
					bullets={[
						'Walk through architecture, teams, and constraints.',
						'Flag integration or compliance risks early.',
						'Leave with a phased roadmap and guardrails.',
					]}
					formVariant='detailed'
				/>
			</div>
		</main>
	);
}
