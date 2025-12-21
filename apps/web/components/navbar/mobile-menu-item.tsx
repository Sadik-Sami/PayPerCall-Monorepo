'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { NavItem } from './types';
import { mobileAccordionVariants, mobileSubItemVariants } from './animations';

interface MobileMenuItemProps {
	item: NavItem;
	isActive: boolean;
	onToggle: () => void;
	onClose: () => void;
}

export function MobileMenuItem({ item, isActive, onToggle, onClose }: MobileMenuItemProps) {
	if (item.href) {
		return (
			<a
				href={item.href}
				className='font-utility flex items-center justify-between py-4 text-base font-medium text-foreground'
				onClick={onClose}>
				{item.label}
			</a>
		);
	}

	return (
		<>
			<button
				onClick={onToggle}
				className='font-utility flex items-center justify-between w-full py-4 text-base font-medium text-foreground'
				aria-expanded={isActive}>
				{item.label}
				<motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}>
					<ChevronDown size={18} className='text-muted-foreground' />
				</motion.div>
			</button>

			<AnimatePresence>
				{isActive && item.columns && (
					<motion.div
						variants={mobileAccordionVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						className='overflow-hidden bg-muted'>
						<div className='pb-4'>
							{item.columns.map((column, colIndex) => (
								<motion.div key={colIndex} variants={mobileSubItemVariants} className='mb-4 last:mb-0'>
									<h4 className='font-utility text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-4'>
										{column.title}
									</h4>
									<ul className='space-y-0'>
										{column.links.map((link, linkIndex) => (
											<motion.li key={linkIndex} variants={mobileSubItemVariants}>
												<a
													href={link.href}
													className='font-utility block px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent'
													onClick={onClose}>
													<div className='font-medium'>{link.label}</div>
													{link.description && (
														<div className='text-xs text-muted-foreground mt-0.5'>{link.description}</div>
													)}
												</a>
											</motion.li>
										))}
									</ul>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
