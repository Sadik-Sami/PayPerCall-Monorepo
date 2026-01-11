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

export interface CaseStudyStripProps {
  items: CaseStudyItem[];
  title?: string;
  description?: string;
  className?: string;
}

export interface PricingPlan {
  name: string;
  description?: string;
  priceLabel: string;
  features: string[];
  isRecommended?: boolean;
  badge?: string;
}

export interface PricingTableProps {
  title?: string;
  description?: string;
  plans: PricingPlan[];
  billingNote?: string;
  className?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
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
  bullets: string[];
  formVariant?: 'short' | 'detailed';
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
