'use client';

import { Shield, Award, Clock, CheckCircle } from 'lucide-react';
import { trustIndicators } from '../_data/stats';

const icons = [Shield, Award, Clock, CheckCircle, Shield];

export default function TrustBar() {
	return (
		<section className='py-6 border-b border-border bg-muted/30'>
			<div className='max-w-7xl mx-auto px-6'>
				<div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-4'>
					{trustIndicators.map((indicator, idx) => {
						const Icon = icons[idx % icons.length];
						return (
							<div
								key={idx}
								className='flex items-center gap-2 text-sm text-muted-foreground'>
								<Icon className='size-5 text-primary' />
								<span className='font-medium'>{indicator}</span>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
