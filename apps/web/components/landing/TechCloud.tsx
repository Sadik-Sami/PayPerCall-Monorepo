'use client';

import { Marquee } from '@workspace/ui/components/ui/marquee';
import {
	SiNextdotjs,
	SiReact,
	SiAmazonwebservices,
	SiDocker,
	SiMongodb,
	SiPostgresql,
	SiShopify,
	SiTailwindcss,
} from 'react-icons/si';

const tech = [
	{ icon: <SiNextdotjs />, name: 'Next.js' },
	{ icon: <SiReact />, name: 'React' },
	{ icon: <SiAmazonwebservices />, name: 'AWS' },
	{ icon: <SiDocker />, name: 'Docker' },
	{ icon: <SiMongodb />, name: 'MongoDB' },
	{ icon: <SiPostgresql />, name: 'PostgreSQL' },
	{ icon: <SiShopify />, name: 'Shopify' },
	{ icon: <SiTailwindcss />, name: 'Tailwind' },
];

export function TechCloud() {
	return (
		<section className='py-20 border-y border-border/50 bg-card/20 overflow-hidden'>
			<div className='container mx-auto px-6 mb-10 text-center'>
				<p className='text-sm font-bold uppercase tracking-widest text-primary mb-2'>Our Arsenal</p>
				<h2 className='text-2xl font-bold text-foreground'>Powering World-Class Infrastructure</h2>
			</div>

			<Marquee className='[--duration:40s] select-none'>
				{tech.map((item) => (
					<div
						key={item.name}
						className='flex items-center gap-3 px-8 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0'>
						<span className='text-4xl text-foreground'>{item.icon}</span>
						<span className='text-xl font-heading font-bold text-foreground'>{item.name}</span>
					</div>
				))}
			</Marquee>
		</section>
	);
}
