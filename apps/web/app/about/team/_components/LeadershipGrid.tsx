import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@workspace/ui/components/avatar';
import { Card, CardContent } from '@workspace/ui/components/card';
import { TEAM_MEMBERS } from '../_data/team-content';

const ACCENT_CLASSES = {
	mint: 'border-pastel-mint-border bg-pastel-mint/60',
	lilac: 'border-pastel-lilac-border bg-pastel-lilac/60',
	sky: 'border-pastel-sky-border bg-pastel-sky/60',
	peach: 'border-pastel-peach-border bg-pastel-peach/60',
} as const;

function getInitials(name: string) {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();
}

export function LeadershipGrid() {
	return (
		<section className='section-container py-16 sm:py-20'>
			<div className='mx-auto max-w-3xl text-center'>
				<p className='inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
					Leadership
				</p>
				<h2 className='mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
					The operators clients actually work with
				</h2>
				<p className='mt-3 text-base leading-relaxed text-muted-foreground'>
					Each program is supported by people who understand media quality, delivery operations, systems, and client-side execution.
				</p>
			</div>

			<div className='mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
				{TEAM_MEMBERS.map((member) => (
					<Card
						key={member.name}
						className='h-full rounded-3xl border-border/70 bg-card/90 transition-transform duration-200 hover:-translate-y-1'>
						<CardContent className='flex h-full flex-col gap-4 p-6'>
							<div className='flex items-start justify-between gap-4'>
								<div className='flex items-center gap-4'>
									<Avatar className={`size-14 border ${ACCENT_CLASSES[member.accent]}`}>
										<AvatarFallback className='bg-transparent font-semibold text-foreground'>
											{getInitials(member.name)}
										</AvatarFallback>
									</Avatar>
									<div>
										<h3 className='text-lg font-semibold text-foreground'>{member.name}</h3>
										<p className='text-sm text-muted-foreground'>{member.role}</p>
									</div>
								</div>
								<Link
									href={member.linkedinHref}
									aria-label={`${member.name} LinkedIn`}
									className='inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background text-muted-foreground transition-colors hover:text-foreground'>
									<ExternalLink className='size-4' />
								</Link>
							</div>
							<div className={`rounded-2xl border p-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/80 ${ACCENT_CLASSES[member.accent]}`}>
								{member.department}
							</div>
							<p className='text-sm leading-relaxed text-muted-foreground'>{member.bio}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
