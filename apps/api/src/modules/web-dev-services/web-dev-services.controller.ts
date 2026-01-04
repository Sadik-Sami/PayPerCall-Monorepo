import { Request, Response, NextFunction } from 'express';
import { webDevServicesService } from './web-dev-services.service';
import {
	webDevServiceInsertSchema,
	webDevServiceUpdateSchema,
	webDevSubServiceInsertSchema,
	webDevSubServiceUpdateSchema,
	webDevPackageInsertSchema,
	webDevPackageUpdateSchema,
	webDevCaseStudyInsertSchema,
	webDevCaseStudyUpdateSchema,
	webDevTestimonialInsertSchema,
	webDevTestimonialUpdateSchema,
	revalidateSchema,
} from '@/db/validator/web-dev-services.validator';
import { AppError } from '@/middlewares/errorHandler';
import { isValidUUID } from '@/utils/validation.util';

export const webDevServicesController = {
	// Services
	async getAllServices(req: Request, res: Response, next: NextFunction) {
		try {
			const includeInactive = req.query.includeInactive === 'true';
			const services = await webDevServicesService.getAllServices(includeInactive);
			res.json({
				success: true,
				statusCode: 200,
				message: 'Services retrieved successfully',
				data: services,
				count: services.length,
			});
		} catch (error) {
			next(error);
		}
	},

	async getServiceBySlug(req: Request, res: Response, next: NextFunction) {
		try {
			const { slug } = req.params;
			if (!slug) throw new AppError('Service slug is required', 400);
			const service = await webDevServicesService.getServiceBySlug(slug);
			if (!service) throw new AppError('Service not found', 404);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Service retrieved successfully',
				data: service,
			});
		} catch (error) {
			next(error);
		}
	},

	async getServiceById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid service ID format', 400);
			const service = await webDevServicesService.getServiceById(id);
			if (!service) throw new AppError('Service not found', 404);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Service retrieved successfully',
				data: service,
			});
		} catch (error) {
			next(error);
		}
	},

	async createService(req: Request, res: Response, next: NextFunction) {
		try {
			const data = webDevServiceInsertSchema.parse(req.body);
			const service = await webDevServicesService.createService(data);

			res.status(201).json({
				success: true,
				statusCode: 201,
				message: 'Service created successfully',
				data: service,
			});
		} catch (error) {
			console.error('[createService Error]', error);
			next(error);
		}
	},

	async updateService(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid service ID format', 400);

			const data = webDevServiceUpdateSchema.parse(req.body);
			const service = await webDevServicesService.updateService(id, data);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Service updated successfully',
				data: service,
			});
		} catch (error) {
			next(error);
		}
	},

	async deleteService(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid service ID format', 400);

			await webDevServicesService.deleteService(id);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Service deleted successfully',
			});
		} catch (error) {
			next(error);
		}
	},

	async revalidateService(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid service ID format', 400);

			const service = await webDevServicesService.getServiceById(id);
			if (!service) throw new AppError('Service not found', 404);

			// TODO: Implement actual revalidation webhook call to Next.js
			// For now, just return success
			res.json({
				success: true,
				statusCode: 200,
				message: 'Revalidation triggered successfully',
				data: {
					serviceId: id,
					serviceSlug: service.slug,
				},
			});
		} catch (error) {
			next(error);
		}
	},

	// Sub Services
	async getAllSubServices(req: Request, res: Response, next: NextFunction) {
		try {
			const serviceSlug = req.params.serviceSlug;
			if (!serviceSlug) throw new AppError('Service slug is required', 400);

			const includeInactive = req.query.includeInactive === 'true';
			const subServices = await webDevServicesService.getSubServicesByServiceSlug(serviceSlug, includeInactive);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Sub-services retrieved successfully',
				data: subServices,
				count: subServices.length,
			});
		} catch (error) {
			next(error);
		}
	},

	async getSubServiceBySlug(req: Request, res: Response, next: NextFunction) {
		try {
			const serviceSlug = req.params.serviceSlug;
			const slug = req.params.slug;
			if (!serviceSlug || !slug) throw new AppError('Service slug and sub-service slug are required', 400);

			const subService = await webDevServicesService.getSubServiceBySlug(serviceSlug, slug);
			if (!subService) throw new AppError('Sub-service not found', 404);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Sub-service retrieved successfully',
				data: subService,
			});
		} catch (error) {
			next(error);
		}
	},

	async createSubService(req: Request, res: Response, next: NextFunction) {
		try {
			const serviceSlug = req.params.serviceSlug;
			if (!serviceSlug) throw new AppError('Service slug is required', 400);

			const service = await webDevServicesService.getServiceBySlug(serviceSlug);
			if (!service) throw new AppError('Service not found', 404);

			// Create schema without serviceId requirement for validation
			const subServiceSchemaWithoutServiceId = webDevSubServiceInsertSchema.omit({ serviceId: true });
			const parsedBody = subServiceSchemaWithoutServiceId.parse(req.body);
			// Transform data to match database schema requirements
			const {
				packages: originalPackages,
				caseStudies: originalCaseStudies,
				testimonials: originalTestimonials,
				...restBody
			} = parsedBody;

			const packages =
				originalPackages ?
					(originalPackages.map((pkg) => ({
						...pkg,
						description: pkg.description ?? '',
					})) as Array<{
						id: string;
						name: string;
						description: string;
						price: number;
						currency: string;
						features: string[];
						isPopular: boolean;
					}>)
				:	undefined;

			const caseStudies =
				originalCaseStudies ?
					(originalCaseStudies.map((cs) => ({
						...cs,
						description: cs.description ?? '',
						clientName: cs.clientName ?? '',
						results: cs.results.map((r) => ({
							metric: r.metric,
							value: r.value,
						})),
					})) as Array<{
						id: string;
						title: string;
						description: string;
						clientName: string;
						results: Array<{ metric: string; value: string }>;
						image?: { url: string; publicId: string; alt?: string };
					}>)
				:	undefined;

			const testimonials =
				originalTestimonials ?
					(originalTestimonials.map((t) => ({
						...t,
						role: t.role ?? '',
						company: t.company ?? '',
					})) as Array<{
						id: string;
						name: string;
						role: string;
						company: string;
						content: string;
						image?: { url: string; publicId: string; alt?: string };
						rating?: number;
					}>)
				:	undefined;

			const data: Parameters<typeof webDevServicesService.createSubService>[0] = {
				...restBody,
				serviceId: service.id,
				...(packages !== undefined && { packages }),
				...(caseStudies !== undefined && { caseStudies }),
				...(testimonials !== undefined && { testimonials }),
			};
			const subService = await webDevServicesService.createSubService(data);

			res.status(201).json({
				success: true,
				statusCode: 201,
				message: 'Sub-service created successfully',
				data: subService,
			});
		} catch (error) {
			next(error);
		}
	},

	async updateSubService(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid sub-service ID format', 400);

			const parsedData = webDevSubServiceUpdateSchema.parse(req.body);
			// Transform data to match database schema requirements
			const {
				packages: originalPackages,
				caseStudies: originalCaseStudies,
				testimonials: originalTestimonials,
				...restData
			} = parsedData;

			const packages =
				originalPackages ?
					(originalPackages.map((pkg) => ({
						...pkg,
						description: pkg.description ?? '',
					})) as Array<{
						id: string;
						name: string;
						description: string;
						price: number;
						currency: string;
						features: string[];
						isPopular: boolean;
					}>)
				:	undefined;

			const caseStudies =
				originalCaseStudies ?
					(originalCaseStudies.map((cs) => ({
						...cs,
						description: cs.description ?? '',
						clientName: cs.clientName ?? '',
						results: cs.results.map((r) => ({
							metric: r.metric,
							value: r.value,
						})),
					})) as Array<{
						id: string;
						title: string;
						description: string;
						clientName: string;
						results: Array<{ metric: string; value: string }>;
						image?: { url: string; publicId: string; alt?: string };
					}>)
				:	undefined;

			const testimonials =
				originalTestimonials ?
					(originalTestimonials.map((t) => ({
						...t,
						role: t.role ?? '',
						company: t.company ?? '',
					})) as Array<{
						id: string;
						name: string;
						role: string;
						company: string;
						content: string;
						image?: { url: string; publicId: string; alt?: string };
						rating?: number;
					}>)
				:	undefined;

			const updateData: Parameters<typeof webDevServicesService.updateSubService>[1] = {
				...restData,
				...(packages !== undefined && { packages }),
				...(caseStudies !== undefined && { caseStudies }),
				...(testimonials !== undefined && { testimonials }),
			};
			const subService = await webDevServicesService.updateSubService(id, updateData);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Sub-service updated successfully',
				data: subService,
			});
		} catch (error) {
			next(error);
		}
	},

	async deleteSubService(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid sub-service ID format', 400);

			await webDevServicesService.deleteSubService(id);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Sub-service deleted successfully',
			});
		} catch (error) {
			next(error);
		}
	},

	async getSubServiceById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid sub-service ID format', 400);

			const subService = await webDevServicesService.getSubServiceById(id);
			if (!subService) throw new AppError('Sub-service not found', 404);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Sub-service retrieved successfully',
				data: subService,
			});
		} catch (error) {
			next(error);
		}
	},

	async revalidateSubService(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid sub-service ID format', 400);

			const subService = await webDevServicesService.getSubServiceById(id);
			if (!subService) throw new AppError('Sub-service not found', 404);

			// TODO: Implement actual revalidation webhook call to Next.js
			res.json({
				success: true,
				statusCode: 200,
				message: 'Revalidation triggered successfully',
				data: {
					subServiceId: id,
					subServiceSlug: subService.slug,
				},
			});
		} catch (error) {
			next(error);
		}
	},

	// Packages
	async getAllPackages(req: Request, res: Response, next: NextFunction) {
		try {
			const { subServiceId } = req.query;
			const includeInactive = req.query.includeInactive === 'true';

			const packages = await webDevServicesService.getAllPackages(
				subServiceId && isValidUUID(subServiceId as string) ? (subServiceId as string) : undefined,
				includeInactive
			);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Packages retrieved successfully',
				data: packages,
				count: packages.length,
			});
		} catch (error) {
			next(error);
		}
	},

	async createPackage(req: Request, res: Response, next: NextFunction) {
		try {
			const parsedData = webDevPackageInsertSchema.parse(req.body);
			if (!parsedData.subServiceId || !isValidUUID(parsedData.subServiceId)) {
				throw new AppError('Valid sub-service ID is required', 400);
			}
			const package_ = await webDevServicesService.createPackage(
				parsedData as Parameters<typeof webDevServicesService.createPackage>[0]
			);

			res.status(201).json({
				success: true,
				statusCode: 201,
				message: 'Package created successfully',
				data: package_,
			});
		} catch (error) {
			next(error);
		}
	},

	async updatePackage(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid package ID format', 400);

			const data = webDevPackageUpdateSchema.parse(req.body);
			const package_ = await webDevServicesService.updatePackage(id, data);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Package updated successfully',
				data: package_,
			});
		} catch (error) {
			next(error);
		}
	},

	async deletePackage(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid package ID format', 400);

			await webDevServicesService.deletePackage(id);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Package deleted successfully',
			});
		} catch (error) {
			next(error);
		}
	},

	async updatePackagesOrder(req: Request, res: Response, next: NextFunction) {
		try {
			const { items } = req.body;
			if (!Array.isArray(items) || items.length === 0) {
				throw new AppError('Items array is required', 400);
			}

			// Validate all items have valid UUIDs
			for (const item of items) {
				if (!isValidUUID(item.id)) {
					throw new AppError(`Invalid package ID format: ${item.id}`, 400);
				}
				if (typeof item.order !== 'number') {
					throw new AppError('Order must be a number', 400);
				}
			}

			await webDevServicesService.updatePackagesOrder(items);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Package order updated successfully',
			});
		} catch (error) {
			next(error);
		}
	},

	// Case Studies
	async getAllCaseStudies(req: Request, res: Response, next: NextFunction) {
		try {
			const { subServiceId } = req.query;
			const includeInactive = req.query.includeInactive === 'true';

			const caseStudies = await webDevServicesService.getAllCaseStudies(
				subServiceId && isValidUUID(subServiceId as string) ? (subServiceId as string) : undefined,
				includeInactive
			);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Case studies retrieved successfully',
				data: caseStudies,
				count: caseStudies.length,
			});
		} catch (error) {
			next(error);
		}
	},

	async createCaseStudy(req: Request, res: Response, next: NextFunction) {
		try {
			const parsedData = webDevCaseStudyInsertSchema.parse(req.body);
			if (!parsedData.subServiceId || !isValidUUID(parsedData.subServiceId)) {
				throw new AppError('Valid sub-service ID is required', 400);
			}
			const caseStudy = await webDevServicesService.createCaseStudy(
				parsedData as Parameters<typeof webDevServicesService.createCaseStudy>[0]
			);

			res.status(201).json({
				success: true,
				statusCode: 201,
				message: 'Case study created successfully',
				data: caseStudy,
			});
		} catch (error) {
			next(error);
		}
	},

	async updateCaseStudy(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid case study ID format', 400);

			const data = webDevCaseStudyUpdateSchema.parse(req.body);
			const caseStudy = await webDevServicesService.updateCaseStudy(id, data);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Case study updated successfully',
				data: caseStudy,
			});
		} catch (error) {
			next(error);
		}
	},

	async deleteCaseStudy(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid case study ID format', 400);

			await webDevServicesService.deleteCaseStudy(id);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Case study deleted successfully',
			});
		} catch (error) {
			next(error);
		}
	},

	async updateCaseStudiesOrder(req: Request, res: Response, next: NextFunction) {
		try {
			const { items } = req.body;
			if (!Array.isArray(items) || items.length === 0) {
				throw new AppError('Items array is required', 400);
			}

			for (const item of items) {
				if (!isValidUUID(item.id)) {
					throw new AppError(`Invalid case study ID format: ${item.id}`, 400);
				}
				if (typeof item.order !== 'number') {
					throw new AppError('Order must be a number', 400);
				}
			}

			await webDevServicesService.updateCaseStudiesOrder(items);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Case study order updated successfully',
			});
		} catch (error) {
			next(error);
		}
	},

	// Testimonials
	async getAllTestimonials(req: Request, res: Response, next: NextFunction) {
		try {
			const { subServiceId } = req.query;
			const includeInactive = req.query.includeInactive === 'true';

			const testimonials = await webDevServicesService.getAllTestimonials(
				subServiceId && isValidUUID(subServiceId as string) ? (subServiceId as string) : undefined,
				includeInactive
			);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Testimonials retrieved successfully',
				data: testimonials,
				count: testimonials.length,
			});
		} catch (error) {
			next(error);
		}
	},

	async createTestimonial(req: Request, res: Response, next: NextFunction) {
		try {
			const parsedData = webDevTestimonialInsertSchema.parse(req.body);
			if (!parsedData.subServiceId || !isValidUUID(parsedData.subServiceId)) {
				throw new AppError('Valid sub-service ID is required', 400);
			}
			const testimonial = await webDevServicesService.createTestimonial(
				parsedData as Parameters<typeof webDevServicesService.createTestimonial>[0]
			);

			res.status(201).json({
				success: true,
				statusCode: 201,
				message: 'Testimonial created successfully',
				data: testimonial,
			});
		} catch (error) {
			next(error);
		}
	},

	async updateTestimonial(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid testimonial ID format', 400);

			const data = webDevTestimonialUpdateSchema.parse(req.body);
			const testimonial = await webDevServicesService.updateTestimonial(id, data);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Testimonial updated successfully',
				data: testimonial,
			});
		} catch (error) {
			next(error);
		}
	},

	async deleteTestimonial(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			if (!isValidUUID(id)) throw new AppError('Invalid testimonial ID format', 400);

			await webDevServicesService.deleteTestimonial(id);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Testimonial deleted successfully',
			});
		} catch (error) {
			next(error);
		}
	},

	async updateTestimonialsOrder(req: Request, res: Response, next: NextFunction) {
		try {
			const { items } = req.body;
			if (!Array.isArray(items) || items.length === 0) {
				throw new AppError('Items array is required', 400);
			}

			for (const item of items) {
				if (!isValidUUID(item.id)) {
					throw new AppError(`Invalid testimonial ID format: ${item.id}`, 400);
				}
				if (typeof item.order !== 'number') {
					throw new AppError('Order must be a number', 400);
				}
			}

			await webDevServicesService.updateTestimonialsOrder(items);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Testimonial order updated successfully',
			});
		} catch (error) {
			next(error);
		}
	},

	async updateSubServicesOrder(req: Request, res: Response, next: NextFunction) {
		try {
			const { items } = req.body;
			if (!Array.isArray(items) || items.length === 0) {
				throw new AppError('Items array is required', 400);
			}

			for (const item of items) {
				if (!isValidUUID(item.id)) {
					throw new AppError(`Invalid sub-service ID format: ${item.id}`, 400);
				}
				if (typeof item.order !== 'number') {
					throw new AppError('Order must be a number', 400);
				}
			}

			await webDevServicesService.updateSubServicesOrder(items);

			res.json({
				success: true,
				statusCode: 200,
				message: 'Sub-service order updated successfully',
			});
		} catch (error) {
			next(error);
		}
	},
};
