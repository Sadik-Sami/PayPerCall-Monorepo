import { SectionHeader } from '@workspace/ui/components/sections';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';

interface Feature {
	title: string;
	description: string;
	icon?: string;
}

interface FeaturesSectionProps {
	features: Feature[];
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
	return (
		<section className='py-24 px-6 bg-background'>
			<div className='max-w-6xl mx-auto'>
				<SectionHeader title='Key Features' highlight='and Benefits' subtitle='What makes our service stand out' />
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12'>
					{features.map((feature, index) => (
						<Card key={index}>
							<CardHeader>
								<CardTitle>{feature.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>{feature.description}</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

