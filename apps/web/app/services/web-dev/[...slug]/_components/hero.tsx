import { WebDevSubService } from '@/lib/services/web-dev-service';
import { Button } from '@workspace/ui/components/button';
import Image from 'next/image';

interface HeroSectionProps {
	subService: WebDevSubService;
}

export default function HeroSection({ subService }: HeroSectionProps) {
	const heroContent = subService.heroContent || {
		title: subService.title,
		subtitle: subService.description || '',
	};

	return (
		<section className='py-24 px-6 bg-gradient-to-b from-muted/30 to-background'>
			<div className='max-w-6xl mx-auto'>
				<div className='grid md:grid-cols-2 gap-12 items-center'>
					<div>
						<h1 className='text-5xl font-bold mb-6'>{heroContent.title}</h1>
						{heroContent.subtitle && <p className='text-xl text-muted-foreground mb-8'>{heroContent.subtitle}</p>}
						{heroContent.description && <p className='text-lg text-muted-foreground mb-8'>{heroContent.description}</p>}
						{heroContent.ctaText && heroContent.ctaLink && (
							<Button size='lg' asChild>
								<a href={heroContent.ctaLink}>{heroContent.ctaText}</a>
							</Button>
						)}
					</div>
					{heroContent.image && (
						<div className='relative aspect-video rounded-lg overflow-hidden'>
							<Image src={heroContent.image.url} alt={heroContent.image.alt || heroContent.title} fill className='object-cover' />
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

