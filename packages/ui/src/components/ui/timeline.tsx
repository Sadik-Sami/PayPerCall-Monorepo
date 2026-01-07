'use client';
import { useScroll, useTransform, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@workspace/ui/lib/utils';

export interface TimelineEntry {
	title: string;
	content: React.ReactNode;
}

interface TimelineProps {
	title: string;
	description?: string;
	data: TimelineEntry[];
	className?: string;
}

export const Timeline = ({ title, description, data, className }: TimelineProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			setHeight(rect.height);
		}
	}, []);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start 10%', 'end 50%'],
	});

	const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
	const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

	return (
		<div
			className={cn('w-full rounded-3xl border border-border/50 bg-background font-body', className)}
			ref={containerRef}>
			<div className='mx-auto max-w-5xl px-6 py-12 md:px-12'>
				<h2 className='text-4xl font-semibold text-foreground md:text-4xl'>{title}</h2>
				{description ?
					<p className='mt-3 max-w-3xl text-base text-muted-foreground md:text-base'>{description}</p>
				:	null}
			</div>

			<div ref={ref} className='relative mx-auto max-w-5xl pb-16'>
				{data.map((item) => (
					<div key={item.title} className='flex justify-start pt-10 md:gap-10 md:pt-24'>
						<div className='sticky top-32 z-30 flex max-w-xs flex-col items-center self-start md:max-w-sm md:flex-row'>
							<div className='absolute left-2 h-10 w-10 rounded-full bg-background flex items-center justify-center'>
								<div className='h-3.5 w-3.5 rounded-full border border-muted-foreground/40 bg-primary/30' />
							</div>
							<h3 className='hidden text-3xl font-semibold text-muted-foreground md:block md:pl-16'>{item.title}</h3>
						</div>

						<div className='relative w-full pl-16 pr-4 md:pl-4'>
							<h3 className='mb-3 text-2xl font-semibold text-muted-foreground md:hidden'>{item.title}</h3>
							<div className='rounded-2xl border border-border/40 bg-card/70 p-6 text-sm md:text-base text-muted-foreground'>
								{item.content}
							</div>
						</div>
					</div>
				))}
				<div
					style={{
						height: height + 'px',
					}}
					className='absolute left-6 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-border/70 to-transparent mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8'>
					<motion.div
						style={{
							height: heightTransform,
							opacity: opacityTransform,
						}}
						className='absolute inset-x-0 top-0 w-[2px] rounded-full bg-linear-to-b from-primary via-primary/70 to-transparent'
					/>
				</div>
			</div>
		</div>
	);
};
