import { pgTable, pgEnum, uuid, varchar, text, integer, timestamp, index } from 'drizzle-orm/pg-core';
import { usersTable } from './users.schema';

export const caseStudyCategoryEnum = pgEnum('case_study_category', [
	'pay-per-call',
	'pay-per-lead',
	'digital-marketing',
	'app-dev',
	'cms',
	'web-dev',
	'hire-call-center',
]);

export const caseStudyStatusEnum = pgEnum('case_study_status', [
	'draft',
	'published',
	'archived',
]);

export const caseStudyAccentEnum = pgEnum('case_study_accent', [
	'pastel-peach',
	'pastel-lilac',
	'pastel-lime',
	'pastel-mint',
	'pastel-sky',
	'pastel-blush',
]);

export const caseStudiesTable = pgTable(
	'case_studies',
	{
		id: uuid('id').defaultRandom().primaryKey(),

		title: varchar('title', { length: 200 }).notNull(),
		slug: varchar('slug', { length: 220 }).notNull().unique(),
		description: text('description').notNull(),

		image_url: varchar('image_url', { length: 2048 }),
		image_alt: varchar('image_alt', { length: 255 }),
		accent_color: caseStudyAccentEnum('accent_color'),

		category: caseStudyCategoryEnum('category').notNull(),
		status: caseStudyStatusEnum('status').default('draft').notNull(),
		display_order: integer('display_order').default(0).notNull(),

		published_at: timestamp('published_at', { withTimezone: true }),
		created_by: uuid('created_by').references(() => usersTable.id, { onDelete: 'set null' }),

		created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp('updated_at', { withTimezone: true })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [
		index('case_studies_public_idx').on(table.category, table.status, table.display_order),
		index('case_studies_status_updated_idx').on(table.status, table.updated_at),
		index('case_studies_category_idx').on(table.category),
		index('case_studies_created_at_idx').on(table.created_at),
	]
);

export type CaseStudy = typeof caseStudiesTable.$inferSelect;
export type NewCaseStudy = typeof caseStudiesTable.$inferInsert;
