import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { caseStudyApi } from '@/services/case-study.api';
import type {
	CaseStudiesListParams,
	CaseStudyCreatePayload,
	CaseStudyUpdatePayload,
	CaseStudyStatus,
	CaseStudyReorderItem,
} from '@/types/case-study.types';

export function useCaseStudies(params: CaseStudiesListParams) {
	return useQuery({
		queryKey: ['case-studies', params],
		queryFn: () => caseStudyApi.listCaseStudies(params),
	});
}

export function useCaseStudy(id: string) {
	return useQuery({
		queryKey: ['case-study', id],
		queryFn: () => caseStudyApi.getCaseStudyById(id),
		enabled: !!id,
	});
}

export function useCreateCaseStudy() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CaseStudyCreatePayload) => caseStudyApi.createCaseStudy(payload),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['case-studies'] });
		},
	});
}

export function useUpdateCaseStudy() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: CaseStudyUpdatePayload }) =>
			caseStudyApi.updateCaseStudy(id, payload),
		onSuccess: (_data, variables) => {
			void queryClient.invalidateQueries({ queryKey: ['case-studies'] });
			void queryClient.invalidateQueries({ queryKey: ['case-study', variables.id] });
		},
	});
}

export function useUpdateCaseStudyStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, status }: { id: string; status: CaseStudyStatus }) =>
			caseStudyApi.updateCaseStudyStatus(id, status),
		onSuccess: (_data, variables) => {
			void queryClient.invalidateQueries({ queryKey: ['case-studies'] });
			void queryClient.invalidateQueries({ queryKey: ['case-study', variables.id] });
		},
	});
}

export function useReorderCaseStudies() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (items: CaseStudyReorderItem[]) => caseStudyApi.reorderCaseStudies(items),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['case-studies'] });
		},
	});
}

export function useDeleteCaseStudy() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => caseStudyApi.deleteCaseStudy(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ['case-studies'] });
		},
	});
}
