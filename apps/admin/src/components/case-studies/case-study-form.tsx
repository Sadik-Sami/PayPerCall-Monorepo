import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caseStudyClientSchema, type CaseStudyFormValues } from '@/schemas/case-study.schema';
import { Button } from '@workspace/ui/components/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from '@workspace/ui/components/form';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@workspace/ui/components/select';
import ImageUpload from '@/components/common/image-upload';

interface CaseStudyFormProps {
	defaultValues?: Partial<CaseStudyFormValues>;
	onSubmit: (values: CaseStudyFormValues) => Promise<void>;
	isSubmitting: boolean;
	submitLabel: string;
	showStatus?: boolean;
}

const CATEGORY_OPTIONS = [
	{ value: 'pay-per-call', label: 'Pay Per Call' },
	{ value: 'pay-per-lead', label: 'Pay Per Lead' },
	{ value: 'digital-marketing', label: 'Digital Marketing' },
	{ value: 'app-dev', label: 'App Dev' },
	{ value: 'cms', label: 'CMS' },
	{ value: 'web-dev', label: 'Web Dev' },
	{ value: 'hire-call-center', label: 'Hire Call Center' },
] as const;

const ACCENT_OPTIONS = [
	{ value: 'pastel-peach', label: 'Peach' },
	{ value: 'pastel-lilac', label: 'Lilac' },
	{ value: 'pastel-lime', label: 'Lime' },
	{ value: 'pastel-mint', label: 'Mint' },
	{ value: 'pastel-sky', label: 'Sky' },
	{ value: 'pastel-blush', label: 'Blush' },
] as const;

const STATUS_OPTIONS = [
	{ value: 'draft', label: 'Draft' },
	{ value: 'published', label: 'Published' },
	{ value: 'archived', label: 'Archived' },
] as const;

export function CaseStudyForm({
	defaultValues,
	onSubmit,
	isSubmitting,
	submitLabel,
	showStatus = false,
}: CaseStudyFormProps) {
	const form = useForm<CaseStudyFormValues>({
		resolver: zodResolver(caseStudyClientSchema) as unknown as Resolver<CaseStudyFormValues>,
		defaultValues: {
			title: '',
			slug: '',
			description: '',
			category: undefined,
			imageUrl: '',
			imageAlt: '',
			accentColor: null,
			link: '',
			displayOrder: 0,
			status: 'draft',
			...defaultValues,
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid gap-6 md:grid-cols-2">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Enter case study title" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Slug</FormLabel>
								<FormControl>
									<Input placeholder="auto-generated-from-title" {...field} />
								</FormControl>
								<FormDescription>Leave blank to auto-generate</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="md:col-span-2">
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Brief overview of the case study"
										className="min-h-[100px] resize-y"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{CATEGORY_OPTIONS.map((opt) => (
											<SelectItem key={opt.value} value={opt.value}>
												{opt.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="link"
						render={({ field }) => (
							<FormItem>
								<FormLabel>External Link</FormLabel>
								<FormControl>
									<Input placeholder="https://example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="accentColor"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Accent Color</FormLabel>
								<Select
									onValueChange={(val) => field.onChange(val || null)}
									defaultValue={field.value || undefined}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Auto-rotate based on list position" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="none">Auto-rotate (Default)</SelectItem>
										{ACCENT_OPTIONS.map((opt) => (
											<SelectItem key={opt.value} value={opt.value}>
												{opt.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="displayOrder"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Display Order</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) => field.onChange(e.target.valueAsNumber)}
									/>
								</FormControl>
								<FormDescription>Lower numbers appear first</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					{showStatus && (
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{STATUS_OPTIONS.map((opt) => (
												<SelectItem key={opt.value} value={opt.value}>
													{opt.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

					<div className="md:col-span-2 space-y-4">
						<FormLabel>Cover Image</FormLabel>
						<ImageUpload
							value={form.watch('imageUrl')}
							alt={form.watch('imageAlt')}
							folder="case-studies"
							onChange={(next) => {
								form.setValue('imageUrl', next?.url || '');
								form.setValue('imageAlt', next?.alt || '');
							}}
							disabled={isSubmitting}
						/>
					</div>
				</div>

				<div className="flex justify-end pt-4">
					<Button type="submit" disabled={isSubmitting}>
						{submitLabel}
					</Button>
				</div>
			</form>
		</Form>
	);
}
