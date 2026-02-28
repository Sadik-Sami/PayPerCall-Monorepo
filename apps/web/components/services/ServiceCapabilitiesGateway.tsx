'use client';

import { motion } from 'framer-motion';
import {
	ArrowRight,
	ChevronRight,
	Code2,
	Building2,
	ShoppingCart,
	FileText,
	ShieldCheck,
	Cloud,
	Sparkles,
	Smartphone,
	Tablet,
	Globe,
	Phone,
	Headphones,
	Radio,
	Users,
	UserCheck,
	Zap,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, cardVariants } from '@/lib/animations';

export type GatewayAccent = 'green' | 'purple' | 'amber' | 'blue';

/** Serializable icon keys for Server→Client boundary. Must match ICON_MAP keys. */
export type GatewayIconKey =
	| 'Code2'
	| 'Building2'
	| 'ShoppingCart'
	| 'FileText'
	| 'ShieldCheck'
	| 'Cloud'
	| 'Sparkles'
	| 'Smartphone'
	| 'Tablet'
	| 'Globe'
	| 'Phone'
	| 'Headphones'
	| 'Radio'
	| 'Users'
	| 'UserCheck'
	| 'Zap';

export type ServiceCapabilityCard = {
	label: string;
	description: string;
	href: string;
	ctaLabel?: string;
	/** Serializable icon key; resolved to LucideIcon in this client component. */
	iconKey: GatewayIconKey;
	accentColor?: GatewayAccent;
};

const ICON_MAP: Record<GatewayIconKey, typeof Code2> = {
	Code2,
	Building2,
	ShoppingCart,
	FileText,
	ShieldCheck,
	Cloud,
	Sparkles,
	Smartphone,
	Tablet,
	Globe,
	Phone,
	Headphones,
	Radio,
	Users,
	UserCheck,
	Zap,
};

export type ServiceCapabilitiesGatewayProps = {
	title: string;
	subtitle: string;
	cards: ServiceCapabilityCard[];
	primaryCta?: { label: string; href: string };
	primaryCtaNote?: string;
	columns?: 2 | 3;
	className?: string;
};

const ACCENT_STYLES: Record<
	GatewayAccent,
	{
		bg: string;
		bgDark: string;
		borderDark: string;
		text: string;
		textDark: string;
		pillBg: string;
		pillBgDark: string;
	}
> = {
	green: {
		bg: 'bg-[#d1fadf]',
		bgDark: 'dark:bg-[#064e3b]/40 dark:border-[#059669]/30',
		borderDark: 'dark:border-[#059669]/30',
		text: 'text-[#059669]',
		textDark: 'dark:text-[#34d399]',
		pillBg: 'bg-white/60 dark:bg-black/20',
		pillBgDark: 'dark:bg-black/20',
	},
	purple: {
		bg: 'bg-[#e9d5ff]',
		bgDark: 'dark:bg-[#4c1d95]/40 dark:border-[#7c3aed]/30',
		borderDark: 'dark:border-[#7c3aed]/30',
		text: 'text-[#7c3aed]',
		textDark: 'dark:text-[#a78bfa]',
		pillBg: 'bg-white/60 dark:bg-black/20',
		pillBgDark: 'dark:bg-black/20',
	},
	amber: {
		bg: 'bg-[#fef3c7]',
		bgDark: 'dark:bg-[#78350f]/40 dark:border-[#d97706]/30',
		borderDark: 'dark:border-[#d97706]/30',
		text: 'text-[#d97706]',
		textDark: 'dark:text-[#fbbf24]',
		pillBg: 'bg-white/60 dark:bg-black/20',
		pillBgDark: 'dark:bg-black/20',
	},
	blue: {
		bg: 'bg-[#dbeafe]',
		bgDark: 'dark:bg-[#1e3a8a]/40 dark:border-[#2563eb]/30',
		borderDark: 'dark:border-[#2563eb]/30',
		text: 'text-[#2563eb]',
		textDark: 'dark:text-[#60a5fa]',
		pillBg: 'bg-white/60 dark:bg-black/20',
		pillBgDark: 'dark:bg-black/20',
	},
};

const ACCENTS: GatewayAccent[] = ['green', 'purple', 'amber', 'blue'];

function getAccent(index: number): GatewayAccent {
	return ACCENTS[index % ACCENTS.length] ?? 'green';
}

export function ServiceCapabilitiesGateway({
	title,
	subtitle,
	cards,
	primaryCta,
	primaryCtaNote,
	columns = 2,
	className,
}: ServiceCapabilitiesGatewayProps) {
	const gridCols = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

	return (
		<section className={cn('relative w-full overflow-hidden', className)}>
			<div className='section-container relative'>
				{/* Hero block */}
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className='mx-auto max-w-3xl text-center mb-16'
				>
					<h2 className='font-heading mb-6 text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-balance'>
						{title}
					</h2>
					<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>{subtitle}</p>
				</motion.div>

				{/* Cards grid */}
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className={cn('grid gap-6 md:gap-8', gridCols)}
				>
					{cards.map((card, index) => {
						const accent: GatewayAccent =
							card.accentColor ?? getAccent(index);
						const styles = ACCENT_STYLES[accent];
						const Icon = ICON_MAP[card.iconKey];

						return (
							<motion.div key={card.href} variants={cardVariants}>
								<Link
									href={card.href}
									className={cn(
										'group relative flex flex-col justify-between overflow-hidden rounded-4xl p-8 h-full',
										'border border-transparent',
										'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
										styles.bg,
										styles.bgDark
									)}
								>
									<div className='relative z-10 flex flex-col h-full'>
										{/* Icon */}
										<div className='mb-6 flex justify-center'>
											<Icon
												className={cn('size-16', styles.text, styles.textDark)}
												aria-hidden
											/>
										</div>

										{/* Content */}
										<div className='text-center mt-auto flex flex-col items-center'>
											<h3 className='mb-3 text-2xl font-bold text-foreground'>
												{card.label}
											</h3>
											<p className='mb-6 text-sm font-medium leading-relaxed text-foreground/70 dark:text-slate-200'>
												{card.description}
											</p>

											{/* Pill CTA */}
											<div
												className={cn(
													'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold',
													'backdrop-blur-sm transition-transform duration-300',
													'group-hover:-translate-y-0.5',
													styles.text,
													styles.textDark,
													styles.pillBg,
													styles.pillBgDark
												)}
											>
												<span>{card.ctaLabel ?? 'Explore'}</span>
												<ArrowRight className='size-[18px] transition-transform duration-300 group-hover:translate-x-0.5' />
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						);
					})}
				</motion.div>

				{/* Primary CTA */}
				{primaryCta && (
					<motion.div
						variants={containerVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
						className='mt-20 text-center'
					>
						<Link
							href={primaryCta.href}
							className={cn(
								'inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold',
								'bg-foreground text-background shadow-xl shadow-foreground/20',
								'dark:bg-white dark:text-zinc-900 dark:shadow-white/10',
								'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl'
							)}
						>
							<span>{primaryCta.label}</span>
							<ChevronRight className='size-5' aria-hidden />
						</Link>
						{primaryCtaNote && (
							<p className='mt-4 text-sm font-medium text-muted-foreground'>
								{primaryCtaNote}
							</p>
						)}
					</motion.div>
				)}
			</div>
		</section>
	);
}
