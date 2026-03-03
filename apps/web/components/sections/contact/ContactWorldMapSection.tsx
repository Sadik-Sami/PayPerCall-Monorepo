'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Globe2, Radar, UsersRound } from 'lucide-react';
import WorldMap from '@workspace/ui/components/ui/world-map';
import { CONTACT_WORLD_MAP_DOTS } from './contact-data';

const IMPACT_POINTS = [
	{
		title: 'Regional Execution',
		description: 'Campaigns adapted to local buyer behavior and call handling realities.',
		icon: Globe2,
	},
	{
		title: 'Strategic Routing',
		description: 'Requests are triaged by service type so your conversation starts with context.',
		icon: Radar,
	},
	{
		title: 'Cross-Functional Teams',
		description: 'Media, conversion, and development specialists collaborate from the first call.',
		icon: UsersRound,
	},
];

export function ContactWorldMapSection() {
	const reduceMotion = useReducedMotion();

	return (
		<section className='w-full border-y border-border/60 bg-muted/30 py-14 sm:py-16 md:py-20'>
			<div className='section-container'>
				<motion.div
					initial={reduceMotion ? false : { opacity: 0, y: 20 }}
					whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-80px' }}
					transition={{ duration: 0.45, ease: 'easeOut' }}
					className='mx-auto max-w-3xl text-center'>
					<p className='inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary'>
						Global Coverage
					</p>
					<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
						From Local Targets to International Scale
					</h2>
					<p className='mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base'>
						Our delivery teams support growth programs across multiple regions. Tell us your target markets and
						we&apos;ll shape the consultation around your real rollout constraints.
					</p>
				</motion.div>

				<motion.div
					initial={reduceMotion ? false : { opacity: 0, y: 24 }}
					whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-60px' }}
					transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
					className='mt-10 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm'>
					<WorldMap dots={CONTACT_WORLD_MAP_DOTS} lineColor='var(--color-primary)' />
				</motion.div>

				<div className='mt-8 grid gap-4 md:grid-cols-3'>
					{IMPACT_POINTS.map((point, index) => {
						const Icon = point.icon;
						return (
							<motion.article
								key={point.title}
								initial={reduceMotion ? false : { opacity: 0, y: 18 }}
								whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.45 }}
								transition={{ duration: 0.4, delay: 0.08 + index * 0.08, ease: 'easeOut' }}
								className='rounded-2xl border border-pastel-sky-border/80 bg-pastel-sky/60 p-5 dark:bg-card/80'>
								<div className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary'>
									<Icon className='h-4 w-4' />
								</div>
								<h3 className='mt-3 text-base font-semibold text-foreground'>{point.title}</h3>
								<p className='mt-1.5 text-sm leading-relaxed text-muted-foreground'>{point.description}</p>
							</motion.article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
