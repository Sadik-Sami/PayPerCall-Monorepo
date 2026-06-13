'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { NotFoundDisplay } from '@/components/sections/system/NotFoundDisplay';
import { PopularSections } from '@/components/sections/system/PopularSections';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: wire to Sentry/Datadog when observability is configured
    if (process.env.NODE_ENV !== 'production') {
      console.error('app/error.tsx caught:', error);
    }
  }, [error]);

  return (
    <main role='alert' className='flex flex-col'>
      <section className='relative overflow-hidden border-b border-border/60 bg-background py-20 md:py-28'>
        <div aria-hidden className='pointer-events-none absolute inset-0'>
          <div className='absolute -left-10 top-12 size-72 rounded-full bg-pastel-peach/45 blur-3xl' />
          <div className='absolute -right-10 top-16 size-80 rounded-full bg-pastel-blush/40 blur-3xl' />
          <div className='absolute bottom-0 left-1/2 size-72 -translate-x-1/2 rounded-full bg-pastel-sky/35 blur-3xl' />
          <div
            className='absolute inset-0 opacity-[0.04] dark:opacity-[0.06]'
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
        </div>

        <div className='section-container relative z-10'>
          <div className='mx-auto flex max-w-3xl flex-col items-center text-center'>
            <div className='inline-flex items-center gap-2 rounded-full border border-pastel-peach-border bg-pastel-peach/70 px-4 py-1.5 text-sm font-semibold text-pastel-peach-ink shadow-sm backdrop-blur-sm'>
              <AlertTriangle className='size-4' />
              Something went sideways
            </div>

            <NotFoundDisplay
              text='500'
              gradient='from-pastel-peach-strong via-pastel-blush-strong to-pastel-lilac-strong'
            />

            <h1 className='mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
              Something went wrong on our end
            </h1>
            <p className='mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
              The page hit an unexpected error while loading. Try again, head back home, or reach out if it keeps happening.
            </p>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
              <Button onClick={reset} size='lg' className='rounded-xl px-7'>
                <RefreshCw className='size-4' data-icon='inline-start' />
                Try again
              </Button>
              <Button asChild size='lg' variant='outline' className='rounded-xl px-7'>
                <Link href='/'>
                  Go home
                  <ArrowRight className='size-4' data-icon='inline-end' />
                </Link>
              </Button>
            </div>

            {error.digest && (
              <p
                className='mt-6 text-xs text-muted-foreground'
                aria-label={`Error reference identifier ${error.digest}`}
              >
                Reference: <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]'>{error.digest}</code>
              </p>
            )}
          </div>
        </div>
      </section>

      <div className='bg-muted/30'>
        <PopularSections eyebrow='Still stuck? Try one of these' />
      </div>
    </main>
  );
}
