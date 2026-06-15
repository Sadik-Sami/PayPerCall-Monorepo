'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { InfiniteSlider } from '@workspace/ui/components/infinite-slider';
import { cn } from '@workspace/ui/lib/utils';
import { EqualiserBars } from '@/components/sections/services/podcast-marketing/EqualiserBars';
import { NowPlayingChip } from '@/components/sections/services/podcast-marketing/NowPlayingChip';
import { VideoPreviewChip } from '@/components/sections/services/video-editing/VideoPreviewChip';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

interface KineticDecorProps {
	stickerKind?: 'design' | 'audio' | 'video';
	marqueeTokens?: string[];
	nowPlaying?: { eyebrow?: string; title: string; meta?: string; accent?: Accent };
}

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
		<motion.div aria-hidden style={{ x, y }} className={cn('pointer-events-none absolute', className)}>
			<motion.div
				animate={{ y: [0, -floatRange, 0], rotate: [0, 3, 0] }}
				transition={{ duration, ease: 'easeInOut', repeat: Infinity }}>
				{children}
			</motion.div>
		</motion.div>
	);
}

export function KineticDecor({ stickerKind = 'design', marqueeTokens, nowPlaying }: KineticDecorProps) {
	const reduceMotion = useReducedMotion();
	const trackingRef = useRef<HTMLDivElement | null>(null);

	const rawX = useMotionValue(0);
	const rawY = useMotionValue(0);
	const mouseX = useSpring(rawX, { stiffness: 80, damping: 18, mass: 0.6 });
	const mouseY = useSpring(rawY, { stiffness: 80, damping: 18, mass: 0.6 });

	useEffect(() => {
		if (reduceMotion) return;
		const handleMove = (event: MouseEvent) => {
			const el = trackingRef.current;
			if (!el) return;
			const bounds = el.getBoundingClientRect();
			if (
				event.clientX < bounds.left ||
				event.clientX > bounds.right ||
				event.clientY < bounds.top ||
				event.clientY > bounds.bottom
			) {
				rawX.set(0);
				rawY.set(0);
				return;
			}
			const nx = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
			const ny = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
			rawX.set(nx);
			rawY.set(ny);
		};
		window.addEventListener('mousemove', handleMove, { passive: true });
		return () => window.removeEventListener('mousemove', handleMove);
	}, [rawX, rawY, reduceMotion]);

	if (reduceMotion) return null;

	return (
		<div ref={trackingRef} aria-hidden className='pointer-events-none absolute inset-0 z-0'>
			{marqueeTokens && marqueeTokens.length > 0 && (
				<div className='absolute left-0 right-0 top-28 px-6 sm:top-32 md:top-36'>
					<div className='mx-auto max-w-3xl'>
						<InfiniteSlider
							gap={36}
							speed={28}
							speedOnHover={10}
							className='[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]'>
							{marqueeTokens.map((token, i) => (
								<div
									key={`${token}-${i}`}
									className='flex items-center gap-9 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground'>
									<span>{token}</span>
									<span className='text-pastel-lilac-strong'>✦</span>
								</div>
							))}
						</InfiniteSlider>
					</div>
				</div>
			)}

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
						mouseY={mouseY}>
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
						mouseY={mouseY}>
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
						mouseY={mouseY}>
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
						mouseY={mouseY}>
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
						mouseY={mouseY}>
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
							mouseY={mouseY}>
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
					<Sticker
						className='left-[6%] top-[18%] text-pastel-peach-strong'
						xRange={20}
						yRange={16}
						duration={7}
						mouseX={mouseX}
						mouseY={mouseY}>
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
						mouseY={mouseY}>
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
						mouseY={mouseY}>
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
						mouseY={mouseY}>
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
							mouseY={mouseY}>
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
		</div>
	);
}
