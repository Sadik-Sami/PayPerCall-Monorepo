import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { PopularSections } from '@/components/sections/system/PopularSections';
import { NotFoundDisplay } from '@/components/sections/system/NotFoundDisplay';

export const metadata: Metadata = {
  title: 'Page not found · Core Closer',
  description:
    'The page you were looking for is no longer here. Browse popular sections or get in touch with the team.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className='flex flex-col'>
      <section className='relative overflow-hidden border-b border-border/60 bg-background py-20 md:py-28 lg:py-32'>
        <div aria-hidden className='pointer-events-none absolute inset-0'>
          <div className='absolute -left-10 top-10 size-72 rounded-full bg-pastel-sky/45 blur-3xl' />
          <div className='absolute -right-10 top-20 size-80 rounded-full bg-pastel-lilac/40 blur-3xl' />
          <div className='absolute bottom-0 left-1/2 size-72 -translate-x-1/2 rounded-full bg-pastel-mint/40 blur-3xl' />
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
            <div className='inline-flex items-center gap-2 rounded-full border border-pastel-lilac-border bg-pastel-lilac/70 px-4 py-1.5 text-sm font-semibold text-pastel-lilac-ink shadow-sm backdrop-blur-sm'>
              <Compass className='size-4' />
              Lost your way?
            </div>

            <NotFoundDisplay />

            <h1 className='mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
              Page not found
            </h1>
            <p className='mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
              The URL you followed has been moved, renamed, or never existed. Pick a destination below and we will get you back on track.
            </p>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
              <Button asChild size='lg' className='rounded-xl px-7'>
                <Link href='/'>
                  Take me home
                  <ArrowRight className='size-4' data-icon='inline-end' />
                </Link>
              </Button>
              <Button asChild size='lg' variant='outline' className='rounded-xl px-7'>
                <Link href='/contact'>
                  <MessageCircle className='size-4' data-icon='inline-start' />
                  Contact us
                </Link>
              </Button>
            </div>

            <p className='mt-6 text-sm text-muted-foreground'>
              Think this is broken?{' '}
              <Link
                href='/contact'
                className='font-medium text-foreground underline-offset-4 hover:underline'
              >
                Let us know
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <div className='bg-muted/30'>
        <PopularSections />
      </div>
    </main>
  );
}
