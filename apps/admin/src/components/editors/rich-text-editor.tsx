import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
	Bold,
	Italic,
	Strikethrough,
	Code,
	List,
	ListOrdered,
	Quote,
	Undo,
	Redo,
	Link as LinkIcon,
	Image as ImageIcon,
	Heading1,
	Heading2,
	Heading3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect } from 'react';

interface RichTextEditorProps {
	content: string;
	onChange: (content: string) => void;
	placeholder?: string;
	onImageUpload?: () => Promise<string | undefined>;
}

const MenuBar = ({
	editor,
	onImageUpload,
}: {
	editor: Editor | null;
	onImageUpload?: () => Promise<string | undefined>;
}) => {
	if (!editor) return null;

	const addLink = useCallback(() => {
		const url = window.prompt('Enter URL:');
		if (url) {
			editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
		}
	}, [editor]);

	const addImage = useCallback(async () => {
		if (onImageUpload) {
			const url = await onImageUpload();
			if (url) {
				editor.chain().focus().setImage({ src: url }).run();
			}
		} else {
			const url = window.prompt('Enter image URL:');
			if (url) {
				editor.chain().focus().setImage({ src: url }).run();
			}
		}
	}, [editor, onImageUpload]);

	return (
		<div className='flex flex-wrap gap-1 border-b border-border p-2 bg-muted/30'>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}>
				<Heading1 className='h-4 w-4' />
			</Button>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}>
				<Heading2 className='h-4 w-4' />
			</Button>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				className={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}>
				<Heading3 className='h-4 w-4' />
			</Button>
			<div className='w-px bg-border mx-1' />
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={editor.isActive('bold') ? 'bg-muted' : ''}>
				<Bold className='h-4 w-4' />
			</Button>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={editor.isActive('italic') ? 'bg-muted' : ''}>
				<Italic className='h-4 w-4' />
			</Button>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().toggleStrike().run()}
				className={editor.isActive('strike') ? 'bg-muted' : ''}>
				<Strikethrough className='h-4 w-4' />
			</Button>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().toggleCode().run()}
				className={editor.isActive('code') ? 'bg-muted' : ''}>
				<Code className='h-4 w-4' />
			</Button>
			<div className='w-px bg-border mx-1' />
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={editor.isActive('bulletList') ? 'bg-muted' : ''}>
				<List className='h-4 w-4' />
			</Button>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={editor.isActive('orderedList') ? 'bg-muted' : ''}>
				<ListOrdered className='h-4 w-4' />
			</Button>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={editor.isActive('blockquote') ? 'bg-muted' : ''}>
				<Quote className='h-4 w-4' />
			</Button>
			<div className='w-px bg-border mx-1' />
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={addLink}
				className={editor.isActive('link') ? 'bg-muted' : ''}>
				<LinkIcon className='h-4 w-4' />
			</Button>
			<Button type='button' variant='ghost' size='sm' onClick={addImage}>
				<ImageIcon className='h-4 w-4' />
			</Button>
			<div className='w-px bg-border mx-1' />
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().undo()}>
				<Undo className='h-4 w-4' />
			</Button>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().redo()}>
				<Redo className='h-4 w-4' />
			</Button>
		</div>
	);
};

export function RichTextEditor({ content, onChange, placeholder, onImageUpload }: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
			}),
			Image.configure({
				HTMLAttributes: {
					class: 'max-w-full h-auto rounded-lg',
				},
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: 'text-primary underline',
				},
			}),
			Placeholder.configure({
				placeholder: placeholder || 'Start writing...',
			}),
		],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: 'prose prose-sm dark:prose-invert max-w-none p-4 min-h-[200px] focus:outline-none',
			},
		},
	});

	// Update editor content when prop changes
	useEffect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content);
		}
	}, [content, editor]);

	return (
		<div className='border border-input rounded-md overflow-hidden bg-background'>
			<MenuBar editor={editor} onImageUpload={onImageUpload} />
			<EditorContent editor={editor} />
		</div>
	);
}

export default RichTextEditor;

