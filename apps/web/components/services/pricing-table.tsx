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
    <section className={cn('section-container py-6 sm:py-12 lg:py-16 max-w-7xl mx-auto', className)}>
      {(title || description) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto"
        >
          {title && (
            <h2 className="mb-4 text-foreground text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid gap-6 sm:gap-8 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            custom={index}
            whileHover={{
              y: plan.isRecommended ? 0 : -6,
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }}
            className={cn(
              'group relative flex flex-col overflow-visible rounded-2xl border bg-card/80 dark:bg-card/90 backdrop-blur-sm transition-shadow duration-300',
              plan.isRecommended
                ? 'border-primary/50 ring-2 ring-primary/30 shadow-xl shadow-primary/15 dark:shadow-primary/10 dark:ring-primary/25 lg:scale-[1.02] z-10'
                : 'border-border/60 hover:border-primary/25 hover:shadow-xl dark:hover:shadow-primary/5'
            )}
          >
            {/* Recommended: glowing badge sitting on the top border */}
            {plan.isRecommended && (
              <>
                <div
                  className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-80 dark:opacity-60"
                  aria-hidden
                />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex justify-center">
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-primary bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30 ring-2 ring-primary/20"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {plan.badge ?? 'Recommended'}
                  </motion.span>
                </div>
              </>
            )}

            <div className="relative flex flex-1 flex-col p-6 sm:p-8">
              {/* Header */}
              <div className="mb-5 sm:mb-6">
                <div className="mb-2 flex items-center gap-2">
                  <h3
                    className={cn(
                      'text-xl font-bold text-foreground',
                      plan.isRecommended && 'text-primary'
                    )}
                  >
                    {plan.name}
                  </h3>
                  {plan.badge && !plan.isRecommended && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {plan.badge}
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed min-h-10">
                    {plan.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mb-6 sm:mb-8">
                <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {plan.priceLabel}
                </p>
              </div>

              {/* Features */}
              <ul className="mb-6 sm:mb-8 flex-1 space-y-3.5">
                {plan.features.map((feature) => (
                  <motion.li
                    key={feature}
                    className="flex items-start gap-3 text-sm"
                    whileHover={{ x: 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    <span
                      className={cn(
                        'text-muted-foreground',
                        plan.isRecommended && 'font-medium text-foreground/90'
                      )}
                    >
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                size="lg"
                variant={plan.isRecommended ? 'default' : 'outline'}
                className={cn(
                  'w-full gap-2 font-semibold transition-all duration-200',
                  plan.isRecommended &&
                    'shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02]'
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
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 sm:mt-12 lg:mt-16 text-center text-sm text-muted-foreground"
        >
          {billingNote}
        </motion.p>
      )}
    </section>
  );
}
