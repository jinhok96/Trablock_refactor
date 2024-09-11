import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MUTATION_KEYS } from '@/apis/constants/mutationKeys';
import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import scheduleServices from '@/apis/services/articleSchedule/writer/fetch';
import { PutScheduleListPayload } from '@/apis/services/articleSchedule/writer/type';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function usePutScheduleList(articleId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePutScheduleList', articleId],
    mutationFn: async (payload: PutScheduleListPayload) => {
      const headers = await getAuthorizationTokenHeader();
      return scheduleServices.putScheduleList(articleId, payload, headers);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE_SCHEDULE] }),
    throwOnError: true
  });
}

export function usePatchDeleteScheduleList(articleId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DEFAULT, 'usePatchDeleteScheduleList', articleId],
    mutationFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return scheduleServices.patchDeleteScheduleList(articleId, headers);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARTICLE_SCHEDULE] }),
    throwOnError: true
  });
}
