import type { Request, Response, NextFunction } from 'express';
import { leadsService } from './leads.service';
import { AppError } from '../../middlewares/errorHandler';
import { isValidUUID } from '../../utils/validation.util';
import type { LeadCreateInput } from '../../db/validator/lead.validator';
import { leadListQuerySchema } from '../../db/validator/lead.validator';
import type { NewLead } from '../../db/schema';

export const leadsController = {
  // POST /api/leads
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as LeadCreateInput;
      const payload: NewLead = {
        name: body.name,
        email: body.email,
        company: body.company,
        project_type: body.projectType,
        project_summary: body.projectSummary,
        category: body.category,
        source_page: body.sourcePage,
        ip_address: req.ip,
        user_agent: req.get('user-agent') ?? undefined,
      };
      const created = await leadsService.create(payload);
      res.json({ success: true, statusCode: 201, message: 'Lead created', data: created });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/admin/leads
  async listAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const query = leadListQuerySchema.parse(req.query);
      const result = await leadsService.listAdmin(query);

      res.json({
        success: true,
        statusCode: 200,
        message: 'Leads retrieved',
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

  // GET /api/admin/leads/:id
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const leadId = req.params.id;
      if (!isValidUUID(leadId)) throw new AppError('Invalid lead ID format', 400);

      const lead = await leadsService.getByIdOrThrow(leadId);
      res.json({ success: true, statusCode: 200, message: 'Lead retrieved', data: lead });
    } catch (error) {
      next(error);
    }
  },

  // PATCH /api/admin/leads/:id/status
  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const leadId = req.params.id;
      if (!isValidUUID(leadId)) throw new AppError('Invalid lead ID format', 400);

      const updated = await leadsService.updateStatus(leadId, req.body);
      res.json({ success: true, statusCode: 200, message: 'Lead status updated', data: updated });
    } catch (error) {
      next(error);
    }
  },
};

