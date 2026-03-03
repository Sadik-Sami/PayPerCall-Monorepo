'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Phone, ShieldCheck, PhoneIncoming, type LucideIcon } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { containerVariants, itemVariants } from '@/lib/animations';
import type { CallGatewayAccent } from './constants';

const ACCENT_SECTION_BG: Record<CallGatewayAccent, string> = {
	mint: 'bg-pastel-mint/50',
	lilac: 'bg-pastel-lilac/40',
	peach: 'bg-pastel-peach/40',
	sky: 'bg-pastel-sky/40',
};

const ACCENT_LINE_AND_ICON: Record<
	CallGatewayAccent,
	{ line: string; icon: string; bullet: string }
> = {
	mint: {
		line: 'bg-pastel-mint-strong/25',
		icon: 'text-pastel-mint-strong',
		bullet: 'bg-pastel-mint-strong',
	},
	lilac: {
		line: 'bg-pastel-lilac-strong/25',
		icon: 'text-pastel-lilac-strong',
		bullet: 'bg-pastel-lilac-strong',
	},
	peach: {
		line: 'bg-pastel-peach-strong/25',
		icon: 'text-pastel-peach-strong',
		bullet: 'bg-pastel-peach-strong',
	},
	sky: {
		line: 'bg-pastel-sky-strong/25',
		icon: 'text-pastel-sky-strong',
		bullet: 'bg-pastel-sky-strong',
	},
};

const STEP_ICONS: Record<string, LucideIcon> = {
	phone: Phone,
	shield: ShieldCheck,
	transfer: PhoneIncoming,
};

export interface CallProcessStep {
	step: '01' | '02' | '03';
	title: string;
	description: string;
	techNotes?: string[];
	/** Optional icon key: 'phone' | 'shield' | 'transfer'. Defaults by step order. */
	iconKey?: 'phone' | 'shield' | 'transfer';
}

const DEFAULT_STEP_ICONS: ('phone' | 'shield' | 'transfer')[] = ['phone', 'shield', 'transfer'];

export interface CallProcessFlowProps {
	title: string;
	subtitle?: string;
	steps: [CallProcessStep, CallProcessStep, CallProcessStep];
	accent: CallGatewayAccent;
	className?: string;
}

export function CallProcessFlow({ title, subtitle, steps, accent, className }: CallProcessFlowProps) {
	const reduceMotion = useReducedMotion();
	const sectionBg = ACCENT_SECTION_BG[accent];
	const { line: lineClass, icon: iconClass, bullet: bulletClass } = ACCENT_LINE_AND_ICON[accent];
	const containerAnimation = reduceMotion ? { hidden: {}, visible: {} } : containerVariants;
	const itemAnimation = reduceMotion ? { hidden: {}, visible: {} } : itemVariants;

	return (
		<section className={cn('w-full', className)} aria-labelledby="call-process-flow-title">
			<div className="section-container">
				<motion.div
					variants={containerAnimation}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.15 }}
					className={cn(
						'relative overflow-hidden rounded-2xl p-8 md:p-12',
						sectionBg,
						'border border-border/60'
					)}
				>

					<div className="relative z-10">
						{/* Section header with icon */}
						<motion.div
							variants={itemAnimation}
							className="flex items-center gap-3 mb-10"
						>
							<span
								className={cn(
									'flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 shadow-sm',
									iconClass
								)}
								aria-hidden
							>
								<svg
									className="size-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M12 4v16M4 12h16" />
									<circle cx="12" cy="12" r="2" />
									<path d="M12 6v2M12 16v2M6 12h2M16 12h2" />
								</svg>
							</span>
							<div>
								<h2
									id="call-process-flow-title"
									className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground"
								>
									{title}
								</h2>
								{subtitle && (
									<p className="mt-1 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>
								)}
							</div>
						</motion.div>

						{/* Process steps - horizontal, centered */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
							{/* Connecting line - desktop, under icon centers */}
							<div
								className={cn(
									'hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 z-0',
									lineClass
								)}
								aria-hidden
							/>

							{steps.map((step, index) => {
								const iconKey = step.iconKey ?? DEFAULT_STEP_ICONS[index] ?? 'phone';
								const Icon = STEP_ICONS[iconKey] ?? Phone;
								return (
									<motion.article
										key={step.step}
										variants={itemAnimation}
										className="relative z-10 flex flex-col items-center text-center group/step"
									>
										<motion.div
											className={cn(
												'w-24 h-24 rounded-2xl bg-background shadow-sm flex items-center justify-center mb-6',
												'border-2 border-transparent transition-all duration-300',
												'group-hover/step:border-primary/25 group-hover/step:shadow-md'
											)}
											whileHover={
												reduceMotion
													? undefined
													: { y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }
											}
											whileTap={reduceMotion ? undefined : { scale: 0.98 }}
										>
											<motion.span
												className={cn('flex items-center justify-center', iconClass)}
												whileHover={reduceMotion ? undefined : { scale: 1.05 }}
												transition={{ type: 'spring', stiffness: 400, damping: 15 }}
											>
												<Icon className="size-10 md:size-12" strokeWidth={1.75} aria-hidden />
											</motion.span>
										</motion.div>
										<h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
										<p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
											{step.description}
										</p>
										{step.techNotes && step.techNotes.length > 0 && (
											<ul className="mt-3 space-y-1.5 text-left w-full max-w-[260px]">
												{step.techNotes.map((note) => (
													<li
														key={note}
														className="flex items-start gap-2 text-xs text-muted-foreground"
													>
														<span
															className={cn(
																'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
																bulletClass
															)}
														/>
														{note}
													</li>
												))}
											</ul>
										)}
									</motion.article>
								);
							})}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
