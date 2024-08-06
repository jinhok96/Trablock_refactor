import { CACHE_TAGS } from '@/apis/constants/cacheTags';
import { DEFAULT_PARAMS } from '@/apis/constants/defaultParams';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { GetCommentListParams, GetCommentListResponse } from '@/apis/services/comment/reader/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'commentReader'> = {
  commentReader: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchCommentReader = returnFetchJson(options.commentReader);

const commentReaderServices = {
  getCommentList: async (reviewId: number, params: GetCommentListParams) => {
    const response = await fetchCommentReader<ResponseWrapper<GetCommentListResponse>>(
      `/api/v1/reviews/${reviewId}/comments?page=${params.PAGE || DEFAULT_PARAMS.PAGE}&size=${params.SIZE || DEFAULT_PARAMS.SIZE}`,
      {
        next: {
          tags: [CACHE_TAGS.COMMENT.getCommentList(reviewId, params)] as const,
          revalidate: REVALIDATE_TIME.NONE
        }
      }
    );
    return response;
  }
};

export default commentReaderServices;
