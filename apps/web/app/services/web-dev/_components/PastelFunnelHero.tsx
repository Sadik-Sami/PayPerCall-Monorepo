import { cn } from '@workspace/ui/lib/utils';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { TextEffect } from '@workspace/ui/components/text-effect';

interface PastelFunnelHeroProps {
	pill: string;
	eyebrow: string;
	title: string;
	subtitle: string;
	features: string[];
	primaryCta: { label: string; href: string };
	className?: string;
}

export function PastelFunnelHero({
	pill,
	eyebrow,
	title,
	subtitle,
	features,
	primaryCta,
	className,
}: PastelFunnelHeroProps) {
	return (
		<section
			className={cn(
				'relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24 flex items-center justify-center min-h-[70vh]',
				className
			)}
		>
			{/* Vibrant Ambient Glow & Asymmetric Material Shapes */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				{/* Ambient Glows */}
				<div className="absolute top-0 right-0 w-[70vw] h-[70vw] md:w-[800px] md:h-[800px] bg-pastel-mint/10 dark:bg-pastel-mint-ink/20 blur-[100px] -translate-y-1/2 translate-x-1/4 rounded-full" />
				<div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] md:w-[600px] md:h-[600px] bg-pastel-sky/10 dark:bg-pastel-sky-ink/20 blur-[100px] translate-y-1/3 -translate-x-1/4 rounded-[100%]" />

				{/* Asymmetric Glass Shapes (Static, 0 CLS, 0 JS) */}
				<div className="absolute top-[10%] left-[2%] md:left-[8%] w-32 h-32 md:w-48 md:h-48 -rotate-12 rounded-[2.5rem] bg-linear-to-br from-pastel-mint/30 to-pastel-sky/10 dark:from-pastel-mint-ink/40 dark:to-pastel-sky-ink/10 border border-white/40 dark:border-white/10 backdrop-blur-2xl shadow-xl" />
				<div className="absolute bottom-[15%] right-[2%] md:right-[10%] w-40 h-40 md:w-64 md:h-64 rotate-12 rounded-full bg-linear-to-tl from-pastel-peach/30 to-pastel-blush/10 dark:from-pastel-peach-ink/40 dark:to-pastel-blush-ink/10 border border-white/40 dark:border-white/10 backdrop-blur-2xl shadow-2xl" />

				<div className="absolute top-[25%] right-[8%] md:right-[20%] w-20 h-20 md:w-28 md:h-28 rotate-[35deg] rounded-[1.5rem] bg-linear-to-b from-pastel-lilac/40 to-transparent dark:from-pastel-lilac-ink/50 border border-white/40 dark:border-white/10 backdrop-blur-2xl shadow-lg" />
				<div className="absolute bottom-[20%] left-[8%] md:left-[22%] w-16 h-16 md:w-20 md:h-20 -rotate-[25deg] rounded-[1rem] bg-linear-to-tr from-pastel-sky/40 to-transparent dark:from-pastel-sky-ink/50 border border-white/40 dark:border-white/10 backdrop-blur-2xl shadow-md" />

				{/* Subtle Dot Pattern */}
				<svg className="absolute inset-0 w-full h-full opacity-[0.015] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="dot-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
							<circle cx="2" cy="2" r="1.5" fill="currentColor" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#dot-pattern)" />
				</svg>
			</div>

			<div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 text-center space-y-8">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 shadow-sm backdrop-blur-md">
					<span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
					{pill} &bull; {eyebrow}
				</div>

				<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
						{title}
				</h1>

				<div className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
						{subtitle}
				</div>

				<div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4 text-sm font-medium text-muted-foreground">
					{features.map((feature, i) => (
						<div key={i} className="flex items-center gap-2">
							<CheckCircle2 className="size-4 text-primary" />
							<span>{feature}</span>
						</div>
					))}
				</div>

				<div className="pt-8">
					<Link
						href={primaryCta.href}
						className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
					>
						{primaryCta.label}
						<ArrowRight className="w-4 h-4 ml-2" />
					</Link>
				</div>
			</div>
		</section>
	);
}
