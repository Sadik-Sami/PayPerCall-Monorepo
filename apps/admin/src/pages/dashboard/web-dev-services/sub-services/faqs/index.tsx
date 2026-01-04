import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { webDevServicesApi } from '@/services/web-dev-services.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { SortableList } from '@/components/editors/sortable-list';
import { RichTextEditor } from '@/components/editors/rich-text-editor';
import type { FAQItem, UpdateWebDevSubServiceInput } from '@/types/web-dev-services.types';

interface FAQFormData extends FAQItem {
	isEditing?: boolean;
}

export default function FAQsPage() {
	const { id, subId } = useParams<{ id: string; subId: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [faqs, setFaqs] = useState<FAQFormData[]>([]);
	const [editingFaq, setEditingFaq] = useState<FAQFormData | null>(null);
	const [hasChanges, setHasChanges] = useState(false);

	const { data: subService, isLoading } = useQuery({
		queryKey: ['web-dev-sub-service', subId],
		queryFn: () => webDevServicesApi.getSubServiceById(subId!),
		enabled: !!subId,
	});

	useEffect(() => {
		if (subService?.faqs) {
			setFaqs(subService.faqs);
		}
	}, [subService]);

	const updateMutation = useMutation({
		mutationFn: (data: UpdateWebDevSubServiceInput) => webDevServicesApi.updateSubService(subId!, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['web-dev-sub-service', subId] });
			toast.success('FAQs saved successfully');
			setHasChanges(false);
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || 'Failed to save FAQs');
		},
	});

	const handleSaveAll = () => {
		updateMutation.mutate({ faqs: faqs.length > 0 ? faqs : undefined });
	};

	const handleAddFaq = () => {
		const newFaq: FAQFormData = {
			id: crypto.randomUUID(),
			question: '',
			answer: '',
			isEditing: true,
		};
		setEditingFaq(newFaq);
	};

	const handleSaveFaq = () => {
		if (!editingFaq || !editingFaq.question.trim() || !editingFaq.answer.trim()) {
			toast.error('Please fill in both question and answer');
			return;
		}

		const existingIndex = faqs.findIndex((f) => f.id === editingFaq.id);
		if (existingIndex >= 0) {
			const newFaqs = [...faqs];
			newFaqs[existingIndex] = { ...editingFaq, isEditing: false };
			setFaqs(newFaqs);
		} else {
			setFaqs([...faqs, { ...editingFaq, isEditing: false }]);
		}
		setEditingFaq(null);
		setHasChanges(true);
	};

	const handleEditFaq = (faq: FAQFormData) => {
		setEditingFaq({ ...faq });
	};

	const handleDeleteFaq = (faqId: string) => {
		if (!confirm('Are you sure you want to delete this FAQ?')) return;
		setFaqs(faqs.filter((f) => f.id !== faqId));
		setHasChanges(true);
	};

	const handleReorder = (reorderedFaqs: FAQFormData[]) => {
		setFaqs(reorderedFaqs);
		setHasChanges(true);
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() =>
							navigate(
								ROUTES.DASHBOARD_WEB_DEV_SUB_SERVICES_EDIT.replace(':id', id!).replace(':subId', subId!)
							)
						}>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back
					</Button>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>FAQs</h1>
						<p className='text-muted-foreground'>
							Manage frequently asked questions for {subService?.title || 'this sub-service'}.
						</p>
					</div>
				</div>
				<div className='flex gap-2'>
					<Button variant='outline' onClick={handleAddFaq}>
						<Plus className='mr-2 h-4 w-4' />
						Add FAQ
					</Button>
					{hasChanges && (
						<Button onClick={handleSaveAll} disabled={updateMutation.isPending}>
							{updateMutation.isPending ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Saving...
								</>
							) : (
								'Save All Changes'
							)}
						</Button>
					)}
				</div>
			</div>

			{/* Edit/Create Form */}
			{editingFaq && (
				<Card>
					<CardHeader>
						<CardTitle>{faqs.some((f) => f.id === editingFaq.id) ? 'Edit FAQ' : 'New FAQ'}</CardTitle>
						<CardDescription>
							{faqs.some((f) => f.id === editingFaq.id)
								? 'Update question and answer.'
								: 'Create a new FAQ entry.'}
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<Label>Question *</Label>
							<Input
								value={editingFaq.question}
								onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
								placeholder='What is the question?'
							/>
						</div>
						<div className='space-y-2'>
							<Label>Answer *</Label>
							<RichTextEditor
								content={editingFaq.answer}
								onChange={(value) => setEditingFaq({ ...editingFaq, answer: value })}
								placeholder='Provide a comprehensive answer...'
							/>
						</div>
						<div className='flex justify-end gap-2'>
							<Button variant='outline' onClick={() => setEditingFaq(null)}>
								Cancel
							</Button>
							<Button onClick={handleSaveFaq}>
								{faqs.some((f) => f.id === editingFaq.id) ? 'Update FAQ' : 'Add FAQ'}
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* FAQs List */}
			{faqs.length > 0 ? (
				<div className='space-y-4'>
					{hasChanges && (
						<div className='bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-500 px-4 py-2 rounded-md text-sm'>
							You have unsaved changes. Click "Save All Changes" to persist your changes.
						</div>
					)}
					<SortableList
						items={faqs}
						onReorder={handleReorder}
						renderItem={(faq, index) => (
							<Card>
								<CardContent className='p-4'>
									<div className='flex items-start justify-between'>
										<div className='flex-1'>
											<div className='flex items-center gap-2'>
												<span className='flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium'>
													{index + 1}
												</span>
												<h3 className='font-medium'>{faq.question || 'No question'}</h3>
											</div>
											<div
												className='text-sm text-muted-foreground mt-2 prose prose-sm dark:prose-invert max-w-none line-clamp-2'
												dangerouslySetInnerHTML={{ __html: faq.answer || 'No answer' }}
											/>
										</div>
										<div className='flex gap-2 ml-4'>
											<Button variant='ghost' size='sm' onClick={() => handleEditFaq(faq)}>
												Edit
											</Button>
											<Button variant='ghost' size='sm' onClick={() => handleDeleteFaq(faq.id)}>
												<Trash2 className='h-4 w-4 text-destructive' />
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						)}
					/>
				</div>
			) : (
				!editingFaq && (
					<Card>
						<CardContent className='py-12 text-center'>
							<p className='text-muted-foreground mb-4'>No FAQs yet.</p>
							<Button onClick={handleAddFaq}>
								<Plus className='mr-2 h-4 w-4' />
								Add First FAQ
							</Button>
						</CardContent>
					</Card>
				)
			)}
		</div>
	);
}

