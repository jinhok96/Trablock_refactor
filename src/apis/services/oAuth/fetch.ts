import { METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PostOAuthPayload, PostOAuthResponse } from '@/apis/services/oAuth/type';
import { ResponseWrapper } from '@/apis/types/common';
import { ReturnFetchOptions } from '@/apis/types/options';

const options: ReturnFetchOptions<'oAuth'> = {
  oAuth: {
    baseUrl: API_URL.API_BASE_URL
  }
};

const fetchOAuth = returnFetchJson(options.oAuth);

const oAuthServices = {
  postOAuth: async (payload: PostOAuthPayload) => {
    const response = await fetchOAuth<ResponseWrapper<PostOAuthResponse>>('/api/v1/oauth/login', {
      method: METHOD.POST,
      body: payload
    });
    return response;
  }
};

export default oAuthServices;
