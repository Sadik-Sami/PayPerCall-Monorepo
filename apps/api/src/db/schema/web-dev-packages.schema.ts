import { pgTable, varchar, uuid, timestamp, boolean, jsonb, integer, text, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { webDevSubServicesTable } from './web-dev-sub-services.schema';

export const webDevPackagesTable = pgTable('web_dev_packages', {
	id: uuid('id').defaultRandom().primaryKey(),
	subServiceId: uuid('sub_service_id')
		.notNull()
		.references(() => webDevSubServicesTable.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	price: numeric('price', { precision: 10, scale: 2 }).notNull(),
	currency: varchar('currency', { length: 10 }).default('USD').notNull(),
	features: jsonb('features').$type<string[]>(),
	isPopular: boolean('is_popular').default(false).notNull(),
	isActive: boolean('is_active').default(true).notNull(),
	order: integer('order').default(0).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export type WebDevPackage = typeof webDevPackagesTable.$inferSelect;
export type NewWebDevPackage = typeof webDevPackagesTable.$inferInsert;

export const webDevPackagesRelations = relations(webDevPackagesTable, ({ one }) => ({
	subService: one(webDevSubServicesTable, {
		fields: [webDevPackagesTable.subServiceId],
		references: [webDevSubServicesTable.id],
	}),
}));

