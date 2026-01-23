import { Request, Response, NextFunction } from 'express';
import { blockServices } from './blocks.service';
import { AppError } from '../../middlewares/errorHandler';
import { isValidUUID } from '../../utils/validation.util';

export const blocksController = {
	// PUT /api/admin/blocks/:id
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const blockId = req.params.id;
			if (!isValidUUID(blockId)) throw new AppError('Invalid block ID format', 400);

			const updated = await blockServices.updateBlock(blockId, req.body);
			res.json({ success: true, statusCode: 200, message: 'Block updated', data: updated });
		} catch (error) {
			next(error);
		}
	},

	// DELETE /api/admin/blocks/:id
	async remove(req: Request, res: Response, next: NextFunction) {
		try {
			const blockId = req.params.id;
			if (!isValidUUID(blockId)) throw new AppError('Invalid block ID format', 400);

			await blockServices.deleteBlock(blockId);
			res.json({ success: true, statusCode: 200, message: 'Block deleted' });
		} catch (error) {
			next(error);
		}
	},

	// POST /api/admin/blocks/reorder
	async reorder(req: Request, res: Response, next: NextFunction) {
		try {
			const { blogId, orderedBlockIds } = req.body;
			if (!isValidUUID(blogId)) throw new AppError('Invalid blog ID format', 400);

			await blockServices.reorder(blogId, orderedBlockIds);
			res.json({ success: true, statusCode: 200, message: 'Blocks reordered' });
		} catch (error) {
			next(error);
		}
	},
};

