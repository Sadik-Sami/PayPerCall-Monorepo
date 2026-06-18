import type { Request, Response, NextFunction } from 'express';
import { caseStudyServices } from './case-studies.service';
import { AppError } from '../../utils/error.util';
import { isValidUUID } from '../../utils/validation.util';
import {
	caseStudyListQuerySchema,
	caseStudyPublicListQuerySchema,
} from '../../validators/case-study.validator';
import type {
	CaseStudyCreateInput,
	CaseStudyUpdateInput,
	CaseStudyStatusUpdateInput,
	CaseStudyReorderInput,
} from '../../validators/case-study.validator';

export const caseStudiesController = {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body as CaseStudyCreateInput;
			const createdBy = req.user?.id ?? null;
			const created = await caseStudyServices.create(data, createdBy);
			res.status(201).json({
				success: true,
				statusCode: 201,
				message: 'Case study created',
				data: created,
			});
		} catch (error) {
			next(error);
		}
	},

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (!isValidUUID(id)) throw new AppError('Invalid case study ID format', 400);

			const caseStudy = await caseStudyServices.getByIdOrThrow(id);
			res.json({
				success: true,
				statusCode: 200,
				message: 'Case study retrieved',
				data: caseStudy,
			});
		} catch (error) {
			next(error);
		}
	},

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (!isValidUUID(id)) throw new AppError('Invalid case study ID format', 400);

			const data = req.body as CaseStudyUpdateInput;
			const updated = await caseStudyServices.update(id, data);
			res.json({
				success: true,
				statusCode: 200,
				message: 'Case study updated',
				data: updated,
			});
		} catch (error) {
			next(error);
		}
	},

	async updateStatus(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (!isValidUUID(id)) throw new AppError('Invalid case study ID format', 400);

			const { status } = req.body as CaseStudyStatusUpdateInput;
			const updated = await caseStudyServices.updateStatus(id, status);
			res.json({
				success: true,
				statusCode: 200,
				message: 'Case study status updated',
				data: updated,
			});
		} catch (error) {
			next(error);
		}
	},

	async reorder(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body as CaseStudyReorderInput;
			await caseStudyServices.reorder(data);
			res.json({
				success: true,
				statusCode: 200,
				message: 'Case studies reordered',
				data: null,
			});
		} catch (error) {
			next(error);
		}
	},

	async remove(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (!isValidUUID(id)) throw new AppError('Invalid case study ID format', 400);

			await caseStudyServices.remove(id);
			res.json({
				success: true,
				statusCode: 200,
				message: 'Case study deleted',
				data: null,
			});
		} catch (error) {
			next(error);
		}
	},

	async listAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const query = caseStudyListQuerySchema.parse(req.query);
			const result = await caseStudyServices.listAdmin(query);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Case studies retrieved',
				data: result.data,
				meta: result.meta,
			});
		} catch (error) {
			next(error);
		}
	},

	async listPublic(req: Request, res: Response, next: NextFunction) {
		try {
			const query = caseStudyPublicListQuerySchema.parse(req.query);
			const data = await caseStudyServices.listPublic(query);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Case studies retrieved',
				data,
				count: data.length,
			});
		} catch (error) {
			next(error);
		}
	},
};
