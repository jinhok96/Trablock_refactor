import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { DEFAULT_PARAMS } from '@/apis/constants/defaultParams';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { GetCommentListParams, GetCommentListResponse } from '@/apis/services/comment/reader/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { throwError } from '@/apis/utils/throwError';
import { APP_QUERIES } from '@/libs/constants/appPaths';

const commentReaderServices = {
  getCommentList: async (
    reviewId: number,
    params: GetCommentListParams,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const response = await fetchJsonDefault<ResponseWrapper<GetCommentListResponse>>(
      `/api/v1/reviews/${reviewId}/comments?${APP_QUERIES.PAGE}=${params.PAGE || DEFAULT_PARAMS.PAGE}&${APP_QUERIES.SIZE}=${params.SIZE || DEFAULT_PARAMS.SIZE}`,
      {
        next: {
          tags: [CACHE_TAGS.COMMENT.getCommentList(reviewId, params)] as const,
          revalidate: REVALIDATE_TIME.NONE
        },
        headers
      }
    );
    throwError(response.body.error);
    return response;
  }
};

export default commentReaderServices;
