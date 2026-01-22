import { pgEnum, pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { usersTable } from './users.schema';
import { blogBlocksTable } from './blogBlocks.schema';

export const blogStatusEnum = pgEnum('blog_status', ['draft', 'published', 'unlisted']);

export const blogsTable = pgTable('blogs', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	excerpt: varchar('excerpt', { length: 500 }),
	cover_image_url: varchar('cover_image_url', { length: 2048 }),
	seo_title: varchar('seo_title', { length: 60 }),
	seo_description: varchar('seo_description', { length: 160 }),
	is_featured: boolean('is_featured').default(false).notNull(),
	status: blogStatusEnum('status').default('draft').notNull(),
	published_at: timestamp('published_at', { withTimezone: true }),
	author_id: uuid('author_id').references(() => usersTable.id, { onDelete: 'set null' }),
	created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updated_at: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export type Blog = typeof blogsTable.$inferSelect;
export type NewBlog = typeof blogsTable.$inferInsert;

export const blogRelations = relations(blogsTable, ({ one, many }) => ({
	author: one(usersTable, {
		fields: [blogsTable.author_id],
		references: [usersTable.id],
	}),
	blocks: many(blogBlocksTable),
}));

