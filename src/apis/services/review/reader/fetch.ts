import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { DEFAULT_PARAMS } from '@/apis/constants/defaultParams';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import {
  GetBannerReviewListResponse,
  GetReviewListByUserId,
  GetReviewListByUserIdParams,
  GetReviewResponse
} from '@/apis/services/review/reader/type';
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
    const response = await fetchReviewReader<GetReviewResponse>(`/api/v1/reviews/${reviewId}`, {
      next: {
        tags: [CACHE_TAGS.REVIEW.getReview(reviewId)] as const,
        revalidate: REVALIDATE_TIME.MIN_01
      }
    });
    return response.body;
  },
  getReviewListByUserId: async (userId: number, params: GetReviewListByUserIdParams) => {
    const { PAGE: page, SIZE: size } = params;
    const response = await fetchReviewReader<GetReviewListByUserId>(
      `/api/v1/users/${userId}/reviews?page=${page || DEFAULT_PARAMS.PAGE}&size=${size || DEFAULT_PARAMS.SIZE}`,
      {
        next: {
          // tags: [CACHE_TAGS.review.getReviewListByUserId(userId, params)] as const,
          revalidate: REVALIDATE_TIME.NONE
        }
      }
    );
    return response.body;
  },
  getBannerReviewList: async () => {
    const response = await fetchReviewReaderServiceWithoutAuth<GetBannerReviewListResponse>('/api/v1/banner/reviews', {
      next: { tags: [CACHE_TAGS.REVIEW.getBannerReviewList()] as const, revalidate: REVALIDATE_TIME.MIN_03 }
    });
    return response.body;
  }
};

export default reviewReaderServices;
