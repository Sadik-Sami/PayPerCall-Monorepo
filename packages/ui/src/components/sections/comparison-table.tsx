'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export interface ComparisonRow {
	feature: string;
	us: boolean | string;
	others: boolean | string;
}

export interface ComparisonTableProps {
	rows: ComparisonRow[];
	usLabel?: string;
	othersLabel?: string;
	className?: string;
}

export function ComparisonTable({
	rows,
	usLabel = 'Us',
	othersLabel = 'Others',
	className,
}: ComparisonTableProps) {
	const renderValue = (value: boolean | string) => {
		if (typeof value === 'boolean') {
			return value ? (
				<Check className='size-5 text-primary mx-auto' />
			) : (
				<X className='size-5 text-muted-foreground/50 mx-auto' />
			);
		}
		return <span className='text-sm text-foreground'>{value}</span>;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className={cn(
				'overflow-hidden rounded-lg border border-border',
				className
			)}>
			<table className='w-full'>
				<thead>
					<tr className='bg-muted/50'>
						<th className='text-left py-4 px-6 text-sm font-semibold text-foreground'>
							Feature
						</th>
						<th className='text-center py-4 px-6 text-sm font-semibold text-primary w-32'>
							{usLabel}
						</th>
						<th className='text-center py-4 px-6 text-sm font-semibold text-muted-foreground w-32'>
							{othersLabel}
						</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row, idx) => (
						<tr
							key={idx}
							className={cn(
								'border-t border-border',
								idx % 2 === 0 ? 'bg-card' : 'bg-card/50'
							)}>
							<td className='py-4 px-6 text-sm text-foreground'>
								{row.feature}
							</td>
							<td className='py-4 px-6 text-center'>{renderValue(row.us)}</td>
							<td className='py-4 px-6 text-center'>
								{renderValue(row.others)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
}
