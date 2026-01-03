'use client';

import { Shield, Award, Clock, CheckCircle, Headphones } from 'lucide-react';

const trustItems = [
	{ icon: Shield, text: 'TCPA Compliant' },
	{ icon: Award, text: 'HIPAA Certified' },
	{ icon: Clock, text: 'SOC 2 Type II' },
	{ icon: CheckCircle, text: 'PCI DSS Compliant' },
	{ icon: Headphones, text: '24/7/365 Operations' },
];

export default function TrustBar() {
	return (
		<section className='py-6 border-b border-border bg-muted/30'>
			<div className='max-w-7xl mx-auto px-6'>
				<div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-4'>
					{trustItems.map((item, idx) => (
						<div key={idx} className='flex items-center gap-2 text-sm text-muted-foreground'>
							<item.icon className='size-5 text-primary' />
							<span className='font-medium'>{item.text}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
