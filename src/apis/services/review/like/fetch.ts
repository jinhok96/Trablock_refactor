import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { PutLikeReviewResponse } from '@/apis/services/review/like/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { throwError } from '@/apis/utils/throwError';

const reviewLikeServices = {
  putLikeReview: async (reviewId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PutLikeReviewResponse>>(
      `/api/v1/reviews/${reviewId}/likes`,
      {
        method: METHOD.PUT,
        headers
      }
    );
    revalidateTag(CACHE_TAGS.REVIEW.getReview(reviewId));
    revalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    throwError(response.body.error);
    return response;
  }
};

export default reviewLikeServices;
