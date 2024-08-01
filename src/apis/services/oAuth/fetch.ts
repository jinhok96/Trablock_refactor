import { HEADERS, METHOD } from '@/apis/constants/headers';
import { API_URL } from '@/apis/constants/urls';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PostOAuthPayload, PostOAuthResponse } from '@/apis/services/oAuth/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { setCookie } from '@/apis/utils/setCookie';

const options: ReturnFetchOptions<'oAuth'> = {
  oAuth: {
    baseUrl: API_URL.API_BASE_URL
  }
};

const fetchOAuth = returnFetchJson(options.oAuth);

const oAuthServices = {
  postOAuth: async (payload: PostOAuthPayload) => {
    const response = await fetchOAuth<PostOAuthResponse>('/api/v1/oauth/login', {
      method: METHOD.POST,
      body: payload
    });
    if (response.ok) {
      const authorizationToken = response.headers.get(HEADERS.AUTHORIZATION_TOKEN) || '';
      const expiresAt = response.headers.get(HEADERS.AUTHORIZATION_TOKEN_EXPIRED_AT) || '';
      const refreshToken = response.headers.get(HEADERS.REFRESH_TOKEN) || '';
      setCookie(HEADERS.AUTHORIZATION_TOKEN, authorizationToken, { secure: true });
      setCookie(HEADERS.AUTHORIZATION_TOKEN_EXPIRED_AT, expiresAt);
      setCookie(HEADERS.REFRESH_TOKEN, refreshToken, { secure: true });
    }
    return response.body;
  }
};

export default oAuthServices;
