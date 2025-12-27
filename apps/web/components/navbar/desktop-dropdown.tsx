'use client';

import { motion } from 'framer-motion';
import type { NavItem } from './types';
import { columnVariants, linkVariants } from './animations';

interface DesktopDropdownProps {
	navItem: NavItem;
	onMouseEnter: () => void;
}

export function DesktopDropdown({ navItem, onMouseEnter }: DesktopDropdownProps) {
	if (!navItem.columns) return null;

	return (
		<div className='overflow-hidden bg-muted border-b border-border' onMouseEnter={onMouseEnter}>
			<div className='max-w-7xl mx-auto px-6 py-12'>
				<motion.div
					key={navItem.id}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='grid gap-12'
					style={{
						gridTemplateColumns: `repeat(${navItem.columns.length}, minmax(0, 1fr))`,
					}}>
					{navItem.columns.map((column, colIndex) => (
						<motion.div key={colIndex} variants={columnVariants} className='space-y-4'>
							<h3 className='font-utility text-xl font-extralight text-muted-foreground uppercase tracking-tighter'>
								{column.title}
							</h3>
							<ul className='space-y-3'>
								{column.links.map((link, linkIndex) => (
									<motion.li key={linkIndex} variants={linkVariants}>
										<a
											href={link.href}
											className='font-utility text-sm text-muted-foreground hover:text-blue-400 transition-colors block'>
											{link.label}
										</a>
										<div className='h-0.5 w-full bg-border mt-3' />
									</motion.li>
								))}
							</ul>
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
}
