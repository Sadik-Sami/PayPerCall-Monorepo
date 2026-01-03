'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export interface CTABannerProps {
	title: string;
	subtitle?: string;
	benefits?: string[];
	children: ReactNode; // CTA buttons
	phone?: string;
	className?: string;
	variant?: 'default' | 'contained';
}

export function CTABanner({
	title,
	subtitle,
	benefits,
	children,
	phone,
	className,
	variant = 'contained',
}: CTABannerProps) {
	const content = (
		<>
			<h2 className='text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground mb-4'>
				{title}
			</h2>

			{subtitle && (
				<p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
					{subtitle}
				</p>
			)}

			{/* Benefits */}
			{benefits && benefits.length > 0 && (
				<div className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8'>
					{benefits.map((benefit, idx) => (
						<div
							key={idx}
							className='flex items-center gap-2 text-sm text-muted-foreground'>
							<CheckCircle2 className='size-4 text-primary' />
							<span>{benefit}</span>
						</div>
					))}
				</div>
			)}

			{/* CTA Buttons */}
			<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
				{children}
			</div>

			{phone && (
				<p className='mt-6 text-xs text-muted-foreground'>
					Or call us directly at{' '}
					<a
						href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
						className='text-primary hover:underline font-medium'>
						{phone}
					</a>
				</p>
			)}
		</>
	);

	if (variant === 'default') {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className={cn('text-center', className)}>
				{content}
			</motion.div>
		);
	}

	return (
		<div className={cn('max-w-4xl mx-auto', className)}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='rounded-lg border border-border bg-card p-8 md:p-12 text-center'>
				{content}
			</motion.div>
		</div>
	);
}
