import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { DEFAULT_PARAMS } from '@/apis/constants/defaultParams';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import {
  GetBannerReviewListResponse,
  GetReviewListByUserIdParams,
  GetReviewListByUserIdResponse,
  GetReviewResponse
} from '@/apis/services/review/reader/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'reviewReader' | 'reviewReaderWithoutAuth'> = {
  reviewReader: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  },
  reviewReaderWithoutAuth: {
    baseUrl: API_URL.API_BASE_URL
  }
};

const fetchReviewReader = returnFetchJson(options.reviewReader);
const fetchReviewReaderServiceWithoutAuth = returnFetchJson(options.reviewReaderWithoutAuth);

const reviewReaderServices = {
  getReview: async (reviewId: number) => {
    const response = await fetchReviewReader<ResponseWrapper<GetReviewResponse>>(`/api/v1/reviews/${reviewId}`, {
      next: {
        tags: [CACHE_TAGS.REVIEW.getReview(reviewId)] as const,
        revalidate: REVALIDATE_TIME.MIN_01
      }
    });
    return response;
  },
  getReviewListByUserId: async (userId: number, params: GetReviewListByUserIdParams) => {
    const { PAGE: page, SIZE: size } = params;
    const response = await fetchReviewReader<ResponseWrapper<GetReviewListByUserIdResponse>>(
      `/api/v1/users/${userId}/reviews?page=${page || DEFAULT_PARAMS.PAGE}&size=${size || DEFAULT_PARAMS.SIZE}`,
      {
        next: {
          // tags: [CACHE_TAGS.review.getReviewListByUserId(userId, params)] as const,
          revalidate: REVALIDATE_TIME.NONE
        }
      }
    );
    return response;
  },
  getBannerReviewList: async () => {
    const response = await fetchReviewReaderServiceWithoutAuth<ResponseWrapper<GetBannerReviewListResponse>>(
      '/api/v1/banner/reviews',
      {
        next: { tags: [CACHE_TAGS.REVIEW.getBannerReviewList()] as const, revalidate: REVALIDATE_TIME.MIN_03 }
      }
    );
    return response;
  }
};

export default reviewReaderServices;
