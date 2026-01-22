import { useEffect, useMemo, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BlogBlock, BlogBlockType, TiptapNode } from '@/types/blog.types';
import { BLOCK_TYPE_LABELS, coerceNodeForBlockType, getDefaultBlockContent, sanitizeTiptapNode, wrapNodeInDoc } from './block-utils';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

const textBlockTypes: BlogBlockType[] = [
	'paragraph',
	'heading',
	'quote',
	'code',
	'bullet_list',
	'ordered_list',
];

function isTextBlock(type: BlogBlockType) {
	return textBlockTypes.includes(type);
}

function getNodeFromEditor(type: BlogBlockType, editor: ReturnType<typeof useEditor>) {
	const doc = editor?.getJSON?.();
	const node = doc?.content?.[0];
	return (node as TiptapNode) ?? getDefaultBlockContent(type);
}

function getImageAttrs(content: TiptapNode) {
	const attrs = (content.attrs as Record<string, unknown>) ?? {};
	return {
		src: typeof attrs.src === 'string' ? attrs.src : '',
		alt: typeof attrs.alt === 'string' ? attrs.alt : '',
	};
}

export default function BlockEditorPanel({
	block,
	onSave,
	onUploadImage,
}: {
	block: BlogBlock;
	onSave: (content: BlogBlock['content']) => Promise<void>;
	onUploadImage: (file: File) => Promise<string>;
}) {
	const [saveState, setSaveState] = useState<SaveState>('idle');
	const lastSavedRef = useRef(JSON.stringify(block.content ?? {}));
	const saveTimerRef = useRef<number | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const editor = useEditor(
		isTextBlock(block.type) ?
			{
				extensions: [
					StarterKit.configure({
						heading: { levels: [2, 3, 4] },
					}),
					Image.configure({ allowBase64: false }),
				],
				content: wrapNodeInDoc(
					coerceNodeForBlockType(block.type, sanitizeTiptapNode(block.content ?? getDefaultBlockContent(block.type)))
				),
				onUpdate: ({ editor }) => {
					const content = coerceNodeForBlockType(block.type, sanitizeTiptapNode(getNodeFromEditor(block.type, editor)));
					debouncedSave(content);
				},
			}
		:	{
				// Some @tiptap/react versions crash when options is null; keep a safe inert editor instance.
				editable: false,
				extensions: [StarterKit],
				content: wrapNodeInDoc(getDefaultBlockContent('paragraph')),
			},
		[block.id, block.type]
	);

	const { debounced: debouncedSave, flush } = useDebouncedCallback(async (content: BlogBlock['content']) => {
		const serialized = JSON.stringify(content);
		if (serialized === lastSavedRef.current) return;

		setSaveState('saving');
		try {
			await onSave(content);
			lastSavedRef.current = serialized;
			setSaveState('saved');
			if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
			saveTimerRef.current = window.setTimeout(() => setSaveState('idle'), 1500);
		} catch {
			setSaveState('error');
		}
	}, 1000);

	useEffect(() => {
		lastSavedRef.current = JSON.stringify(block.content ?? {});
		if (editor && isTextBlock(block.type)) {
			editor.commands.setContent(
				wrapNodeInDoc(
					coerceNodeForBlockType(block.type, sanitizeTiptapNode(block.content ?? getDefaultBlockContent(block.type)))
				),
				{ emitUpdate: false }
			);
		}
		return () => {
			flush();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [block.id]);

	const saveImageBlock = async (attrs: { src: string; alt: string }) => {
		const content = { type: 'image', attrs };
		await onSave(content);
		lastSavedRef.current = JSON.stringify(content);
	};

	const handleImageUpload = async (file: File, mode: 'insert' | 'replace') => {
		const url = await onUploadImage(file);

		if (mode === 'insert') {
			if (editor) {
				editor.chain().focus().setImage({ src: url, alt: '' }).run();
						const content = coerceNodeForBlockType(block.type, sanitizeTiptapNode(getNodeFromEditor(block.type, editor)));
				debouncedSave(content);
			}
			return;
		}

		const attrs = getImageAttrs(block.content);
		await saveImageBlock({ ...attrs, src: url });
	};

	const imageAttrs = useMemo(() => getImageAttrs(block.content), [block.content]);
	const [gallery, setGallery] = useState<{ images: Array<{ url: string; alt?: string }>; layout: string }>(() => {
		if (block.type !== 'gallery') return { images: [], layout: 'grid' };
		const attrs = (block.content as TiptapNode)?.attrs as Record<string, unknown>;
		const images = Array.isArray(attrs?.images) ? (attrs.images as Array<{ url: string; alt?: string }>) : [];
		const layout = typeof attrs?.layout === 'string' ? (attrs.layout as string) : 'grid';
		return { images, layout };
	});

	const handleGalleryChange = (next: { images: Array<{ url: string; alt?: string }>; layout: string }) => {
		setGallery(next);
		debouncedSave({ type: 'gallery', attrs: next });
	};

	if (block.type === 'divider') {
		return (
			<div className='rounded-lg border bg-card p-6'>
				<h3 className='text-lg font-semibold'>Divider block</h3>
				<p className='text-sm text-muted-foreground'>No content needed for dividers.</p>
			</div>
		);
	}

	if (block.type === 'image') {
		return (
			<div className='space-y-4 rounded-lg border bg-card p-6'>
				<div>
					<h3 className='text-lg font-semibold'>Image block</h3>
					<p className='text-sm text-muted-foreground'>Upload an image and set descriptive alt text.</p>
				</div>
				{imageAttrs.src ? (
					<img src={imageAttrs.src} alt={imageAttrs.alt || 'Blog image'} className='max-h-64 w-full rounded-md object-cover' />
				) : (
					<div className='rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground'>
						No image uploaded.
					</div>
				)}
				<div className='space-y-2'>
					<label className='text-sm font-medium'>Alt text</label>
					<Input
						value={imageAttrs.alt}
						onChange={(event) => {
							const next = { ...imageAttrs, alt: event.target.value };
							void saveImageBlock(next);
						}}
					/>
				</div>
				<div className='flex items-center gap-2'>
					<Button type='button' onClick={() => fileInputRef.current?.click()}>
						{imageAttrs.src ? 'Replace image' : 'Upload image'}
					</Button>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						className='hidden'
						onChange={(event) => {
							const file = event.target.files?.[0];
							if (file) {
								void handleImageUpload(file, 'replace');
							}
							event.currentTarget.value = '';
						}}
					/>
				</div>
			</div>
		);
	}

	if (block.type === 'gallery') {
		return (
			<div className='space-y-4 rounded-lg border bg-card p-6'>
				<div>
					<h3 className='text-lg font-semibold'>Gallery block</h3>
					<p className='text-sm text-muted-foreground'>Manage gallery images and layout.</p>
				</div>
				<div className='space-y-2'>
					<label className='text-sm font-medium'>Layout</label>
					<select
						value={gallery.layout}
						onChange={(event) => handleGalleryChange({ ...gallery, layout: event.target.value })}
						className='h-9 w-full rounded-md border bg-background px-3 text-sm'>
						<option value='grid'>Grid</option>
						<option value='carousel'>Carousel</option>
					</select>
				</div>
				<div className='space-y-3'>
					{gallery.images.map((img, index) => (
						<div key={`${img.url}-${index}`} className='rounded-md border p-3'>
							<div className='grid gap-3 md:grid-cols-[120px_1fr]'>
								<img src={img.url} alt={img.alt || 'Gallery image'} className='h-24 w-full rounded object-cover' />
								<div className='space-y-2'>
									<div>
										<label className='text-xs font-medium text-muted-foreground'>Alt text</label>
										<Input
											value={img.alt || ''}
											onChange={(event) => {
												const nextImages = [...gallery.images];
												nextImages[index] = { ...img, alt: event.target.value };
												handleGalleryChange({ ...gallery, images: nextImages });
											}}
										/>
									</div>
									<Button
										type='button'
										variant='destructive'
										size='sm'
										onClick={() => {
											const nextImages = gallery.images.filter((_, i) => i !== index);
											handleGalleryChange({ ...gallery, images: nextImages });
										}}>
										Remove
									</Button>
								</div>
							</div>
						</div>
					))}
					<Button
						type='button'
						variant='outline'
						onClick={() => fileInputRef.current?.click()}>
						Add image
					</Button>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						className='hidden'
						onChange={(event) => {
							const file = event.target.files?.[0];
							if (!file) return;
							void (async () => {
								const url = await onUploadImage(file);
								handleGalleryChange({
									...gallery,
									images: [...gallery.images, { url, alt: '' }],
								});
							})();
							event.currentTarget.value = '';
						}}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-4 rounded-lg border bg-card p-6' onBlur={() => flush()}>
			<div className='flex items-center justify-between'>
				<div>
					<h3 className='text-lg font-semibold'>{BLOCK_TYPE_LABELS[block.type]}</h3>
					<p className='text-sm text-muted-foreground'>Changes save automatically.</p>
				</div>
				{saveState === 'saving' && <span className='text-xs text-muted-foreground'>Saving…</span>}
				{saveState === 'saved' && <span className='text-xs text-muted-foreground'>Saved</span>}
				{saveState === 'error' && <span className='text-xs text-destructive'>Error saving</span>}
			</div>

			<div className='rounded-md border bg-background'>
				<EditorContent editor={editor} className='ppc-prosemirror min-h-[180px] px-3 py-2 text-sm' />
			</div>

			<div className='flex items-center gap-2'>
				{block.type === 'bullet_list' && (
					<Button type='button' variant='outline' onClick={() => void editor?.chain().focus().toggleBulletList().run()}>
						Toggle bullet list
					</Button>
				)}
				{block.type === 'ordered_list' && (
					<Button type='button' variant='outline' onClick={() => void editor?.chain().focus().toggleOrderedList().run()}>
						Toggle ordered list
					</Button>
				)}
				<Button type='button' variant='outline' onClick={() => fileInputRef.current?.click()}>
					Insert image
				</Button>
				<input
					ref={fileInputRef}
					type='file'
					accept='image/*'
					className='hidden'
					onChange={(event) => {
						const file = event.target.files?.[0];
						if (file) {
							void handleImageUpload(file, 'insert');
						}
						event.currentTarget.value = '';
					}}
				/>
			</div>
		</div>
	);
}

