import { and, asc, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm';
import { db } from '../../db';
import {
	contactSubmissionsTable,
	type ContactSubmission,
	type NewContactSubmission,
} from '../../db/schema';
import { AppError } from '../../utils/error.util';
import type {
	ContactSubmissionListQueryInput,
	ContactSubmissionStatusUpdateInput,
} from '../../validators/contact-submission.validator';

type ContactSubmissionListResult = {
	data: ContactSubmission[];
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

function buildWhere(query: ContactSubmissionListQueryInput) {
	const filters = [];

	const categories = normalizeList(query.serviceCategory);
	if (categories) {
		filters.push(inArray(contactSubmissionsTable.service_category, categories));
	}

	const statuses = normalizeList(query.status);
	if (statuses) {
		filters.push(inArray(contactSubmissionsTable.status, statuses));
	}

	const search = query.search?.trim();
	if (search) {
		const pattern = `%${search}%`;
		filters.push(
			or(
				ilike(contactSubmissionsTable.full_name, pattern),
				ilike(contactSubmissionsTable.work_email, pattern),
				ilike(contactSubmissionsTable.company, pattern),
				ilike(contactSubmissionsTable.additional_context, pattern),
			),
		);
	}

	if (filters.length === 0) return undefined;
	return and(...filters);
}

function buildOrderBy(
	sortBy?: ContactSubmissionListQueryInput['sortBy'],
	sortOrder?: ContactSubmissionListQueryInput['sortOrder'],
) {
	const direction = sortOrder === 'asc' ? asc : desc;
	switch (sortBy) {
		case 'updated_at':
			return direction(contactSubmissionsTable.updated_at);
		case 'desired_date':
			return direction(contactSubmissionsTable.desired_date);
		case 'status':
			return direction(contactSubmissionsTable.status);
		case 'created_at':
		default:
			return direction(contactSubmissionsTable.created_at);
	}
}

export const contactSubmissionsService = {
	async create(data: NewContactSubmission): Promise<ContactSubmission> {
		const [created] = await db.insert(contactSubmissionsTable).values(data).returning();
		if (!created) throw new AppError('Failed to create contact submission', 500);
		return created;
	},

	async getByIdOrThrow(id: string): Promise<ContactSubmission> {
		const rows = await db
			.select()
			.from(contactSubmissionsTable)
			.where(eq(contactSubmissionsTable.id, id))
			.limit(1);
		const submission = rows[0];
		if (!submission) throw new AppError('Contact submission not found', 404);
		return submission;
	},

	async updateStatus(
		id: string,
		data: ContactSubmissionStatusUpdateInput,
	): Promise<ContactSubmission> {
		const [updated] = await db
			.update(contactSubmissionsTable)
			.set({ status: data.status, updated_at: new Date() })
			.where(eq(contactSubmissionsTable.id, id))
			.returning();
		if (!updated) throw new AppError('Contact submission not found', 404);
		return updated;
	},

	async listAdmin(query: ContactSubmissionListQueryInput): Promise<ContactSubmissionListResult> {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const offset = (page - 1) * limit;

		const where = buildWhere(query);
		const orderBy = buildOrderBy(query.sortBy, query.sortOrder);

		const [rows, countRows] = await Promise.all([
			db
				.select()
				.from(contactSubmissionsTable)
				.where(where)
				.orderBy(orderBy)
				.limit(limit)
				.offset(offset),
			db
				.select({ count: sql<number>`count(*)` })
				.from(contactSubmissionsTable)
				.where(where),
		]);

		const total = Number(countRows[0]?.count ?? 0);
		const totalPages = total === 0 ? 1 : Math.ceil(total / limit);

		return { data: rows, page, limit, total, totalPages };
	},
};
