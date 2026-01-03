export interface Testimonial {
	name: string;
	role: string;
	company: string;
	image?: string;
	quote: string;
	highlight?: string;
}

export const testimonials: Testimonial[] = [
	{
		name: 'Jennifer Martinez',
		role: 'VP of Customer Success',
		company: 'TechFlow Solutions',
		image: 'https://randomuser.me/api/portraits/women/45.jpg',
		quote:
			'After struggling with in-house staffing for years, switching to their call center services was transformative.',
		highlight:
			'Our customer satisfaction scores increased by 34% within the first quarter.',
	},
	{
		name: 'Robert Chen',
		role: 'Director of Sales',
		company: 'Meridian Insurance Group',
		image: 'https://randomuser.me/api/portraits/men/32.jpg',
		quote:
			'The appointment setting team consistently delivers qualified prospects who are ready to talk. Our sales team can focus on closing instead of prospecting.',
		highlight: 'We book 40+ qualified appointments per week now.',
	},
	{
		name: 'Sarah Thompson',
		role: 'COO',
		company: 'HomeServe Pro',
		image: 'https://randomuser.me/api/portraits/women/68.jpg',
		quote:
			'The 24/7 support coverage has been a game-changer for our emergency service business. No more missed calls, no more lost customers.',
		highlight: 'Lead capture improved by 60% after implementing after-hours support.',
	},
	{
		name: 'Michael Davis',
		role: 'CEO',
		company: 'Legal Associates LLC',
		image: 'https://randomuser.me/api/portraits/men/52.jpg',
		quote:
			'Their team handles our intake calls with the professionalism our clients expect. The HIPAA compliance was critical for our practice.',
		highlight: 'New client intake efficiency doubled.',
	},
	{
		name: 'Amanda Foster',
		role: 'Marketing Director',
		company: 'SolarTech Installations',
		image: 'https://randomuser.me/api/portraits/women/33.jpg',
		quote:
			'The lead qualification process saves our sales team hours every day. We only talk to homeowners who are genuinely interested and qualified.',
		highlight: 'Cost per qualified lead dropped by 45%.',
	},
	{
		name: 'David Wilson',
		role: 'Operations Manager',
		company: 'AutoCare Centers',
		image: 'https://randomuser.me/api/portraits/men/41.jpg',
		quote:
			'Handling overflow during peak hours used to be our biggest challenge. Now we never miss a service appointment request.',
		highlight: 'Zero abandoned calls during busy periods.',
	},
];
