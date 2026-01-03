'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export interface CaseStudy {
	company: string;
	industry: string;
	problem: string;
	solution: string;
	results: {
		metric: string;
		value: string;
	}[];
	href?: string;
}

export interface CaseStudyCardProps {
	caseStudy: CaseStudy;
	className?: string;
}

export function CaseStudyCard({ caseStudy, className }: CaseStudyCardProps) {
	const CardWrapper = caseStudy.href ? 'a' : 'div';
	const cardProps = caseStudy.href ? { href: caseStudy.href } : {};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className={cn('h-full', className)}>
			<CardWrapper
				{...cardProps}
				className={cn(
					'flex flex-col h-full p-6 md:p-8 rounded-lg border border-border bg-card',
					caseStudy.href &&
						'hover:border-primary/30 transition-colors cursor-pointer group'
				)}>
				{/* Header */}
				<div className='mb-4'>
					<span className='text-xs font-medium text-primary uppercase tracking-wider'>
						{caseStudy.industry}
					</span>
					<h3 className='text-xl font-bold text-foreground mt-1'>
						{caseStudy.company}
					</h3>
				</div>

				{/* Problem & Solution */}
				<div className='space-y-4 mb-6 flex-grow'>
					<div>
						<p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1'>
							Challenge
						</p>
						<p className='text-sm text-foreground leading-relaxed'>
							{caseStudy.problem}
						</p>
					</div>
					<div>
						<p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1'>
							Solution
						</p>
						<p className='text-sm text-foreground leading-relaxed'>
							{caseStudy.solution}
						</p>
					</div>
				</div>

				{/* Results */}
				<div className='border-t border-border pt-4'>
					<p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3'>
						Results
					</p>
					<div className='grid grid-cols-2 gap-4'>
						{caseStudy.results.map((result, idx) => (
							<div key={idx}>
								<p className='text-2xl font-bold text-primary'>{result.value}</p>
								<p className='text-xs text-muted-foreground'>{result.metric}</p>
							</div>
						))}
					</div>
				</div>

				{/* Link indicator */}
				{caseStudy.href && (
					<div className='flex items-center gap-2 mt-4 text-sm text-primary font-medium'>
						<span>Read full case study</span>
						<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
					</div>
				)}
			</CardWrapper>
		</motion.div>
	);
}

export interface CaseStudyGridProps {
	caseStudies: CaseStudy[];
	columns?: 2 | 3;
	className?: string;
}

export function CaseStudyGrid({
	caseStudies,
	columns = 3,
	className,
}: CaseStudyGridProps) {
	const gridCols = {
		2: 'grid-cols-1 md:grid-cols-2',
		3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
	};

	return (
		<div className={cn('grid gap-6', gridCols[columns], className)}>
			{caseStudies.map((caseStudy, idx) => (
				<CaseStudyCard key={idx} caseStudy={caseStudy} />
			))}
		</div>
	);
}
