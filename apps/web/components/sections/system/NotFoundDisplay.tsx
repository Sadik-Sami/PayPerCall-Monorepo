'use client';
import { motion, useReducedMotion } from 'framer-motion';

export function NotFoundDisplay({
  text = '404',
  gradient = 'from-pastel-lilac-strong via-pastel-sky-strong to-pastel-mint-strong',
}: {
  text?: string;
  gradient?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className='relative mt-6 select-none leading-none'>
      <span
        className={`pointer-events-none absolute inset-0 bg-linear-to-br ${gradient} bg-clip-text font-display text-[clamp(7rem,22vw,16rem)] font-extrabold tracking-tighter text-transparent opacity-25 blur-md translate-y-1.5 translate-x-1`}
      >
        {text}
      </span>
      <motion.span
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
        className={`relative inline-block bg-linear-to-br ${gradient} bg-clip-text font-display text-[clamp(7rem,22vw,16rem)] font-extrabold tracking-tighter text-transparent`}
      >
        {text}
      </motion.span>
    </div>
  );
}
