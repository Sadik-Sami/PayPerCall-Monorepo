import type { ReactNode } from 'react';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
	id: string;
	children: ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`flex items-start gap-2 ${isDragging ? 'opacity-50' : ''}`}>
			<button
				type='button'
				className='flex-shrink-0 cursor-grab active:cursor-grabbing p-2 hover:bg-muted rounded-md mt-1'
				{...attributes}
				{...listeners}>
				<GripVertical className='h-4 w-4 text-muted-foreground' />
			</button>
			<div className='flex-1'>{children}</div>
		</div>
	);
}

interface SortableListProps<T extends { id: string }> {
	items: T[];
	onReorder: (items: T[]) => void;
	renderItem: (item: T, index: number) => ReactNode;
	keyExtractor?: (item: T) => string;
}

export function SortableList<T extends { id: string }>({
	items,
	onReorder,
	renderItem,
	keyExtractor = (item) => item.id,
}: SortableListProps<T>) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = items.findIndex((item) => keyExtractor(item) === active.id);
			const newIndex = items.findIndex((item) => keyExtractor(item) === over.id);
			const newItems = arrayMove(items, oldIndex, newIndex);
			onReorder(newItems);
		}
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={items.map(keyExtractor)} strategy={verticalListSortingStrategy}>
				<div className='space-y-2'>
					{items.map((item, index) => (
						<SortableItem key={keyExtractor(item)} id={keyExtractor(item)}>
							{renderItem(item, index)}
						</SortableItem>
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
}

export default SortableList;

