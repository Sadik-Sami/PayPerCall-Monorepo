import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import type { ServiceShowcaseHeroProps } from '@/types/services';

export function ServiceShowcaseHero({
	pill,
	title,
	subtitle,
	primaryCta,
	secondaryCta,
	image,
	className,
}: ServiceShowcaseHeroProps) {
	return (
		<section
			className={cn(
				'relative w-full overflow-hidden bg-background',
				'py-16 sm:py-20 lg:py-24',
				className,
			)}
		>
			<div aria-hidden className='absolute inset-0 -z-10 overflow-hidden pointer-events-none'>
				<div className='absolute inset-0 bg-linear-to-br from-background via-background to-primary/5' />
				<div className='absolute -top-1/3 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-radial from-primary/15 via-primary/5 to-transparent blur-3xl' />
				<div className='absolute -bottom-1/4 -right-20 h-[36rem] w-[36rem] rounded-full bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl' />
			</div>

			<div className='section-container relative z-10'>
				<div className='grid items-center gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr]'>
					<div className='flex flex-col gap-6 lg:gap-8'>
						<span className='inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20'>
							<Sparkles className='h-3.5 w-3.5' aria-hidden />
							{pill}
						</span>

						<h1 className='text-balance font-display font-bold tracking-tight text-foreground text-4xl sm:text-5xl lg:text-6xl'>
							{title}
						</h1>

						<p className='max-w-xl text-lg sm:text-xl leading-relaxed text-muted-foreground'>
							{subtitle}
						</p>

						<div className='flex flex-wrap gap-4 pt-2'>
							<Button
								asChild
								size='lg'
								className='group gap-2 px-6 shadow-lg hover:shadow-xl transition-shadow'
							>
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
									className='px-6 backdrop-blur-sm border-border/60 hover:border-primary/50 transition-all'
								>
									<Link href={secondaryCta.href}>{secondaryCta.label}</Link>
								</Button>
							)}
						</div>
					</div>

					<div className='relative w-full'>
						<div
							aria-hidden
							className='absolute inset-0 -z-10 scale-110 rounded-[3rem] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl'
						/>
						<Image
							src={image.src}
							alt={image.alt}
							width={image.width}
							height={image.height}
							priority
							sizes='(max-width: 1024px) 90vw, 46vw'
							className='relative h-auto w-full object-contain drop-shadow-2xl'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
