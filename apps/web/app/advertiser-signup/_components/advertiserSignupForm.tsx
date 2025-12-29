'use client';

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
	primaryContactName: z
		.string()
		.trim()
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name must be less than 100 characters'),
	companyName: z
		.string()
		.trim()
		.min(2, 'Company name must be at least 2 characters')
		.max(100, 'Company name must be less than 100 characters'),
	email: z
		.string()
		.trim()
		.email('Please enter a valid email address')
		.max(255, 'Email must be less than 255 characters'),
	phoneNumber: z
		.string()
		.trim()
		.min(10, 'Please enter a valid phone number')
		.max(20, 'Phone number must be less than 20 characters'),
	messengerType: z.string().optional(),
	messengerScreenName: z.string().trim().max(100, 'Screen name must be less than 100 characters').optional(),
	campaigns: z.array(z.string()).min(1, 'Please select at least one campaign'),
	otherCampaigns: z.string().trim().max(500, 'Other campaigns must be less than 500 characters').optional(),
	leadGenerationMethods: z.array(z.string()).min(1, 'Please select at least one lead generation method'),
	otherLeadGeneration: z.string().trim().max(500, 'Other lead generation must be less than 500 characters').optional(),
	leadsPerWeek: z.string().trim().min(1, 'Please specify leads per week').max(500, 'Must be less than 500 characters'),
	additionalInfo: z.string().trim().max(2000, 'Additional info must be less than 2000 characters').optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AdvertiserSignupForm() {
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

	const onSubmit = (data: FormData) => {
		console.log('Form submitted:', data);
		toast.success('Application Submitted');
	};

	return (
		<Card className='w-full border-border/50 shadow-lg'>
			<CardHeader className='space-y-1 pb-8'>
				<CardTitle className='text-2xl font-semibold tracking-tight'>Affiliate Application</CardTitle>
				<CardDescription className='text-muted-foreground'>
					Fill out the form below to apply for our affiliate program. Fields marked with * are required.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						{/* Contact Information Section */}
						<section className='space-y-6'>
							<h3 className='text-lg font-medium text-foreground border-b border-border pb-2'>Contact Information</h3>
							<div className='grid gap-6 sm:grid-cols-2'>
								<FormField
									control={form.control}
									name='primaryContactName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Primary Contact Name *</FormLabel>
											<FormControl>
												<Input placeholder='John Doe' {...field} className='bg-background' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='companyName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Company Name *</FormLabel>
											<FormControl>
												<Input placeholder='Acme Inc.' {...field} className='bg-background' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address *</FormLabel>
											<FormControl>
												<Input type='email' placeholder='john@example.com' {...field} className='bg-background' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='phoneNumber'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number *</FormLabel>
											<FormControl>
												<Input type='tel' placeholder='+1 (555) 000-0000' {...field} className='bg-background' />
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
											<FormLabel>Instant Messenger Type</FormLabel>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger className='bg-background'>
														<SelectValue placeholder='Select messenger type' />
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
											<FormLabel>Screen Name</FormLabel>
											<FormControl>
												<Input placeholder='Your screen name' {...field} className='bg-background' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</section>

						{/* Campaigns Section */}
						<section className='space-y-6'>
							<h3 className='text-lg font-medium text-foreground border-b border-border pb-2'>Campaigns</h3>
							<FormField
								control={form.control}
								name='campaigns'
								render={() => (
									<FormItem>
										<FormLabel>What campaigns are you working on now? * (select all that apply)</FormLabel>
										<div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-3'>
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
															<FormLabel className='text-sm font-normal cursor-pointer'>{campaign}</FormLabel>
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
										<FormLabel>Other campaigns (optional)</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Please describe any other campaigns you're working on..."
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

						{/* Lead Generation Section */}
						<section className='space-y-6'>
							<h3 className='text-lg font-medium text-foreground border-b border-border pb-2'>Lead Generation</h3>
							<FormField
								control={form.control}
								name='leadGenerationMethods'
								render={() => (
									<FormItem>
										<FormLabel>Please tell us how you&apos;re generating leads. * (select all that apply)</FormLabel>
										<div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-3'>
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
															<FormLabel className='text-sm font-normal cursor-pointer'>{method}</FormLabel>
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
								name='otherLeadGeneration'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Other lead generation methods (optional)</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Please describe any other lead generation methods...'
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

						{/* Additional Information Section */}
						<section className='space-y-6'>
							<h3 className='text-lg font-medium text-foreground border-b border-border pb-2'>
								Additional Information
							</h3>
							<FormField
								control={form.control}
								name='leadsPerWeek'
								render={({ field }) => (
									<FormItem>
										<FormLabel>How many leads are you generating for each vertical you selected per week? *</FormLabel>
										<FormControl>
											<Textarea
												placeholder='e.g., Medicare: 500, Solar: 200, etc.'
												className='resize-none bg-background'
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
										<FormLabel>
											Is there anything else you&apos;d like to share before submitting your application?
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Any additional information, questions, or comments...'
												className='resize-none bg-background'
												rows={4}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>

						<Button type='submit' className='w-full sm:w-auto px-8 py-3 text-base font-medium' size='lg'>
							Submit Application
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
