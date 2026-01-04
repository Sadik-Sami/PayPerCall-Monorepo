import { Metadata } from 'next';
import Link from 'next/link';
import { getAllWebDevServices, getWebDevSubServicesByServiceSlug } from '@/lib/services/web-dev-service';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Code, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
	title: 'Web Development Services | Professional Web Solutions',
	description: 'Comprehensive web development services including full-stack development, business websites, ecommerce solutions, and landing pages.',
};

export default async function WebDevServicesPage() {
	const services = await getAllWebDevServices();
	const webDevService = services.find((s) => s.slug === 'web-dev');

	if (!webDevService) {
		return (
			<div className='container mx-auto px-6 py-24'>
				<div className='text-center'>
					<h1 className='text-4xl font-bold mb-4'>Web Development Services</h1>
					<p className='text-muted-foreground'>Service information coming soon.</p>
				</div>
			</div>
		);
	}

	const subServices = await getWebDevSubServicesByServiceSlug(webDevService.slug);

	return (
		<main className='min-h-screen'>
			{/* Hero Section */}
			<section className='py-24 px-6 bg-linear-to-b from-muted/30 to-background'>
				<div className='max-w-6xl mx-auto text-center'>
					<h1 className='text-5xl font-bold mb-6'>{webDevService.heroTitle || webDevService.title}</h1>
					{webDevService.heroSubtitle && (
						<p className='text-xl text-muted-foreground mb-8 max-w-3xl mx-auto'>{webDevService.heroSubtitle}</p>
					)}
					{webDevService.description && (
						<p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>{webDevService.description}</p>
					)}
				</div>
			</section>

			{/* Sub Services Grid */}
			{subServices.length > 0 && (
				<section className='py-24 px-6 bg-background'>
					<div className='max-w-6xl mx-auto'>
						<div className='text-center mb-12'>
							<h2 className='text-3xl font-bold mb-4'>Our Web Development Services</h2>
							<p className='text-muted-foreground'>Choose the service that fits your needs</p>
						</div>
						<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
							{subServices.map((subService) => (
								<Card key={subService.id} className='hover:shadow-lg transition-shadow'>
									<CardHeader>
										<Code className='h-8 w-8 text-primary mb-2' />
										<CardTitle className='text-xl'>{subService.title}</CardTitle>
										<CardDescription className='line-clamp-2'>{subService.description || 'Professional web development service'}</CardDescription>
									</CardHeader>
									<CardContent>
										<Link href={`/services/web-dev/${subService.slug}`}>
											<Button variant='outline' className='w-full'>
												Learn More <ArrowRight className='ml-2 h-4 w-4' />
											</Button>
										</Link>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
			)}
		</main>
	);
}

