import type { ReactNode } from 'react';
import { ServiceSubnav } from '@/components/services';
import { WEB_DEV_SERVICE_NAV, WEB_DEV_TECH_STACK } from '@/components/services/nav-items';
import { Marquee } from '@workspace/ui/components/ui/marquee';

export const revalidate = 3600;

export default function WebDevLayout({ children }: { children: ReactNode }) {
	return (
		<div className='bg-muted/20'>
			<div className='border-b border-muted-foreground/20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80'>
				<div className='mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4'>
					<div>
						<p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Services</p>
						<h2 className='text-lg font-semibold text-foreground'>Web Development</h2>
					</div>
					<ServiceSubnav items={WEB_DEV_SERVICE_NAV} />
					<div className='rounded-2xl border border-muted-foreground/20 bg-background/90 p-4'>
						<div className='flex flex-col gap-3'>
							<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
								Core technologies we deliver with
							</p>
							<Marquee pauseOnHover className='[--duration:150s]'>
								{WEB_DEV_TECH_STACK.map(({ label, icon: Icon }) => (
									<span
										key={label}
										className='mx-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary'>
										<Icon className='size-8' />
										{label}
									</span>
								))}
							</Marquee>
						</div>
					</div>
				</div>
			</div>
			<div className='mx-auto max-w-7xl px-4 py-10'>{children}</div>
		</div>
	);
}
