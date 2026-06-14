import type { FaqItem } from '@/types/services';

export type Accent = 'mint' | 'sky' | 'lilac' | 'peach' | 'blush' | 'lime';

export const SECTION_PADDING = 'max-w-7xl mx-auto py-20 md:py-24';

export const HERO = {
	eyebrow: '/ Podcast Marketing',
	lines: ['We build', 'shows that feed', 'your paid', 'funnel.'],
	accent: { line: 3, word: 'funnel.' },
	accentColour: 'peach' as Accent,
	subDeck:
		'Outreach podcasts, branded shows, clip engines — every episode designed to put pipeline on the line, not just downloads on a dashboard.',
	primaryCta: { label: 'Start a show that sells', href: '/contact' },
	secondaryCta: { label: 'Hear our work', href: '#shows' },
	badges: [
		{ icon: 'sparkle' as const, label: 'Production + Growth covered' },
		{ icon: 'diamond' as const, label: 'Built for paid teams' },
		{ icon: 'star' as const, label: 'Outreach show specialists' },
	],
	marqueeTokens: [
		'Outreach',
		'Branded',
		'Clips',
		'Distribution',
		'Sponsorships',
		'Sales enablement',
		'Repurposing',
		'Strategy',
	],
	haloAccents: ['peach', 'sky'] as Accent[],
	stickerKind: 'audio' as const,
	nowPlaying: {
		eyebrow: 'Now playing',
		title: 'Podcast as an acquisition channel',
		meta: 'Ep. 01 · 12 min listen',
		accent: 'peach' as Accent,
	},
};

export const COVER_MARQUEE = {
	eyebrow: '/ Currently producing & coming soon',
	rows: [
		[
			{ tag: 'Outreach show', accent: 'peach' as Accent },
			{ tag: 'Branded show', accent: 'sky' as Accent },
			{ tag: 'Founder show', accent: 'lilac' as Accent },
			{ tag: 'Outreach show', accent: 'mint' as Accent },
			{ tag: 'Internal comms', accent: 'blush' as Accent },
			{ tag: 'Branded show', accent: 'lime' as Accent },
		],
		[
			{ tag: 'Video-first', accent: 'lilac' as Accent },
			{ tag: 'Outreach show', accent: 'peach' as Accent },
			{ tag: 'Branded show', accent: 'sky' as Accent },
			{ tag: 'Founder show', accent: 'mint' as Accent },
			{ tag: 'Outreach show', accent: 'blush' as Accent },
			{ tag: 'Branded show', accent: 'peach' as Accent },
		],
	],
};

export const CAPABILITIES = {
	eyebrow: '/ Capabilities',
	headline: 'What we run.',
	description:
		'Six disciplines, one operating system. Every episode is built with the clip, the sponsorship, and the sales-enablement cut already on the production schedule.',
	tiles: [
		{
			title: 'Strategy & format',
			description: 'Outreach vs branded vs founder show. Format, cadence, target listener, success metric.',
			bullets: ['Format pick + audience map', 'Cadence + episode arc', 'Success metric locked'],
			icon: 'Mic' as const,
			accent: 'peach' as Accent,
			size: 'lg' as const,
		},
		{
			title: 'Production',
			description: 'Recording, editing, mastering, show notes, episode QC.',
			bullets: ['Recording rituals', 'Editing + mastering', 'Show notes + QC'],
			icon: 'AudioLines' as const,
			accent: 'sky' as Accent,
		},
		{
			title: 'Distribution',
			description: 'Apple, Spotify, YouTube. RSS, video-first cuts, syndication.',
			bullets: ['RSS + show page', 'Video-first cuts', 'Syndication network'],
			icon: 'Radio' as const,
			accent: 'mint' as Accent,
		},
		{
			title: 'Clips for paid social',
			description: '3–8 vertical clips per episode, 15–90s, ad-ready for Meta + TikTok + LinkedIn.',
			bullets: ['Hook-led short cuts', 'Ad-platform-ready files', 'UTM-tracked to pipeline'],
			icon: 'Scissors' as const,
			accent: 'lilac' as Accent,
		},
		{
			title: 'Host-read sponsorships',
			description: 'Sponsor packages, host-read scripts, mid-roll placements.',
			bullets: ['Sponsor package design', 'Host-read scripting', 'Mid-roll integration'],
			icon: 'Megaphone' as const,
			accent: 'blush' as Accent,
		},
		{
			title: 'Sales-enablement repurposing',
			description: 'Episodes become objection-handling clips for your reps mid-cycle.',
			bullets: ['Objection-handling cuts', 'Drop-in deal-thread clips', 'Internal library kept current'],
			icon: 'Briefcase' as const,
			accent: 'lime' as Accent,
			size: 'wide' as const,
		},
	],
};

export const MARQUEE_DISCIPLINES = [
	'Strategy',
	'Production',
	'Clips',
	'Distribution',
	'Paid',
	'Pipeline',
	'Outreach',
	'Sponsorships',
];

export const SHOWS = {
	eyebrow: '/ Selected Shows',
	headline: 'Selected shows.',
	description:
		'Outreach shows, branded shows, founder shows shipping for paid-media operators. Real shows dropping in soon — placeholders for now.',
	pieces: [
		{ title: 'Outreach show', tag: 'Outreach show', accent: 'peach' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Branded show', tag: 'Branded show', accent: 'sky' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Founder show', tag: 'Founder show', accent: 'lilac' as Accent, aspect: 'tall' as const, placeholder: true },
		{ title: 'Outreach show', tag: 'Outreach show', accent: 'mint' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Internal comms', tag: 'Internal comms', accent: 'blush' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Video-first', tag: 'Video-first', accent: 'lime' as Accent, aspect: 'tall' as const, placeholder: true },
		{ title: 'Outreach show', tag: 'Outreach show', accent: 'peach' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Branded show', tag: 'Branded show', accent: 'sky' as Accent, aspect: 'square' as const, placeholder: true },
		{ title: 'Founder show', tag: 'Founder show', accent: 'lilac' as Accent, aspect: 'square' as const, placeholder: true },
	],
};

export const BLUEPRINT = {
	badgeLabel: '/ Process',
	title: 'Four phases, every show.',
	description:
		'A consistent rhythm so the show is reporting in the same dashboard as your other media buys by the end of week six.',
	steps: [
		{
			title: 'Strategy',
			description: 'Audit your funnel, pick the format, define the success metric before the first recording.',
			icon: 'Target' as const,
			bg: 'bg-pastel-peach',
			border: 'border-pastel-peach-border',
			iconCircle: 'bg-pastel-peach-strong text-primary-foreground',
			numberAccent: 'text-pastel-peach-strong/40',
		},
		{
			title: 'Production',
			description: 'Recording rituals, guest booking, editing, mastering, episode QC. Weekly cadence locked from week one.',
			icon: 'Filter' as const,
			bg: 'bg-pastel-sky',
			border: 'border-pastel-sky-border',
			iconCircle: 'bg-pastel-sky-strong text-primary-foreground',
			numberAccent: 'text-pastel-sky-strong/40',
		},
		{
			title: 'Distribution',
			description: 'RSS, Apple, Spotify, YouTube. Show page. Episode pages with chapters, transcripts, embeds.',
			icon: 'Activity' as const,
			bg: 'bg-pastel-mint',
			border: 'border-pastel-mint-border',
			iconCircle: 'bg-pastel-mint-strong text-primary-foreground',
			numberAccent: 'text-pastel-mint-strong/40',
		},
		{
			title: 'Compound',
			description: 'Clips for paid social, host-read sponsorships, sales-enablement library. The episode becomes twelve other things.',
			icon: 'TrendingUp' as const,
			bg: 'bg-pastel-lilac',
			border: 'border-pastel-lilac-border',
			iconCircle: 'bg-pastel-lilac-strong text-primary-foreground',
			numberAccent: 'text-pastel-lilac-strong/40',
		},
	],
};

export const STORY_ONE = {
	kicker: 'Built as an acquisition channel',
	headline: 'Designed as a media buy, not a hobby.',
	description:
		'Most B2B podcasts produce zero attributable pipeline. The 20% that do treat the show like any acquisition channel — CAC, deal value, influenced pipeline, closed-won.',
	bullets: [
		{
			title: 'Outreach model — guests are pipeline',
			description: 'Ideal prospects come on the show. The relationship starts on-mic. Conversion happens off-mic.',
		},
		{
			title: 'Branded model — compounding SEO + clips',
			description: 'Every episode is a content asset that pays back across organic + paid for months.',
		},
		{
			title: 'Measured like paid media',
			description: 'CAC, influenced pipeline, closed-won — the show reports the way your media buys do.',
		},
	],
	primaryCta: { label: 'See the framework', href: '/contact' },
	image: { src: '/images/ppc/ppc1.jpg', alt: 'A podcast strategy framework feeding a paid-acquisition funnel' },
};

export const STORY_TWO = {
	kicker: 'Clips that compound',
	headline: 'One episode. Twelve creative assets.',
	description:
		'A single episode produces 3–8 vertical clips, social cards, sales-enablement cuts, host-read sponsorship reads, and SEO content. Each one feeds a different channel.',
	bullets: [
		{
			title: 'Vertical clips for paid social',
			description: '15–90s cuts shipped Meta-, TikTok-, LinkedIn-ready. UTM-tracked into your pipeline.',
		},
		{
			title: 'Sales-enablement library',
			description: 'Objection-handling clips your reps drop into deal threads mid-cycle.',
		},
		{
			title: 'Audiograms + show pages + transcripts',
			description: 'Every cut is a discoverable asset. Every episode is more than “just an episode”.',
		},
	],
	primaryCta: { label: 'Build my clip engine', href: '/contact' },
	image: { src: '/images/ppc/ppc2.jpg', alt: 'Clips, audiograms, and assets compounding from a single episode' },
};

export const PRINCIPLES = {
	eyebrow: '/ Principles',
	headline: 'How we think about a show.',
	description: 'A short manifesto, repeated on every brief.',
	principles: [
		{
			number: '01',
			title: 'Outreach beats broadcast',
			description:
				'Guests are pipeline. A 45-minute conversation with the right buyer outperforms 45 minutes of one-sided downloads.',
			accent: 'peach' as Accent,
		},
		{
			number: '02',
			title: 'Clips beat episodes',
			description:
				'Most listeners discover a show through a 30-second clip on social, not the player. We produce for the clip, not the platform.',
			accent: 'sky' as Accent,
		},
		{
			number: '03',
			title: 'Pipeline beats downloads',
			description:
				'Downloads are vanity. Influenced pipeline, deal value, closed-won — your podcast should report the same way every other channel does.',
			accent: 'lilac' as Accent,
		},
	],
};

export const ENGAGEMENT = {
	eyebrow: '/ How to start',
	headline: 'Two ways to ship a show.',
	description: 'Both come without retainers, without lock-ins, without surprise scope creep.',
	tiers: [
		{
			name: 'Launch sprint',
			positioning: 'A 6–8 week launch — concept, format, first six episodes, distribution stack.',
			inclusions: [
				'Strategy + format lock',
				'Brand kit + cover art',
				'First 6 episodes produced',
				'Distribution + show page live',
				'Clip engine wired',
			],
			bestFor: 'Teams launching a new show or relaunching a stale one.',
			accent: 'sky' as Accent,
			cta: { label: 'Brief us on a launch', href: '/contact' },
		},
		{
			name: 'Ongoing show partner',
			positioning: 'A reserved production + growth team for monthly output.',
			inclusions: [
				'Weekly episode production',
				'Guest booking + outreach',
				'3–8 clips per episode',
				'Sales-enablement library',
				'Sponsorship integration',
			],
			bestFor: 'Teams running a show as an acquisition channel quarter over quarter.',
			accent: 'lilac' as Accent,
			cta: { label: 'Talk to us about a partnership', href: '/contact' },
			featured: true,
		},
	],
};

export const TESTIMONIALS = [
	{
		quote:
			'Their outreach show put 14 of our top accounts on the mic. Three of them closed inside the quarter.',
		author: 'Maya Holt',
		role: 'VP, Demand Gen',
		company: 'Stride Capital',
		rating: 5,
		highlight: '14 target accounts on the mic',
	},
	{
		quote:
			'The clip engine is doing more for our paid social CPM than our last agency did. The show pays for itself in clip performance alone.',
		author: 'Devon Aoki',
		role: 'Head of Growth',
		company: 'Slate B2B',
		rating: 5,
		highlight: 'Clips beating paid agency',
	},
	{
		quote:
			'We finally have a show that reports in the same dashboard as every other channel we run. The CMO conversation got easier overnight.',
		author: 'Priya Shankar',
		role: 'CMO',
		company: 'Cardinal Health Platform',
		rating: 5,
		highlight: 'Reports like a media channel',
	},
];

export const CROSS_LINK = {
	eyebrow: '/ Pair with',
	headline: 'Need the brand kit, clip templates, and ad creative too?',
	description:
		'The design team builds the brand kit, cover art, and clip templates the podcast team ships every episode on. Pair them and the show becomes one operation.',
	cta: { label: 'Explore Graphics Design', href: '/services/graphics-design' },
	accent: 'lilac' as Accent,
};

export const FAQS: FaqItem[] = [
	{
		question: 'What does a podcast marketing engagement actually include?',
		answer:
			'Strategy, production, distribution, and the clip engine that turns each episode into a dozen creative assets. Either as a 6–8 week launch sprint or an ongoing reserved-slot partnership.',
	},
	{
		question: 'Do you handle the whole show or just the growth side?',
		answer:
			'Both. Full launch + production + distribution + growth on the launch sprint. Ongoing partners get production, guest booking, clip output, sales-enablement repurposing, and sponsorship integration as one operation.',
	},
	{
		question: 'How long until a podcast actually drives pipeline?',
		answer:
			'For an outreach show, the first deal influences typically land inside the first 6–12 episodes — because guests are pipeline. Branded shows take 3–6 months for SEO + clip compounding to start showing in the dashboard.',
	},
	{
		question: 'Who owns the show — us or you?',
		answer:
			'You. Always. The show, the brand, the RSS feed, the cover art, the source files, the transcripts — all yours from day one. We are operators, not licensors.',
	},
	{
		question: 'Do you handle guest booking and outreach?',
		answer:
			'Yes. On ongoing partnerships we run guest booking — sourcing, outreach, scheduling, prep docs, and post-show relationship handoff to your sales team. The outreach show only works when the right people are on it.',
	},
	{
		question: 'How do you measure podcast ROI?',
		answer:
			'The way you measure every other media buy: CAC, influenced pipeline, deal value, closed-won. UTM-tracked clips, host-read attribution, and guest-to-pipeline mapping feed your existing reporting stack — not a separate podcast dashboard.',
	},
];

export const CONSULTATION = {
	title: 'Tell us about the show.',
	subtitle: 'A 30-minute strategy call. We will pitch a format, a success metric, and a 6-month plan — sharp enough to take to your CMO.',
	tagline: 'No retainers. No long-term lock-ins. Just a show that earns its slot in your media plan.',
	formTitle: 'Tell us about your needs',
	submitLabel: 'Book a Show Strategy Call',
	badge: { label: 'Production Capacity', icon: 'Zap' },
	features: [
		{
			title: 'Outreach-show specialists',
			description: 'Guests are pipeline. We have run the playbook 100+ times.',
			icon: 'Zap' as const,
		},
		{
			title: 'Clip engine wired to paid',
			description: '3–8 vertical clips per episode, UTM-tagged, ad-platform-ready.',
			icon: 'TrendingUp' as const,
		},
		{
			title: 'Measured like a media channel',
			description: 'CAC, influenced pipeline, closed-won — same dashboard as your other buys.',
			icon: 'Check' as const,
		},
	],
};

export const STICKY = {
	title: 'Ready to put your show on the pipeline dashboard?',
	ctaText: 'Start a Show',
	href: '/contact',
};

export const podcastMarketingJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	serviceType: 'Podcast Marketing',
	provider: { '@type': 'Organization', name: 'Core Closer', url: 'https://corecloser.com' },
	areaServed: 'US',
	description:
		'Outreach podcasts, branded shows, clip engines, and sales-enablement repurposing for paid-media operators.',
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name: 'Podcast Marketing Services',
		itemListElement: CAPABILITIES.tiles.map((tile) => ({
			'@type': 'Offer',
			itemOffered: { '@type': 'Service', name: tile.title, description: tile.description },
		})),
	},
};
