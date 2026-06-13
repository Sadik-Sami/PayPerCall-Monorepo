'use client';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import type { ClientBrand, IndustryAccent } from '../_data/clients-content';

const ACCENT_RING: Record<IndustryAccent, string> = {
  sky: 'group-hover:ring-pastel-sky-border',
  mint: 'group-hover:ring-pastel-mint-border',
  lilac: 'group-hover:ring-pastel-lilac-border',
  peach: 'group-hover:ring-pastel-peach-border',
  blush: 'group-hover:ring-pastel-blush-border',
  lime: 'group-hover:ring-pastel-lime-border',
};

const ACCENT_GLOW: Record<IndustryAccent, string> = {
  sky: 'group-hover:bg-pastel-sky/35',
  mint: 'group-hover:bg-pastel-mint/35',
  lilac: 'group-hover:bg-pastel-lilac/35',
  peach: 'group-hover:bg-pastel-peach/35',
  blush: 'group-hover:bg-pastel-blush/35',
  lime: 'group-hover:bg-pastel-lime/35',
};

export function ClientLogoCard({
  client,
  accent,
}: {
  client: ClientBrand;
  accent: IndustryAccent;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_4px_14px_-8px_rgba(15,23,42,0.16)] ring-2 ring-transparent transition-[box-shadow,ring-color] duration-300 hover:shadow-[0_14px_32px_-16px_rgba(15,23,42,0.28)] dark:bg-card',
        ACCENT_RING[accent]
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -top-12 left-1/2 h-24 w-32 -translate-x-1/2 rounded-full bg-transparent opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100',
          ACCENT_GLOW[accent]
        )}
      />
      <div className='relative flex aspect-[5/2] w-full items-center justify-center p-5 sm:p-6'>
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          fill
          sizes='(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw'
          className='object-contain p-1 transition-transform duration-300 group-hover:scale-[1.04]'
          loading='lazy'
        />
      </div>
      <figcaption className='border-t border-border/40 px-4 py-2.5 text-center text-xs font-medium text-muted-foreground'>
        {client.name}
      </figcaption>
    </motion.figure>
  );
}
