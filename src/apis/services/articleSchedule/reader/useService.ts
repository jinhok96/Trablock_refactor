import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import articleScheduleReaderServices from '@/apis/services/articleSchedule/reader/fetch';

export function useGetScheduleList(articleId: number) {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.ARTICLE_SCHEDULE, 'useGetScheduleList', articleId],
    queryFn: () => articleScheduleReaderServices.getScheduleList(articleId)
  });
}

export function useGetSchedulePlaceList(articleId: number) {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.ARTICLE_SCHEDULE, 'useGetSchedulePlaceList', articleId],
    queryFn: () => articleScheduleReaderServices.getScheduleList(articleId)
  });
}
