'use client';
import { cn } from '@workspace/ui/lib/utils';
import { AnimatePresence, motion, useReducedMotion, Variants } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type ImagesSliderRenderContext = {
	activeIndex: number;
	total: number;
};

type SliderImage = string | StaticImageData;

type ImagesSliderProps = {
	images: SliderImage[];
	children: React.ReactNode | ((ctx: ImagesSliderRenderContext) => React.ReactNode);
	overlay?: boolean | React.ReactNode;
	overlayClassName?: string;
	className?: string;
	autoplay?: boolean;
	direction?: 'up' | 'down';
	keyboard?: boolean;
	keyboardKeys?: 'vertical' | 'horizontal';
	ariaLabel?: string;
	pauseOnFocus?: boolean;
};

export const ImagesSlider = ({
	images,
	children,
	overlay = true,
	overlayClassName,
	className,
	autoplay = true,
	direction = 'up',
	keyboard = true,
	keyboardKeys = 'vertical',
	ariaLabel = 'Hero slides',
	pauseOnFocus = true,
}: ImagesSliderProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFocused, setIsFocused] = useState(false);
	const shouldReduceMotion = useReducedMotion();

	const total = images.length;

	const goNext = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1 === total ? 0 : prevIndex + 1));
	}, [total]);

	const goPrevious = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? total - 1 : prevIndex - 1));
	}, [total]);

	useEffect(() => {
		if (!total) return;
		setCurrentIndex((idx) => Math.min(idx, total - 1));
	}, [total]);

	useEffect(() => {
		const effectiveAutoplay = autoplay && !shouldReduceMotion && !(pauseOnFocus && isFocused) && total > 1;
		if (!effectiveAutoplay) return;

		const interval = setInterval(() => {
			goNext();
		}, 5000);

		return () => clearInterval(interval);
	}, [autoplay, goNext, isFocused, pauseOnFocus, shouldReduceMotion, total]);

	const slideVariants: Variants = useMemo(() => {
		if (shouldReduceMotion) {
			return {
				initial: { opacity: 0 },
				visible: { opacity: 1, transition: { duration: 0.2 } },
				upExit: { opacity: 0, transition: { duration: 0.2 } },
				downExit: { opacity: 0, transition: { duration: 0.2 } },
			};
		}

		return {
			initial: {
				scale: 0.98,
				opacity: 0,
				rotateX: 25,
			},
			visible: {
				scale: 1,
				rotateX: 0,
				opacity: 1,
				transition: {
					duration: 0.5,
					ease: [0.645, 0.045, 0.355, 1.0],
				},
			},
			upExit: {
				opacity: 1,
				y: '-150%',
				transition: {
					duration: 1,
				},
			},
			downExit: {
				opacity: 1,
				y: '150%',
				transition: {
					duration: 1,
				},
			},
		};
	}, [shouldReduceMotion]);

	const resolvedChildren = useMemo(() => {
		if (typeof children === 'function') {
			return children({ activeIndex: currentIndex, total });
		}
		return children;
	}, [children, currentIndex, total]);

	const resolvedOverlay = useMemo(() => {
		if (overlay === false || overlay == null) return null;
		if (overlay === true) return <div className={cn('absolute inset-0 bg-black/60 z-40', overlayClassName)} />;
		return <div className={cn('absolute inset-0 z-40', overlayClassName)}>{overlay}</div>;
	}, [overlay, overlayClassName]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (!keyboard || total <= 1) return;

			const goNextKey = keyboardKeys === 'vertical' ? 'ArrowDown' : 'ArrowRight';
			const goPrevKey = keyboardKeys === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

			if (event.key === goNextKey) {
				event.preventDefault();
				goNext();
			} else if (event.key === goPrevKey) {
				event.preventDefault();
				goPrevious();
			}
		},
		[keyboard, keyboardKeys, goNext, goPrevious, total],
	);

	const activeImage = images[currentIndex];

	return (
		<div
			role='region'
			aria-roledescription='carousel'
			aria-label={ariaLabel}
			aria-live='off'
			tabIndex={keyboard ? 0 : undefined}
			onKeyDown={keyboard ? handleKeyDown : undefined}
			onFocusCapture={pauseOnFocus ? () => setIsFocused(true) : undefined}
			onBlurCapture={pauseOnFocus ? () => setIsFocused(false) : undefined}
			className={cn(
				'overflow-hidden h-full w-full relative flex items-center justify-center bg-black',
				'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
				className,
			)}
			style={{
				perspective: shouldReduceMotion ? undefined : '1000px',
			}}>
			{resolvedChildren}
			{resolvedOverlay}

			{activeImage && (
				<AnimatePresence>
					<motion.div
						key={currentIndex}
						initial='initial'
						animate='visible'
						exit={direction === 'up' ? 'upExit' : 'downExit'}
						variants={slideVariants}
						className='absolute inset-0'>
						<Image
							src={activeImage}
							alt=''
							aria-hidden='true'
							fill
							// sizes='100vw'
							priority={currentIndex === 0}
							draggable={false}
							className='object-cover select-none'
						/>
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
};
