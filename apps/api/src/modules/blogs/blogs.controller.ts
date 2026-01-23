import { Request, Response, NextFunction } from 'express';
import { blogServices } from './blogs.service';
import { AppError } from '../../middlewares/errorHandler';
import { isValidUUID } from '../../utils/validation.util';

export const blogsController = {
	// GET /api/admin/blogs
	async listAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const blogs = await blogServices.listAdmin();
			res.json({
				success: true,
				statusCode: 200,
				message: 'Blogs retrieved',
				data: blogs,
				count: blogs.length,
			});
		} catch (error) {
			next(error);
		}
	},

	// GET /api/admin/blogs/:id
	async getByIdAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const blogId = req.params.id;
			if (!isValidUUID(blogId)) throw new AppError('Invalid blog ID format', 400);

			const blog = await blogServices.getByIdOrThrow(blogId);
			res.json({ success: true, statusCode: 200, message: 'Blog retrieved', data: blog });
		} catch (error) {
			next(error);
		}
	},

	// GET /api/admin/blogs/:id/blocks
	async listBlocksAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const blogId = req.params.id;
			if (!isValidUUID(blogId)) throw new AppError('Invalid blog ID format', 400);

			const blocks = await blogServices.listBlocks(blogId);
			res.json({
				success: true,
				statusCode: 200,
				message: 'Blocks retrieved',
				data: blocks,
				count: blocks.length,
			});
		} catch (error) {
			next(error);
		}
	},

	// POST /api/admin/blogs
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const created = await blogServices.create({
				...req.body,
				author_id: req.user?.id,
			});
			res.json({ success: true, statusCode: 201, message: 'Blog created', data: created });
		} catch (error) {
			next(error);
		}
	},

	// PUT /api/admin/blogs/:id
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const blogId = req.params.id;
			if (!isValidUUID(blogId)) throw new AppError('Invalid blog ID format', 400);

			const updated = await blogServices.update(blogId, req.body);
			res.json({ success: true, statusCode: 200, message: 'Blog updated', data: updated });
		} catch (error) {
			next(error);
		}
	},

	// DELETE /api/admin/blogs/:id
	async remove(req: Request, res: Response, next: NextFunction) {
		try {
			const blogId = req.params.id;
			if (!isValidUUID(blogId)) throw new AppError('Invalid blog ID format', 400);

			await blogServices.remove(blogId);
			res.json({ success: true, statusCode: 200, message: 'Blog deleted' });
		} catch (error) {
			next(error);
		}
	},

	// GET /api/blogs
	async listPublished(req: Request, res: Response, next: NextFunction) {
		try {
			const blogs = await blogServices.listPublished();
			res.json({
				success: true,
				statusCode: 200,
				message: 'Blogs retrieved',
				data: blogs,
				count: blogs.length,
			});
		} catch (error) {
			next(error);
		}
	},

	// GET /api/blogs/:slug
	async getPublishedBySlug(req: Request, res: Response, next: NextFunction) {
		try {
			const slug = req.params.slug;
			if (!slug || typeof slug !== 'string') throw new AppError('Slug is required', 400);

			const result = await blogServices.getPublishedBySlug(slug);
			res.json({ success: true, statusCode: 200, message: 'Blog retrieved', data: result });
		} catch (error) {
			next(error);
		}
	},

	// POST /api/admin/blogs/:id/blocks
	async createBlock(req: Request, res: Response, next: NextFunction) {
		try {
			const blogId = req.params.id;
			if (!isValidUUID(blogId)) throw new AppError('Invalid blog ID format', 400);

			const created = await blogServices.createBlock(blogId, req.body);
			res.json({ success: true, statusCode: 201, message: 'Block created', data: created });
		} catch (error) {
			next(error);
		}
	},
};

