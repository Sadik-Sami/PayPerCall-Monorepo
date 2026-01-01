'use client';

import { motion } from 'framer-motion';
import { Button } from '@workspace/ui/components/button';
import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const benefits = ['No long-term contracts', 'Performance-based pricing', 'Start in 24-48 hours'];

export default function CTA() {
	return (
		<section className='py-24 px-6 bg-background'>
			<div className='max-w-4xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='rounded-lg border border-border bg-card p-8 md:p-12 text-center'>
					<h2 className='text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground mb-4'>
						Ready to Grow Your Customer Base?
					</h2>

					<p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
						Get a free consultation to discuss your lead generation goals. We&apos;ll show you exactly how we can help
						you connect with more customers.
					</p>

					{/* Benefits */}
					<div className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8'>
						{benefits.map((benefit, idx) => (
							<div key={idx} className='flex items-center gap-2 text-sm text-muted-foreground'>
								<CheckCircle2 className='size-4 text-primary' />
								<span>{benefit}</span>
							</div>
						))}
					</div>

					{/* CTA Buttons */}
					<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
						<Button asChild size='lg' className='h-12 px-8 rounded-lg font-medium'>
							<Link href='/contact'>
								Get a Free Consultation
								<ArrowRight className='ml-2 size-4' />
							</Link>
						</Button>
						<Button asChild size='lg' variant='outline' className='h-12 px-8 rounded-lg font-medium'>
							<Link href='/advertiser-signup'>
								<Phone className='mr-2 size-4' />
								Advertiser Signup
							</Link>
						</Button>
					</div>

					<p className='mt-6 text-xs text-muted-foreground'>
						Or call us directly at{' '}
						<a href='tel:+18005551234' className='text-primary hover:underline font-medium'>
							1-800-555-1234
						</a>
					</p>
				</motion.div>
			</div>
		</section>
	);
}
