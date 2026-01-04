import { pgTable, varchar, uuid, timestamp, boolean, jsonb, integer, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { webDevServicesTable } from './web-dev-services.schema';

export const webDevSubServicesTable = pgTable('web_dev_sub_services', {
	id: uuid('id').defaultRandom().primaryKey(),
	serviceId: uuid('service_id')
		.notNull()
		.references(() => webDevServicesTable.id, { onDelete: 'cascade' }),
	slug: varchar('slug', { length: 255 }).notNull(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description'),
	metaTitle: varchar('meta_title', { length: 255 }),
	metaDescription: text('meta_description'),
	ogImage: jsonb('og_image').$type<{
		url: string;
		publicId: string;
		alt?: string;
	}>(),
	heroContent: jsonb('hero_content').$type<{
		title: string;
		subtitle: string;
		description?: string;
		image?: {
			url: string;
			publicId: string;
			alt?: string;
		};
		ctaText?: string;
		ctaLink?: string;
	}>(),
	features: jsonb('features').$type<
		Array<{
			title: string;
			description: string;
			icon?: string;
		}>
	>(),
	processSteps: jsonb('process_steps').$type<
		Array<{
			step: number;
			title: string;
			description: string;
			icon?: string;
		}>
	>(),
	packages: jsonb('packages').$type<
		Array<{
			id: string;
			name: string;
			description: string;
			price: number;
			currency: string;
			features: string[];
			isPopular: boolean;
		}>
	>(),
	caseStudies: jsonb('case_studies').$type<
		Array<{
			id: string;
			title: string;
			description: string;
			clientName: string;
			results: {
				metric: string;
				value: string;
			}[];
			image?: {
				url: string;
				publicId: string;
				alt?: string;
			};
		}>
	>(),
	testimonials: jsonb('testimonials').$type<
		Array<{
			id: string;
			name: string;
			role: string;
			company: string;
			content: string;
			image?: {
				url: string;
				publicId: string;
				alt?: string;
			};
			rating?: number;
		}>
	>(),
	faqs: jsonb('faqs').$type<
		Array<{
			id: string;
			question: string;
			answer: string;
		}>
	>(),
	isActive: boolean('is_active').default(true).notNull(),
	order: integer('order').default(0).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export type WebDevSubService = typeof webDevSubServicesTable.$inferSelect;
export type NewWebDevSubService = typeof webDevSubServicesTable.$inferInsert;

export const webDevSubServicesRelations = relations(webDevSubServicesTable, ({ one }) => ({
	service: one(webDevServicesTable, {
		fields: [webDevSubServicesTable.serviceId],
		references: [webDevServicesTable.id],
	}),
}));

