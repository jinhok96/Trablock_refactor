import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { PutLikeCommentResponse } from '@/apis/services/comment/like/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';
import { throwError } from '@/apis/utils/throwError';

const commentLikeServices = {
  putLikeComment: async (commentId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PutLikeCommentResponse>>(
      `/api/v1/comments/${commentId}/likes`,
      {
        method: METHOD.PUT,
        headers
      }
    );
    throwError(response.body.error);
    return response;
  }
};

export default commentLikeServices;
