'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
	ArrowLeft,
	ArrowRight,
	BadgeCheck,
	Calendar as CalendarIcon,
	Clock3,
	MailCheck,
	MessageSquare,
	PhoneCall,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Calendar } from '@workspace/ui/components/calendar';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@workspace/ui/components/form';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover';
import { Input } from '@workspace/ui/components/input';
import { Progress } from '@workspace/ui/components/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Textarea } from '@workspace/ui/components/textarea';
import { cn } from '@workspace/ui/lib/utils';
import {
	contactStepOneSchema,
	contactStepThreeSchema,
	contactStepTwoSchema,
	type ContactFormValues,
} from '@/lib/validations/contact';
import {
	CONTACT_BUDGET_OPTIONS,
	CONTACT_COMPANY_SIZE_OPTIONS,
	CONTACT_MEETING_WINDOW_OPTIONS,
	CONTACT_PREFERRED_METHOD_OPTIONS,
	CONTACT_SERVICE_OPTIONS,
} from './contact-data';

type ContactStepOneValues = z.infer<typeof contactStepOneSchema>;
type ContactStepTwoValues = z.infer<typeof contactStepTwoSchema>;
type ContactStepThreeValues = z.infer<typeof contactStepThreeSchema>;

const TAB_ORDER = ['contact', 'services', 'meeting'] as const;
type ContactTab = (typeof TAB_ORDER)[number];

const CONTACT_DEFAULTS: ContactStepOneValues = {
	fullName: '',
	workEmail: '',
	company: '',
	phone: '',
	preferredContactMethod: '',
};

const SERVICES_DEFAULTS: ContactStepTwoValues = {
	serviceCategory: '',
	serviceDetail: '',
	businessWebsite: '',
	companySize: '',
	monthlyBudget: '',
	targetRegions: '',
};

const MEETING_DEFAULTS: ContactStepThreeValues = {
	// desiredDate is required by schema; initialised once the user selects a date
	desiredDate: undefined as unknown as Date,
	preferredMeetingWindow: '',
	timezone: '',
	additionalContext: '',
	consent: true,
};

export function ContactMultiStepForm() {
	const reduceMotion = useReducedMotion();
	const [activeTab, setActiveTab] = useState<ContactTab>('contact');
	const [showSuccessState, setShowSuccessState] = useState(false);

	const contactForm = useForm<ContactStepOneValues>({
		resolver: zodResolver(contactStepOneSchema),
		defaultValues: CONTACT_DEFAULTS,
	});

	const servicesForm = useForm<ContactStepTwoValues>({
		resolver: zodResolver(contactStepTwoSchema),
		defaultValues: SERVICES_DEFAULTS,
	});

	const meetingForm = useForm<ContactStepThreeValues>({
		resolver: zodResolver(contactStepThreeSchema),
		defaultValues: MEETING_DEFAULTS,
	});

	const watchedCategory = servicesForm.watch('serviceCategory');
	const selectedCategory = useMemo(
		() => CONTACT_SERVICE_OPTIONS.find((option) => option.value === watchedCategory),
		[watchedCategory],
	);

	useEffect(() => {
		const currentSubService = servicesForm.getValues('serviceDetail');
		if (!selectedCategory?.subServices.some((subService) => subService.value === currentSubService)) {
			servicesForm.setValue('serviceDetail', '');
		}
	}, [servicesForm, selectedCategory]);

	useEffect(() => {
		if (!showSuccessState) return;
		const timer = window.setTimeout(() => setShowSuccessState(false), 3400);
		return () => window.clearTimeout(timer);
	}, [showSuccessState]);

	const currentTabIndex = TAB_ORDER.indexOf(activeTab);
	const progressValue = ((currentTabIndex + 1) / TAB_ORDER.length) * 100;

	function handleNextFromContact() {
		const values = contactForm.getValues();
		const result = contactStepOneSchema.safeParse(values);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				const fieldName = issue.path[0] as keyof ContactStepOneValues;
				if (!fieldName) return;
				contactForm.setError(fieldName, {
					type: 'manual',
					message: issue.message,
				});
			});
			return;
		}

		setActiveTab('services');
	}

	function handleNextFromServices() {
		const values = servicesForm.getValues();
		const result = contactStepTwoSchema.safeParse(values);

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				const fieldName = issue.path[0] as keyof ContactStepTwoValues;
				if (!fieldName) return;
				servicesForm.setError(fieldName, {
					type: 'manual',
					message: issue.message,
				});
			});
			return;
		}

		setActiveTab('meeting');
	}

	function handlePreviousFromServices() {
		setActiveTab('contact');
	}

	function handlePreviousFromMeeting() {
		setActiveTab('services');
	}

	async function onSubmitContact(meetingValuesFromForm: ContactStepThreeValues) {
		const contactValues = contactForm.getValues();
		const servicesValues = servicesForm.getValues();
		const meetingValues = meetingValuesFromForm;

		const contactResult = contactStepOneSchema.safeParse(contactValues);
		const servicesResult = contactStepTwoSchema.safeParse(servicesValues);
		const meetingResult = contactStepThreeSchema.safeParse(meetingValues);

		if (!contactResult.success) {
			contactResult.error.issues.forEach((issue) => {
				const fieldName = issue.path[0] as keyof ContactStepOneValues;
				if (!fieldName) return;
				contactForm.setError(fieldName, {
					type: 'manual',
					message: issue.message,
				});
			});
			setActiveTab('contact');
			return;
		}

		if (!servicesResult.success) {
			servicesResult.error.issues.forEach((issue) => {
				const fieldName = issue.path[0] as keyof ContactStepTwoValues;
				if (!fieldName) return;
				servicesForm.setError(fieldName, {
					type: 'manual',
					message: issue.message,
				});
			});
			setActiveTab('services');
			return;
		}

		if (!meetingResult.success) {
			meetingResult.error.issues.forEach((issue) => {
				const fieldName = issue.path[0] as keyof ContactStepThreeValues;
				if (!fieldName) return;
				meetingForm.setError(fieldName, {
					type: 'manual',
					message: issue.message,
				});
			});
			setActiveTab('meeting');
			return;
		}

		const merged: ContactFormValues = {
			...contactValues,
			...servicesValues,
			...meetingValues,
		};

		setShowSuccessState(true);
		toast.success('Consultation request sent. Our team will follow up within 24 business hours.');
		console.log('Contact inquiry payload:', merged);

		contactForm.reset(CONTACT_DEFAULTS);
		servicesForm.reset(SERVICES_DEFAULTS);
		meetingForm.reset(MEETING_DEFAULTS);
		setActiveTab('contact');
	}

	return (
		<section id='contact-form' className='w-full bg-background py-14 sm:py-16 md:py-20'>
			<div className='section-container grid gap-7 lg:grid-cols-[1.05fr_1.2fr] lg:items-start'>
				<motion.aside
					initial={reduceMotion ? false : { opacity: 0, y: 20 }}
					whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-90px' }}
					transition={{ duration: 0.45, ease: 'easeOut' }}
					className='rounded-3xl border border-pastel-mint-border bg-pastel-mint p-6 shadow-sm md:p-8 lg:sticky lg:top-24 dark:bg-card'>
					<div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary'>
						<MailCheck className='h-3.5 w-3.5' />
						Lead Qualification Flow
					</div>
					<h2 className='mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
						Give us the details. We&apos;ll bring the strategy.
					</h2>
					<p className='mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base'>
						This multi-step form captures your goals, service priorities, and meeting context so your first call is
						already productive.
					</p>

					<div className='mt-6 space-y-3'>
						<div className='flex items-start gap-3 rounded-xl border border-border/70 bg-card/75 p-3'>
							<div className='mt-0.5 rounded-full bg-pastel-mint p-1.5 text-pastel-mint-ink dark:bg-pastel-mint/70'>
								<Clock3 className='h-4 w-4' />
							</div>
							<div>
								<p className='text-sm font-semibold text-foreground'>Fast Response Window</p>
								<p className='text-xs text-muted-foreground'>Typical human reply within 24 business hours.</p>
							</div>
						</div>

						<div className='flex items-start gap-3 rounded-xl border border-border/70 bg-card/75 p-3'>
							<div className='mt-0.5 rounded-full bg-pastel-sky p-1.5 text-pastel-sky-ink dark:bg-pastel-sky/70'>
								<PhoneCall className='h-4 w-4' />
							</div>
							<div>
								<p className='text-sm font-semibold text-foreground'>Tailored Consultation</p>
								<p className='text-xs text-muted-foreground'>Your selected service path drives our meeting agenda.</p>
							</div>
						</div>

						<div className='flex items-start gap-3 rounded-xl border border-border/70 bg-card/75 p-3'>
							<div className='mt-0.5 rounded-full bg-pastel-lilac p-1.5 text-pastel-lilac-ink dark:bg-pastel-lilac/70'>
								<MessageSquare className='h-4 w-4' />
							</div>
							<div>
								<p className='text-sm font-semibold text-foreground'>No-Pressure Discovery</p>
								<p className='text-xs text-muted-foreground'>
									No long-term commitment required to start the conversation.
								</p>
							</div>
						</div>
					</div>
				</motion.aside>
				<motion.div
					initial={reduceMotion ? false : { opacity: 0, y: 20 }}
					whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-70px' }}
					transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
					className='rounded-3xl border border-pastel-sky-border/80 bg-pastel-sky/55 p-5 shadow-sm dark:bg-card/90 sm:p-7 md:p-8'>
					<Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ContactTab)} className='space-y-6'>
						<div className='space-y-4'>
							<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
								<div>
									<p className='text-xs font-semibold uppercase tracking-wide text-primary'>
										{activeTab === 'contact' ?
											'Step 1'
										: activeTab === 'services' ?
											'Step 2'
										:	'Step 3'}
									</p>
									<h3 className='text-xl font-semibold tracking-tight text-foreground'>
										{activeTab === 'contact' ?
											'Contact Details'
										: activeTab === 'services' ?
											'Service Context'
										:	'Meeting Readiness'}
									</h3>
									<p className='mt-1 text-sm text-muted-foreground'>
										{activeTab === 'contact' && 'Tell us who should own this conversation.'}
										{activeTab === 'services' && 'Share what you need and where you want to scale.'}
										{activeTab === 'meeting' &&
											'Confirm timing, context, and how you prefer to meet so we can come prepared.'}
									</p>
								</div>
							</div>
							<Progress value={progressValue} className='h-2.5 bg-primary/15' />
							<TabsList className='grid w-full grid-cols-3 bg-background'>
								<TabsTrigger value='contact' className='text-xs sm:text-sm'>
									Contact details
								</TabsTrigger>
								<TabsTrigger value='services' className='text-xs sm:text-sm'>
									Service details
								</TabsTrigger>
								<TabsTrigger value='meeting' className='text-xs sm:text-sm'>
									Meeting readiness
								</TabsTrigger>
							</TabsList>
						</div>

						<TabsContent value='contact' className='space-y-5'>
							<Form {...contactForm}>
								<form className='space-y-5'>
									<div className='space-y-4'>
										<FormField
											control={contactForm.control}
											name='fullName'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Full name</FormLabel>
													<FormControl>
														<Input placeholder='e.g. Sarah Thompson' {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className='grid gap-4 sm:grid-cols-2'>
											<FormField
												control={contactForm.control}
												name='workEmail'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Work email</FormLabel>
														<FormControl>
															<Input type='email' placeholder='you@company.com' {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={contactForm.control}
												name='phone'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Phone (optional)</FormLabel>
														<FormControl>
															<Input type='tel' placeholder='+1 555 123 4567' {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<FormField
											control={contactForm.control}
											name='company'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Company name</FormLabel>
													<FormControl>
														<Input placeholder='Your company' {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={contactForm.control}
											name='preferredContactMethod'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Preferred contact method</FormLabel>
													<Select value={field.value} onValueChange={field.onChange}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder='How should we reach out first?' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{CONTACT_PREFERRED_METHOD_OPTIONS.map((option) => (
																<SelectItem key={option.value} value={option.value}>
																	{option.label}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className='flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5'>
										<span className='text-xs text-muted-foreground'>You can review all answers before submitting.</span>
										<Button type='button' className='gap-2' onClick={handleNextFromContact}>
											Continue
											<ArrowRight className='h-4 w-4' />
										</Button>
									</div>
								</form>
							</Form>
						</TabsContent>

						<TabsContent value='services' className='space-y-5'>
							<Form {...servicesForm}>
								<form className='space-y-5'>
									<div className='space-y-4'>
										<FormField
											control={servicesForm.control}
											name='serviceCategory'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Service category</FormLabel>
													<Select
														value={field.value}
														onValueChange={(value) => {
															field.onChange(value);
															servicesForm.setValue('serviceDetail', '');
														}}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder='Select your primary service interest' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{CONTACT_SERVICE_OPTIONS.map((service) => (
																<SelectItem key={service.value} value={service.value}>
																	{service.label}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={servicesForm.control}
											name='serviceDetail'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Service detail</FormLabel>
													<Select value={field.value} onValueChange={field.onChange} disabled={!selectedCategory}>
														<FormControl>
															<SelectTrigger>
																<SelectValue
																	placeholder={
																		selectedCategory ? 'Select the closest service detail' : 'Choose a category first'
																	}
																/>
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{selectedCategory?.subServices.map((subService) => (
																<SelectItem key={subService.value} value={subService.value}>
																	{subService.label}
																</SelectItem>
															))}
															<SelectItem value='not-sure-yet'>Not sure yet</SelectItem>
														</SelectContent>
													</Select>
													<FormDescription>
														Pick the closest fit so we can prepare a relevant conversation.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className='grid gap-4 sm:grid-cols-2'>
											<FormField
												control={servicesForm.control}
												name='businessWebsite'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Business website (optional)</FormLabel>
														<FormControl>
															<Input type='url' placeholder='https://example.com' {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={servicesForm.control}
												name='companySize'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Company size</FormLabel>
														<Select value={field.value} onValueChange={field.onChange}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder='Select company size' />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{CONTACT_COMPANY_SIZE_OPTIONS.map((option) => (
																	<SelectItem key={option.value} value={option.value}>
																		{option.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className='grid gap-4 sm:grid-cols-2'>
											<FormField
												control={servicesForm.control}
												name='monthlyBudget'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Monthly budget (optional)</FormLabel>
														<Select value={field.value} onValueChange={field.onChange}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder='Select budget range' />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{CONTACT_BUDGET_OPTIONS.map((option) => (
																	<SelectItem key={option.value} value={option.value}>
																		{option.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={servicesForm.control}
												name='targetRegions'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Target geography</FormLabel>
														<FormControl>
															<Input placeholder='e.g. USA, UK, Australia' {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									<div className='flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5'>
										<Button type='button' variant='outline' className='gap-2' onClick={handlePreviousFromServices}>
											<ArrowLeft className='h-4 w-4' />
											Previous
										</Button>
										<Button type='button' className='gap-2' onClick={handleNextFromServices}>
											Continue
											<ArrowRight className='h-4 w-4' />
										</Button>
									</div>
								</form>
							</Form>
						</TabsContent>

						<TabsContent value='meeting' className='space-y-5'>
							<Form {...meetingForm}>
								<form onSubmit={meetingForm.handleSubmit(onSubmitContact)} className='space-y-5'>
									<div className='space-y-4'>
										<FormField
											control={meetingForm.control}
											name='desiredDate'
											render={({ field }) => (
												<FormItem className='flex flex-col space-y-2'>
													<FormLabel>Desired meeting date</FormLabel>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant='outline'
																	className={cn(
																		'w-full justify-start text-left font-normal',
																		!field.value && 'text-muted-foreground',
																	)}>
																	<CalendarIcon className='mr-2 h-4 w-4' />
																	{field.value ? field.value.toLocaleDateString() : <span>Pick a date</span>}
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent className='w-auto p-0' align='start'>
															<Calendar
																mode='single'
																selected={field.value}
																onSelect={(date) => field.onChange(date ?? undefined)}
															/>
														</PopoverContent>
													</Popover>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className='grid gap-4 sm:grid-cols-2'>
											<FormField
												control={meetingForm.control}
												name='preferredMeetingWindow'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Preferred meeting window</FormLabel>
														<Select value={field.value} onValueChange={field.onChange}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder='Choose a time window' />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{CONTACT_MEETING_WINDOW_OPTIONS.map((option) => (
																	<SelectItem key={option.value} value={option.value}>
																		{option.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={meetingForm.control}
												name='timezone'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Timezone</FormLabel>
														<FormControl>
															<Input placeholder='e.g. EST (UTC-5)' {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<FormField
											control={meetingForm.control}
											name='additionalContext'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Additional context (optional)</FormLabel>
													<FormControl>
														<Textarea
															rows={3}
															placeholder='Anything else that helps us prepare for your meeting.'
															className='resize-none'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={meetingForm.control}
											name='consent'
											render={({ field }) => (
												<FormItem className='rounded-xl border border-border/70 bg-card/70 p-4'>
													<div className='flex items-start gap-3'>
														<FormControl>
															<Checkbox
																checked={Boolean(field.value)}
																onCheckedChange={(checked) => field.onChange(Boolean(checked))}
															/>
														</FormControl>
														<div>
															<FormLabel className='text-sm font-medium leading-snug'>
																I agree to be contacted regarding this inquiry and understand this form is a
																consultation request.
															</FormLabel>
															<FormDescription className='mt-1'>
																We only use this information to follow up about your request.
															</FormDescription>
															<FormMessage className='mt-1' />
														</div>
													</div>
												</FormItem>
											)}
										/>
									</div>

									<div className='flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5'>
										<Button type='button' variant='outline' className='gap-2' onClick={handlePreviousFromMeeting}>
											<ArrowLeft className='h-4 w-4' />
											Previous
										</Button>
										<Button type='submit' className='gap-2'>
											Submit Contact Request
											<BadgeCheck className='h-4 w-4' />
										</Button>
									</div>
								</form>
							</Form>
						</TabsContent>

						<AnimatePresence>
							{showSuccessState ?
								<motion.div
									initial={{ opacity: 0, y: 8, scale: 0.98 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: 8 }}
									transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
									className='mt-2 rounded-xl border border-pastel-mint-border bg-pastel-mint p-3 text-sm text-pastel-mint-ink dark:bg-pastel-mint/50 dark:text-pastel-mint-ink'>
									Your request was captured. We&apos;ll reach out shortly with next steps.
								</motion.div>
							:	null}
						</AnimatePresence>
					</Tabs>
				</motion.div>
			</div>
		</section>
	);
}
