'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { advertiserSignupSchema, type AdvertiserSignupValues } from '@/lib/validations/advertiser-signup';
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
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Textarea } from '@workspace/ui/components/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Card, CardContent } from '@workspace/ui/components/card';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';

const CAMPAIGNS = [
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
];

const LEAD_GEN_METHODS = [
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
];

export function AdvertiserSignupForm() {
	const [step, setStep] = React.useState(1);
	const [isSuccess, setIsSuccess] = React.useState(false);
	const totalSteps = 4;

	const form = useForm<AdvertiserSignupValues>({
		resolver: zodResolver(advertiserSignupSchema),
		mode: 'onBlur',
		defaultValues: {
			campaigns: [],
			leadGenMethods: [],
			fullName: '',
			companyName: '',
			companyWebsite: '',
			email: '',
			phone: '',
			imType: '',
			imScreenName: '',
			otherCampaigns: '',
			otherLeadGen: '',
			leadsPerWeek: '',
			additionalInfo: '',
			country: '',
			city: '',
			address: '',
			zipCode: '',
		},
	});

	async function onSubmit(data: AdvertiserSignupValues) {
		console.log('Form submitted:', data);
		setIsSuccess(true);

		toast.success("Application Submitted Successfully!")
	}

	const nextStep = async () => {
		const fields = getFieldsForStep(step);
		const isValid = await form.trigger(fields as (keyof AdvertiserSignupValues)[]);
		if (isValid) setStep((s) => Math.min(s + 1, totalSteps));
	};

	const prevStep = () => setStep((s) => Math.max(s - 1, 1));

	function getFieldsForStep(step: number) {
		switch (step) {
			case 1:
				return ['fullName', 'companyName', 'companyWebsite', 'email', 'phone', 'imType', 'imScreenName'];
			case 2:
				return ['campaigns'];
			case 3:
				return ['leadGenMethods', 'leadsPerWeek'];
			case 4:
				return ['country', 'city', 'address', 'zipCode'];
			default:
				return [];
		}
	}

	if (isSuccess) {
		return (
			<Card className='border-none shadow-none bg-transparent'>
				<CardContent className='p-0 flex flex-col items-center justify-center text-center py-12'>
					<div className='w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6'>
						<CheckCircle2 className='w-10 h-10 text-primary' />
					</div>
					<h2 className='text-3xl font-heading mb-4'>Application Received</h2>
					<p className='text-muted-foreground max-w-sm mb-8'>
						Thank you for applying to join our network. Our team will review your application and get back to you within
						24-48 hours.
					</p>
					<Button
						onClick={() => {
							setIsSuccess(false);
							setStep(1);
							form.reset();
						}}
						variant='outline'
						className='font-utility'>
						Submit Another Application
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className='border-none shadow-none bg-transparent'>
			<CardContent className='p-0'>
				<div className='mb-8'>
					<div className='flex justify-between items-center mb-4'>
						<span className='text-sm font-medium text-muted-foreground'>
							Step {step} of {totalSteps}
						</span>
						<span className='text-sm font-medium text-primary'>{Math.round((step / totalSteps) * 100)}% Complete</span>
					</div>
					<div className='w-full bg-muted h-2 rounded-full overflow-hidden'>
						<div
							className='bg-primary h-full transition-all duration-300 ease-in-out'
							style={{ width: `${(step / totalSteps) * 100}%` }}
						/>
					</div>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						{step === 1 && (
							<div className='space-y-4'>
								<h2 className='text-2xl font-heading mb-6'>Contact Information</h2>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='fullName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Primary Contact Name</FormLabel>
												<FormControl>
													<Input placeholder='John Doe' {...field} />
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
												<FormLabel>Company Name</FormLabel>
												<FormControl>
													<Input placeholder='Acme Corp' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name='companyWebsite'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Company Website</FormLabel>
											<FormControl>
												<Input placeholder='https://example.com' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email Address</FormLabel>
												<FormControl>
													<Input type='email' placeholder='john@company.com' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='phone'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone Number</FormLabel>
												<FormControl>
													<Input placeholder='+1 (555) 000-0000' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='imType'
										render={({ field }) => (
											<FormItem>
												<FormLabel>IM Type</FormLabel>
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select type' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value='skype'>Skype</SelectItem>
														<SelectItem value='telegram'>Telegram</SelectItem>
														<SelectItem value='slack'>Slack</SelectItem>
														<SelectItem value='whatsapp'>WhatsApp</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='imScreenName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Screen Name</FormLabel>
												<FormControl>
													<Input placeholder='username' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						)}

						{step === 2 && (
							<div className='space-y-4'>
								<h2 className='text-2xl font-heading mb-6'>Campaign Selection</h2>
								<FormField
									control={form.control}
									name='campaigns'
									render={() => (
										<FormItem>
											<div className='mb-4'>
												<FormLabel className='text-base'>What campaigns are you working on now? *</FormLabel>
												<FormDescription>Select all that apply.</FormDescription>
											</div>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
												{CAMPAIGNS.map((item) => (
													<FormField
														key={item}
														control={form.control}
														name='campaigns'
														render={({ field }) => (
															<FormItem className='flex flex-row items-start space-x-3 space-y-0 p-2 rounded-md hover:bg-muted/50 transition-colors'>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(item)}
																		onCheckedChange={(checked) => {
																			return checked ?
																					field.onChange([...field.value, item])
																				:	field.onChange(field.value?.filter((value) => value !== item));
																		}}
																	/>
																</FormControl>
																<FormLabel className='font-normal cursor-pointer'>{item}</FormLabel>
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
												<Input placeholder='Specify other verticals' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}

						{step === 3 && (
							<div className='space-y-4'>
								<h2 className='text-2xl font-heading mb-6'>Lead Generation</h2>
								<FormField
									control={form.control}
									name='leadGenMethods'
									render={() => (
										<FormItem>
											<div className='mb-4'>
												<FormLabel className='text-base'>How are you generating leads? *</FormLabel>
												<FormDescription>Select all that apply.</FormDescription>
											</div>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
												{LEAD_GEN_METHODS.map((item) => (
													<FormField
														key={item}
														control={form.control}
														name='leadGenMethods'
														render={({ field }) => (
															<FormItem className='flex flex-row items-start space-x-3 space-y-0 p-2 rounded-md hover:bg-muted/50 transition-colors'>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(item)}
																		onCheckedChange={(checked) => {
																			return checked ?
																					field.onChange([...field.value, item])
																				:	field.onChange(field.value?.filter((value) => value !== item));
																		}}
																	/>
																</FormControl>
																<FormLabel className='font-normal cursor-pointer'>{item}</FormLabel>
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
									name='leadsPerWeek'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Leads per vertical per week? *</FormLabel>
											<FormControl>
												<Input placeholder='e.g. 500-1000' {...field} />
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
											<FormLabel>Anything else to share?</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Tell us more about your business or specific needs...'
													className='resize-none'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}

						{step === 4 && (
							<div className='space-y-4'>
								<h2 className='text-2xl font-heading mb-6'>Business Location</h2>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='country'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Country</FormLabel>
												<FormControl>
													<Input placeholder='United States' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='city'
										render={({ field }) => (
											<FormItem>
												<FormLabel>City</FormLabel>
												<FormControl>
													<Input placeholder='New York' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name='address'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Street Address</FormLabel>
											<FormControl>
												<Input placeholder='123 Business Way' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='zipCode'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Zip/Postal Code</FormLabel>
											<FormControl>
												<Input placeholder='10001' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						)}

						<div className='flex justify-between pt-6 border-t border-border'>
							<Button
								type='button'
								variant='outline'
								onClick={prevStep}
								disabled={step === 1}
								className='font-utility bg-transparent'>
								Previous
							</Button>
							{step < totalSteps ?
								<Button type='button' onClick={nextStep} className='font-utility px-8'>
									Next Step
								</Button>
							:	<Button type='submit' className='font-utility px-8'>
									Submit Application
								</Button>
							}
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
