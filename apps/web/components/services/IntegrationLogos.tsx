'use client';
import { motion } from 'framer-motion';
import { Puzzle, ArrowRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import { Button } from '@workspace/ui/components/button';
import Image from 'next/image';

export interface IntegrationItem {
  name: string;
  logo?: string;
  category?: string;
}

export interface IntegrationLogosProps {
  integrations?: IntegrationItem[];
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: 'grid' | 'marquee' | 'grouped';
  className?: string;
}

const defaultIntegrations: IntegrationItem[] = [
  { name: 'Stripe', category: 'Payments' },
  { name: 'Shopify', category: 'E-commerce' },
  { name: 'HubSpot', category: 'CRM' },
  { name: 'Salesforce', category: 'CRM' },
  { name: 'Mailchimp', category: 'Marketing' },
  { name: 'Google Analytics', category: 'Analytics' },
  { name: 'Segment', category: 'Analytics' },
  { name: 'Contentful', category: 'CMS' },
  { name: 'Sanity', category: 'CMS' },
  { name: 'Vercel', category: 'Hosting' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Supabase', category: 'Backend' },
];

function getInitials(name: string): string {
  const words = name.split(' ').filter(Boolean);
  if (words.length === 1) return words[0]?.slice(0, 2).toUpperCase() ?? '';
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function IntegrationLogo({ integration }: { integration: IntegrationItem }) {
  return (
    <div className="group flex flex-col items-center gap-3">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg md:h-20 md:w-20">
        {integration.logo ? (
          <Image
            src={integration.logo}
            alt={integration.name}
            width={32}
            height={32}
            className="h-8 w-8 object-contain opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0 md:h-10 md:w-10"
          />
        ) : (
          <span className="text-lg font-bold text-muted-foreground transition-colors group-hover:text-primary md:text-xl">
            {getInitials(integration.name)}
          </span>
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{integration.name}</p>
        {integration.category && (
          <p className="text-xs text-muted-foreground">{integration.category}</p>
        )}
      </div>
    </div>
  );
}

export function IntegrationLogos({
  integrations = defaultIntegrations,
  title = 'Seamless integrations with your stack',
  description = 'We connect your website with the tools you already use—from payments and CRMs to analytics and content management.',
  ctaLabel = 'See all integrations',
  ctaHref = '/integrations',
  variant = 'grid',
  className,
}: IntegrationLogosProps) {
  if (variant === 'marquee') {
    return (
      <section className={cn('overflow-hidden py-16', className)}>
        <div className="section-container mb-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div variants={itemVariants}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <Puzzle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Integrations</span>
              </div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {title}
              </h2>
              <p className="text-muted-foreground">{description}</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />

          <div className="flex gap-8 animate-[marquee_40s_linear_infinite]">
            {[...integrations, ...integrations].map((integration, i) => (
              <div key={`${integration.name}-${i}`} className="shrink-0">
                <IntegrationLogo integration={integration} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'grouped') {
    const categories = integrations.reduce(
      (acc, integration) => {
        const cat = integration.category ?? 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(integration);
        return acc;
      },
      {} as Record<string, IntegrationItem[]>
    );

    return (
      <section className={cn('section-container py-20 lg:py-28', className)}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Puzzle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Integrations</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
            <p className="text-muted-foreground">{description}</p>
          </motion.div>

          {/* Grouped integrations */}
          <motion.div variants={itemVariants} className="space-y-12">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category}>
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category}
                </h3>
                <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
                  {items.map((integration) => (
                    <IntegrationLogo key={integration.name} integration={integration} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          {ctaLabel && ctaHref && (
            <motion.div variants={itemVariants} className="flex justify-center">
              <Button variant="outline" size="lg" asChild>
                <a href={ctaHref} className="group">
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </section>
    );
  }

  // Default grid variant
  return (
    <section className={cn('section-container py-20 lg:py-28', className)}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
              <Puzzle className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Integrations</span>
            </div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {ctaLabel && ctaHref && (
            <Button variant="outline" asChild>
              <a href={ctaHref} className="group">
                {ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          )}
        </motion.div>

        {/* Logo grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6"
        >
          {integrations.map((integration) => (
            <IntegrationLogo key={integration.name} integration={integration} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
