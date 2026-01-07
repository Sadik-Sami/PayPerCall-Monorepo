import { cn } from '@workspace/ui/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@workspace/ui/components/button';
import type { ServiceHeroProps } from './types';

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
	className,
}: ServiceHeroProps) {
	return (
		<section
			className={cn(
				'overflow-hidden rounded-3xl border border-primary/10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_55%)] p-8 shadow-lg shadow-primary/5',
				className,
			)}>
			<div className='grid gap-10 lg:grid-cols-[1.2fr_0.8fr]'>
				<div className='space-y-6'>
					<div className='space-y-4'>
						{pill ? (
							<span className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary'>
								{pill}
							</span>
						) : null}
						{eyebrow ? <span className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>{eyebrow}</span> : null}
						<h1 className='text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl'>{title}</h1>
						<p className='text-base text-muted-foreground sm:text-lg'>{subtitle}</p>
					</div>
					{features?.length ? (
						<div className='flex flex-wrap gap-3'>
							{features.map((feature) => (
								<span key={feature} className='inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900/60 dark:text-slate-100'>
									<span className='size-1.5 rounded-full bg-primary' />
									{feature}
								</span>
							))}
						</div>
					) : null}
					<div className='flex flex-wrap items-center gap-4'>
						<Button asChild size='lg'>
							<Link href={primaryCta.href}>{primaryCta.label}</Link>
						</Button>
						{secondaryCta ? (
							<Button asChild size='lg' variant='outline' className='border-primary/40 text-primary hover:bg-primary/10'>
								<Link href={secondaryCta.href}>{secondaryCta.label}</Link>
							</Button>
						) : null}
					</div>
					{footnote ? <p className='text-sm text-muted-foreground'>{footnote}</p> : null}
				</div>
				<div className='relative'>
					<div className='relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/40 p-4'>
						{media ? (
							<div className='relative h-72 w-full overflow-hidden rounded-2xl'>
								<Image
									src={media.src}
									alt={media.alt}
									fill
									className='object-cover'
									sizes='(max-width: 1024px) 100vw, 40vw'
									priority
								/>
							</div>
						) : (
							<div className='flex h-72 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 text-sm text-primary-foreground/80'>
								Performance-first delivery
							</div>
						)}
						{media?.caption ? <p className='mt-3 text-xs text-slate-200'>{media.caption}</p> : null}
					</div>
					{stat ? (
						<div className='absolute -bottom-6 left-6 rounded-2xl border border-primary/20 bg-background/95 p-5 shadow-xl'>
							<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Free session</p>
							<p className='text-4xl font-semibold text-foreground'>{stat.value}</p>
							<p className='text-sm text-muted-foreground'>{stat.label}</p>
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
}

