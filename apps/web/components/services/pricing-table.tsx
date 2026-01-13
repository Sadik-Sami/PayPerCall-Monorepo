'use client';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, cardVariants } from '@/lib/animations';
import { Button } from '@workspace/ui/components/button';
import type { PricingTableProps } from '@/types/services';

export function PricingTable({
  title,
  description,
  plans,
  billingNote,
  className,
}: PricingTableProps) {
  return (
    <section className={cn('section-container py-16', className)}>
      {(title || description) && (
        <div className="mb-12 max-w-2xl">
          {title && <h2 className="mb-4 text-foreground text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h2>}
          {description && <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl">{description}</p>}
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            className={cn(
              'group relative flex flex-col overflow-hidden rounded-3xl border bg-card transition-all duration-300',
              plan.isRecommended
                ? 'border-primary shadow-glow-lg'
                : 'border-border/50 hover:border-primary/30 hover:shadow-xl'
            )}
          >
            {/* Recommended badge */}
            {plan.isRecommended && (
              <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                {plan.badge || 'Popular'}
              </div>
            )}

            {/* Background gradient */}
            {plan.isRecommended && (
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent" />
            )}

            <div className="relative flex flex-1 flex-col p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                  {plan.badge && !plan.isRecommended && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {plan.badge}
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-foreground">{plan.priceLabel}</p>
              </div>

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                size="lg"
                variant={plan.isRecommended ? 'default' : 'outline'}
                className={cn(
                  'w-full gap-2',
                  plan.isRecommended && 'shadow-glow'
                )}
              >
                {plan.isRecommended && <Sparkles className="h-4 w-4" />}
                Request Detailed Estimate
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {billingNote && (
        <p className="mt-8 text-center text-sm text-muted-foreground">{billingNote}</p>
      )}
    </section>
  );
}
