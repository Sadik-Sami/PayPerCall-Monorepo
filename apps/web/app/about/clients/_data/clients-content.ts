export type IndustryAccent = 'sky' | 'mint' | 'lilac' | 'peach' | 'blush' | 'lime';

export interface ClientBrand {
  name: string;
  logo: string;
}

export interface IndustryGroup {
  id: string;
  label: string;
  accent: IndustryAccent;
  intro: string;
  clients: ClientBrand[];
}

// Hand-mapped because filename casing/separators are inconsistent across the
// /public/clients set (TurboTax→turbo_tax, WarbyParker→warbyparker, Prudential .jpg, etc.).
const C = (name: string, logo: string): ClientBrand => ({ name, logo: `/clients/${logo}` });

export const INDUSTRIES: IndustryGroup[] = [
  {
    id: 'insurance',
    label: 'Insurance & Protection',
    accent: 'sky',
    intro: 'Carriers and protection brands that depend on compliant, intent-rich consumer connections.',
    clients: [
      C('AIG', 'logo_aig.png'),
      C('Allstate', 'logo_allstate.png'),
      C('Liberty Mutual', 'logo_liberty_mutual.png'),
      C('MetLife', 'logo_metlife.png'),
      C('Prudential', 'logo_prudential.jpg'),
      C('Gerber Life Insurance', 'logo_gerber_life_insurance.png'),
      C('Choice Home Warranty', 'logo_choice_home_warranty.png'),
    ],
  },
  {
    id: 'finance',
    label: 'Financial Services',
    accent: 'mint',
    intro: 'Credit, lending, and money-movement teams that need qualified consumers on the line, fast.',
    clients: [
      C('Credit One Bank', 'logo_credit_one_bank.png'),
      C('Green Dot', 'logo_green_dot.png'),
      C('NetSpend', 'logo_netspend.png'),
      C('Stash', 'logo_stash.png'),
      C('Equifax', 'logo_equifax.png'),
      C('FreeScore360', 'logo_freescore360.png'),
      C('Lexington Law', 'logo_lexington_law.png'),
      C('Quicken Loans', 'logo_quicken_loans.png'),
      C('LendingTree', 'logo_lendingtree.png'),
      C('QuoteWizard', 'logo_quotewizard.png'),
      C('TurboTax', 'logo_turbo_tax.png'),
    ],
  },
  {
    id: 'retail',
    label: 'Retail & Consumer Goods',
    accent: 'peach',
    intro: 'Direct-to-consumer and household brands building repeatable acquisition motions.',
    clients: [
      C('Overstock', 'logo_overstock.png'),
      C("Harry's", 'logo_harrys.png'),
      C('Warby Parker', 'logo_warbyparker.png'),
      C('Wine.com', 'logo_winecom.png'),
      C('Quilted Northern', 'logo_quilted_northern.png'),
      C('Unilever', 'logo_unilever.png'),
      C('Blue Apron', 'logo_blue_apron.png'),
      C('DealDash', 'logo_deal_dash.png'),
      C('Publishers Clearing House', 'logo_publishers_clearing_house.png'),
    ],
  },
  {
    id: 'media',
    label: 'Telecom & Media',
    accent: 'lilac',
    intro: 'Telecom, streaming, and publishing teams routing demand into the right inbound channels.',
    clients: [
      C('AT&T', 'logo_att.png'),
      C('eFax', 'logo_efax.png'),
      C('Apple TV+', 'logo_apple_tv_plus.png'),
      C('Hearst', 'logo_hearst.png'),
      C('Meredith / People', 'logo_meredith_peoples.png'),
    ],
  },
  {
    id: 'health',
    label: 'Health & Wellness',
    accent: 'blush',
    intro: 'Healthcare, nonprofit, and wellness brands that require disciplined targeting and disclosures.',
    clients: [
      C('AARP', 'logo_aarp.png'),
      C('American Cancer Society', 'logo_american_cancer_society.png'),
      C('Nutrisystem', 'logo_nutrisystem.png'),
      C('Hear', 'logo_hear.png'),
    ],
  },
  {
    id: 'lifestyle',
    label: 'Travel & Lifestyle',
    accent: 'lime',
    intro: 'Mobility, travel, and consumer-identity brands acquiring members at predictable unit economics.',
    clients: [
      C('Carnival', 'logo_carnival.png'),
      C('Lyft', 'logo_lyft.png'),
      C('Ancestry', 'logo_ancestry.png'),
      C('Match', 'logo_match.png'),
      C('eHarmony', 'logo_eharmony.png'),
    ],
  },
  {
    id: 'education',
    label: 'Education & Skills',
    accent: 'sky',
    intro: 'Learning brands turning intent into enrolled, paying students.',
    clients: [
      C('Babbel', 'logo_babbel.png'),
      C('Hooked on Phonics', 'logo_hooked_on_phonics.png'),
    ],
  },
  {
    id: 'workforce',
    label: 'Workforce & Security',
    accent: 'mint',
    intro: 'Tools that protect people and pair them with their next opportunity.',
    clients: [
      C('ZipRecruiter', 'logo_ziprecruiter.png'),
      C('Norton', 'logo_norton.png'),
    ],
  },
];

export const ALL_CLIENTS: ClientBrand[] = INDUSTRIES.flatMap((i) => i.clients);

// Hand-picked recognisable marks for the hero preview row.
export const HERO_PREVIEW_LOGOS: ClientBrand[] = [
  ALL_CLIENTS.find((c) => c.name === 'AT&T')!,
  ALL_CLIENTS.find((c) => c.name === 'Apple TV+')!,
  ALL_CLIENTS.find((c) => c.name === 'AARP')!,
  ALL_CLIENTS.find((c) => c.name === 'Lyft')!,
  ALL_CLIENTS.find((c) => c.name === 'MetLife')!,
  ALL_CLIENTS.find((c) => c.name === 'Liberty Mutual')!,
];

export const HERO_COPY = {
  eyebrow: 'Clients',
  title: 'Brands that bet their growth on Core Closer',
  subtitle:
    'Insurance carriers, financial services, retail challengers, and media leaders trust us to turn intent into qualified calls, leads, and conversions across every channel they run.',
  trustPills: [
    `${ALL_CLIENTS.length} enterprise brands`,
    `${INDUSTRIES.length} industries`,
    '15+ years of partnerships',
  ],
};

export const STATS = [
  { label: 'Enterprise brands partnered', value: ALL_CLIENTS.length, suffix: '+' },
  { label: 'Industries activated', value: INDUSTRIES.length, suffix: '' },
  { label: 'Years of performance partnerships', value: 15, suffix: '+' },
  { label: 'Qualified consumer touchpoints', value: 1, suffix: 'B+' },
];

export const PARTNERSHIP_PRINCIPLES = [
  {
    id: 'performance',
    icon: 'TrendingUp' as const,
    accent: 'mint' as IndustryAccent,
    title: 'Performance-aligned',
    description:
      'We invest alongside our partners. Every program is engineered around the metrics that matter to your P&L — CPA, CPL, contact rate, conversion.',
  },
  {
    id: 'compliance',
    icon: 'ShieldCheck' as const,
    accent: 'sky' as IndustryAccent,
    title: 'Compliance-first',
    description:
      'TCPA, HIPAA, and industry-specific consent frameworks are baked into our routing, disclosures, and call handling — never bolted on after launch.',
  },
  {
    id: 'depth',
    icon: 'Building2' as const,
    accent: 'lilac' as IndustryAccent,
    title: 'Operational depth',
    description:
      'Owned call centers, in-house media buying, and our own engineering team mean we ship, measure, and adjust without the friction of stacked vendors.',
  },
];

export const CROSS_LINK = {
  eyebrow: 'Continue reading',
  title: 'Hear what these brands actually say',
  description:
    'Logos tell you we work together. Read the testimonials to see what those partnerships sound like from the people running the programs.',
  ctaLabel: 'Read client testimonials',
  ctaHref: '/about/testimonials',
};

export const CTA_COPY = {
  title: 'Want your brand on this wall?',
  description:
    'Tell us where you want more qualified consumers, which channels you trust, and what compliance looks like in your category — we will return a tight, plausible plan.',
  ctaLabel: 'Discuss your brand',
};

export const clientsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Core Closer Client Brands',
  description:
    'Enterprise brands Core Closer partners with across insurance, finance, retail, media, health, and lifestyle.',
  itemListElement: ALL_CLIENTS.map((client, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Organization',
      name: client.name,
    },
  })),
};
