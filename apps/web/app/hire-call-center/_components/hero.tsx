'use client';

import { motion } from 'framer-motion';
import { Button } from '@workspace/ui/components/button';
import { ArrowRight, Phone, Shield, Clock, Headphones } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const features = [
	{ icon: <Shield className='size-4' />, text: 'TCPA & HIPAA Compliant' },
	{ icon: <Clock className='size-4' />, text: '24/7/365 Coverage' },
	{ icon: <Headphones className='size-4' />, text: 'US-Based Agents Available' },
];

export default function HireCallCenterHero() {
	return (
		<section className='relative min-h-[600px] md:min-h-[700px] flex items-center bg-gradient-to-b from-muted/50 to-background overflow-hidden'>
			{/* Background Pattern */}
			<div className='absolute inset-0 opacity-5'>
				<div
					className='absolute inset-0'
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				/>
			</div>

			<div className='relative max-w-7xl mx-auto px-6 py-20 md:py-24'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
					{/* Left Content */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}>
						{/* Badge */}
						<span className='inline-block px-3 py-1 mb-6 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full'>
							Call Center Outsourcing
						</span>

						{/* Main Headline - SEO H1 */}
						<h1 className='font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-6'>
							Hire a Call Center That{' '}
							<span className='text-primary'>Delivers Results</span>
						</h1>

						{/* Subheadline */}
						<p className='text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed'>
							Scale your customer service and sales operations with our trained
							call center agents. Inbound support, outbound calling,
							appointment setting, and more—all with transparent pricing and no
							long-term contracts.
						</p>

						{/* Feature Pills */}
						<div className='flex flex-wrap gap-3 mb-8'>
							{features.map((feature, idx) => (
								<div
									key={idx}
									className='flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full text-sm text-muted-foreground'>
									<span className='text-primary'>{feature.icon}</span>
									<span>{feature.text}</span>
								</div>
							))}
						</div>

						{/* CTA Buttons */}
						<div className='flex flex-col sm:flex-row gap-4'>
							<Button
								asChild
								size='lg'
								className='bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-lg font-medium'>
								<Link href='/contact'>
									Get a Free Quote
									<ArrowRight className='ml-2 size-4' />
								</Link>
							</Button>
							<Button
								asChild
								size='lg'
								variant='outline'
								className='h-12 px-8 rounded-lg font-medium'>
								<a href='tel:+18005551234'>
									<Phone className='mr-2 size-4' />
									1-800-555-1234
								</a>
							</Button>
						</div>
					</motion.div>

					{/* Right Image */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='relative hidden lg:block'>
						<div className='relative aspect-[4/3] rounded-lg overflow-hidden border border-border shadow-2xl'>
							<Image
								src='https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop'
								alt='Professional call center team providing customer support'
								fill
								sizes='(max-width: 1024px) 100vw, 50vw'
								className='object-cover'
								priority
							/>
							{/* Overlay gradient */}
							<div className='absolute inset-0 bg-gradient-to-t from-background/20 to-transparent' />
						</div>

						{/* Floating Stats Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							className='absolute -bottom-6 -left-6 bg-card border border-border p-4 rounded-lg shadow-lg'>
							<div className='flex items-center gap-4'>
								<div className='p-3 bg-primary/10 rounded-lg'>
									<Headphones className='size-6 text-primary' />
								</div>
								<div>
									<p className='text-2xl font-bold text-foreground'>850K+</p>
									<p className='text-xs text-muted-foreground'>
										Calls Handled Monthly
									</p>
								</div>
							</div>
						</motion.div>

						{/* Floating Badge */}
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.8 }}
							className='absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg'>
							<p className='text-sm font-semibold'>96% Client Retention</p>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
