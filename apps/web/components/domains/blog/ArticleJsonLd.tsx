import type { Blog } from '@/types/blog';

interface ArticleJsonLdProps {
	blog: Blog;
}

/**
 * Server-side JSON-LD structured data for blog articles
 * Uses Organization as publisher/author initially (API doesn't return author profile)
 */
export function ArticleJsonLd({ blog }: ArticleJsonLdProps) {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://paypercall.com';

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: blog.title,
		description: blog.excerpt || blog.seo_description || '',
		image: blog.cover_image_url
			? {
					'@type': 'ImageObject',
					url: blog.cover_image_url,
			  }
			: undefined,
		datePublished: blog.published_at || blog.created_at,
		dateModified: blog.updated_at,
		author: {
			'@type': 'Organization',
			name: 'PayPerCall',
			url: baseUrl,
		},
		publisher: {
			'@type': 'Organization',
			name: 'PayPerCall',
			url: baseUrl,
			logo: {
				'@type': 'ImageObject',
				url: `${baseUrl}/social/logo.png`,
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${baseUrl}/blogs/${blog.slug}`,
		},
	};

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData),
			}}
		/>
	);
}

