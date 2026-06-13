import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CROSS_LINK } from '../_data/clients-content';

export function ClientsCrossLink() {
  return (
    <section className='section-container py-16 sm:py-20'>
      <div className='group rounded-3xl border border-pastel-sky-border bg-pastel-sky/50 p-8 sm:p-10'>
        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-pastel-sky-ink'>{CROSS_LINK.eyebrow}</p>
        <div className='mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-2xl'>
            <h2 className='font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              {CROSS_LINK.title}
            </h2>
            <p className='mt-3 text-base leading-relaxed text-muted-foreground'>{CROSS_LINK.description}</p>
          </div>
          <Link
            href={CROSS_LINK.ctaHref}
            className='inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border/70 bg-card/80 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-md md:self-auto'
          >
            {CROSS_LINK.ctaLabel}
            <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>
      </div>
    </section>
  );
}
