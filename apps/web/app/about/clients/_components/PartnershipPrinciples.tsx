'use client';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Building2 } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import { PARTNERSHIP_PRINCIPLES, type IndustryAccent } from '../_data/clients-content';

const ICON_MAP = {
  TrendingUp,
  ShieldCheck,
  Building2,
} as const;

const ACCENT_CARD: Record<IndustryAccent, string> = {
  sky: 'bg-pastel-sky/60 border-pastel-sky-border',
  mint: 'bg-pastel-mint/60 border-pastel-mint-border',
  lilac: 'bg-pastel-lilac/60 border-pastel-lilac-border',
  peach: 'bg-pastel-peach/60 border-pastel-peach-border',
  blush: 'bg-pastel-blush/60 border-pastel-blush-border',
  lime: 'bg-pastel-lime/60 border-pastel-lime-border',
};

const ACCENT_INK: Record<IndustryAccent, string> = {
  sky: 'text-pastel-sky-ink',
  mint: 'text-pastel-mint-ink',
  lilac: 'text-pastel-lilac-ink',
  peach: 'text-pastel-peach-ink',
  blush: 'text-pastel-blush-ink',
  lime: 'text-pastel-lime-ink',
};

export function PartnershipPrinciples() {
  return (
    <section className='section-container py-16 sm:py-20 md:py-24'>
      <div className='mx-auto max-w-2xl text-center'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>How we earn the wall</p>
        <h2 className='mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
          What every brand on this page has in common
        </h2>
        <p className='mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg'>
          We are picky about the programs we run because our partners are picky about who runs them. Three principles repeat across every engagement.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-80px' }}
        className='mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6'
      >
        {PARTNERSHIP_PRINCIPLES.map((principle) => {
          const Icon = ICON_MAP[principle.icon];
          return (
            <motion.article
              key={principle.id}
              variants={itemVariants}
              className={cn(
                'group relative flex flex-col gap-4 rounded-3xl border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8'
              )}
            >
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105',
                  ACCENT_CARD[principle.accent],
                  ACCENT_INK[principle.accent]
                )}
              >
                <Icon className='size-6' />
              </div>
              <h3 className='font-heading text-xl font-bold text-foreground'>{principle.title}</h3>
              <p className='text-sm leading-relaxed text-muted-foreground sm:text-[15px]'>
                {principle.description}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
