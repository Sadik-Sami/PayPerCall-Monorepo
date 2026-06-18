import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card';
import { useCreateCaseStudy } from '@/hooks/use-case-studies';
import { CaseStudyForm } from '@/components/case-studies/case-study-form';
import { ROUTES } from '@/utils/constants';
import type { CaseStudyFormValues } from '@/schemas/case-study.schema';

export default function CaseStudyCreatePage() {
	const navigate = useNavigate();
	const createMutation = useCreateCaseStudy();

	const handleSubmit = async (values: CaseStudyFormValues) => {
		try {
			await createMutation.mutateAsync({
				title: values.title,
				slug: values.slug || undefined,
				description: values.description,
				category: values.category,
				imageUrl: values.imageUrl || undefined,
				imageAlt: values.imageAlt || undefined,
				accentColor: values.accentColor || undefined,
				link: values.link || undefined,
				displayOrder: values.displayOrder,
				status: 'draft',
			});

			toast.success('Case study created');
			navigate(ROUTES.DASHBOARD_CASE_STUDIES);
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to create case study';
			toast.error(message);
		}
	};

	return (
		<div className="space-y-6 max-w-4xl mx-auto">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Create Case Study</h1>
				<p className="text-muted-foreground">Add a new success story to your portfolio.</p>
			</div>

			<Card className='p-4'>
				<CardHeader>
					<CardTitle>Case Study Details</CardTitle>
					<CardDescription>
						Fill in the primary details below. You can update its publish status later.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CaseStudyForm
						onSubmit={handleSubmit}
						isSubmitting={createMutation.isPending}
						submitLabel={createMutation.isPending ? 'Creating...' : 'Create Case Study'}
						showStatus={false}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
