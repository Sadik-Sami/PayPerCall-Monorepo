import { cn } from '@workspace/ui/lib/utils';
import type { TechStackItem } from '@/types/services';

interface TechMarqueeProps {
	items: TechStackItem[];
	className?: string;
	speed?: 'slow' | 'normal' | 'fast';
}

const speedMap = {
	slow: '120s',
	normal: '80s',
	fast: '40s',
};

export function TechMarquee({ items, className, speed = 'normal' }: TechMarqueeProps) {
	const duration = speedMap[speed];

	return (
		<div
			className={cn(
				'relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm',
				className
			)}>
			{/* Header with padding */}
			<div className='px-4 pt-4 pb-2'>
				<p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
					Core technologies we deliver with
				</p>
			</div>

			{/* Marquee area without horizontal padding */}
			<div className='relative pb-4'>
				{/* Enhanced fade masks that reach the actual container edges */}
				<div className='pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-linear-to-r from-card/50 via-card/40 to-transparent' />
				<div className='pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-linear-to-l from-card/50 via-card/40 to-transparent' />

				{/* Subtle inner shadow for depth */}
				<div className='pointer-events-none absolute inset-0 z-20 shadow-inner' />

				<div
					className='flex hover:paused'
					style={
						{
							animation: `marquee-infinite ${duration} linear infinite`,
						} as React.CSSProperties
					}>
					{/* Duplicate items for seamless infinite scroll */}
					{[...items, ...items].map((item, index) => (
						<div
							key={`${item.label}-${index}`}
							className='mx-3 flex shrink-0 items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:bg-primary/10 hover:shadow-md'>
							<item.icon className='h-4 w-4 text-primary' />
							<span className='whitespace-nowrap'>{item.label}</span>
						</div>
					))}
				</div>

				{/* Inline styles for custom animation */}
				<style
					dangerouslySetInnerHTML={{
						__html: `
						@keyframes marquee-infinite {
							0% { transform: translateX(0); }
							100% { transform: translateX(-50%); }
						}
					`,
					}}
				/>
			</div>
		</div>
	);
}
