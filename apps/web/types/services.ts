import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import type { LucideIcon } from 'lucide-react';

export interface ServiceCta {
  label: string;
  href: string;
}

export interface ServiceHeroProps {
  pill?: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: ServiceCta;
  secondaryCta?: ServiceCta;
  features?: string[];
  stat?: {
    value: string;
    label: string;
  };
  footnote?: string;
  media?: {
    src: string | StaticImageData;
    alt: string;
    caption?: string;
  };
  variant?: 'default' | 'centered' | 'asymmetric' | 'professional' | 'minimal' | 'showcase';
  className?: string;
}

export interface TrustLogo {
  name: string;
  src?: string;
  alt?: string;
  fallbackInitials?: string;
}

export interface TrustMetric {
  label: string;
  value: string;
  helperText?: string;
}

export interface TrustStripProps {
  logos?: TrustLogo[];
  metrics?: TrustMetric[];
  className?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface ProcessStepsProps {
  steps: ProcessStep[];
  title?: string;
  description?: string;
  variant?: 'grid' | 'timeline' | 'cards';
  className?: string;
}

export interface CaseStudyItem {
  client?: string;
  industry?: string;
  problem: string;
  solution: string;
  outcome: string;
  link?: string;
  icon?: ReactNode;
  metrics?: {
    label: string;
    value: string;
    helperText?: string;
  }[];
}

export type CaseStudyCardAccentColor =
  | 'pastel-peach'
  | 'pastel-lilac'
  | 'pastel-lime'
  | 'pastel-mint'
  | 'pastel-sky'
  | 'pastel-blush';

export interface CaseStudyCardItem {
  title: string;
  description: string;
  image?: { src: string; alt: string };
  accentColor?: CaseStudyCardAccentColor;
  link?: string;
}

export interface CaseStudyStripProps {
  items: CaseStudyCardItem[];
  title?: string;
  description?: string;
  cta?: { text: string; href: string };
  autoScrollInterval?: number;
  className?: string;
}

const PASTEL_COLORS: CaseStudyCardAccentColor[] = [
  'pastel-peach',
  'pastel-lilac',
  'pastel-lime',
  'pastel-mint',
  'pastel-sky',
  'pastel-blush',
];

export function mapCaseStudyToCard(
  item: CaseStudyItem,
  index: number
): CaseStudyCardItem {
  return {
    title: item.client ?? 'Case Study',
    description: [item.outcome, item.problem].filter(Boolean).join(' '),
    accentColor: PASTEL_COLORS[index % PASTEL_COLORS.length],
    link: item.link,
  };
}

export interface PricingPlan {
  name: string;
  description?: string;
  priceLabel: string;
  features: string[];
  isRecommended?: boolean;
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  bulletPoints?: string[];
}

export interface FAQSectionProps {
  items: FaqItem[];
  title?: string;
  description?: string;
  className?: string;
}

export interface FreeConsultationSectionProps {
  title: string;
  subtitle?: string;
  /**
   * Legacy simple bullet list used by existing pages.
   * Prefer `features` for richer, more distinctive content.
   */
  bullets?: string[];
  /**
   * Rich benefit items (icon + title + description). When provided, takes precedence over `bullets`.
   * Icon can be a LucideIcon (client) or string key (e.g. 'Check', 'Zap') for server components.
   */
  features?: {
    title: string;
    description: string;
    icon?: LucideIcon | string;
  }[];
  /**
   * Badge displayed above the left panel title.
   * Icon can be a LucideIcon (client) or string key (e.g. 'Check') for server components.
   */
  badge?: {
    label: string;
    icon?: LucideIcon | string;
  };
  /**
   * Small italic line at the bottom of the left panel.
   */
  tagline?: string;
  formVariant?: 'short' | 'detailed';
  /**
   * High-level service category used for lead routing/reporting (e.g. `app-dev`, `web-dev`, `cms`).
   */
  category: string;
  /**
   * Optional explicit source path. If omitted, components can infer it from `usePathname()`.
   * Example: `/services/app-dev`
   */
  sourcePage?: string;
  /**
   * Optional form heading on the right panel.
   */
  formTitle?: string;
  /**
   * Label text for the primary submit button.
   */
  submitLabel?: string;
  /**
   * Optional urgency badge shown under the submit button.
   * Icon can be a LucideIcon (client) or string key for server components.
   */
  urgencyBadge?: {
    text: string;
    icon?: LucideIcon | string;
  };
  /**
   * If provided, replaces the generic project focus input with a Select bound to `projectType`.
   * Selected value is submitted as `projectType` (stored as `project_type` in DB).
   */
  verticalsOptions?: { value: string; label: string }[];
  /**
   * Label and placeholder for the textarea bound to `projectSummary`.
   */
  textareaLabel?: string;
  textareaPlaceholder?: string;
  className?: string;
}

export interface ServiceNavItem {
  label: string;
  href: string;
  summary?: string;
  capabilities?: string[];
  icon?: LucideIcon;
  isExternal?: boolean;
}

export interface TechStackItem {
  label: string;
  icon: LucideIcon;
}

export interface ServiceCardProps {
  label: string;
  href: string;
  summary: string;
  capabilities?: string[];
  icon?: LucideIcon;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export interface FeatureGridItem {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface FeatureGridProps {
  items: FeatureGridItem[];
  title?: string;
  description?: string;
  columns?: 2 | 3 | 4;
  variant?: 'cards' | 'minimal' | 'bento';
  className?: string;
}

export interface DeliverableItem {
  title: string;
  description: string;
  bulletPoints?: string[];
}

export interface DeliverablesSectionProps {
  title?: string;
  subtitle?: string;
  standards?: string[];
  deliverables: DeliverableItem[];
  className?: string;
}
