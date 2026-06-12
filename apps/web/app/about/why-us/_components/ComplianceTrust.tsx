import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { WHY_US_COMPLIANCE_ITEMS } from '../_data/why-us-content';

export function ComplianceTrust() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<div className='rounded-3xl border border-border/70 bg-card p-6 sm:p-8'>
				<div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
					<div className='max-w-2xl'>
						<p className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
							<ShieldCheck className='size-4' />
							Compliance and trust
						</p>
						<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
							Programs built with operational safeguards in mind
						</h2>
						<p className='mt-3 text-base leading-relaxed text-muted-foreground'>
							The platform is positioned around measurable performance, but it is also designed to support higher-trust workflows where compliance cannot be treated casually.
						</p>
					</div>
					<Link href='/contact' className='inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary'>
						Ask about compliance workflows
						<ArrowRight className='size-4' />
					</Link>
				</div>

				<div className='mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5'>
					{WHY_US_COMPLIANCE_ITEMS.map((item, index) => (
						<article
							key={item.label}
							className={[
								'rounded-2xl border p-4',
								index % 5 === 0 && 'border-pastel-mint-border bg-pastel-mint/55',
								index % 5 === 1 && 'border-pastel-sky-border bg-pastel-sky/55',
								index % 5 === 2 && 'border-pastel-lilac-border bg-pastel-lilac/55',
								index % 5 === 3 && 'border-pastel-peach-border bg-pastel-peach/55',
								index % 5 === 4 && 'border-pastel-lime-border bg-pastel-lime/55',
							].filter(Boolean).join(' ')}>
							<p className='text-sm font-semibold uppercase tracking-[0.16em] text-foreground'>{item.label}</p>
							<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{item.description}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
