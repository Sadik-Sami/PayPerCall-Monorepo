import { pgTable, varchar, uuid, timestamp, boolean, jsonb, integer, text, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { webDevSubServicesTable } from './web-dev-sub-services.schema';

export const webDevTestimonialsTable = pgTable('web_dev_testimonials', {
	id: uuid('id').defaultRandom().primaryKey(),
	subServiceId: uuid('sub_service_id')
		.notNull()
		.references(() => webDevSubServicesTable.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 255 }).notNull(),
	role: varchar('role', { length: 255 }),
	company: varchar('company', { length: 255 }),
	content: text('content').notNull(),
	image: jsonb('image').$type<{
		url: string;
		publicId: string;
		alt?: string;
	}>(),
	rating: numeric('rating', { precision: 2, scale: 1 }),
	isActive: boolean('is_active').default(true).notNull(),
	order: integer('order').default(0).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export type WebDevTestimonial = typeof webDevTestimonialsTable.$inferSelect;
export type NewWebDevTestimonial = typeof webDevTestimonialsTable.$inferInsert;

export const webDevTestimonialsRelations = relations(webDevTestimonialsTable, ({ one }) => ({
	subService: one(webDevSubServicesTable, {
		fields: [webDevTestimonialsTable.subServiceId],
		references: [webDevSubServicesTable.id],
	}),
}));

