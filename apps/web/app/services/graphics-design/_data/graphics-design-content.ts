import type { FaqItem } from '@/types/services';

export type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

export const SECTION_PADDING = 'max-w-7xl mx-auto py-20 md:py-24';

export const HERO = {
	eyebrow: '/ Graphics Design',
	lines: ['We design', 'the creative work', 'that makes your', 'lead engine sell.'],
	accent: { line: 3, word: 'sell.' },
	accentColour: 'lilac' as Accent,
	subDeck:
		'Brand systems, landing pages, ad creative, social, decks — every pixel built like a conversion asset, not a portfolio piece.',
	primaryCta: { label: 'Start a design project', href: '/contact' },
	secondaryCta: { label: 'See selected work', href: '#work' },
	badges: [
		{ icon: 'sparkle' as const, label: '12+ yrs creative ops' },
		{ icon: 'diamond' as const, label: 'Built for paid media' },
		{ icon: 'star' as const, label: 'Brand → funnel covered' },
	],
	marqueeTokens: ['Brand', 'Landing', 'Ad creative', 'Social', 'Email', 'Decks', 'Funnels', 'Systems'],
	haloAccents: ['lilac', 'sky'] as Accent[],
};

export const CAPABILITIES = {
	eyebrow: '/ Capabilities',
	headline: 'What we design.',
	description:
		'Six disciplines, one operating system. We build each touchpoint with the next one in mind so your funnel reads as one piece.',
	tiles: [
		{
			title: 'Brand identity',
			description: 'The system every other touchpoint inherits: logo, type, colour, voice.',
			bullets: ['Logo + marks', 'Type + colour system', 'Voice + usage guide'],
			icon: 'Sparkles' as const,
			accent: 'lilac' as Accent,
			size: 'lg' as const,
		},
		{
			title: 'Landing pages',
			description: 'Conversion-engineered pages designed to match the ad that brought them.',
			bullets: ['Ad-to-page parity', 'CRO heuristics', 'Responsive shipping files'],
			icon: 'Layout' as const,
			accent: 'sky' as Accent,
		},
		{
			title: 'Ad creative',
			description: 'Static + motion ad creative built A/B-ready for Meta, Google, TikTok.',
			bullets: ['Hook variants', 'Static + motion', 'Platform-ready cuts'],
			icon: 'Megaphone' as const,
			accent: 'peach' as Accent,
		},
		{
			title: 'Social content',
			description: 'Templated, brand-consistent social posts that scale across channels.',
			bullets: ['Post systems', 'Carousel templates', 'Editorial cadence'],
			icon: 'Share2' as const,
			accent: 'mint' as Accent,
		},
		{
			title: 'Email + funnel',
			description: 'Lifecycle emails, nurture sequences, in-funnel layouts that lift LTV.',
			bullets: ['Welcome flows', 'Lifecycle modules', 'In-funnel UI'],
			icon: 'Mail' as const,
			accent: 'blush' as Accent,
		},
		{
			title: 'Pitch & sales decks',
			description: 'Investor decks, sales one-pagers, partnership proposals that close.',
			bullets: ['Narrative arc', 'Reusable deck system', 'One-pager kit'],
			icon: 'Presentation' as const,
			accent: 'lime' as Accent,
			size: 'wide' as const,
		},
	],
};

export const MARQUEE_DISCIPLINES = [
	'Brand identity',
	'Landing pages',
	'Ad creative',
	'Social content',
	'Email + funnel',
	'Pitch decks',
	'Motion',
	'Print collateral',
	'Design systems',
];

export const WORK = {
	eyebrow: '/ Selected Work',
	headline: 'Selected work.',
	description:
		'Brand systems, landing pages, and ad creative shipped for paid-media operators. Real case studies dropping in soon — placeholders for now.',
	pieces: [
		{ title: 'Brand identity', tag: 'Brand identity', accent: 'lilac' as Accent, aspect: 'tall' as const, placeholder: true },
		{ title: 'Landing page', tag: 'Landing page', accent: 'sky' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Ad creative', tag: 'Ad creative', accent: 'peach' as Accent, aspect: 'wide' as const, placeholder: true },
		{ title: 'Brand identity', tag: 'Brand identity', accent: 'mint' as Accent, aspect: 'wide' as const, placeholder: true },
		{ title: 'Pitch deck', tag: 'Pitch deck', accent: 'lime' as Accent, aspect: 'tall' as const, placeholder: true },
		{ title: 'Social system', tag: 'Social system', accent: 'blush' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Landing page', tag: 'Landing page', accent: 'sky' as Accent, aspect: 'wide' as const, placeholder: true },
		{ title: 'Brand identity', tag: 'Brand identity', accent: 'lilac' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Ad creative', tag: 'Ad creative', accent: 'peach' as Accent, aspect: 'tall' as const, placeholder: true },
	],
};

export const BLUEPRINT = {
	badgeLabel: '/ Process',
	title: 'Four steps, no surprises.',
	description:
		'A consistent rhythm across every engagement so you know exactly what happens, when, and what you walk away with.',
	steps: [
		{
			title: 'Discover',
			description: 'Audit your funnel, current creative, brand inputs. Frame the real job to be done.',
			icon: 'Target' as const,
			bg: 'bg-pastel-sky',
			border: 'border-pastel-sky-border',
			iconCircle: 'bg-pastel-sky-strong text-primary-foreground',
			numberAccent: 'text-pastel-sky-strong/40',
		},
		{
			title: 'Direction',
			description: 'Pitch a creative direction with mood, tone, references. One round of locked notes.',
			icon: 'Filter' as const,
			bg: 'bg-pastel-lilac',
			border: 'border-pastel-lilac-border',
			iconCircle: 'bg-pastel-lilac-strong text-primary-foreground',
			numberAccent: 'text-pastel-lilac-strong/40',
		},
		{
			title: 'Design',
			description: 'Production: assets, screens, decks, files — built in our system, delivered to yours.',
			icon: 'Activity' as const,
			bg: 'bg-pastel-mint',
			border: 'border-pastel-mint-border',
			iconCircle: 'bg-pastel-mint-strong text-primary-foreground',
			numberAccent: 'text-pastel-mint-strong/40',
		},
		{
			title: 'Deliver',
			description: 'Source files, brand guide, motion templates. Hand-off + ongoing creative slots if you want them.',
			icon: 'TrendingUp' as const,
			bg: 'bg-value-soft-yellow',
			border: 'border-pastel-peach-border',
			iconCircle: 'bg-pastel-peach-strong text-primary-foreground',
			numberAccent: 'text-pastel-peach-strong/40',
		},
	],
};

export const STORY_ONE = {
	kicker: 'Built for paid media',
	headline: 'Designed to convert, not just to look good.',
	description:
		'Conversion-aware design choices — typography, contrast, CTA hierarchy — exist because the page or ad has to do a job. We build creative around how it will be measured, not how it will be admired.',
	bullets: [
		{ title: 'Conversion-first hierarchy', description: 'Every layout decision answers to the funnel metric, not the aesthetic vibe.' },
		{ title: 'A/B-ready creative variants', description: 'Shipped in twos and threes so testing is in motion the day it launches.' },
		{ title: 'Ad-platform-ready source files', description: 'Cuts, ratios, and naming conventions built for Meta, Google, TikTok intake.' },
	],
	primaryCta: { label: 'See the framework', href: '/contact' },
	image: { src: '/images/ppc/ppc1.jpg', alt: 'Conversion-engineered creative system shipping into a paid-media funnel' },
};

export const STORY_TWO = {
	kicker: 'Systems that compound',
	headline: 'Design that compounds with your media spend.',
	description:
		'A system of components makes the 50th ad cost a fraction of the 1st. The longer we work together, the cheaper your next creative round gets, and the more you can test.',
	bullets: [
		{ title: 'Reusable component library', description: 'A kit your team can self-serve once it is built — no waiting on us for the small things.' },
		{ title: 'Brand kit your team owns', description: 'Tokens, type, motion, and voice handed off as both files and documentation.' },
		{ title: 'Faster iterations week over week', description: 'Throughput goes up while quality holds because the system is doing the heavy lifting.' },
	],
	primaryCta: { label: 'Build my design system', href: '/contact' },
	image: { src: '/images/ppc/ppc2.jpg', alt: 'A modular design system feeding consistent creative output across channels' },
};

export const PRINCIPLES = {
	eyebrow: '/ Principles',
	headline: 'How we think about the work.',
	description: 'A short manifesto, repeated on every brief.',
	principles: [
		{
			number: '01',
			title: 'Clarity over cleverness',
			description:
				'A clever execution that confuses the buyer loses to a clear one that doesn’t. We test for legibility before we test for delight.',
			accent: 'sky' as Accent,
		},
		{
			number: '02',
			title: 'Convert before delight',
			description:
				'Beauty is a multiplier on conversion, not a replacement for it. We earn the right to be expressive by hitting the metric first.',
			accent: 'lilac' as Accent,
		},
		{
			number: '03',
			title: 'Systems beat one-offs',
			description:
				'The 50th ad asset should cost a fraction of the first. Every project ends with a system, not a folder of finals.',
			accent: 'mint' as Accent,
		},
	],
};

export const ENGAGEMENT = {
	eyebrow: '/ How to start',
	headline: 'Two ways to work together.',
	description: 'Both come without retainers, without lock-ins, without surprise scope creep.',
	tiers: [
		{
			name: 'Project sprint',
			positioning: 'A fixed-scope creative engagement — usually 2 to 6 weeks.',
			inclusions: [
				'Direction round + locked notes',
				'Full production of agreed scope',
				'Source files + working files',
				'One round of revisions baked in',
			],
			bestFor: 'Teams launching a new campaign, brand refresh, or one high-value asset.',
			accent: 'sky' as Accent,
			cta: { label: 'Brief us on a sprint', href: '/contact' },
		},
		{
			name: 'Ongoing creative partner',
			positioning: 'A reserved creative team for monthly output across paid media.',
			inclusions: [
				'Weekly creative slots',
				'Brand system maintenance + evolution',
				'Performance creative testing rhythm',
				'Async + sync rituals with your growth team',
			],
			bestFor: 'Teams running paid media who need consistent creative throughput.',
			accent: 'lilac' as Accent,
			cta: { label: 'Talk to us about a partnership', href: '/contact' },
			featured: true,
		},
	],
};

export const TESTIMONIALS = [
	{
		quote:
			'Their landing page redesign lifted our paid conversion 2.4x in the first sprint. They get performance.',
		author: 'Avery Park',
		role: 'VP, Paid Acquisition',
		company: 'Northbeam Health',
		rating: 5,
		highlight: '+2.4x paid conversion',
	},
	{
		quote:
			'We finally have a brand system instead of a pile of finals. Our team can ship without us in the loop.',
		author: 'Jordan Wells',
		role: 'Marketing Director',
		company: 'Lattice Group',
		rating: 5,
		highlight: 'System, not finals',
	},
	{
		quote:
			'Their ad creative beats agencies twice our size. The work converts and the iteration speed is unreal.',
		author: 'Riley Chen',
		role: 'Head of Growth',
		company: 'Anvil Mortgage',
		rating: 5,
		highlight: 'Outperforms larger agencies',
	},
];

export const CROSS_LINK = {
	eyebrow: '/ Pair with',
	headline: 'Already running paid? Pair design with the engine.',
	description:
		'Design lifts your funnel only if the funnel is doing its job. Core Closer ships both — creative on one side, qualified call + lead flow on the other.',
	cta: { label: 'Explore Pay Per Call', href: '/services/pay-per-call' },
	accent: 'peach' as Accent,
};

export const FAQS: FaqItem[] = [
	{
		question: 'What does a graphics design engagement actually include?',
		answer:
			'Discovery, creative direction, production, and delivery — with source files, brand guidelines, and working documentation handed off at the end. Either as a fixed-scope project sprint or an ongoing reserved-slot partnership, depending on what fits your team’s rhythm.',
	},
	{
		question: 'Do you only work with Core Closer’s lead-gen clients?',
		answer:
			'No. Design is offered standalone. That said, most of our best work ships for teams already running paid media, because the design and the funnel improve each other — the brief is sharper and the measurement is faster.',
	},
	{
		question: 'How fast can you ship the first round of creative?',
		answer:
			'First direction round usually inside the first week. Production on a typical sprint lands inside 2–6 weeks depending on scope. Ongoing partners get a weekly creative cadence after the first system is in place.',
	},
	{
		question: 'Do you hand over source files and brand guidelines?',
		answer:
			'Yes — always. Every engagement ends with source files, a brand kit, and documentation your team can use without us in the loop. We never hold work hostage in our tools.',
	},
	{
		question: 'Can you support paid-media testing with creative variants?',
		answer:
			'Yes. Every ad we ship comes in twos or threes — hook variants, ratio variants, motion + static cuts — so testing is in motion the day creative lands. We also work directly with your media team on weekly iteration.',
	},
	{
		question: 'What if my brand already has a system — can you work within it?',
		answer:
			'Absolutely. We audit your existing tokens, kit, and guidelines, then extend or evolve them rather than starting over. Continuity beats novelty when your brand is already in market.',
	},
];

export const CONSULTATION = {
	title: 'Tell us about the work.',
	subtitle: 'A short conversation about scope, brand, and where the funnel is leaking creative. We will come back with a sharp recommendation.',
	tagline: 'No retainers. No long-term lock-ins. Just creative that earns its slot.',
	formTitle: 'Tell us about your needs',
	submitLabel: 'Start a Design Conversation',
	badge: { label: 'Creative Capacity', icon: 'Zap' },
	features: [
		{
			title: 'Sharp creative direction',
			description: 'A pitched direction with mood, tone, and references in week one.',
			icon: 'Zap' as const,
		},
		{
			title: 'Conversion-aware production',
			description: 'Every asset built with how it will be measured baked into the file.',
			icon: 'TrendingUp' as const,
		},
		{
			title: 'Source files + system handed off',
			description: 'You walk away owning everything — files, kit, docs, the lot.',
			icon: 'Check' as const,
		},
	],
};

export const STICKY = {
	title: 'Ready to make the creative carry its weight?',
	ctaText: 'Start a Design Project',
	href: '/contact',
};

export const graphicsDesignJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	serviceType: 'Graphic Design',
	provider: { '@type': 'Organization', name: 'Core Closer', url: 'https://corecloser.com' },
	areaServed: 'US',
	description:
		'Conversion-focused graphic design for paid-media operators: brand systems, landing pages, ad creative, social, email, and design systems built to make your funnel sell.',
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Graphics Design Services',
		itemListElement: CAPABILITIES.tiles.map((tile) => ({
			'@type': 'Offer',
			itemOffered: { '@type': 'Service', name: tile.title, description: tile.description },
		})),
	},
};
