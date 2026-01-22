import { db } from '@/db';
import { blogBlocksTable } from '@/db/schema';
import { AppError } from '@/middlewares/errorHandler';
import { asc, eq } from 'drizzle-orm';
import type { BlockUpdateInput } from '@/db/validator/blogBlock.validator';
import { validateBlockContentType } from '@/utils/blogBlocks.util';

type DbOrTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0] | typeof db;

async function repackOrders(blogId: string, tx: DbOrTransaction) {
	const blocks = await tx
		.select()
		.from(blogBlocksTable)
		.where(eq(blogBlocksTable.blog_id, blogId))
		.orderBy(asc(blogBlocksTable.order));

	for (let i = 0; i < blocks.length; i += 1) {
		const block = blocks[i];
		if (block) {
			await tx.update(blogBlocksTable).set({ order: i }).where(eq(blogBlocksTable.id, block.id));
		}
	}
}

export const blockServices = {
	async updateBlock(id: string, input: BlockUpdateInput) {
		const rows = await db.select().from(blogBlocksTable).where(eq(blogBlocksTable.id, id)).limit(1);
		const existing = rows[0];
		if (!existing) throw new AppError('Block not found', 404);

		const typeCheck = validateBlockContentType({ blockType: existing.type, contentType: input.content.type });
		if (!typeCheck.ok) {
			throw new AppError(
				`Block content.type must be "${typeCheck.expected}" for block type "${existing.type}"`,
				400
			);
		}

		const [updated] = await db
			.update(blogBlocksTable)
			.set({ content: input.content })
			.where(eq(blogBlocksTable.id, id))
			.returning();
		if (!updated) throw new AppError('Failed to update block', 500);
		return updated;
	},

	async deleteBlock(id: string) {
		await db.transaction(async (tx) => {
			const rows = await tx.select().from(blogBlocksTable).where(eq(blogBlocksTable.id, id)).limit(1);
			const block = rows[0];
			if (!block) throw new AppError('Block not found', 404);

			await tx.delete(blogBlocksTable).where(eq(blogBlocksTable.id, id));
			await repackOrders(block.blog_id, tx);
		});
	},

	async reorder(blogId: string, orderedBlockIds: string[]) {
		await db.transaction(async (tx) => {
			const existing = await tx
				.select({ id: blogBlocksTable.id })
				.from(blogBlocksTable)
				.where(eq(blogBlocksTable.blog_id, blogId));

			if (existing.length !== orderedBlockIds.length) {
				throw new AppError('Block count mismatch for reorder', 400);
			}

			const existingSet = new Set(existing.map((row) => row.id));
			for (const id of orderedBlockIds) {
				if (!existingSet.has(id)) {
					throw new AppError('One or more blocks do not belong to this blog', 400);
				}
			}

			// Avoid UNIQUE(blog_id, order) conflicts when swapping orders by first moving rows
			// to a temporary unique negative range, then applying the final 0..n-1 order.
			for (let i = 0; i < orderedBlockIds.length; i += 1) {
				const blockId = orderedBlockIds[i];
				if (blockId) {
					await tx.update(blogBlocksTable).set({ order: -(i + 1) }).where(eq(blogBlocksTable.id, blockId));
				}
			}

			for (let i = 0; i < orderedBlockIds.length; i += 1) {
				const blockId = orderedBlockIds[i];
				if (blockId) {
					await tx.update(blogBlocksTable).set({ order: i }).where(eq(blogBlocksTable.id, blockId));
				}
			}
		});
	},
};

