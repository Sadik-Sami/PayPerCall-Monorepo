import { SectionHeader } from '@workspace/ui/components/sections';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Check } from 'lucide-react';

interface Package {
	id: string;
	name: string;
	description?: string;
	price: number;
	currency: string;
	features: string[];
	isPopular: boolean;
}

interface PackagesSectionProps {
	packages: Package[];
}

export default function PackagesSection({ packages }: PackagesSectionProps) {
	return (
		<section className='py-24 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<SectionHeader title='Pricing' highlight='Packages' subtitle='Choose the package that fits your needs' />
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12'>
					{packages.map((pkg) => (
						<Card key={pkg.id} className={pkg.isPopular ? 'border-primary shadow-lg' : ''}>
							{pkg.isPopular && (
								<div className='bg-primary text-primary-foreground text-center py-2 text-sm font-semibold'>
									Most Popular
								</div>
							)}
							<CardHeader>
								<CardTitle>{pkg.name}</CardTitle>
								{pkg.description && <CardDescription>{pkg.description}</CardDescription>}
								<div className='mt-4'>
									<span className='text-4xl font-bold'>{pkg.currency === 'USD' ? '$' : pkg.currency}</span>
									<span className='text-4xl font-bold'>{pkg.price.toLocaleString()}</span>
								</div>
							</CardHeader>
							<CardContent>
								<ul className='space-y-3 mb-6'>
									{pkg.features.map((feature, index) => (
										<li key={index} className='flex items-start gap-2'>
											<Check className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
											<span className='text-sm'>{feature}</span>
										</li>
									))}
								</ul>
								<Button className='w-full' variant={pkg.isPopular ? 'default' : 'outline'}>
									Get Started
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

