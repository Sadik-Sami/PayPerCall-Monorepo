'use client';
import { motion } from 'framer-motion';
import { cn } from '@workspace/ui/lib/utils';
import { ClientLogoCard } from './ClientLogoCard';
import type { IndustryAccent, IndustryGroup } from '../_data/clients-content';

const ACCENT_DOT: Record<IndustryAccent, string> = {
  sky: 'bg-pastel-sky-strong',
  mint: 'bg-pastel-mint-strong',
  lilac: 'bg-pastel-lilac-strong',
  peach: 'bg-pastel-peach-strong',
  blush: 'bg-pastel-blush-strong',
  lime: 'bg-pastel-lime-strong',
};

const ACCENT_LABEL: Record<IndustryAccent, string> = {
  sky: 'text-pastel-sky-strong',
  mint: 'text-pastel-mint-strong',
  lilac: 'text-pastel-lilac-strong',
  peach: 'text-pastel-peach-strong',
  blush: 'text-pastel-blush-strong',
  lime: 'text-pastel-lime-strong',
};

export function IndustryClientsGroup({ industry, index }: { industry: IndustryGroup; index: number }) {
  return (
    <motion.section
      id={industry.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.04 }}
      className='scroll-mt-24'
    >
      <div className='flex flex-wrap items-center gap-3'>
        <span className={cn('h-2 w-2 rounded-full', ACCENT_DOT[industry.accent])} />
        <h3 className={cn('text-xs font-semibold uppercase tracking-[0.24em]', ACCENT_LABEL[industry.accent])}>
          {industry.label}
        </h3>
        <span className='h-px flex-1 bg-linear-to-r from-border via-border/40 to-transparent' />
        <span className='inline-flex items-center rounded-full border border-border/60 bg-card/80 px-2.5 py-0.5 text-[10px] font-semibold tabular-nums text-muted-foreground'>
          {industry.clients.length.toString().padStart(2, '0')} brands
        </span>
      </div>

      <p className='mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]'>
        {industry.intro}
      </p>

      <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4'>
        {industry.clients.map((client) => (
          <ClientLogoCard key={client.name} client={client} accent={industry.accent} />
        ))}
      </div>
    </motion.section>
  );
}
