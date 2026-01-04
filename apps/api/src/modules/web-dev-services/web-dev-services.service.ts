import { db } from '@/db';
import {
	webDevServicesTable,
	webDevSubServicesTable,
	webDevPackagesTable,
	webDevCaseStudiesTable,
	webDevTestimonialsTable,
	WebDevService,
	NewWebDevService,
	WebDevSubService,
	NewWebDevSubService,
	WebDevPackage,
	NewWebDevPackage,
	WebDevCaseStudy,
	NewWebDevCaseStudy,
	WebDevTestimonial,
	NewWebDevTestimonial,
} from '@/db/schema';
import { eq, and, desc, asc } from 'drizzle-orm';
import { AppError } from '@/middlewares/errorHandler';

export const webDevServicesService = {
	// Services
	async getAllServices(includeInactive = false): Promise<WebDevService[]> {
		if (includeInactive) {
			return db.select().from(webDevServicesTable).orderBy(asc(webDevServicesTable.order), asc(webDevServicesTable.createdAt));
		}
		return db
			.select()
			.from(webDevServicesTable)
			.where(eq(webDevServicesTable.isActive, true))
			.orderBy(asc(webDevServicesTable.order), asc(webDevServicesTable.createdAt));
	},

	async getServiceBySlug(slug: string): Promise<WebDevService | undefined> {
		const rows = await db.select().from(webDevServicesTable).where(eq(webDevServicesTable.slug, slug)).limit(1);
		return rows[0];
	},

	async getServiceById(id: string): Promise<WebDevService | undefined> {
		const rows = await db.select().from(webDevServicesTable).where(eq(webDevServicesTable.id, id)).limit(1);
		return rows[0];
	},

	async createService(data: NewWebDevService): Promise<WebDevService> {
		// Check if slug already exists
		const existing = await this.getServiceBySlug(data.slug);
		if (existing) {
			throw new AppError('Service with this slug already exists', 400);
		}

		const inserted = await db.insert(webDevServicesTable).values(data).returning();
		const service = inserted[0];
		if (!service) throw new AppError('Failed to create service', 500);
		return service;
	},

	async updateService(id: string, data: Partial<NewWebDevService>): Promise<WebDevService> {
		// If slug is being updated, check for conflicts
		if (data.slug) {
			const existing = await this.getServiceBySlug(data.slug);
			if (existing && existing.id !== id) {
				throw new AppError('Service with this slug already exists', 400);
			}
		}

		const [updated] = await db
			.update(webDevServicesTable)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(webDevServicesTable.id, id))
			.returning();

		if (!updated) throw new AppError('Service not found', 404);
		return updated;
	},

	async deleteService(id: string): Promise<void> {
		const deleted = await db.delete(webDevServicesTable).where(eq(webDevServicesTable.id, id)).returning();
		if (deleted.length === 0) throw new AppError('Service not found', 404);
	},

	// Sub Services
	async getAllSubServices(serviceId?: string, includeInactive = false): Promise<WebDevSubService[]> {
		const conditions = [];
		if (serviceId) {
			conditions.push(eq(webDevSubServicesTable.serviceId, serviceId));
		}
		if (!includeInactive) {
			conditions.push(eq(webDevSubServicesTable.isActive, true));
		}

		const baseQuery = db.select().from(webDevSubServicesTable);
		const query = conditions.length > 0
			? baseQuery.where(and(...conditions))
			: baseQuery;

		return query.orderBy(asc(webDevSubServicesTable.order), asc(webDevSubServicesTable.createdAt));
	},

	async getSubServicesByServiceSlug(serviceSlug: string, includeInactive = false): Promise<WebDevSubService[]> {
		const service = await this.getServiceBySlug(serviceSlug);
		if (!service) throw new AppError('Service not found', 404);

		return this.getAllSubServices(service.id, includeInactive);
	},

	async getSubServiceBySlug(serviceSlug: string, subServiceSlug: string): Promise<WebDevSubService | undefined> {
		const service = await this.getServiceBySlug(serviceSlug);
		if (!service) throw new AppError('Service not found', 404);

		const rows = await db
			.select()
			.from(webDevSubServicesTable)
			.where(and(eq(webDevSubServicesTable.serviceId, service.id), eq(webDevSubServicesTable.slug, subServiceSlug)))
			.limit(1);

		return rows[0];
	},

	async getSubServiceById(id: string): Promise<WebDevSubService | undefined> {
		const rows = await db.select().from(webDevSubServicesTable).where(eq(webDevSubServicesTable.id, id)).limit(1);
		return rows[0];
	},

	async createSubService(data: NewWebDevSubService): Promise<WebDevSubService> {
		// Verify service exists
		const service = await this.getServiceById(data.serviceId);
		if (!service) throw new AppError('Service not found', 404);

		// Check if slug already exists for this service
		const existing = await db
			.select()
			.from(webDevSubServicesTable)
			.where(and(eq(webDevSubServicesTable.serviceId, data.serviceId), eq(webDevSubServicesTable.slug, data.slug)))
			.limit(1);

		if (existing.length > 0) {
			throw new AppError('Sub-service with this slug already exists for this service', 400);
		}

		const inserted = await db.insert(webDevSubServicesTable).values(data).returning();
		const subService = inserted[0];
		if (!subService) throw new AppError('Failed to create sub-service', 500);
		return subService;
	},

	async updateSubService(id: string, data: Partial<NewWebDevSubService>): Promise<WebDevSubService> {
		// If serviceId is being updated, verify it exists
		if (data.serviceId) {
			const service = await this.getServiceById(data.serviceId);
			if (!service) throw new AppError('Service not found', 404);
		}

		// If slug is being updated, check for conflicts
		if (data.slug) {
			const existing = await this.getSubServiceById(id);
			if (existing) {
				const conflict = await db
					.select()
					.from(webDevSubServicesTable)
					.where(
						and(
							eq(webDevSubServicesTable.serviceId, data.serviceId || existing.serviceId),
							eq(webDevSubServicesTable.slug, data.slug)
						)
					)
					.limit(1);

				if (conflict.length > 0 && conflict[0] && conflict[0].id !== id) {
					throw new AppError('Sub-service with this slug already exists for this service', 400);
				}
			}
		}

		const [updated] = await db
			.update(webDevSubServicesTable)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(webDevSubServicesTable.id, id))
			.returning();

		if (!updated) throw new AppError('Sub-service not found', 404);
		return updated;
	},

	async deleteSubService(id: string): Promise<void> {
		const deleted = await db.delete(webDevSubServicesTable).where(eq(webDevSubServicesTable.id, id)).returning();
		if (deleted.length === 0) throw new AppError('Sub-service not found', 404);
	},

	// Packages
	async getAllPackages(subServiceId?: string, includeInactive = false): Promise<WebDevPackage[]> {
		const conditions = [];
		if (subServiceId) {
			conditions.push(eq(webDevPackagesTable.subServiceId, subServiceId));
		}
		if (!includeInactive) {
			conditions.push(eq(webDevPackagesTable.isActive, true));
		}

		const baseQuery = db.select().from(webDevPackagesTable);
		const query = conditions.length > 0
			? baseQuery.where(and(...conditions))
			: baseQuery;

		return query.orderBy(asc(webDevPackagesTable.order), asc(webDevPackagesTable.createdAt));
	},

	async getPackageById(id: string): Promise<WebDevPackage | undefined> {
		const rows = await db.select().from(webDevPackagesTable).where(eq(webDevPackagesTable.id, id)).limit(1);
		return rows[0];
	},

	async createPackage(data: NewWebDevPackage): Promise<WebDevPackage> {
		// Verify sub-service exists
		const subService = await this.getSubServiceById(data.subServiceId);
		if (!subService) throw new AppError('Sub-service not found', 404);

		const inserted = await db.insert(webDevPackagesTable).values(data).returning();
		const package_ = inserted[0];
		if (!package_) throw new AppError('Failed to create package', 500);
		return package_;
	},

	async updatePackage(id: string, data: Partial<NewWebDevPackage>): Promise<WebDevPackage> {
		if (data.subServiceId) {
			const subService = await this.getSubServiceById(data.subServiceId);
			if (!subService) throw new AppError('Sub-service not found', 404);
		}

		const [updated] = await db
			.update(webDevPackagesTable)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(webDevPackagesTable.id, id))
			.returning();

		if (!updated) throw new AppError('Package not found', 404);
		return updated;
	},

	async deletePackage(id: string): Promise<void> {
		const deleted = await db.delete(webDevPackagesTable).where(eq(webDevPackagesTable.id, id)).returning();
		if (deleted.length === 0) throw new AppError('Package not found', 404);
	},

	async updatePackagesOrder(items: Array<{ id: string; order: number }>): Promise<void> {
		for (const item of items) {
			await db
				.update(webDevPackagesTable)
				.set({ order: item.order, updatedAt: new Date() })
				.where(eq(webDevPackagesTable.id, item.id));
		}
	},

	// Case Studies
	async getAllCaseStudies(subServiceId?: string, includeInactive = false): Promise<WebDevCaseStudy[]> {
		const conditions = [];
		if (subServiceId) {
			conditions.push(eq(webDevCaseStudiesTable.subServiceId, subServiceId));
		}
		if (!includeInactive) {
			conditions.push(eq(webDevCaseStudiesTable.isActive, true));
		}

		const baseQuery = db.select().from(webDevCaseStudiesTable);
		const query = conditions.length > 0
			? baseQuery.where(and(...conditions))
			: baseQuery;

		return query.orderBy(asc(webDevCaseStudiesTable.order), asc(webDevCaseStudiesTable.createdAt));
	},

	async getCaseStudyById(id: string): Promise<WebDevCaseStudy | undefined> {
		const rows = await db.select().from(webDevCaseStudiesTable).where(eq(webDevCaseStudiesTable.id, id)).limit(1);
		return rows[0];
	},

	async createCaseStudy(data: NewWebDevCaseStudy): Promise<WebDevCaseStudy> {
		const subService = await this.getSubServiceById(data.subServiceId);
		if (!subService) throw new AppError('Sub-service not found', 404);

		const inserted = await db.insert(webDevCaseStudiesTable).values(data).returning();
		const caseStudy = inserted[0];
		if (!caseStudy) throw new AppError('Failed to create case study', 500);
		return caseStudy;
	},

	async updateCaseStudy(id: string, data: Partial<NewWebDevCaseStudy>): Promise<WebDevCaseStudy> {
		if (data.subServiceId) {
			const subService = await this.getSubServiceById(data.subServiceId);
			if (!subService) throw new AppError('Sub-service not found', 404);
		}

		const [updated] = await db
			.update(webDevCaseStudiesTable)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(webDevCaseStudiesTable.id, id))
			.returning();

		if (!updated) throw new AppError('Case study not found', 404);
		return updated;
	},

	async deleteCaseStudy(id: string): Promise<void> {
		const deleted = await db.delete(webDevCaseStudiesTable).where(eq(webDevCaseStudiesTable.id, id)).returning();
		if (deleted.length === 0) throw new AppError('Case study not found', 404);
	},

	async updateCaseStudiesOrder(items: Array<{ id: string; order: number }>): Promise<void> {
		for (const item of items) {
			await db
				.update(webDevCaseStudiesTable)
				.set({ order: item.order, updatedAt: new Date() })
				.where(eq(webDevCaseStudiesTable.id, item.id));
		}
	},

	// Testimonials
	async getAllTestimonials(subServiceId?: string, includeInactive = false): Promise<WebDevTestimonial[]> {
		const conditions = [];
		if (subServiceId) {
			conditions.push(eq(webDevTestimonialsTable.subServiceId, subServiceId));
		}
		if (!includeInactive) {
			conditions.push(eq(webDevTestimonialsTable.isActive, true));
		}

		const baseQuery = db.select().from(webDevTestimonialsTable);
		const query = conditions.length > 0
			? baseQuery.where(and(...conditions))
			: baseQuery;

		return query.orderBy(asc(webDevTestimonialsTable.order), asc(webDevTestimonialsTable.createdAt));
	},

	async getTestimonialById(id: string): Promise<WebDevTestimonial | undefined> {
		const rows = await db.select().from(webDevTestimonialsTable).where(eq(webDevTestimonialsTable.id, id)).limit(1);
		return rows[0];
	},

	async createTestimonial(data: NewWebDevTestimonial): Promise<WebDevTestimonial> {
		const subService = await this.getSubServiceById(data.subServiceId);
		if (!subService) throw new AppError('Sub-service not found', 404);

		const inserted = await db.insert(webDevTestimonialsTable).values(data).returning();
		const testimonial = inserted[0];
		if (!testimonial) throw new AppError('Failed to create testimonial', 500);
		return testimonial;
	},

	async updateTestimonial(id: string, data: Partial<NewWebDevTestimonial>): Promise<WebDevTestimonial> {
		if (data.subServiceId) {
			const subService = await this.getSubServiceById(data.subServiceId);
			if (!subService) throw new AppError('Sub-service not found', 404);
		}

		const [updated] = await db
			.update(webDevTestimonialsTable)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(webDevTestimonialsTable.id, id))
			.returning();

		if (!updated) throw new AppError('Testimonial not found', 404);
		return updated;
	},

	async deleteTestimonial(id: string): Promise<void> {
		const deleted = await db.delete(webDevTestimonialsTable).where(eq(webDevTestimonialsTable.id, id)).returning();
		if (deleted.length === 0) throw new AppError('Testimonial not found', 404);
	},

	async updateTestimonialsOrder(items: Array<{ id: string; order: number }>): Promise<void> {
		for (const item of items) {
			await db
				.update(webDevTestimonialsTable)
				.set({ order: item.order, updatedAt: new Date() })
				.where(eq(webDevTestimonialsTable.id, item.id));
		}
	},

	async updateSubServicesOrder(items: Array<{ id: string; order: number }>): Promise<void> {
		for (const item of items) {
			await db
				.update(webDevSubServicesTable)
				.set({ order: item.order, updatedAt: new Date() })
				.where(eq(webDevSubServicesTable.id, item.id));
		}
	},
};

