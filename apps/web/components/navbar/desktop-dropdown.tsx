'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { NavItem } from './types';
import { columnVariants, linkVariants } from './animations';
import Link from 'next/link';
interface DesktopDropdownProps {
	navItem: NavItem;
}

export const DesktopDropdown = memo(function DesktopDropdown({ navItem }: DesktopDropdownProps) {
	if (!navItem.columns) return null;

	const isServices = navItem.id === 'services';
	const columnCount = navItem.columns.length;

	const getGridClasses = () => {
		if (isServices) {
			return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
		}

		if (columnCount === 1) return 'grid-cols-1';
		if (columnCount === 2) return 'grid-cols-1 sm:grid-cols-2';
		if (columnCount === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
		return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
	};

	return (
		<div className='overflow-hidden bg-muted border-b border-border'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12'>
				<motion.div
					key={navItem.id}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className={`grid gap-6 sm:gap-8 ${getGridClasses()}`}>
					{navItem.columns.map((column, colIndex) => (
						<motion.div key={colIndex} variants={columnVariants} className='space-y-3 sm:space-y-4'>
							{column.href ? (
								<Link
									href={column.href}
									className='font-utility text-base sm:text-lg lg:text-xl font-bold text-foreground uppercase tracking-tight hover:text-primary transition-colors block'
								>
									{column.title}
								</Link>
							) : (
								<h3 className='font-utility text-base sm:text-lg lg:text-xl font-bold text-foreground uppercase tracking-tight'>
									{column.title}
								</h3>
							)}
							<ul className='space-y-2 sm:space-y-2.5'>
								{column.links.map((link, linkIndex) => (
									<motion.li key={linkIndex} variants={linkVariants}>
										<Link
											href={link.href}
											className='font-utility text-sm sm:text-sm lg:text-base text-muted-foreground hover:text-primary transition-colors duration-200 block py-1'>
											{link.label}
										</Link>
									</motion.li>
								))}
							</ul>
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
});
