import Link from 'next/link';
import { FooterColumn } from './footer-column';
import { SocialLinks } from './social-links';
import { footerData } from '../navbar/data';

export function Footer() {
	return (
		<footer className='bg-background border-t border-border'>
			<div className='max-w-7xl mx-auto px-6 py-16'>
				{/* Main Footer Content */}
				<div className='grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 mb-12'>
					{/* Brand Column */}
					<div className='col-span-2 space-y-6'>
						<div>
							<Link href='/' className='font-utility text-2xl font-bold text-foreground'>
								Core Closer
							</Link>
							<p className='font-body mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs'>
								Excellence in digital services. We deliver cutting-edge solutions that drive business growth and
								innovation.
							</p>
						</div>
						<div>
							<h4 className='font-utility text-sm font-semibold text-foreground mb-3'>Connect With Us</h4>
							<SocialLinks />
						</div>
					</div>

					{/* Services */}
					<FooterColumn title='Services' links={footerData.services} />

					{/* Company */}
					<FooterColumn title='Company' links={footerData.company} />

					{/* Industries (Replaced Resources with Industries as it's more relevant to data.ts) */}
					<FooterColumn title='Industries' links={footerData.industries} />

					{/* Legal */}
					<FooterColumn title='Legal' links={footerData.legal} />
				</div>

				{/* Newsletter Section */}
				<div className='border-t border-border pt-12 pb-8'>
					<div className='grid md:grid-cols-2 gap-8 items-center'>
						<div>
							<h3 className='font-heading text-2xl font-bold text-foreground mb-2'>Stay Updated</h3>
							<p className='font-body text-sm text-muted-foreground'>
								Subscribe to our newsletter for industry insights and exclusive updates.
							</p>
						</div>
						<div className='flex gap-3'>
							<input
								type='email'
								placeholder='Enter your email'
								className='font-body flex-1 px-4 py-3 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
							/>
							<button className='font-utility px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap'>
								Subscribe
							</button>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='border-t border-border pt-8'>
					<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
						<p className='font-utility text-sm text-muted-foreground'>
							© {new Date().getFullYear()} Premium Digital Services. All rights reserved.
						</p>
						<div className='flex items-center gap-6'>
							<span className='font-utility text-xs text-muted-foreground uppercase tracking-wider'>
								Trusted by Industry Leaders
							</span>
							<div className='flex items-center gap-2'>
								<span className='font-utility text-xs font-semibold text-foreground'>ISO 27001</span>
								<span className='text-border'>|</span>
								<span className='font-utility text-xs font-semibold text-foreground'>SOC 2</span>
								<span className='text-border'>|</span>
								<span className='font-utility text-xs font-semibold text-foreground'>GDPR</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
