'use client';
import { motion, useReducedMotion } from 'framer-motion';
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
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Full Stack' },
  { name: 'Astro', category: 'Full Stack' },
  { name: 'Svelte', category: 'Full Stack' },
  { name: 'Hono', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Go', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Django', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Neon', category: 'Database' },
  { name: 'Supabase', category: 'Database' },
  { name: 'Polar', category: 'Payments' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'Vercel', category: 'Hosting' },
  { name: 'Render', category: 'Hosting' },
  { name: 'Netlify', category: 'Hosting' },
  { name: 'Hostinger', category: 'Hosting' },
  { name: 'Cloudflare', category: 'Hosting' },
  { name: 'Turborepo', category: 'CI/CD' },
  { name: 'GitHub Actions', category: 'CI/CD' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Redis', category: 'Cache' },
  { name: 'Kafka', category: 'Messaging' },
  { name: 'RabbitMQ', category: 'Messaging' },
  { name: 'BullMQ', category: 'Messaging' },
  { name: 'Resend', category: 'Communications' },
  { name: 'Twilio', category: 'Communications' },
  { name: 'SendGrid', category: 'Communications' },
  { name: 'Mailgun', category: 'Communications' },
  { name: 'Mailchimp', category: 'Communications' },
  { name: 'Postman', category: 'API' },
  { name: 'GraphQL', category: 'API' },
  { name: 'REST APIs', category: 'API' },
  { name: 'Socket.io', category: 'API' },
  { name: 'WebSockets', category: 'API' },
  { name: 'WebRTC', category: 'API' },
  { name: 'Docker', category: 'Containerization' }
];

type FeaturedChipStyle = {
  card: string;
  border: string;
  text: string;
  iconBg: string;
  shape: string;
  height: string;
  offset: string;
  titleSize: string;
  categorySize: string;
  scale?: string;
};

type MarqueeChipColor = {
  card: string;
  border: string;
  text: string;
  icon: string;
};

const FEATURED_CHIP_STYLES: FeaturedChipStyle[] = [
  {
    card: 'bg-[#D0F4DE] dark:bg-emerald-950/40',
    border: 'border-emerald-100 dark:border-emerald-800/50',
    text: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-white dark:bg-emerald-900',
    shape: 'rounded-[40px_12px_40px_12px]',
    height: 'h-40',
    offset: 'pt-6',
    titleSize: 'text-sm',
    categorySize: 'text-[11px]',
  },
  {
    card: 'bg-[#E2D9F3] dark:bg-purple-950/40',
    border: 'border-purple-100 dark:border-purple-800/50',
    text: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-white dark:bg-purple-900',
    shape: 'rounded-[12px_40px_12px_40px]',
    height: 'h-44',
    offset: 'pt-0',
    scale: 'scale-[1.03]',
    titleSize: 'text-sm',
    categorySize: 'text-[11px]',
  },
  {
    card: 'bg-[#FFEACC] dark:bg-orange-950/40',
    border: 'border-orange-100 dark:border-orange-800/50',
    text: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-white dark:bg-orange-900',
    shape: 'rounded-[35px_35px_12px_35px]',
    height: 'h-36',
    offset: 'pt-4',
    titleSize: 'text-sm',
    categorySize: 'text-[11px]',
  },
  {
    card: 'bg-[#CBEBF9] dark:bg-sky-950/40',
    border: 'border-sky-100 dark:border-sky-800/50',
    text: 'text-sky-600 dark:text-sky-400',
    iconBg: 'bg-white dark:bg-sky-900',
    shape: 'rounded-[12px_35px_35px_12px]',
    height: 'h-36',
    offset: 'pt-4',
    titleSize: 'text-sm',
    categorySize: 'text-[11px]',
  },
  {
    card: 'bg-[#FAD2E1] dark:bg-rose-950/40',
    border: 'border-rose-100 dark:border-rose-800/50',
    text: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-white dark:bg-rose-900',
    shape: 'rounded-[40px_12px_40px_12px]',
    height: 'h-48',
    offset: 'pt-2',
    scale: 'scale-[1.06]',
    titleSize: 'text-base',
    categorySize: 'text-[11px]',
  },
  {
    card: 'bg-[#DDF4CC] dark:bg-lime-950/40',
    border: 'border-lime-100 dark:border-lime-800/50',
    text: 'text-lime-600 dark:text-lime-400',
    iconBg: 'bg-white dark:bg-lime-900',
    shape: 'rounded-[12px_40px_12px_40px]',
    height: 'h-40',
    offset: 'pt-6',
    titleSize: 'text-sm',
    categorySize: 'text-[11px]',
  },
  {
    card: 'bg-muted/70 dark:bg-muted/35',
    border: 'border-border/70',
    text: 'text-muted-foreground',
    iconBg: 'bg-background dark:bg-card',
    shape: 'rounded-[35px_35px_12px_35px]',
    height: 'h-32',
    offset: 'pt-2',
    titleSize: 'text-xs',
    categorySize: 'text-[10px]',
  },
  {
    card: 'bg-blue-50 dark:bg-blue-900/25',
    border: 'border-blue-100 dark:border-blue-800/40',
    text: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-white dark:bg-blue-950',
    shape: 'rounded-[12px_35px_35px_12px]',
    height: 'h-36',
    offset: 'pt-6',
    titleSize: 'text-xs',
    categorySize: 'text-[10px]',
  },
  {
    card: 'bg-muted/70 dark:bg-muted/35',
    border: 'border-border/70',
    text: 'text-muted-foreground',
    iconBg: 'bg-background dark:bg-card',
    shape: 'rounded-[40px_12px_40px_12px]',
    height: 'h-32',
    offset: 'pt-0',
    titleSize: 'text-xs',
    categorySize: 'text-[10px]',
  },
];

const MARQUEE_CHIP_COLORS: MarqueeChipColor[] = [
  {
    card: 'bg-[#D0F4DE] dark:bg-emerald-950/35',
    border: 'border-emerald-100 dark:border-emerald-800/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    card: 'bg-[#E2D9F3] dark:bg-purple-950/35',
    border: 'border-purple-100 dark:border-purple-800/40',
    text: 'text-purple-700 dark:text-purple-300',
    icon: 'text-purple-600 dark:text-purple-400',
  },
  {
    card: 'bg-[#CBEBF9] dark:bg-sky-950/35',
    border: 'border-sky-100 dark:border-sky-800/40',
    text: 'text-sky-700 dark:text-sky-300',
    icon: 'text-sky-600 dark:text-sky-400',
  },
  {
    card: 'bg-[#FFEACC] dark:bg-orange-950/35',
    border: 'border-orange-100 dark:border-orange-800/40',
    text: 'text-orange-700 dark:text-orange-300',
    icon: 'text-orange-600 dark:text-orange-400',
  },
  {
    card: 'bg-[#FAD2E1] dark:bg-rose-950/35',
    border: 'border-rose-100 dark:border-rose-800/40',
    text: 'text-rose-700 dark:text-rose-300',
    icon: 'text-rose-600 dark:text-rose-400',
  },
  {
    card: 'bg-[#DDF4CC] dark:bg-lime-950/35',
    border: 'border-lime-100 dark:border-lime-800/40',
    text: 'text-lime-700 dark:text-lime-300',
    icon: 'text-lime-600 dark:text-lime-400',
  },
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

function IntegrationHeader({
  title,
  description,
  ctaLabel,
  ctaHref,
  center = false,
}: {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  center?: boolean;
}) {
  return (
    <div className={cn('space-y-6', center && 'mx-auto max-w-2xl text-center')}>
      <div className='inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-100/80 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:border-blue-800/60 dark:bg-blue-900/30 dark:text-blue-400'>
        <Puzzle className='h-4 w-4' />
        <span>Integrations</span>
      </div>
      <div className='space-y-4'>
        <h2 className='text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-4xl lg:text-5xl'>
          {title}
        </h2>
        <p className='max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg'>
          {description}
        </p>
      </div>
      {ctaLabel && ctaHref && (
        <Button
          asChild
          variant='outline'
          size='lg'
          className='group rounded-full border-border/70 bg-card/80 px-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-lg'
        >
          <a href={ctaHref}>
            {ctaLabel}
            <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
          </a>
        </Button>
      )}
    </div>
  );
}

function FeaturedIntegrationChip({
  integration,
  index,
}: {
  integration: IntegrationItem;
  index: number;
}) {
  const style = FEATURED_CHIP_STYLES[index % FEATURED_CHIP_STYLES.length]!;
  const initials = getInitials(integration.name);

  return (
    <div className={cn(style.offset, 'transform-[skewY(2deg)]')}>
      <div
        className={cn(
          'group relative w-full border px-3 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:px-4',
          style.height,
          style.shape,
          style.card,
          style.border,
          style.scale
        )}
      >
        <div className={cn('mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full shadow-sm sm:mb-4 sm:h-14 sm:w-14', style.iconBg)}>
          {integration.logo ? (
            <Image
              src={integration.logo}
              alt={integration.name}
              width={32}
              height={32}
              className='h-7 w-7 object-contain sm:h-8 sm:w-8'
            />
          ) : (
            <span className={cn('text-lg font-bold sm:text-xl', style.text)}>{initials}</span>
          )}
        </div>
        <p className={cn('font-bold text-slate-900 dark:text-white', style.titleSize)}>{integration.name}</p>
        {integration.category && (
          <p className={cn('mt-1 font-medium uppercase tracking-wider text-muted-foreground', style.categorySize)}>
            {integration.category}
          </p>
        )}
      </div>
    </div>
  );
}

function MarqueeIntegrationChip({
  integration,
  index,
}: {
  integration: IntegrationItem;
  index: number;
}) {
  const palette = MARQUEE_CHIP_COLORS[index % MARQUEE_CHIP_COLORS.length]!;
  const initials = getInitials(integration.name);

  return (
    <div
      className={cn(
        'flex min-w-60 items-center gap-3 rounded-2xl border px-4 py-3 sm:min-w-68 sm:gap-4 sm:px-5 sm:py-3.5',
        palette.card,
        palette.border
      )}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm dark:bg-card sm:h-12 sm:w-12',
          palette.icon
        )}
      >
        {integration.logo ? (
          <Image
            src={integration.logo}
            alt={integration.name}
            width={24}
            height={24}
            className='h-6 w-6 object-contain sm:h-7 sm:w-7'
          />
        ) : (
          initials
        )}
      </span>
      <div className='space-y-0.5'>
        <span className={cn('block text-sm font-semibold sm:text-base', palette.text)}>{integration.name}</span>
        {integration.category && (
          <span className='block text-xs font-medium uppercase tracking-wide text-muted-foreground'>
            {integration.category}
          </span>
        )}
      </div>
    </div>
  );
}

function CategoryChip({ integration }: { integration: IntegrationItem }) {
  return (
    <div className='group flex items-center gap-3 rounded-2xl border border-border/60 bg-card/80 px-3 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-lg'>
      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary'>
        {getInitials(integration.name)}
      </div>
      <div className='min-w-0'>
        <p className='truncate text-sm font-semibold text-foreground'>{integration.name}</p>
        {integration.category && (
          <p className='text-xs uppercase tracking-wide text-muted-foreground'>{integration.category}</p>
        )}
      </div>
    </div>
  );
}

function MarqueeLane({
  integrations,
  reduceMotion,
}: {
  integrations: IntegrationItem[];
  reduceMotion: boolean;
}) {
  const midpoint = Math.ceil(integrations.length / 2);
  const firstRow = integrations;
  const secondRow =
    integrations.length > 1
      ? [...integrations.slice(midpoint), ...integrations.slice(0, midpoint)]
      : integrations;

  if (reduceMotion) {
    return (
      <div className='grid gap-5 sm:grid-cols-2'>
        {integrations.map((integration, index) => (
          <MarqueeIntegrationChip
            key={`${integration.name}-${integration.category ?? 'general'}-${index}`}
            integration={integration}
            index={index}
          />
        ))}
      </div>
    );
  }

  return (
    <div className='relative space-y-4 sm:space-y-5'>
      <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent sm:w-15 h-full' />
      <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent sm:w-20 h-full' />

      <div className='flex overflow-hidden' aria-label='Scrolling list of integration platforms row one'>
        <motion.div
          animate={{ translateX: '-50%' }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
          className='flex w-max gap-3 pl-3 hover:paused sm:gap-4 sm:pl-4'
        >
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={`row1-group-${arrayIndex}`} className='flex gap-3 sm:gap-4'>
              {firstRow.map((integration, index) => (
                <MarqueeIntegrationChip
                  key={`row1-${integration.name}-${integration.category ?? 'general'}-${index}`}
                  integration={integration}
                  index={index}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className='flex overflow-hidden' aria-label='Scrolling list of integration platforms row two'>
        <motion.div
          animate={{ translateX: '-50%' }}
          transition={{ duration: 85, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
          className='flex w-max gap-3 pl-3 hover:paused sm:gap-4 sm:pl-4'
        >
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={`row2-group-${arrayIndex}`} className='flex gap-3 sm:gap-4'>
              {secondRow.map((integration, index) => (
                <MarqueeIntegrationChip
                  key={`row2-${integration.name}-${integration.category ?? 'general'}-${index}`}
                  integration={integration}
                  index={index + midpoint}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function GroupedIntegrationGrid({ integrations }: { integrations: IntegrationItem[] }) {
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
    <div className='space-y-10'>
      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className='space-y-4'>
          <h3 className='text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
            {category}
          </h3>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {items.map((integration) => (
              <CategoryChip key={`${category}-${integration.name}`} integration={integration} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function IntegrationLogos({
  integrations = defaultIntegrations,
  title = 'Seamless integrations with your stack',
  description = 'Connect your digital ecosystem effortlessly. We sync with your preferred platforms—from commerce and CRM to analytics and operations tools—so your team works from one reliable source of truth.',
  ctaLabel = 'Explore all tools',
  ctaHref = '/integrations',
  variant = 'grid',
  className,
}: IntegrationLogosProps) {
  const reduceMotion = useReducedMotion();
  const featuredIntegrations = integrations.slice(0, 9);

  if (variant === 'marquee') {
    return (
      <section className={cn('relative overflow-hidden py-16 lg:py-20', className)}>
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute inset-0 bg-linear-to-br from-background via-background to-primary/5' />
          <div className='absolute -top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-3xl' />
          <div className='absolute -bottom-1/4 right-0 h-150 w-150 rounded-full bg-gradient-radial from-accent/8 via-transparent to-transparent blur-3xl' />
        </div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='relative z-10 mx-auto w-full max-w-7xl space-y-10 px-6 lg:px-12 xl:px-0'
        >
          <motion.div variants={itemVariants}>
            <IntegrationHeader
              title={title}
              description={description}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              center
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MarqueeLane integrations={integrations} reduceMotion={!!reduceMotion} />
          </motion.div>
        </motion.div>
      </section>
    );
  }

  if (variant === 'grouped') {
    return (
      <section className={cn('relative overflow-hidden py-20 lg:py-24', className)}>
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute inset-0 bg-linear-to-br from-background via-background to-primary/5' />
          <div className='absolute -top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-3xl' />
          <div className='absolute -bottom-1/4 right-0 h-150 w-150 rounded-full bg-gradient-radial from-accent/8 via-transparent to-transparent blur-3xl' />
        </div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          className='relative z-10 mx-auto w-full max-w-7xl space-y-12 px-6 lg:px-12 xl:px-0'
        >
          <motion.div variants={itemVariants}>
            <IntegrationHeader
              title={title}
              description={description}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              center
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <GroupedIntegrationGrid integrations={integrations} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MarqueeLane integrations={integrations} reduceMotion={!!reduceMotion} />
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // Default global layout: reference-inspired two-column composition + marquee lane
  return (
    <section className={cn('relative overflow-hidden py-20 lg:py-24', className)}>
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-br from-background via-background to-primary/5' />
        <div className='absolute -top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-3xl' />
        <div className='absolute -bottom-1/4 right-0 h-150 w-150 rounded-full bg-gradient-radial from-accent/8 via-transparent to-transparent blur-3xl' />
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        className='relative z-10 mx-auto w-full max-w-7xl space-y-12 px-6 lg:px-12 xl:px-0'
      >
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16'>
          <motion.div variants={itemVariants}>
            <IntegrationHeader
              title={title}
              description={description}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
            />
          </motion.div>

          <motion.div variants={itemVariants} className='relative py-2 sm:py-6'>
            <div className='absolute inset-0 rounded-[2.75rem] bg-linear-to-br from-blue-100/40 via-purple-50/30 to-rose-100/40 blur-3xl dark:from-blue-900/10 dark:via-purple-900/5 dark:to-rose-900/10' />
            <div className='relative grid grid-cols-2 gap-4 transform-[skewY(-2deg)] sm:grid-cols-3 sm:gap-5 lg:gap-6'>
              {featuredIntegrations.map((integration, index) => (
                <FeaturedIntegrationChip
                  key={`${integration.name}-${integration.category ?? 'general'}-${index}`}
                  integration={integration}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className='space-y-4'>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <p className='text-sm font-medium text-muted-foreground'>
              40+ frameworks, platforms, and tools supported
            </p>
            <p className='text-xs uppercase tracking-wider text-muted-foreground'>
              Built for interoperability
            </p>
          </div>
          <MarqueeLane integrations={integrations} reduceMotion={!!reduceMotion} />
        </motion.div>
      </motion.div>
    </section>
  );
}
