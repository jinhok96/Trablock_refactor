import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import articleScheduleReaderServices from '@/apis/services/articleSchedule/reader/fetch';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function useGetScheduleList(articleId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.ARTICLE_SCHEDULE, 'useGetScheduleList', articleId],
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return articleScheduleReaderServices.getScheduleList(articleId, headers);
    }
  });
}

export function useGetSchedulePlaceList(articleId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.ARTICLE_SCHEDULE, 'useGetSchedulePlaceList', articleId],
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return articleScheduleReaderServices.getScheduleList(articleId, headers);
    }
  });
}
