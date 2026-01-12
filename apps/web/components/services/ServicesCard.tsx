'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@workspace/ui/lib/utils';
import { cardVariants } from '@/lib/animations';
import type { ServiceCardProps } from '@/types/services';

export function ServiceCard({
  label,
  href,
  summary,
  capabilities,
  icon: Icon,
  variant = 'default',
  className,
}: ServiceCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  return (
    <motion.div variants={cardVariants}>
      <Link
        href={href}
        className={cn(
          'group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300',
          isFeatured
            ? 'border-primary/30 bg-linear-to-br from-primary/10 via-card to-card shadow-glow hover:shadow-glow-lg'
            : 'border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-xl',
          isCompact ? 'p-4' : 'p-6',
          className
        )}
      >
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="relative space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Service
              </p>
              <h3 className={cn('font-semibold text-foreground', isCompact ? 'text-base' : 'text-lg')}>
                {label}
              </h3>
            </div>
            {Icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
            )}
          </div>

          {/* Summary */}
          <p className={cn('text-muted-foreground', isCompact ? 'text-sm' : 'text-base')}>
            {summary}
          </p>

          {/* Capabilities */}
          {capabilities && capabilities.length > 0 && !isCompact && (
            <div className="flex flex-wrap gap-2">
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="rounded-full bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {cap}
                </span>
              ))}
            </div>
          )}

          {/* Learn more link */}
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
