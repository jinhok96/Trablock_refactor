import { revalidateTag } from 'next/cache';

import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import {
  PatchDeleteReviewResponse,
  PatchEditReviewPayload,
  PatchEditReviewResponse,
  PostReviewPayload,
  PostReviewResponse
} from '@/apis/services/review/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'reviewWriter'> = {
  reviewWriter: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchReviewWriter = returnFetchJson(options.reviewWriter);

const reviewWriterServices = {
  postReview: async (payload: PostReviewPayload) => {
    const response = await fetchReviewWriter<ResponseWrapper<PostReviewResponse>>('/api/v1/review', {
      method: METHOD.POST,
      body: payload
    });
    revalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    return response;
  },
  patchEditReview: async (reviewId: number, payload: PatchEditReviewPayload) => {
    const response = await fetchReviewWriter<ResponseWrapper<PatchEditReviewResponse>>(`/api/v1/reviews/${reviewId}`, {
      method: METHOD.PATCH,
      body: payload
    });
    revalidateTag(CACHE_TAGS.REVIEW.getReview(reviewId));
    revalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    return response;
  },
  patchDeleteReview: async (reviewId: number) => {
    const response = await fetchReviewWriter<ResponseWrapper<PatchDeleteReviewResponse>>(
      `/api/v1/reviews/${reviewId}/status`,
      {
        method: METHOD.PATCH
      }
    );
    revalidateTag(CACHE_TAGS.REVIEW.getReview(reviewId));
    revalidateTag(CACHE_TAGS.REVIEW.getBannerReviewList());
    return response;
  }
};

export default reviewWriterServices;
