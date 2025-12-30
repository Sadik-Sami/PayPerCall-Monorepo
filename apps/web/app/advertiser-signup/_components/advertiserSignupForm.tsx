'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { toast } from 'sonner';
import {
	User,
	Building2,
	Mail,
	Phone,
	MessageSquare,
	Link as LinkIcon,
	Target,
	Loader2,
	ArrowRight,
} from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

const campaigns = [
	'ACA Obamacare',
	'Medicare',
	'Motor Vehicle Accidents',
	'U65 Health Insurance',
	'Tax Debt Settlement',
	'Mass Tort',
	'Home Security',
	'Auto Warranty',
	'Solar',
	'Debt Settlement',
	'Mortgage',
	'Other',
] as const;

const leadGenerationMethods = [
	'Email',
	'SMS',
	'Voice Broadcasting',
	'Ring-less Voicemail',
	'Call Center/Telemarketing',
	'Social Media Ads',
	'SEO',
	'Search Ads (Google, Bing)',
	'YouTube',
	'TV/Radio',
	'Print Ads',
	'Other',
] as const;

const messengerTypes = ['Skype', 'WhatsApp', 'Telegram', 'Slack', 'Discord', 'Microsoft Teams', 'Other'] as const;

const formSchema = z.object({
	primaryContactName: z.string().trim().min(2, 'Name is required'),
	companyName: z.string().trim().min(2, 'Company name is required'),
	email: z.string().trim().email('Invalid email address'),
	phoneNumber: z.string().trim().min(10, 'Valid phone number required'),
	messengerType: z.string().optional(),
	messengerScreenName: z.string().trim().max(100).optional(),
	campaigns: z.array(z.string()).min(1, 'Select at least one campaign'),
	otherCampaigns: z.string().trim().max(500).optional(),
	leadGenerationMethods: z.array(z.string()).min(1, 'Select at least one method'),
	otherLeadGeneration: z.string().trim().max(500).optional(),
	leadsPerWeek: z.string().trim().min(1, 'Estimated volume is required'),
	additionalInfo: z.string().trim().max(2000).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AdvertiserSignupForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			primaryContactName: '',
			companyName: '',
			email: '',
			phoneNumber: '',
			messengerType: '',
			messengerScreenName: '',
			campaigns: [],
			otherCampaigns: '',
			leadGenerationMethods: [],
			otherLeadGeneration: '',
			leadsPerWeek: '',
			additionalInfo: '',
		},
	});

	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true);
		console.log('Form submitted:', data);
		// Simulate network request
		await new Promise((resolve) => setTimeout(resolve, 1500));
		toast.success('Application Submitted Successfully!');
		setIsSubmitting(false);
	};

	return (
		<Card className='w-full border-border shadow-xl bg-card/50 backdrop-blur-sm'>
			<CardHeader className='space-y-1 border-b bg-muted/20 pb-8'>
				<CardTitle className='text-2xl font-bold'>Affiliate Application</CardTitle>
				<CardDescription>Complete the details below. Our team reviews applications daily.</CardDescription>
			</CardHeader>
			<CardContent className='pt-8'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
						{/* Contact Information Section */}
						<section className='space-y-6'>
							<div className='flex items-center gap-2 text-foreground mb-4'>
								<div className='p-2 bg-primary/10 rounded-md text-primary'>
									<User className='w-5 h-5' />
								</div>
								<h3 className='text-lg font-semibold'>Details & Contact</h3>
							</div>

							<div className='grid gap-6 sm:grid-cols-2'>
								<FormField
									control={form.control}
									name='primaryContactName'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>
												Primary Contact Name <span className='text-destructive'>*</span>
											</FormLabel>
											<FormControl>
												<div className='relative'>
													<User className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
													<Input
														placeholder='John Doe'
														{...field}
														className={cn(
															'pl-9 bg-background',
															fieldState.error && 'border-destructive focus-visible:ring-destructive'
														)}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='companyName'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>
												Company Name <span className='text-destructive'>*</span>
											</FormLabel>
											<FormControl>
												<div className='relative'>
													<Building2 className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
													<Input
														placeholder='Acme Inc.'
														{...field}
														className={cn(
															'pl-9 bg-background',
															fieldState.error && 'border-destructive focus-visible:ring-destructive'
														)}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='email'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>
												Email Address <span className='text-destructive'>*</span>
											</FormLabel>
											<FormControl>
												<div className='relative'>
													<Mail className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
													<Input
														type='email'
														placeholder='john@example.com'
														{...field}
														className={cn(
															'pl-9 bg-background',
															fieldState.error && 'border-destructive focus-visible:ring-destructive'
														)}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='phoneNumber'
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>
												Phone Number <span className='text-destructive'>*</span>
											</FormLabel>
											<FormControl>
												<div className='relative'>
													<Phone className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
													<Input
														type='tel'
														placeholder='+1 (555) 000-0000'
														{...field}
														className={cn(
															'pl-9 bg-background',
															fieldState.error && 'border-destructive focus-visible:ring-destructive'
														)}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Instant Messenger */}
							<div className='grid gap-6 sm:grid-cols-2'>
								<FormField
									control={form.control}
									name='messengerType'
									render={({ field }) => (
										<FormItem>
											<FormLabel>IM Type (Optional)</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger className='bg-background'>
														<div className='flex items-center gap-2'>
															<MessageSquare className='h-4 w-4 text-muted-foreground' />
															<SelectValue placeholder='Select type' />
														</div>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{messengerTypes.map((type) => (
														<SelectItem key={type} value={type}>
															{type}
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
									name='messengerScreenName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Screen Name (Optional)</FormLabel>
											<FormControl>
												<Input placeholder='@username' {...field} className='bg-background' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>

						{/* Campaigns Section */}
						<section className='space-y-6 pt-6 border-t'>
							<div className='flex items-center gap-2 text-foreground mb-4'>
								<div className='p-2 bg-primary/10 rounded-md text-primary'>
									<Target className='w-5 h-5' />
								</div>
								<h3 className='text-lg font-semibold'>Experience</h3>
							</div>

							<FormField
								control={form.control}
								name='campaigns'
								render={({ fieldState }) => (
									<FormItem
										className={cn(
											'rounded-lg border p-4',
											fieldState.error && 'border-destructive/50 bg-destructive/5'
										)}>
										<FormLabel className='text-base'>
											Current Campaigns <span className='text-destructive'>*</span>
										</FormLabel>
										<CardDescription className='mb-4'>Select the verticals you are currently running.</CardDescription>
										<div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-2 mt-3'>
											{campaigns.map((campaign) => (
												<FormField
													key={campaign}
													control={form.control}
													name='campaigns'
													render={({ field }) => (
														<FormItem className='flex items-center space-x-3 space-y-0'>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(campaign)}
																	onCheckedChange={(checked) => {
																		return checked ?
																				field.onChange([...field.value, campaign])
																			:	field.onChange(field.value?.filter((value) => value !== campaign));
																	}}
																/>
															</FormControl>
															<FormLabel className='text-sm font-normal cursor-pointer hover:text-primary transition-colors'>
																{campaign}
															</FormLabel>
														</FormItem>
													)}
												/>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='otherCampaigns'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Other campaigns</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Describe any niche verticals...'
												className='resize-none bg-background'
												rows={2}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>

						{/* Lead Generation Section */}
						<section className='space-y-6 pt-6 border-t'>
							<div className='flex items-center gap-2 text-foreground mb-4'>
								<div className='p-2 bg-primary/10 rounded-md text-primary'>
									<LinkIcon className='w-5 h-5' />
								</div>
								<h3 className='text-lg font-semibold'>Traffic Sources</h3>
							</div>

							<FormField
								control={form.control}
								name='leadGenerationMethods'
								render={({ fieldState }) => (
									<FormItem
										className={cn(
											'rounded-lg border p-4',
											fieldState.error && 'border-destructive/50 bg-destructive/5'
										)}>
										<FormLabel className='text-base'>
											Traffic Methods <span className='text-destructive'>*</span>
										</FormLabel>
										<CardDescription className='mb-4'>How do you generate your traffic?</CardDescription>
										<div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-2 mt-3'>
											{leadGenerationMethods.map((method) => (
												<FormField
													key={method}
													control={form.control}
													name='leadGenerationMethods'
													render={({ field }) => (
														<FormItem className='flex items-center space-x-3 space-y-0'>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(method)}
																	onCheckedChange={(checked) => {
																		return checked ?
																				field.onChange([...field.value, method])
																			:	field.onChange(field.value?.filter((value) => value !== method));
																	}}
																/>
															</FormControl>
															<FormLabel className='text-sm font-normal cursor-pointer hover:text-primary transition-colors'>
																{method}
															</FormLabel>
														</FormItem>
													)}
												/>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>

						{/* Additional Information Section */}
						<section className='space-y-6 pt-6 border-t'>
							<FormField
								control={form.control}
								name='leadsPerWeek'
								render={({ field, fieldState }) => (
									<FormItem>
										<FormLabel>
											Estimated Weekly Lead Volume <span className='text-destructive'>*</span>
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder='e.g., Medicare: 500/week, Solar: 200/week'
												className={cn(
													'resize-none bg-background',
													fieldState.error && 'border-destructive focus-visible:ring-destructive'
												)}
												rows={3}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='additionalInfo'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Additional Comments</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Anything else we should know about your application?'
												className='resize-none bg-background'
												rows={3}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>

						<Button
							type='submit'
							className='w-full py-6 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all'
							size='lg'
							disabled={isSubmitting}>
							{isSubmitting ?
								<>
									<Loader2 className='mr-2 h-5 w-5 animate-spin' /> Submitting...
								</>
							:	<>
									Submit Application <ArrowRight className='ml-2 h-5 w-5' />
								</>
							}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
