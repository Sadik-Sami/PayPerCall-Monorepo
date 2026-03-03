'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import type { CallGatewayAccent, CallLogicBgVariant } from './constants';

const ACCENT_STYLES: Record<
	CallGatewayAccent,
	{ badge: string; titleHighlight: string; ctaBg: string; ctaHover: string }
> = {
	mint: {
		badge: 'bg-pastel-mint border-pastel-mint-border text-pastel-mint-ink',
		titleHighlight: 'text-pastel-mint-strong',
		ctaBg: 'bg-pastel-mint-strong hover:bg-pastel-mint-ink',
		ctaHover: 'hover:-translate-y-0.5',
	},
	lilac: {
		badge: 'bg-pastel-lilac border-pastel-lilac-border text-pastel-lilac-ink',
		titleHighlight: 'text-pastel-lilac-strong',
		ctaBg: 'bg-pastel-lilac-strong hover:bg-pastel-lilac-ink',
		ctaHover: 'hover:-translate-y-0.5',
	},
	peach: {
		badge: 'bg-pastel-peach border-pastel-peach-border text-pastel-peach-ink',
		titleHighlight: 'text-pastel-peach-strong',
		ctaBg: 'bg-pastel-peach-strong hover:bg-pastel-peach-ink',
		ctaHover: 'hover:-translate-y-0.5',
	},
	sky: {
		badge: 'bg-pastel-sky border-pastel-sky-border text-pastel-sky-ink',
		titleHighlight: 'text-pastel-sky-strong',
		ctaBg: 'bg-pastel-sky-strong hover:bg-pastel-sky-ink',
		ctaHover: 'hover:-translate-y-0.5',
	},
};

function BgDecoration({ variant }: { variant: CallLogicBgVariant }) {
	if (variant === 'search_social') {
		return (
			<svg
				className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none"
				viewBox="0 0 100 100"
				fill="none"
				aria-hidden
			>
				<circle cx="80" cy="50" r="35" stroke="currentColor" strokeWidth="1" className="text-pastel-sky-strong" />
				<circle cx="80" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" className="text-pastel-sky-strong" />
			</svg>
		);
	}
	if (variant === 'live_transfer') {
		return (
			<svg
				className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none"
				viewBox="0 0 100 100"
				fill="none"
				aria-hidden
			>
				<path
					d="M70 30 L70 70 L50 70 M50 50 L30 50 L30 30 L50 30"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					className="text-pastel-mint-strong"
				/>
			</svg>
		);
	}
	// offline_media
	return (
		<svg
			className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none"
			viewBox="0 0 100 100"
			fill="none"
			aria-hidden
		>
			<rect x="55" y="25" width="30" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" className="text-pastel-peach-strong" />
			<path d="M60 40 L80 40 M60 50 L75 50 M60 60 L78 60" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-pastel-peach-strong" />
		</svg>
	);
}

export interface CallLogicBannerProps {
	badge: string;
	title: string;
	subtitle: string;
	accent: CallGatewayAccent;
	bgVariant: CallLogicBgVariant;
	primaryCta: { label: string; href: string };
	secondaryLink?: { label: string; href: string };
	className?: string;
}

export function CallLogicBanner({
	badge,
	title,
	subtitle,
	accent,
	bgVariant,
	primaryCta,
	secondaryLink,
	className,
}: CallLogicBannerProps) {
	const reduceMotion = useReducedMotion();
	const styles = ACCENT_STYLES[accent];

	return (
		<section
			className={cn(
				'relative w-full overflow-hidden bg-muted/30 border-b border-border',
				className
			)}
			aria-labelledby="call-logic-banner-title"
		>
			<div className="section-container relative">
				<BgDecoration variant={bgVariant} />
				<motion.div
					initial={reduceMotion ? false : { opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
					className="relative z-10 py-16 md:py-20 lg:py-24"
				>
					{secondaryLink && (
						<motion.div
							initial={reduceMotion ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1 }}
							className="mb-6"
						>
							<Link
								href={secondaryLink.href}
								className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								<ChevronLeft className="size-4" aria-hidden />
								{secondaryLink.label}
							</Link>
						</motion.div>
					)}
					<motion.span
						initial={reduceMotion ? false : { opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.15 }}
						className={cn(
							'inline-block px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest',
							styles.badge
						)}
					>
						{badge}
					</motion.span>
					<motion.h1
						id="call-logic-banner-title"
						initial={reduceMotion ? false : { opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className={cn(
							'mt-4 font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground max-w-3xl',
							styles.titleHighlight
						)}
					>
						{title}
					</motion.h1>
					<motion.p
						initial={reduceMotion ? false : { opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.25 }}
						className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
					>
						{subtitle}
					</motion.p>
					<motion.div
						initial={reduceMotion ? false : { opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="mt-8 flex flex-wrap items-center gap-4"
					>
						<Button
							asChild
							size="lg"
							className={cn(
								'text-white border-0 shadow-lg transition-all duration-300',
								styles.ctaBg,
								styles.ctaHover
							)}
						>
							<Link href={primaryCta.href} className="inline-flex items-center gap-2">
								{primaryCta.label}
								<ArrowRight className="size-5" aria-hidden />
							</Link>
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
