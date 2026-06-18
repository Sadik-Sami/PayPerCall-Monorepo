import { boolean, index, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const contactStatusEnum = pgEnum('contact_status', [
	'pending',
	'contacted',
	'scheduled',
	'completed',
	'declined',
]);

export const contactSubmissionsTable = pgTable(
	'contact_submissions',
	{
		id: uuid('id').defaultRandom().primaryKey(),

		full_name: varchar('full_name', { length: 255 }).notNull(),
		work_email: varchar('work_email', { length: 255 }).notNull(),
		company: varchar('company', { length: 255 }).notNull(),
		phone: varchar('phone', { length: 50 }),
		preferred_contact_method: varchar('preferred_contact_method', { length: 50 }).notNull(),

		service_category: varchar('service_category', { length: 100 }).notNull(),
		service_detail: varchar('service_detail', { length: 100 }).notNull(),
		business_website: varchar('business_website', { length: 500 }),
		company_size: varchar('company_size', { length: 50 }).notNull(),
		monthly_budget: varchar('monthly_budget', { length: 50 }),
		target_regions: varchar('target_regions', { length: 255 }).notNull(),

		desired_date: timestamp('desired_date', { withTimezone: true }).notNull(),
		preferred_meeting_window: varchar('preferred_meeting_window', { length: 50 }).notNull(),
		timezone: varchar('timezone', { length: 100 }).notNull(),
		additional_context: text('additional_context'),
		consent: boolean('consent').notNull(),

		status: contactStatusEnum('status').default('pending').notNull(),
		ip_address: varchar('ip_address', { length: 45 }),
		user_agent: text('user_agent'),
		created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp('updated_at', { withTimezone: true })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index('contact_submissions_status_idx').on(table.status),
		index('contact_submissions_service_category_idx').on(table.service_category),
		index('contact_submissions_created_at_idx').on(table.created_at),
		index('contact_submissions_desired_date_idx').on(table.desired_date),
	],
);

export type ContactSubmission = typeof contactSubmissionsTable.$inferSelect;
export type NewContactSubmission = typeof contactSubmissionsTable.$inferInsert;
