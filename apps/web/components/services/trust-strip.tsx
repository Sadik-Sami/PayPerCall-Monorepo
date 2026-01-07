import Image from 'next/image';
import { cn } from '@workspace/ui/lib/utils';
import { ShieldCheck, LineChart, Sparkles, BadgeCheck } from 'lucide-react';
import type { TrustStripProps, TrustLogo } from './types';

const getInitials = (logo: TrustLogo) => {
	if (logo.fallbackInitials) {
		return logo.fallbackInitials;
	}

	const segments = logo.name?.split(' ').filter(Boolean) ?? [];
	if (!segments.length) return '—';
	if (segments.length === 1) return segments[0]!.slice(0, 2).toUpperCase();
	return `${segments[0]!.charAt(0)}${segments[segments.length - 1]!.charAt(0)}`.toUpperCase();
};

const metricIcons = [ShieldCheck, LineChart, Sparkles, BadgeCheck];

export function TrustStrip({ logos = [], metrics = [], className }: TrustStripProps) {
	return (
		<section
			className={cn('rounded-3xl border border-primary/10 bg-background/95 p-8 shadow-lg shadow-primary/5', className)}>
			<div className='grid gap-8 lg:grid-cols-[1.2fr_0.8fr]'>
				<div className='space-y-6'>
					<div className='rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-primary/40 p-6 text-slate-100'>
						<p className='text-xs font-semibold uppercase tracking-wide text-primary-100/90'>Proof over promises</p>
						<h3 className='mt-2 text-2xl font-semibold text-white'>
							Independent audits, shared dashboards, no black boxes.
						</h3>
						<ul className='mt-4 space-y-2 text-sm text-slate-200/90'>
							<li>• SOC 2-ready controls across infrastructure</li>
							<li>• Weekly scorecards on Core Web Vitals & uptime</li>
							<li>• GDPR + HIPAA compliant data handling on request</li>
						</ul>
					</div>
					<div className='rounded-3xl border border-slate-200/40 p-4 dark:border-slate-800/60'>
						<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Teams we support</p>
						<div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3'>
							{logos.map((logo) => (
								<div
									key={logo.name}
									className='flex h-14 items-center justify-center rounded-2xl bg-muted/70 px-3 shadow-inner shadow-black/5'>
									{logo.src ?
										<Image
											src={logo.src}
											alt={logo.alt ?? logo.name}
											width={120}
											height={32}
											className='max-h-10 w-auto opacity-80'
											style={{ objectFit: 'contain' }}
										/>
									:	<span className='text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
											{getInitials(logo)}
										</span>
									}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='grid gap-4 sm:grid-cols-2'>
					{metrics.map((metric, index) => {
						const Icon = metricIcons[index % metricIcons.length] ?? ShieldCheck;
						return (
							<div
								key={metric.label}
								className='rounded-2xl border border-primary/10 bg-card/80 p-5 shadow-sm shadow-primary/10'>
								<div className='flex items-center gap-3'>
									<span className='flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
										<Icon className='size-4' />
									</span>
									<div>
										<p className='text-2xl font-semibold text-foreground'>{metric.value}</p>
										<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
											{metric.label}
										</p>
									</div>
								</div>
								{metric.helperText ?
									<p className='mt-3 text-sm text-muted-foreground'>{metric.helperText}</p>
								:	null}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
