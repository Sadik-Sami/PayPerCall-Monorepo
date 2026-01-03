import { MessageSquare, FileCheck, Rocket, BarChart3 } from 'lucide-react';
import { createElement } from 'react';
import type { ProcessStep } from '@workspace/ui/components/sections/process-steps';

export const processSteps: ProcessStep[] = [
	{
		step: 1,
		title: 'Discovery Call',
		description:
			'We start with a free consultation to understand your business, call volume, and specific requirements. No commitment required.',
		icon: createElement(MessageSquare, { className: 'size-6 text-primary' }),
	},
	{
		step: 2,
		title: 'Custom Proposal',
		description:
			'Within 48 hours, you receive a detailed proposal with pricing, timeline, and a customized solution designed for your needs.',
		icon: createElement(FileCheck, { className: 'size-6 text-primary' }),
	},
	{
		step: 3,
		title: 'Launch & Training',
		description:
			'Our team develops scripts, trains agents on your products, integrates with your systems, and goes live within 2-3 weeks.',
		icon: createElement(Rocket, { className: 'size-6 text-primary' }),
	},
	{
		step: 4,
		title: 'Optimize & Scale',
		description:
			'Using performance data and call analytics, we continuously optimize for better results. Scale up or down as your needs change.',
		icon: createElement(BarChart3, { className: 'size-6 text-primary' }),
	},
];
