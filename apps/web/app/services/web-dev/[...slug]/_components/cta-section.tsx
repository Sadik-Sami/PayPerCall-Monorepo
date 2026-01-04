import { CTABanner } from '@workspace/ui/components/sections';
import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

export default function CTASection() {
	return (
		<section className='py-24 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
			<CTABanner
				title='Ready to Get Started?'
				subtitle='Contact us today to discuss your web development needs and get a free consultation.'>
				<Button size='lg' asChild>
					<Link href='/contact'>Get Free Consultation</Link>
				</Button>
			</CTABanner>
			</div>
		</section>
	);
}

