'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@workspace/ui/components/dialog';
import { cn } from '@workspace/ui/lib/utils';
import type { CaseStudyCardItem, CaseStudyCardAccentColor } from '@/types/services';

const ACCENT_BG: Record<CaseStudyCardAccentColor, string> = {
	'pastel-peach': 'bg-pastel-peach',
	'pastel-lilac': 'bg-pastel-lilac',
	'pastel-lime': 'bg-pastel-lime',
	'pastel-mint': 'bg-pastel-mint',
	'pastel-sky': 'bg-pastel-sky',
	'pastel-blush': 'bg-pastel-blush',
};

interface CaseStudyModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	item: CaseStudyCardItem | null;
	accentColor: CaseStudyCardAccentColor;
}

export function CaseStudyModal({ open, onOpenChange, item, accentColor }: CaseStudyModalProps) {
	const accent = item?.accentColor ?? accentColor;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={cn(
					'max-w-[95vw] sm:max-w-2xl md:max-w-4xl p-0 gap-0 overflow-hidden rounded-3xl',
					'border-pastel-mint-border',
				)}
			>
				{item ? (
					<div className="grid grid-cols-1 md:grid-cols-2">
						<div
							className={cn(
								'relative aspect-square md:aspect-auto md:h-full overflow-hidden',
								ACCENT_BG[accent],
							)}
						>
							{item.image ? (
								<Image
									src={item.image.src}
									alt={item.image.alt}
									fill
									className="object-contain p-6 md:p-10"
									sizes="(max-width: 768px) 100vw, 50vw"
									unoptimized={item.image.src.startsWith('http')}
								/>
							) : (
								<div className="absolute inset-0 flex items-center justify-center text-sm text-foreground/40">
									No image
								</div>
							)}
						</div>

						<div className="flex flex-col gap-5 p-8 md:p-10 lg:p-12 bg-card">
							<DialogTitle className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-balance text-foreground">
								{item.title}
							</DialogTitle>
							<DialogDescription className="text-base md:text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
								{item.description}
							</DialogDescription>
						</div>
					</div>
				) : (
					<div className="p-10">
						<DialogTitle className="sr-only">Case study</DialogTitle>
						<DialogDescription className="sr-only">Loading…</DialogDescription>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
