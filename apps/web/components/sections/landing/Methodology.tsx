'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpRight, Globe2, Rocket, Users2, Wand2 } from 'lucide-react';

type MethodCard = {
	step: string;
	title: string;
	description: string;
	tone: 'primary' | 'emerald' | 'violet' | 'indigo';
	icon: ReactNode;
	href?: string;
	className?: string;
};

const cards: MethodCard[] = [
	{
		step: '01',
		title: 'Team Augmentation',
		description:
			'Deploy a dedicated tech team that integrates seamlessly with your business. They’ll tackle your project needs with precision.',
		tone: 'primary',
		icon: <Users2 className='size-6' aria-hidden='true' />,
		href: '/contact',
	},
	{
		step: '02',
		title: 'MVP Services',
		description: 'Rapidly prototype and build your MVP to test the market without heavy upfront investment.',
		tone: 'emerald',
		icon: <Rocket className='size-6' aria-hidden='true' />,
		href: '/contact',
		className: 'md:mt-16 lg:mt-24',
	},
	{
		step: '03',
		title: 'End to End Dev',
		description: 'Complete product lifecycle management from discovery and design to deployment and ongoing maintenance.',
		tone: 'violet',
		icon: <Wand2 className='size-6' aria-hidden='true' />,
		href: '/contact',
		className: 'lg:mt-12',
	},
	{
		step: '04',
		title: 'Offshore Office',
		description: 'Expand your global footprint with managed offshore office solutions that reduce costs without sacrificing quality.',
		tone: 'indigo',
		icon: <Globe2 className='size-6' aria-hidden='true' />,
		href: '/contact',
		className: 'md:mt-16 lg:mt-32',
	},
];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.09, delayChildren: 0.08 },
	},
};

const headerVariants: Variants = {
	hidden: { opacity: 0, y: 14 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

function toneStyles(tone: MethodCard['tone']) {
	switch (tone) {
		case 'primary':
			return {
				iconWrap: 'bg-primary shadow-primary/30',
				titleHover: 'group-hover:text-primary',
				numberHover: 'group-hover:text-primary/60 dark:group-hover:text-primary/30',
				number: 'text-primary/10',
				link: 'text-primary',
			};
		case 'emerald':
			return {
				iconWrap: 'bg-emerald-600 shadow-emerald-600/30',
				titleHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
				numberHover: 'group-hover:text-emerald-600/60 dark:group-hover:text-emerald-400/30',
				number: 'text-emerald-600/10',
				link: 'text-emerald-600 dark:text-emerald-400',
			};
		case 'violet':
			return {
				iconWrap: 'bg-violet-600 shadow-violet-600/30',
				titleHover: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
				numberHover: 'group-hover:text-violet-600/60 dark:group-hover:text-violet-400/30',
				number: 'text-violet-600/10',
				link: 'text-violet-600 dark:text-violet-400',
			};
		case 'indigo':
			return {
				iconWrap: 'bg-indigo-600 shadow-indigo-600/30',
				titleHover: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
				numberHover: 'group-hover:text-indigo-600/60 dark:group-hover:text-indigo-400/30',
				number: 'text-indigo-600/10',
				link: 'text-indigo-600 dark:text-indigo-400',
			};
	}
}

export default function Methodology() {
	const reduceMotion = useReducedMotion();

	return (
		<section className='relative py-20 md:py-24 px-6 bg-muted/30'>
			<motion.div
				className='relative z-10 mx-auto w-full max-w-7xl'
				variants={containerVariants}
				initial='hidden'
				whileInView='show'
				viewport={{ once: true, amount: 0.25 }}>
				<div className='mb-14 md:mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
					<div className='max-w-xl'>
						<motion.span
							variants={headerVariants}
							className='inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary'>
							Our Expertise
						</motion.span>
						<motion.h2
							variants={headerVariants}
							className='mt-4 text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-foreground'>
							Our Methodology to <br />
							<span className='text-primary'>Collaboration</span>
						</motion.h2>
					</div>
					<div className='flex flex-col items-center flex-1 max-w-lg mx-auto'>
						<motion.div variants={headerVariants} className='w-full h-px bg-primary/20' />
						<motion.p variants={headerVariants} className='max-w-md text-lg leading-relaxed text-muted-foreground py-4'>
							We follow an agile development methodology and guarantee the timely delivery of high-quality software products.
						</motion.p>
						<motion.div variants={headerVariants} className='w-full h-px bg-primary/20' />
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start'>
					{cards.map((card) => {
						const styles = toneStyles(card.tone);
						return (
							<motion.article
								key={card.step}
								variants={cardVariants}
								className={[
									'group relative flex h-[420px] flex-col justify-between overflow-hidden rounded-3xl p-8',
									'bg-card border border-border shadow-sm',
									'transition-all duration-300 hover:shadow-xl hover:border-primary/20',
									card.className ?? '',
								].join(' ')}
								whileHover={reduceMotion ? undefined : { y: -10, scale: 1.015 }}
								whileTap={reduceMotion ? undefined : { scale: 0.995 }}>
								{/* Big step number behind content */}
								<span
									aria-hidden='true'
									className={[
										'pointer-events-none absolute -top-6 right-4 z-0 select-none',
										'text-9xl font-black tabular-nums tracking-tight',
										'transition-all ease-in-out duration-500',
										styles.numberHover,
										styles.number,
									].join(' ')}>
									{card.step}
								</span>

								<div className='relative z-10'>
									<div className='mb-10 flex items-start justify-between gap-6'>
										<motion.div
											className={['flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg', styles.iconWrap].join(
												' '
											)}
											whileHover={reduceMotion ? undefined : { rotate: card.tone === 'emerald' ? -10 : 10 }}
											transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
											{card.icon}
										</motion.div>
									</div>

									<h3
										className={[
											'text-2xl font-bold tracking-tight text-foreground transition-colors duration-300',
											styles.titleHover,
										].join(' ')}>
										{card.title}
									</h3>
									<p className='mt-4 leading-relaxed text-muted-foreground'>{card.description}</p>
								</div>

								<div>
									<Link
										href={card.href ?? '/contact'}
										className={[
											'inline-flex items-center gap-2 text-sm font-semibold',
											'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md',
											styles.link,
										].join(' ')}>
										Explore now <ArrowUpRight className='size-4' aria-hidden='true' />
									</Link>
								</div>
							</motion.article>
						)
					})}
				</div>
			</motion.div>
		</section>
	);
}

