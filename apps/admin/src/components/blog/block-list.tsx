import { useMemo, useState } from 'react';
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import type { BlogBlock, BlogBlockType } from '@/types/blog.types';
import { BLOCK_TYPE_LABELS, extractTextFromNode } from './block-utils';
import { GripVertical } from 'lucide-react';

interface BlockListProps {
	blocks: BlogBlock[];
	activeBlockId?: string | null;
	onSelect: (blockId: string) => void;
	onReorder: (orderedIds: string[]) => void;
	onCreate: (type: BlogBlockType) => void;
	onDelete: (blockId: string) => void;
	isReordering?: boolean;
	isCreating?: boolean;
}

function SortableBlockItem({
	block,
	isActive,
	onSelect,
	onDelete,
}: {
	block: BlogBlock;
	isActive: boolean;
	onSelect: (blockId: string) => void;
	onDelete: (blockId: string) => void;
}) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.6 : 1,
	};

	const summary = useMemo(() => {
		if (block.type === 'image') return 'Image';
		if (block.type === 'gallery') return 'Gallery';
		if (block.type === 'divider') return 'Divider';
		return extractTextFromNode(block.content) || 'Empty';
	}, [block]);

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`rounded-md border p-3 ${isActive ? 'border-primary bg-primary/5' : 'bg-card'}`}>
			<div className='flex items-center justify-between gap-2'>
				<div className='flex flex-1 items-start gap-2'>
					<button
						type='button'
						className='mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-muted-foreground'
						aria-label='Drag block'
						{...attributes}
						{...listeners}>
						<GripVertical className='h-4 w-4' />
					</button>
					<button type='button' className='flex-1 text-left' onClick={() => onSelect(block.id)}>
					<div className='text-xs text-muted-foreground'>{BLOCK_TYPE_LABELS[block.type]}</div>
					<div className='line-clamp-2 text-sm'>{summary}</div>
					</button>
				</div>
				<Button variant='ghost' size='sm' onClick={() => onDelete(block.id)}>
					Delete
				</Button>
			</div>
		</div>
	);
}

export default function BlockList({
	blocks,
	activeBlockId,
	onSelect,
	onReorder,
	onCreate,
	onDelete,
	isReordering,
	isCreating,
}: BlockListProps) {
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);
	const [newType, setNewType] = useState<BlogBlockType | ''>('');

	const blockIds = useMemo(() => blocks.map((block) => block.id), [blocks]);

	const handleCreate = (type: BlogBlockType) => {
		onCreate(type);
		setNewType('');
	};

	return (
		<div className='space-y-3'>
			<div className='flex items-center gap-2'>
				<select
					value={newType}
					onChange={(event) => {
						const value = event.target.value as BlogBlockType;
						if (value) handleCreate(value);
					}}
					className='h-9 w-full rounded-md border bg-background px-3 text-sm'
					disabled={isCreating}>
					<option value=''>Add block…</option>
					{(Object.keys(BLOCK_TYPE_LABELS) as BlogBlockType[]).map((type) => (
						<option key={type} value={type}>
							{BLOCK_TYPE_LABELS[type]}
						</option>
					))}
				</select>
				{isCreating && <span className='text-xs text-muted-foreground'>Adding…</span>}
			</div>

			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
				if (!over || active.id === over.id) return;
				const oldIndex = blockIds.indexOf(String(active.id));
				const newIndex = blockIds.indexOf(String(over.id));
				if (oldIndex === -1 || newIndex === -1) return;
				const ordered = arrayMove(blockIds, oldIndex, newIndex);
				onReorder(ordered);
			}}>
				<SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
					<div className='space-y-3'>
						{blocks.map((block) => (
							<SortableBlockItem
								key={block.id}
								block={block}
								isActive={block.id === activeBlockId}
								onSelect={onSelect}
								onDelete={onDelete}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>

			{isReordering && <div className='text-xs text-muted-foreground'>Saving order…</div>}
		</div>
	);
}

