import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/apis/constants/queryKeys';
import reviewReaderServices from '@/apis/services/review/reader/fetch';
import { GetReviewListByUserIdParams } from '@/apis/services/review/reader/type';
import { getNextPageParam, getPreviousPageParam } from '@/apis/utils/getPageParam';
import { getAuthorizationTokenHeader } from '@/app/actions/cookieActions';

export function useGetReview(reviewId: number) {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.REVIEW, 'useGetReview', reviewId] as const,
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return reviewReaderServices.getReview(reviewId, headers);
    }
  });
}

export const useGetReviewListByUserId = (userId: number, params: GetReviewListByUserIdParams) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.REVIEW, 'useGetReviewListByUserId', userId, params] as const,
    queryFn: async () => {
      const headers = await getAuthorizationTokenHeader();
      return reviewReaderServices.getReviewListByUserId(userId, params, headers);
    },
    initialPageParam: 0,
    getPreviousPageParam: (res) => getPreviousPageParam(res?.body.data?.total_pages, res?.body.data?.current_page),
    getNextPageParam: (res) => getNextPageParam(res?.body.data?.total_pages, res?.body.data?.current_page)
  });
};

export const useGetBannerReviewList = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.REVIEW, 'useGetBannerReviewList'] as const,
    queryFn: () => reviewReaderServices.getBannerReviewList()
  });
};
