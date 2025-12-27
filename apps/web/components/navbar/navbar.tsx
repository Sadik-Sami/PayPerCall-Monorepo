'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigationData } from './data';
import { DesktopDropdown } from './desktop-dropdown';
import { MobileMenuItem } from './mobile-menu-item';
import { dropdownContainerVariants, mobileMenuVariants, mobileItemVariants } from './animations';
import Link from 'next/link';
import { ModeToggle } from '../mode-toggle';

export function Navbar() {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
	const [dropdownHeight, setDropdownHeight] = useState(0);
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (activeDropdown && dropdownRef.current) {
			const height = dropdownRef.current.scrollHeight;
			setDropdownHeight(height);
		} else {
			setDropdownHeight(0);
		}
	}, [activeDropdown]);

	const handleMouseEnter = (id: string | null) => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}
		// Reduced timeout for snappier response
		hoverTimeoutRef.current = setTimeout(() => {
			setActiveDropdown(id);
		}, 50);
	};

	const handleMouseLeave = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}
		hoverTimeoutRef.current = setTimeout(() => {
			setActiveDropdown(null);
		}, 150);
	};

	const toggleMobileDropdown = (id: string) => {
		setMobileActiveDropdown(mobileActiveDropdown === id ? null : id);
	};

	const activeNavItem = navigationData.find((item) => item.id === activeDropdown);

	return (
		<>
			{/* Desktop Navigation */}
			<div className='hidden md:block'>
				<nav
					className='fixed top-0 left-0 right-0 z-50 bg-background border-b border-border'
					onMouseLeave={handleMouseLeave}>
					<div className='max-w-7xl mx-auto px-6'>
						<div className='flex items-center justify-between h-14'>
							{/* Logo */}
							<Link
								href='/'
								className='font-utility text-xl font-semibold tracking-tight text-foreground hover:text-muted-foreground transition-colors'
								onMouseEnter={() => handleMouseEnter(null)}>
								Premium
							</Link>

							{/* Navigation Items */}
							<div className='flex items-center gap-8'>
								{navigationData.map((item) => (
									<div key={item.id}>
										{item.href ?
											<a
												href={item.href}
												onMouseEnter={() => handleMouseEnter(null)}
												className='font-utility text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'>
												{item.label}
											</a>
										:	<button
												onMouseEnter={() => handleMouseEnter(item.id)}
												className='font-utility text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1 relative'
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
								className='absolute left-0 right-0 z-40'>
								<DesktopDropdown
									navItem={activeNavItem}
									onMouseEnter={() => {
										if (hoverTimeoutRef.current) {
											clearTimeout(hoverTimeoutRef.current);
										}
									}}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</nav>

				{/* Spacer to push content down */}
				<div
					style={{
						height: `${56 + dropdownHeight}px`,
						transition: 'height 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
					}}
				/>
			</div>

			{/* Mobile Navigation */}
			<div className='md:hidden'>
				<nav className='fixed top-0 left-0 right-0 z-50 bg-background border-b border-border'>
					<div className='flex items-center justify-between h-14 px-6'>
						<Link href='/' className='font-utility text-xl font-semibold tracking-tight text-foreground'>
							Premium
						</Link>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='p-2 text-muted-foreground hover:text-foreground'
							aria-label='Toggle menu'
							aria-expanded={mobileMenuOpen}>
							{mobileMenuOpen ?
								<X size={24} />
							:	<Menu size={24} />}
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
							<div className='h-full overflow-y-auto'>
								<div className='px-6 py-2'>
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
