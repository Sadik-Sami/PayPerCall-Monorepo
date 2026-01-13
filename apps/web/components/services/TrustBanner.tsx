'use client';
import { motion } from 'framer-motion';
import { Shield, Clock, RefreshCw, Headphones, Award, CheckCircle2 } from 'lucide-react';
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

const defaultGuarantees: TrustGuarantee[] = [
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We meet deadlines. Every milestone is tracked and communicated.',
  },
  {
    icon: RefreshCw,
    title: 'Revision Rounds',
    description: 'Included revisions until you are satisfied with the result.',
  },
  {
    icon: Shield,
    title: 'Code Ownership',
    description: 'You own 100% of the code. No lock-in, full handover.',
  },
  {
    icon: Headphones,
    title: 'Post-Launch Support',
    description: '30 days of priority support after every project launch.',
  },
];

const defaultStats: TrustStat[] = [
  { value: '99.9', label: 'Uptime SLA', suffix: '%' },
  { value: '4.9', label: 'Client rating', suffix: '/5' },
  { value: '48', label: 'Hour response', suffix: 'h' },
  { value: '0', label: 'Security breaches', suffix: '' },
];

export function TrustBanner({
  guarantees = defaultGuarantees,
  stats = defaultStats,
  badges = ['SOC 2 Ready', 'GDPR Compliant', 'PCI-DSS Aware'],
  headline = 'Built on trust, delivered with confidence',
  subheadline = 'Every engagement is backed by clear guarantees and transparent processes.',
  variant = 'default',
  className,
}: TrustBannerProps) {
  return (
    <section
      className={cn(
        'relative py-10 lg:py-18',
        variant === 'gradient' && 'bg-linear-to-br from-primary/5 via-background to-accent/5',
        variant === 'minimal' && 'bg-background',
        variant === 'default' && 'bg-muted/30',
        className
      )}
    >
      {/* Background pattern */}
      {variant === 'default' && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Commitment</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {headline}
            </h2>
            <p className="text-lg text-muted-foreground">{subheadline}</p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
              >
                <p className="text-4xl font-bold text-foreground lg:text-5xl">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-lg font-medium text-primary">{stat.suffix}</span>
                  )}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Guarantees grid */}
          <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon ?? CheckCircle2;
              return (
                <motion.div
                  key={guarantee.title}
                  variants={itemVariants}
                  custom={index}
                  className="group relative rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-xl"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{guarantee.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {guarantee.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust badges */}
          {badges.length > 0 && (
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {badge}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
