'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { containerVariants, itemVariants } from '@/lib/animations';
import { HERO_COPY, HERO_PREVIEW_LOGOS } from '../_data/clients-content';

export function ClientsHero() {
  return (
    <section className='relative overflow-hidden border-b border-border/60 bg-background py-16 sm:py-20 md:py-24'>
      <div aria-hidden className='pointer-events-none absolute inset-0'>
        <div className='absolute left-0 top-10 size-56 rounded-full bg-pastel-sky/40 blur-3xl' />
        <div className='absolute right-0 top-12 size-64 rounded-full bg-pastel-lilac/35 blur-3xl' />
        <div className='absolute bottom-0 left-1/2 size-52 -translate-x-1/2 rounded-full bg-pastel-mint/35 blur-3xl' />
        <div
          className='absolute inset-0 opacity-[0.03] dark:opacity-[0.05]'
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='section-container relative z-10'
      >
        <div className='mx-auto max-w-4xl text-center'>
          <motion.div variants={itemVariants}>
            <div className='inline-flex items-center gap-2 rounded-full border border-pastel-lilac-border bg-pastel-lilac/70 px-4 py-1.5 text-sm font-semibold text-pastel-lilac-ink shadow-sm backdrop-blur-sm'>
              <span className='relative flex h-4 w-4 items-center justify-center'>
                <Sparkles className='size-4' />
                <span className='absolute inset-0 -m-1 animate-ping rounded-full bg-pastel-lilac-strong/25 [animation-duration:2.4s]' />
              </span>
              {HERO_COPY.eyebrow}
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className='mt-6 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl'
          >
            {HERO_COPY.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className='mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'
          >
            {HERO_COPY.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className='mt-7 flex flex-wrap items-center justify-center gap-2 text-sm'>
            {HERO_COPY.trustPills.map((pill) => (
              <span
                key={pill}
                className='inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-foreground shadow-sm backdrop-blur-sm'
              >
                <CheckCircle2 className='size-4 text-pastel-mint-strong' />
                {pill}
              </span>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className='mt-8 flex justify-center'>
            <Button asChild size='lg' className='rounded-xl px-7'>
              <Link href='#industries'>
                Explore the brands
                <ArrowRight className='size-4' data-icon='inline-end' />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className='relative mt-14 sm:mt-16'>
          <p className='mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground'>
            A glimpse at the wall
          </p>
          <div className='pointer-events-none absolute inset-y-8 left-0 z-10 hidden w-24 bg-linear-to-r from-background to-transparent sm:block' />
          <div className='pointer-events-none absolute inset-y-8 right-0 z-10 hidden w-24 bg-linear-to-l from-background to-transparent sm:block' />
          <ul className='mx-auto flex max-w-5xl flex-wrap items-stretch justify-center gap-3 sm:gap-4'>
            {HERO_PREVIEW_LOGOS.map((client) => (
              <li
                key={client.name}
                className='relative flex h-16 w-32 items-center justify-center rounded-2xl border border-border/60 bg-white px-3 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:h-20 sm:w-40 dark:bg-card'
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  sizes='160px'
                  className='object-contain p-3'
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
