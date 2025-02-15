import { httpClientDefault } from '@/apis/httpClient/httpClientDefault';
import { PostOAuthPayload, PostOAuthResponse } from '@/apis/services/oAuth/type';
import { ResponseWrapper } from '@/apis/types/common';

const oAuthServices = {
  postOAuth: async (payload: PostOAuthPayload) => {
    const response = await httpClientDefault.post<ResponseWrapper<PostOAuthResponse>>('/api/v1/oauth/login', {
      body: payload
    });
    return response;
  }
};

export default oAuthServices;
