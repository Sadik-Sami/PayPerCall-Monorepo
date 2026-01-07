import { cn } from '@workspace/ui/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import type { PricingTableProps } from './types';

export function PricingTable({ title, description, plans, billingNote, className }: PricingTableProps) {
	return (
		<section className={cn('space-y-6', className)}>
			<div className='space-y-2'>
				{title ? <h2 className='text-2xl font-semibold text-foreground'>{title}</h2> : null}
				{description ? <p className='text-muted-foreground'>{description}</p> : null}
			</div>
			<div className='grid gap-6 lg:grid-cols-3'>
				{plans.map((plan) => (
					<Card
						key={plan.name}
						className={cn('h-full border border-muted-foreground/30 bg-background/95', plan.isRecommended && 'border-primary shadow-lg')}>
						<CardHeader>
							<div className='flex items-center justify-between'>
								<CardTitle className='text-xl'>{plan.name}</CardTitle>
								{plan.badge ? (
									<span className='rounded-full border border-primary/30 px-3 py-1 text-xs font-semibold uppercase text-primary'>{plan.badge}</span>
								) : null}
							</div>
							<CardDescription>{plan.description}</CardDescription>
							<p className='text-3xl font-semibold text-foreground'>{plan.priceLabel}</p>
						</CardHeader>
						<CardContent className='space-y-3 text-sm'>
							<ul className='space-y-2'>
								{plan.features.map((feature) => (
									<li key={feature} className='flex items-start gap-2 text-muted-foreground'>
										<span className='mt-1 size-1.5 rounded-full bg-primary/60' />
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter>
							<Button className='w-full' variant={plan.isRecommended ? 'default' : 'outline'}>
								Request Detailed Estimate
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
			{billingNote ? <p className='text-sm text-muted-foreground'>{billingNote}</p> : null}
		</section>
	);
}

