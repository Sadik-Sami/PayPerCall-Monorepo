'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Building2, Factory, HeartPulse, Home, Phone } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, cardVariants, itemVariants } from '@/lib/animations';

const AUDIENCE_SEGMENTS = [
	{
		title: 'Local & SMB Teams',
		description:
			'Cover after-hours calls, overflow demand, and appointment booking without increasing full-time payroll.',
		outcome: 'Launch-ready support in 2-3 weeks',
		icon: Home,
		pastel: 'pastel-mint',
	},
	{
		title: 'Growth-Stage Brands',
		description:
			'Scale inbound and outbound operations with playbooks, QA, and KPI reporting across multiple campaigns.',
		outcome: 'Consistent SLA-driven service quality',
		icon: Building2,
		pastel: 'pastel-sky',
	},
	{
		title: 'Regulated Industries',
		description: 'Deploy HIPAA-aware, process-controlled call flows for legal, insurance, and healthcare workflows.',
		outcome: 'Compliance-first customer interactions',
		icon: HeartPulse,
		pastel: 'pastel-lilac',
	},
	{
		title: 'Enterprise Programs',
		description: 'Extend capacity for multilingual support, regional campaigns, and high-volume seasonal surges.',
		outcome: 'Elastic staffing with transparent reporting',
		icon: Factory,
		pastel: 'pastel-peach',
	},
] as const;

function getTone(pastel: (typeof AUDIENCE_SEGMENTS)[number]['pastel']) {
	switch (pastel) {
		case 'pastel-mint':
			return { card: 'bg-pastel-mint border-pastel-mint-border', ink: 'text-pastel-mint-ink' };
		case 'pastel-sky':
			return { card: 'bg-pastel-sky border-pastel-sky-border', ink: 'text-pastel-sky-ink' };
		case 'pastel-lilac':
			return { card: 'bg-pastel-lilac border-pastel-lilac-border', ink: 'text-pastel-lilac-ink' };
		case 'pastel-peach':
		default:
			return { card: 'bg-pastel-peach border-pastel-peach-border', ink: 'text-pastel-peach-ink' };
	}
}

export function AudienceFitSection({ className }: { className?: string }) {
	const shouldReduceMotion = useReducedMotion();
	const containerAnimation = shouldReduceMotion ? undefined : containerVariants;
	const cardAnimation = shouldReduceMotion ? undefined : cardVariants;
	const itemAnimation = shouldReduceMotion ? undefined : itemVariants;

	return (
		<section className={cn('w-full', className)}>
			<div className='section-container'>
				<motion.div
					variants={containerAnimation}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='mx-auto max-w-3xl text-center'>
					<motion.p variants={itemAnimation} className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
						Built for mixed buyer profiles
					</motion.p>
					<motion.h2
						variants={itemAnimation}
						className='mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl'>
						Find the right call center model for your stage
					</motion.h2>
					<motion.p variants={itemAnimation} className='mt-4 text-lg text-muted-foreground'>
						Whether you need overflow support or a fully managed outbound team, we tailor staffing, scripts, and QA to
						your growth goals.
					</motion.p>
				</motion.div>

				<motion.div
					variants={containerAnimation}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='mt-10 grid gap-6 md:grid-cols-2'>
					{AUDIENCE_SEGMENTS.map((segment) => {
						const Icon = segment.icon;
						const tone = getTone(segment.pastel);
						return (
							<motion.article
								key={segment.title}
								variants={cardAnimation}
								whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
								className={cn(
									'relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-shadow hover:shadow-lg',
									tone.card,
								)}>
								<div className='glass-icon mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl'>
									<Icon className={cn('size-6', tone.ink)} />
								</div>
								<h3 className='text-xl font-semibold text-foreground'>{segment.title}</h3>
								<p className='mt-3 text-sm leading-relaxed text-foreground/80'>{segment.description}</p>
								<p className='mt-5 inline-flex rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground dark:border-white/15 dark:bg-white/10'>
									{segment.outcome}
								</p>
							</motion.article>
						);
					})}
				</motion.div>

				<motion.div
					variants={containerAnimation}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-120px' }}
					className='mt-10 flex flex-col items-center gap-3'>
					<div className='flex flex-wrap items-center justify-center gap-4'>
						<Button asChild size='lg' className='group gap-2'>
							<Link href='/contact'>
								Book a Free Consultation
								<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
							</Link>
						</Button>
						<Button asChild size='lg' variant='outline' className='gap-2'>
							<a href='tel:+18553302777'>
								<Phone className='size-4' />
								Call +1 (855) 330-2777
							</a>
						</Button>
					</div>
					<p className='text-sm text-muted-foreground'>
						Free 30-minute consultation • No long-term contract • Launch in 2–3 weeks
					</p>
				</motion.div>
			</div>
		</section>
	);
}
