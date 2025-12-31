'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	accountInformationSchema,
	promotionalPreferencesSchema,
	type AdvertiserSignupValues,
} from '@/lib/validations/advertiser-signup';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Country, CountryDropdown } from '@workspace/ui/components/country-dropdown';
import { PhoneInput } from '@workspace/ui/components/phone-input';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';
import { getVerticalsForNiches } from './vertical-dropdown';
import { MultiSelectDropdown } from './multi-select-dropdown';
import { VerticalMultiSelectDropdown } from './vertical-multi-select-dropdown';

// IM Type options
const IM_TYPES = ['Discord', 'Slack', 'Teams', 'Telegram', 'WhatsApp', 'Other'];

// Market Niche options
const MARKET_NICHES = [
	'Binary/bizopp',
	'Mobile content',
	'Education',
	'Download',
	'Financial',
	'Other',
	'Mobile apps',
	'Social Networking',
	'Ecommerce',
	'Travel',
	'Gaming',
	'iGaming',
	'Smartlink',
	'Vouchers/Leadgen',
	'Nutra',
	'Financial-',
	'Forex',
	'Health',
	'Legal',
	'Survey',
	'WH Leadgen',
	'Pay-Per-Call',
	'Insurance',
	'Home improvement',
];

// Traffic Type options
const TRAFFIC_TYPES = [
	'Display Advertising',
	'Email Marketing',
	'Mobile Advertising',
	'Video Advertising',
	'Social Advertising',
	'Offline Advertising (TV/radio)',
	'Search Advertising',
	'Retargeting',
	'Native Advertising',
	'Other',
];

// Budget options
const BUDGET_OPTIONS = [
	'$25,000 a month',
	'$25,000 - $50,000 a month',
	'$50,000 - $100,000 a month',
	'$100,000 - $500,000 a month',
	'$500,000+ a month',
];

export function AdvertiserSignupForm() {
	const [activeTab, setActiveTab] = React.useState('account');
	const [isSuccess, setIsSuccess] = React.useState(false);
	const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);
	const [selectedMarketNiches, setSelectedMarketNiches] = React.useState<string[]>([]);

	// Account Information Form
	const accountForm = useForm<z.infer<typeof accountInformationSchema>>({
		resolver: zodResolver(accountInformationSchema),
		defaultValues: {
			name: '',
			companyName: '',
			companyWebsite: '',
			email: '',
			imType: '',
			screenName: '',
			country: '',
			city: '',
			address: '',
			zipCode: '',
			phone: '',
		},
	});

	// Promotional Preferences Form
	const promotionalForm = useForm<z.infer<typeof promotionalPreferencesSchema>>({
		resolver: zodResolver(promotionalPreferencesSchema),
		defaultValues: {
			marketNiche: [],
			topVertical: [],
			productName: '',
			trafficTypes: [],
			otherMarketingCompanies: '',
			budget: '',
			additionalInfo: '',
			termsAccepted: false,
		},
	});

	// Get vertical options based on selected market niches
	const verticalOptions = React.useMemo(() => {
		return getVerticalsForNiches(selectedMarketNiches);
	}, [selectedMarketNiches]);

	// Handle next button - validate account information and switch to promotional preferences
	const handleNext = () => {
		const accountValues = accountForm.getValues();
		const result = accountInformationSchema.safeParse(accountValues);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				const fieldName = issue.path[0] as keyof typeof accountValues;
				accountForm.setError(fieldName, {
					type: 'manual',
					message: issue.message,
				});
			});
			return;
		}

		setActiveTab('promotional');
	};

	// Handle form submission
	async function onSubmit() {
		const accountValues = accountForm.getValues();
		const promotionalValues = promotionalForm.getValues();

		// Validate both forms
		const accountResult = accountInformationSchema.safeParse(accountValues);
		const promotionalResult = promotionalPreferencesSchema.safeParse(promotionalValues);

		if (!accountResult.success) {
			accountResult.error.issues.forEach((issue) => {
				const fieldName = issue.path[0] as keyof typeof accountValues;
				accountForm.setError(fieldName, {
					type: 'manual',
					message: issue.message,
				});
			});
			setActiveTab('account');
			return;
		}

		if (!promotionalResult.success) {
			promotionalResult.error.issues.forEach((issue) => {
				const fieldName = issue.path[0] as keyof typeof promotionalValues;
				promotionalForm.setError(fieldName, {
					type: 'manual',
					message: issue.message,
				});
			});
			return;
		}

		const formData: AdvertiserSignupValues = {
			...accountValues,
			...promotionalValues,
		};

		console.log('Form submitted:', formData);
		setIsSuccess(true);
		toast.success('Application Submitted Successfully!');
	}

	if (isSuccess) {
		return (
			<div className='flex flex-col items-center justify-center text-center py-12'>
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
						setActiveTab('account');
						accountForm.reset();
						promotionalForm.reset();
						setSelectedCountry(null);
						setSelectedMarketNiches([]);
					}}
					variant='outline'
					className='font-utility'>
					Submit Another Application
				</Button>
			</div>
		);
	}

	return (
		<div className='w-full space-y-6'>
			<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='account' className='font-medium'>
						Account Information
					</TabsTrigger>
					<TabsTrigger value='promotional' className='font-medium'>
						Promotional Preferences
					</TabsTrigger>
				</TabsList>

				{/* Account Information Tab */}
				<TabsContent value='account' className='space-y-6 mt-6'>
					<Form {...accountForm}>
						<form className='space-y-6'>
							<div className='space-y-4'>
								<h2 className='text-2xl font-heading mb-2'>Account Information</h2>
								<p className='text-sm text-muted-foreground mb-6'>
									Please provide your contact and company details to get started.
								</p>

								<FormField
									control={accountForm.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder='John Doe' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={accountForm.control}
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

								<FormField
									control={accountForm.control}
									name='companyWebsite'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Company Website</FormLabel>
											<FormControl>
												<Input placeholder='https://example.com' type='url' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={accountForm.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address</FormLabel>
											<FormControl>
												<Input placeholder='john@company.com' type='email' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={accountForm.control}
										name='imType'
										render={({ field }) => (
											<FormItem>
												<FormLabel>IM Type</FormLabel>
												<Select onValueChange={field.onChange} value={field.value}>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder='Select IM type' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{IM_TYPES.map((type) => (
															<SelectItem key={type} value={type.toLowerCase()}>
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
										control={accountForm.control}
										name='screenName'
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

								<FormField
									control={accountForm.control}
									name='country'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Country</FormLabel>
											<CountryDropdown
												placeholder='Select country'
												defaultValue={field.value}
												onChange={(country) => {
													field.onChange(country.alpha3);
													setSelectedCountry(country);
												}}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={accountForm.control}
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

								<FormField
									control={accountForm.control}
									name='address'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address</FormLabel>
											<FormControl>
												<Input placeholder='123 Business Way' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={accountForm.control}
									name='zipCode'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Zip / Postal Code</FormLabel>
											<FormControl>
												<Input placeholder='10001' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={accountForm.control}
									name='phone'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>
											<FormControl>
												<PhoneInput
													{...field}
													value={field.value}
													placeholder='Enter your number'
													defaultCountry={selectedCountry?.alpha2}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='flex justify-end pt-4 border-t border-border'>
								<Button type='button' onClick={handleNext} className='font-utility px-8'>
									Next
								</Button>
							</div>
						</form>
					</Form>
				</TabsContent>

				{/* Promotional Preferences Tab */}
				<TabsContent value='promotional' className='space-y-6 mt-6'>
					<Form {...promotionalForm}>
						<form onSubmit={promotionalForm.handleSubmit(onSubmit)} className='space-y-6'>
							<div className='space-y-4'>
								<h2 className='text-2xl font-heading mb-2'>Promotional Preferences</h2>
								<p className='text-sm text-muted-foreground mb-6'>
									Tell us about your products and marketing preferences.
								</p>

								<FormField
									control={promotionalForm.control}
									name='marketNiche'
									render={({ field }) => (
										<FormItem>
											<FormLabel>What market niche do(es) your product(s)/service(s) belong to?</FormLabel>
											<FormControl>
												<MultiSelectDropdown
													options={MARKET_NICHES}
													selectedValues={field.value || []}
													onChange={(values) => {
														field.onChange(values);
														setSelectedMarketNiches(values);
														// Clear top vertical if no niches selected
														if (values.length === 0) {
															promotionalForm.setValue('topVertical', []);
														}
													}}
													placeholder='Select market niche(s)'
													searchPlaceholder='Search market niche...'
												/>
											</FormControl>
											<FormDescription>Select all that apply.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={promotionalForm.control}
									name='topVertical'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Please pick your top vertical</FormLabel>
											<FormControl>
												<VerticalMultiSelectDropdown
													options={verticalOptions}
													selectedValues={field.value || []}
													onChange={field.onChange}
													placeholder='Select vertical(s)'
													disabled={selectedMarketNiches.length === 0}
													searchPlaceholder='Search vertical...'
												/>
											</FormControl>
											<FormDescription>
												{selectedMarketNiches.length === 0 ?
													'Please select at least one market niche first'
												:	'Select all that apply.'}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={promotionalForm.control}
									name='productName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>What is the name of the product(s) you would like us to promote for you?</FormLabel>
											<FormControl>
												<Input placeholder='Enter product name(s)' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={promotionalForm.control}
									name='trafficTypes'
									render={({ field }) => (
										<FormItem>
											<FormLabel>What type(s) of traffic are you looking for?</FormLabel>
											<FormControl>
												<MultiSelectDropdown
													options={TRAFFIC_TYPES}
													selectedValues={field.value || []}
													onChange={field.onChange}
													placeholder='Select traffic type(s)'
													searchPlaceholder='Search traffic types...'
												/>
											</FormControl>
											<FormDescription>Select all that apply.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={promotionalForm.control}
									name='otherMarketingCompanies'
									render={({ field }) => (
										<FormItem>
											<FormLabel>What other marketing companies are you buying traffic from?</FormLabel>
											<FormControl>
												<Input placeholder='Enter company names (optional)' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={promotionalForm.control}
									name='budget'
									render={({ field }) => (
										<FormItem>
											<FormLabel>What budgets do you plan to spend with us?</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select budget range' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{BUDGET_OPTIONS.map((budget) => (
														<SelectItem key={budget} value={budget}>
															{budget}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={promotionalForm.control}
									name='additionalInfo'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Feel free to include any other information you want to share</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Tell us more about your business or specific needs...'
													className='resize-none min-h-[100px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={promotionalForm.control}
									name='termsAccepted'
									render={({ field }) => (
										<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className='space-y-1 leading-none'>
												<FormLabel className='font-normal cursor-pointer'>
													By checking this box, I confirm that I have read, understand and agree to the Terms of
													Agreement and Privacy Policy
												</FormLabel>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='flex justify-between pt-4 border-t border-border'>
								<Button
									type='button'
									variant='outline'
									onClick={() => setActiveTab('account')}
									className='font-utility bg-transparent'>
									Previous
								</Button>
								<Button type='submit' className='font-utility px-8'>
									Submit Application
								</Button>
							</div>
						</form>
					</Form>
				</TabsContent>
			</Tabs>
		</div>
	);
}
