export interface TeamMember {
	name: string;
	role: string;
	department: string;
	bio: string;
	linkedinHref: string;
	accent: 'mint' | 'lilac' | 'sky' | 'peach';
}

export interface TeamDepartment {
	name: string;
	description: string;
	href: string;
	accent: 'mint' | 'lilac' | 'sky' | 'peach' | 'lime';
	points: string[];
}

export interface TeamValue {
	title: string;
	description: string;
	icon: 'Target' | 'BarChart3' | 'ShieldCheck' | 'Zap';
	accent: 'mint' | 'lilac' | 'sky' | 'peach';
}

export const TEAM_TRUST_PILLS = ['US + Philippines operations', '200+ client teams supported', 'ISO 27001 · SOC 2 · GDPR'];

export const TEAM_MEMBERS: TeamMember[] = [
	{
		name: 'Maya Bennett',
		role: 'Founder & CEO',
		department: 'Executive Leadership',
		bio: 'Maya leads growth strategy across the platform and keeps every service line aligned to revenue outcomes, not vanity metrics.',
		linkedinHref: '#',
		accent: 'mint',
	},
	{
		name: 'Adrian Cole',
		role: 'Head of Growth',
		department: 'Acquisition',
		bio: 'Adrian connects pay-per-call, pay-per-lead, SEO, and paid media into a single planning model built around qualified volume.',
		linkedinHref: '#',
		accent: 'lilac',
	},
	{
		name: 'Nina Santiago',
		role: 'VP of Call Operations',
		department: 'Call Operations',
		bio: 'Nina owns launch readiness, scripting, QA, and agent performance so handoffs feel consistent from the first call.',
		linkedinHref: '#',
		accent: 'sky',
	},
	{
		name: 'Julian Park',
		role: 'Chief Technology Officer',
		department: 'Engineering',
		bio: 'Julian leads the systems side of delivery, from lead routing and CRM workflows to conversion-focused product and web builds.',
		linkedinHref: '#',
		accent: 'peach',
	},
	{
		name: 'Tara Morgan',
		role: 'Head of Compliance',
		department: 'Compliance',
		bio: 'Tara translates TCPA, HIPAA, PCI, SOC 2, and privacy requirements into practical controls across campaigns and operations.',
		linkedinHref: '#',
		accent: 'mint',
	},
	{
		name: 'Owen Price',
		role: 'Director of Client Success',
		department: 'Account Strategy',
		bio: 'Owen works with client teams on pacing, reporting, and roadmap decisions so scale stays measurable and operationally realistic.',
		linkedinHref: '#',
		accent: 'lilac',
	},
];

export const TEAM_DEPARTMENTS: TeamDepartment[] = [
	{
		name: 'Acquisition',
		description: 'Performance marketers managing channel mix, media efficiency, and intent quality across inbound programs.',
		href: '/services/pay-per-call',
		accent: 'mint',
		points: ['Pay Per Call strategy', 'Paid media + SEO alignment', 'Volume pacing by ROI targets'],
	},
	{
		name: 'Call Operations',
		description: 'Managed teams focused on response speed, script adherence, QA, and after-hours coverage.',
		href: '/hire-call-center',
		accent: 'peach',
		points: ['Inbound + outbound workflows', '24/7/365 coverage planning', 'Agent coaching and scorecards'],
	},
	{
		name: 'Lead Operations',
		description: 'Specialists controlling qualification logic, routing, and delivery reliability for lead-based programs.',
		href: '/services/pay-per-lead/real-time',
		accent: 'sky',
		points: ['Real-time delivery logic', 'Field-level validation', 'CRM and webhook coordination'],
	},
	{
		name: 'Engineering',
		description: 'Builders supporting web, app, tracking, and integration work needed to turn traffic into attributable pipeline.',
		href: '/services/web-dev/full-stack',
		accent: 'lilac',
		points: ['Landing pages and CRO', 'Routing and reporting systems', 'Internal tools and integration support'],
	},
	{
		name: 'Account Strategy',
		description: 'Operators translating goals into launch plans, reporting cadences, and ongoing optimization priorities.',
		href: '/services/digital-marketing',
		accent: 'lime',
		points: ['Weekly performance review', 'Cross-channel planning', 'Client-side coordination'],
	},
];

export const TEAM_VALUES: TeamValue[] = [
	{
		title: 'Outcome-first',
		description: 'We anchor strategy to qualified revenue signals, not disconnected activity metrics.',
		icon: 'Target',
		accent: 'mint',
	},
	{
		title: 'Transparent reporting',
		description: 'Client teams get clear visibility into what is working, what is slipping, and what changes next.',
		icon: 'BarChart3',
		accent: 'sky',
	},
	{
		title: 'Compliance by design',
		description: 'Operational controls are built into scripts, routing, delivery logic, and implementation choices.',
		icon: 'ShieldCheck',
		accent: 'lilac',
	},
	{
		title: 'Speed with quality',
		description: 'We move fast on launches and optimizations without leaving QA, documentation, or handoff quality behind.',
		icon: 'Zap',
		accent: 'peach',
	},
];
