import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { webDevServicesTable, webDevSubServicesTable, webDevPackagesTable, webDevCaseStudiesTable, webDevTestimonialsTable } from '../schema';
import { z } from 'zod';

// Image schema
const imageSchema = z.object({
	url: z.string().url('Please provide a valid image URL'),
	publicId: z.string().min(1, 'Public ID is required'),
	alt: z.string().optional(),
});

// Feature schema
const featureSchema = z.object({
	title: z.string().min(1, 'Feature title is required'),
	description: z.string().min(1, 'Feature description is required'),
	icon: z.string().optional(),
});

// Process step schema
const processStepSchema = z.object({
	step: z.number().int().positive(),
	title: z.string().min(1, 'Step title is required'),
	description: z.string().min(1, 'Step description is required'),
	icon: z.string().optional(),
});

// Hero content schema
const heroContentSchema = z.object({
	title: z.string().min(1, 'Hero title is required'),
	subtitle: z.string().min(1, 'Hero subtitle is required'),
	description: z.string().optional(),
	image: imageSchema.optional(),
	ctaText: z.string().optional(),
	ctaLink: z.string().optional(), // Allow relative URLs like "/contact"
});

// Package schema (for JSONB)
const packageItemSchema = z.object({
	id: z.string(),
	name: z.string().min(1, 'Package name is required'),
	description: z.string().optional(),
	price: z.number().nonnegative(),
	currency: z.string().default('USD'),
	features: z.array(z.string()),
	isPopular: z.boolean().default(false),
});

// Case study schema (for JSONB)
const caseStudyItemSchema = z.object({
	id: z.string(),
	title: z.string().min(1, 'Case study title is required'),
	description: z.string().optional(),
	clientName: z.string().optional(),
	results: z.array(
		z.object({
			metric: z.string(),
			value: z.string(),
			description: z.string().optional(),
		})
	),
	image: imageSchema.optional(),
});

// Testimonial schema (for JSONB)
const testimonialItemSchema = z.object({
	id: z.string(),
	name: z.string().min(1, 'Name is required'),
	role: z.string().optional(),
	company: z.string().optional(),
	content: z.string().min(1, 'Testimonial content is required'),
	image: imageSchema.optional(),
	rating: z.number().min(0).max(5).optional(),
});

// FAQ schema (for JSONB)
const faqItemSchema = z.object({
	id: z.string(),
	question: z.string().min(1, 'Question is required'),
	answer: z.string().min(1, 'Answer is required'),
});

// Web Dev Services
export const webDevServiceInsertSchema = createInsertSchema(webDevServicesTable, {
	slug: (schema) => schema.min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
	title: (schema) => schema.min(1, 'Title is required'),
	description: (schema) => schema.optional(),
	metaTitle: (schema) => schema.optional(),
	metaDescription: (schema) => schema.optional(),
	heroTitle: (schema) => schema.optional(),
	heroSubtitle: (schema) => schema.optional(),
	heroImage: () => imageSchema.optional(),
	features: () => z.array(featureSchema).optional(),
	processSteps: () => z.array(processStepSchema).optional(),
	isActive: (schema) => schema.optional(),
	order: (schema) => schema.optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const webDevServiceUpdateSchema = createUpdateSchema(webDevServicesTable, {
	slug: (schema) => schema.regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens').optional(),
	features: () => z.array(featureSchema).optional(),
	processSteps: () => z.array(processStepSchema).optional(),
	heroImage: () => imageSchema.optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const webDevServiceSelectSchema = createSelectSchema(webDevServicesTable);

// Web Dev Sub Services
export const webDevSubServiceInsertSchema = createInsertSchema(webDevSubServicesTable, {
	serviceId: (schema) => schema.refine(() => true, { message: 'Service ID must be a valid UUID' }),
	slug: (schema) => schema.min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
	title: (schema) => schema.min(1, 'Title is required'),
	description: (schema) => schema.optional(),
	metaTitle: (schema) => schema.optional(),
	metaDescription: (schema) => schema.optional(),
	ogImage: () => imageSchema.optional(),
	heroContent: () => heroContentSchema.optional(),
	features: () => z.array(featureSchema).optional(),
	processSteps: () => z.array(processStepSchema).optional(),
	packages: () => z.array(packageItemSchema).optional(),
	caseStudies: () => z.array(caseStudyItemSchema).optional(),
	testimonials: () => z.array(testimonialItemSchema).optional(),
	faqs: () => z.array(faqItemSchema).optional(),
	isActive: (schema) => schema.optional(),
	order: (schema) => schema.optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const webDevSubServiceUpdateSchema = createUpdateSchema(webDevSubServicesTable, {
	slug: (schema) => schema.regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens').optional(),
	serviceId: (schema) => schema.refine(() => true, { message: 'Service ID must be a valid UUID' }).optional(),
	heroContent: () => heroContentSchema.optional(),
	features: () => z.array(featureSchema).optional(),
	processSteps: () => z.array(processStepSchema).optional(),
	packages: () => z.array(packageItemSchema).optional(),
	caseStudies: () => z.array(caseStudyItemSchema).optional(),
	testimonials: () => z.array(testimonialItemSchema).optional(),
	faqs: () => z.array(faqItemSchema).optional(),
	ogImage: () => imageSchema.optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const webDevSubServiceSelectSchema = createSelectSchema(webDevSubServicesTable);

// Web Dev Packages
export const webDevPackageInsertSchema = createInsertSchema(webDevPackagesTable, {
	subServiceId: (schema) => schema.refine(() => true, { message: 'Sub service ID must be a valid UUID' }),
	name: (schema) => schema.min(1, 'Package name is required'),
	description: (schema) => schema.optional(),
	price: (schema) => schema.min(0, 'Price must be non-negative'),
	currency: (schema) => schema.default('USD'),
	features: () => z.array(z.string()).optional(),
	isPopular: (schema) => schema.optional(),
	isActive: (schema) => schema.optional(),
	order: (schema) => schema.optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const webDevPackageUpdateSchema = createUpdateSchema(webDevPackagesTable, {
	subServiceId: (schema) => schema.refine(() => true, { message: 'Sub service ID must be a valid UUID' }).optional(),
	price: (schema) => schema.min(0, 'Price must be non-negative').optional(),
	features: () => z.array(z.string()).optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const webDevPackageSelectSchema = createSelectSchema(webDevPackagesTable);

// Web Dev Case Studies
export const webDevCaseStudyInsertSchema = createInsertSchema(webDevCaseStudiesTable, {
	subServiceId: (schema) => schema.refine(() => true, { message: 'Sub service ID must be a valid UUID' }),
	title: (schema) => schema.min(1, 'Title is required'),
	description: (schema) => schema.optional(),
	clientName: (schema) => schema.optional(),
	results: () =>
		z
			.array(
				z.object({
					metric: z.string(),
					value: z.string(),
					description: z.string().optional(),
				})
			)
			.optional(),
	image: () => imageSchema.optional(),
	isActive: (schema) => schema.optional(),
	order: (schema) => schema.optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const webDevCaseStudyUpdateSchema = createUpdateSchema(webDevCaseStudiesTable, {
	subServiceId: (schema) => schema.refine(() => true, { message: 'Sub service ID must be a valid UUID' }).optional(),
	results: () =>
		z
			.array(
				z.object({
					metric: z.string(),
					value: z.string(),
					description: z.string().optional(),
				})
			)
			.optional(),
	image: () => imageSchema.optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const webDevCaseStudySelectSchema = createSelectSchema(webDevCaseStudiesTable);

// Web Dev Testimonials
export const webDevTestimonialInsertSchema = createInsertSchema(webDevTestimonialsTable, {
	subServiceId: (schema) => schema.refine(() => true, { message: 'Sub service ID must be a valid UUID' }),
	name: (schema) => schema.min(1, 'Name is required'),
	role: (schema) => schema.optional(),
	company: (schema) => schema.optional(),
	content: (schema) => schema.min(1, 'Content is required'),
	image: () => imageSchema.optional(),
	rating: (schema) => schema.min(0).max(5).optional(),
	isActive: (schema) => schema.optional(),
	order: (schema) => schema.optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const webDevTestimonialUpdateSchema = createUpdateSchema(webDevTestimonialsTable, {
	subServiceId: (schema) => schema.refine(() => true, { message: 'Sub service ID must be a valid UUID' }).optional(),
	rating: (schema) => schema.min(0).max(5).optional(),
	image: () => imageSchema.optional(),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const webDevTestimonialSelectSchema = createSelectSchema(webDevTestimonialsTable);

// Revalidation schema
export const revalidateSchema = z.object({
	paths: z.array(z.string()).optional(),
});

