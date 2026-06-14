'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, ImageIcon } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

export type WorkAspect = 'tall' | 'wide' | 'square';

export interface WorkPiece {
	title: string;
	client?: string;
	tag: string;
	accent: Accent;
	image?: { src: string; alt: string };
	href?: string;
	aspect?: WorkAspect;
	placeholder?: boolean;
}

export interface WorkMosaicProps {
	eyebrow: string;
	headline: string;
	description?: string;
	pieces: WorkPiece[];
	ctaToFullPortfolio?: { label: string; href: string };
	id?: string;
	className?: string;
}

const ASPECT: Record<WorkAspect, string> = {
	tall: 'aspect-[3/4]',
	wide: 'aspect-[4/3]',
	square: 'aspect-square',
};

const TAG_CHIP: Record<Accent, string> = {
	mint: 'bg-pastel-mint border-pastel-mint-border text-pastel-mint-ink',
	sky: 'bg-pastel-sky border-pastel-sky-border text-pastel-sky-ink',
	lilac: 'bg-pastel-lilac border-pastel-lilac-border text-pastel-lilac-ink',
	peach: 'bg-pastel-peach border-pastel-peach-border text-pastel-peach-ink',
	blush: 'bg-pastel-blush border-pastel-blush-border text-pastel-blush-ink',
	lime: 'bg-pastel-lime border-pastel-lime-border text-pastel-lime-ink',
};

const PLACEHOLDER_BG: Record<Accent, string> = {
	mint: 'bg-pastel-mint/40 border-pastel-mint-border text-pastel-mint-ink',
	sky: 'bg-pastel-sky/40 border-pastel-sky-border text-pastel-sky-ink',
	lilac: 'bg-pastel-lilac/40 border-pastel-lilac-border text-pastel-lilac-ink',
	peach: 'bg-pastel-peach/40 border-pastel-peach-border text-pastel-peach-ink',
	blush: 'bg-pastel-blush/40 border-pastel-blush-border text-pastel-blush-ink',
	lime: 'bg-pastel-lime/40 border-pastel-lime-border text-pastel-lime-ink',
};

function MosaicTile({ piece }: { piece: WorkPiece }) {
	const aspect = ASPECT[piece.aspect ?? 'square'];
	const isPlaceholder = piece.placeholder || !piece.image;

	const tile = (
		<motion.div
			variants={itemVariants}
			className={cn(
				'group relative w-full overflow-hidden rounded-3xl transition-all duration-300',
				aspect,
			)}
		>
			{isPlaceholder ? (
				<div
					aria-label='Selected work coming soon — placeholder'
					className={cn(
						'flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed p-6 transition-transform duration-300 group-hover:-translate-y-1',
						PLACEHOLDER_BG[piece.accent],
					)}
				>
					<span className='flex size-12 items-center justify-center rounded-2xl border border-current/30 bg-white/60'>
						<ImageIcon className='size-5 opacity-70' />
					</span>
					<p className='text-center text-xs font-semibold uppercase tracking-[0.22em]'>
						{piece.tag}
					</p>
					<p className='text-center text-[11px] font-medium opacity-70'>Coming soon</p>
					<Plus className='size-4 opacity-50' />
				</div>
			) : (
				<>
					<Image
						src={piece.image!.src}
						alt={piece.image!.alt}
						fill
						sizes='(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw'
						className='object-cover transition-transform duration-500 group-hover:scale-[1.04]'
					/>
					<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-80 transition-opacity duration-300 group-hover:opacity-100' />
					<div className='absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 text-white'>
						<span
							className={cn(
								'inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]',
								TAG_CHIP[piece.accent],
							)}
						>
							{piece.tag}
						</span>
						<div className='flex items-end justify-between gap-3'>
							<div>
								<p className='font-heading text-lg font-semibold'>{piece.title}</p>
								{piece.client && <p className='text-xs text-white/70'>{piece.client}</p>}
							</div>
							{piece.href && (
								<span className='flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'>
									<ArrowRight className='size-4' />
								</span>
							)}
						</div>
					</div>
				</>
			)}
		</motion.div>
	);

	if (piece.href && !isPlaceholder) {
		return (
			<Link href={piece.href} className='block w-full'>
				{tile}
			</Link>
		);
	}
	return tile;
}

export function WorkMosaic({
	eyebrow,
	headline,
	description,
	pieces,
	ctaToFullPortfolio,
	id,
	className,
}: WorkMosaicProps) {
	return (
		<section id={id} className={cn('relative w-full overflow-hidden', className)}>
			<div className='section-container'>
				<div className='mb-12 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between'>
					<div className='max-w-2xl'>
						<p className='text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>{eyebrow}</p>
						<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
							{headline}
						</h2>
						{description && (
							<p className='mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
								{description}
							</p>
						)}
					</div>
					{ctaToFullPortfolio && (
						<Link
							href={ctaToFullPortfolio.href}
							className='inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border/70 bg-card/80 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-md md:self-auto'
						>
							{ctaToFullPortfolio.label}
							<ArrowRight className='size-4' />
						</Link>
					)}
				</div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-80px' }}
					className='grid auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5'
				>
					{pieces.map((piece, i) => (
						<MosaicTile key={`${piece.title}-${i}`} piece={piece} />
					))}
				</motion.div>
			</div>
		</section>
	);
}
