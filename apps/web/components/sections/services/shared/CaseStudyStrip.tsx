'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import Image from 'next/image';
import { Button } from '@workspace/ui/components/button';
import type {
	CaseStudyStripProps,
	CaseStudyCardItem,
	CaseStudyCardAccentColor,
} from '@/types/services';

const ACCENT_CLASSES: Record<CaseStudyCardAccentColor, string> = {
	'pastel-peach': 'bg-pastel-peach',
	'pastel-lilac': 'bg-pastel-lilac',
	'pastel-lime': 'bg-pastel-lime',
	'pastel-mint': 'bg-pastel-mint',
	'pastel-sky': 'bg-pastel-sky',
	'pastel-blush': 'bg-pastel-blush',
};

const DEFAULT_ACCENT = 'pastel-peach' satisfies CaseStudyCardAccentColor;

function CaseStudyCard({
	item,
	index,
	cardRef,
}: {
	item: CaseStudyCardItem;
	index: number;
	cardRef?: (el: HTMLDivElement | null) => void;
}) {
	const accent: CaseStudyCardAccentColor =
		item.accentColor ??
		(['pastel-peach', 'pastel-lilac', 'pastel-lime'] as const)[index % 3] ??
		DEFAULT_ACCENT;
	const bgClass = ACCENT_CLASSES[accent];

	return (
		<div
			ref={cardRef}
			className={cn(
				'shrink-0 w-[320px] min-w-[320px] sm:w-[350px] sm:min-w-[350px] md:w-[400px] md:min-w-[400px]',
				'flex flex-col justify-between rounded-3xl p-8 shadow-lg',
				bgClass,
				'text-foreground'
			)}
		>
			<div>
				<h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
				<p className="text-sm leading-relaxed text-muted-foreground mb-8">
					{item.description}
				</p>
			</div>
			<div className="relative mt-auto">
				{item.image ? (
					<>
						<div
							className="absolute inset-0 rounded-xl bg-black/5 -translate-x-0.5 -translate-y-0.5"
							aria-hidden
						/>
						<Image
							src={item.image.src}
							alt={item.image.alt}
							width={400}
							height={192}
							className="relative rounded-xl border border-white/20 object-cover w-full h-48 shadow-xl"
							unoptimized={item.image.src.startsWith('http')}
						/>
					</>
				) : (
					<div
						className="relative rounded-xl border border-white/20 w-full h-48 shadow-xl overflow-hidden bg-linear-to-br from-primary/5 to-primary/10"
						aria-hidden
					/>
				)}
			</div>
			{item.link && (
				<a
					href={item.link}
					className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
				>
					View full case study
				</a>
			)}
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
	if (!items.length) return null;

	const [activeIndex, setActiveIndex] = useState(0);
	const trackRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement | null>(null);
	const [stepPx, setStepPx] = useState(344);

	const nextSlide = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % items.length);
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
		const id = setInterval(nextSlide, autoScrollInterval);
		return () => clearInterval(id);
	}, [nextSlide, autoScrollInterval]);

	const maxIndex = Math.max(0, items.length - 1);
	const clampedIndex = Math.min(activeIndex, maxIndex);
	const translateX = -clampedIndex * stepPx;

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
							<p className="text-muted-foreground max-w-2xl mx-auto">
								{description}
							</p>
						)}
					</div>
				)}

				<div className="relative overflow-hidden mb-12">
					<motion.div
						ref={trackRef}
						className="flex gap-6 pb-8"
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
								cardRef={index === 0 ? (el) => { cardRef.current = el; } : undefined}
							/>
						))}
					</motion.div>
				</div>

				<div className="flex flex-col items-center justify-center space-y-8">
					<div className="flex gap-3">
						{items.map((_, i) => (
							<button
								key={i}
								onClick={() => goToSlide(i)}
								aria-current={i === clampedIndex}
								aria-label={`Go to slide ${i + 1}`}
								className={cn(
									'h-3 w-3 rounded-full transition-colors duration-300',
									i === clampedIndex
										? 'bg-primary w-6'
										: 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-3'
								)}
							/>
						))}
					</div>
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
		</section>
	);
}
