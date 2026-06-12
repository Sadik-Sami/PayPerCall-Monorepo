import { LineChart, Rocket, SearchCheck, Workflow } from 'lucide-react';
import { SectionHeader } from '@workspace/ui/components/sections/section-header';
import { ProcessSteps } from '@workspace/ui/components/sections/process-steps';
import { WHY_US_PROCESS_STEPS } from '../_data/why-us-content';

const PROCESS_ICONS = [SearchCheck, Workflow, Rocket, LineChart] as const;

export function OperatingModel() {
	const steps = WHY_US_PROCESS_STEPS.map((step, index) => {
		const Icon = PROCESS_ICONS.at(index);

		if (!Icon) {
			throw new Error(`Missing operating model icon for step index ${index}`);
		}

		return {
			...step,
			icon: <Icon className='size-8 text-primary' strokeWidth={1.9} />,
		};
	});

	return (
		<section className='section-container py-16 sm:py-20'>
			<SectionHeader
				badge='Operating Model'
				title='A simple process for'
				highlight='complex growth programs'
				subtitle='The handoff from strategy to launch to scale stays structured so your internal team is not left reconciling separate vendors.'
			/>
			<ProcessSteps steps={steps} columns={4} />
		</section>
	);
}
