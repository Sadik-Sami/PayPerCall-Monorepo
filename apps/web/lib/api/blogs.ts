import { cache } from 'react';
import { draftMode } from 'next/headers';
import type { Blog, BlogBlock, BlogListResponse, BlogDetailResponse } from '@/types/blog';

const API_BASE_URL = process.env.API_BASE_URL || 'https://paypercall-monorepo.onrender.com';
const API_PREVIEW_SECRET = process.env.API_PREVIEW_SECRET;

interface BlogDetailData {
	blog: Blog;
	blocks: BlogBlock[];
}

/**
 * Fetch all published blogs (list view)
 * Cached per-request to dedupe across generateMetadata + page render
 */
export const getBlogsList = cache(async (): Promise<Blog[]> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/blogs`, {
			next: { revalidate: 60 },
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			console.error('Failed to fetch blogs list:', response.statusText);
			return [];
		}

		const result: BlogListResponse = await response.json();
		return result.data || [];
	} catch (error) {
		console.error('Error fetching blogs list:', error);
		return [];
	}
});

/**
 * Fetch a single published blog by slug
 * Cached per-request to dedupe across generateMetadata + page render
 */
export const getPublishedBlogBySlug = cache(async (slug: string): Promise<BlogDetailData | null> => {
	try {
		const response = await fetch(`${API_BASE_URL}/api/blogs/${slug}`, {
			next: { revalidate: 60 },
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			if (response.status === 404) {
				return null;
			}
			console.error('Failed to fetch blog:', response.statusText);
			return null;
		}

		const result: BlogDetailResponse = await response.json();
		return result.data || null;
	} catch (error) {
		console.error('Error fetching blog:', error);
		return null;
	}
});

/**
 * Fetch a blog by slug (preview-aware - includes draft content when Draft Mode is enabled)
 * This is the main entry point for blog detail pages
 */
export const getBlogBySlug = cache(async (slug: string): Promise<BlogDetailData | null> => {
	const { isEnabled } = await draftMode();

	console.log('getBlogBySlug called:', { slug, draftModeEnabled: isEnabled, hasPreviewSecret: !!API_PREVIEW_SECRET });

	// If draft mode is enabled and we have a preview secret, use the preview endpoint
	if (isEnabled && API_PREVIEW_SECRET) {
		console.log('Using preview endpoint for slug:', slug);
		return getPreviewBlogBySlug(slug);
	}

	// Otherwise, fetch published content only
	console.log('Using published endpoint for slug:', slug);
	return getPublishedBlogBySlug(slug);
});

/**
 * Fetch a blog by slug from the preview endpoint (includes draft content)
 * Only used when Draft Mode is enabled
 */
async function getPreviewBlogBySlug(slug: string): Promise<BlogDetailData | null> {
	if (!API_PREVIEW_SECRET) {
		console.error('API_PREVIEW_SECRET is not configured');
		return null;
	}

	try {
		const url = `${API_BASE_URL}/api/blogs/preview/${slug}`;
		console.log('Fetching preview from:', url);
		console.log('Preview secret present:', !!API_PREVIEW_SECRET);

		const response = await fetch(url, {
			cache: 'no-store', // Don't cache preview requests
			headers: {
				'Content-Type': 'application/json',
				'X-Preview-Secret': API_PREVIEW_SECRET,
			},
		});

		console.log('Preview response status:', response.status);

		if (!response.ok) {
			if (response.status === 404) {
				console.error('Blog not found in preview endpoint');
				return null;
			}
			const errorText = await response.text();
			console.error('Failed to fetch preview blog:', response.statusText, errorText);
			return null;
		}

		const result: BlogDetailResponse = await response.json();
		console.log('Preview blog fetched successfully:', result.data?.blog?.title);
		return result.data || null;
	} catch (error) {
		console.error('Error fetching preview blog:', error);
		return null;
	}
}

