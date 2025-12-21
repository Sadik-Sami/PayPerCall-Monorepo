import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const socialLinks = [
	{ name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
	{ name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
	{ name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
	{ name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
	{ name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
];

export function SocialLinks() {
	return (
		<div className='flex items-center gap-4'>
			{socialLinks.map((social) => {
				const Icon = social.icon;
				return (
					<a
						key={social.name}
						href={social.href}
						target='_blank'
						rel='noopener noreferrer'
						className='w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors'
						aria-label={social.name}>
						<Icon size={18} />
					</a>
				);
			})}
		</div>
	);
}
