'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  PhoneCall,
  Briefcase,
  Users,
  Compass,
  Newspaper,
  MessageCircle,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';

type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

interface SectionLink {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: Accent;
}

const SECTIONS: SectionLink[] = [
  {
    title: 'Pay Per Call',
    description: 'High-intent calls routed in real time.',
    href: '/services/pay-per-call/consumer-initiated',
    icon: PhoneCall,
    accent: 'mint',
  },
  {
    title: 'Pay Per Lead',
    description: 'Exclusive and shared leads, your way.',
    href: '/services/pay-per-lead/exclusive',
    icon: Briefcase,
    accent: 'sky',
  },
  {
    title: 'Hire a Call Center',
    description: 'Managed agents on your terms.',
    href: '/hire-call-center',
    icon: Users,
    accent: 'lilac',
  },
  {
    title: 'About Core Closer',
    description: 'Why operators pick us as a partner.',
    href: '/about/why-us',
    icon: Compass,
    accent: 'peach',
  },
  {
    title: 'Read the blog',
    description: 'Field notes from the demand desk.',
    href: '/blogs',
    icon: Newspaper,
    accent: 'blush',
  },
  {
    title: 'Contact us',
    description: 'Tell us where you want more demand.',
    href: '/contact',
    icon: MessageCircle,
    accent: 'lime',
  },
];

const ACCENT_CHIP: Record<Accent, string> = {
  mint: 'bg-pastel-mint border-pastel-mint-border text-pastel-mint-ink',
  sky: 'bg-pastel-sky border-pastel-sky-border text-pastel-sky-ink',
  lilac: 'bg-pastel-lilac border-pastel-lilac-border text-pastel-lilac-ink',
  peach: 'bg-pastel-peach border-pastel-peach-border text-pastel-peach-ink',
  blush: 'bg-pastel-blush border-pastel-blush-border text-pastel-blush-ink',
  lime: 'bg-pastel-lime border-pastel-lime-border text-pastel-lime-ink',
};

export function PopularSections({ eyebrow = 'Popular places to go next' }: { eyebrow?: string }) {
  return (
    <section className='section-container py-16 sm:py-20'>
      <p className='text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground'>
        {eyebrow}
      </p>

      <motion.ul
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-60px' }}
        className='mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'
      >
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <motion.li key={section.href} variants={itemVariants}>
              <Link
                href={section.href}
                className='group relative flex h-full cursor-pointer items-start gap-4 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-md'
              >
                <span
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105',
                    ACCENT_CHIP[section.accent]
                  )}
                >
                  <Icon className='size-5' />
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='flex items-center gap-1.5 text-sm font-semibold text-foreground'>
                    {section.title}
                    <ArrowRight className='size-3.5 transition-transform duration-300 group-hover:translate-x-0.5' />
                  </p>
                  <p className='mt-1 text-xs leading-relaxed text-muted-foreground sm:text-[13px]'>
                    {section.description}
                  </p>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
