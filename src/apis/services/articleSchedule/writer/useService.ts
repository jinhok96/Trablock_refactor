import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import scheduleServices from '@/apis/services/articleSchedule/writer/fetch';
import { PutScheduleListPayload } from '@/apis/services/articleSchedule/writer/type';

export function usePutScheduleList(articleId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutScheduleList', articleId],
    mutationFn: (payload: PutScheduleListPayload) => scheduleServices.putScheduleList(articleId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE_SCHEDULE] }),
    throwOnError: true
  });
}

export function usePatchDeleteScheduleList(articleId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchDeleteScheduleList', articleId],
    mutationFn: () => scheduleServices.patchDeleteScheduleList(articleId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE_SCHEDULE] }),
    throwOnError: true
  });
}
