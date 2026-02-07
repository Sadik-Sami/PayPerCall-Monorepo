import { pgEnum, pgTable, uuid, varchar, text, timestamp, index } from 'drizzle-orm/pg-core';

export const leadStatusEnum = pgEnum('lead_status', ['pending', 'processing', 'replied', 'won', 'lost']);

export const leadsTable = pgTable(
  'leads',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    company: varchar('company', { length: 255 }),
    project_type: varchar('project_type', { length: 255 }),
    project_summary: text('project_summary'),
    category: varchar('category', { length: 100 }).notNull(),
    source_page: varchar('source_page', { length: 255 }).notNull(),
    status: leadStatusEnum('status').default('pending').notNull(),
    ip_address: varchar('ip_address', { length: 45 }),
    user_agent: text('user_agent'),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index('leads_status_idx').on(table.status),
    index('leads_category_idx').on(table.category),
    index('leads_created_at_idx').on(table.created_at),
  ]
);

export type Lead = typeof leadsTable.$inferSelect;
export type NewLead = typeof leadsTable.$inferInsert;

