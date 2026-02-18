"use client";
import { TestimonialsColumn } from "@/components/blocks/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
	{
		text: "Pay-per-call volume is steady and the intent is strong. Reporting is clean, and tweaks get implemented fast.",
		image: "https://randomuser.me/api/portraits/men/1.jpg",
		name: "Ethan Brooks",
		role: "Growth Manager, NorthPeak Media Co.",
	},
	{
		text: "The pay-per-lead feed is consistent and easy to work. We saw fewer junk leads and better appointment rates.",
		image: "https://randomuser.me/api/portraits/women/2.jpg",
		name: "Jasmine Patel",
		role: "Operations Director, Riverstone Home Solutions",
	},
	{
		text: "Live transfers are better qualified than our previous source. We scaled gradually and quality stayed stable.",
		image: "https://randomuser.me/api/portraits/men/3.jpg",
		name: "Marcus Hill",
		role: "VP of Sales, BrightLine Connect",
	},
	{
		text: "They rebuilt our landing pages and improved conversions. Calls and leads both got cleaner after week two.",
		image: "https://randomuser.me/api/portraits/women/4.jpg",
		name: "Olivia Chen",
		role: "Marketing Lead, Cedar & Co. Roofing",
	},
	{
		text: "We needed one partner for marketing + development, and they delivered. The funnel is smoother and performance is measurable.",
		image: "https://randomuser.me/api/portraits/men/5.jpg",
		name: "Daniel Reyes",
		role: "Founder, BlueHaven Digital Studio",
	},
	{
		text: "Inbound calls feel customer-ready, not cold. Their QA feedback loop helped reduce wasted transfers.",
		image: "https://randomuser.me/api/portraits/women/6.jpg",
		name: "Alyssa Morgan",
		role: "Client Success Manager, SummitCare Advisors",
	},
	{
		text: "Digital campaigns are structured well and optimized consistently. Lead delivery is real-time and tracking is reliable.",
		image: "https://randomuser.me/api/portraits/men/7.jpg",
		name: "Noah Kim",
		role: "Performance Marketer, Evergreen Demand Lab",
	},
	{
		text: "Pay-per-lead quality improved after they tightened filters. Our team spends less time chasing bad info.",
		image: "https://randomuser.me/api/portraits/women/8.jpg",
		name: "Sophia Grant",
		role: "Business Development Director, Pioneer Health Partners",
	},
	{
		text: "The calls are high intent and the pipeline is more predictable. Weekly reporting is straightforward.",
		image: "https://randomuser.me/api/portraits/men/9.jpg",
		name: "Caleb Turner",
		role: "Managing Partner, Lakeside Legal Group",
	},
	{
		text: "SEO started producing better inbound traffic within weeks. Combined with paid ads, we're seeing steady growth.",
		image: "https://randomuser.me/api/portraits/women/10.jpg",
		name: "Mia Alvarez",
		role: "Digital Strategist, OakBridge Commerce",
	},
	{
		text: "Pay-per-call volume scaled without turning into junk. They listen to feedback and adjust quickly.",
		image: "https://randomuser.me/api/portraits/men/11.jpg",
		name: "Ryan Foster",
		role: "Head of Growth, Suncrest Solar Pros",
	},
	{
		text: "Lead delivery is fast and organized. Our close rate improved because follow-up is easier.",
		image: "https://randomuser.me/api/portraits/women/12.jpg",
		name: "Hannah Price",
		role: "Marketing Coordinator, Stonegate HVAC",
	},
	{
		text: "Web development was clean and professional. The site loads faster and converts better.",
		image: "https://randomuser.me/api/portraits/men/13.jpg",
		name: "Isaac Bennett",
		role: "CTO, AtlasWeb Systems",
	},
	{
		text: "App work was delivered on schedule with clear milestones. QA was solid and the release went smoothly.",
		image: "https://randomuser.me/api/portraits/women/14.jpg",
		name: "Priya Shah",
		role: "Product Manager, NimbleRoute Apps",
	},
	{
		text: "The lead flow is consistent and quality is improving month over month. Their communication is excellent.",
		image: "https://randomuser.me/api/portraits/men/15.jpg",
		name: "Logan Wright",
		role: "Sales Manager, ClearPath Funding",
	},
	{
		text: "Email + social campaigns finally feel aligned to conversions. The creative and targeting are a big step up.",
		image: "https://randomuser.me/api/portraits/women/16.jpg",
		name: "Emily Dawson",
		role: "Brand Manager, HarborView Wellness",
	},
	{
		text: "They built a modern site and fixed our tracking. Leads are now attributed correctly and performance is clearer.",
		image: "https://randomuser.me/api/portraits/men/17.jpg",
		name: "Jordan Collins",
		role: "Director of Marketing, MetroFleet Logistics",
	},
	{
		text: "The website redesign looks premium and is easy to manage. We also saw better results from paid campaigns.",
		image: "https://randomuser.me/api/portraits/women/18.jpg",
		name: "Victoria Nguyen",
		role: "CEO, Maple & Main Boutique",
	},
	{
		text: "Transfers are cleaner and agent-ready. Their quality controls make a real difference.",
		image: "https://randomuser.me/api/portraits/men/19.jpg",
		name: "Anthony Ross",
		role: "Partnerships Lead, PeakPoint Connect",
	},
	{
		text: "Pay-per-lead delivery is dependable and the data is accurate. Our appointment rate went up.",
		image: "https://randomuser.me/api/portraits/women/20.jpg",
		name: "Kayla Simmons",
		role: "Operations Manager, Canyon Property Group",
	},
	{
		text: "They're data-driven and proactive. Campaigns get optimized weekly, not monthly.",
		image: "https://randomuser.me/api/portraits/men/21.jpg",
		name: "Owen Mitchell",
		role: "Performance Lead, SignalSpring Marketing",
	},
	{
		text: "Calls are more qualified and scheduling is smoother. Their landing page updates boosted conversions.",
		image: "https://randomuser.me/api/portraits/women/22.jpg",
		name: "Samantha Lee",
		role: "Marketing Director, BlueStone Dental Partners",
	},
	{
		text: "CMS setup made updates simple for our team. We can publish changes without developer delays now.",
		image: "https://randomuser.me/api/portraits/men/23.jpg",
		name: "Tyler James",
		role: "Founder, Redwood Web Works",
	},
	{
		text: "Pay-per-call helped us fill the pipeline quickly. Reporting is clear and easy to share internally.",
		image: "https://randomuser.me/api/portraits/women/24.jpg",
		name: "Nadia Hassan",
		role: "Growth Specialist, Crescent Retail Group",
	},
	{
		text: "Leads improved and the bad ones dropped off. It feels like a real optimization process, not just delivery.",
		image: "https://randomuser.me/api/portraits/men/25.jpg",
		name: "Ben Carter",
		role: "Sales Director, IronGate Security Co.",
	},
	{
		text: "They built our website and improved lead capture. The funnel is cleaner and conversions are up.",
		image: "https://randomuser.me/api/portraits/women/26.jpg",
		name: "Lily Park",
		role: "Head of Operations, Horizon Education Services",
	},
	{
		text: "Paid ads are producing better intent and fewer tire-kickers. Quick adjustments when we need them.",
		image: "https://randomuser.me/api/portraits/men/27.jpg",
		name: "Jackson Reed",
		role: "Marketing Manager, Summit Auto Care",
	},
	{
		text: "They handled web + marketing together, which saved us time. Everything feels more connected now.",
		image: "https://randomuser.me/api/portraits/women/28.jpg",
		name: "Ava Thompson",
		role: "Founder, Coastal Creative Co.",
	},
	{
		text: "Lead validation got stronger and our team wastes less time. Call quality is consistent even at higher volume.",
		image: "https://randomuser.me/api/portraits/men/29.jpg",
		name: "Diego Ramirez",
		role: "VP Growth, Fairway Health Network",
	},
	{
		text: "One-stop shop that covers calls, leads, and development. The process is organized and results are steady.",
		image: "https://randomuser.me/api/portraits/women/30.jpg",
		name: "Grace Wilson",
		role: "Director of Sales, BridgePoint Solutions",
	},
];


const firstColumn = testimonials.slice(0, 8);
const secondColumn = testimonials.slice(8, 15);
const thirdColumn = testimonials.slice(15, 22);
const fourthColumn = testimonials.slice(22, 30);


export default function Testimonials() {
	return (
		<section className="bg-background my-12 relative">
			<div className="max-w-7xl z-10 mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: true }}
					className="flex flex-col items-center justify-center mx-auto"
				>
					<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
						What our users say
					</h2>
					<p className="text-center mt-5 opacity-75">
						See what our customers have to say about us.
					</p>
				</motion.div>

				<div className="flex justify-center gap-4 mt-10 mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
					<TestimonialsColumn testimonials={firstColumn} duration={18} />
					<TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
					<TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
					<TestimonialsColumn testimonials={fourthColumn} className="hidden lg:block" duration={18} />
				</div>
			</div>
		</section>
	);
};