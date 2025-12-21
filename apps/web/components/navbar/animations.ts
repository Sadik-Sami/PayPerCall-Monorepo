'use client';

import type { Variants } from 'framer-motion';

// Desktop dropdown variants
export const dropdownContainerVariants: Variants = {
	hidden: {
		height: 0,
		opacity: 0,
		transition: {
			height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] as const },
			opacity: { duration: 0.2, ease: 'easeOut' },
		},
	},
	visible: {
		height: 'auto',
		opacity: 1,
		transition: {
			height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] as const },
			opacity: { duration: 0.25, ease: 'easeOut' },
			staggerChildren: 0,
			delayChildren: 0.1,
		},
	},
};

export const columnVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
			staggerChildren: 0.03,
			delayChildren: 0.05,
		},
	},
};

export const linkVariants: Variants = {
	hidden: {
		opacity: 0,
		y: -8,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.25,
			ease: [0.4, 0.0, 0.2, 1] as const,
		},
	},
};

// Mobile menu variants
export const mobileMenuVariants: Variants = {
	hidden: {
		height: 0,
		transition: {
			height: { duration: 0.35, ease: [0.4, 0.0, 0.2, 1] as const },
			opacity: { duration: 0.2, ease: 'easeOut' },
		},
	},
	visible: {
		height: 'auto',
		transition: {
			height: { duration: 0.35, ease: [0.4, 0.0, 0.2, 1] as const },
			staggerChildren: 0.05,
			delayChildren: 0.1,
		},
	},
};

export const mobileItemVariants: Variants = {
	hidden: { opacity: 0, y: -10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: [0.4, 0.0, 0.2, 1] as const,
		},
	},
};

// Mobile accordion variants
export const mobileAccordionVariants: Variants = {
	hidden: {
		height: 0,
		opacity: 0,
		transition: {
			height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] as const },
			opacity: { duration: 0.2, ease: 'easeOut' },
		},
	},
	visible: {
		height: 'auto',
		opacity: 1,
		transition: {
			height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] as const },
			opacity: { duration: 0.25, ease: 'easeOut' },
			staggerChildren: 0.04,
			delayChildren: 0.08,
		},
	},
};

export const mobileSubItemVariants: Variants = {
	hidden: { opacity: 0, x: -10 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.25,
			ease: [0.4, 0.0, 0.2, 1] as const,
		},
	},
};
