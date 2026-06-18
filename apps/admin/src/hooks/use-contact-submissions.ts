import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contactSubmissionApi } from '@/services/contact-submission.api';
import type {
	ContactSubmissionsListParams,
	ContactSubmissionStatus,
} from '@/types/contact-submission.types';

export function useContactSubmissions(params: ContactSubmissionsListParams) {
	return useQuery({
		queryKey: ['contact-submissions', params],
		queryFn: () => contactSubmissionApi.listContactSubmissions(params),
	});
}

export function useContactSubmission(id: string) {
	return useQuery({
		queryKey: ['contact-submission', id],
		queryFn: () => contactSubmissionApi.getContactSubmissionById(id),
		enabled: !!id,
	});
}

export function useUpdateContactSubmissionStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, status }: { id: string; status: ContactSubmissionStatus }) =>
			contactSubmissionApi.updateContactSubmissionStatus(id, status),
		onSuccess: (_data, variables) => {
			void queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
			void queryClient.invalidateQueries({ queryKey: ['contact-submission', variables.id] });
		},
	});
}
