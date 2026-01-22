import type { BlogBlockType, TiptapNode } from '@/types/blog.types';

export const BLOCK_TYPE_LABELS: Record<BlogBlockType, string> = {
	paragraph: 'Paragraph',
	heading: 'Heading',
	image: 'Image',
	gallery: 'Gallery',
	quote: 'Quote',
	code: 'Code',
	bullet_list: 'Bullet list',
	ordered_list: 'Ordered list',
	divider: 'Divider',
};

export function getDefaultBlockContent(type: BlogBlockType): TiptapNode {
	switch (type) {
		case 'heading':
			return { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Heading' }] };
		case 'quote':
			return { type: 'blockquote', content: [{ type: 'text', text: 'Quote' }] };
		case 'code':
			// ProseMirror disallows empty text nodes (text: '').
			// Empty code blocks are valid with no text nodes.
			return { type: 'codeBlock' };
		case 'bullet_list':
			return {
				type: 'bulletList',
				content: [{ type: 'listItem', content: [{ type: 'paragraph' }] }],
			};
		case 'ordered_list':
			return {
				type: 'orderedList',
				content: [{ type: 'listItem', content: [{ type: 'paragraph' }] }],
			};
		case 'divider':
			return { type: 'horizontalRule' };
		case 'image':
			return { type: 'image', attrs: { src: '', alt: '' } };
		case 'gallery':
			return { type: 'gallery', attrs: { images: [], layout: 'grid' } };
		case 'paragraph':
		default:
			// Empty paragraphs are valid without empty text nodes.
			return { type: 'paragraph' };
	}
}

export function wrapNodeInDoc(node: TiptapNode) {
	return { type: 'doc', content: [node] };
}

export function sanitizeTiptapNode(node: TiptapNode): TiptapNode {
	// Remove invalid empty text nodes that ProseMirror rejects (RangeError: Empty text nodes are not allowed)
	if (node.type === 'text' && typeof node.text === 'string' && node.text.length === 0) {
		// Returning an empty paragraph is always safe at block level,
		// but at inline level we can safely drop this node via parent filtering.
		return { type: 'text', text: ' ' };
	}

	const content = Array.isArray(node.content) ? node.content : undefined;
	if (!content) return node;

	const nextContent = content
		.filter((child) => {
			if (!child || typeof child !== 'object') return false;
			const c = child as TiptapNode;
			return !(c.type === 'text' && typeof c.text === 'string' && c.text.length === 0);
		})
		.map((child) => sanitizeTiptapNode(child as TiptapNode));

	return { ...node, content: nextContent };
}

export function expectedNodeTypeForBlockType(type: BlogBlockType): string {
	switch (type) {
		case 'paragraph':
			return 'paragraph';
		case 'heading':
			return 'heading';
		case 'quote':
			return 'blockquote';
		case 'code':
			return 'codeBlock';
		case 'bullet_list':
			return 'bulletList';
		case 'ordered_list':
			return 'orderedList';
		case 'divider':
			return 'horizontalRule';
		case 'image':
			return 'image';
		case 'gallery':
			return 'gallery';
		default:
			return type;
	}
}

function wrapTextInParagraph(text: string): TiptapNode {
	const trimmed = text.trim();
	if (!trimmed) return { type: 'paragraph' };
	return { type: 'paragraph', content: [{ type: 'text', text: trimmed }] };
}

export function coerceNodeForBlockType(type: BlogBlockType, node: TiptapNode): TiptapNode {
	const expected = expectedNodeTypeForBlockType(type);
	if (node.type === expected) return node;

	const text = extractTextFromNode(node);

	// Lists: if user ended up with a paragraph, wrap the text into a single list item.
	if (type === 'bullet_list') {
		return {
			type: 'bulletList',
			content: [{ type: 'listItem', content: [wrapTextInParagraph(text)] }],
		};
	}
	if (type === 'ordered_list') {
		return {
			type: 'orderedList',
			content: [{ type: 'listItem', content: [wrapTextInParagraph(text)] }],
		};
	}

	// Quote/code/heading: preserve text best-effort.
	if (type === 'quote') {
		return { type: 'blockquote', content: [wrapTextInParagraph(text)] };
	}
	if (type === 'code') {
		return text.trim() ? { type: 'codeBlock', content: [{ type: 'text', text }] } : { type: 'codeBlock' };
	}
	if (type === 'heading') {
		return text.trim()
			? { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: text.trim() }] }
			: { type: 'heading', attrs: { level: 2 } };
	}

	// Paragraph fallback
	if (type === 'paragraph') {
		return wrapTextInParagraph(text);
	}

	// Divider/image/gallery should never get here from the rich-text editor, but keep it safe.
	return getDefaultBlockContent(type);
}

export function extractTextFromNode(node: TiptapNode): string {
	if (!node) return '';

	const text = typeof node.text === 'string' ? node.text : '';
	const content = Array.isArray(node.content) ? node.content : [];
	if (text) return text;

	for (const child of content) {
		if (typeof child === 'object' && child) {
			const childText = extractTextFromNode(child as TiptapNode);
			if (childText) return childText;
		}
	}

	return '';
}

