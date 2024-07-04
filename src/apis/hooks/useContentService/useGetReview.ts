import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

import reviewService from '@/apis/hooks/useContentService/reviewFetch';

import { ReviewsResponse } from './type';

const useGetReview = (userId: string) => {
  return useInfiniteQuery<ReviewsResponse, Error>({
    queryKey: ['reviews', userId],
    queryFn: async ({ pageParam = 0 }: QueryFunctionContext) => {
      return reviewService.getReviews(userId, pageParam as number);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page + 1 >= lastPage.total_pages) return undefined;
      return lastPage.current_page + 1;
    },
    initialPageParam: 0
  });
};

export default useGetReview;
