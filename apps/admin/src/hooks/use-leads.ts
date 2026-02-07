import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { leadApi } from '@/services/lead.api';
import type { LeadsListParams, LeadStatus } from '@/types/lead.types';

export function useLeads(params: LeadsListParams) {
	return useQuery({
		queryKey: ['leads', params],
		queryFn: () => leadApi.listLeads(params),
	});
}

export function useLead(leadId: string) {
	return useQuery({
		queryKey: ['lead', leadId],
		queryFn: () => leadApi.getLeadById(leadId),
		enabled: !!leadId,
	});
}

export function useUpdateLeadStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ leadId, status }: { leadId: string; status: LeadStatus }) =>
			leadApi.updateLeadStatus(leadId, status),
		onSuccess: (_data, variables) => {
			void queryClient.invalidateQueries({ queryKey: ['leads'] });
			void queryClient.invalidateQueries({ queryKey: ['lead', variables.leadId] });
		},
	});
}

