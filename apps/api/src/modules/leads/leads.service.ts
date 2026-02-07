import { and, asc, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm';
import { db } from '../../db';
import { leadsTable, type Lead, type NewLead } from '../../db/schema';
import { AppError } from '../../middlewares/errorHandler';
import type { LeadListQueryInput, LeadStatusUpdateInput } from '../../db/validator/lead.validator';

type LeadListResult = {
	data: Lead[];
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};

function normalizeList<T extends string>(value?: T | T[]): T[] | undefined {
	if (!value) return undefined;
	const raw = Array.isArray(value) ? value : value.split(',');
	const cleaned = raw
		.map((item) => item.trim())
		.filter((item) => item.length > 0) as T[];
	return cleaned.length > 0 ? cleaned : undefined;
}

function buildWhere(query: LeadListQueryInput) {
	const filters = [];

	const categories = normalizeList(query.category);
	if (categories) {
		filters.push(inArray(leadsTable.category, categories));
	}

	const statuses = normalizeList(query.status);
	if (statuses) {
		filters.push(inArray(leadsTable.status, statuses));
	}

	const search = query.search?.trim();
	if (search) {
		const pattern = `%${search}%`;
		filters.push(
			or(
				ilike(leadsTable.name, pattern),
				ilike(leadsTable.email, pattern),
				ilike(leadsTable.company, pattern),
				ilike(leadsTable.project_summary, pattern)
			)
		);
	}

	if (filters.length === 0) return undefined;
	return and(...filters);
}

function buildOrderBy(sortBy?: LeadListQueryInput['sortBy'], sortOrder?: LeadListQueryInput['sortOrder']) {
	const direction = sortOrder === 'asc' ? asc : desc;
	switch (sortBy) {
		case 'updated_at':
			return direction(leadsTable.updated_at);
		case 'status':
			return direction(leadsTable.status);
		case 'created_at':
		default:
			return direction(leadsTable.created_at);
	}
}

export const leadsService = {
	async create(data: NewLead): Promise<Lead> {
		const [created] = await db.insert(leadsTable).values(data).returning();
		if (!created) throw new AppError('Failed to create lead', 500);
		return created;
	},

	async getByIdOrThrow(id: string): Promise<Lead> {
		const rows = await db.select().from(leadsTable).where(eq(leadsTable.id, id)).limit(1);
		const lead = rows[0];
		if (!lead) throw new AppError('Lead not found', 404);
		return lead;
	},

	async updateStatus(id: string, data: LeadStatusUpdateInput): Promise<Lead> {
		const [updated] = await db
			.update(leadsTable)
			.set({ status: data.status, updated_at: new Date() })
			.where(eq(leadsTable.id, id))
			.returning();
		if (!updated) throw new AppError('Lead not found', 404);
		return updated;
	},

	async listAdmin(query: LeadListQueryInput): Promise<LeadListResult> {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const offset = (page - 1) * limit;

		const where = buildWhere(query);
		const orderBy = buildOrderBy(query.sortBy, query.sortOrder);

		const [rows, countRows] = await Promise.all([
			db.select().from(leadsTable).where(where).orderBy(orderBy).limit(limit).offset(offset),
			db
				.select({ count: sql<number>`count(*)` })
				.from(leadsTable)
				.where(where),
		]);

		const total = Number(countRows[0]?.count ?? 0);
		const totalPages = total === 0 ? 1 : Math.ceil(total / limit);

		return { data: rows, page, limit, total, totalPages };
	},
};

