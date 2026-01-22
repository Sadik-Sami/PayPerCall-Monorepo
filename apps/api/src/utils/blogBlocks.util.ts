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

/**
 * The stored block `type` is a simplified enum for DB/querying.
 * The stored `content.type` is the raw Tiptap node type (source of truth).
 *
 * These two are NOT always identical:
 * - quote -> blockquote
 * - code -> codeBlock
 * - bullet_list -> bulletList
 * - ordered_list -> orderedList
 * - divider -> horizontalRule
 */
export function expectedTiptapNodeTypeForBlockType(type: BlogBlockType): string {
	switch (type) {
		case 'paragraph':
			return 'paragraph';
		case 'heading':
			return 'heading';
		case 'image':
			return 'image';
		case 'gallery':
			return 'gallery';
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
		default:
			return type;
	}
}

export function validateBlockContentType(params: {
	blockType: BlogBlockType;
	contentType: unknown;
}): { ok: true } | { ok: false; expected: string } {
	const expected = expectedTiptapNodeTypeForBlockType(params.blockType);
	return params.contentType === expected ? { ok: true } : { ok: false, expected };
}


