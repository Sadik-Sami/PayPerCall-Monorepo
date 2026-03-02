'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Shield,
  Clock,
  RefreshCw,
  Headphones,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import type { LucideIcon } from 'lucide-react';

export interface TrustGuarantee {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export interface TrustStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface TrustBannerProps {
  guarantees?: TrustGuarantee[];
  stats?: TrustStat[];
  badges?: string[];
  headline?: string;
  subheadline?: string;
  variant?: 'default' | 'minimal' | 'gradient';
  className?: string;
}

const STAT_COLORS = [
  { border: 'border-l-pastel-mint-border border-b-pastel-mint-border' },
  { border: 'border-t-pastel-lilac-border border-r-pastel-lilac-border' },
  { border: 'border-l-pastel-sky-border border-b-pastel-sky-border' },
  { border: 'border-t-pastel-peach-border border-r-pastel-peach-border' },
] as const;

const GUARANTEE_COLORS = [
  {
    iconBg: 'bg-pastel-sky',
    iconText: 'text-pastel-sky-ink',
  },
  {
    iconBg: 'bg-pastel-lilac',
    iconText: 'text-pastel-lilac-ink',
  },
  {
    iconBg: 'bg-pastel-mint',
    iconText: 'text-pastel-mint-ink',
  },
  {
    iconBg: 'bg-pastel-peach',
    iconText: 'text-pastel-peach-ink',
  },
] as const;

const defaultGuarantees: TrustGuarantee[] = [
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description:
      'We meet deadlines. Every milestone is tracked and communicated transparently through our client portal.',
  },
  {
    icon: RefreshCw,
    title: 'Revision Rounds',
    description:
      'Included revisions until you are 100% satisfied with the result. We don\'t stop until it\'s perfect.',
  },
  {
    icon: Shield,
    title: 'Code Ownership',
    description:
      'You own 100% of the intellectual property. No vendor lock-in, with clean and well-documented handovers.',
  },
  {
    icon: Headphones,
    title: 'Post-Launch Support',
    description:
      '30 days of complimentary priority support after every project launch to ensure everything runs smoothly.',
  },
];

const defaultStats: TrustStat[] = [
  { value: '99.9', label: 'Uptime SLA', suffix: '%' },
  { value: '4.9', label: 'Client Rating', suffix: '/5' },
  { value: '48', label: 'Hour Response', suffix: 'h' },
  { value: '0', label: 'Security Breaches', suffix: '' },
];

const reducedMotionContainerVariants = { hidden: {}, visible: {} };
const reducedMotionItemVariants = { hidden: {}, visible: {} };

export function TrustBanner({
  guarantees = defaultGuarantees,
  stats = defaultStats,
  badges = ['SOC 2 Ready', 'GDPR Compliant', 'PCI-DSS Aware'],
  subheadline =
    'Every engagement is backed by clear guarantees and transparent processes. We don\'t just build software; we build partnerships that last.',
  variant = 'default',
  className,
}: TrustBannerProps) {
  const reduceMotion = useReducedMotion();
  const containerVariantsToUse = reduceMotion ? reducedMotionContainerVariants : containerVariants;
  const itemVariantsToUse = reduceMotion ? reducedMotionItemVariants : itemVariants;

  return (
    <section
      className={cn(
        'relative overflow-hidden w-full py-12 sm:py-16 md:py-20 lg:py-24',
        variant === 'gradient' &&
          'bg-linear-to-br from-primary/5 via-background to-primary/5',
        variant === 'minimal' && 'bg-background',
        variant === 'default' && 'bg-muted/30',
        className
      )}
    >
      {/* Subtle grid/dot background */}
      {variant === 'default' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      <div className="section-container relative z-10">
        <motion.div
          variants={containerVariantsToUse}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariantsToUse}
            className="mb-6 sm:mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Award className="h-4 w-4" />
              Our Commitment
            </span>
          </motion.div>

          {/* Headline + subheadline */}
          <motion.div
            variants={itemVariantsToUse}
            className="mb-12 lg:mb-16 max-w-3xl text-center"
          >
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-5xl leading-tight text-balance">
              Built on{' '}
              <span className="font-serif italic text-primary">trust</span>,
              delivered with{' '}
              <span className="font-serif italic text-primary">confidence</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:mt-6 sm:text-lg max-w-2xl mx-auto">
              {subheadline}
            </p>
          </motion.div>

          {/* Stats row – glass cards with colored borders */}
          <motion.div
            variants={itemVariantsToUse}
            className="mb-12 lg:mb-16 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => {
              const colorSet = STAT_COLORS[index % STAT_COLORS.length];
              const borderClass = colorSet?.border ?? STAT_COLORS[0].border;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariantsToUse}
                  whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={cn(
                    'rounded-[2.5rem_0.5rem_2.5rem_0.5rem] border bg-card/50 dark:bg-white/5 backdrop-blur-sm p-6 sm:p-8 text-center flex flex-col items-center justify-center border-border/50',
                    borderClass
                  )}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1 tabular-nums">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-primary text-xl sm:text-2xl ml-0.5">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Guarantee cards – no floating, hover scale only */}
          <motion.div
            variants={itemVariantsToUse}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon ?? Shield;
              const colorSet = GUARANTEE_COLORS[index % GUARANTEE_COLORS.length];
              const iconBg = colorSet?.iconBg ?? GUARANTEE_COLORS[0].iconBg;
              const iconText = colorSet?.iconText ?? GUARANTEE_COLORS[0].iconText;
              return (
                <motion.div
                  key={guarantee.title}
                  variants={itemVariantsToUse}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }
                  }
                  className="group relative rounded-2xl border border-border/50 bg-card dark:bg-slate-900/50 p-6 sm:p-8 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-xl dark:shadow-none"
                >
                  <motion.div
                    className={cn(
                      'mb-4 sm:mb-6 w-12 h-12 rounded-xl flex items-center justify-center',
                      iconBg,
                      iconText
                    )}
                    whileHover={reduceMotion ? undefined : { scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
                    {guarantee.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {guarantee.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Compliance badges */}
          {badges.length > 0 && (
            <motion.div
              variants={itemVariantsToUse}
              className="mt-12 sm:mt-16 lg:mt-20 flex flex-wrap items-center justify-center gap-4 sm:gap-6 opacity-80"
            >
              {badges.map((badge) => (
                <motion.div
                  key={badge}
                  whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  {badge}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
