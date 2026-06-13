'use client';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Infinity as InfinityIcon } from 'lucide-react';
import { ALL_CLIENTS, type ClientBrand } from '../_data/clients-content';

function MarqueeChip({ client }: { client: ClientBrand }) {
  return (
    <div className='flex h-16 w-44 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-white px-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md sm:h-20 sm:w-48 dark:bg-card'>
      <div className='relative h-full w-full'>
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          fill
          sizes='192px'
          className='object-contain p-3'
          loading='lazy'
        />
      </div>
    </div>
  );
}

export function ClientsMarqueeStrip() {
  const reduceMotion = useReducedMotion();
  const midpoint = Math.ceil(ALL_CLIENTS.length / 2);
  const firstRow = ALL_CLIENTS;
  const secondRow = [...ALL_CLIENTS.slice(midpoint), ...ALL_CLIENTS.slice(0, midpoint)];

  return (
    <section className='relative overflow-hidden py-16 sm:py-20'>
      <div className='section-container mb-10 text-center sm:mb-12'>
        <div className='inline-flex items-center gap-2 rounded-full border border-pastel-mint-border bg-pastel-mint/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-pastel-mint-ink'>
          <InfinityIcon className='size-3.5' />
          The full roster
        </div>
        <h2 className='mt-5 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
          Every brand on the wall
        </h2>
        <p className='mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base'>
          {ALL_CLIENTS.length} partners. Hover to slow yourself down — let your eyes do the scrolling.
        </p>
      </div>

      {reduceMotion ? (
        <div className='section-container grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5'>
          {ALL_CLIENTS.map((client) => (
            <MarqueeChip key={client.name} client={client} />
          ))}
        </div>
      ) : (
        <div className='relative space-y-4'>
          <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background via-background/80 to-transparent sm:w-32' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background via-background/80 to-transparent sm:w-32' />

          <div className='flex overflow-hidden' aria-label='Scrolling list of partner brands, row one'>
            <motion.div
              animate={{ translateX: '-50%' }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
              className='flex w-max gap-3 pl-3 sm:gap-4 sm:pl-4'
            >
              {[0, 1].map((dupe) => (
                <div key={`row1-${dupe}`} className='flex gap-3 sm:gap-4'>
                  {firstRow.map((client, idx) => (
                    <MarqueeChip key={`row1-${client.name}-${idx}-${dupe}`} client={client} />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          <div className='flex overflow-hidden' aria-label='Scrolling list of partner brands, row two'>
            <motion.div
              animate={{ translateX: '-50%' }}
              transition={{ duration: 100, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
              className='flex w-max gap-3 pl-3 sm:gap-4 sm:pl-4'
            >
              {[0, 1].map((dupe) => (
                <div key={`row2-${dupe}`} className='flex gap-3 sm:gap-4'>
                  {secondRow.map((client, idx) => (
                    <MarqueeChip key={`row2-${client.name}-${idx}-${dupe}`} client={client} />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
