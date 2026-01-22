import { useNavigate } from 'react-router';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/utils/constants';
import { blogCreateSchema, type BlogCreateInput } from '@/schemas/blog.schema';
import { useCreateBlog } from '@/hooks/use-blogs';

export default function BlogCreatePage() {
	const navigate = useNavigate();
	const createBlog = useCreateBlog();

	const form = useForm<BlogCreateInput>({
		// z.preprocess() inside the schema can widen types to `unknown` for react-hook-form's Resolver
		// even though `BlogCreateInput` is the correct inferred type.
		resolver: zodResolver(blogCreateSchema) as unknown as Resolver<BlogCreateInput>,
		defaultValues: {
			title: '',
			slug: '',
		},
	});

	const onSubmit = async (values: BlogCreateInput) => {
		try {
			const blog = await createBlog.mutateAsync(values);
			toast.success('Blog created');
			navigate(ROUTES.DASHBOARD_BLOG_EDIT(blog.id));
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to create blog';
			toast.error(message);
		}
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>New Blog</h1>
				<p className='text-muted-foreground'>Start a draft and add content blocks.</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Blog details</CardTitle>
					<CardDescription>Title is required. Slug can be set now or later.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder='Blog title' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='slug'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Slug</FormLabel>
										<FormControl>
											<Input placeholder='optional-slug' {...field} value={field.value || ''} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex items-center gap-2'>
								<Button type='submit' disabled={createBlog.isPending}>
									{createBlog.isPending ? 'Creating…' : 'Create blog'}
								</Button>
								<Button type='button' variant='outline' onClick={() => navigate(ROUTES.DASHBOARD_BLOGS)}>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
