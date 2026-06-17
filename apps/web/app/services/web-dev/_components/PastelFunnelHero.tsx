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
			{/* Soft Pastel Gradients / Glassmorphism backing */}
			<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-70" />
				<div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl opacity-70" />
			</div>

			<div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 text-center space-y-8">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 shadow-sm backdrop-blur-md">
					<span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
					{pill} &bull; {eyebrow}
				</div>

				<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
					<TextEffect per="word" preset="fade" delay={0.1}>
						{title}
					</TextEffect>
				</h1>

				<div className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
					<TextEffect per="word" preset="fade" delay={0.2}>
						{subtitle}
					</TextEffect>
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
