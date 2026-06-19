'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import type {
	CaseStudyStripProps,
	CaseStudyCardItem,
	CaseStudyCardAccentColor,
} from '@/types/services';
import { CaseStudyModal } from './CaseStudyModal';

const ACCENT_BG: Record<CaseStudyCardAccentColor, string> = {
	'pastel-peach': 'bg-pastel-peach',
	'pastel-lilac': 'bg-pastel-lilac',
	'pastel-lime': 'bg-pastel-lime',
	'pastel-mint': 'bg-pastel-mint',
	'pastel-sky': 'bg-pastel-sky',
	'pastel-blush': 'bg-pastel-blush',
};

const ACCENT_ROTATION: CaseStudyCardAccentColor[] = [
	'pastel-peach',
	'pastel-lilac',
	'pastel-lime',
	'pastel-mint',
	'pastel-sky',
	'pastel-blush',
];

const DESCRIPTION_CHAR_LIMIT = 140;

function truncate(text: string, max = DESCRIPTION_CHAR_LIMIT): string {
	if (text.length <= max) return text;
	return text.slice(0, max).trimEnd() + '…';
}

function resolveAccent(item: CaseStudyCardItem, index: number): CaseStudyCardAccentColor {
	return item.accentColor ?? ACCENT_ROTATION[index % ACCENT_ROTATION.length] ?? 'pastel-peach';
}

function CaseStudyCard({
	item,
	index,
	priority,
	cardRef,
	onReadMore,
}: {
	item: CaseStudyCardItem;
	index: number;
	priority: boolean;
	cardRef?: (el: HTMLDivElement | null) => void;
	onReadMore: () => void;
}) {
	const accent = resolveAccent(item, index);
	const accentBg = ACCENT_BG[accent];

	return (
		<div
			ref={cardRef}
			className={cn(
				'shrink-0 w-[300px] min-w-[300px] sm:w-[340px] sm:min-w-[340px] md:w-[360px] md:min-w-[360px]',
				'flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm',
				'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl',
			)}
		>
			<div className={cn('relative w-full aspect-[4/3] overflow-hidden', accentBg)}>
				{item.image ? (
					<Image
						src={item.image.src}
						alt={item.image.alt}
						fill
						priority={priority}
						sizes="(max-width: 640px) 300px, (max-width: 768px) 340px, 360px"
						className="object-contain p-5"
						unoptimized={item.image.src.startsWith('http')}
					/>
				) : (
					<div className="absolute inset-0 flex items-center justify-center text-sm text-foreground/40">
						No image
					</div>
				)}
			</div>

			<div className="flex flex-1 flex-col gap-3 p-6">
				<h3 className="font-heading text-xl font-semibold text-foreground line-clamp-2 min-h-[3.5rem]">
					{item.title}
				</h3>
				<p className="text-sm leading-relaxed text-muted-foreground min-h-[4.5rem]">
					{truncate(item.description)}
				</p>
				<button
					type="button"
					onClick={onReadMore}
					className="mt-auto inline-flex items-center gap-1 self-start text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
				>
					Read more
					<ArrowRight className="h-3.5 w-3.5" aria-hidden />
				</button>
			</div>
		</div>
	);
}

export function CaseStudyStrip({
	items,
	title,
	description,
	cta,
	autoScrollInterval = 5000,
	className,
}: CaseStudyStripProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement | null>(null);
	const [stepPx, setStepPx] = useState(384);

	const nextSlide = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % Math.max(items.length, 1));
	}, [items.length]);

	const goToSlide = useCallback((index: number) => {
		setActiveIndex(index);
	}, []);

	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;
		const gap = 24;
		const measure = () => setStepPx(card.offsetWidth + gap);
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(card);
		return () => ro.disconnect();
	}, [items.length]);

	useEffect(() => {
		if (openIndex !== null) return;
		if (items.length <= 1) return;
		const id = setInterval(nextSlide, autoScrollInterval);
		return () => clearInterval(id);
	}, [nextSlide, autoScrollInterval, openIndex, items.length]);

	const maxIndex = Math.max(0, items.length - 1);
	const clampedIndex = Math.min(activeIndex, maxIndex);
	const translateX = -clampedIndex * stepPx;

	const activeItem = openIndex !== null ? items[openIndex] ?? null : null;
	const activeAccent = useMemo<CaseStudyCardAccentColor>(() => {
		if (openIndex === null) return 'pastel-peach';
		const target = items[openIndex];
		if (!target) return 'pastel-peach';
		return resolveAccent(target, openIndex);
	}, [openIndex, items]);

	if (!items.length) return null;

	return (
		<section className={cn('w-full', className)}>
			<div className="section-container">
				{(title || description) && (
					<div className="mb-12 text-center">
						{title && (
							<h2 className="font-heading mb-4 text-foreground text-4xl md:text-5xl lg:text-6xl tracking-tight font-bold text-balance">
								{title}
							</h2>
						)}
						{description && (
							<p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
						)}
					</div>
				)}

				<div className="relative overflow-hidden mb-12">
					<motion.div
						ref={trackRef}
						className="flex gap-6 pb-8 items-stretch"
						animate={{ x: translateX }}
						transition={{
							type: 'spring',
							stiffness: 100,
							damping: 20,
						}}
					>
						{items.map((item, index) => (
							<CaseStudyCard
								key={`${item.title}-${index}`}
								item={item}
								index={index}
								priority={index < 3}
								cardRef={index === 0 ? (el) => { cardRef.current = el; } : undefined}
								onReadMore={() => setOpenIndex(index)}
							/>
						))}
					</motion.div>
				</div>

				<div className="flex flex-col items-center justify-center space-y-8">
					{items.length > 1 && (
						<div className="flex gap-3">
							{items.map((_, i) => (
								<button
									key={i}
									onClick={() => goToSlide(i)}
									aria-current={i === clampedIndex}
									aria-label={`Go to slide ${i + 1}`}
									className={cn(
										'h-3 rounded-full transition-all duration-300',
										i === clampedIndex
											? 'bg-primary w-6'
											: 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-3',
									)}
								/>
							))}
						</div>
					)}

					{cta && (
						<Button
							asChild
							size="lg"
							className="rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
						>
							<a href={cta.href}>{cta.text}</a>
						</Button>
					)}
				</div>
			</div>

			<CaseStudyModal
				open={openIndex !== null}
				onOpenChange={(o) => !o && setOpenIndex(null)}
				item={activeItem}
				accentColor={activeAccent}
			/>
		</section>
	);
}
