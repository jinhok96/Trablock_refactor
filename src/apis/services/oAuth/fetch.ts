import { httpClientJsonDefault } from '@/apis/httpClient/httpClientJsonDefault';
import { PostOAuthPayload, PostOAuthResponse } from '@/apis/services/oAuth/type';
import { ResponseWrapper } from '@/apis/types/common';

const oAuthServices = {
  postOAuth: async (payload: PostOAuthPayload) => {
    const response = await httpClientJsonDefault.post<ResponseWrapper<PostOAuthResponse>>('/api/v1/oauth/login', {
      body: payload
    });
    return response;
  }
};

export default oAuthServices;
