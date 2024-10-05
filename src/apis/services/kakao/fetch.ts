import returnFetch from 'return-fetch';

import { METHOD } from '@/apis/constants/headers';
import { REVALIDATE_TIME } from '@/apis/constants/revalidateTime';
import returnFetchJson from '@/apis/returnFetchJson/returnFetchJson';
import { PostKakaoOauthTokenResponse, PostKakaoUserDataResponse } from '@/apis/services/kakao/type';
import { ReturnFetchOptions } from '@/apis/types/options';
import { ENV } from '@/libs/constants/env';

const HEADER_CONTENT_TYPE_URLENCODED = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' };
const GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code';

const options: ReturnFetchOptions<'kakaoAuth' | 'kakaoApi'> = {
  kakaoAuth: {
    baseUrl: ENV.KAKAO_KAUTH_URL,
    headers: {
      ...HEADER_CONTENT_TYPE_URLENCODED
    }
  },
  kakaoApi: {
    baseUrl: ENV.KAKAO_KAPI_URL,
    headers: {
      ...HEADER_CONTENT_TYPE_URLENCODED
    }
  }
};

const fetchKakaoAuth = returnFetch(options.kakaoAuth);
const fetchKakaoApi = returnFetchJson(options.kakaoApi);

const kakaoServices = {
  postKakaoOauthToken: async (code: string) => {
    const kakaoRedirectURI = ENV.PROD !== ENV.KEY_PROD ? ENV.KAKAO_REDIRECT_URI_DEV : ENV.KAKAO_REDIRECT_URI;

    const params = new URLSearchParams({
      grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
      client_id: ENV.KAKAO_REST_API_KEY || '',
      redirect_uri: kakaoRedirectURI || '',
      code: code,
      client_secret: ENV.KAKAO_CLIENT_SECRET || ''
    });

    const response = await fetchKakaoAuth(`/oauth/token`, {
      method: METHOD.POST,
      body: params
    });

    const responseJson = (await response.json()) as PostKakaoOauthTokenResponse;

    const data = response.ok ? responseJson : null;
    const error = response.ok ? null : responseJson;

    return { body: { data, error } };
  },
  postKakaoUserData: async (token: string) => {
    const authorizationToken = `Bearer ${token}`;
    const response = await fetchKakaoApi<PostKakaoUserDataResponse>('/v2/user/me', {
      next: { revalidate: REVALIDATE_TIME.NONE },
      headers: {
        Authorization: authorizationToken
      }
    });
    return response;
  }
};

export default kakaoServices;
