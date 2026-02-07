import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { leadsTable } from '../schema/leads.schema';

export const leadStatusSchema = z.enum(['pending', 'processing', 'replied', 'won', 'lost']);

const leadInsertSchema = createInsertSchema(leadsTable, {
	name: (schema) => schema.min(1, 'Full name is required'),
	email: (schema) => schema.email('Please enter a valid email'),
	company: (schema) => schema.optional(),
	project_type: (schema) => schema.optional(),
	project_summary: (schema) => schema.optional(),
	category: (schema) => schema.min(1, 'Category is required'),
	source_page: (schema) => schema.min(1, 'Source page is required'),
}).omit({
	id: true,
	status: true,
	ip_address: true,
	user_agent: true,
	created_at: true,
	updated_at: true,
});

export const leadCreateSchema = z.object({
	name: leadInsertSchema.shape.name,
	email: leadInsertSchema.shape.email,
	company: leadInsertSchema.shape.company.optional(),
	projectType: leadInsertSchema.shape.project_type.optional(),
	projectSummary: leadInsertSchema.shape.project_summary.optional(),
	category: leadInsertSchema.shape.category,
	sourcePage: leadInsertSchema.shape.source_page,
});

export const leadStatusUpdateSchema = z.object({
	status: leadStatusSchema,
});

export const leadListQuerySchema = z.object({
	category: z.union([z.string(), z.array(z.string())]).optional(),
	status: z.union([leadStatusSchema, z.array(leadStatusSchema)]).optional(),
	search: z.string().optional(),
	sortBy: z.enum(['created_at', 'updated_at', 'status']).optional(),
	sortOrder: z.enum(['asc', 'desc']).optional(),
	page: z.coerce.number().int().min(1).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type LeadCreateInput = z.infer<typeof leadCreateSchema>;
export type LeadStatusUpdateInput = z.infer<typeof leadStatusUpdateSchema>;
export type LeadListQueryInput = z.infer<typeof leadListQuerySchema>;

