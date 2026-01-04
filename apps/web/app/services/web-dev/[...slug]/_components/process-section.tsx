import { SectionHeader, ProcessSteps } from '@workspace/ui/components/sections';

interface ProcessStep {
	step: number;
	title: string;
	description: string;
	icon?: string;
}

interface ProcessSectionProps {
	processSteps: ProcessStep[];
}

export default function ProcessSection({ processSteps }: ProcessSectionProps) {
	const steps = processSteps.map((step) => ({
		step: step.step,
		title: step.title,
		description: step.description,
		icon: step.icon,
	}));

	// Constrain columns to valid values (3 or 4), default to 4 if out of range
	const columns = processSteps.length <= 3 ? 3 : 4;

	return (
		<section className='py-24 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<SectionHeader
					title='Our Process'
					highlight='How We Work'
					subtitle='A proven methodology for delivering results'
				/>
				<ProcessSteps steps={steps} columns={columns} />
			</div>
		</section>
	);
}
