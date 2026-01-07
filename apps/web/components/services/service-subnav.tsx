'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@workspace/ui/lib/utils';
import type { ServiceNavItem } from './types';

type ServiceSubnavProps = {
	items: ServiceNavItem[];
};

export function ServiceSubnav({ items }: ServiceSubnavProps) {
	const pathname = usePathname();
	const activeItem = items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) ?? items[0];

	return (
		<div className='space-y-4'>
			<nav aria-label='Web development sections' className='flex gap-4 overflow-x-auto py-4'>
				{items.map((item) => {
					const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
					return (
						<Link
							key={item.href}
							href={item.href}
							target={item.isExternal ? '_blank' : undefined}
							rel={item.isExternal ? 'noreferrer' : undefined}
							className={cn(
								'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
								isActive ?
									'border-primary bg-primary/10 text-primary'
								:	'border-transparent bg-muted text-muted-foreground hover:text-foreground'
							)}>
							{item.label}
						</Link>
					);
				})}
			</nav>
			{activeItem?.summary ?
				<div className='space-y-2 rounded-2xl border border-muted-foreground/30 bg-background/90 p-4 shadow-sm shadow-primary/5'>
					<p className='text-sm text-muted-foreground'>{activeItem.summary}</p>
					{activeItem.capabilities?.length ?
						<div className='flex flex-wrap gap-2'>
							{activeItem.capabilities.map((capability) => (
								<span
									key={capability}
									className='rounded-full border border-muted-foreground/30 bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground'>
									{capability}
								</span>
							))}
						</div>
					:	null}
				</div>
			:	null}
		</div>
	);
}
