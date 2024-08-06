import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PutLikeReviewResponse } from '@/apis/services/review/like/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'reviewLike'> = {
  reviewLike: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchReviewLike = returnFetchJson(options.reviewLike);

const reviewLikeServices = {
  putLikeReview: async (reviewId: number) => {
    const response = await fetchReviewLike<ResponseWrapper<PutLikeReviewResponse>>(
      `/api/v1/reviews/${reviewId}/likes`,
      {
        method: METHOD.PUT
      }
    );
    revalidateTag(CACHE_TAGS.REVIEW.getReview(reviewId));
    revalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    return response;
  }
};

export default reviewLikeServices;
