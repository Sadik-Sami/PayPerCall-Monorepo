import type { Metadata } from 'next';
import { AboutPageCta } from '@/components/sections/about/AboutPageCta';
import { ClientsHero } from './_components/ClientsHero';
import { ClientsStatsStrip } from './_components/ClientsStatsStrip';
import { IndustryClientsDirectory } from './_components/IndustryClientsDirectory';
import { ClientsMarqueeStrip } from './_components/ClientsMarqueeStrip';
import { PartnershipPrinciples } from './_components/PartnershipPrinciples';
import { ClientsCrossLink } from './_components/ClientsCrossLink';
import { CTA_COPY, clientsJsonLd } from './_data/clients-content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Clients | Core Closer',
  description:
    'See the enterprise brands that trust Core Closer across insurance, financial services, retail, telecom, media, health, and lifestyle — the partners behind our performance marketing programs.',
  alternates: {
    canonical: '/about/clients',
  },
  openGraph: {
    title: 'Clients | Core Closer',
    description:
      'Brands that bet their growth on Core Closer: AARP, AT&T, Allstate, MetLife, Lyft, Apple TV+, and more across eight industries.',
    url: '/about/clients',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clients | Core Closer',
    description: 'Enterprise brands trusting Core Closer across insurance, finance, retail, media, and lifestyle.',
  },
};

export default function ClientsPage() {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(clientsJsonLd) }} />

      <main className='flex flex-col'>
        <ClientsHero />
        <div className='bg-muted/30'>
          <ClientsStatsStrip />
        </div>
        <div className='bg-background'>
          <IndustryClientsDirectory />
        </div>
        <div className='bg-muted/30'>
          <ClientsMarqueeStrip />
        </div>
        <div className='bg-background'>
          <PartnershipPrinciples />
        </div>
        <div className='bg-muted/30'>
          <ClientsCrossLink />
        </div>
        <div className='bg-background'>
          <AboutPageCta title={CTA_COPY.title} description={CTA_COPY.description} ctaLabel={CTA_COPY.ctaLabel} />
        </div>
      </main>
    </>
  );
}
