'use client';

import { Shield, Award, Clock, Users } from 'lucide-react';

const trustPoints = [
	{
		icon: <Shield className='size-5 text-primary' />,
		text: 'TCPA Compliant',
	},
	{
		icon: <Award className='size-5 text-primary' />,
		text: 'Performance-Based Pricing',
	},
	{
		icon: <Clock className='size-5 text-primary' />,
		text: 'Real-Time Lead Delivery',
	},
	{
		icon: <Users className='size-5 text-primary' />,
		text: '10+ Industries Served',
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
