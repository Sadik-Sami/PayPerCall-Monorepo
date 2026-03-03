// import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import FacebookIcon from '@/public/social/facebook.png';
import InstagramIcon from '@/public/social/instagram.png';
import TwitterIcon from '@/public/social/twitter.png';
import LinkedinIcon from '@/public/social/linkedin.png';
import YoutubeIcon from '@/public/social/youtube.png';
import Image from 'next/image';

const socialLinks = [
	{ name: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
	{ name: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
	{ name: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
	{ name: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
	{ name: 'YouTube', href: 'https://youtube.com', icon: YoutubeIcon },
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
						className='rounded-full flex items-center justify-center'
						aria-label={social.name}>
						<Image src={Icon} alt={social.name} height={24} width={24} />
					</a>
				);
			})}
		</div>
	);
}
