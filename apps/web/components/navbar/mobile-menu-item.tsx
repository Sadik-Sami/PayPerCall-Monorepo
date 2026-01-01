'use client';

import { memo } from 'react';
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

export const MobileMenuItem = memo(function MobileMenuItem({ item, isActive, onToggle, onClose }: MobileMenuItemProps) {
	if (item.href) {
		return (
			<a
				href={item.href}
				className='font-utility flex items-center justify-between py-3 sm:py-4 text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors'
				onClick={onClose}>
				{item.label}
			</a>
		);
	}

	return (
		<>
			<button
				onClick={onToggle}
				className='font-utility flex items-center justify-between w-full py-3 sm:py-4 text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors'
				aria-expanded={isActive}>
				{item.label}
				<motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}>
					<ChevronDown size={18} className='text-muted-foreground shrink-0' />
				</motion.div>
			</button>

			<AnimatePresence>
				{isActive && item.columns && (
					<motion.div
						variants={mobileAccordionVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						className='overflow-hidden pt-2 sm:pt-4 bg-muted/50'>
						<div className='pb-2 sm:pb-4'>
							{item.columns.map((column, colIndex) => (
								<motion.div key={colIndex} variants={mobileSubItemVariants} className='mb-3 sm:mb-4 last:mb-0'>
									<h4 className='font-utility text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-4'>
										{column.title}
									</h4>
									<ul className='space-y-0'>
										{column.links.map((link, linkIndex) => (
											<motion.li key={linkIndex} variants={mobileSubItemVariants}>
												<a
													href={link.href}
													className='font-utility block px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors'
													onClick={onClose}>
													<div className='font-medium'>{link.label}</div>
													{link.description && (
														<div className='text-[10px] sm:text-xs text-muted-foreground/80 mt-0.5'>
															{link.description}
														</div>
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
});
