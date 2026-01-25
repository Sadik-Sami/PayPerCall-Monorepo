import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
	title: 'Blog | PayPerCall',
	description: 'Industry insights, performance marketing strategies, and lead generation best practices.',
	alternates: { canonical: '/blogs' },
	robots: { index: true, follow: true },
	openGraph: {
		type: 'website',
		title: 'Blog | PayPerCall',
		description: 'Industry insights, performance marketing strategies, and lead generation best practices.',
		url: '/blogs',
	},
};

import { getBlogsList } from '@/lib/api/blogs';
import type { Blog } from '@/types/blog';

export const revalidate = 60;

export default async function BlogsPage() {
	const blogs = await getBlogsList();

	return (
		<main className='min-h-screen'>
			<section className='py-16 px-6 border-b border-border'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>Blog</h1>
					<p className='text-lg text-muted-foreground'>
						Practical insights on lead generation, performance marketing, and scaling customer acquisition.
					</p>
				</div>
			</section>

			<section className='py-16 px-6'>
				<div className='max-w-7xl mx-auto'>
					{blogs.length === 0 ? (
						<div className='text-center py-12'>
							<p className='text-muted-foreground'>No blog posts available yet.</p>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{blogs.map((blog: Blog) => (
								<article key={blog.id} className='group border border-border rounded-lg overflow-hidden hover:border-foreground/20 transition-colors'>
									{blog.cover_image_url && (
										<Link href={`/blogs/${blog.slug}`} className='block relative aspect-video overflow-hidden bg-muted'>
											<Image
												src={blog.cover_image_url}
												alt={blog.title}
												fill
												className='object-cover group-hover:scale-105 transition-transform duration-300'
												sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
											/>
										</Link>
									)}
									<div className='p-6'>
										{blog.published_at && (
											<div className='flex items-center gap-2 text-sm text-muted-foreground mb-3'>
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
										<h2 className='text-xl font-semibold mb-3 group-hover:text-primary transition-colors'>
											<Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
										</h2>
										{blog.excerpt && <p className='text-muted-foreground mb-4 line-clamp-3'>{blog.excerpt}</p>}
										<Link
											href={`/blogs/${blog.slug}`}
											className='inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline'>
											Read more
											<ArrowRight className='size-4' />
										</Link>
									</div>
								</article>
							))}
						</div>
					)}
				</div>
			</section>
		</main>
	);
}

