import { pgEnum, pgTable, uuid, jsonb, integer, timestamp, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { blogsTable } from './blogs.schema';

export const blogBlockTypeEnum = pgEnum('blog_block_type', [
	'paragraph',
	'heading',
	'image',
	'gallery',
	'quote',
	'code',
	'bullet_list',
	'ordered_list',
	'divider',
]);

export const blogBlocksTable = pgTable(
	'blog_blocks',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		blog_id: uuid('blog_id')
			.notNull()
			.references(() => blogsTable.id, { onDelete: 'cascade' }),
		type: blogBlockTypeEnum('type').notNull(),
		content: jsonb('content').notNull(),
		order: integer('order').notNull(),
		created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	},
	(table) => ({
		blogIdIdx: index('blog_blocks_blog_id_idx').on(table.blog_id),
		blogOrderUnique: uniqueIndex('blog_blocks_blog_id_order_unique').on(table.blog_id, table.order),
	})
);

export type BlogBlock = typeof blogBlocksTable.$inferSelect;
export type NewBlogBlock = typeof blogBlocksTable.$inferInsert;

export const blogBlockRelations = relations(blogBlocksTable, ({ one }) => ({
	blog: one(blogsTable, {
		fields: [blogBlocksTable.blog_id],
		references: [blogsTable.id],
	}),
}));

