import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import { LucideIcon } from 'lucide-react';

export type ServiceCta = {
	label: string;
	href: string;
};

export type ServiceHeroProps = {
	pill?: string;
	eyebrow?: string;
	title: string;
	subtitle: string;
	primaryCta: ServiceCta;
	secondaryCta?: ServiceCta;
	features?: string[];
	stat?: {
		value: string;
		label: string;
	};
	footnote?: string;
	media?: {
		src: StaticImageData | string;
		alt: string;
		caption?: string;
	};
	className?: string;
};

export type TrustLogo = {
	name: string;
	src?: string;
	alt?: string;
	fallbackInitials?: string;
};

export type TrustMetric = {
	label: string;
	value: string;
	helperText?: string;
};

export type TrustStripProps = {
	logos?: TrustLogo[];
	metrics?: TrustMetric[];
	className?: string;
};

export type ProcessStep = {
	title: string;
	description: string;
	icon?: ReactNode;
};

export type ProcessStepsProps = {
	steps: ProcessStep[];
	title?: string;
	className?: string;
};

export type CaseStudyItem = {
	client?: string;
	industry?: string;
	problem: string;
	solution: string;
	outcome: string;
	link?: string;
	icon?: ReactNode;
	metrics?: {
		label: string;
		value: string;
		helperText?: string;
	}[];
};

export type CaseStudyStripProps = {
	items: CaseStudyItem[];
	title?: string;
	description?: string;
	className?: string;
};

export type PricingPlan = {
	name: string;
	description?: string;
	priceLabel: string;
	features: string[];
	isRecommended?: boolean;
	badge?: string;
};

export type PricingTableProps = {
	title?: string;
	description?: string;
	plans: PricingPlan[];
	billingNote?: string;
	className?: string;
};

export type FaqItem = {
	question: string;
	answer: string;
};

export type FAQSectionProps = {
	items: FaqItem[];
	title?: string;
	description?: string;
	className?: string;
};

export type FreeConsultationSectionProps = {
	title: string;
	bullets: string[];
	formVariant?: 'short' | 'detailed';
	className?: string;
};

export type ServiceNavItem = {
	label: string;
	href: string;
	summary?: string;
	capabilities?: string[];
	isExternal?: boolean;
	icon?: LucideIcon;
};

