'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Rocket, SearchCheck, SquareCode } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, cardVariants } from '@/lib/animations';
import type { ProcessStepsProps } from '@/types/services';

export function ProcessSteps({ steps, title, description, variant = 'grid', className }: ProcessStepsProps) {
	if (variant === 'timeline') {
		return (
			<section className={cn('section-container py-16', className)}>
				{(title || description) && (
					<div className='mb-12 max-w-3xl'>
						{title && <h2 className='mb-4 text-foreground'>{title}</h2>}
						{description && <p className='text-muted-foreground'>{description}</p>}
					</div>
				)}

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='relative'>
					{/* Timeline line */}
					<div className='absolute left-8 top-0 hidden h-full w-px bg-linear-to-b from-primary/50 via-primary/20 to-transparent lg:block' />

					<div className='space-y-8'>
						{steps.map((step, index) => (
							<motion.div key={step.title} variants={cardVariants} className='group relative flex gap-6 lg:gap-12'>
								{/* Step number */}
								<div className='relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-glow'>
									{String(index + 1).padStart(2, '0')}
								</div>

								{/* Content card */}
								<div className='flex-1 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg'>
									<p className='mb-1 text-xs font-semibold uppercase tracking-wider text-primary'>Step {index + 1}</p>
									<h3 className='mb-3 text-xl font-semibold text-foreground'>{step.title}</h3>
									<p className='text-muted-foreground'>{step.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</section>
		);
	}

	if (variant === 'cards') {
		const cardVisuals = [
			{
				icon: SearchCheck,
				iconBox: 'bg-emerald-300 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-300',
				number: 'text-emerald-400/40 dark:text-emerald-300/20',
			},
			{
				icon: Compass,
				iconBox: 'bg-purple-300 text-purple-700 dark:bg-purple-500/25 dark:text-purple-300',
				number: 'text-purple-400/40 dark:text-purple-300/20',
			},
			{
				icon: SquareCode,
				iconBox: 'bg-blue-300 text-blue-700 dark:bg-blue-500/25 dark:text-blue-300',
				number: 'text-blue-400/40 dark:text-blue-300/20',
			},
			{
				icon: Rocket,
				iconBox: 'bg-orange-300 text-orange-700 dark:bg-orange-500/25 dark:text-orange-300',
				number: 'text-orange-400/40 dark:text-orange-300/20',
			},
		] as const;

		return (
			<section className={cn('relative overflow-hidden py-6 lg:py-12 px-6', className)}>
				<div className='pointer-events-none absolute inset-0 -z-10'>
					<div className='absolute inset-0 bg-linear-to-br from-background via-background to-primary/5' />
					<div className='absolute -top-1/3 left-1/3 h-72 w-72 rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-3xl' />
					<div className='absolute -bottom-1/4 right-0 h-80 w-80 rounded-full bg-gradient-radial from-accent/12 via-accent/5 to-transparent blur-3xl' />
					<div className='absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-radial from-orange-200/20 via-transparent to-transparent blur-3xl dark:from-orange-500/10' />
				</div>

				{(title || description) && (
					<div className='mb-14 text-center'>
						<span className='inline-flex rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm'>
							Process Workflow
						</span>
						{title && (
							<h2 className='mt-5 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl'>
								{title.includes('Digital Perfection') ? (
									<>
										{title.replace('Digital Perfection', '')}{' '}
										<span className='bg-linear-to-r from-sky-300 to-blue-600 bg-clip-text text-transparent'>
											Digital Perfection
										</span>
									</>
								) : (
									title
								)}
							</h2>
						)}
						{description && (
							<p className='mx-auto mt-4 max-w-3xl text-pretty text-muted-foreground'>
								{description}
							</p>
						)}
					</div>
				)}

				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
					className='grid gap-2 md:grid-cols-2 max-w-7xl mx-auto'>
					{steps.map((step, index) => (
						<motion.div
							key={step.title}
							variants={cardVariants}
							className='group relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-white/10 dark:bg-card/70 lg:p-8'>
							<span
								className={cn(
									'pointer-events-none absolute -right-1 -top-8 select-none text-[8.5rem] font-extrabold tracking-tighter',
									cardVisuals[index % cardVisuals.length]?.number
								)}>
								{String(index + 1).padStart(2, '0')}
							</span>

							<div className='relative'>
								<div
									className={cn(
										'mb-7 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg ring-1 ring-white/60 transition-transform duration-300 group-hover:scale-[1.04] dark:ring-white/10',
										cardVisuals[index % cardVisuals.length]?.iconBox
									)}>
									{(() => {
										const Icon = cardVisuals[index % cardVisuals.length]?.icon ?? SearchCheck;
										return <Icon className='size-8' strokeWidth={1.8} />;
									})()}
								</div>
								<h3 className='mb-3 text-2xl font-bold tracking-tight text-foreground'>{step.title}</h3>
								<p className='text-base leading-relaxed text-muted-foreground'>{step.description}</p>
							</div>
						</motion.div>
					))}
				</motion.div>

				<div className='mt-12 flex flex-col items-center justify-center gap-3 text-center'>
					<Button asChild size='lg' className='group rounded-full px-8'>
						<Link href='/contact'>
							Queue Up Your Free Consultation
							<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
						</Link>
					</Button>
					<p className='text-sm text-muted-foreground'>Typical response time: &lt; 2 hours</p>
				</div>
			</section>
		);
	}

	return (
		<section
			className={cn(
				'rounded-3xl border border-border/50 bg-linear-to-br from-card via-card to-primary/5 p-8 lg:p-12',
				className
			)}>
			{(title || description) && (
				<div className='mb-10 max-w-2xl'>
					{title && <h2 className='mb-4 text-foreground'>{title}</h2>}
					{description && <p className='text-muted-foreground'>{description}</p>}
				</div>
			)}

			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-100px' }}
				className='grid gap-6 md:grid-cols-2'>
				{steps.map((step, index) => (
					<motion.div
						key={step.title}
						variants={cardVariants}
						className='group rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg'>
						<div className='mb-4 flex items-center gap-4'>
							<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground'>
								{String(index + 1).padStart(2, '0')}
							</div>
							<div>
								<p className='text-xs font-semibold uppercase tracking-wider text-primary/80'>Step {index + 1}</p>
								<h3 className='text-lg font-semibold text-foreground'>{step.title}</h3>
							</div>
						</div>
						<p className='text-muted-foreground'>{step.description}</p>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
}
