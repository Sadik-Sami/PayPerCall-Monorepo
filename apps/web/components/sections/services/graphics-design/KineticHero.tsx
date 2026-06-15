import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, ArrowDown, Sparkles, Diamond, Star, Flame, Check } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

const KineticDecor = dynamic(() => import('./KineticDecor').then((mod) => ({ default: mod.KineticDecor })));

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
	const accentGradient = ACCENT_TEXT[accentColour];
	const [halo1, halo2] = haloAccents;

	return (
		<section className='relative w-full overflow-hidden bg-background pt-28 pb-20 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28'>
			{/* Static decorative halos (CSS only — SSR safe) */}
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

			{/* Lazy-loaded decorative client island: marquee, mouse-tracked stickers, now-playing chip */}
			<KineticDecor stickerKind={stickerKind} marqueeTokens={marqueeTokens} nowPlaying={nowPlaying} />

			<div className='section-container relative z-10'>
				{/* Reserve marquee height so h1 doesn't shift when decor mounts */}
				{marqueeTokens && marqueeTokens.length > 0 && <div aria-hidden className='mx-auto mb-10 h-5 max-w-3xl' />}

				<div className='mx-auto flex max-w-5xl flex-col items-start text-left'>
					<span
						className={cn(
							'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-sm backdrop-blur-sm',
							KICKER_PILL[accentColour],
						)}>
						{eyebrow}
					</span>

					<h1
						className='mt-6 font-display font-extrabold tracking-tighter text-foreground'
						style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)', lineHeight: 1 }}>
						{lines.map((line, lineIdx) => {
							const isAccentLine = accent?.line === lineIdx;
							if (!isAccentLine) {
								return (
									<span key={lineIdx} className='block'>
										{line}
									</span>
								);
							}
							const accentWord = accent.word;
							const idx = line.indexOf(accentWord);
							const before = idx >= 0 ? line.slice(0, idx) : line;
							const after = idx >= 0 ? line.slice(idx + accentWord.length) : '';
							return (
								<span key={lineIdx} className='block'>
									{before}
									<em
										className={cn(
											'bg-linear-to-r bg-clip-text not-italic font-display font-extrabold italic text-transparent',
											accentGradient,
										)}>
										{accentWord}
									</em>
									{after}
								</span>
							);
						})}
					</h1>

					<p className='mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl'>{subDeck}</p>

					<div className='mt-9 flex flex-wrap items-center gap-3'>
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
					</div>

					{badges && badges.length > 0 && (
						<ul className='mt-10 flex flex-wrap gap-2.5'>
							{badges.map((badge, i) => {
								const Icon = BADGE_ICON_MAP[badge.icon];
								const tint = BADGE_ACCENTS[i % BADGE_ACCENTS.length] ?? 'lilac';
								return (
									<li key={badge.label}>
										<span
											className={cn(
												'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm',
												BADGE_PILL[tint],
											)}>
											<Icon className='size-3.5' />
											{badge.label}
										</span>
									</li>
								);
							})}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
}
