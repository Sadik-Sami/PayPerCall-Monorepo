import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card';
import Loading from '@/components/common/loading';
import { useCaseStudy, useUpdateCaseStudy, useDeleteCaseStudy } from '@/hooks/use-case-studies';
import { CaseStudyForm } from '@/components/case-studies/case-study-form';
import { CaseStudyDeleteDialog } from '@/components/case-studies/case-study-delete-dialog';
import { ROUTES } from '@/utils/constants';
import type { CaseStudyFormValues } from '@/schemas/case-study.schema';

export default function CaseStudyEditPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const caseStudyId = id ?? '';

	const { data: caseStudy, isLoading } = useCaseStudy(caseStudyId);
	const updateMutation = useUpdateCaseStudy();
	const deleteMutation = useDeleteCaseStudy();

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const handleSubmit = async (values: CaseStudyFormValues) => {
		try {
			await updateMutation.mutateAsync({
				id: caseStudyId,
				payload: {
					title: values.title,
					slug: values.slug || undefined,
					description: values.description,
					category: values.category,
					imageUrl: values.imageUrl || undefined,
					imageAlt: values.imageAlt || undefined,
					accentColor: values.accentColor || undefined,
					link: values.link || undefined,
					displayOrder: values.displayOrder,
					status: values.status,
				},
			});
			toast.success('Case study updated');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to update case study';
			toast.error(message);
		}
	};

	const handleDelete = async () => {
		try {
			await deleteMutation.mutateAsync(caseStudyId);
			toast.success('Case study deleted');
			navigate(ROUTES.DASHBOARD_CASE_STUDIES);
		} catch (error) {
			toast.error('Failed to delete case study');
		}
	};

	if (!caseStudyId) {
		return <div className="text-sm text-muted-foreground">Invalid case study id.</div>;
	}

	if (isLoading) {
		return <Loading message="Loading case study…" />;
	}

	if (!caseStudy) {
		return <div className="text-sm text-muted-foreground">Case study not found.</div>;
	}

	return (
		<div className="space-y-6 max-w-4xl mx-auto">
			<div className="flex items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Edit Case Study</h1>
					<p className="text-muted-foreground">Update details and publish status.</p>
				</div>
				<Button
					variant="destructive"
					onClick={() => setShowDeleteDialog(true)}
					disabled={deleteMutation.isPending}
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Delete
				</Button>
			</div>

			<Card className='p-4'>
				<CardHeader>
					<CardTitle>Case Study Details</CardTitle>
					<CardDescription>
						Make changes to the case study information below.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CaseStudyForm
						defaultValues={{
							title: caseStudy.title,
							slug: caseStudy.slug || '',
							description: caseStudy.description,
							category: caseStudy.category,
							imageUrl: caseStudy.image_url || '',
							imageAlt: caseStudy.image_alt || '',
							accentColor: caseStudy.accent_color,
							link: caseStudy.link || '',
							displayOrder: caseStudy.display_order,
							status: caseStudy.status,
						}}
						onSubmit={handleSubmit}
						isSubmitting={updateMutation.isPending}
						submitLabel={updateMutation.isPending ? 'Saving...' : 'Save Changes'}
						showStatus={true}
					/>
				</CardContent>
			</Card>

			<CaseStudyDeleteDialog
				open={showDeleteDialog}
				onOpenChange={setShowDeleteDialog}
				onConfirm={handleDelete}
				isDeleting={deleteMutation.isPending}
			/>
		</div>
	);
}
