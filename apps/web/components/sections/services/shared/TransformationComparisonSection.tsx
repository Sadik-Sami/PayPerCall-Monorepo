'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
	PhoneOff,
	FileQuestion,
	Clock,
	PhoneCall,
	ShieldCheck,
	TrendingUp,
	Wallet,
	ArrowRight,
	Inbox,
	Users,
	UserCheck,
	BarChart3,
	Filter,
	Zap,
} from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import {
	containerVariants,
	itemVariants,
	cardVariants,
} from '@/lib/animations';
import { Button } from '@workspace/ui/components/button';

export type TransformationBeforeItem = {
	title: string;
	description: string;
	/** Icon name (string) for Server Component compatibility; or LucideIcon for Client-side */
	icon: string | LucideIcon;
};

export type TransformationAfterItem = {
	title: string;
	description: string;
	/** Icon name (string) for Server Component compatibility; or LucideIcon for Client-side */
	icon: string | LucideIcon;
	pastel: 'pastel-mint' | 'pastel-sky' | 'pastel-lilac' | 'pastel-peach';
};

const TRANSFORM_ICON_MAP: Record<string, LucideIcon> = {
	PhoneOff,
	FileQuestion,
	Clock,
	PhoneCall,
	ShieldCheck,
	TrendingUp,
	Wallet,
	Inbox,
	Users,
	UserCheck,
	BarChart3,
	Filter,
	Zap,
};

function resolveTransformIcon(icon: string | LucideIcon): LucideIcon {
	if (typeof icon === 'string') return TRANSFORM_ICON_MAP[icon] ?? Clock;
	return icon;
}

export type TransformationStat = {
	value: string;
	label: string;
	pastel: 'pastel-mint' | 'pastel-sky' | 'pastel-lilac' | 'pastel-peach';
};

export type TransformationComparisonSectionProps = {
	className?: string;
	ctaHref?: string;
	ctaLabel?: string;
	badgeLabel?: string;
	titleHighlight?: string;
	description?: string;
	beforeTitle?: string;
	beforeDescription?: string;
	afterTitle?: string;
	afterDescription?: string;
	beforeItems?: TransformationBeforeItem[];
	afterItems?: TransformationAfterItem[];
	stats?: TransformationStat[];
	readyTitle?: string;
	readyDescription?: string;
};

const DEFAULT_BEFORE_ITEMS: TransformationBeforeItem[] = [
	{
		title: 'High No-Answer Rates',
		description:
			'Burning through thousands of leads with only a 3–5% pick-up rate on outbound dials. Most calls go to voicemail or never get returned.',
		icon: PhoneOff,
	},
	{
		title: 'Chasing Form Fills',
		description:
			'SDRs spending 80% of their time playing phone tag with "dead" website leads. Form submissions rarely convert and lack purchase intent.',
		icon: FileQuestion,
	},
	{
		title: 'Wasted Sales Hours',
		description:
			'Top closers sitting idle while waiting for qualified meetings to appear on the calendar. Revenue stalls when volume drops.',
		icon: Clock,
	},
];

const DEFAULT_AFTER_ITEMS: TransformationAfterItem[] = [
	{
		title: '100% Pick-up',
		description:
			'They call you. No more outbound chasing. Every call is a hot lead with verified intent—your team spends time closing, not dialing.',
		icon: PhoneCall,
		pastel: 'pastel-mint',
	},
	{
		title: 'Pre-Qualified Callers',
		description:
			'Every caller passes through a strategic filter before talking to sales. Only purchase-ready prospects reach your closers.',
		icon: ShieldCheck,
		pastel: 'pastel-sky',
	},
	{
		title: 'Predictable Scaling',
		description:
			'Add call volume on demand. Scale your media spend with mathematical certainty and see ROI improve as call quality increases.',
		icon: TrendingUp,
		pastel: 'pastel-lilac',
	},
	{
		title: 'Max Commissions',
		description:
			'Closers spend 100% of their day closing high-intent calls, leading to record-breaking payouts and sustainable team growth.',
		icon: Wallet,
		pastel: 'pastel-peach',
	},
];

const DEFAULT_STATS: TransformationStat[] = [
	{ value: '84%', label: 'Efficiency Up', pastel: 'pastel-sky' },
	{ value: '3.5x', label: 'ROI Average', pastel: 'pastel-mint' },
	{ value: '0h', label: 'Cold Calling', pastel: 'pastel-lilac' },
];

const getPastelClasses = (pastel: string) => {
	switch (pastel) {
		case 'pastel-mint':
			return {
				bg: 'bg-pastel-mint',
				border: 'border-pastel-mint-border',
				icon: 'text-pastel-mint-ink',
			};
		case 'pastel-sky':
			return {
				bg: 'bg-pastel-sky',
				border: 'border-pastel-sky-border',
				icon: 'text-pastel-sky-ink',
			};
		case 'pastel-lilac':
			return {
				bg: 'bg-pastel-lilac',
				border: 'border-pastel-lilac-border',
				icon: 'text-pastel-lilac-ink',
			};
		case 'pastel-peach':
		default:
			return {
				bg: 'bg-pastel-peach',
				border: 'border-pastel-peach-border',
				icon: 'text-pastel-peach-ink',
			};
	}
};

export function TransformationComparisonSection({
	className,
	ctaHref = '/contact',
	ctaLabel = 'Upgrade Your Sales Engine',
	badgeLabel = 'Transformation Comparison',
	titleHighlight = 'Call Efficiency',
	description = 'Stop burning leads and start closing high-intent inbound calls. Pay Per Call bridges the gap between manual chaos and predictable growth.',
	beforeTitle = 'Before Pay Per Call',
	beforeDescription = 'The manual grind of chasing leads and surviving on low-quality cold outreach.',
	afterTitle = 'The Pay Per Call Effect',
	afterDescription = 'Dominating the market with a stream of high-intent inbound calls and pre-qualified closings.',
	beforeItems = DEFAULT_BEFORE_ITEMS,
	afterItems = DEFAULT_AFTER_ITEMS,
	stats = DEFAULT_STATS,
	readyTitle = 'Ready to switch?',
	readyDescription = 'Join 200+ sales teams already using Pay Per Call to scale conversions.',
}: TransformationComparisonSectionProps) {
	const reduceMotion = useReducedMotion();
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : containerVariants;
	const itemAnimation = reduceMotion ? { hidden: {}, visible: {} } : itemVariants;
	const cardAnimation = reduceMotion ? { hidden: {}, visible: {} } : cardVariants;

	return (
		<section
			className={cn(
				'relative w-full overflow-hidden px-4 sm:px-6 md:px-8 py-16 md:py-24 lg:py-28',
				className
			)}
			aria-labelledby="transformation-heading"
		>
			<div className="section-container">
				{/* Header */}
				<motion.div
					variants={containerAnimation}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-80px' }}
					className="mx-auto max-w-3xl text-center mb-12 md:mb-16"
				>
					<motion.span
						variants={itemAnimation}
						className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6"
					>
						{badgeLabel}
					</motion.span>
					<motion.h2
						id="transformation-heading"
						variants={itemAnimation}
						className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground text-balance mb-6"
					>
						The Evolution of <span className="text-primary">{titleHighlight}</span>
					</motion.h2>
					<motion.p
						variants={itemAnimation}
						className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
					>
						{description}
					</motion.p>
				</motion.div>

				{/* Main comparison grid */}
				<motion.div
					variants={containerAnimation}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border shadow-2xl"
				>
					{/* VS badge - desktop */}
					<div
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center"
						aria-hidden
					>
						<motion.div
							whileHover={reduceMotion ? undefined : { scale: 1.08 }}
							transition={{ type: 'spring', stiffness: 400, damping: 20 }}
							className="size-24 rounded-full bg-primary border-8 border-background flex items-center justify-center shadow-xl"
						>
							<span className="text-3xl font-black text-primary-foreground italic">VS</span>
						</motion.div>
					</div>

					{/* Before column */}
					<motion.div
						variants={itemAnimation}
						className="relative bg-muted/50 p-8 md:p-12 lg:p-16 flex flex-col gap-8 lg:gap-10 transition-all duration-500 grayscale-[0.5] hover:grayscale-0"
					>
						<div className="space-y-4">
							<p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
								The Struggle
							</p>
							<h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
								{beforeTitle}
							</h3>
							<p className="text-muted-foreground leading-relaxed max-w-md">
								{beforeDescription}
							</p>
						</div>
						<div className="space-y-4">
							{beforeItems.map((item) => {
								const Icon = resolveTransformIcon(item.icon);
								return (
									<motion.article
										key={item.title}
										variants={cardAnimation}
										whileHover={
											reduceMotion ? undefined : { y: -2, boxShadow: '0 12px 40px -12px rgba(0,0,0,0.15)' }
										}
										transition={{ type: 'spring', stiffness: 300, damping: 20 }}
										className="flex items-start gap-4 p-5 rounded-2xl bg-card/80 border border-border hover:border-border/80 transition-colors duration-300"
									>
										<div
											className="size-12 rounded-xl bg-muted flex items-center justify-center shrink-0"
											aria-hidden
										>
											<Icon className="size-6 text-muted-foreground" strokeWidth={2} aria-hidden />
										</div>
										<div>
											<h4 className="font-bold text-lg mb-1.5 text-foreground">{item.title}</h4>
											<p className="text-muted-foreground text-sm leading-relaxed">
												{item.description}
											</p>
										</div>
									</motion.article>
								);
							})}
						</div>
					</motion.div>

					{/* After column */}
					<motion.div
						variants={itemAnimation}
						className="relative bg-card p-8 md:p-12 lg:p-16 flex flex-col gap-8 lg:gap-10 overflow-hidden"
					>
						{/* Decorative gradient orb */}
						<div
							className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-2xl pointer-events-none"
							aria-hidden
						/>
						<div className="space-y-4 relative z-10">
							<p className="text-primary font-bold uppercase tracking-widest text-sm">
								The Solution
							</p>
							<h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground">
								{afterTitle}
							</h3>
							<p className="text-muted-foreground leading-relaxed max-w-md">
								{afterDescription}
							</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
							{afterItems.map((item) => {
								const Icon = resolveTransformIcon(item.icon);
								const classes = getPastelClasses(item.pastel);
								return (
									<motion.article
										key={item.title}
										variants={cardAnimation}
										whileHover={
											reduceMotion
												? undefined
												: { y: -4, scale: 1.01, transition: { duration: 0.2 } }
										}
										className={cn(
											'p-6 rounded-3xl border transition-all duration-300',
											classes.bg,
											classes.border,
											'hover:shadow-lg'
										)}
									>
										<div
											className={cn(
												'size-12 rounded-xl bg-card flex items-center justify-center mb-4 shadow-sm',
												classes.icon
											)}
											aria-hidden
										>
											<Icon className="size-6" strokeWidth={2} aria-hidden />
										</div>
										<h4 className="font-bold text-lg mb-1.5 text-foreground">{item.title}</h4>
										<p className="text-muted-foreground text-sm leading-relaxed">
											{item.description}
										</p>
									</motion.article>
								);
							})}
						</div>
						<Button
							asChild
							size="lg"
							className="mt-2 relative z-10 w-full sm:w-auto group/btn shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
						>
							<Link href={ctaHref} className="inline-flex items-center justify-center gap-2">
								{ctaLabel}
								<ArrowRight
									className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1"
									aria-hidden
								/>
							</Link>
						</Button>
					</motion.div>
				</motion.div>

				{/* Stats section */}
				<motion.div
					variants={containerAnimation}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-80px' }}
					className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-4 gap-6"
				>
					<motion.div
						variants={itemAnimation}
						className="lg:col-span-1 rounded-3xl border border-border bg-card p-8 flex flex-col justify-center text-center lg:text-left"
					>
						<h4 className="font-heading text-2xl font-bold text-foreground mb-2">
							{readyTitle}
						</h4>
						<p className="text-muted-foreground text-sm">
							{readyDescription}
						</p>
					</motion.div>
					{stats.map((stat, index) => {
						const classes = getPastelClasses(stat.pastel);
						return (
							<motion.div
								key={stat.label}
								variants={itemAnimation}
								whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
								transition={{ type: 'spring', stiffness: 400, damping: 25 }}
								className={cn(
									'rounded-3xl p-8 flex flex-col items-center justify-center text-center border transition-all duration-300',
									classes.bg,
									classes.border
								)}
							>
								<span className={cn('text-4xl md:text-5xl font-black mb-2', classes.icon)}>
									{stat.value}
								</span>
								<span className="text-muted-foreground text-xs uppercase font-bold tracking-widest bg-background/60 dark:bg-card/40 px-3 py-1 rounded-full">
									{stat.label}
								</span>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
