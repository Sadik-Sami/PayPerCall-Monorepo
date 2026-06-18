import type { NextFunction, Request, Response } from 'express';
import { contactSubmissionsService } from './contact-submissions.service';
import { AppError } from '../../utils/error.util';
import { isValidUUID } from '../../utils/validation.util';
import { contactSubmissionListQuerySchema } from '../../validators/contact-submission.validator';
import type { ContactSubmissionCreateInput } from '../../validators/contact-submission.validator';
import type { NewContactSubmission } from '../../db/schema';

function nullIfEmpty(value: string | undefined | null) {
	if (value === undefined || value === null) return null;
	const trimmed = value.trim();
	return trimmed.length === 0 ? null : trimmed;
}

export const contactSubmissionsController = {
	// POST /api/contact-submissions
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const body = req.body as ContactSubmissionCreateInput;
			const payload: NewContactSubmission = {
				full_name: body.fullName,
				work_email: body.workEmail,
				company: body.company,
				phone: nullIfEmpty(body.phone),
				preferred_contact_method: body.preferredContactMethod,

				service_category: body.serviceCategory,
				service_detail: body.serviceDetail,
				business_website: nullIfEmpty(body.businessWebsite),
				company_size: body.companySize,
				monthly_budget: nullIfEmpty(body.monthlyBudget),
				target_regions: body.targetRegions,

				desired_date: body.desiredDate,
				preferred_meeting_window: body.preferredMeetingWindow,
				timezone: body.timezone,
				additional_context: nullIfEmpty(body.additionalContext),
				consent: body.consent,

				ip_address: req.ip,
				user_agent: req.get('user-agent') ?? undefined,
			};

			const created = await contactSubmissionsService.create(payload);
			res
				.status(201)
				.json({ success: true, statusCode: 201, message: 'Contact submission received', data: created });
		} catch (error) {
			next(error);
		}
	},

	// GET /api/admin/contact-submissions
	async listAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const query = contactSubmissionListQuerySchema.parse(req.query);
			const result = await contactSubmissionsService.listAdmin(query);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Contact submissions retrieved',
				data: result.data,
				meta: {
					page: result.page,
					limit: result.limit,
					total: result.total,
					totalPages: result.totalPages,
				},
			});
		} catch (error) {
			next(error);
		}
	},

	// GET /api/admin/contact-submissions/:id
	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (!isValidUUID(id)) throw new AppError('Invalid contact submission ID format', 400);

			const submission = await contactSubmissionsService.getByIdOrThrow(id);
			res.json({
				success: true,
				statusCode: 200,
				message: 'Contact submission retrieved',
				data: submission,
			});
		} catch (error) {
			next(error);
		}
	},

	// PATCH /api/admin/contact-submissions/:id/status
	async updateStatus(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.params.id;
			if (!isValidUUID(id)) throw new AppError('Invalid contact submission ID format', 400);

			const updated = await contactSubmissionsService.updateStatus(id, req.body);
			res.json({
				success: true,
				statusCode: 200,
				message: 'Contact submission status updated',
				data: updated,
			});
		} catch (error) {
			next(error);
		}
	},
};
