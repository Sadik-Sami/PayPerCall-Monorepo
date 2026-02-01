import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { getBlogBySlug } from '@/lib/api/blogs';
import { BlockRenderer } from '@/components/blog/BlockRenderer';
import { ArticleJsonLd } from '@/components/blog/ArticleJsonLd';
import { AuthorInfo } from '@/components/blog/AuthorInfo';

export const revalidate = 60;

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const data = await getBlogBySlug(slug);

	if (!data) {
		return {
			title: 'Blog Not Found | PayPerCall',
		};
	}

	const { blog } = data;
	const title = blog.seo_title || blog.title;
	const description = blog.seo_description || blog.excerpt || '';

	return {
		title: `${title} | PayPerCall`,
		description,
		alternates: { canonical: `/blogs/${slug}` },
		robots: { index: true, follow: true },
		openGraph: {
			type: 'article',
			title,
			description,
			url: `/blogs/${slug}`,
			publishedTime: blog.published_at || undefined,
			images: blog.cover_image_url
				? [
						{
							url: blog.cover_image_url,
							width: 1200,
							height: 630,
							alt: blog.title,
						},
				  ]
				: [],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: blog.cover_image_url ? [blog.cover_image_url] : [],
		},
	};
}

export default async function BlogDetailPage({ params }: Props) {
	const { slug } = await params;
	const data = await getBlogBySlug(slug);

	if (!data) {
		notFound();
	}

	const { blog, blocks, author } = data;
	console.log(author);

	return (
		<>
			<ArticleJsonLd blog={blog} />
			<article className='min-h-screen'>
				{/* Hero section with cover image */}
				<header className='relative'>
					{blog.cover_image_url && (
						<div className='relative aspect-21/9 w-full overflow-hidden bg-muted'>
							<Image
								src={blog.cover_image_url}
								alt={blog.title}
								fill
								priority
								className='object-cover'
								sizes='100vw'
							/>
						</div>
					)}

					<div className='max-w-4xl mx-auto px-6 py-12'>
						<h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>{blog.title}</h1>
						{blog.excerpt && <p className='text-xl text-muted-foreground mb-6'>{blog.excerpt}</p>}
						{blog.published_at && (
							<div className='flex items-center gap-2 text-sm text-muted-foreground'>
								<Clock className='size-4' />
								<time dateTime={blog.published_at}>
									{new Date(blog.published_at).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</time>
							</div>
						)}
					</div>
				</header>

				{/* Blog content */}
				<div className='max-w-4xl mx-auto px-6 py-12'>
					{blocks.length === 0 ? (
						<p className='text-muted-foreground'>No content available.</p>
					) : (
						<div className='prose prose-neutral dark:prose-invert max-w-none'>
							<BlockRenderer blocks={blocks} />
						</div>
					)}

					{/* Author Info */}
					<AuthorInfo author={author} updatedAt={blog.updated_at} />
				</div>
			</article>
		</>
	);
}

