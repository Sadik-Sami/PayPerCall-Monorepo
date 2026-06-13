'use client';
import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import { Puzzle, ArrowRight, Sparkles } from 'lucide-react';
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

// Maps display name → SVG filename in /public/dev (without extension).
// Every entry in defaultIntegrations resolves to a real file.
const LOGO_MAP: Record<string, string> = {
  React: 'React',
  'Next.js': 'Next.js',
  Astro: 'Astro',
  Svelte: 'Svelte',
  'Vue.js': 'Vue.js',
  'Solid.js': 'Solid.js',
  Qwik: 'Qwik',
  TypeScript: 'TypeScript',
  'Tailwind CSS': 'Tailwind-CSS',
  Vite: 'Vite',
  'Node.js': 'Node.js',
  Express: 'Express',
  'Nest.js': 'Nest.js',
  Fastify: 'Fastify',
  Go: 'Go',
  Python: 'Python',
  Django: 'Django',
  Flask: 'Flask',
  FastAPI: 'FastAPI',
  Laravel: 'Laravel',
  Spring: 'Spring',
  PostgreSQL: 'PostgresSQL',
  MongoDB: 'MongoDB',
  MySQL: 'MySQL',
  Redis: 'Redis',
  SQLite: 'SQLite',
  Firebase: 'Firebase',
  Vercel: 'Vercel',
  AWS: 'AWS',
  Cloudflare: 'Cloudflare',
  'Google Cloud': 'Google-Cloud',
  Heroku: 'Heroku',
  'Digital Ocean': 'Digital-Ocean',
  Docker: 'Docker',
  Kubernetes: 'Kubernetes',
  'GitHub Actions': 'GitHub-Actions',
  GitLab: 'GitLab',
  CircleCI: 'CircleCI',
  Strapi: 'Strapi',
  Contentful: 'Contentful',
  'Wix Studio': 'Wix',
  Kafka: 'Apache-Kafka',
  RabbitMQ: 'RabbitMQ',
  GraphQL: 'GraphQL',
  Postman: 'Postman',
  'Socket.io': 'Socket.io',
  Swagger: 'Swagger',
  // Extended map for caller-defined integrations across service pages
  Algolia: 'Algolia',
  'Android Studio': 'Android-Studio',
  Android: 'Android',
  Angular: 'Angular',
  Apple: 'Apple',
  Bootstrap: 'Bootstrap',
  Bun: 'Bun',
  Cypress: 'Cypress',
  Dart: 'Dart',
  Deno: 'Deno',
  Drupal: 'Drupal',
  Elasticsearch: 'Elastic-Search',
  ESLint: 'ESLint',
  Figma: 'Figma',
  Flutter: 'Flutter',
  GitHub: 'GitHub',
  Gradle: 'Gradle',
  Jest: 'Jest',
  jQuery: 'jQuery',
  Kotlin: 'Kotlin',
  'Material UI': 'Material-UI',
  Nuxt: 'Nuxt-JS',
  'Nuxt.js': 'Nuxt-JS',
  Playwright: 'Playwrite',
  'React Native': 'React',
  Sanity: 'Sanity',
  Sass: 'Sass',
  Salesforce: 'Salesforce',
  Storybook: 'Storybook',
  Swift: 'Swift',
  WebAssembly: 'WebAssembly',
  Webpack: 'Webpack',
  WooCommerce: 'WooCommerce',
  WordPress: 'WordPress',
  Xcode: 'Xcode',
};

function logoFor(item: IntegrationItem): string | null {
  if (item.logo) return item.logo;
  const file = LOGO_MAP[item.name];
  console.log(item.name)
  return file ? `/dev/${file}.svg` : null;
}

// Featured 9 lead with the most recognisable marks; remainder grouped by category.
const defaultIntegrations: IntegrationItem[] = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Vercel', category: 'Hosting' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Astro', category: 'Frontend' },
  { name: 'Svelte', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Solid.js', category: 'Frontend' },
  { name: 'Qwik', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Vite', category: 'Frontend' },
  { name: 'Express', category: 'Backend' },
  { name: 'Nest.js', category: 'Backend' },
  { name: 'Fastify', category: 'Backend' },
  { name: 'Go', category: 'Backend' },
  { name: 'Go', category: 'Language' },
  { name: 'Python', category: 'Backend' },
  { name: 'Python', category: 'Language' },
  { name: 'Django', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'Laravel', category: 'Backend' },
  { name: 'Spring', category: 'Backend' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'SQLite', category: 'Database' },
  { name: 'Firebase', category: 'Database' },
  { name: 'Cloudflare', category: 'Hosting' },
  { name: 'Google Cloud', category: 'Cloud' },
  { name: 'Heroku', category: 'Hosting' },
  { name: 'Digital Ocean', category: 'Hosting' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'GitHub Actions', category: 'DevOps' },
  { name: 'GitLab', category: 'DevOps' },
  { name: 'CircleCI', category: 'DevOps' },
  { name: 'Kafka', category: 'Messaging' },
  { name: 'RabbitMQ', category: 'Messaging' },
  { name: 'GraphQL', category: 'API' },
  { name: 'Postman', category: 'API' },
  { name: 'Socket.io', category: 'API' },
  { name: 'Swagger', category: 'API' },
];

type FeaturedChipStyle = {
  card: string;
  border: string;
  spotlight: string;
  shape: string;
  height: string;
  offset: string;
  scale?: string;
};

type MarqueeChipColor = {
  card: string;
  border: string;
  text: string;
  ringHover: string;
};

const FEATURED_CHIP_STYLES: FeaturedChipStyle[] = [
  {
    card: 'bg-pastel-mint',
    border: 'border-pastel-mint-border',
    spotlight: 'rgba(255,255,255,0.7)',
    shape: 'rounded-[40px_12px_40px_12px]',
    height: 'h-40',
    offset: 'pt-6',
  },
  {
    card: 'bg-pastel-lilac',
    border: 'border-pastel-lilac-border',
    spotlight: 'rgba(255,255,255,0.75)',
    shape: 'rounded-[12px_40px_12px_40px]',
    height: 'h-44',
    offset: 'pt-0',
    scale: 'scale-[1.03]',
  },
  {
    card: 'bg-pastel-peach',
    border: 'border-pastel-peach-border',
    spotlight: 'rgba(255,255,255,0.7)',
    shape: 'rounded-[35px_35px_12px_35px]',
    height: 'h-36',
    offset: 'pt-4',
  },
  {
    card: 'bg-pastel-sky',
    border: 'border-pastel-sky-border',
    spotlight: 'rgba(255,255,255,0.7)',
    shape: 'rounded-[12px_35px_35px_12px]',
    height: 'h-36',
    offset: 'pt-4',
  },
  {
    card: 'bg-pastel-blush',
    border: 'border-pastel-blush-border',
    spotlight: 'rgba(255,255,255,0.78)',
    shape: 'rounded-[40px_12px_40px_12px]',
    height: 'h-48',
    offset: 'pt-2',
    scale: 'scale-[1.06]',
  },
  {
    card: 'bg-pastel-lime',
    border: 'border-pastel-lime-border',
    spotlight: 'rgba(255,255,255,0.7)',
    shape: 'rounded-[12px_40px_12px_40px]',
    height: 'h-40',
    offset: 'pt-6',
  },
  {
    card: 'bg-muted/70 dark:bg-muted/35',
    border: 'border-border/70',
    spotlight: 'rgba(255,255,255,0.45)',
    shape: 'rounded-[35px_35px_12px_35px]',
    height: 'h-32',
    offset: 'pt-2',
  },
  {
    card: 'bg-pastel-sky',
    border: 'border-pastel-sky-border',
    spotlight: 'rgba(255,255,255,0.7)',
    shape: 'rounded-[12px_35px_35px_12px]',
    height: 'h-36',
    offset: 'pt-6',
  },
  {
    card: 'bg-muted/70 dark:bg-muted/35',
    border: 'border-border/70',
    spotlight: 'rgba(255,255,255,0.45)',
    shape: 'rounded-[40px_12px_40px_12px]',
    height: 'h-32',
    offset: 'pt-0',
  },
];

const MARQUEE_CHIP_COLORS: MarqueeChipColor[] = [
  {
    card: 'bg-pastel-mint',
    border: 'border-pastel-mint-border',
    text: 'text-pastel-mint-ink',
    ringHover: 'hover:ring-pastel-mint-border',
  },
  {
    card: 'bg-pastel-lilac',
    border: 'border-pastel-lilac-border',
    text: 'text-pastel-lilac-ink',
    ringHover: 'hover:ring-pastel-lilac-border',
  },
  {
    card: 'bg-pastel-sky',
    border: 'border-pastel-sky-border',
    text: 'text-pastel-sky-ink',
    ringHover: 'hover:ring-pastel-sky-border',
  },
  {
    card: 'bg-pastel-peach',
    border: 'border-pastel-peach-border',
    text: 'text-pastel-peach-ink',
    ringHover: 'hover:ring-pastel-peach-border',
  },
  {
    card: 'bg-pastel-blush',
    border: 'border-pastel-blush-border',
    text: 'text-pastel-blush-ink',
    ringHover: 'hover:ring-pastel-blush-border',
  },
  {
    card: 'bg-pastel-lime',
    border: 'border-pastel-lime-border',
    text: 'text-pastel-lime-ink',
    ringHover: 'hover:ring-pastel-lime-border',
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

function LogoMark({
  item,
  size = 'md',
  className,
}: {
  item: IntegrationItem;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const src = logoFor(item);
  const dim =
    size === 'sm'
      ? { chip: 'h-10 w-10', img: 24, imgClass: 'h-6 w-6', text: 'text-xs' }
      : size === 'lg'
        ? { chip: 'h-16 w-16', img: 36, imgClass: 'h-9 w-9', text: 'text-xl' }
        : { chip: 'h-12 w-12 sm:h-14 sm:w-14', img: 32, imgClass: 'h-7 w-7 sm:h-8 sm:w-8', text: 'text-base sm:text-lg' };

  return (
    <span
      className={cn(
        'relative flex items-center justify-center rounded-full bg-white shadow-[0_4px_14px_-6px_rgba(15,23,42,0.25),0_1px_2px_-1px_rgba(15,23,42,0.15)] ring-1 ring-black/[0.04] dark:bg-card dark:ring-white/[0.06]',
        dim.chip,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={item.name}
          width={dim.img}
          height={dim.img}
          className={cn('object-contain', dim.imgClass)}
          loading='lazy'
        />
      ) : (
        <span className={cn('font-bold text-foreground/70', dim.text)}>{getInitials(item.name)}</span>
      )}
    </span>
  );
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
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border border-pastel-sky-border bg-pastel-sky/90 px-4 py-1.5 text-sm font-semibold text-pastel-sky-ink shadow-sm backdrop-blur-sm',
          center && 'mx-auto'
        )}
      >
        <span className='relative flex h-4 w-4 items-center justify-center'>
          <Puzzle className='h-4 w-4' />
          <span className='absolute inset-0 -m-1 animate-ping rounded-full bg-pastel-sky-strong/20 [animation-duration:2.4s]' />
        </span>
        <span>Integrations</span>
      </motion.div>

      <div className='space-y-4'>
        <h2 className='font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-4xl lg:text-5xl'>
          {title}
        </h2>
        <div className={cn('flex items-center gap-3', center && 'justify-center')}>
          <span aria-hidden className='h-px w-12 bg-linear-to-r from-transparent via-border to-transparent' />
          <Sparkles className='h-3.5 w-3.5 text-pastel-lilac-strong' />
          <span aria-hidden className='h-px w-12 bg-linear-to-r from-transparent via-border to-transparent' />
        </div>
        <p
          className={cn(
            'text-base leading-relaxed text-muted-foreground md:text-lg',
            center ? 'mx-auto max-w-xl' : 'max-w-xl'
          )}
        >
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
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const reduceMotion = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseX.set(-200);
    mouseY.set(-200);
  }

  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, ${style.spotlight}, transparent 70%)`;

  return (
    <motion.div
      variants={itemVariants}
      className={cn(style.offset, 'transform-[skewY(2deg)]')}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={reduceMotion ? undefined : { y: -6, rotate: 0.4 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className={cn(
          'group relative w-full overflow-hidden border px-3 py-4 text-center shadow-[0_8px_24px_-12px_rgba(15,23,42,0.18)] transition-shadow duration-300 hover:shadow-[0_18px_38px_-16px_rgba(15,23,42,0.28)] sm:px-4',
          style.height,
          style.shape,
          style.card,
          style.border,
          style.scale
        )}
      >
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        />
        <div className='relative flex h-full flex-col items-center justify-center gap-2'>
          <LogoMark item={integration} className='mb-1 transition-transform duration-300 group-hover:scale-110' />
          <p className='text-sm font-bold text-slate-900 dark:text-white sm:text-[15px]'>{integration.name}</p>
          {integration.category && (
            <p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
              {integration.category}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
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

  return (
    <div
      className={cn(
        'group flex min-w-60 items-center gap-3 rounded-2xl border px-4 py-3 ring-2 ring-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:min-w-68 sm:gap-4 sm:px-5 sm:py-3.5',
        palette.card,
        palette.border,
        palette.ringHover
      )}
    >
      <LogoMark item={integration} size='sm' />
      <div className='space-y-0.5'>
        <span className={cn('block text-sm font-semibold sm:text-base', palette.text)}>
          {integration.name}
        </span>
        {integration.category && (
          <span className='block text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground'>
            {integration.category}
          </span>
        )}
      </div>
    </div>
  );
}

function CategoryChip({ integration }: { integration: IntegrationItem }) {
  return (
    <div className='group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card/80 px-3 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-lg'>
      <span
        aria-hidden
        className='absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-linear-to-b from-pastel-lilac-strong via-pastel-sky-strong to-pastel-mint-strong transition-transform duration-300 group-hover:scale-y-100'
      />
      <LogoMark item={integration} size='sm' />
      <div className='min-w-0'>
        <p className='truncate text-sm font-semibold text-foreground'>{integration.name}</p>
        {integration.category && (
          <p className='text-[10px] uppercase tracking-[0.14em] text-muted-foreground'>
            {integration.category}
          </p>
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
    <div className='relative space-y-3 sm:space-y-4'>
      <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background via-background/80 to-transparent sm:w-28 h-full' />
      <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background via-background/80 to-transparent sm:w-28 h-full' />

      <div className='flex overflow-hidden' aria-label='Scrolling list of integration platforms row one'>
        <motion.div
          animate={{ translateX: '-50%' }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
          className='flex w-max gap-3 pl-3 sm:gap-4 sm:pl-4'
        >
          {[0, 1].map((arrayIndex) => (
            <div key={`row1-group-${arrayIndex}`} className='flex gap-3 sm:gap-4'>
              {firstRow.map((integration, index) => (
                <MarqueeIntegrationChip
                  key={`row1-${integration.name}-${integration.category ?? 'general'}-${index}-${arrayIndex}`}
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
          transition={{ duration: 90, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
          className='flex w-max gap-3 pl-3 sm:gap-4 sm:pl-4'
        >
          {[0, 1].map((arrayIndex) => (
            <div key={`row2-group-${arrayIndex}`} className='flex gap-3 sm:gap-4'>
              {secondRow.map((integration, index) => (
                <MarqueeIntegrationChip
                  key={`row2-${integration.name}-${integration.category ?? 'general'}-${index}-${arrayIndex}`}
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

const CATEGORY_ACCENT: Record<string, string> = {
  Frontend: 'bg-pastel-sky-strong',
  Backend: 'bg-pastel-mint-strong',
  Database: 'bg-pastel-lilac-strong',
  Hosting: 'bg-pastel-peach-strong',
  Cloud: 'bg-pastel-blush-strong',
  DevOps: 'bg-pastel-lime-strong',
  Language: 'bg-pastel-sky-strong',
  Messaging: 'bg-pastel-peach-strong',
  API: 'bg-pastel-lilac-strong',
};

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
      {Object.entries(categories).map(([category, items], idx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.05 }}
          className='space-y-4'
        >
          <div className='flex items-center gap-3'>
            <span className={cn('h-1.5 w-1.5 rounded-full', CATEGORY_ACCENT[category] ?? 'bg-muted-foreground/50')} />
            <h3 className='text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>
              {category}
            </h3>
            <span className='h-px flex-1 bg-linear-to-r from-border via-border/50 to-transparent' />
            <span className='text-[10px] font-medium tabular-nums text-muted-foreground/60'>
              {items.length.toString().padStart(2, '0')}
            </span>
          </div>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {items.map((integration) => (
              <CategoryChip key={`${category}-${integration.name}`} integration={integration} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AmbientBackdrop() {
  return (
    <div className='absolute inset-0 -z-10 overflow-hidden'>
      <div className='absolute inset-0 bg-linear-to-br from-background via-background to-primary/5' />
      <div className='absolute -top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-3xl' />
      <div className='absolute -bottom-1/4 right-0 h-150 w-150 rounded-full bg-gradient-radial from-accent/8 via-transparent to-transparent blur-3xl' />
      <div
        aria-hidden
        className='absolute inset-0 opacity-[0.025] dark:opacity-[0.04]'
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
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
        <AmbientBackdrop />

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
            <MarqueeLane integrations={integrations} reduceMotion={!!reduceMotion} />
          </motion.div>
        </motion.div>
      </section>
    );
  }

  if (variant === 'grouped') {
    return (
      <section className={cn('relative overflow-hidden py-6 lg:py-12', className)}>
        <AmbientBackdrop />

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

  return (
    <section className={cn('relative overflow-hidden w-full', className)}>
      <AmbientBackdrop />

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        className='section-container relative z-10 space-y-10 md:space-y-12'
      >
        <div className='grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16'>
          <motion.div variants={itemVariants}>
            <IntegrationHeader
              title={title}
              description={description}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
            />
          </motion.div>

          <motion.div variants={itemVariants} className='relative py-2 sm:py-6'>
            <div className='absolute inset-0 rounded-[2.75rem] bg-linear-to-br from-pastel-sky via-pastel-lilac to-pastel-blush opacity-40 blur-3xl dark:opacity-20' />
            <motion.div
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-80px' }}
              className='relative grid grid-cols-2 gap-4 transform-[skewY(-2deg)] sm:grid-cols-3 sm:gap-5 lg:gap-6'
            >
              {featuredIntegrations.map((integration, index) => (
                <FeaturedIntegrationChip
                  key={`${integration.name}-${integration.category ?? 'general'}-${index}`}
                  integration={integration}
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className='space-y-4'>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <p className='text-sm font-medium text-muted-foreground'>
              <span className='font-bold text-foreground'>{integrations.length}+</span> frameworks, platforms, and tools supported
            </p>
            <p className='text-xs uppercase tracking-[0.18em] text-muted-foreground'>
              Built for interoperability
            </p>
          </div>
          <MarqueeLane integrations={integrations} reduceMotion={!!reduceMotion} />
        </motion.div>
      </motion.div>
    </section>
  );
}
