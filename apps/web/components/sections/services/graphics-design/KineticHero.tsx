'use client';
import { useRef } from 'react';
import Link from 'next/link';
import {
	motion,
	useMotionValue,
	useReducedMotion,
	useSpring,
	useTransform,
} from 'framer-motion';
import { ArrowRight, ArrowDown, Sparkles, Diamond, Star, Flame, Check } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { InfiniteSlider } from '@workspace/ui/components/infinite-slider';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import { EqualiserBars } from '@/components/sections/services/podcast-marketing/EqualiserBars';
import { NowPlayingChip } from '@/components/sections/services/podcast-marketing/NowPlayingChip';
import { VideoPreviewChip } from '@/components/sections/services/video-editing/VideoPreviewChip';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

type BadgeIcon = 'star' | 'sparkle' | 'fire' | 'diamond' | 'check';

interface KineticHeroProps {
	eyebrow: string;
	lines: string[];
	accent?: { line: number; word: string };
	accentColour?: Accent;
	subDeck: string;
	primaryCta: { label: string; href: string };
	secondaryCta?: { label: string; href: string };
	badges?: Array<{ icon: BadgeIcon; label: string }>;
	marqueeTokens?: string[];
	haloAccents?: Accent[];
	stickerKind?: 'design' | 'audio' | 'video';
	nowPlaying?: { eyebrow?: string; title: string; meta?: string; accent?: Accent };
}

const ACCENT_TEXT: Record<Accent, string> = {
	mint: 'from-pastel-mint-strong via-pastel-lime-strong to-pastel-mint-strong',
	sky: 'from-pastel-sky-strong via-pastel-lilac-strong to-pastel-sky-strong',
	lilac: 'from-pastel-lilac-strong via-pastel-blush-strong to-pastel-lilac-strong',
	peach: 'from-pastel-peach-strong via-pastel-blush-strong to-pastel-peach-strong',
	blush: 'from-pastel-blush-strong via-pastel-peach-strong to-pastel-blush-strong',
	lime: 'from-pastel-lime-strong via-pastel-mint-strong to-pastel-lime-strong',
};

const KICKER_PILL: Record<Accent, string> = {
	mint: 'bg-pastel-mint/70 border-pastel-mint-border text-pastel-mint-ink',
	sky: 'bg-pastel-sky/70 border-pastel-sky-border text-pastel-sky-ink',
	lilac: 'bg-pastel-lilac/70 border-pastel-lilac-border text-pastel-lilac-ink',
	peach: 'bg-pastel-peach/70 border-pastel-peach-border text-pastel-peach-ink',
	blush: 'bg-pastel-blush/70 border-pastel-blush-border text-pastel-blush-ink',
	lime: 'bg-pastel-lime/70 border-pastel-lime-border text-pastel-lime-ink',
};

const BADGE_PILL: Record<Accent, string> = KICKER_PILL;

const HALO: Record<Accent, string> = {
	mint: 'bg-pastel-mint/55',
	sky: 'bg-pastel-sky/55',
	lilac: 'bg-pastel-lilac/55',
	peach: 'bg-pastel-peach/55',
	blush: 'bg-pastel-blush/55',
	lime: 'bg-pastel-lime/55',
};

const BADGE_ICON_MAP = {
	star: Star,
	sparkle: Sparkles,
	fire: Flame,
	diamond: Diamond,
	check: Check,
} as const;

const BADGE_ACCENTS: Accent[] = ['peach', 'lilac', 'mint', 'sky', 'blush'];

function Sticker({
	className,
	children,
	xRange = 18,
	yRange = 14,
	floatRange = 8,
	duration = 6,
	mouseX,
	mouseY,
}: {
	className?: string;
	children: React.ReactNode;
	xRange?: number;
	yRange?: number;
	floatRange?: number;
	duration?: number;
	mouseX: ReturnType<typeof useSpring>;
	mouseY: ReturnType<typeof useSpring>;
}) {
	const x = useTransform(mouseX, [-1, 1], [-xRange, xRange]);
	const y = useTransform(mouseY, [-1, 1], [-yRange, yRange]);

	return (
		<motion.div
			aria-hidden
			style={{ x, y }}
			className={cn('pointer-events-none absolute', className)}
		>
			<motion.div
				animate={{ y: [0, -floatRange, 0], rotate: [0, 3, 0] }}
				transition={{ duration, ease: 'easeInOut', repeat: Infinity }}
			>
				{children}
			</motion.div>
		</motion.div>
	);
}

export function KineticHero({
	eyebrow,
	lines,
	accent,
	accentColour = 'lilac',
	subDeck,
	primaryCta,
	secondaryCta,
	badges,
	marqueeTokens,
	haloAccents = ['lilac', 'sky'],
	stickerKind = 'design',
	nowPlaying,
}: KineticHeroProps) {
	const reduceMotion = useReducedMotion();
	const sectionRef = useRef<HTMLElement | null>(null);

	const rawX = useMotionValue(0);
	const rawY = useMotionValue(0);
	const mouseX = useSpring(rawX, { stiffness: 80, damping: 18, mass: 0.6 });
	const mouseY = useSpring(rawY, { stiffness: 80, damping: 18, mass: 0.6 });

	function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
		if (reduceMotion) return;
		const bounds = sectionRef.current?.getBoundingClientRect();
		if (!bounds) return;
		const nx = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
		const ny = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
		rawX.set(nx);
		rawY.set(ny);
	}

	function handleMouseLeave() {
		rawX.set(0);
		rawY.set(0);
	}

	const accentGradient = ACCENT_TEXT[accentColour];
	const [halo1, halo2] = haloAccents;

	return (
		<section
			ref={sectionRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className='relative w-full overflow-hidden bg-background pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28'
		>
			<div
				aria-hidden
				className={cn(
					'pointer-events-none absolute -left-32 -top-24 -z-10 size-[28rem] rounded-full blur-3xl opacity-60',
					HALO[halo1 ?? 'lilac'],
				)}
				style={{
					maskImage: 'radial-gradient(circle at center, black 30%, transparent 78%)',
					WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 78%)',
				}}
			/>
			<div
				aria-hidden
				className={cn(
					'pointer-events-none absolute -right-24 top-1/3 -z-10 size-[24rem] rounded-full blur-3xl opacity-50',
					HALO[halo2 ?? 'sky'],
				)}
				style={{
					maskImage: 'radial-gradient(circle at center, black 30%, transparent 78%)',
					WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 78%)',
				}}
			/>
			<div
				aria-hidden
				className='pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]'
				style={{
					backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
					backgroundSize: '28px 28px',
				}}
			/>

			{stickerKind === 'design' && (
				<>
					<Sticker className='left-[6%] top-[18%] text-pastel-lilac-strong' mouseX={mouseX} mouseY={mouseY}>
						<svg width='44' height='44' viewBox='0 0 24 24' fill='none'>
							<path d='M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z' fill='currentColor' />
						</svg>
					</Sticker>
					<Sticker
						className='right-[8%] top-[22%] text-pastel-peach-strong'
						xRange={26}
						yRange={20}
						duration={7.5}
						mouseX={mouseX}
						mouseY={mouseY}
					>
						<svg width='52' height='52' viewBox='0 0 24 24' fill='none'>
							<circle cx='12' cy='12' r='3' fill='currentColor' />
							<circle cx='12' cy='12' r='8' stroke='currentColor' strokeWidth='1.5' strokeDasharray='2 3' />
						</svg>
					</Sticker>
					<Sticker
						className='left-[10%] bottom-[18%] text-pastel-sky-strong'
						xRange={22}
						yRange={18}
						duration={8}
						mouseX={mouseX}
						mouseY={mouseY}
					>
						<svg width='40' height='40' viewBox='0 0 24 24' fill='none'>
							<path d='M3 12 Q 8 4, 14 12 T 21 12' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
						</svg>
					</Sticker>
					<Sticker
						className='right-[10%] bottom-[22%] text-pastel-mint-strong'
						xRange={20}
						yRange={16}
						duration={6.5}
						mouseX={mouseX}
						mouseY={mouseY}
					>
						<div className='grid grid-cols-3 gap-1.5'>
							{Array.from({ length: 9 }).map((_, i) => (
								<span key={i} className='block size-1.5 rounded-full bg-current' />
							))}
						</div>
					</Sticker>
				</>
			)}

			{stickerKind === 'audio' && (
				<>
					<Sticker className='left-[6%] top-[18%]' xRange={20} yRange={16} duration={7} mouseX={mouseX} mouseY={mouseY}>
						<EqualiserBars accent='peach' size='lg' />
					</Sticker>
					<Sticker
						className='right-[8%] top-[22%] text-pastel-mint-strong'
						xRange={26}
						yRange={20}
						duration={7.5}
						mouseX={mouseX}
						mouseY={mouseY}
					>
						<svg width='72' height='40' viewBox='0 0 72 40' fill='none'>
							<path
								d='M2 20 Q 10 4, 18 20 T 34 20 T 50 20 T 70 20'
								stroke='currentColor'
								strokeWidth='2.5'
								strokeLinecap='round'
							/>
							<path
								d='M2 28 Q 10 12, 18 28 T 34 28 T 50 28 T 70 28'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								opacity='0.5'
							/>
						</svg>
					</Sticker>
					<Sticker
						className='left-[10%] bottom-[18%] text-pastel-lilac-strong'
						xRange={22}
						yRange={18}
						duration={8}
						mouseX={mouseX}
						mouseY={mouseY}
					>
						<div className='flex flex-col items-center gap-1.5'>
							<span className='block size-2 rounded-full bg-current opacity-50' />
							<span className='block size-2.5 rounded-full bg-current opacity-80' />
							<span className='block size-3 rounded-full bg-current' />
							<span className='block size-2.5 rounded-full bg-current opacity-80' />
							<span className='block size-2 rounded-full bg-current opacity-50' />
						</div>
					</Sticker>
					{nowPlaying && (
						<Sticker
							className='right-[5%] bottom-[14%] w-64 sm:w-72'
							xRange={14}
							yRange={10}
							duration={9}
							mouseX={mouseX}
							mouseY={mouseY}
						>
							<NowPlayingChip
								eyebrow={nowPlaying.eyebrow}
								title={nowPlaying.title}
								meta={nowPlaying.meta}
								accent={nowPlaying.accent ?? 'peach'}
							/>
						</Sticker>
					)}
				</>
			)}

			{stickerKind === 'video' && (
				<>
					<Sticker className='left-[6%] top-[18%] text-pastel-peach-strong' xRange={20} yRange={16} duration={7} mouseX={mouseX} mouseY={mouseY}>
						<svg width='56' height='44' viewBox='0 0 56 44' fill='none'>
							<rect x='2' y='10' width='52' height='30' rx='4' stroke='currentColor' strokeWidth='2' />
							<path d='M2 18 H54' stroke='currentColor' strokeWidth='1.5' />
							<path d='M6 10 L10 4 L18 4 L14 10 Z' fill='currentColor' />
							<path d='M22 10 L26 4 L34 4 L30 10 Z' fill='currentColor' />
							<path d='M38 10 L42 4 L50 4 L46 10 Z' fill='currentColor' />
						</svg>
					</Sticker>
					<Sticker
						className='right-[8%] top-[22%] text-pastel-lilac-strong'
						xRange={26}
						yRange={20}
						duration={7.5}
						mouseX={mouseX}
						mouseY={mouseY}
					>
						<svg width='52' height='52' viewBox='0 0 24 24' fill='none'>
							<circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.5' />
							<path d='M10 8.5 L16 12 L10 15.5 Z' fill='currentColor' />
						</svg>
					</Sticker>
					<Sticker
						className='left-[10%] bottom-[18%] text-pastel-sky-strong'
						xRange={22}
						yRange={18}
						duration={8}
						mouseX={mouseX}
						mouseY={mouseY}
					>
						<svg width='64' height='40' viewBox='0 0 64 40' fill='none'>
							<path d='M2 6 L2 34' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
							<path d='M62 6 L62 34' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
							<path d='M2 6 L10 6' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
							<path d='M54 6 L62 6' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
							<path d='M2 34 L10 34' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
							<path d='M54 34 L62 34' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
						</svg>
					</Sticker>
					<Sticker
						className='right-[12%] bottom-[28%] text-pastel-mint-strong'
						xRange={18}
						yRange={14}
						duration={6.5}
						mouseX={mouseX}
						mouseY={mouseY}
					>
						<div className='flex items-end gap-1'>
							{[10, 18, 14, 22, 12, 20, 16].map((h, i) => (
								<span key={i} className='block w-1 rounded-sm bg-current' style={{ height: `${h}px` }} />
							))}
						</div>
					</Sticker>
					{nowPlaying && (
						<Sticker
							className='right-[5%] bottom-[10%] w-64 sm:w-72'
							xRange={14}
							yRange={10}
							duration={9}
							mouseX={mouseX}
							mouseY={mouseY}
						>
							<VideoPreviewChip
								eyebrow={nowPlaying.eyebrow}
								title={nowPlaying.title}
								meta={nowPlaying.meta}
								accent={nowPlaying.accent ?? 'peach'}
							/>
						</Sticker>
					)}
				</>
			)}

			<div className='section-container relative z-10'>
				{marqueeTokens && marqueeTokens.length > 0 && (
					<div className='mx-auto mb-10 max-w-3xl' aria-hidden>
						<InfiniteSlider gap={36} speed={28} speedOnHover={10} className='[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]'>
							{marqueeTokens.map((token, i) => (
								<div key={`${token}-${i}`} className='flex items-center gap-9 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground'>
									<span>{token}</span>
									<span className='text-pastel-lilac-strong'>✦</span>
								</div>
							))}
						</InfiniteSlider>
					</div>
				)}

				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					className='mx-auto flex max-w-5xl flex-col items-start text-left'
				>
					<motion.span
						variants={itemVariants}
						className={cn(
							'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-sm backdrop-blur-sm',
							KICKER_PILL[accentColour],
						)}
					>
						{eyebrow}
					</motion.span>

					<motion.h1
						variants={containerVariants}
						className='mt-6 font-display font-extrabold tracking-tighter text-foreground'
						style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)', lineHeight: 1 }}
					>
						{lines.map((line, lineIdx) => {
							const isAccentLine = accent?.line === lineIdx;
							if (!isAccentLine) {
								return (
									<motion.span key={lineIdx} variants={itemVariants} className='block'>
										{line}
									</motion.span>
								);
							}
							const accentWord = accent.word;
							const idx = line.indexOf(accentWord);
							const before = idx >= 0 ? line.slice(0, idx) : line;
							const after = idx >= 0 ? line.slice(idx + accentWord.length) : '';
							return (
								<motion.span key={lineIdx} variants={itemVariants} className='block'>
									{before}
									<em
										className={cn(
											'bg-linear-to-r bg-clip-text not-italic font-display font-extrabold italic text-transparent',
											accentGradient,
										)}
									>
										{accentWord}
									</em>
									{after}
								</motion.span>
							);
						})}
					</motion.h1>

					<motion.p
						variants={itemVariants}
						className='mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl'
					>
						{subDeck}
					</motion.p>

					<motion.div variants={itemVariants} className='mt-9 flex flex-wrap items-center gap-3'>
						<Button asChild size='lg' className='rounded-xl px-7'>
							<Link href={primaryCta.href}>
								{primaryCta.label}
								<ArrowRight className='size-4' />
							</Link>
						</Button>
						{secondaryCta && (
							<Button asChild size='lg' variant='outline' className='rounded-xl px-7'>
								<Link href={secondaryCta.href}>
									{secondaryCta.label}
									<ArrowDown className='size-4' />
								</Link>
							</Button>
						)}
					</motion.div>

					{badges && badges.length > 0 && (
						<motion.ul variants={itemVariants} className='mt-10 flex flex-wrap gap-2.5'>
							{badges.map((badge, i) => {
								const Icon = BADGE_ICON_MAP[badge.icon];
								const tint = BADGE_ACCENTS[i % BADGE_ACCENTS.length] ?? 'lilac';
								return (
									<li key={badge.label}>
										<span
											className={cn(
												'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm',
												BADGE_PILL[tint],
											)}
										>
											<Icon className='size-3.5' />
											{badge.label}
										</span>
									</li>
								);
							})}
						</motion.ul>
					)}
				</motion.div>
			</div>
		</section>
	);
}
