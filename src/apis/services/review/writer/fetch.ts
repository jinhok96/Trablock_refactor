import { revalidateTag } from 'next/cache';

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
import { throwError } from '@/apis/utils/throwError';

const reviewWriterServices = {
  postReview: async (payload: PostReviewPayload, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostReviewResponse>>('/api/v1/review', {
      method: METHOD.POST,
      body: payload,
      headers
    });
    revalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    throwError(response.body.error);
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
    revalidateTag(CACHE_TAGS.REVIEW.getReview(reviewId));
    revalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    throwError(response.body.error);
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
    revalidateTag(CACHE_TAGS.REVIEW.getReview(reviewId));
    revalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    throwError(response.body.error);
    return response;
  }
};

export default reviewWriterServices;
