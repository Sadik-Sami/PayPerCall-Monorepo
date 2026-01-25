import React from 'react';
import type { TiptapNode, TiptapMark } from '@/types/blog';

/**
 * Render inline text content with marks (bold, italic, underline, strike, code, link)
 * No HTML injection - pure React elements
 */
export function renderInlineContent(nodes: TiptapNode[] | undefined): React.ReactNode {
	if (!nodes || nodes.length === 0) {
		return null;
	}

	return nodes.map((node, index) => renderInlineNode(node, index));
}

function renderInlineNode(node: TiptapNode, index: number): React.ReactNode {
	// Text node with optional marks
	if (node.type === 'text' && node.text !== undefined) {
		return renderTextWithMarks(node.text, node.marks, index);
	}

	// Hard break
	if (node.type === 'hardBreak') {
		return <br key={index} />;
	}

	// If we have nested content, recurse
	if (node.content && node.content.length > 0) {
		return <React.Fragment key={index}>{renderInlineContent(node.content)}</React.Fragment>;
	}

	// Unknown inline node - render nothing
	return null;
}

function renderTextWithMarks(text: string, marks: TiptapMark[] | undefined, key: number): React.ReactNode {
	if (!marks || marks.length === 0) {
		return <React.Fragment key={key}>{text}</React.Fragment>;
	}

	// Apply marks in order: bold, italic, underline, strike, code, link
	let result: React.ReactNode = text;

	// Check for link first (outermost)
	const linkMark = marks.find((m) => m.type === 'link');
	if (linkMark && linkMark.attrs?.href) {
		const href = linkMark.attrs.href;
		const target = linkMark.attrs.target;
		const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

		result = (
			<a href={href} target={target} rel={rel} className='text-primary hover:underline'>
				{result}
			</a>
		);
	}

	// Code mark
	if (marks.some((m) => m.type === 'code')) {
		result = <code className='px-1.5 py-0.5 bg-muted rounded text-sm font-mono'>{result}</code>;
	}

	// Strike
	if (marks.some((m) => m.type === 'strike')) {
		result = <s>{result}</s>;
	}

	// Underline
	if (marks.some((m) => m.type === 'underline')) {
		result = <u>{result}</u>;
	}

	// Italic
	if (marks.some((m) => m.type === 'italic')) {
		result = <em>{result}</em>;
	}

	// Bold (innermost for proper nesting)
	if (marks.some((m) => m.type === 'bold')) {
		result = <strong>{result}</strong>;
	}

	return <React.Fragment key={key}>{result}</React.Fragment>;
}

