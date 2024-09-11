import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  PatchDeleteReviewResponse,
  PatchEditReviewPayload,
  PatchEditReviewResponse,
  PostReviewPayload,
  PostReviewResponse
} from '@/apis/services/review/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { handleRevalidateTag } from '@/app/actions/revalidateTagActions';

const reviewWriterServices = {
  postReview: async (payload: PostReviewPayload, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostReviewResponse>>('/api/v1/review', {
      method: METHOD.POST,
      body: payload,
      headers
    });
    handleRevalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    return response;
  },
  patchEditReview: async (
    reviewId: number,
    payload: PatchEditReviewPayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const response = await fetchJsonDefault<ResponseWrapper<PatchEditReviewResponse>>(`/api/v1/reviews/${reviewId}`, {
      method: METHOD.PATCH,
      body: payload,
      headers
    });
    handleRevalidateTag(CACHE_TAGS.REVIEW.getReview(reviewId));
    handleRevalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    return response;
  },
  patchDeleteReview: async (reviewId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PatchDeleteReviewResponse>>(
      `/api/v1/reviews/${reviewId}/status`,
      {
        method: METHOD.PATCH,
        headers
      }
    );
    handleRevalidateTag(CACHE_TAGS.REVIEW.getReview(reviewId));
    handleRevalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    return response;
  }
};

export default reviewWriterServices;
