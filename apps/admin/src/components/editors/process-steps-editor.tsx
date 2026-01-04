import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { SortableList } from './sortable-list';
import type { ProcessStep } from '@/types/web-dev-services.types';

interface ProcessStepsEditorProps {
	value: ProcessStep[];
	onChange: (value: ProcessStep[]) => void;
}

export function ProcessStepsEditor({ value, onChange }: ProcessStepsEditorProps) {
	const handleAdd = () => {
		const newStep: ProcessStep & { id: string } = {
			id: crypto.randomUUID(),
			step: value.length + 1,
			title: '',
			description: '',
			icon: '',
		};
		onChange([...value.map((s, i) => ({ ...s, id: (s as any).id || `step-${i}` })), newStep]);
	};

	const handleUpdate = (index: number, field: keyof ProcessStep, fieldValue: string | number) => {
		const newSteps = [...value];
		newSteps[index] = { ...newSteps[index], [field]: fieldValue };
		onChange(newSteps);
	};

	const handleRemove = (index: number) => {
		const newSteps = value
			.filter((_, i) => i !== index)
			.map((step, i) => ({ ...step, step: i + 1 })); // Renumber steps
		onChange(newSteps);
	};

	const handleReorder = (newItems: Array<ProcessStep & { id: string }>) => {
		// Update step numbers after reorder
		const renumbered = newItems.map((item, index) => ({
			...item,
			step: index + 1,
		}));
		onChange(renumbered);
	};

	// Ensure all items have IDs for drag and drop
	const itemsWithIds = value.map((s, i) => ({
		...s,
		id: (s as any).id || `step-${i}`,
	}));

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<Label>Process Steps</Label>
				<Button type='button' variant='outline' size='sm' onClick={handleAdd}>
					<Plus className='h-4 w-4 mr-1' />
					Add Step
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
									<div className='flex items-center gap-3 flex-1'>
										<div className='flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm'>
											{item.step}
										</div>
										<div className='flex-1 space-y-3'>
											<div className='grid grid-cols-2 gap-3'>
												<div className='space-y-1'>
													<Label className='text-xs'>Title</Label>
													<Input
														value={item.title}
														onChange={(e) => handleUpdate(index, 'title', e.target.value)}
														placeholder='Step title'
													/>
												</div>
												<div className='space-y-1'>
													<Label className='text-xs'>Icon (Lucide name)</Label>
													<Input
														value={item.icon || ''}
														onChange={(e) => handleUpdate(index, 'icon', e.target.value)}
														placeholder='e.g., FileSearch, Code, Rocket'
													/>
												</div>
											</div>
											<div className='space-y-1'>
												<Label className='text-xs'>Description</Label>
												<textarea
													value={item.description}
													onChange={(e) => handleUpdate(index, 'description', e.target.value)}
													placeholder='What happens in this step'
													className='flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
												/>
											</div>
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
					No process steps added yet. Click "Add Step" to get started.
				</div>
			)}
		</div>
	);
}

export default ProcessStepsEditor;

