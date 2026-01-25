import React from 'react';
import Image from 'next/image';
import type { BlogBlock, TiptapNode } from '@/types/blog';
import { renderInlineContent } from './renderInline';

interface BlockRendererProps {
	blocks: BlogBlock[];
}

/**
 * Server-side block renderer for Tiptap JSON content
 * No HTML injection - pure semantic HTML elements
 */
export function BlockRenderer({ blocks }: BlockRendererProps) {
	return (
		<>
			{blocks.map((block) => (
				<div key={block.id}>{renderBlock(block)}</div>
			))}
		</>
	);
}

function renderBlock(block: BlogBlock): React.ReactNode {
	const { type, content } = block;

	// Validate content structure
	if (!content || typeof content !== 'object') {
		console.warn(`Block ${block.id} has invalid content structure`);
		return null;
	}

	switch (type) {
		case 'paragraph':
			return renderParagraph(content);
		case 'heading':
			return renderHeading(content);
		case 'quote':
			return renderBlockquote(content);
		case 'code':
			return renderCodeBlock(content);
		case 'bullet_list':
			return renderBulletList(content);
		case 'ordered_list':
			return renderOrderedList(content);
		case 'divider':
			return renderHorizontalRule();
		case 'image':
			return renderImage(content);
		case 'gallery':
			return renderGallery(content);
		default:
			console.warn(`Unknown block type: ${type}`);
			return null;
	}
}

function renderParagraph(node: TiptapNode): React.ReactNode {
	if (node.type !== 'paragraph') {
		console.warn('Expected paragraph node');
		return null;
	}

	return <p className='mb-4'>{renderInlineContent(node.content)}</p>;
}

function renderHeading(node: TiptapNode): React.ReactNode {
	if (node.type !== 'heading') {
		console.warn('Expected heading node');
		return null;
	}

	const level = node.attrs?.level || 2;
	const content = renderInlineContent(node.content);

	switch (level) {
		case 1:
			return <h1 className='text-4xl font-bold tracking-tight mt-8 mb-4'>{content}</h1>;
		case 2:
			return <h2 className='text-3xl font-semibold tracking-tight mt-8 mb-4'>{content}</h2>;
		case 3:
			return <h3 className='text-2xl font-semibold tracking-tight mt-6 mb-3'>{content}</h3>;
		case 4:
			return <h4 className='text-xl font-semibold tracking-tight mt-6 mb-3'>{content}</h4>;
		case 5:
			return <h5 className='text-lg font-semibold tracking-tight mt-4 mb-2'>{content}</h5>;
		case 6:
			return <h6 className='text-base font-semibold tracking-tight mt-4 mb-2'>{content}</h6>;
		default:
			return <h2 className='text-3xl font-semibold tracking-tight mt-8 mb-4'>{content}</h2>;
	}
}

function renderBlockquote(node: TiptapNode): React.ReactNode {
	if (node.type !== 'blockquote') {
		console.warn('Expected blockquote node');
		return null;
	}

	return (
		<blockquote className='border-l-4 border-primary pl-4 italic text-muted-foreground my-6'>
			{node.content?.map((child, index) => (
				<React.Fragment key={index}>{renderBlockContent(child)}</React.Fragment>
			))}
		</blockquote>
	);
}

function renderCodeBlock(node: TiptapNode): React.ReactNode {
	if (node.type !== 'codeBlock') {
		console.warn('Expected codeBlock node');
		return null;
	}

	const language = node.attrs?.language;
	const code = extractPlainText(node.content);

	return (
		<pre className='bg-muted p-4 rounded-lg overflow-x-auto my-6'>
			<code className='font-mono text-sm' data-language={language || 'plaintext'}>
				{code}
			</code>
		</pre>
	);
}

function renderBulletList(node: TiptapNode): React.ReactNode {
	if (node.type !== 'bulletList') {
		console.warn('Expected bulletList node');
		return null;
	}

	return (
		<ul className='list-disc list-inside space-y-2 my-4'>
			{node.content?.map((item, index) => {
				if (item.type === 'listItem') {
					return <li key={index}>{renderInlineContent(item.content?.[0]?.content)}</li>;
				}
				return null;
			})}
		</ul>
	);
}

function renderOrderedList(node: TiptapNode): React.ReactNode {
	if (node.type !== 'orderedList') {
		console.warn('Expected orderedList node');
		return null;
	}

	const start = node.attrs?.start || 1;

	return (
		<ol className='list-decimal list-inside space-y-2 my-4' start={start}>
			{node.content?.map((item, index) => {
				if (item.type === 'listItem') {
					return <li key={index}>{renderInlineContent(item.content?.[0]?.content)}</li>;
				}
				return null;
			})}
		</ol>
	);
}

function renderHorizontalRule(): React.ReactNode {
	return <hr className='my-8 border-border' />;
}

function renderImage(node: TiptapNode): React.ReactNode {
	if (node.type !== 'image') {
		console.warn('Expected image node');
		return null;
	}

	const src = node.attrs?.src;
	const alt = node.attrs?.alt || '';
	const title = node.attrs?.title;

	if (!src) {
		console.warn('Image node missing src attribute');
		return null;
	}

	return (
		<figure className='my-8'>
			<div className='relative aspect-video w-full overflow-hidden rounded-lg bg-muted'>
				<Image src={src} alt={alt} fill className='object-cover' sizes='(max-width: 768px) 100vw, 896px' />
			</div>
			{title && <figcaption className='text-sm text-muted-foreground text-center mt-2'>{title}</figcaption>}
		</figure>
	);
}

function renderGallery(node: TiptapNode): React.ReactNode {
	if (node.type !== 'gallery') {
		console.warn('Expected gallery node');
		return null;
	}

	const images = node.attrs?.images;
	const layout = node.attrs?.layout || 'grid';

	if (!images || !Array.isArray(images) || images.length === 0) {
		console.warn('Gallery node has no images');
		return null;
	}

	// SSR grid layout (no carousel JS for minimal bundle)
	return (
		<div className='my-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{images.map((img: { url: string; alt?: string }, index: number) => (
					<div key={index} className='relative aspect-video overflow-hidden rounded-lg bg-muted'>
						<Image
							src={img.url}
							alt={img.alt || `Gallery image ${index + 1}`}
							fill
							className='object-cover'
							sizes='(max-width: 768px) 100vw, 50vw'
						/>
					</div>
				))}
			</div>
		</div>
	);
}

// Helper to render nested block content (for blockquotes, list items, etc.)
function renderBlockContent(node: TiptapNode): React.ReactNode {
	if (node.type === 'paragraph') {
		return <p className='mb-2'>{renderInlineContent(node.content)}</p>;
	}
	return renderInlineContent(node.content);
}

// Helper to extract plain text from a node (for code blocks)
function extractPlainText(nodes: TiptapNode[] | undefined): string {
	if (!nodes || nodes.length === 0) {
		return '';
	}

	return nodes
		.map((node) => {
			if (node.type === 'text' && node.text) {
				return node.text;
			}
			if (node.content) {
				return extractPlainText(node.content);
			}
			return '';
		})
		.join('');
}

