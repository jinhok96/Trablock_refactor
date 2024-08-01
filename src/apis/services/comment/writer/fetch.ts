import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import {
  PatchDeleteCommentResponse,
  PatchEditCommentPayload,
  PatchEditCommentResponse,
  PostCommentPayload,
  PostCommentResponse
} from '@/apis/services/comment/writer/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { getAuthTokenHeader } from '@/apis/utils/getHeader';

const options: ReturnFetchOptions<'commentWriter'> = {
  commentWriter: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      ...getAuthTokenHeader()
    }
  }
};

const fetchCommentWriter = returnFetchJson(options.commentWriter);

const commentWriterServices = {
  postComment: async (payload: PostCommentPayload) => {
    const response = await fetchCommentWriter<PostCommentResponse>('/api/v1/comment', {
      method: METHOD.POST,
      body: payload
    });
    return response.body;
  },
  patchEditComment: async (commentId: number, payload: PatchEditCommentPayload) => {
    const response = await fetchCommentWriter<PatchEditCommentResponse>(`/api/v1/comments/${commentId}`, {
      method: METHOD.PATCH,
      body: payload
    });
    return response.body;
  },
  patchDeleteComment: async (commentId: number) => {
    const response = await fetchCommentWriter<PatchDeleteCommentResponse>(`/api/v1/comments/${commentId}/status`, {
      method: METHOD.PATCH
    });
    return response.body;
  }
};

export default commentWriterServices;
