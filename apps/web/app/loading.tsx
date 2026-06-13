export default function Loading() {
  return (
    <div
      aria-live='polite'
      aria-busy='true'
      className='relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-background'
    >
      <div aria-hidden className='pointer-events-none absolute inset-0'>
        <div className='absolute left-1/3 top-1/4 size-72 -translate-x-1/2 rounded-full bg-pastel-sky/30 blur-3xl' />
        <div className='absolute right-1/3 bottom-1/4 size-72 translate-x-1/2 rounded-full bg-pastel-lilac/30 blur-3xl' />
      </div>

      <div className='relative z-10 flex flex-col items-center gap-5'>
        <span className='font-display text-xl font-bold tracking-tight text-foreground/80 sm:text-2xl'>
          Core Closer
        </span>

        <div className='flex items-center gap-2'>
          <span className='size-2.5 animate-pulse rounded-full bg-pastel-mint-strong [animation-delay:0ms] motion-reduce:animate-none' />
          <span className='size-2.5 animate-pulse rounded-full bg-pastel-lilac-strong [animation-delay:180ms] motion-reduce:animate-none' />
          <span className='size-2.5 animate-pulse rounded-full bg-pastel-sky-strong [animation-delay:360ms] motion-reduce:animate-none' />
        </div>

        <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground'>
          One moment
        </p>

        <span className='sr-only'>Loading the next page, please wait.</span>
      </div>
    </div>
  );
}
