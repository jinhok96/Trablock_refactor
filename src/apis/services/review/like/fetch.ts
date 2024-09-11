import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { PutLikeReviewResponse } from '@/apis/services/review/like/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { handleRevalidateTag } from '@/app/actions/revalidateTagActions';

const reviewLikeServices = {
  putLikeReview: async (reviewId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PutLikeReviewResponse>>(
      `/api/v1/reviews/${reviewId}/likes`,
      {
        method: METHOD.PUT,
        headers
      }
    );
    handleRevalidateTag(CACHE_TAGS.REVIEW.getReview(reviewId));
    handleRevalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    return response;
  }
};

export default reviewLikeServices;
