import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import articleScheduleReaderServices from '@/apis/services/articleSchedule/reader/fetch';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';

export function useGetScheduleList(articleId: number) {
  const headers = getAuthorizationTokenHeader();
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.ARTICLE_SCHEDULE, 'useGetScheduleList', articleId],
    queryFn: () => articleScheduleReaderServices.getScheduleList(articleId, headers)
  });
}

export function useGetSchedulePlaceList(articleId: number) {
  const headers = getAuthorizationTokenHeader();
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.ARTICLE_SCHEDULE, 'useGetSchedulePlaceList', articleId],
    queryFn: () => articleScheduleReaderServices.getScheduleList(articleId, headers)
  });
}
