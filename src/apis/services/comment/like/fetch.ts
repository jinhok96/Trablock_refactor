import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PutLikeCommentResponse } from '@/apis/services/comment/like/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'commentLike'> = {
  commentLike: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchCommentLike = returnFetchJson(options.commentLike);

const commentLikeServices = {
  putLikeComment: async (commentId: number) => {
    const response = await fetchCommentLike<ResponseWrapper<PutLikeCommentResponse>>(
      `/api/v1/comments/${commentId}/likes`,
      {
        method: METHOD.PUT
      }
    );
    return response;
  }
};

export default commentLikeServices;
