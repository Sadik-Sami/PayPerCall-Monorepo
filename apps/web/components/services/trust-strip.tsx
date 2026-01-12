'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, LineChart, Sparkles, BadgeCheck } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import type { TrustStripProps, TrustLogo } from '@/types/services';
import Image from 'next/image';

const getInitials = (logo: TrustLogo) => {
	if (logo.fallbackInitials) return logo.fallbackInitials;
	const segments = logo.name?.split(' ').filter(Boolean) ?? [];
	if (!segments.length) return '—';
	if (segments.length === 1) return segments[0]?.slice(0, 2).toUpperCase() ?? '—';
	return `${segments[0]?.charAt(0)}${segments[segments.length - 1]?.charAt(0)}`.toUpperCase() ?? '—';
};

const metricIcons = [ShieldCheck, LineChart, Sparkles, BadgeCheck];

export function TrustStrip({ logos = [], metrics = [], className }: TrustStripProps) {
	return (
		<section className={cn('section-container py-16', className)}>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='grid gap-8 lg:grid-cols-[1.2fr_0.8fr]'>
				{/* Left column - Proof section */}
				<div className='space-y-6'>
					<motion.div
						variants={itemVariants}
						className='rounded-3xl bg-linear-to-br from-foreground via-foreground/95 to-primary/40 p-8 text-background'>
						<p className='text-xs font-semibold uppercase tracking-wider text-primary-foreground/70'>
							Proof over promises
						</p>
						<h3 className='mt-3 text-2xl font-semibold'>Independent audits, shared dashboards, no black boxes.</h3>
						<ul className='mt-5 space-y-2 text-sm text-background/80'>
							<li className='flex items-center gap-2'>
								<span className='h-1 w-1 rounded-full bg-primary' />
								SOC 2-ready controls across infrastructure
							</li>
							<li className='flex items-center gap-2'>
								<span className='h-1 w-1 rounded-full bg-primary' />
								Weekly scorecards on Core Web Vitals & uptime
							</li>
							<li className='flex items-center gap-2'>
								<span className='h-1 w-1 rounded-full bg-primary' />
								GDPR + HIPAA compliant data handling on request
							</li>
						</ul>
					</motion.div>

					{/* Logos grid */}
					{logos.length > 0 && (
						<motion.div
							variants={itemVariants}
							className='rounded-3xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm'>
							<p className='mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
								Teams we support
							</p>
							<div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
								{logos.map((logo) => (
									<div
										key={logo.name}
										className='flex h-14 items-center justify-center rounded-xl border border-border/50 bg-card px-3'>
										{logo.src ?
											<Image
												src={logo.src}
												alt={logo.alt ?? logo.name}
												width={120}
												height={32}
												className='max-h-8 w-auto opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0'
											/>
										:	<span className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
												{getInitials(logo)}
											</span>
										}
									</div>
								))}
							</div>
						</motion.div>
					)}
				</div>

				{/* Right column - Metrics */}
				{metrics.length > 0 && (
					<motion.div variants={itemVariants} className='grid grid-cols-2 gap-4 content-start'>
						{metrics.map((metric, index) => {
							const IconComponent = metricIcons[index % metricIcons.length];
							if (!IconComponent) return null;

							return (
								<motion.div
									key={metric.label}
									variants={itemVariants}
									className='group rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg'>
									<IconComponent className='mb-3 h-5 w-5 text-primary' />
									<p className='text-3xl font-bold text-foreground'>{metric.value}</p>
									<p className='mt-1 text-sm text-muted-foreground'>{metric.label}</p>
									{metric.helperText && <p className='mt-2 text-xs text-muted-foreground/70'>{metric.helperText}</p>}
								</motion.div>
							);
						})}
					</motion.div>
				)}
			</motion.div>
		</section>
	);
}
