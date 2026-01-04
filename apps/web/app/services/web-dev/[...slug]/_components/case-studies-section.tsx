import { SectionHeader } from '@workspace/ui/components/sections';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';

interface CaseStudy {
	id: string;
	title: string;
	description?: string;
	clientName?: string;
	results: Array<{
		metric: string;
		value: string;
		description?: string;
	}>;
	image?: {
		url: string;
		publicId: string;
		alt?: string;
	};
}

interface CaseStudiesSectionProps {
	caseStudies: CaseStudy[];
}

export default function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
	return (
		<section className='py-24 px-6 bg-muted/30'>
			<div className='max-w-6xl mx-auto'>
				<SectionHeader title='Case Studies' highlight='Success Stories' subtitle='Real results from real clients' />
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12'>
					{caseStudies.map((caseStudy) => (
						<Card key={caseStudy.id}>
							<CardHeader>
								<CardTitle>{caseStudy.title}</CardTitle>
								{caseStudy.clientName && <CardDescription>Client: {caseStudy.clientName}</CardDescription>}
							</CardHeader>
							<CardContent>
								{caseStudy.description && <p className='text-sm text-muted-foreground mb-4'>{caseStudy.description}</p>}
								{caseStudy.results.length > 0 && (
									<div className='space-y-2'>
										{caseStudy.results.map((result, index) => (
											<div key={index} className='flex justify-between items-center'>
												<span className='text-sm font-medium'>{result.metric}</span>
												<span className='text-sm font-bold text-primary'>{result.value}</span>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

