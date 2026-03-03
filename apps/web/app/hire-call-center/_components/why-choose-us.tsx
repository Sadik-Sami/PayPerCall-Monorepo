'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { SectionHeader } from '@workspace/ui/components/sections';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { comparisonData, differentiators } from '../_data/comparison';
import { ArrowRight, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';

function renderComparisonValue(value: boolean | string) {
	if (typeof value === 'boolean') {
		return value ?
				<span className='inline-flex items-center justify-center rounded-full bg-pastel-mint p-1 text-pastel-mint-ink'>
					<CheckCircle2 className='size-4' />
				</span>
			:	<span className='inline-flex items-center justify-center rounded-full bg-pastel-peach p-1 text-pastel-peach-ink'>
					<XCircle className='size-4' />
				</span>;
	}

	return <span className='text-sm text-foreground'>{value}</span>;
}

export default function WhyChooseUs() {
	const shouldReduceMotion = useReducedMotion();
	const guaranteedWins = comparisonData.filter((row) => row.us === true).length;

	return (
		<section className='relative overflow-hidden bg-background py-20 md:py-24'>
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full bg-pastel-peach/45 blur-3xl' />
			</div>

			<div className='relative mx-auto max-w-6xl px-6'>
				<SectionHeader
					badge='Why Us'
					title='Built for Businesses That'
					highlight='Demand More'
					subtitle="We're not your typical call center. See how we compare to the competition."
				/>

				<div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10'>
					<motion.div
						initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
						whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-80px' }}>
						<div className='overflow-hidden rounded-2xl border border-pastel-sky-border bg-pastel-sky/25 dark:bg-card/90'>
							<table className='w-full border-collapse text-left'>
								<thead>
									<tr className='border-b border-pastel-sky-border bg-pastel-lilac/35 dark:bg-muted/70'>
										<th className='px-4 py-3 text-sm font-semibold text-foreground'>Feature</th>
										<th className='px-4 py-3 text-sm font-semibold text-foreground'>Core Closer</th>
										<th className='px-4 py-3 text-sm font-semibold text-foreground'>Typical Vendors</th>
									</tr>
								</thead>
								<tbody>
									{comparisonData.map((row) => (
										<tr key={row.feature} className='border-b border-pastel-sky-border/70 last:border-b-0'>
											<td className='px-4 py-3 text-sm font-medium text-foreground'>{row.feature}</td>
											<td className='px-4 py-3'>{renderComparisonValue(row.us)}</td>
											<td className='px-4 py-3'>{renderComparisonValue(row.others)}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</motion.div>

					<div className='space-y-4'>
						<div className='mb-2 inline-flex items-center gap-2 rounded-full border border-pastel-mint-border bg-pastel-mint px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground/85'>
							<ShieldCheck className='size-3.5' />
							{guaranteedWins}+ provable vendor advantages
						</div>

						{differentiators.map((item, index) => (
							<motion.div
								key={item.title}
								initial={shouldReduceMotion ? undefined : { opacity: 0, x: 14 }}
								whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
								viewport={{ once: true, margin: '-90px' }}
								transition={{ duration: 0.28, delay: shouldReduceMotion ? 0 : index * 0.05 }}
								whileHover={shouldReduceMotion ? undefined : { y: -3 }}>
								<Card className='rounded-2xl border-border/70 bg-card/75 shadow-sm transition-shadow hover:shadow-md'>
									<CardContent className='flex items-start gap-3 pt-6'>
										<div className='mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-pastel-lilac-border bg-pastel-lilac'>
											<CheckCircle2 className='size-4 text-primary' />
										</div>
										<div>
											<h3 className='text-base font-semibold text-foreground'>{item.title}</h3>
											<p className='mt-1 text-sm leading-relaxed text-muted-foreground'>{item.description}</p>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>

				<motion.div
					initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
					whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='mt-10 flex justify-center'>
					<Button asChild size='lg' className='group h-11 rounded-xl px-7'>
						<Link href='/contact'>
							Start with a Pilot Program
							<ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
						</Link>
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
