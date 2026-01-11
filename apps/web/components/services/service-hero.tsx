'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@workspace/ui/lib/utils';
import { springContainer, springItem, slideInFromRight, scaleInWithBounce } from '@/lib/animations';
import { Button } from '@workspace/ui/components/button';
import type { ServiceHeroProps } from '@/types/services';
import Image from 'next/image';

export function ServiceHero({
	pill,
	eyebrow,
	title,
	subtitle,
	primaryCta,
	secondaryCta,
	features,
	stat,
	footnote,
	media,
	variant = 'default',
	className,
}: ServiceHeroProps) {
	const shouldReduceMotion = useReducedMotion();
	const isCentered = variant === 'centered';
	const hasMedia = !!media;

	// Use spring animations unless reduced motion is preferred
	const containerAnimation = shouldReduceMotion ? { hidden: {}, visible: {} } : springContainer;
	const itemAnimation = shouldReduceMotion ? { hidden: {}, visible: {} } : springItem;
	const imageAnimation = shouldReduceMotion ? { hidden: {}, visible: {} } : slideInFromRight;

	return (
		<section className={cn('relative overflow-hidden', isCentered ? 'py-20 lg:py-32' : 'py-16 lg:py-24', className)}>
			{/* Subtle Background Layer */}
			<div className='absolute inset-0 -z-10'>
				<div className='absolute inset-0 bg-linear-to-br from-background via-background to-primary/5' />
				<div className='absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-3xl' />
				<div className='absolute -bottom-1/4 right-0 h-[600px] w-[600px] rounded-full bg-gradient-radial from-accent/8 via-transparent to-transparent blur-3xl' />
			</div>

			<motion.div
				variants={containerAnimation}
				initial='hidden'
				animate='visible'
				className={cn(
					'section-container relative z-10',
					isCentered && 'text-center',
					hasMedia && !isCentered && 'grid gap-8 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'
				)}>
				{/* Content Container */}
				<div className={cn('space-y-6 lg:space-y-8', isCentered && 'mx-auto max-w-4xl')}>
					{/* Pill & Eyebrow */}
					{(pill || eyebrow) && (
						<motion.div variants={itemAnimation} className='flex flex-wrap items-center gap-3'>
							{pill && (
								<span className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm'>
									<Sparkles className='h-3.5 w-3.5' />
									{pill}
								</span>
							)}
							{eyebrow && (
								<span className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>{eyebrow}</span>
							)}
						</motion.div>
					)}

					{/* Title */}
					<motion.h1
						variants={itemAnimation}
						className='text-balance font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl'>
						{title}
					</motion.h1>

					{/* Subtitle */}
					<motion.p
						variants={itemAnimation}
						className={cn(
							'text-lg text-muted-foreground sm:text-xl leading-relaxed',
							isCentered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
						)}>
						{subtitle}
					</motion.p>

					{/* Features */}
					{features && features.length > 0 && (
						<motion.div variants={itemAnimation} className={cn('flex flex-wrap gap-3', isCentered && 'justify-center')}>
							{features.map((feature, index) => (
								<motion.span
									key={feature}
									variants={shouldReduceMotion ? {} : scaleInWithBounce}
									initial='hidden'
									animate='visible'
									transition={{ delay: index * 0.1 }}
									className='inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-2 text-sm font-medium backdrop-blur-md transition-all hover:border-primary/50 hover:bg-card/80'>
									<span className='h-1.5 w-1.5 rounded-full bg-primary' />
									{feature}
								</motion.span>
							))}
						</motion.div>
					)}

					{/* CTAs */}
					<motion.div variants={itemAnimation} className={cn('flex flex-wrap gap-4', isCentered && 'justify-center')}>
						<Button asChild size='lg' className='group gap-2 px-6 shadow-lg hover:shadow-xl transition-shadow'>
							<Link href={primaryCta.href}>
								{primaryCta.label}
								<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Link>
						</Button>
						{secondaryCta && (
							<Button
								asChild
								size='lg'
								variant='outline'
								className='px-6 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all'>
								<Link href={secondaryCta.href}>{secondaryCta.label}</Link>
							</Button>
						)}
					</motion.div>

					{/* Stat */}
					{stat && (
						<motion.div
							variants={itemAnimation}
							className={cn(
								'flex items-center gap-4 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md p-5 shadow-lg hover:shadow-xl transition-all',
								isCentered ? 'mx-auto w-fit' : 'w-fit'
							)}>
							<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20'>
								<Sparkles className='h-5 w-5 text-primary' />
							</div>
							<div>
								<p className='text-2xl font-bold text-foreground'>{stat.value}</p>
								<p className='text-sm text-muted-foreground'>{stat.label}</p>
							</div>
						</motion.div>
					)}

					{/* Footnote */}
					{footnote && (
						<motion.p variants={itemAnimation} className='text-sm text-muted-foreground max-w-xl'>
							{footnote}
						</motion.p>
					)}
				</div>

				{/* Media Container - Always shown when media is provided */}
				{hasMedia && (
					<motion.div
						variants={imageAnimation}
						initial='hidden'
						animate='visible'
						className='relative hidden lg:block group'>
						{/* Floating Card Container */}
						<div className='relative'>
							{/* Shadow Layer for Depth */}
							<div className='absolute inset-0 rounded-3xl bg-primary/20 blur-2xl translate-y-4 opacity-50 group-hover:opacity-70 transition-opacity' />

							{/* Main Card */}
							<div className='relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl p-2 transition-all group-hover:shadow-3xl group-hover:border-primary/30'>
								{/* Image Container with Aspect Ratio */}
								<div className='relative aspect-4/3 overflow-hidden rounded-2xl'>
									<Image
										src={media.src}
										alt={media.alt}
										fill
										className='object-cover transition-transform duration-700 group-hover:scale-105'
										sizes='(max-width: 1024px) 0vw, 40vw'
										priority
									/>

									{/* Subtle Gradient Overlays */}
									<div className='absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent' />
									<div className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5' />

									{/* Border Glow */}
									<div className='absolute inset-0 rounded-2xl ring-1 ring-primary/20 group-hover:ring-primary/40 transition-all' />
								</div>

								{/* Caption */}
								{media.caption && (
									<p className='mt-3 px-3 text-sm text-muted-foreground text-center'>{media.caption}</p>
								)}
							</div>

							{/* Decorative Elements */}
							<div className='absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/20 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity' />
							<div className='absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-accent/15 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity' />
						</div>
					</motion.div>
				)}
			</motion.div>
		</section>
	);
}
