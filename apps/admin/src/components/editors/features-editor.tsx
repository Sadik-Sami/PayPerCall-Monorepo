import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { SortableList } from './sortable-list';
import type { Feature } from '@/types/web-dev-services.types';

interface FeaturesEditorProps {
	value: Feature[];
	onChange: (value: Feature[]) => void;
}

export function FeaturesEditor({ value, onChange }: FeaturesEditorProps) {
	const handleAdd = () => {
		const newFeature: Feature & { id: string } = {
			id: crypto.randomUUID(),
			title: '',
			description: '',
			icon: '',
		};
		onChange([...value.map((f, i) => ({ ...f, id: (f as any).id || `feature-${i}` })), newFeature]);
	};

	const handleUpdate = (index: number, field: keyof Feature, fieldValue: string) => {
		const newFeatures = [...value];
		newFeatures[index] = { ...newFeatures[index], [field]: fieldValue };
		onChange(newFeatures);
	};

	const handleRemove = (index: number) => {
		const newFeatures = value.filter((_, i) => i !== index);
		onChange(newFeatures);
	};

	const handleReorder = (newItems: Array<Feature & { id: string }>) => {
		onChange(newItems);
	};

	// Ensure all items have IDs for drag and drop
	const itemsWithIds = value.map((f, i) => ({
		...f,
		id: (f as any).id || `feature-${i}`,
	}));

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<Label>Features</Label>
				<Button type='button' variant='outline' size='sm' onClick={handleAdd}>
					<Plus className='h-4 w-4 mr-1' />
					Add Feature
				</Button>
			</div>

			{itemsWithIds.length > 0 ? (
				<SortableList
					items={itemsWithIds}
					onReorder={handleReorder}
					renderItem={(item, index) => (
						<Card className='bg-muted/30'>
							<CardContent className='p-4 space-y-3'>
								<div className='flex items-start justify-between gap-2'>
									<div className='flex-1 space-y-3'>
										<div className='grid grid-cols-2 gap-3'>
											<div className='space-y-1'>
												<Label className='text-xs'>Title</Label>
												<Input
													value={item.title}
													onChange={(e) => handleUpdate(index, 'title', e.target.value)}
													placeholder='Feature title'
												/>
											</div>
											<div className='space-y-1'>
												<Label className='text-xs'>Icon (Lucide name)</Label>
												<Input
													value={item.icon || ''}
													onChange={(e) => handleUpdate(index, 'icon', e.target.value)}
													placeholder='e.g., Zap, Shield, Clock'
												/>
											</div>
										</div>
										<div className='space-y-1'>
											<Label className='text-xs'>Description</Label>
											<textarea
												value={item.description}
												onChange={(e) => handleUpdate(index, 'description', e.target.value)}
												placeholder='Feature description'
												className='flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
											/>
										</div>
									</div>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='text-destructive hover:text-destructive/90'
										onClick={() => handleRemove(index)}>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>
							</CardContent>
						</Card>
					)}
				/>
			) : (
				<div className='border border-dashed border-border rounded-lg p-8 text-center text-muted-foreground'>
					No features added yet. Click "Add Feature" to get started.
				</div>
			)}
		</div>
	);
}

export default FeaturesEditor;

