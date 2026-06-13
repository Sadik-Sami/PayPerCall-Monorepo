import { StatsGrid } from '@workspace/ui/components/sections/stats-grid';
import { STATS } from '../_data/clients-content';

export function ClientsStatsStrip() {
  return (
    <section className='section-container py-16 sm:py-20'>
      <div className='mx-auto mb-8 max-w-2xl text-center sm:mb-10'>
        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>By the numbers</p>
        <h2 className='mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
          Partnerships at the scale enterprise teams need
        </h2>
      </div>
      <StatsGrid stats={STATS} columns={4} />
    </section>
  );
}
