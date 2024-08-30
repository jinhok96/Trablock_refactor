import { METHOD } from '@/apis/constants/headers';
import { fetchJsonDefault } from '@/apis/returnFetchJson/returnFetchJsonDefault';
import { PostOAuthPayload, PostOAuthResponse } from '@/apis/services/oAuth/type';
import { ResponseWrapper } from '@/apis/types/common';
import { throwError } from '@/apis/utils/throwError';

const oAuthServices = {
  postOAuth: async (payload: PostOAuthPayload) => {
    const response = await fetchJsonDefault<ResponseWrapper<PostOAuthResponse>>('/api/v1/oauth/login', {
      method: METHOD.POST,
      body: payload
    });
    throwError(response.body.error);
    return response;
  }
};

export default oAuthServices;
