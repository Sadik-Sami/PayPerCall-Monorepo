import { pgTable, varchar, uuid, timestamp, boolean, jsonb, integer, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const webDevServicesTable = pgTable('web_dev_services', {
	id: uuid('id').defaultRandom().primaryKey(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description'),
	metaTitle: varchar('meta_title', { length: 255 }),
	metaDescription: text('meta_description'),
	heroTitle: varchar('hero_title', { length: 255 }),
	heroSubtitle: text('hero_subtitle'),
	heroImage: jsonb('hero_image').$type<{
		url: string;
		publicId: string;
		alt?: string;
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
	isActive: boolean('is_active').default(true).notNull(),
	order: integer('order').default(0).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export type WebDevService = typeof webDevServicesTable.$inferSelect;
export type NewWebDevService = typeof webDevServicesTable.$inferInsert;

// Relations are defined in web-dev-sub-services.schema.ts to avoid circular dependency

