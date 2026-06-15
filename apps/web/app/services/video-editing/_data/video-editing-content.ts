import type { FaqItem } from '@/types/services';

export type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

export const SECTION_PADDING = 'max-w-7xl mx-auto py-20 md:py-24';

export const HERO = {
	eyebrow: '/ Video Editing',
	lines: ['We cut', 'ads that earn', 'the next', 'impression.'],
	accent: { line: 2, word: 'next' },
	accentColour: 'peach' as Accent,
	subDeck:
		'Hook-first vertical cuts, UGC edits, and motion-graphic ads built to win the first three seconds — and the impression after that. Editing as a paid-media discipline, not a post-production hand-off.',
	primaryCta: { label: 'Brief us on a cut', href: '/contact' },
	secondaryCta: { label: 'See the reel', href: '#reel' },
	badges: [
		{ icon: 'sparkle' as const, label: 'Hook-first editors' },
		{ icon: 'diamond' as const, label: 'Built for paid teams' },
		{ icon: 'star' as const, label: 'Vertical-cut specialists' },
	],
	marqueeTokens: [
		'Hooks',
		'Cuts',
		'UGC',
		'Captions',
		'Vertical',
		'Motion',
		'Repurposing',
		'Testing',
	],
	haloAccents: ['peach', 'lilac'] as Accent[],
	stickerKind: 'video' as const,
	nowPlaying: {
		eyebrow: 'Now editing',
		title: 'Hook-first ad cut · v3',
		meta: '0:12 / 0:30 · vertical',
		accent: 'peach' as Accent,
	},
};

export const CAPABILITIES = {
	eyebrow: '/ Capabilities',
	headline: 'What we cut.',
	description:
		'Six disciplines, one editing operating system. Every cut is built with the hook test, the caption variant, and the platform-spec export already on the schedule.',
	tiles: [
		{
			title: 'Short-form ad cuts',
			description: 'Vertical 9:16 cuts for Meta, TikTok, Shorts. Built for the feed, not the festival.',
			bullets: ['Hook-first 3-second openers', 'Platform-spec exports', 'Caption + safe-zone aware'],
			icon: 'Scissors' as const,
			accent: 'peach' as Accent,
			size: 'lg' as const,
		},
		{
			title: 'UGC editing',
			description: 'Creator-led footage cut into ad-ready stories. Trust signals, b-roll, and proof.',
			bullets: ['Creator selects + pacing', 'Proof + screen-recording inserts', 'Variant pack per concept'],
			icon: 'Camera' as const,
			accent: 'sky' as Accent,
		},
		{
			title: 'Hook engineering',
			description: 'Five hook variants per concept. Test, kill, double down — same edit, different open.',
			bullets: ['Pattern-interrupt openers', 'Curiosity + claim hooks', 'Variant matrix per ad set'],
			icon: 'Sparkles' as const,
			accent: 'lilac' as Accent,
		},
		{
			title: 'Motion graphics & captions',
			description: 'Burned-in captions, lower thirds, kinetic typography, brand bumpers. Built to brand kit.',
			bullets: ['Burned-in caption styles', 'Kinetic typography', 'Brand-kit bumpers'],
			icon: 'Layout' as const,
			accent: 'mint' as Accent,
		},
		{
			title: 'Long-form repurposing',
			description: 'Webinars, demos, podcasts re-cut into 6–12 short-form assets per source hour.',
			bullets: ['Source-to-clip pipeline', '6–12 assets per hour', 'Cross-platform variants'],
			icon: 'Film' as const,
			accent: 'blush' as Accent,
		},
		{
			title: 'Sales-enablement cuts',
			description: 'Objection-handling clips and demo highlights your reps drop into deal threads.',
			bullets: ['Objection-handling cuts', 'Demo highlight reels', 'Library kept current'],
			icon: 'Briefcase' as const,
			accent: 'lime' as Accent,
			size: 'wide' as const,
		},
	],
};

export const MARQUEE_DISCIPLINES = [
	'Hooks',
	'Cuts',
	'UGC',
	'Captions',
	'Vertical',
	'Motion',
	'Repurposing',
	'Testing',
];

export const REEL = {
	eyebrow: '/ Selected Cuts',
	headline: 'Selected cuts.',
	description:
		'Vertical ad cuts, UGC edits, motion-graphic bumpers, and repurposed long-form for paid-media operators. Real reels dropping in soon — placeholders for now.',
	pieces: [
		{ title: 'Hook test · v3', tag: 'Hook test', accent: 'peach' as Accent, aspect: 'tall' as const, placeholder: true },
		{ title: 'UGC edit', tag: 'UGC edit', accent: 'sky' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Vertical ad', tag: 'Vertical ad', accent: 'lilac' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Motion bumper', tag: 'Motion bumper', accent: 'mint' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Repurpose cut', tag: 'Repurpose cut', accent: 'blush' as Accent, aspect: 'tall' as const, placeholder: true },
		{ title: 'Hook test · v7', tag: 'Hook test', accent: 'lime' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'UGC edit', tag: 'UGC edit', accent: 'peach' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Sales clip', tag: 'Sales clip', accent: 'sky' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Vertical ad', tag: 'Vertical ad', accent: 'lilac' as Accent, aspect: 'square' as const, placeholder: true },
	],
};

export const BLUEPRINT = {
	badgeLabel: '/ Process',
	title: 'Four phases, every cut.',
	description:
		'A consistent rhythm so a cut moves from brief to platform-ready test inside the same week — and reports in the same dashboard as every other media buy.',
	steps: [
		{
			title: 'Brief',
			description: 'Audience, angle, hook hypothesis, success metric. Locked before a single clip is dragged.',
			icon: 'Target' as const,
			bg: 'bg-pastel-peach',
			border: 'border-pastel-peach-border',
			iconCircle: 'bg-pastel-peach-strong text-primary-foreground',
			numberAccent: 'text-pastel-peach-strong/40',
		},
		{
			title: 'Edit',
			description: 'Hook-first cut, captions, motion, brand bumper. Variant pack out by end of week.',
			icon: 'Scissors' as const,
			bg: 'bg-pastel-sky',
			border: 'border-pastel-sky-border',
			iconCircle: 'bg-pastel-sky-strong text-primary-foreground',
			numberAccent: 'text-pastel-sky-strong/40',
		},
		{
			title: 'Test',
			description: 'Platform-spec exports, UTM tags, hook variant matrix shipped to your ad sets — not your inbox.',
			icon: 'Activity' as const,
			bg: 'bg-pastel-mint',
			border: 'border-pastel-mint-border',
			iconCircle: 'bg-pastel-mint-strong text-primary-foreground',
			numberAccent: 'text-pastel-mint-strong/40',
		},
		{
			title: 'Compound',
			description: 'Winners get sequel cuts, losers get killed, source footage feeds the next concept. The reel keeps paying.',
			icon: 'TrendingUp' as const,
			bg: 'bg-pastel-lilac',
			border: 'border-pastel-lilac-border',
			iconCircle: 'bg-pastel-lilac-strong text-primary-foreground',
			numberAccent: 'text-pastel-lilac-strong/40',
		},
	],
};

export const STORY_ONE = {
	kicker: 'Built as a paid-media discipline',
	headline: 'Edited like a media buy, not a portfolio piece.',
	description:
		'Most agency cuts are graded for the reel. We grade for the ad set. Hook hypothesis, variant matrix, CPM lift, watch-through — same dashboard as every other channel you run.',
	bullets: [
		{
			title: 'Hook-first cuts',
			description: 'Three-second openers engineered to beat platform skip behaviour. The rest of the cut earns the next impression.',
		},
		{
			title: 'Variant matrix per concept',
			description: 'Five hooks, same body, same payoff. Test, kill, double down — the editor is part of the media plan.',
		},
		{
			title: 'Measured like every other media buy',
			description: 'CPM lift, hold rate, CTR, CAC. The reel reports the way your paid social does.',
		},
	],
	primaryCta: { label: 'See the framework', href: '/contact' },
	image: { src: '/images/ppc/ppc1.png', alt: 'Hook-first vertical ad cuts feeding a paid-media test matrix' },
};

export const STORY_TWO = {
	kicker: 'One source. A dozen cuts.',
	headline: 'One source hour. A dozen ad-ready cuts.',
	description:
		'A single webinar, demo, or podcast episode produces 6–12 short-form cuts, screen-recording inserts, captioned vertical ads, and sales-enablement clips. Each one feeds a different channel.',
	bullets: [
		{
			title: 'Vertical cuts for paid social',
			description: '9:16 exports, burned-in captions, platform-spec safe zones. UTM-tracked into your ad-set reporting.',
		},
		{
			title: 'Sales-enablement library',
			description: 'Objection-handling clips and demo highlights your reps drop into deal threads mid-cycle.',
		},
		{
			title: 'Audiograms + repurposed assets',
			description: 'Every long-form source becomes a dozen discoverable, testable assets — not a single hero edit.',
		},
	],
	primaryCta: { label: 'Build my cut engine', href: '/contact' },
	image: { src: '/images/ppc/ppc2.png', alt: 'A single source asset compounding into a dozen ad-ready cuts' },
};

export const PRINCIPLES = {
	eyebrow: '/ Principles',
	headline: 'How we think about a cut.',
	description: 'A short manifesto, repeated on every brief.',
	principles: [
		{
			number: '01',
			title: 'Hooks beat pretty',
			description:
				'A perfect grade with a weak opener gets skipped. An honest cut with a sharp hook gets the next impression — and the one after.',
			accent: 'peach' as Accent,
		},
		{
			number: '02',
			title: 'Cuts beat coverage',
			description:
				'You do not need more footage. You need more cuts of the footage you already paid for. The variant matrix is the channel.',
			accent: 'sky' as Accent,
		},
		{
			number: '03',
			title: 'Pipeline beats views',
			description:
				'Views are vanity. CPM lift, hold rate, CTR, influenced pipeline — the cut should report the way every other media buy does.',
			accent: 'lilac' as Accent,
		},
	],
};

export const ENGAGEMENT = {
	eyebrow: '/ How to start',
	headline: 'Two ways to ship cuts.',
	description: 'Both come without retainers, without lock-ins, without surprise scope creep.',
	tiers: [
		{
			name: 'Creative sprint',
			positioning: 'A 4–6 week sprint — concept, hook matrix, first 12 cuts shipped to your ad sets.',
			inclusions: [
				'Concept + hook matrix lock',
				'Brand-kit bumper system',
				'First 12 cuts produced',
				'Platform-spec exports + UTM tags',
				'Variant pack per concept',
			],
			bestFor: 'Teams launching a new paid-social motion or refreshing a stale creative library.',
			accent: 'sky' as Accent,
			cta: { label: 'Brief us on a sprint', href: '/contact' },
		},
		{
			name: 'Ongoing edit partner',
			positioning: 'A reserved editing team for monthly cut output — feeds your ad sets every week.',
			inclusions: [
				'Weekly cut output cadence',
				'Hook variant matrix per concept',
				'UGC + long-form repurposing',
				'Sales-enablement library',
				'Reporting in your dashboard',
			],
			bestFor: 'Teams running paid social as a quarter-over-quarter channel that needs fresh cuts on cadence.',
			accent: 'lilac' as Accent,
			cta: { label: 'Talk to us about a partnership', href: '/contact' },
			featured: true,
		},
	],
};

export const TESTIMONIALS = [
	{
		quote:
			'They cut 22 hook variants from a single creator shoot. Three of them are still scaling six months later.',
		author: 'Maya Holt',
		role: 'VP, Demand Gen',
		company: 'Stride Capital',
		rating: 5,
		highlight: '22 hooks, 3 still scaling',
	},
	{
		quote:
			'CPM dropped 28% the week the new cuts went live. The editor is part of our media plan now, not the post-production queue.',
		author: 'Devon Aoki',
		role: 'Head of Growth',
		company: 'Slate B2B',
		rating: 5,
		highlight: 'CPM down 28%',
	},
	{
		quote:
			'We finally have cuts that report in the same dashboard as every other channel we run. The creative review meeting got 30 minutes shorter.',
		author: 'Priya Shankar',
		role: 'CMO',
		company: 'Cardinal Health Platform',
		rating: 5,
		highlight: 'Reports like a media channel',
	},
];

export const CROSS_LINK = {
	eyebrow: '/ Pair with',
	headline: 'Need the show that feeds the clip engine?',
	description:
		'The podcast team produces the source footage the editing team cuts ad-ready every week. Pair them and the show, the clips, and the ad sets become one operation.',
	cta: { label: 'Explore Podcast Marketing', href: '/services/podcast-marketing' },
	accent: 'peach' as Accent,
};

export const FAQS: FaqItem[] = [
	{
		question: 'What does a video editing engagement actually include?',
		answer:
			'Concept, hook matrix, cut production, platform-spec exports, and the variant pack that lets your media buyer test, kill, and double down. Either as a 4–6 week creative sprint or an ongoing reserved-slot partnership.',
	},
	{
		question: 'Do you shoot footage or only edit?',
		answer:
			'Editing-first. We work from your existing footage, UGC creator deliverables, webinars, demos, podcasts, or stock. If a concept needs new footage, we scope a creator shoot or refer in a trusted production partner — never bundled fees.',
	},
	{
		question: 'How fast is your turnaround?',
		answer:
			'Most variant packs ship inside 5 working days from brief lock. Ongoing partners get a weekly cadence — fresh cuts in your ad-set queue every Monday, no exceptions.',
	},
	{
		question: 'Who owns the cuts — us or you?',
		answer:
			'You. Always. The cuts, the project files, the source organisation, the brand-kit assets — all yours from day one. We are operators, not licensors.',
	},
	{
		question: 'Do you test the cuts in paid media too?',
		answer:
			'We hand cuts off platform-ready — UTM tags, naming convention, hook matrix mapped to ad-set structure. If you want us running the buy too, pair with our Paid Media team. If you have a media buyer, we slot in.',
	},
	{
		question: 'How do you measure video ROI?',
		answer:
			'The way you measure every other media buy: CPM lift, hold rate, CTR, CPA, influenced pipeline. Hook-variant reporting feeds your existing ad-set dashboard — not a separate creative dashboard.',
	},
];

export const CONSULTATION = {
	title: 'Tell us about the cut.',
	subtitle:
		'A 30-minute strategy call. We will pitch a hook matrix, a variant plan, and a cadence — sharp enough to take to your media buyer on Monday.',
	tagline: 'No retainers. No long-term lock-ins. Just cuts that earn their slot in your ad-set queue.',
	formTitle: 'Tell us about your needs',
	submitLabel: 'Book a Cut Strategy Call',
	badge: { label: 'Editing Capacity', icon: 'Zap' },
	features: [
		{
			title: 'Hook-first editors',
			description: 'Three-second openers engineered to beat platform skip behaviour.',
			icon: 'Zap' as const,
		},
		{
			title: 'Variant matrix per concept',
			description: 'Five hooks, same body — built for the test, not the portfolio.',
			icon: 'TrendingUp' as const,
		},
		{
			title: 'Measured like a media channel',
			description: 'CPM, hold rate, CTR, CAC — same dashboard as your other buys.',
			icon: 'Check' as const,
		},
	],
};

export const STICKY = {
	title: 'Ready to put fresh cuts in your ad-set queue?',
	ctaText: 'Brief a Cut',
	href: '/contact',
};

export const videoEditingJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	serviceType: 'Video Editing',
	provider: { '@type': 'Organization', name: 'Core Closer', url: 'https://corecloser.com' },
	areaServed: 'US',
	description:
		'Hook-first vertical ad cuts, UGC editing, motion graphics, and long-form repurposing for paid-media operators.',
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Video Editing Services',
		itemListElement: CAPABILITIES.tiles.map((tile) => ({
			'@type': 'Offer',
			itemOffered: { '@type': 'Service', name: tile.title, description: tile.description },
		})),
	},
};
