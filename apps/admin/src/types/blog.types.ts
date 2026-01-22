export const BLOG_STATUS = {
	DRAFT: 'draft',
	PUBLISHED: 'published',
	UNLISTED: 'unlisted',
} as const;

export type BlogStatus = (typeof BLOG_STATUS)[keyof typeof BLOG_STATUS];

export const BLOG_BLOCK_TYPE = {
	PARAGRAPH: 'paragraph',
	HEADING: 'heading',
	IMAGE: 'image',
	GALLERY: 'gallery',
	QUOTE: 'quote',
	CODE: 'code',
	BULLET_LIST: 'bullet_list',
	ORDERED_LIST: 'ordered_list',
	DIVIDER: 'divider',
} as const;

export type BlogBlockType = (typeof BLOG_BLOCK_TYPE)[keyof typeof BLOG_BLOCK_TYPE];

export interface CloudinarySignature {
	cloudName: string;
	apiKey: string;
	timestamp: number;
	signature: string;
	folder?: string;
	allowedFormats?: string[];
}

/**
 * Minimal Tiptap node shape used for storage/transport.
 * We intentionally allow extra fields so we can store raw Tiptap JSON without lossy typing.
 */
export interface TiptapNode {
	type: string;
	attrs?: Record<string, unknown>;
	content?: TiptapNode[];
	text?: string;
	marks?: Array<{ type: string; attrs?: Record<string, unknown> }>;
	[key: string]: unknown;
}

export interface Blog {
	id: string;
	title: string;
	slug: string;
	excerpt?: string | null;
	cover_image_url?: string | null;
	seo_title?: string | null;
	seo_description?: string | null;
	is_featured: boolean;
	status: BlogStatus;
	published_at?: string | null;
	created_at?: string;
	updated_at?: string;
	author_id?: string | null;
}

export interface BlogBlock {
	id: string;
	blog_id: string;
	type: BlogBlockType;
	content: TiptapNode;
	order: number;
	created_at?: string;
}
