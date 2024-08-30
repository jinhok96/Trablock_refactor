import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { DEFAULT_PARAMS } from '@/apis/constants/defaultParams';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  GetBannerReviewListResponse,
  GetReviewListByUserIdParams,
  GetReviewListByUserIdResponse,
  GetReviewResponse
} from '@/apis/services/review/reader/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { throwError } from '@/apis/utils/throwError';
import { APP_QUERIES } from '@/libs/constants/appPaths';

const reviewReaderServices = {
  getReview: async (reviewId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<GetReviewResponse>>(`/api/v1/reviews/${reviewId}`, {
      next: {
        tags: [CACHE_TAGS.REVIEW.getReview(reviewId)] as const,
        revalidate: REVALIDATE_TIME.MIN_01
      },
      headers
    });
    throwError(response.body.error);
    return response;
  },
  getReviewListByUserId: async (
    userId: number,
    params: GetReviewListByUserIdParams,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const { PAGE: page, SIZE: size } = params;
    const response = await fetchJsonDefault<ResponseWrapper<GetReviewListByUserIdResponse>>(
      `/api/v1/users/${userId}/reviews?${APP_QUERIES.PAGE}=${page || DEFAULT_PARAMS.PAGE}&${APP_QUERIES.SIZE}=${size || DEFAULT_PARAMS.SIZE}`,
      {
        next: {
          // tags: [CACHE_TAGS.review.getReviewListByUserId(userId, params)] as const,
          revalidate: REVALIDATE_TIME.NONE
        },
        headers
      }
    );
    throwError(response.body.error);
    return response;
  },
  getBannerReviewList: async () => {
    const response = await fetchJsonDefault<ResponseWrapper<GetBannerReviewListResponse>>('/api/v1/banner/reviews', {
      next: { tags: [CACHE_TAGS.REVIEW.getBannerReviewList()] as const, revalidate: REVALIDATE_TIME.MIN_03 }
    });
    throwError(response.body.error);
    return response;
  }
};

export default reviewReaderServices;
