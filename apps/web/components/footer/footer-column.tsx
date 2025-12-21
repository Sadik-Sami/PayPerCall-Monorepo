import Link from 'next/link';

interface FooterLink {
	label: string;
	href: string;
}

interface FooterColumnProps {
	title: string;
	links: FooterLink[];
}

export function FooterColumn({ title, links }: FooterColumnProps) {
	return (
		<div className='space-y-4'>
			<h3 className='font-utility text-sm font-semibold text-foreground uppercase tracking-wider'>{title}</h3>
			<ul className='space-y-3'>
				{links.map((link, index) => (
					<li key={index}>
						<Link
							href={link.href}
							className='font-body text-sm text-muted-foreground hover:text-foreground transition-colors'>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
