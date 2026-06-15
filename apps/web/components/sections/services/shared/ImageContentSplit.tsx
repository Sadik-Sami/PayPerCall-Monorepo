'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants, floatIn } from '@/lib/animations';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

type BulletItem = { title: string; description: string };

interface CtaSpec {
	label: string;
	href: string;
}

export interface ImageContentSplitProps {
	reverse?: boolean;
	kicker: string;
	kickerAccent?: Accent;
	headline: string;
	description: string;
	bullets: BulletItem[];
	primaryCta: CtaSpec;
	primaryCtaVariant?: 'electric' | 'lilac';
	secondaryCta?: CtaSpec;
	image: { src: string; alt: string };
	haloAccent?: Accent;
	className?: string;
}

const KICKER: Record<Accent, string> = {
	mint: 'bg-pastel-mint/70 border-pastel-mint-border text-pastel-mint-ink',
	sky: 'bg-pastel-sky/70 border-pastel-sky-border text-pastel-sky-ink',
	lilac: 'bg-pastel-lilac/70 border-pastel-lilac-border text-pastel-lilac-ink',
	peach: 'bg-pastel-peach/70 border-pastel-peach-border text-pastel-peach-ink',
	blush: 'bg-pastel-blush/70 border-pastel-blush-border text-pastel-blush-ink',
	lime: 'bg-pastel-lime/70 border-pastel-lime-border text-pastel-lime-ink',
};

const CHIP: Record<Accent, string> = {
	mint: 'bg-pastel-mint border-pastel-mint-border text-pastel-mint-ink',
	sky: 'bg-pastel-sky border-pastel-sky-border text-pastel-sky-ink',
	lilac: 'bg-pastel-lilac border-pastel-lilac-border text-pastel-lilac-ink',
	peach: 'bg-pastel-peach border-pastel-peach-border text-pastel-peach-ink',
	blush: 'bg-pastel-blush border-pastel-blush-border text-pastel-blush-ink',
	lime: 'bg-pastel-lime border-pastel-lime-border text-pastel-lime-ink',
};

const HALO: Record<Accent, string> = {
	mint: 'bg-pastel-mint/55',
	sky: 'bg-pastel-sky/55',
	lilac: 'bg-pastel-lilac/55',
	peach: 'bg-pastel-peach/55',
	blush: 'bg-pastel-blush/55',
	lime: 'bg-pastel-lime/55',
};

const HALO_SECONDARY: Record<Accent, string> = {
	mint: 'bg-pastel-lime/40',
	sky: 'bg-pastel-lilac/40',
	lilac: 'bg-pastel-blush/40',
	peach: 'bg-pastel-blush/40',
	blush: 'bg-pastel-peach/40',
	lime: 'bg-pastel-mint/40',
};

const LILAC_CTA =
	'bg-pastel-lilac text-pastel-lilac-ink border border-pastel-lilac-border hover:bg-pastel-lilac-strong/40 hover:text-pastel-lilac-ink';

export function ImageContentSplit({
	reverse = false,
	kicker,
	kickerAccent = 'sky',
	headline,
	description,
	bullets,
	primaryCta,
	primaryCtaVariant = 'electric',
	secondaryCta,
	image,
	haloAccent,
	className,
}: ImageContentSplitProps) {
	const reduceMotion = useReducedMotion();
	const halo = haloAccent ?? kickerAccent;

	return (
		<section className='relative w-full overflow-hidden'>
			<div className={cn('section-container', className)}>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center'>
					<motion.div
						variants={floatIn}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-80px' }}
						className={cn('relative isolate flex justify-center', reverse && 'lg:order-2')}>
						<div className='relative aspect-square w-full max-w-[460px] lg:max-w-[520px]'>
							<div
								aria-hidden
								className={cn(
									'pointer-events-none absolute -inset-6 -z-10 rounded-full opacity-70 blur-3xl',
									HALO[halo],
								)}
								style={{
									maskImage: 'radial-gradient(circle at center, black 35%, transparent 78%)',
									WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 78%)',
								}}
							/>
							<div
								aria-hidden
								className={cn(
									'pointer-events-none absolute -z-10 size-44 rounded-full opacity-60 blur-3xl',
									reverse ? 'bottom-2 left-4' : 'bottom-2 right-4',
									HALO_SECONDARY[halo],
								)}
								style={{
									maskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
									WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
								}}
							/>

							<motion.div
								animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 0.6, 0] }}
								transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
								className='absolute inset-0'>
								<Image
									src={image.src}
									alt={image.alt}
									sizes='(max-width: 1024px) 90vw, 45vw'
									className='object-contain drop-shadow-[0_30px_60px_rgba(15,23,42,0.10)]'
									fill
								/>
							</motion.div>
						</div>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-80px' }}
						className={cn('flex flex-col gap-6', reverse && 'lg:order-1')}>
						<motion.span
							variants={itemVariants}
							className={cn(
								'inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]',
								KICKER[kickerAccent],
							)}>
							{kicker}
						</motion.span>

						<motion.h2
							variants={itemVariants}
							className='font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]'>
							{headline}
						</motion.h2>

						<motion.p
							variants={itemVariants}
							className='max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
							{description}
						</motion.p>

						<motion.ul variants={itemVariants} className='mt-2 flex flex-col gap-4'>
							{bullets.map((b) => (
								<li key={b.title} className='flex items-start gap-3'>
									<span
										className={cn(
											'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border',
											CHIP[kickerAccent],
										)}>
										<Check className='size-4' strokeWidth={2.5} />
									</span>
									<div>
										<p className='text-sm font-semibold text-foreground sm:text-[15px]'>{b.title}</p>
										<p className='mt-0.5 text-sm leading-relaxed text-muted-foreground'>{b.description}</p>
									</div>
								</li>
							))}
						</motion.ul>

						<motion.div variants={itemVariants} className='mt-4 flex flex-wrap items-center gap-3'>
							<Button asChild size='lg' className={cn('rounded-xl px-7', primaryCtaVariant === 'lilac' && LILAC_CTA)}>
								<Link href={primaryCta.href}>
									{primaryCta.label}
									<ArrowRight className='size-4' />
								</Link>
							</Button>

							{secondaryCta && (
								<Button asChild size='lg' variant='outline' className='rounded-xl px-7'>
									<Link href={secondaryCta.href}>
										{secondaryCta.label}
										<ArrowRight className='size-4' />
									</Link>
								</Button>
							)}
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
