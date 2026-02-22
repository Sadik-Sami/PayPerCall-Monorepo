'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigationData } from './data';
import { DesktopDropdown } from './desktop-dropdown';
import { MobileMenuItem } from './mobile-menu-item';
import { dropdownContainerVariants, mobileMenuVariants, mobileItemVariants } from './animations';
import Link from 'next/link';
import { ModeToggle } from '../mode-toggle';
import logo from '@/public/logo.png';
import Image from 'next/image';

export function Navbar() {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
	const [dropdownHeight, setDropdownHeight] = useState(0);
	const [navbarHeight, setNavbarHeight] = useState(56);
	const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
	const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const navbarRef = useRef<HTMLElement>(null);

	// Memoize active nav item to avoid recalculation
	const activeNavItem = useMemo(() => navigationData.find((item) => item.id === activeDropdown), [activeDropdown]);

	// Derive effective dropdown height to avoid setState in effect (fixes cascading render warning)
	const effectiveDropdownHeight = activeDropdown ? dropdownHeight : 0;

	// Optimize height calculation with ResizeObserver
	useEffect(() => {
		if (!activeDropdown || !dropdownRef.current) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setDropdownHeight(entry.contentRect.height);
			}
		});

		resizeObserver.observe(dropdownRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, [activeDropdown]);

	// Track navbar height for responsive spacer
	useEffect(() => {
		if (!navbarRef.current) return;

		const updateNavbarHeight = () => {
			if (navbarRef.current) {
				setNavbarHeight(navbarRef.current.offsetHeight);
			}
		};

		updateNavbarHeight();
		window.addEventListener('resize', updateNavbarHeight);

		return () => {
			window.removeEventListener('resize', updateNavbarHeight);
		};
	}, []);

	// Clear all timeouts helper
	const clearAllTimeouts = useCallback(() => {
		if (openTimeoutRef.current) {
			clearTimeout(openTimeoutRef.current);
			openTimeoutRef.current = null;
		}
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
	}, []);

	// Handle hovering over nav items with dropdowns
	const handleNavItemEnter = useCallback(
		(id: string) => {
			clearAllTimeouts();
			// Small delay to prevent flickering when moving between items
			openTimeoutRef.current = setTimeout(() => {
				setActiveDropdown(id);
			}, 50);
		},
		[clearAllTimeouts],
	);

	// Handle hovering over nav items WITHOUT dropdowns (like Home, Contact)
	const handleNonDropdownItemEnter = useCallback(() => {
		clearAllTimeouts();
		// Immediately close dropdown when hovering non-dropdown items
		setActiveDropdown(null);
		setIsHoveringDropdown(false);
	}, [clearAllTimeouts]);

	// Handle entering the dropdown content area
	const handleDropdownEnter = useCallback(() => {
		clearAllTimeouts();
		setIsHoveringDropdown(true);
	}, [clearAllTimeouts]);

	// Handle leaving the dropdown content area
	const handleDropdownLeave = useCallback(() => {
		setIsHoveringDropdown(false);
		clearAllTimeouts();
		closeTimeoutRef.current = setTimeout(() => {
			setActiveDropdown(null);
		}, 150);
	}, [clearAllTimeouts]);

	// Handle mouse leaving the entire navbar
	const handleNavLeave = useCallback(() => {
		if (!isHoveringDropdown) {
			clearAllTimeouts();
			closeTimeoutRef.current = setTimeout(() => {
				setActiveDropdown(null);
			}, 150);
		}
	}, [clearAllTimeouts, isHoveringDropdown]);

	const toggleMobileDropdown = useCallback((id: string) => {
		setMobileActiveDropdown((prev) => (prev === id ? null : id));
	}, []);

	// Cleanup timeouts on unmount
	useEffect(() => {
		return () => {
			if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
			if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
		};
	}, []);

	return (
		<>
			{/* Desktop Navigation */}
			<div className='hidden md:block'>
				<nav
					ref={navbarRef}
					className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border py-2'
					onMouseLeave={handleNavLeave}>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='flex items-center justify-between h-10 sm:h-14 lg:h-16'>
							{/* Logo */}
							<Link
								href='/'
								className='flex flex-row items-end gap-0.5 font-utility text-foreground hover:text-muted-foreground transition-colors'
								onMouseEnter={handleNonDropdownItemEnter}>
								<Image src={logo} alt='Core Closer Logo' height={64} width={64} />
								<div className='flex flex-col'>
									<span className='text-lg sm:text-xl tracking-tight text-foreground hover:text-muted-foreground transition-colors font-bold'><span className='text-primary'>Core</span> Closer</span>
									<span className='text-xs sm:text-sm tracking-tight text-foreground italic'>Performance You Can Bank On.</span>
								</div>
							</Link>

							{/* Navigation Items */}
							<div className='flex items-center gap-3 sm:gap-4 lg:gap-6'>
								{navigationData.map((item) => (
									<div key={item.id}>
										{item.href ?
											<Link
												href={item.href}
												onMouseEnter={handleNonDropdownItemEnter}
												className='font-utility text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap'>
												{item.label}
											</Link>
											: <button
												onMouseEnter={() => handleNavItemEnter(item.id)}
												className='font-utility text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1 relative whitespace-nowrap'
												aria-expanded={activeDropdown === item.id}
												aria-controls={`dropdown-${item.id}`}>
												{item.label}
												{activeDropdown === item.id && (
													<motion.div
														layoutId='activeIndicator'
														className='absolute -bottom-px left-0 right-0 h-0.5 bg-foreground'
														transition={{ duration: 0.2 }}
													/>
												)}
											</button>
										}
									</div>
								))}
								<ModeToggle />
							</div>
						</div>
					</div>

					{/* Dropdown Panel */}
					<AnimatePresence>
						{activeDropdown && activeNavItem && activeNavItem.columns && (
							<motion.div
								key={activeNavItem.id}
								id={`dropdown-${activeDropdown}`}
								ref={dropdownRef}
								variants={dropdownContainerVariants}
								initial='hidden'
								animate='visible'
								exit='hidden'
								className='absolute left-0 right-0 z-40'
								onMouseEnter={handleDropdownEnter}
								onMouseLeave={handleDropdownLeave}>
								<DesktopDropdown navItem={activeNavItem} />
							</motion.div>
						)}
					</AnimatePresence>
				</nav>

				{/* Spacer to push content down */}
				<div
					style={{
						height: effectiveDropdownHeight > 0 ? `${navbarHeight + effectiveDropdownHeight}px` : `${navbarHeight}px`,
						transition: 'height 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
					}}
				/>
			</div>

			{/* Mobile Navigation */}
			<div className='md:hidden'>
				<nav className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border'>
					<div className='flex items-center justify-between h-14 px-4 sm:px-6'>
						<Link href='/' className='flex items-center gap-2 font-utility text-foreground hover:text-muted-foreground transition-colors'>
							<Image src={logo} alt='Core Closer Logo' height={32} width={32} />
							<div className='flex flex-col'>
								<span className='text-base sm:text-lg tracking-tight text-foreground hover:text-muted-foreground transition-colors font-bold'><span className='text-primary '>Core</span> Closer</span>
								<span className='text-xs sm:text-sm tracking-tight text-foreground italic'>Performance You Can Bank On.</span>
							</div>
						</Link>
						<button
							onClick={() => setMobileMenuOpen((prev) => !prev)}
							className='p-2 text-muted-foreground hover:text-foreground transition-colors'
							aria-label='Toggle menu'
							aria-expanded={mobileMenuOpen}>
							{mobileMenuOpen ?
								<X size={20} className='sm:w-6 sm:h-6' />
								: <Menu size={20} className='sm:w-6 sm:h-6' />}
						</button>
					</div>
				</nav>

				{/* Mobile Menu Backdrop */}
				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='fixed top-14 inset-0 z-40 bg-background/95 backdrop-blur-sm'
							onClick={() => setMobileMenuOpen(false)}
						/>
					)}
				</AnimatePresence>

				{/* Mobile Menu Content */}
				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div
							variants={mobileMenuVariants}
							initial='hidden'
							animate='visible'
							exit='hidden'
							className='fixed top-14 left-0 right-0 bottom-0 z-50 bg-background overflow-hidden border-b border-border'>
							<div className='h-full overflow-y-auto overscroll-contain'>
								<div className='px-4 sm:px-6 py-2'>
									{navigationData.map((item) => (
										<motion.div
											key={item.id}
											variants={mobileItemVariants}
											className='border-b border-border last:border-b-0'>
											<MobileMenuItem
												item={item}
												isActive={mobileActiveDropdown === item.id}
												onToggle={() => toggleMobileDropdown(item.id)}
												onClose={() => setMobileMenuOpen(false)}
											/>
										</motion.div>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}
