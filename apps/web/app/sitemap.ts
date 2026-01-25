import { MetadataRoute } from 'next';
import { getBlogsList } from '@/lib/api/blogs';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://paypercall.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Static routes
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1.0,
		},
		{
			url: `${baseUrl}/blogs`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/advertiser-signup`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/hire-call-center`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/services/web-dev`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${baseUrl}/services/web-dev/landing-page`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${baseUrl}/services/web-dev/full-stack`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${baseUrl}/services/web-dev/business`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${baseUrl}/services/web-dev/ecommerce`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		},
	];

	// Dynamic blog routes
	const blogs = await getBlogsList();
	const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
		url: `${baseUrl}/blogs/${blog.slug}`,
		lastModified: new Date(blog.updated_at),
		changeFrequency: 'weekly' as const,
		priority: 0.7,
	}));

	return [...staticRoutes, ...blogRoutes];
}

