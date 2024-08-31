import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import {
  PatchDeleteCommentResponse,
  PatchEditCommentPayload,
  PatchEditCommentResponse,
  PostCommentPayload,
  PostCommentResponse
} from '@/apis/services/comment/writer/type';
import { ResponseWrapper } from '@/apis/types/common';
import { HeaderTokens } from '@/apis/types/options';

const commentWriterServices = {
  postComment: async (payload: PostCommentPayload, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostCommentResponse>>('/api/v1/comment', {
      method: METHOD.POST,
      body: payload,
      headers
    });
    return response;
  },
  patchEditComment: async (
    commentId: number,
    payload: PatchEditCommentPayload,
    headers: Pick<HeaderTokens, 'Authorization-Token'>
  ) => {
    const response = await fetchJsonDefault<ResponseWrapper<PatchEditCommentResponse>>(
      `/api/v1/comments/${commentId}`,
      {
        method: METHOD.PATCH,
        body: payload,
        headers
      }
    );
    return response;
  },
  patchDeleteComment: async (commentId: number, headers: Pick<HeaderTokens, 'Authorization-Token'>) => {
    const response = await fetchJsonDefault<ResponseWrapper<PatchDeleteCommentResponse>>(
      `/api/v1/comments/${commentId}/status`,
      {
        method: METHOD.PATCH,
        headers
      }
    );
    return response;
  }
};

export default commentWriterServices;
