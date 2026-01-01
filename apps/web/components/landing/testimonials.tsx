'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Marquee } from '@workspace/ui/components/ui/marquee';
import Image from 'next/image';

export function Highlight({ children, className }: { children: React.ReactNode; className?: string }) {
	return <span className={cn('bg-blue-500/10 p-1 py-0.5 font-bold text-blue-500', className)}>{children}</span>;
}

export interface TestimonialCardProps {
	name: string;
	role: string;
	img?: string;
	description: React.ReactNode;
	className?: string;
	// [key: string]: any;
}

export function TestimonialCard({
	description,
	name,
	img,
	role,
	className,
	// ...props // Capture the rest of the props
}: TestimonialCardProps) {
	return (
		<div
			className={cn(
				'mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4',
				// theme styles
				'border-border bg-card/50 border shadow-sm',
				// hover effect
				'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
				className
			)}>
			<div className='text-muted-foreground text-sm font-normal select-none'>
				{description}
				<div className='flex flex-row py-1'>
					<Star className='size-4 fill-blue-500 text-blue-500' />
					<Star className='size-4 fill-blue-500 text-blue-500' />
					<Star className='size-4 fill-blue-500 text-blue-500' />
					<Star className='size-4 fill-blue-500 text-blue-500' />
					<Star className='size-4 fill-blue-500 text-blue-500' />
				</div>
			</div>

			<div className='flex w-full items-center justify-start gap-5 select-none'>
				<Image
					width={40}
					height={40}
					src={img || ''}
					alt={name}
					className='size-10 rounded-full ring-1 ring-blue-500/20 ring-offset-2'
				/>

				<div>
					<p className='text-foreground font-medium'>{name}</p>
					<p className='text-muted-foreground text-xs font-normal'>{role}</p>
				</div>
			</div>
		</div>
	);
}
const testimonials = [
	{
		name: 'Michael Torres',
		role: 'Owner, Torres Insurance Agency',
		img: 'https://randomuser.me/api/portraits/men/22.jpg',
		description: (
			<p>
				We struggled to find quality leads until we partnered with Core Closer.
				<Highlight>Our close rate jumped from 12% to 34% in the first quarter.</Highlight> The leads are pre-qualified
				and ready to buy.
			</p>
		),
	},
	{
		name: 'Sarah Mitchell',
		role: 'Managing Partner, Mitchell Law Group',
		img: 'https://randomuser.me/api/portraits/women/33.jpg',
		description: (
			<p>
				As a personal injury firm, we need clients who are serious about their cases.
				<Highlight>Every call we receive is from someone actively seeking legal help.</Highlight> The ROI speaks for
				itself.
			</p>
		),
	},
	{
		name: 'David Chen',
		role: 'Marketing Director, Premier HVAC',
		img: 'https://randomuser.me/api/portraits/men/32.jpg',
		description: (
			<p>
				We tried other lead gen companies before, but the quality was never there.
				<Highlight>Core Closer delivers homeowners who actually need our services.</Highlight> Our technicians are
				booked solid now.
			</p>
		),
	},
	{
		name: 'Jennifer Adams',
		role: 'CEO, Adams Medicare Solutions',
		img: 'https://randomuser.me/api/portraits/women/44.jpg',
		description: (
			<p>
				Medicare leads are tricky because timing matters so much.
				<Highlight>The real-time delivery means we connect with seniors during enrollment periods.</Highlight> Our
				enrollment numbers have tripled.
			</p>
		),
	},
	{
		name: 'Robert Kim',
		role: 'Owner, Kim Roofing & Construction',
		img: 'https://randomuser.me/api/portraits/men/55.jpg',
		description: (
			<p>
				After a major storm, we needed to scale quickly.
				<Highlight>Core Closer helped us handle 3x our normal call volume.</Highlight> The pay-per-call model meant we
				only paid for actual opportunities.
			</p>
		),
	},
	{
		name: 'Amanda Foster',
		role: 'Branch Manager, Foster Financial',
		img: 'https://randomuser.me/api/portraits/women/67.jpg',
		description: (
			<p>
				Debt relief clients need to trust you from the first conversation.
				<Highlight>The warm transfers feel natural, not like a cold lead.</Highlight> Our consultants can focus on
				helping people instead of prospecting.
			</p>
		),
	},
	{
		name: 'James Wilson',
		role: 'Director, Wilson Auto Group',
		img: 'https://randomuser.me/api/portraits/men/78.jpg',
		description: (
			<p>
				Car buyers today research online but want to talk to a real person.
				<Highlight>We get calls from people ready to visit the showroom.</Highlight> Our sales team loves these leads.
			</p>
		),
	},
	{
		name: 'Maria Santos',
		role: 'Owner, Santos Solar Solutions',
		img: 'https://randomuser.me/api/portraits/women/89.jpg',
		description: (
			<p>
				Solar is competitive, so lead quality is everything.
				<Highlight>Homeowners who call us are already interested in going solar.</Highlight> Our cost per acquisition
				dropped by 40%.
			</p>
		),
	},
	{
		name: 'Thomas Brown',
		role: 'Practice Manager, Brown Dental Care',
		img: 'https://randomuser.me/api/portraits/men/92.jpg',
		description: (
			<p>
				Getting new patients used to mean expensive ads with uncertain results.
				<Highlight>Now we get calls from people looking for a dentist in our area.</Highlight> The consistency has been
				remarkable.
			</p>
		),
	},
	{
		name: 'Lisa Park',
		role: 'Owner, Park Plumbing Services',
		img: 'https://randomuser.me/api/portraits/women/29.jpg',
		description: (
			<p>
				Emergency plumbing calls are our bread and butter.
				<Highlight>Core Closer connects us with homeowners who need help right now.</Highlight> Response time is
				everything in this business.
			</p>
		),
	},
];

export default function Testimonials() {
	return (
		<section className='relative max-w-7xl mx-auto py-10'>
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
				<h2 className='text-foreground mb-4 text-center text-3xl leading-[1.2] font-bold tracking-tight md:text-5xl'>
					What Our Clients Say
				</h2>
				<p className='text-muted-foreground mx-auto mb-8 max-w-lg text-center text-lg'>
					Businesses across industries trust us to deliver qualified leads that convert into customers.
				</p>
			</motion.div>

			<div className='relative mt-6 max-h-screen overflow-hidden'>
				<div className='gap-4 md:columns-2 xl:columns-3 2xl:columns-4'>
					{Array(Math.ceil(testimonials.length / 3))
						.fill(0)
						.map((_, i) => (
							<Marquee
								vertical
								key={i}
								className={cn({
									'[--duration:60s]': i === 1,
									'[--duration:30s]': i === 2,
									'[--duration:70s]': i === 3,
								})}>
								{testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
									<motion.div
										key={idx}
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{
											delay: Math.random() * 0.8,
											duration: 1.2,
										}}>
										<TestimonialCard {...card} />
									</motion.div>
								))}
							</Marquee>
						))}
				</div>
				<div className='from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-linear-to-t from-20%'></div>
				<div className='from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-linear-to-b from-20%'></div>
			</div>
		</section>
	);
}
