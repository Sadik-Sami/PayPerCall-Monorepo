'use client';

import { Shield, TrendingUp, Zap, Puzzle } from 'lucide-react';

const trustPoints = [
	{
		icon: <TrendingUp className='size-5 text-primary' />,
		text: 'Performance-Driven Growth',
	},
	{
		icon: <Shield className='size-5 text-primary' />,
		text: 'Quality + Compliance First',
	},
	{
		icon: <Zap className='size-5 text-primary' />,
		text: 'Real-Time Delivery + Transparency',
	},
	{
		icon: <Puzzle className='size-5 text-primary' />,
		text: 'Full-Stack Execution (From Marketing to Tech)',
	},
];

export default function TrustBar() {
	return (
		<section className='py-6 border-b border-border bg-muted/30'>
			<div className='max-w-7xl mx-auto px-6'>
				<div className='flex flex-wrap items-center justify-center gap-x-10 gap-y-4'>
					{trustPoints.map((point, idx) => (
						<div key={idx} className='flex items-center gap-2 text-sm text-muted-foreground'>
							{point.icon}
							<span className='font-medium'>{point.text}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
