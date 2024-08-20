import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import commentReaderServices from '@/apis/services/comment/reader/fetch';
import { GetCommentListParams } from '@/apis/services/comment/reader/type';
import { getAuthorizationTokenHeader } from '@/apis/utils/getCookieTokens';
import { getNextPageParam, getPreviousPageParam } from '@/apis/utils/getPageParam';

export function useGetCommentList(reviewId: number, params: GetCommentListParams) {
  const headers = getAuthorizationTokenHeader();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.COMMENT, 'useGetCommentList', reviewId, params] as const,
    queryFn: () => commentReaderServices.getCommentList(reviewId, params, headers),
    initialPageParam: 0,
    getPreviousPageParam: (res) => getPreviousPageParam(res?.body.data?.total_pages, res?.body.data?.current_page),
    getNextPageParam: (res) => getNextPageParam(res?.body.data?.total_pages, res?.body.data?.current_page)
  });
}
