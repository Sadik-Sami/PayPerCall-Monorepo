import { Building2 } from 'lucide-react';
import { IndustryClientsGroup } from './IndustryClientsGroup';
import { INDUSTRIES } from '../_data/clients-content';

export function IndustryClientsDirectory() {
  return (
    <section id='industries' className='section-container py-16 sm:py-20 md:py-24'>
      <div className='mx-auto mb-12 max-w-2xl text-center sm:mb-14'>
        <div className='inline-flex items-center gap-2 rounded-full border border-pastel-sky-border bg-pastel-sky/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-pastel-sky-ink'>
          <Building2 className='size-3.5' />
          Industries we serve
        </div>
        <h2 className='mt-5 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
          Eight categories, one operating playbook
        </h2>
        <p className='mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg'>
          The brands we work with span regulated and direct-to-consumer categories alike. The throughline is the same: serious teams that need disciplined acquisition.
        </p>
      </div>

      <div className='space-y-14 sm:space-y-16'>
        {INDUSTRIES.map((industry, index) => (
          <IndustryClientsGroup key={industry.id} industry={industry} index={index} />
        ))}
      </div>
    </section>
  );
}
