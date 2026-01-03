'use client';

import { motion } from 'framer-motion';
import { SectionHeader, ComparisonTable } from '@workspace/ui/components/sections';
import { comparisonData, differentiators } from '../_data/comparison';
import { CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
	return (
		<section className='py-24 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<SectionHeader
					badge='Why Us'
					title='Built for Businesses That'
					highlight='Demand More'
					subtitle="We're not your typical call center. See how we compare to the competition."
				/>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
					{/* Left: Comparison Table */}
					<div>
						<ComparisonTable
							rows={comparisonData}
							usLabel='Core Closer'
							othersLabel='Typical Vendors'
						/>
					</div>

					{/* Right: Differentiators */}
					<div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='space-y-6'>
							<h3 className='text-2xl font-bold text-foreground'>
								What Sets Us Apart
							</h3>
							<div className='space-y-4'>
								{differentiators.map((item, idx) => (
									<motion.div
										key={idx}
										initial={{ opacity: 0, x: 20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: idx * 0.1 }}
										className='flex gap-4'>
										<div className='shrink-0 mt-1'>
											<CheckCircle2 className='size-5 text-primary' />
										</div>
										<div>
											<h4 className='font-semibold text-foreground mb-1'>
												{item.title}
											</h4>
											<p className='text-sm text-muted-foreground'>
												{item.description}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
