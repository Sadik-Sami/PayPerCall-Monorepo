'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { SectionHeader } from '@workspace/ui/components/sections';
import { cn } from '@workspace/ui/lib/utils';
import { inboundServices, outboundServices } from '../_data/services';
import { PhoneIncoming, PhoneOutgoing, Sparkles } from 'lucide-react';

type ServiceTab = 'inbound' | 'outbound';

const TAB_META: Record<ServiceTab, { label: string; icon: typeof PhoneIncoming; tone: string }> = {
	inbound: {
		label: 'Inbound Services',
		icon: PhoneIncoming,
		tone: 'bg-pastel-sky border-pastel-sky-border',
	},
	outbound: {
		label: 'Outbound Services',
		icon: PhoneOutgoing,
		tone: 'bg-pastel-mint border-pastel-mint-border',
	},
};

export default function ServicesBreakdown() {
	const shouldReduceMotion = useReducedMotion();
	const [activeTab, setActiveTab] = useState<ServiceTab>('inbound');

	const activeServices = useMemo(() => (activeTab === 'inbound' ? inboundServices : outboundServices), [activeTab]);

	const activeFeatureCount = useMemo(
		() => activeServices.reduce((sum, service) => sum + service.features.length, 0),
		[activeServices],
	);

	return (
		<section className='relative overflow-hidden border-y border-border/60 bg-background py-20 md:py-24'>
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute -left-10 top-10 size-56 rounded-full bg-pastel-sky/45 blur-3xl' />
				<div className='absolute right-0 top-28 size-56 rounded-full bg-pastel-lilac/40 blur-3xl' />
			</div>

			<div className='relative mx-auto w-full max-w-6xl px-6'>
				<SectionHeader
					badge='Our Services'
					title='Complete Call Center'
					highlight='Solutions'
					subtitle='From customer support to lead generation, we provide end-to-end call center services tailored to your business needs.'
				/>

				<Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ServiceTab)} className='w-full'>
					<TabsList className='mx-auto mb-10 grid h-auto w-full max-w-lg grid-cols-2 rounded-2xl border border-border/70 bg-card/80 p-1'>
						{(Object.keys(TAB_META) as ServiceTab[]).map((tab) => {
							const Icon = TAB_META[tab].icon;
							return (
								<TabsTrigger
									key={tab}
									value={tab}
									className='gap-2 rounded-xl py-2.5 text-sm data-[state=active]:shadow-sm'>
									<Icon className='size-4' />
									{TAB_META[tab].label}
								</TabsTrigger>
							);
						})}
					</TabsList>

					{(Object.keys(TAB_META) as ServiceTab[]).map((tab) => (
						<TabsContent key={tab} value={tab} className='mt-0'>
							<motion.div
								initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
								animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
								transition={{ duration: 0.28, ease: 'easeOut' }}
								className='grid gap-5 md:grid-cols-2'>
								{(tab === 'inbound' ? inboundServices : outboundServices).map((service, index) => (
									<motion.article
										key={service.title}
										initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
										whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
										viewport={{ once: true, margin: '-80px' }}
										transition={{ duration: 0.28, delay: shouldReduceMotion ? 0 : index * 0.04 }}
										whileHover={shouldReduceMotion ? undefined : { y: -4 }}>
										<Card
											className={cn(
												'h-full rounded-2xl border shadow-sm transition-shadow hover:shadow-md',
												TAB_META[tab].tone,
											)}>
											<CardHeader className='gap-3 pb-3'>
												<div className='flex items-center gap-3'>
													<div className='inline-flex size-10 items-center justify-center rounded-xl border border-white/70 bg-white/50 text-foreground'>
														{service.icon}
													</div>
													<CardTitle className='text-lg leading-tight'>{service.title}</CardTitle>
												</div>
												<p className='text-sm leading-relaxed text-foreground/80'>{service.description}</p>
											</CardHeader>
											<CardContent className='pt-0'>
												<ul className='space-y-2.5'>
													{service.features.map((feature) => (
														<li key={feature} className='flex items-start gap-2 text-sm text-foreground/85'>
															<Sparkles className='mt-0.5 size-4 shrink-0 text-primary' />
															<span>{feature}</span>
														</li>
													))}
												</ul>
											</CardContent>
										</Card>
									</motion.article>
								))}
							</motion.div>
						</TabsContent>
					))}
				</Tabs>

				<motion.div
					initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
					whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='mt-10 rounded-2xl border border-border/70 bg-card/70 p-5 text-center md:p-6'>
					<p className='text-sm text-muted-foreground'>
						{activeServices.length} service tracks • {activeFeatureCount} execution capabilities
					</p>
					<Button asChild size='lg' className='mt-4 h-11 rounded-xl px-7'>
						<Link href='/contact'>Get Your Custom Service Mix</Link>
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
