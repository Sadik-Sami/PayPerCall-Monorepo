export type BlogStatus = 'draft' | 'published' | 'unlisted';

export type BlogBlockType =
	| 'paragraph'
	| 'heading'
	| 'image'
	| 'gallery'
	| 'quote'
	| 'code'
	| 'bullet_list'
	| 'ordered_list'
	| 'divider';

export interface Author {
	id: string;
	name: string;
	image: { url: string; publicId: string } | null;
	bio: string | null;
	designation: string | null;
}

export interface Blog {
	id: string;
	title: string;
	slug: string;
	excerpt: string | null;
	cover_image_url: string | null;
	seo_title: string | null;
	seo_description: string | null;
	is_featured: boolean;
	status: BlogStatus;
	published_at: string | null;
	author_id: string | null;
	created_at: string;
	updated_at: string;
}

export interface BlogBlock {
	id: string;
	blog_id: string;
	type: BlogBlockType;
	content: TiptapNode;
	order: number;
	created_at: string;
}

export interface TiptapNode {
	type: string;
	attrs?: Record<string, any>;
	content?: TiptapNode[];
	text?: string;
	marks?: TiptapMark[];
}

export interface TiptapMark {
	type: string;
	attrs?: Record<string, any>;
}

export interface BlogListResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: Blog[];
	count: number;
}

export interface BlogDetailResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: {
		blog: Blog;
		blocks: BlogBlock[];
		author: Author | null;
	};
}

