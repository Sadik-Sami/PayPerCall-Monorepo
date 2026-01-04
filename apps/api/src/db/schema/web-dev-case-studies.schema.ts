import { pgTable, varchar, uuid, timestamp, boolean, jsonb, integer, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { webDevSubServicesTable } from './web-dev-sub-services.schema';

export const webDevCaseStudiesTable = pgTable('web_dev_case_studies', {
	id: uuid('id').defaultRandom().primaryKey(),
	subServiceId: uuid('sub_service_id')
		.notNull()
		.references(() => webDevSubServicesTable.id, { onDelete: 'cascade' }),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description'),
	clientName: varchar('client_name', { length: 255 }),
	results: jsonb('results').$type<
		Array<{
			metric: string;
			value: string;
			description?: string;
		}>
	>(),
	image: jsonb('image').$type<{
		url: string;
		publicId: string;
		alt?: string;
	}>(),
	isActive: boolean('is_active').default(true).notNull(),
	order: integer('order').default(0).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export type WebDevCaseStudy = typeof webDevCaseStudiesTable.$inferSelect;
export type NewWebDevCaseStudy = typeof webDevCaseStudiesTable.$inferInsert;

export const webDevCaseStudiesRelations = relations(webDevCaseStudiesTable, ({ one }) => ({
	subService: one(webDevSubServicesTable, {
		fields: [webDevCaseStudiesTable.subServiceId],
		references: [webDevSubServicesTable.id],
	}),
}));

