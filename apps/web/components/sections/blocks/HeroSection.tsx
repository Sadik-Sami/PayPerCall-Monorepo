'use client';
import React from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { Globe, Phone } from 'lucide-react';


// Prop types for the HeroSection component
interface HeroSectionProps {
  className?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, title, subtitle, callToAction, backgroundImage, contactInfo }, ref) => {

    // Animation variants for the container to orchestrate children animations
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    // Animation variants for individual text/UI elements
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut" as const,
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-background text-foreground md:flex-row max-w-7xl mx-auto",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16">
          {/* Top Section: Logo & Main Content */}
          <div>
            <motion.main variants={containerVariants}>
              <motion.h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl" variants={itemVariants}>
                {title}
              </motion.h1>
              <motion.div className="my-6 h-1 w-20 bg-primary" variants={itemVariants}></motion.div>
              <motion.p className="mb-8 max-w-md text-base text-muted-foreground" variants={itemVariants}>
                {subtitle}
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link href={callToAction.href} className="inline-block">
                  <Button size="lg" variant="default">{callToAction.text}</Button>
                </Link>
              </motion.div>
            </motion.main>
          </div>

          {/* Bottom Section: Footer Info */}
          <motion.footer className="mt-12 w-full" variants={itemVariants}>
            <div className="grid grid-cols-1 gap-6 text-xs text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span>{contactInfo.website}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{contactInfo.phone}</span>
              </div>
            </div>
          </motion.footer>
        </div>

        {/* Right Side: Image with Clip Path Animation */}
        <motion.div
          className="w-full min-h-[300px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-2/5"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.2, ease: "circOut" }}
        >
        </motion.div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
