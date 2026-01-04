'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { icons, LucideIcon } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export interface ProcessStep {
	step: number;
	title: string;
	description: string;
	icon?: string | ReactNode;
}

export interface ProcessStepsProps {
	steps: ProcessStep[];
	columns?: 3 | 4;
	className?: string;
}

// Convert kebab-case or snake_case to PascalCase for Lucide icon lookup
function toIconName(str: string): string {
	return str
		.split(/[-_]/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join('');
}

// Some Lucide icons have been renamed - map old names to new names
const iconAliases: Record<string, string> = {
	'check-circle': 'CircleCheck',
	'check-circle-2': 'CircleCheck',
	'x-circle': 'CircleX',
	'alert-circle': 'CircleAlert',
	'help-circle': 'CircleHelp',
	'info-circle': 'CircleInfo',
	'plus-circle': 'CirclePlus',
	'minus-circle': 'CircleMinus',
	'arrow-right-circle': 'CircleArrowRight',
	'arrow-left-circle': 'CircleArrowLeft',
};

// Render icon from string name or ReactNode
function StepIcon({ icon }: { icon?: string | ReactNode }) {
	if (!icon) return null;

	// If it's already a ReactNode (JSX element), render it directly
	if (typeof icon !== 'string') {
		return <>{icon}</>;
	}

	// Check for aliased icon names first
	const iconName = iconAliases[icon.toLowerCase()] || toIconName(icon);
	let LucideIconComponent = icons[iconName as keyof typeof icons] as LucideIcon;

	// If not found, try the reversed format (e.g., CheckCircle -> CircleCheck)
	if (!LucideIconComponent) {
		const parts = icon.split('-');
		if (parts.length === 2) {
			const reversedName = toIconName(`${parts[1]}-${parts[0]}`);
			LucideIconComponent = icons[reversedName as keyof typeof icons] as LucideIcon;
		}
	}

	if (LucideIconComponent) {
		return <LucideIconComponent className='w-8 h-8 text-primary' />;
	}

	// Fallback: return null if icon not found
	return null;
}

export function ProcessSteps({ steps, columns = 4, className }: ProcessStepsProps) {
	const gridCols = {
		3: 'lg:grid-cols-3',
		4: 'lg:grid-cols-4',
	};

	return (
		<div className={cn('grid grid-cols-1 md:grid-cols-2 gap-8', gridCols[columns], className)}>
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
								<StepIcon icon={step.icon} />
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
	);
}
