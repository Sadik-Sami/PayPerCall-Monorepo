'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Target, Rocket, BarChart3 } from 'lucide-react';

const steps = [
	{
		step: 1,
		title: 'Discovery Call',
		description:
			'We start with a free consultation to understand your business, target audience, and goals. No commitment required.',
		icon: <MessageSquare className='size-6 text-primary' />,
	},
	{
		step: 2,
		title: 'Custom Strategy',
		description:
			'Based on your needs, we build a tailored lead generation strategy with clear targeting, budget allocation, and expected outcomes.',
		icon: <Target className='size-6 text-primary' />,
	},
	{
		step: 3,
		title: 'Campaign Launch',
		description:
			'We launch your campaigns and start delivering qualified leads. You receive calls and leads in real-time with full tracking.',
		icon: <Rocket className='size-6 text-primary' />,
	},
	{
		step: 4,
		title: 'Optimize & Scale',
		description:
			'Using performance data, we continuously optimize for better lead quality and lower costs. Scale up when you are ready.',
		icon: <BarChart3 className='size-6 text-primary' />,
	},
];

export default function HowItWorks() {
	return (
		<section className='py-24 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				{/* Header */}
				<div className='mb-16 text-center'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground mb-4'>
						How It Works
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='max-w-2xl mx-auto text-muted-foreground text-lg'>
						Getting started is simple. Our proven process ensures you receive quality leads from day one.
					</motion.p>
				</div>

				{/* Steps Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{steps.map((step, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
							className='relative'>
							{/* Connector line (hidden on last item and mobile) */}
							{idx < steps.length - 1 && (
								<div className='hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border' />
							)}

							<div className='flex flex-col items-center text-center'>
								{/* Step number circle */}
								<div className='relative mb-6'>
									<div className='flex items-center justify-center w-20 h-20 rounded-full bg-card border-2 border-border'>
										{step.icon}
									</div>
									<div className='absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>
										{step.step}
									</div>
								</div>

								<h3 className='text-lg font-bold text-foreground mb-2'>{step.title}</h3>
								<p className='text-sm text-muted-foreground leading-relaxed'>{step.description}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
