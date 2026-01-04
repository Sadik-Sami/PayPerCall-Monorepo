import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
	getWebDevSubServiceBySlug,
	getAllWebDevServices,
	getWebDevSubServicesByServiceSlug,
} from '@/lib/services/web-dev-service';
import HeroSection from './_components/hero';
import FeaturesSection from './_components/features-section';
import ProcessSection from './_components/process-section';
import PackagesSection from './_components/packages-section';
import CaseStudiesSection from './_components/case-studies-section';
import TestimonialsSection from './_components/testimonials-section';
import FAQSection from './_components/faq-section';
import CTASection from './_components/cta-section';

interface PageProps {
	params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
	try {
		const services = await getAllWebDevServices();
		const webDevService = services.find((s) => s.slug === 'web-dev');

		if (!webDevService) return [];

		// Fetch all sub-services for web-dev
		const subServices = await getWebDevSubServicesByServiceSlug(webDevService.slug);

		return subServices.map((subService) => ({
			slug: [subService.slug],
		}));
	} catch (error) {
		console.error('Error generating static params:', error);
		return [];
	}
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const subServiceSlug = slug[0];

	if (!subServiceSlug) {
		return {
			title: 'Web Development Service',
		};
	}

	try {
		const services = await getAllWebDevServices();
		const webDevService = services.find((s) => s.slug === 'web-dev');
		if (!webDevService) {
			return {
				title: 'Web Development Service',
			};
		}

		const subService = await getWebDevSubServiceBySlug(webDevService.slug, subServiceSlug);
		if (!subService) {
			return {
				title: 'Web Development Service',
			};
		}

		const title = subService.metaTitle || `${subService.title} | Web Development Services`;
		const description =
			subService.metaDescription || subService.description || `Professional ${subService.title.toLowerCase()} services`;

		return {
			title,
			description,
			openGraph: {
				title,
				description,
				images: subService.ogImage ? [subService.ogImage.url] : [],
			},
			twitter: {
				card: 'summary_large_image',
				title,
				description,
				images: subService.ogImage ? [subService.ogImage.url] : [],
			},
		};
	} catch {
		return {
			title: 'Web Development Service',
		};
	}
}

export const revalidate = 604800; // 7 days fallback revalidation

export default async function WebDevSubServicePage({ params }: PageProps) {
	const { slug } = await params;
	const subServiceSlug = slug[0];

	if (!subServiceSlug) {
		notFound();
	}

	const services = await getAllWebDevServices();
	const webDevService = services.find((s) => s.slug === 'web-dev');

	if (!webDevService) {
		notFound();
	}

	const subService = await getWebDevSubServiceBySlug(webDevService.slug, subServiceSlug);

	if (!subService || !subService.isActive) {
		notFound();
	}

	// Generate JSON-LD structured data
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: subService.title,
		description: subService.description || subService.metaDescription,
		provider: {
			'@type': 'Organization',
			name: 'PayPerCall',
		},
		...(subService.faqs &&
			subService.faqs.length > 0 && {
				mainEntity: {
					'@type': 'FAQPage',
					mainEntity: subService.faqs.map((faq) => ({
						'@type': 'Question',
						name: faq.question,
						acceptedAnswer: {
							'@type': 'Answer',
							text: faq.answer,
						},
					})),
				},
			}),
	};

	return (
		<>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<main className='min-h-screen'>
				<HeroSection subService={subService} />
				{subService.features && subService.features.length > 0 && <FeaturesSection features={subService.features} />}
				{subService.processSteps && subService.processSteps.length > 0 && (
					<ProcessSection processSteps={subService.processSteps} />
				)}
				{subService.packages && subService.packages.length > 0 && <PackagesSection packages={subService.packages} />}
				{subService.caseStudies && subService.caseStudies.length > 0 && (
					<CaseStudiesSection caseStudies={subService.caseStudies} />
				)}
				{subService.testimonials && subService.testimonials.length > 0 && (
					<TestimonialsSection testimonials={subService.testimonials} />
				)}
				{subService.faqs && subService.faqs.length > 0 && <FAQSection faqs={subService.faqs} />}
				<CTASection />
			</main>
		</>
	);
}
