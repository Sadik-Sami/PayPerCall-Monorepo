'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, CheckCircle2, Handshake, ShieldCheck } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { CONTACT_HERO_FEATURES, CONTACT_TRUST_POINTS } from './contact-data';

export function ContactHero() {
	const reduceMotion = useReducedMotion();

	return (
		<section className='relative overflow-hidden border-b border-border/60 bg-background py-14 sm:py-18 md:py-24'>
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute -left-16 top-10 h-56 w-56 rounded-full bg-pastel-sky/50 blur-3xl' />
				<div className='absolute right-0 top-20 h-64 w-64 rounded-full bg-pastel-lilac/45 blur-3xl' />
				<div className='absolute bottom-4 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-pastel-mint/40 blur-3xl' />
			</div>

			<div className='section-container relative z-10'>
				<div className='mx-auto max-w-4xl text-center'>
					<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 18 }}
						animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						transition={{ duration: 0.45, ease: 'easeOut' }}
						className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary'>
						<Handshake className='h-4 w-4' />
						Strategic Consultation Intake
					</motion.div>

					<motion.h1
						initial={reduceMotion ? false : { opacity: 0, y: 22 }}
						animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
						className='mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
						Let&apos;s Build Your Next
						<span className='block bg-gradient-to-r from-primary via-pastel-sky-strong to-pastel-lilac-strong bg-clip-text text-transparent'>
							Revenue Growth System
						</span>
					</motion.h1>

					<motion.p
						initial={reduceMotion ? false : { opacity: 0, y: 18 }}
						animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.14, ease: 'easeOut' }}
						className='mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
						Tell us what you are trying to scale and we&apos;ll route your request to the right specialist for a
						focused, no-pressure conversation.
					</motion.p>

					<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 14 }}
						animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.22, ease: 'easeOut' }}
						className='mt-7 flex flex-wrap items-center justify-center gap-2 text-sm'>
						{CONTACT_TRUST_POINTS.map((item) => (
							<span
								key={item}
								className='inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-foreground'>
								<CheckCircle2 className='h-3.5 w-3.5 text-primary' />
								{item}
							</span>
						))}
					</motion.div>

					<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 12 }}
						animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.28, ease: 'easeOut' }}
						className='mt-8 flex justify-center'>
						<Button asChild size='lg' className='gap-2 rounded-xl px-7'>
							<a href='#contact-form'>
								Start Your Conversation
								<ArrowDownRight className='h-4 w-4' />
							</a>
						</Button>
					</motion.div>
				</div>

				<div className='mt-12 grid gap-4 md:grid-cols-3'>
					{CONTACT_HERO_FEATURES.map((feature, index) => (
						<motion.article
							key={feature.title}
							initial={reduceMotion ? false : { opacity: 0, y: 18 }}
							whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.35 }}
							transition={{ duration: 0.4, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
							className='rounded-2xl border border-border/70 bg-card/85 p-5 shadow-sm backdrop-blur-sm'>
							<div className='mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-pastel-lilac-border bg-pastel-lilac text-pastel-lilac-ink dark:border-pastel-lilac-border/70 dark:bg-pastel-lilac/60'>
								<ShieldCheck className='h-4 w-4' />
							</div>
							<h2 className='text-base font-semibold text-foreground'>{feature.title}</h2>
							<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{feature.description}</p>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
